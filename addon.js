const http = require('http');
const { URL } = require('url');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { CloudflareBypass } = require('./cloudflare-bypass');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { HARDCODED_TV_CHANNELS } = require('./hardcodedChannels.js');

// Initialize Cloudflare bypass
const cfBypass = new CloudflareBypass();

// API and caching configuration
const API_BASE_URL = 'https://ppv.gstream.stream';
const STREAMS_API_URL = `${API_BASE_URL}/streams.json`;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Global caches
let streamsCache = { data: null, lastFetch: 0, headers: null };
let monoUrlCache = new Map(); // streamId -> { url: string, expires: number }
const proxyCache = new Map();
const m3u8ContentCache = new Map();
let puppeteerQueue = [];
let isPuppeteerProcessing = false;
let activeScrapeRequests = new Map(); // streamId -> Promise

// Persistent cache file paths
const CACHE_DIR = path.join(__dirname, 'cache');
const MONO_URL_CACHE_FILE = path.join(CACHE_DIR, 'monoUrlCache.json');
// Rejected user agent file constant removed

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Rejected user agent tracking removed

// Load persistent cache on startup
function loadPersistentCache() {
  try {
    if (fs.existsSync(MONO_URL_CACHE_FILE)) {
      const data = fs.readFileSync(MONO_URL_CACHE_FILE, 'utf8');
      const cacheData = JSON.parse(data);
      
      // Restore monoUrl cache with expiry validation
      Object.entries(cacheData).forEach(([streamId, entry]) => {
        if (entry.expires && Date.now() < entry.expires) {
          monoUrlCache.set(streamId, entry);
          console.log(`📦 Loaded cached monoUrl for stream ${streamId}`);
        }
      });
      
      console.log(`📦 Loaded ${monoUrlCache.size} cached monoUrls from disk`);
    }
  } catch (error) {
    console.error('❌ Failed to load persistent cache:', error);
  }
}

// Save persistent cache to disk
function savePersistentCache() {
  try {
    const cacheData = {};
    monoUrlCache.forEach((value, key) => {
      cacheData[key] = value;
    });
    
    fs.writeFileSync(MONO_URL_CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log(`💾 Saved ${monoUrlCache.size} monoUrls to persistent cache`);
  } catch (error) {
    console.error('❌ Failed to save persistent cache:', error);
  }
}

// Category mapping for manifest validation
const VALID_CATEGORIES = [
  'Live', 'American Football', 'Basketball', 'Cricket', 'Combat Sports',
  'Football', 'Ice Hockey', 'Motorsports', 'Wrestling', 'Miscellaneous',
  '24/7 Streams', 'TV Channels'
];

// Helper functions
async function fetchStreamsFromAPI() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (streamsCache.data && (now - streamsCache.lastFetch) < CACHE_DURATION) {
    return streamsCache;
  }
  
  try {
    const response = await axios.get(STREAMS_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });
    
    const apiData = response.data;
    
    streamsCache = {
      data: apiData.streams || [], // Extract streams array from response
      lastFetch: now,
      headers: apiData.headers || {}
    };
    
    return streamsCache;
  } catch (error) {
    console.error('Failed to fetch streams from API:', error);
    return streamsCache.data ? streamsCache : { data: [], headers: {} };
  }
}

function formatTimeRemaining(timestamp) {
  const now = Math.floor(Date.now() / 1000);
  const diff = timestamp - now;
  
  if (diff <= 0) return '00:00:00';
  
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;
  
  return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

function getCachedProxyResponse(url) {
  const cached = proxyCache.get(url);
  if (cached && Date.now() < cached.expires) {
    return cached.content;
  }
  return null;
}

function setCachedProxyResponse(url, content, ttlSeconds = 30) {
  proxyCache.set(url, {
    content,
    expires: Date.now() + (ttlSeconds * 1000)
  });
}

function getCachedM3U8Content(streamId) {
  const cached = m3u8ContentCache.get(streamId);
  if (cached && (Date.now() - cached.lastValid) < 60000) { // 1 minute validity
    return cached;
  }
  return null;
}

function setCachedM3U8Content(streamId, content, url) {
  m3u8ContentCache.set(streamId, {
    content,
    url,
    lastValid: Date.now()
  });
}

function clearCachedM3U8Content(streamId) {
  m3u8ContentCache.delete(streamId);
}

function getStreamStatus(stream) {
  const now = Math.floor(Date.now() / 1000);
  const startsAt = stream.starts_at;
  const endsAt = stream.ends_at;
  
  if (now >= endsAt) {
    return { status: 'ended', icon: '❌', prefix: 'Ended' };
  } else if (now >= startsAt - 600 && now < endsAt) { // Within 10 minutes to end time
    return { status: 'live', icon: '🔴', prefix: 'Live' };
  } else {
    return { status: 'upcoming', icon: '⏰', prefix: 'Upcoming' };
  }
}

function getValidCategory(category) {
  return VALID_CATEGORIES.includes(category) ? category : 'Miscellaneous';
}

function isWithinLiveWindow(stream) {
  const now = Math.floor(Date.now() / 1000);
  return now >= stream.starts_at - 600 && now < stream.ends_at; // Within 10 minutes to end time
}

// Helper function to get Cloudflare headers for URLs that might be protected
async function getCloudflareHeaders(url) {
  try {
    // Check if URL might have Cloudflare protection
    if (url.includes('modistreams.org') || url.includes('strm.poocloud.in') || url.includes('poocloud.in') || url.includes('ppv.gstream.stream') || url.includes('cloudflare') || url.includes('cf-')) {
      const headers = await cfBypass.getHeaders(url);
      console.log(`🛡️ Applied Cloudflare bypass headers for: ${url}`);
      return headers;
    }
    return null;
  } catch (error) {
    console.error('❌ Cloudflare bypass failed:', error.message);
    return null;
  }
}

// Validate M3U8 content and return if it contains media segments
async function validateAndReturnM3U8(m3u8Url, page, resolvePromise, foundMonoUrl) {
  if (foundMonoUrl) return foundMonoUrl;
  
  // Add a simple cache to avoid re-validating the same URL
  if (validateAndReturnM3U8.validatedUrls && validateAndReturnM3U8.validatedUrls.has(m3u8Url)) {
    return null; // Already validated and didn't contain media segments
  }
  
  if (!validateAndReturnM3U8.validatedUrls) {
    validateAndReturnM3U8.validatedUrls = new Set();
  }
  
  try {
    // Capture headers and content in one go
    const result = await page.evaluate(async (url) => {
      try {
        // Make the actual request to capture headers
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
            'Referer': window.location.origin,
            'Origin': window.location.origin,
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site'
          }
        });
        
        if (!response.ok) {
          return { success: false, error: `HTTP ${response.status}` };
        }
        
        // Extract important headers
        const headers = {};
        for (const [key, value] of response.headers.entries()) {
          if (key.toLowerCase().includes('authorization') ||
              key.toLowerCase().includes('x-') ||
              key.toLowerCase().includes('token') ||
              key.toLowerCase().includes('cookie') ||
              key.toLowerCase().includes('session') ||
              key.toLowerCase().includes('referer') ||
              key.toLowerCase().includes('origin')) {
            headers[key] = value;
          }
        }
        
        // Get content
        const content = await response.text();
        
        return {
          success: true,
          headers,
          content,
          url
        };
      } catch (e) {
        return { success: false, error: e.message };
      }
    }, m3u8Url);
    
    if (!result.success) {
      validateAndReturnM3U8.validatedUrls.add(m3u8Url);
      return null;
    }
    
    // Quick check for media segments
    const hasMediaSegments = /\.(ts|mp4|m4s|chunk|segment|jpeg|png|gif)/gi.test(result.content) || 
                            result.content.includes('#EXTINF');
    
    // Mark as validated
    validateAndReturnM3U8.validatedUrls.add(m3u8Url);
    
    if (hasMediaSegments && resolvePromise) {
      console.log(`✅ Found valid M3U8 with media segments: ${m3u8Url}`);
      console.log(`📋 Captured ${Object.keys(result.headers).length} headers for playback`);
      
      // Store headers globally for later use
      validateAndReturnM3U8.capturedHeaders = validateAndReturnM3U8.capturedHeaders || new Map();
      validateAndReturnM3U8.capturedHeaders.set(m3u8Url, result.headers);
      
      resolvePromise(m3u8Url);
      return m3u8Url;
    }
    
    return null;
  } catch (error) {
    console.log(`Error validating M3U8 ${m3u8Url}: ${error.message}`);
    validateAndReturnM3U8.validatedUrls.add(m3u8Url);
    return null;
  }
}

// Puppeteer functions - optimized version
async function scrapeMonoUrl(streamId, iframeUrl) {
  console.log(`Scraping monoUrl for stream ${streamId} from ${iframeUrl}`);
  
  let browser;
  let page;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--disable-features=VizDisplayCompositor',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    
    page = await browser.newPage();
    
    // Enable request interception to block unnecessary resources and speed up loading
    await page.setRequestInterception(true);
    
    page.on('request', request => {
      const url = request.url();
      const resourceType = request.resourceType();
      
      // Block unnecessary resources that slow down page load
      if (resourceType === 'stylesheet' || 
          resourceType === 'image' || 
          resourceType === 'font' ||
          resourceType === 'media' ||
          url.includes('.css') || 
          url.includes('.jpg') || 
          url.includes('.png') || 
          url.includes('.gif') ||
          url.includes('.woff') ||
          url.includes('analytics') ||
          url.includes('doubleclick') ||
          url.includes('googleads')) {
        request.abort();
        return;
      }
      
      // Allow M3U8 requests to pass through
      if (url.includes('.m3u8')) {
        request.continue();
        return;
      }
      
      // Allow essential requests
      request.continue();
    });
    
    // Collect network requests and return immediately when valid M3U8 is found
    const networkRequests = [];
    const processedUrls = new Set(); // Track URLs we've already processed
    let foundMonoUrl = null;
    let resolvePromise = null;
    
    page.on('request', request => {
      const url = request.url();
      if (url.includes('.m3u8') && !processedUrls.has(url)) {
        processedUrls.add(url);
        networkRequests.push(url);
        console.log(`Found M3U8 URL in request: ${url}`);
        
        // Validate M3U8 content immediately
        validateAndReturnM3U8(url, page, resolvePromise, foundMonoUrl).then(result => {
          if (result) {
            foundMonoUrl = result;
            console.log(`✅ Found valid M3U8 with media segments: ${result}`);
          }
        });
      }
    });
    
    page.on('response', response => {
      const url = response.url();
      if (url.includes('.m3u8') && !processedUrls.has(url)) {
        processedUrls.add(url);
        networkRequests.push(url);
        console.log(`Found M3U8 URL in response: ${url}`);
        
        // Validate M3U8 content immediately
        validateAndReturnM3U8(url, page, resolvePromise, foundMonoUrl).then(result => {
          if (result) {
            foundMonoUrl = result;
            console.log(`✅ Found valid M3U8 with media segments in response: ${result}`);
          }
        });
      }
    });
    
    // Create a promise that resolves when valid M3U8 is found or timeout occurs
    const monoUrlPromise = new Promise((resolve) => {
      resolvePromise = resolve;
      
      // Set timeout to return after 10 seconds if no URL found
      setTimeout(() => {
        if (!foundMonoUrl) {
          resolve(null);
        }
      }, 10000);
    });
    
    // Navigate to iframe URL with increased timeout and better wait conditions
    try {
      await page.goto(iframeUrl, { 
        waitUntil: 'domcontentloaded',  // Faster than 'networkidle2'
        timeout: 60000  // Increased to 60 seconds
      });
      console.log('Loaded iframe page');
    } catch (error) {
      if (error.message.includes('timeout')) {
        console.log('Page load timeout, but continuing to listen for network requests...');
        // Don't return - the page might have partially loaded and M3U8 requests might still come
      } else {
        throw error;
      }
    }
    
    // Wait a bit for network requests to complete, then try to trigger M3U8 requests
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // If we found a valid M3U8, return it immediately
    if (foundMonoUrl) {
      console.log(`✅ Returning valid M3U8: ${foundMonoUrl}`);
      return foundMonoUrl;
    }
    
    // Try to find and execute any JavaScript that might trigger video loading
    try {
      await page.evaluate(() => {
        // Look for common video player initialization functions
        const videoElements = document.querySelectorAll('video, iframe, object, embed');
        videoElements.forEach(element => {
          if (element.src || element.data) {
            console.log('Found media element:', element.src || element.data);
          }
        });
        
        // Try to trigger any play buttons or video initialization
        const playButtons = document.querySelectorAll('[class*="play"], [class*="Play"], button[title*="play"], button[aria-label*="play"]');
        playButtons.forEach(button => {
          try {
            button.click();
          } catch (e) {
            // Ignore errors
          }
        });
      });
      
      // Wait a bit more for any triggered requests
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (e) {
      console.log('Error trying to trigger video:', e.message);
    }
    
    // Wait for the promise to resolve (either valid M3U8 found or timeout)
    const result = await monoUrlPromise;
    if (result) {
      console.log(`✅ Found valid M3U8 via promise: ${result}`);
      return result;
    }
    
    // If no valid M3U8 found, try to validate collected M3U8 URLs
    console.log(`Checking ${networkRequests.length} collected M3U8 URLs...`);
    for (const url of networkRequests) {
      const validUrl = await validateAndReturnM3U8(url, page, null, false);
      if (validUrl) {
        console.log(`✅ Found valid M3U8 in collected requests: ${validUrl}`);
        return validUrl;
      }
    }
    
    console.log(`❌ No valid M3U8 found with media segments`);
    return null;
    
  } catch (error) {
    console.error(`Error scraping monoUrl for stream ${streamId}:`, error);
    return null;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function processPuppeteerQueue() {
  if (isPuppeteerProcessing || puppeteerQueue.length === 0) {
    return;
  }
  
  isPuppeteerProcessing = true;
  
  while (puppeteerQueue.length > 0) {
    const { streamId, iframeUrl, resolve, reject } = puppeteerQueue.shift();
    
    try {
      const monoUrl = await scrapeMonoUrl(streamId, iframeUrl);
      resolve(monoUrl);
    } catch (error) {
      reject(error);
    }
  }
  
  isPuppeteerProcessing = false;
}

function getCachedMonoUrl(streamId, endsAt) {
  const cached = monoUrlCache.get(streamId.toString());
  if (cached && Date.now() < cached.expires) {
    return cached.url;
  }
  return null;
}

function setCachedMonoUrl(streamId, endsAt, monoUrl, is247Stream = false) {
  const now = Date.now();
  let expires;
  
  // Special handling for 24/7 Streams
  if (is247Stream) {
    // Cache 24/7 streams for 4 hours
    expires = now + (4 * 60 * 60 * 1000); // 4 hours
    console.log(`Stream ${streamId} is 24/7, caching monoUrl for 4 hours`);
  } else if ((endsAt * 1000) < now) {
    // For streams that have ended, cache for 1 hour from now
    expires = now + (60 * 60 * 1000); // 1 hour
    console.log(`Stream ${streamId} has ended, caching monoUrl for 1 hour`);
  } else {
    // For active streams, cache until 5 minutes after end time
    expires = (endsAt * 1000) + (5 * 60 * 1000); // 5 minutes after end time
    console.log(`Stream ${streamId} is active, caching monoUrl until end time + 5 minutes`);
  }
  
  monoUrlCache.set(streamId.toString(), { 
    url: monoUrl, 
    expires,
    originalEndsAt: endsAt,
    cachedAt: now,
    is247Stream
  });
  
  // Auto-save to persistent cache
  savePersistentCache();
}

// Cleanup expired and API-removed streams from cache
async function cleanupExpiredStreams() {
  try {
    const now = Date.now();
    const streamsData = await fetchStreamsFromAPI();
    const apiStreams = streamsData.data || [];
    const apiStreamIds = new Set(apiStreams.map(s => s.id.toString()));
    
    let cleanedCount = 0;
    let apiRemovedCount = 0;
    
    monoUrlCache.forEach((cacheEntry, streamId) => {
      // Remove expired entries
      if (now >= cacheEntry.expires) {
        monoUrlCache.delete(streamId);
        cleanedCount++;
        console.log(`🗑️ Removed expired cache entry for stream ${streamId}`);
        return;
      }
      
      // Remove streams that are no longer in the API
      if (!apiStreamIds.has(streamId)) {
        monoUrlCache.delete(streamId);
        apiRemovedCount++;
        console.log(`🗑️ Removed API-dropped stream ${streamId} from cache`);
        return;
      }
    });
    
    // Also cleanup old captured headers (older than 1 hour)
    if (validateAndReturnM3U8.capturedHeaders) {
      let headersCleaned = 0;
      validateAndReturnM3U8.capturedHeaders.forEach((headers, url) => {
        // Simple heuristic: if we haven't used this URL in an hour, remove it
        // This is a basic cleanup - in production you might want more sophisticated tracking
        if (Math.random() < 0.1) { // Randomly clean 10% to prevent memory buildup
          validateAndReturnM3U8.capturedHeaders.delete(url);
          headersCleaned++;
        }
      });
      if (headersCleaned > 0) {
        console.log(`🗑️ Cleaned ${headersCleaned} old captured headers`);
      }
    }
    
    if (cleanedCount > 0 || apiRemovedCount > 0) {
      savePersistentCache();
      console.log(`🧹 Cache cleanup: ${cleanedCount} expired, ${apiRemovedCount} API-removed`);
    }
    
  } catch (error) {
    console.error('❌ Error during cache cleanup:', error);
  }
}

// Deduplicated scraping function - prevents multiple simultaneous scrapes
async function emergencyRescrapeMonoUrl(streamId, iframeUrl) {
  console.log(`🚨 EMERGENCY RESCRAPE for stream ${streamId} - WebOS fallback activated`);
  
  try {
    const newMonoUrl = await scrapeMonoUrlDeduplicated(streamId, iframeUrl);
    if (newMonoUrl) {
      // Update the cache with new URL
      const streamsData = await fetchStreamsFromAPI();
      const apiStreams = streamsData.data || [];
      const stream = apiStreams.find(s => s.id === streamId);
      
      if (stream) {
        // Check if this is a 24/7 stream for special caching
        const is247Stream = stream.category === '24/7 Streams';
        setCachedMonoUrl(streamId, stream.ends_at, newMonoUrl, is247Stream);
        console.log(`🚨 EMERGENCY RESCRAPE SUCCESS: New monoUrl for stream ${streamId}: ${newMonoUrl}`);
        return newMonoUrl;
      }
    }
  } catch (error) {
    console.error(`🚨 EMERGENCY RESCRAPE FAILED for stream ${streamId}:`, error);
  }
  
  return null;
}

// Deduplicated scraping function - prevents multiple simultaneous scrapes
async function scrapeMonoUrlDeduplicated(streamId, iframeUrl) {
  const streamIdStr = streamId.toString();
  
  console.log(`Deduplicated scrape request for stream ${streamId}, active requests: ${Array.from(activeScrapeRequests.keys())}`);
  
  // Check if there's already an active scrape request for this stream
  if (activeScrapeRequests.has(streamIdStr)) {
    console.log(`Waiting for existing scrape request for stream ${streamId}`);
    return await activeScrapeRequests.get(streamIdStr);
  }
  
  console.log(`Starting new scrape for stream ${streamId}`);
  const scrapePromise = scrapeMonoUrl(streamId, iframeUrl);
  activeScrapeRequests.set(streamIdStr, scrapePromise);
  
  try {
    const result = await scrapePromise;
    console.log(`Scrape completed for stream ${streamId}, result: ${result}`);
    return result;
  } finally {
    activeScrapeRequests.delete(streamIdStr);
    console.log(`Cleaned up active request for stream ${streamId}`);
  }
}

// Plex M3U8 scraper function
async function scrapePlexM3u8Url(plexUrl) {
  console.log(`Scraping Plex M3U8 URL from: ${plexUrl}`);
  
  let browser;
  let page;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--disable-features=VizDisplayCompositor',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    });
    
    page = await browser.newPage();
    
    // Set user agent and viewport
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Enable request interception to capture network requests
    await page.setRequestInterception(true);
    
    let m3u8Url = null;
    const networkRequests = [];
    let resolvePromise = null;
    let rejectPromise = null;
    
    // Create a promise that resolves when we find the M3U8 URL
    const m3u8Promise = new Promise((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;
    });
    
    page.on('request', request => {
      const url = request.url();
      
      // Look for M3U8 URLs from Plex domains
      if (url.includes('.m3u8') && (url.includes('plex.tv') || url.includes('anvato') || url.includes('akamaized'))) {
        networkRequests.push(url);
        console.log(`Found potential M3U8 URL: ${url}`);
        
        // Prioritize epg.provider.plex.tv URLs and resolve immediately
        if (url.includes('epg.provider.plex.tv') && !m3u8Url) {
          m3u8Url = url;
          console.log(`Found target Plex M3U8 URL: ${url}`);
          if (resolvePromise) {
            resolvePromise(url);
          }
        }
      }
      
      // Allow most requests but block unnecessary resources for speed
      if (url.includes('.css') || url.includes('.jpg') || url.includes('.png') || url.includes('.gif')) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    page.on('response', response => {
      const url = response.url();
      
      // Also check response URLs for M3U8 content
      if (url.includes('.m3u8') && (url.includes('plex.tv') || url.includes('anvato') || url.includes('akamaized'))) {
        const contentType = response.headers()['content-type'] || '';
        if (contentType.includes('mpegurl') || contentType.includes('mpegURL')) {
          if (!m3u8Url || url.includes('epg.provider.plex.tv')) {
            m3u8Url = url;
            console.log(`Found M3U8 URL from response: ${url}`);
            if (resolvePromise) {
              resolvePromise(url);
            }
          }
        }
      }
    });
    
    // Navigate to the Plex page
    console.log(`Navigating to: ${plexUrl}`);
    await page.goto(plexUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for the page to load and look for video elements
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Try to find and click play button if needed
    try {
      const playButton = await page.$('[data-testid="play-button"], .play-button, [aria-label*="Play"], .play-pause-button');
      if (playButton) {
        console.log('Found play button, clicking...');
        await playButton.click();
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (e) {
      console.log('No play button found or failed to click');
    }
    
    // Wait for M3U8 URL to be found (with timeout)
    try {
      console.log('Waiting for M3U8 URL to be found...');
      const foundUrl = await Promise.race([
        m3u8Promise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout waiting for M3U8 URL')), 10000)
        )
      ]);
      
      console.log(`Successfully found M3U8 URL: ${foundUrl}`);
      return foundUrl;
      
    } catch (e) {
      console.log('Timeout or error waiting for M3U8 URL, trying fallback methods');
      
      // If we already found an M3U8 URL (non-epg), return it
      if (m3u8Url) {
        console.log(`Using fallback M3U8 URL: ${m3u8Url}`);
        return m3u8Url;
      }
      
      // Try to extract from page content
      try {
        const pageContent = await page.content();
        const m3u8Matches = pageContent.match(/https?:\/\/[^\s"']+\.m3u8[^\s"']*/g);
        
        if (m3u8Matches) {
          console.log(`Found ${m3u8Matches.length} M3U8 URLs in page content`);
          
          // Prioritize epg.provider.plex.tv URLs
          for (const match of m3u8Matches) {
            if (match.includes('epg.provider.plex.tv')) {
              console.log(`Selected Plex M3U8 URL from page content: ${match}`);
              return match;
            }
          }
          
          // Fallback to any M3U8 URL
          if (m3u8Matches.length > 0) {
            console.log(`Using fallback M3U8 URL: ${m3u8Matches[0]}`);
            return m3u8Matches[0];
          }
        }
      } catch (e) {
        console.log('Failed to extract M3U8 from page content:', e);
      }
    }
    
    console.log(`All network requests found: ${networkRequests.length}`);
    networkRequests.forEach((url, index) => {
      console.log(`  ${index + 1}. ${url}`);
    });
    
    return m3u8Url;
    
  } catch (error) {
    console.error('Plex scraping error:', error);
    return null;
  } finally {
    // Always clean up resources
    if (page) {
      await page.close();
    }
    if (browser) {
      await browser.close();
    }
  }
}

// Plex M3U8 cache with health monitoring
const plexM3u8Cache = new Map(); // channel -> { url: string, expires: number, lastCheck: number, failures: number }

// Extract TTL from Plex URL parameters
function extractTtlFromPlexUrl(url) {
  try {
    const urlObj = new URL(url);
    const streamingStart = urlObj.searchParams.get('x-plex-provider-streaming-start');
    
    if (streamingStart) {
      const startTime = parseInt(streamingStart) * 1000; // Convert to milliseconds
      const now = Date.now();
      
      // Plex URLs typically expire after 30-60 minutes from streaming start
      // We'll use 25 minutes to be safe
      const ttl = startTime + (25 * 60 * 1000);
      
      console.log(`Extracted TTL from Plex URL: ${new Date(ttl).toISOString()}`);
      return ttl;
    }
  } catch (error) {
    console.log('Failed to extract TTL from Plex URL:', error);
  }
  
  // Default TTL: 25 minutes
  return Date.now() + (25 * 60 * 1000);
}

// Check if Plex M3U8 URL is healthy
async function checkPlexUrlHealth(url) {
  try {
    const response = await axios.head(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
        "Referer": "https://watch.plex.tv/",
        "Origin": "https://watch.plex.tv"
      },
      timeout: 5000
    });
    
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    console.log(`Health check failed for ${url}:`, error.response?.status || error.message);
    return false;
  }
}

// Get or scrape Plex M3U8 URL with health monitoring
async function getPlexM3u8Url(channelPath, forceRescrape = false) {
  const cacheKey = channelPath;
  const cached = plexM3u8Cache.get(cacheKey);
  const now = Date.now();
  
  // Check cache validity
  if (!forceRescrape && cached && cached.url && cached.expires > now) {
    // Perform health check every 2 minutes
    if (now - cached.lastCheck > 2 * 60 * 1000) {
      console.log(`Performing health check for ${channelPath}`);
      const isHealthy = await checkPlexUrlHealth(cached.url);
      
      if (isHealthy) {
        cached.lastCheck = now;
        cached.failures = 0;
        console.log(`✅ Healthy cached URL for ${channelPath}: ${cached.url}`);
        return cached.url;
      } else {
        cached.failures++;
        console.log(`❌ Unhealthy cached URL for ${channelPath}, failures: ${cached.failures}`);
        
        // If we've had multiple failures, force rescrape
        if (cached.failures >= 2) {
          console.log(`Too many failures for ${channelPath}, forcing rescrape`);
          forceRescrape = true;
        } else {
          // Return cached URL for now, but mark for potential rescrape
          return cached.url;
        }
      }
    } else {
      console.log(`✅ Using cached URL for ${channelPath}: ${cached.url}`);
      return cached.url;
    }
  }
  
  // Need to scrape new URL
  console.log(`Scraping new M3U8 URL for ${channelPath} (force: ${forceRescrape})`);
  const plexUrl = `https://watch.plex.tv/live-tv/channel/${channelPath}`;
  
  try {
    const m3u8Url = await scrapePlexM3u8Url(plexUrl);
    
    if (m3u8Url) {
      const expires = extractTtlFromPlexUrl(m3u8Url);
      
      // Update cache
      plexM3u8Cache.set(cacheKey, {
        url: m3u8Url,
        expires: expires,
        lastCheck: now,
        failures: 0
      });
      
      console.log(`✅ Scraped and cached new URL for ${channelPath}: ${m3u8Url}`);
      console.log(`   Expires: ${new Date(expires).toISOString()}`);
      
      return m3u8Url;
    } else {
      console.error(`Failed to scrape M3U8 URL for ${channelPath}`);
      return null;
    }
  } catch (error) {
    console.error(`Error scraping M3U8 URL for ${channelPath}:`, error);
    return null;
  }
}

const addonInterface = {
  manifest: {
    id: "org.streamsppv.stremio",
    version: "2.0.0",
    name: "StreamsPPV",
    description: "Live Sports Streams & Sports TV Channels -- Discord: discord.gg/pfMhfmWQam",
    logo: "https://ppv.gstream.stream/posters/StreamsPPV.png",
    background: "https://ppv.gstream.stream/posters/StreamsPPV.png",
    catalogs: [
      { type: "StreamsPPV", id: "streamsppv_live", name: "Live"},
      { type: "StreamsPPV", id: "streamsppv_american_football", name: "American Football"},
      { type: "StreamsPPV", id: "streamsppv_basketball", name: "Basketball"},
      { type: "StreamsPPV", id: "streamsppv_cricket", name: "Cricket"},
      { type: "StreamsPPV", id: "streamsppv_combat_sports", name: "Combat Sports"},
      { type: "StreamsPPV", id: "streamsppv_football", name: "Football"},
      { type: "StreamsPPV", id: "streamsppv_ice_hockey", name: "Ice Hockey"},
      { type: "StreamsPPV", id: "streamsppv_motorsports", name: "Motorsports"},
      { type: "StreamsPPV", id: "streamsppv_wrestling", name: "Wrestling"},
      { type: "StreamsPPV", id: "streamsppv_miscellaneous", name: "Miscellaneous"},
      { type: "StreamsPPV", id: "streamsppv_24_7_streams", name: "24/7 Streams"},
      { type: "StreamsPPV", id: "streamsppv_tv_channels", name: "TV Channels", extra: [{
            name: "All",
            options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "123"]
        }]}
    ],
    resources: ["catalog", "meta", "stream"],
    types: ["StreamsPPV"],
    idPrefixes: ["streamsppv", "tvchannel"],
    behaviorHints: {
                configurable: true,
                configurationRequired: false,
                configurationPage: "https://addon3.gstream.stream/configure"
            }
  },

  catalog: async (args, userConfig = null) => {
    const metas = [];
    
    if (args.type === "StreamsPPV") {
      let catalogId = args.id || 'streamsppv_live';
      // Remove .json suffix if present
      catalogId = catalogId.replace('.json', '');
      
      const isTvChannels = catalogId === 'streamsppv_tv_channels';
      
      // Get user's enabled sports if configuration is provided
      let enabledSports = null;
      if (userConfig && userConfig.s && Array.isArray(userConfig.s)) {
        enabledSports = userConfig.s;
        console.log(`Catalog request with user config, enabled sports: ${enabledSports.join(', ')}`);
      }
      
      if (isTvChannels) {
        // Handle TV Channels with alphabetical filtering
        const extra = args.extra || {};
        const filterLetter = extra.search || 'All';
        
        let filteredChannels = HARDCODED_TV_CHANNELS;
        
        if (filterLetter !== 'All') {
          filteredChannels = HARDCODED_TV_CHANNELS.filter(channel => {
            const firstChar = channel.name.charAt(0).toUpperCase();
            if (filterLetter === '123') {
              return /^[0-9]/.test(firstChar);
            }
            return firstChar === filterLetter;
          });
        }
        
        filteredChannels.forEach(channel => {
          metas.push({
            id: `tvchannel:${channel.id}`,
            type: "StreamsPPV",
            name: channel.name,
            poster: channel.poster || `${API_BASE_URL}/posters/${channel.name}.jpg`,
            posterShape: "landscape",
            description: channel.description || `TV Channel - ${channel.name}`,
            genres: ["TV Channels"],
            releaseInfo: "24/7 Channel",
            behaviorHints: {
              defaultVideoId: `tvchannel:${channel.id}:1`
            }
          });
        });
        
      } else {
        // Handle API streams
        const streamsData = await fetchStreamsFromAPI();
        const streams = streamsData.data || [];
        
        // Determine which category we're serving
        let targetCategory = catalogId.replace('streamsppv_', '').replace(/_/g, ' ');
        if (targetCategory === 'live') {
          targetCategory = 'Live';
        } else if (targetCategory === '24 7 streams') {
          targetCategory = '24/7 Streams'; // Special handling for 24/7 streams
        }
        
        // Case-insensitive category matching
        targetCategory = targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1).toLowerCase();
        
        streams.forEach(stream => {
          const validCategory = getValidCategory(stream.category);
          const streamStatus = getStreamStatus(stream);
          
          // If user config is provided, filter out disabled sports
          if (enabledSports && !enabledSports.includes(validCategory)) {
            return; // Skip this stream as it's not in user's enabled sports
          }
          
          // Check if stream should appear in this catalog
          let shouldInclude = false;
          
          if (targetCategory === 'Live') {
            // Live category gets streams within 10 minutes of start time (excluding 24/7 and TV Channels)
            shouldInclude = isWithinLiveWindow(stream) && 
                           stream.category !== '24/7 Streams' && 
                           stream.category !== 'TV Channels';
          } else {
            // Regular categories get streams matching their category (case-insensitive)
            shouldInclude = validCategory.toLowerCase() === targetCategory.toLowerCase();
          }
          
          if (shouldInclude) {
            let description;
            if (streamStatus.status === 'upcoming') {
              const timeRemaining = formatTimeRemaining(stream.starts_at);
              description = `${streamStatus.icon} ${streamStatus.prefix} ${timeRemaining} - ${stream.name} - ${stream.tag || ''} - ${stream.category}`;
            } else {
              description = `${streamStatus.icon} ${streamStatus.prefix} - ${stream.name} - ${stream.tag || ''} - ${stream.category}`;
            }
            
            metas.push({
              id: `streamsppv:${stream.id}`,
              type: "StreamsPPV",
              name: stream.name,
              poster: stream.poster,
              posterShape: "landscape",
              description: description,
              genres: [validCategory],
              releaseInfo: streamStatus.status === 'live' ? 'Live Now' : new Date(stream.starts_at * 1000).toISOString(),
              behaviorHints: {
                defaultVideoId: `streamsppv:${stream.id}:1:1`
              }
            });
          }
        });
      }
    }

    return { metas };
  },

  // Add a separate meta handler
  getMeta: async (args) => {
    const decodedId = decodeURIComponent(args.id);
    
    if (args.type === "StreamsPPV") {
      if (decodedId.startsWith('streamsppv:')) {
        // Handle API stream
        const streamId = parseInt(decodedId.replace('streamsppv:', ''));
        const streamsData = await fetchStreamsFromAPI();
        const streams = streamsData.data || [];
        const stream = streams.find(s => s.id === streamId);
        
        if (stream) {
          const validCategory = getValidCategory(stream.category);
          const streamStatus = getStreamStatus(stream);
          
          let description;
          if (streamStatus.status === 'upcoming') {
            const timeRemaining = formatTimeRemaining(stream.starts_at);
            description = `${streamStatus.icon} ${streamStatus.prefix} ${timeRemaining} - ${stream.name} - ${stream.tag || ''} - ${stream.category}`;
          } else {
            description = `${streamStatus.icon} ${streamStatus.prefix} - ${stream.name} - ${stream.tag || ''} - ${stream.category}`;
          }
          
          const metaResult = {
            meta: {
              id: `streamsppv:${stream.id}`,
              type: "StreamsPPV",
              name: stream.name,
              poster: stream.poster,
              posterShape: "landscape",
              background: stream.poster,
              description: description,
              genres: [validCategory],
              releaseInfo: streamStatus.status === 'live' ? 'Live Now' : new Date(stream.starts_at * 1000).toISOString(),
              videos: [{
                id: `streamsppv:${stream.id}:1:1`,
                title: stream.name,
                season: 1,
                episode: 1,
                released: new Date(stream.starts_at * 1000).toISOString(),
                thumbnail: stream.poster
              }],
              behaviorHints: {
                defaultVideoId: `streamsppv:${stream.id}:1:1`
              }
            }
          };
          
          return metaResult;
        }
      } else if (decodedId.startsWith('tvchannel:')) {
        // Handle TV channel
        const channelId = decodedId.replace('tvchannel:', '');
        const channel = HARDCODED_TV_CHANNELS.find(ch => ch.id === channelId);
        
        if (channel) {
          const metaResult = {
            meta: {
              id: `tvchannel:${channel.id}`,
              type: "StreamsPPV",
              name: channel.name,
              poster: channel.poster || `${API_BASE_URL}/posters/${channel.name}.jpg`,
              posterShape: "landscape",
              background: channel.poster || `${API_BASE_URL}/posters/${channel.name}.jpg`,
              description: channel.description || `TV Channel - ${channel.name}`,
              genres: ["TV Channels"],
              releaseInfo: "24/7 Channel",
              videos: [{
                id: `tvchannel:${channel.id}:1`,
                title: channel.name,
                season: 1,
                episode: 1,
                released: new Date().toISOString(),
                thumbnail: channel.poster || `${API_BASE_URL}/posters/${channel.name}.jpg`
              }],
              behaviorHints: {
                defaultVideoId: `tvchannel:${channel.id}:1`
              }
            }
          };
          
          return metaResult;
        }
      }
    }
    
    return { meta: {} };
  },

  stream: async (args, req) => {
    const streams = [];
    const decodedId = decodeURIComponent(args.id.replace('.json', ''));
    
    // Detect WebOS client
    const userAgent = req.headers['user-agent'] || '';
    const isWebOS = userAgent.includes('Web0S') || userAgent.includes('Go-http-client');
    
    if (decodedId.startsWith('streamsppv:')) {
      // Handle API stream
      const streamId = parseInt(decodedId.replace('streamsppv:', ''));
      const streamsData = await fetchStreamsFromAPI();
      const apiStreams = streamsData.data || [];
      const stream = apiStreams.find(s => s.id === streamId);
      
      if (stream) {
        // Check if stream is more than 1 hour before start time
        const now = Math.floor(Date.now() / 1000);
        const hoursUntilStart = (stream.starts_at - now) / 3600;
        const isMoreThanOneHourAway = hoursUntilStart > 1;
        
        console.log(`Stream ${streamId}: ${hoursUntilStart.toFixed(2)} hours until start, more than 1 hour away: ${isMoreThanOneHourAway}`);
        
        if (isMoreThanOneHourAway) {
          // For streams > 1 hour away, only provide Web Browser option (no Puppeteer)
          console.log(`Stream ${streamId} is > 1 hour away, only providing Web Browser option`);
          
          if (!isWebOS) {
            streams.push({
              name: "Web Browser Ad Warning",
              description: `External player for ${stream.name} (starts in ${Math.floor(hoursUntilStart)} hours)`,
              externalUrl: stream.iframe,
              behaviorHints: {
                notWebReady: false
              }
            });
          }
        } else {
          // For streams within 1 hour, use normal logic with pre-scraping
          // Check if we have a cached monoUrl
          let monoUrl = getCachedMonoUrl(streamId, stream.ends_at);
          
          // If no cached monoUrl, scrape it now
          if (!monoUrl) {
            console.log(`No cached monoUrl for stream ${streamId}, scraping now...`);
            try {
              monoUrl = await scrapeMonoUrlDeduplicated(streamId, stream.iframe);
              if (monoUrl) {
                // Check if this is a 24/7 stream for special caching
                const is247Stream = stream.category === '24/7 Streams';
                setCachedMonoUrl(streamId, stream.ends_at, monoUrl, is247Stream);
                console.log(`Scraped and cached monoUrl for stream ${streamId}: ${monoUrl}`);
              }
            } catch (error) {
              console.error(`Failed to scrape monoUrl for stream ${streamId}:`, error);
            }
          } else {
            console.log(`Using cached monoUrl for stream ${streamId}: ${monoUrl}`);
          }
          
          // Always add Live Stream option with direct monoUrl proxy
          if (monoUrl) {
            streams.push({
              name: "Live Stream",
              description: `Direct stream for ${stream.name}`,
              url: `https://addon3.gstream.stream/m3u8/stream${streamId}`,
              behaviorHints: {
                notWebReady: false
              }
            });
          }
          
          // Only add Web Browser option for non-WebOS devices
          if (!isWebOS) {
            streams.push({
              name: "Web Browser Ad Warning",
              description: `External player for ${stream.name}`,
              externalUrl: stream.iframe,
              behaviorHints: {
                notWebReady: false
              }
            });
          }
        }
      }
      
    } else if (decodedId.startsWith('tvchannel:')) {
      // Handle TV channel
      let channelId = decodedId.replace('tvchannel:', '');
      
      // Remove season:episode suffix if present (e.g., ":1" from "tvchannel:sports-acc-network:1")
      if (channelId.includes(':')) {
        channelId = channelId.split(':')[0];
      }
      
      const channel = HARDCODED_TV_CHANNELS.find(ch => ch.id === channelId);
      
      if (channel && channel.sources && channel.sources.length > 0) {
        const baseUrl = "https://addon3.gstream.stream";
        
        // Add each source as an individual stream
        channel.sources.forEach(source => {
          let sourceUrl = source.url;
          let sourceHeaders = {};
          
          // Handle FILE: prefix for very long URLs
          if (source.url.startsWith('FILE:')) {
            const filename = source.url.replace('FILE:', '');
            try {
              const fs = require('fs');
              const filePath = `${__dirname}/${filename}`;
              if (fs.existsSync(filePath)) {
                sourceUrl = fs.readFileSync(filePath, 'utf8').trim();
                console.log(`📁 Loaded long URL from file: ${filename}`);
              } else {
                console.log(`❌ File not found: ${filename}`);
                return;
              }
            } catch (error) {
              console.log(`❌ Error reading file ${filename}: ${error.message}`);
              return;
            }
          }
          
          // Check if we have captured headers for this URL (from Puppeteer scraping)
          if (validateAndReturnM3U8.capturedHeaders && validateAndReturnM3U8.capturedHeaders.has(sourceUrl)) {
            sourceHeaders = validateAndReturnM3U8.capturedHeaders.get(sourceUrl);
            console.log(`🔐 Using ${Object.keys(sourceHeaders).length} captured headers for ${sourceUrl}`);
          }
          
          if (source.proxy === false) {
            // Direct URL playback with headers
            streams.push({
              name: source.label || 'Direct Stream',
              description: `Direct stream for ${channel.name}`,
              url: sourceUrl,
              headers: sourceHeaders, // Include captured headers
              behaviorHints: {
                notWebReady: false
              }
            });
          } else {
            // Use TV channels proxy
            streams.push({
              name: source.label || 'TV Channel Stream',
              description: channel.name,
              url: `${baseUrl}/proxy/tvchannels/${encodeURIComponent(sourceUrl)}`,
              headers: sourceHeaders, // Include captured headers
              behaviorHints: {
                notWebReady: false
              }
            });
          }
        });
      }
    }

    return { streams };
  }
};

// Load persistent cache on startup
loadPersistentCache();

// Run cleanup on startup
cleanupExpiredStreams();

// Parse user configuration from base64 encoded string
function parseUserConfig(encodedConfig) {
  try {
    // Add padding if needed
    const paddedConfig = encodedConfig + '='.repeat((4 - encodedConfig.length % 4) % 4);
    const decoded = Buffer.from(paddedConfig.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
    const config = JSON.parse(decoded);
    
    // Validate config structure
    if (!config.s || !Array.isArray(config.s)) {
      throw new Error('Invalid config structure');
    }
    
    return config;
  } catch (error) {
    console.error('Failed to parse user config:', error);
    return null;
  }
}

// Generate manifest with user-specific configuration
async function generateManifest(encodedConfig) {
  console.log(`generateManifest called with: ${encodedConfig}`);
  const userConfig = parseUserConfig(encodedConfig);
  
  if (!userConfig) {
    console.log('Invalid user config, returning default manifest');
    // Return default manifest if config is invalid
    return addonInterface.manifest;
  }
  
  console.log('User config parsed successfully:', userConfig);
  const enabledSports = userConfig.s;
  const baseManifest = { ...addonInterface.manifest };
  
  // Filter catalogs based on user preferences
  const filteredCatalogs = baseManifest.catalogs.filter(catalog => {
    if (catalog.id === 'streamsppv_tv_channels') {
      return true; // Always include TV channels
    }
    
    if (catalog.id === 'streamsppv_live') {
      return true; // Always include live catalog
    }
    
    // Map catalog IDs to sport names
    const sportMap = {
      'streamsppv_american_football': 'American Football',
      'streamsppv_basketball': 'Basketball',
      'streamsppv_cricket': 'Cricket',
      'streamsppv_combat_sports': 'Combat Sports',
      'streamsppv_football': 'Football',
      'streamsppv_ice_hockey': 'Ice Hockey',
      'streamsppv_motorsports': 'Motorsports',
      'streamsppv_wrestling': 'Wrestling',
      'streamsppv_miscellaneous': 'Miscellaneous',
      'streamsppv_24_7_streams': '24/7 Streams'
    };
    
    const sportName = sportMap[catalog.id];
    const shouldInclude = sportName && enabledSports.includes(sportName);
    console.log(`Catalog ${catalog.id} (${sportName}): ${shouldInclude ? 'INCLUDED' : 'EXCLUDED'}`);
    return shouldInclude;
  });
  
  baseManifest.catalogs = filteredCatalogs;
  baseManifest.name = `StreamsPPV`;
  baseManifest.description = `Live Sports Streams & Sports TV Channels -- Discord: discord.gg/pfMhfmWQam`;
  
  console.log(`Generated manifest with ${filteredCatalogs.length} catalogs`);
  return baseManifest;
}

// Request body parsing middleware
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

// Create and start server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const path = parsedUrl.pathname;
  
  // Log all requests for debugging
  console.log(`[${new Date().toISOString()}] ${req.method} ${path} - ${req.headers['user-agent'] || 'No User-Agent'}`);
  
  // Enable CORS for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Security restrictions - Only allow specific web pages via browser
  const userAgent = req.headers['user-agent'] || '';
  const isWebBrowser = /Mozilla.*(Chrome|Safari|Edge|Firefox|Opera|MSIE)/.test(userAgent) && 
                      !userAgent.includes('libmpv') && 
                      !userAgent.includes('Web0S') && 
                      !userAgent.includes('SmartTV') &&
                      !userAgent.includes('Stremio') &&
                      !userAgent.includes('node-') &&
                      !userAgent.includes('axios') &&
                      !userAgent.includes('curl') &&
                      !userAgent.includes('WindowsPowerShell') &&
                      !userAgent.includes('Wget');
  
  // Additional check: Block only direct web browser access, not Stremio client requests
  const accept = req.headers['accept'] || '';
  const secFetchSite = req.headers['sec-fetch-site'] || '';
  const secFetchDest = req.headers['sec-fetch-dest'] || '';
  const secFetchMode = req.headers['sec-fetch-mode'] || '';
  
  const isDirectWebAccess = isWebBrowser && 
                           // Method 1: Check for HTML document request (browsers prefer HTML)
                           accept.includes('text/html') &&
                           // Method 2: Check sec-fetch headers for direct navigation
                           (secFetchSite === 'none' || secFetchSite === '') &&
                           (secFetchDest === 'document' || secFetchDest === '') &&
                           // Method 3: Check for navigation mode
                           (secFetchMode === 'navigate' || secFetchMode === '') &&
                           // Method 4: Exclude API clients and apps
                           !userAgent.includes('Electron') &&
                           !userAgent.includes('Stremio') &&
                           !req.headers['origin'] &&
                           !req.headers['referer'];
  
  // Check if this is a browser request to a non-allowed path
  if (isDirectWebAccess) {
    // Strict: Only allow these 3 specific pages for browsers
    const allowedWebPaths = ['/manifest.json', '/configure', '/configuration'];
    
    if (!allowedWebPaths.includes(path) && 
        !path.startsWith('/configuration') && 
        !path.startsWith('/configure')) {
      // Immediate redirect to lmgt.org without loading any resources
      console.log(`🚫 Direct web browser access denied for ${path} - redirecting to lmgt.org`);
      res.writeHead(302, { 
        'Location': 'https://www.lmgt.org/?q=%22Accept+Defeat%2C+Get+Fucked.%22+-Gunnz',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end();
      return;
    }
  }
  
  try {
    if (path === '/') {
      // Root path - return simple info
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<h1>StreamsPPV Stremio Addon</h1><p>Manifest: <a href="/manifest.json">/manifest.json</a></p><p>Test: <a href="/test/cloudflare">/test/cloudflare</a></p>');
      return;
    } else if (path === '/test/cloudflare') {
      // Test endpoint to show Cloudflare bypass headers
      res.writeHead(200, { 'Content-Type': 'application/json' });
      
      // Use the real cached URL
      const testUrl = 'https://strm.poocloud.in/secure/bOvkpkJLgVKvSihwwqPzCVmalsOSCdMt/1768608000/1768633200/coloradoavalanche.m3u8';
      
      try {
        console.log(`🧪 Testing Cloudflare bypass for: ${testUrl}`);
        
        // Force the bypass to test
        const headers = await cfBypass.getHeaders(testUrl);
        
        console.log(`🔍 Bypass result:`, headers ? 'SUCCESS' : 'FAILED');
        
        const testData = {
          timestamp: new Date().toISOString(),
          testUrl,
          bypassActive: !!headers,
          headers: headers || {},
          identity: {
            appearsAs: headers ? 'modistreams.org' : 'your-real-ip',
            spoofedIP: headers ? headers['X-Forwarded-For'] : null,
            host: headers ? headers['Host'] : null,
            referer: headers ? headers['Referer'] : null,
            origin: headers ? headers['Origin'] : null
          },
          cloudflareSees: headers ? {
            ip: '172.67.146.192',
            domain: 'modistreams.org',
            location: 'Hidden behind Cloudflare'
          } : {
            ip: 'YOUR_REAL_IP_EXPOSED',
            domain: 'your-actual-domain',
            location: 'Direct connection'
          },
//          note: 'Redirect disabled for testing - you can now test poocloud URLs directly',
          debug: {
            urlMatch: testUrl.includes('strm.poocloud.in'),
            cfBypassExists: !!cfBypass,
            headersCount: headers ? Object.keys(headers).length : 0
          }
        };
        
        res.end(JSON.stringify(testData, null, 2));
        
      } catch (error) {
        console.error('❌ Test error:', error);
        res.end(JSON.stringify({
          error: error.message,
          bypassActive: false,
          debug: {
            urlMatch: testUrl.includes('strm.poocloud.in'),
            cfBypassExists: !!cfBypass
          }
        }, null, 2));
      }
      
      return;
    } else if (path === '/manifest.json') {
      res.writeHead(200);
      res.end(JSON.stringify(addonInterface.manifest));
      return;
    } else if (path === '/configure') {
    // Set cache-busting headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StreamsPPV Configuration</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%), url('https://spk.gstream.stream/StreamsPPV.png') center/cover; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .container { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2); max-width: 800px; width: 100%; overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; font-weight: 700; }
        .header p { font-size: 1.1em; opacity: 0.9; }
        .content { padding: 40px; }
        .section-title { font-size: 1.4em; font-weight: 600; margin-bottom: 20px; color: #333; }
        .sports-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 30px; }
        .sport-item { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 12px; padding: 15px; cursor: pointer; transition: all 0.3s ease; user-select: none; }
        .sport-item:hover { border-color: #667eea; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.2); }
        .sport-item.disabled { opacity: 0.6; background: #e9ecef; }
        .sport-item input[type="checkbox"] { margin-right: 10px; transform: scale(1.2); }
        .sport-item label { cursor: pointer; font-weight: 500; color: #333; }
        .buttons { display: flex; gap: 15px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap; }
        .btn { padding: 12px 24px; border: none; border-radius: 8px; font-size: 1em; font-weight: 600; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: inline-block; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #6c757d; color: white; }
        .btn-secondary:hover { background: #5a6268; transform: translateY(-2px); }
        .status { padding: 15px; border-radius: 8px; margin-bottom: 20px; font-weight: 500; display: none; }
        .status.success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .status.error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .manifest-url { background: #f8f9fa; border: 2px solid #e9ecef; border-radius: 12px; padding: 20px; margin-top: 20px; display: none; }
        .manifest-url h3 { margin-bottom: 15px; color: #333; }
        .url-display { display: flex; gap: 10px; align-items: center; }
        .url-display input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 6px; font-family: monospace; font-size: 0.9em; }
        .url-display button { padding: 12px 20px; background: #28a745; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
        .url-display button:hover { background: #218838; }
        .instructions { background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 20px; margin-top: 20px; }
        .instructions h4 { color: #0066cc; margin-bottom: 15px; }
        .instructions ol { margin-left: 20px; }
        .instructions li { margin-bottom: 8px; line-height: 1.5; }
        @media (max-width: 768px) { .container { margin: 10px; } .header { padding: 20px; } .header h1 { font-size: 2em; } .content { padding: 20px; } .sports-grid { grid-template-columns: 1fr; } .buttons { flex-direction: column; } .btn { width: 100%; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏆 StreamsPPV Configuration</h1>
            <p>Customize your sports streaming experience</p>
        </div>
        <div class="content">
            <h2 class="section-title">🎯 Select Your Sports Categories</h2>
            <div class="sports-grid">
                <div class="sport-item" data-sport="American Football">
                    <input type="checkbox" id="sport-american-football" checked>
                    <label for="sport-american-football">🏈 American Football</label>
                </div>
                <div class="sport-item" data-sport="Basketball">
                    <input type="checkbox" id="sport-basketball" checked>
                    <label for="sport-basketball">🏀 Basketball</label>
                </div>
                <div class="sport-item" data-sport="Cricket">
                    <input type="checkbox" id="sport-cricket" checked>
                    <label for="sport-cricket">🏏 Cricket</label>
                </div>
                <div class="sport-item" data-sport="Combat Sports">
                    <input type="checkbox" id="sport-combat-sports" checked>
                    <label for="sport-combat-sports">🥊 Combat Sports</label>
                </div>
                <div class="sport-item" data-sport="Football">
                    <input type="checkbox" id="sport-football" checked>
                    <label for="sport-football">⚽ Football</label>
                </div>
                <div class="sport-item" data-sport="Ice Hockey">
                    <input type="checkbox" id="sport-ice-hockey" checked>
                    <label for="sport-ice-hockey">🏒 Ice Hockey</label>
                </div>
                <div class="sport-item" data-sport="Motorsports">
                    <input type="checkbox" id="sport-motorsports" checked>
                    <label for="sport-motorsports">🏎️ Motorsports</label>
                </div>
                <div class="sport-item" data-sport="Wrestling">
                    <input type="checkbox" id="sport-wrestling" checked>
                    <label for="sport-wrestling">🤼 Wrestling</label>
                </div>
                <div class="sport-item" data-sport="Miscellaneous">
                    <input type="checkbox" id="sport-miscellaneous" checked>
                    <label for="sport-miscellaneous">📋 Miscellaneous</label>
                </div>
                <div class="sport-item" data-sport="24/7 Streams">
                    <input type="checkbox" id="sport-247-streams" checked>
                    <label for="sport-247-streams">📺 24/7 Streams</label>
                </div>
            </div>
            <div class="buttons">
                <button class="btn btn-primary" onclick="saveConfiguration()">💾 Save & Get My Link</button>
                <button class="btn btn-secondary" onclick="selectAll()">✅ Select All</button>
                <button class="btn btn-secondary" onclick="deselectAll()">❌ Deselect All</button>
            </div>
            <div id="status" class="status"></div>
            <div id="manifest-url" class="manifest-url">
                <h3>🔗 Your Personalized Manifest URL</h3>
                <div class="url-display">
                    <input type="text" id="manifest-url-input" readonly>
                    <button onclick="copyManifestUrl()">📋 Copy</button>
                </div>
                <div class="instructions">
                    <h4>📖 How to use your personalized link:</h4>
                    <ol>
                        <li>Copy your personalized manifest URL above</li>
                        <li>Open Stremio and go to Settings > Add-ons</li>
                        <li>Click "Install Add-on" and paste your URL</li>
                        <li>Your StreamsPPV will show only your selected sports!</li>
                        <li>Share this URL with friends or keep it for yourself</li>
                    </ol>
                    <div style="margin-top: 15px; padding: 12px; background: #fff3cd; border-radius: 6px; border-left: 4px solid #ffc107;">
                        <h5 style="color: #856404; margin: 0 0 8px 0;">⚠️ Important Note:</h5>
                        <p style="color: #856404; margin: 0 0 8px 0; line-height: 1.5;">
                            If you make changes to your sports selection later, you'll need to uninstall the addon and reinstall it with your updated URL to see the changes properly in Stremio.
                        </p>
                        <p style="color: #856404; margin: 0; line-height: 1.5;">
                            <strong>🔒 Security:</strong> Always return to <code>https://addon3.gstream.stream/configure</code> to make changes. This ensures you get a fresh, secure URL every time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        let currentUserConfig = null;
        
        async function loadConfiguration() {
            try {
                const response = await fetch('/configuration');
                currentUserConfig = await response.json();
                
                if (currentUserConfig.enabledSports) {
                    document.querySelectorAll('.sport-item input[type="checkbox"]').forEach(cb => {
                        cb.checked = false;
                        cb.parentElement.classList.add('disabled');
                    });
                    
                    currentUserConfig.enabledSports.forEach(sport => {
                        const checkbox = document.querySelector('[data-sport="' + sport + '"] input[type="checkbox"]');
                        if (checkbox) {
                            checkbox.checked = true;
                            checkbox.parentElement.classList.remove('disabled');
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to load configuration:', error);
                showStatus('Failed to load your configuration. Using default settings.', 'error');
            }
        }
        
        async function saveConfiguration() {
            const enabledSports = [];
            
            document.querySelectorAll('.sport-item input[type="checkbox"]:checked').forEach(cb => {
                enabledSports.push(cb.parentElement.dataset.sport);
            });
            
            if (enabledSports.length === 0) {
                showStatus('Please select at least one sport category.', 'error');
                return;
            }
            
            try {
                const response = await fetch('/configuration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ enabledSports })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    showStatus('Configuration saved successfully! 🎉', 'success');
                    
                    if (result.userManifestUrl) {
                        document.getElementById('manifest-url-input').value = result.userManifestUrl;
                        document.getElementById('manifest-url').style.display = 'block';
                    }
                } else {
                    throw new Error('Failed to save configuration');
                }
            } catch (error) {
                showStatus('Failed to save configuration. Please try again.', 'error');
                console.error('Save error:', error);
            }
        }
        
        function selectAll() {
            document.querySelectorAll('.sport-item input[type="checkbox"]').forEach(cb => {
                cb.checked = true;
                cb.parentElement.classList.remove('disabled');
            });
        }
        
        function deselectAll() {
            document.querySelectorAll('.sport-item input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
                cb.parentElement.classList.add('disabled');
            });
        }
        
        function copyManifestUrl() {
            const input = document.getElementById('manifest-url-input');
            input.select();
            document.execCommand('copy');
            
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = '✅ Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        }
        
        function showStatus(message, type) {
            const statusEl = document.getElementById('status');
            statusEl.textContent = message;
            statusEl.className = 'status ' + type;
            statusEl.style.display = 'block';
            
            setTimeout(() => {
                statusEl.style.display = 'none';
            }, 5000);
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.sport-item').forEach(item => {
                item.addEventListener('click', function(e) {
                    if (e.target.type !== 'checkbox') {
                        const checkbox = this.querySelector('input[type="checkbox"]');
                        checkbox.checked = !checkbox.checked;
                    }
                    
                    if (this.querySelector('input[type="checkbox"]').checked) {
                        this.classList.remove('disabled');
                    } else {
                        this.classList.add('disabled');
                    }
                });
            });
            
            loadConfiguration();
        });
    </script>
</body>
</html>`);
    return;
  } else if (path === '/configuration') {
    if (req.method === 'GET') {
      // Return current/default configuration
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        enabledSports: [
          "American Football", 
          "Basketball",
          "Cricket",
          "Combat Sports",
          "Football",
          "Ice Hockey",
          "Motorsports",
          "Wrestling",
          "Miscellaneous",
          "24/7 Streams"
        ]
      }));
      return;
    } else if (req.method === 'POST') {
      // Save configuration and generate personalized URL
      try {
        const body = await parseRequestBody(req);
        const { enabledSports } = body;
        
        if (!enabledSports || enabledSports.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Please select at least one sport category' }));
        }
        
        const config = {
          s: enabledSports,
          v: "2.0.0",
          t: Date.now()
        };
        
        const encodedConfig = Buffer.from(JSON.stringify(config)).toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
        
        const userManifestUrl = `https://addon3.gstream.stream/${encodedConfig}/manifest.json`;
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          userManifestUrl: userManifestUrl,
          enabledSports: enabledSports
        }));
        return;
      } catch (error) {
        console.error('Configuration save error:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid request body' }));
        return;
      }
    }
  } else if (path === '/config') {
    console.log('Configuration redirect requested', { ip: req.ip, userAgent: req.headers['user-agent'] });
    res.writeHead(301, { Location: 'https://addon3.gstream.stream/configure' });
    res.end();
    return;
  } else {
    // Handle user-configured routes (/:userConfig/...)
    const pathParts = path.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      const possibleUserConfig = pathParts[0];
      const routePath = '/' + pathParts.slice(1).join('/');
      
      console.log(`Checking user config route: ${possibleUserConfig} -> ${routePath}`);
      
      if (routePath === '/manifest.json') {
        console.log(`Manifest requested with user config: ${possibleUserConfig}`);
        try {
          const manifest = await generateManifest(possibleUserConfig);
          // Add cache-busting headers to encourage Stremio to refresh more frequently
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.setHeader('Last-Modified', new Date().toUTCString());
          res.writeHead(200);
          res.end(JSON.stringify(manifest));
          return;
        } catch (error) {
          console.error('Error serving manifest with user config:', error.message);
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Failed to generate manifest' }));
          return;
        }
      }
      
      if (routePath.startsWith('/meta/')) {
        const parts = routePath.split('/');
        const type = parts[2];
        const id = parts[3].replace('.json', '');
        console.log('Meta request with user config:', { type, id, path: routePath, userConfig: possibleUserConfig });
        const result = await addonInterface.getMeta({ type, id });
        res.writeHead(200);
        res.end(JSON.stringify(result));
        return;
      }
      
      if (routePath.startsWith('/catalog/')) {
        const parts = routePath.split('/');
        const type = parts[2];
        let id = parts[3];
        let extra = {};
        
        // Handle TV Channels alphabetical filtering from path (e.g., /catalog/StreamsPPV/streamsppv_tv_channels/All=A.json)
        // The filter might be in parts[4] if it exists
        if (parts.length > 4 && parts[4].includes('=')) {
          const [filterName, filterValue] = parts[4].split('=');
          // Remove .json extension if present
          const cleanFilterValue = filterValue.replace('.json', '');
          extra = { search: cleanFilterValue };
        } else if (id.includes('=')) {
          // Fallback for cases where filter is in the ID
          const [catalogId, filterValue] = id.split('=');
          // Remove .json extension if present
          const cleanFilterValue = filterValue.replace('.json', '');
          id = catalogId;
          extra = { search: cleanFilterValue };
        }
        
        // Parse extra parameter from query string (for other cases)
        if (parsedUrl.search && parsedUrl.search.startsWith('?extra=')) {
          try {
            const extraEncoded = parsedUrl.search.substring(7); // Remove '?extra='
            extra = JSON.parse(decodeURIComponent(extraEncoded));
          } catch (e) {
            console.error('Failed to parse extra parameter:', e);
          }
        }
        
        console.log('Catalog request with user config:', { type, id, extra, userConfig: possibleUserConfig });
        
        // Parse user config and pass to catalog function
        const userConfig = parseUserConfig(possibleUserConfig);
        const result = await addonInterface.catalog({ type, id, extra }, userConfig);
        res.writeHead(200);
        res.end(JSON.stringify(result));
        return;
      }
      
      if (routePath.startsWith('/stream/')) {
        const parts = routePath.split('/');
        const type = parts[2];
        const id = parts[3];
        console.log('Stream request with user config:', { type, id, userConfig: possibleUserConfig });
        const result = await addonInterface.stream({ type, id }, req);
        res.writeHead(200);
        res.end(JSON.stringify(result));
        return;
      }
      
      if (routePath.startsWith('/test/cloudflare')) {
        // Test endpoint to show Cloudflare bypass headers
        res.writeHead(200, { 'Content-Type': 'application/json' });
        
        const testUrl = 'https://strm.poocloud.in/test-stream.m3u8';
        
        try {
          const headers = await getCloudflareHeaders(testUrl);
          
          const testData = {
            timestamp: new Date().toISOString(),
            testUrl,
            bypassActive: !!headers,
            headers: headers || {},
            identity: {
              appearsAs: headers ? 'modistreams.org' : 'your-real-ip',
              spoofedIP: headers ? headers['X-Forwarded-For'] : null,
              host: headers ? headers['Host'] : null,
              referer: headers ? headers['Referer'] : null,
              origin: headers ? headers['Origin'] : null
            },
            cloudflareSees: headers ? {
              ip: '172.67.146.192',
              domain: 'modistreams.org',
              location: 'Hidden behind Cloudflare'
            } : {
              ip: 'YOUR_REAL_IP_EXPOSED',
              domain: 'your-actual-domain',
              location: 'Direct connection'
            },
            //note: 'Redirect disabled for testing - you can now test poocloud URLs directly'
          };
          
          res.end(JSON.stringify(testData, null, 2));
          
        } catch (error) {
          res.end(JSON.stringify({
            error: error.message,
            bypassActive: false
          }, null, 2));
        }
        
        return;
      }
      
      // Temporarily disable redirect for testing
      //if (routePath === '/' || routePath === '/configure' || routePath === '/manifest.json') {
        // Skip redirect for these routes during testing
        // Normal processing will continue below
      //} else if (!routePath.startsWith('/static') && !routePath.startsWith('/proxy') && !routePath.startsWith('/stream') && !routePath.startsWith('/catalog') && !routePath.startsWith('/test') && !routePath.startsWith('/configure') && !routePath !== '/manifest.json') {
        // Temporarily disabled redirect for testing
        //console.log('🧪 Redirect temporarily disabled for testing');
        // Continue to normal processing instead of redirect
     // }
      
      if (routePath.startsWith('/proxy/tvchannels/')) {
        // Handle TV Channels proxy for IPTV optimization
        // Extract the full URL from the path after /proxy/tvchannels/
        const pathParts = routePath.split('/proxy/tvchannels/');
        const targetUrl = pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : '';
        
        if (!targetUrl) {
          console.error('Invalid proxy URL format');
          res.writeHead(400);
          res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
          return;
        }
        
        try {
          // Default IPTV headers
          let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "Cache-Control": "no-cache"
          };
          
          // Check if we have captured headers for this URL (from Puppeteer scraping)
          if (validateAndReturnM3U8.capturedHeaders && validateAndReturnM3U8.capturedHeaders.has(targetUrl)) {
            const capturedHeaders = validateAndReturnM3U8.capturedHeaders.get(targetUrl);
            headers = { ...headers, ...capturedHeaders }; // Merge captured headers with defaults
            console.log(`🔐 Using ${Object.keys(capturedHeaders).length} captured headers for proxy request to ${targetUrl}`);
          }
          
          // Try to get Cloudflare bypass headers for protected URLs
          const cfHeaders = await getCloudflareHeaders(targetUrl);
          if (cfHeaders) {
            headers = { ...headers, ...cfHeaders }; // Merge Cloudflare headers
            console.log(`🛡️ Applied Cloudflare bypass headers for proxy request`);
          }
          
          const response = await axios.get(targetUrl, { 
            headers,
            timeout: 30000
          });
          
          const contentType = response.headers['content-type'] || '';
          
          // Check if this is an M3U8 playlist
          if (contentType.includes('application/vnd.apple.mpegurl') || 
              contentType.includes('application/x-mpegURL') ||
              targetUrl.includes('.m3u8')) {
            
            // Get the base URL for resolving relative paths
            const baseUrl = new URL(targetUrl).origin;
            const proxyBaseUrl = `https://addon3.gstream.stream/proxy/tvchannels`;
            
            // Rewrite M3U8 content to use proxy URLs
            let content = response.data;
            
            // Replace absolute URLs with proxy URLs (preserve the full URL)
            content = content.replace(/^(https?:\/\/[^\s\r\n]+)/gm, (match) => {
              return `${proxyBaseUrl}/${encodeURIComponent(match)}`;
            });
            
            // Replace protocol-relative URLs with proxy URLs
            content = content.replace(/^\/\/([^\s\r\n]+)/gm, (match) => {
              return `${proxyBaseUrl}/https://${encodeURIComponent(match)}`;
            });
            
            // Replace relative URLs with proxy URLs
            content = content.replace(/^\/([^\s\r\n]+)/gm, (match) => {
              return `${proxyBaseUrl}/${baseUrl}${match}`;
            });
            
            // Set appropriate headers for M3U8
            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.writeHead(200);
            res.end(content);
            
          } else {
            // For non-M3U8 content, stream directly
            const response = await axios.get(targetUrl, { 
              headers,
              responseType: 'stream',
              timeout: 30000
            });
            
            // Set appropriate headers for streaming
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.writeHead(200);
            
            // Pipe the stream directly for memory efficiency
            response.data.pipe(res);
          }
          
        } catch (error) {
          console.error('TV Channel proxy error:', error);
          res.writeHead(500);
          res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
          return;
        }
      }
      
      if (routePath.startsWith('/plex/m3u8/')) {
        // Handle Plex M3U8 direct URL provider
        const channelPath = routePath.replace('/plex/m3u8/', '');
        
        try {
          console.log(`Plex M3U8 request: ${channelPath}`);
          
          // Get or scrape the M3U8 URL with health monitoring
          const m3u8Url = await getPlexM3u8Url(channelPath);
          
          if (!m3u8Url) {
            console.error(`Failed to get M3U8 URL for: ${channelPath}`);
            res.writeHead(500);
            res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
            return;
          }
          
          console.log(`Returning direct M3U8 URL for ${channelPath}: ${m3u8Url}`);
          
          // Redirect to the direct M3U8 URL
          res.writeHead(302, { 
            'Location': m3u8Url,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          });
          res.end();
          
        } catch (error) {
          console.error('Plex M3U8 provider error:', error);
          res.writeHead(500);
          res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
          return;
        }
      }
      
      if (routePath === '/configure') {
        console.log('Configuration requested with userConfig', { 
          ip: req.ip, 
          userConfig: possibleUserConfig,
          userAgent: req.headers['user-agent']
        });
        
        // Redirect to the main configure page (ignore the userConfig for now)
        res.writeHead(301, { Location: 'https://addon3.gstream.stream/configure' });
        res.end();
        return;
      }
    }
  }
  
  if (path.startsWith('/play/')) {
      // Handle play endpoint for stream resolution
      const streamId = decodeURIComponent(path.split('/')[2]);
      console.log('Play endpoint request:', { streamId, path });
      
      // Parse stream ID (handle streamsppv:123 format)
      let cleanStreamId = streamId;
      if (streamId.startsWith('streamsppv:')) {
        cleanStreamId = streamId.replace('streamsppv:', '');
      }
      
      // Get the stream data to find iframe URL
      const streamsData = await fetchStreamsFromAPI();
      const stream = streamsData.data.find(s => String(s.id) === String(cleanStreamId));
      
      if (!stream || !stream.iframe) {
        res.writeHead(404);
        res.end(JSON.stringify({ 
          error: 'Stream not found or no iframe available',
          message: 'The stream may not exist or may not have an iframe URL'
        }));
        return;
      }
      
      // Check if we have a cached monoUrl
      const cachedMonoUrl = getCachedMonoUrl(cleanStreamId, stream.ends_at);
      
      if (cachedMonoUrl) {
        console.log(`Using cached monoUrl for stream ${cleanStreamId}: ${cachedMonoUrl}`);
        // Proxy through /m3u8/ instead of direct redirect
        const proxiedUrl = `https://addon3.gstream.stream/m3u8/${encodeURIComponent(cachedMonoUrl)}`;
        res.writeHead(302, { Location: proxiedUrl });
        res.end();
        return;
      }
      
      // If no cached URL, scrape it now
      try {
        const monoUrl = await scrapeMonoUrlDeduplicated(cleanStreamId, stream.iframe);
        
        if (monoUrl) {
          // Cache the result
          setCachedMonoUrl(cleanStreamId, stream.ends_at, monoUrl);
          console.log(`Scraped and cached monoUrl for stream ${cleanStreamId}: ${monoUrl}`);
          
          // Proxy through /m3u8/ instead of direct redirect
          const proxiedUrl = `https://addon3.gstream.stream/m3u8/${encodeURIComponent(monoUrl)}`;
          res.writeHead(302, { Location: proxiedUrl });
          res.end();
          return;
        } else {
          // Fallback to iframe proxy
          const proxiedIframeUrl = `https://addon3.gstream.stream/m3u8/${encodeURIComponent(stream.iframe)}`;
          res.writeHead(302, { Location: proxiedIframeUrl });
          res.end();
          return;
        }
      } catch (error) {
        console.error('Error in play endpoint:', error);
        // Fallback to iframe proxy
        const proxiedIframeUrl = `https://addon3.gstream.stream/m3u8/${encodeURIComponent(stream.iframe)}`;
        res.writeHead(302, { Location: proxiedIframeUrl });
        res.end();
        return;
      }
    } else if (path.startsWith('/m3u8/')) {
      // Handle M3U8 proxy with stream ID resolution
      const encodedTarget = decodeURIComponent(path.split('/')[2]);
      console.log('Proxying M3U8:', encodedTarget);
      
      let targetUrl = null;
      let streamId = null;
      
      // Check if it's a stream ID format (stream12345)
      if (encodedTarget.startsWith('stream')) {
        streamId = parseInt(encodedTarget.replace('stream', ''));
        console.log(`Resolving stream ID ${streamId} to actual M3U8 URL`);
        
        // Get the cached monoUrl for this stream
        const cachedMonoUrl = getCachedMonoUrl(streamId);
        if (cachedMonoUrl) {
          targetUrl = cachedMonoUrl;
          console.log(`Resolved stream ${streamId} to cached URL: ${targetUrl}`);
        } else {
          // If no cached URL, we need to scrape it
          console.log(`No cached URL for stream ${streamId}, scraping now...`);
          try {
            const streamsData = await fetchStreamsFromAPI();
            const apiStreams = streamsData.data || [];
            const stream = apiStreams.find(s => s.id === streamId);
            
            if (stream && stream.iframe) {
              const monoUrl = await scrapeMonoUrlDeduplicated(streamId, stream.iframe);
              if (monoUrl) {
                // Check if this is a 24/7 stream for special caching
                const is247Stream = stream.category === '24/7 Streams';
                setCachedMonoUrl(streamId, stream.ends_at, monoUrl, is247Stream);
                targetUrl = monoUrl;
                console.log(`Scraped and cached new URL for stream ${streamId}: ${targetUrl}`);
              }
            }
          } catch (error) {
            console.error(`Failed to scrape URL for stream ${streamId}:`, error);
          }
        }
      } else {
        // Legacy format - direct URL
        targetUrl = encodedTarget;
        
        // Extract stream ID from URL for WebOS fallback
        const urlMatch = targetUrl.match(/\/([^\/]+)\/tracks-v1a1\/mono\.ts\.m3u8$/);
        if (urlMatch) {
          streamId = urlMatch[1];
        }
      }
      
      if (!targetUrl) {
        console.error(`Could not resolve URL for: ${encodedTarget}`);
        res.writeHead(404);
        res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
        return;
      }
      
      // PPV Security Bypass Headers
      const baseHeaders = {
        'referer': 'https://modistreams.org/',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'accept-encoding': 'gzip, deflate, br',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'dnt': '1',
        'accept': '*/*',
        'origin': 'https://modistreams.org',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      };
      
      // Add PPV-specific headers for poocloud domains
      let headers = baseHeaders;
      if (targetUrl.includes('poocloud.in')) {
        headers = { ...baseHeaders, 'x-requested-with': 'XMLHttpRequest' };
      }
      
      try {
        const response = await axios.get(targetUrl, {
          headers: headers,
          timeout: 30000
        });
        
        // Fix .jpegnull URLs by replacing with .ts
        let processedContent = response.data.replace(/\.jpegnull/g, '.ts');
        
        // Cache the successful M3U8 content for WebOS fallback
        if (streamId && response.status === 200) {
          setCachedM3U8Content(streamId, processedContent, targetUrl);
          console.log(`📦 Cached M3U8 content for stream ${streamId}`);
        }
        
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
        res.writeHead(200);
        res.end(processedContent);
        return;
        
      } catch (error) {
        console.error('❌ M3U8 proxy error:', error.message);
        
        // WebOS Fallback: Check if we have cached content and stream ID
        if (streamId) {
          const cachedContent = getCachedM3U8Content(streamId);
          if (cachedContent) {
            console.log(`🚨 WebOS FALLBACK: Using cached M3U8 for stream ${streamId}`);
            
            // Return cached content immediately
            res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
            res.writeHead(200);
            res.end(cachedContent.content);
            return;
            
            // Start emergency rescrape in background
            emergencyRescrapeMonoUrl(streamId, null).then(newUrl => {
              if (newUrl) {
                console.log(`🔄 WebOS fallback: Updated stream URL for ${streamId} to ${newUrl}`);
                // Clear cache to force refresh on next request
                clearCachedM3U8Content(streamId);
              }
            });
            
            return;
          }
        }
        
        // If no cached content, return error playlist
        res.writeHead(500);
        res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
        return;
      }
    } else if (path.startsWith('/proxy/tvchannels/')) {
      // Handle TV Channels proxy for IPTV optimization
      // Extract the full URL from the path after /proxy/tvchannels/
      const pathParts = path.split('/proxy/tvchannels/');
      const targetUrl = pathParts.length > 1 ? decodeURIComponent(pathParts[1]) : '';
      
      if (!targetUrl) {
        console.error('Invalid proxy URL format');
        res.writeHead(400);
        res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
        return;
      }
      
      try {
        // Default IPTV headers
        let headers = {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "*/*",
          "Accept-Language": "en-US,en;q=0.9",
          "Connection": "keep-alive",
          "Cache-Control": "no-cache"
        };
        
        // Check if we have captured headers for this URL (from Puppeteer scraping)
        if (validateAndReturnM3U8.capturedHeaders && validateAndReturnM3U8.capturedHeaders.has(targetUrl)) {
          const capturedHeaders = validateAndReturnM3U8.capturedHeaders.get(targetUrl);
          headers = { ...headers, ...capturedHeaders }; // Merge captured headers with defaults
          console.log(`🔐 Using ${Object.keys(capturedHeaders).length} captured headers for proxy request to ${targetUrl}`);
        }
        
        // Find channel and add specific headers if available
        const channelId = parsedUrl.query && parsedUrl.query.channel;
        if (channelId) {
          const channel = HARDCODED_TV_CHANNELS.find(ch => ch.id === channelId);
          if (channel && channel.sources && channel.sources.length > 0) {
            const source = channel.sources[0];
            if (source.headers) {
              headers = { ...headers, ...source.headers };
            }
          }
        }
        
        const response = await axios.get(targetUrl, { 
          headers,
          timeout: 30000
        });
        
        const contentType = response.headers['content-type'] || '';
        
        // Check if this is an M3U8 playlist
        if (contentType.includes('application/vnd.apple.mpegurl') || 
            contentType.includes('application/x-mpegURL') ||
            targetUrl.includes('.m3u8')) {
          
          // Get the base URL for resolving relative paths
          const baseUrl = new URL(targetUrl).origin;
          const proxyBaseUrl = `https://addon3.gstream.stream/proxy/tvchannels`;
          
          // Rewrite M3U8 content to use proxy URLs
          let content = response.data;
          
          // Replace absolute URLs with proxy URLs (preserve the full URL)
          content = content.replace(/^(https?:\/\/[^\s\r\n]+)/gm, (match) => {
            return `${proxyBaseUrl}/${encodeURIComponent(match)}`;
          });
          
          // Replace protocol-relative URLs with proxy URLs
          content = content.replace(/^\/\/([^\s\r\n]+)/gm, (match) => {
            return `${proxyBaseUrl}/https://${encodeURIComponent(match)}`;
          });
          
          // Replace relative URLs with proxy URLs
          content = content.replace(/^\/([^\s\r\n]+)/gm, (match) => {
            return `${proxyBaseUrl}/${baseUrl}${match}`;
          });
          
          // Set appropriate headers for M3U8
          res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.writeHead(200);
          res.end(content);
          
        } else {
          // For non-M3U8 content, stream directly
          const response = await axios.get(targetUrl, { 
            headers,
            responseType: 'stream',
            timeout: 30000
          });
          
          // Set appropriate headers for streaming
          res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.writeHead(200);
          
          // Pipe the stream directly for memory efficiency
          response.data.pipe(res);
        }
        
      } catch (error) {
        console.error('TV Channel proxy error:', error);
        res.writeHead(500);
        res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
        return;
      }
    } else if (path.startsWith('/plex/m3u8/')) {
      // Handle Plex M3U8 direct URL provider
      const channelPath = path.replace('/plex/m3u8/', '');
      
      try {
        console.log(`Plex M3U8 request (default): ${channelPath}`);
        
        // Get or scrape the M3U8 URL with health monitoring
        const m3u8Url = await getPlexM3u8Url(channelPath);
        
        if (!m3u8Url) {
          console.error(`Failed to get M3U8 URL for: ${channelPath}`);
          res.writeHead(500);
          res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
          return;
        }
        
        console.log(`Returning direct M3U8 URL for ${channelPath}: ${m3u8Url}`);
        
        // Redirect to the direct M3U8 URL
        res.writeHead(302, { 
          'Location': m3u8Url,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        
      } catch (error) {
        console.error('Plex M3U8 provider error:', error);
        res.writeHead(500);
        res.end('#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-ENDLIST');
        return;
      }
    } else if (path.startsWith('/meta/')) {
      const parts = path.split('/');
      const type = parts[2];
      const id = parts[3].replace('.json', '');
      console.log('Meta request:', { type, id, path });
      const result = await addonInterface.getMeta({ type, id });
      console.log('Meta result:', JSON.stringify(result, null, 2));
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    } else if (path.startsWith('/catalog/')) {
      const parts = path.split('/');
      const type = parts[2];
      let id = parts[3];
      let extra = {};
      
      // Handle TV Channels alphabetical filtering from path (e.g., /catalog/StreamsPPV/streamsppv_tv_channels/All=A.json)
      // The filter might be in parts[4] if it exists
      if (parts.length > 4 && parts[4].includes('=')) {
        const [filterName, filterValue] = parts[4].split('=');
        // Remove .json extension if present
        const cleanFilterValue = filterValue.replace('.json', '');
        extra = { search: cleanFilterValue };
      } else if (id.includes('=')) {
        // Fallback for cases where filter is in the ID
        const [catalogId, filterValue] = id.split('=');
        // Remove .json extension if present
        const cleanFilterValue = filterValue.replace('.json', '');
        id = catalogId;
        extra = { search: cleanFilterValue };
      }
      
      // Parse extra parameter from query string (for other cases)
      if (parsedUrl.search && parsedUrl.search.startsWith('?extra=')) {
        try {
          const extraEncoded = parsedUrl.search.substring(7); // Remove '?extra='
          extra = JSON.parse(decodeURIComponent(extraEncoded));
        } catch (e) {
          console.error('Failed to parse extra parameter:', e);
        }
      }
      
      const result = await addonInterface.catalog({ type, id, extra });
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    } else if (path.startsWith('/stream/')) {
      const parts = path.split('/');
      const type = parts[2];
      const id = parts[3];
      const result = await addonInterface.stream({ type, id }, req);
      res.writeHead(200);
      res.end(JSON.stringify(result));
      return;
    } else if (path === '/discordhealth') {
      // Discord health check endpoint
      const healthStatus = {
        status: 'online',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cache_stats: {
          mono_urls: monoUrlCache.size,
          m3u8_content: m3u8ContentCache.size,
          puppeteer_queue: puppeteerQueue.length
        }
      };
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(healthStatus, null, 2));
      return;
    } else if (path === '/discordschedule') {
      // Discord schedule endpoint - live and upcoming streams within next hour
      try {
        const streamsData = await fetchStreamsFromAPI();
        const apiStreams = streamsData.data || [];
        const now = Math.floor(Date.now() / 1000);
        const oneHourFromNow = now + 3600;
        
        // Filter streams: live now or starting within next hour
        const relevantStreams = apiStreams.filter(stream => {
          return stream.starts_at <= oneHourFromNow;
        });
        
        // Process streams for Discord display
        const scheduleItems = relevantStreams.map(stream => {
          const startsAt = stream.starts_at;
          const endsAt = stream.ends_at;
          
          let status, timeInfo, emoji;
          
          if (startsAt <= now && endsAt > now) {
            // Live now
            status = 'LIVE';
            emoji = '🔴';
            timeInfo = 'LIVE NOW';
          } else if (startsAt > now) {
            // Upcoming
            status = 'UPCOMING';
            emoji = '⏳';
            const minutesUntilStart = Math.floor((startsAt - now) / 60);
            if (minutesUntilStart < 60) {
              timeInfo = `${minutesUntilStart} minutes`;
            } else {
              const hoursUntilStart = Math.floor(minutesUntilStart / 60);
              const remainingMinutes = minutesUntilStart % 60;
              timeInfo = `${hoursUntilStart}h ${remainingMinutes}m`;
            }
          } else {
            // Ended
            status = 'ENDED';
            emoji = '⏹️';
            timeInfo = 'Ended';
          }
          
          return {
            id: stream.id,
            name: stream.name,
            category: stream.category,
            status: status,
            emoji: emoji,
            time_info: timeInfo,
            starts_at: new Date(stream.starts_at * 1000).toISOString(),
            ends_at: new Date(stream.ends_at * 1000).toISOString(),
            poster: stream.poster
          };
        });
        
        // Sort by start time
        scheduleItems.sort((a, b) => new Date(a.starts_at) - new Date(b.starts_at));
        
        const scheduleResponse = {
          status: 'online',
          timestamp: new Date().toISOString(),
          total_streams: scheduleItems.length,
          live_count: scheduleItems.filter(s => s.status === 'LIVE').length,
          upcoming_count: scheduleItems.filter(s => s.status === 'UPCOMING').length,
          streams: scheduleItems
        };
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(scheduleResponse, null, 2));
        return;
        
      } catch (error) {
        console.error('Discord schedule error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          status: 'error', 
          message: 'Failed to fetch schedule',
          timestamp: new Date().toISOString()
        }));
      }
    } else {
      console.log(`404 - Path not found: ${path}`);
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }
  } catch (error) {
    console.error('Error:', error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Internal server error' }));
    return;
  }
});

const PORT = 7000;
server.listen(PORT, () => {
  console.log(`StreamsPPV addon running on http://localhost:${PORT}`);
  console.log(`Add this URL to Stremio: http://localhost:${PORT}/manifest.json`);
});
