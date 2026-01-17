const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin);

class CloudflareSession {
  constructor() {
    this.browser = null;
    this.page = null;
    this.cookies = null;
    this.userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0'
    ];
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });
    
    this.page = await this.browser.newPage();
    
    // Set realistic viewport
    await this.page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: true
    });
    
    // Set random user agent
    const randomUA = this.userAgents[Math.floor(Math.random() * this.userAgents.length)];
    await this.page.setUserAgent(randomUA);
    
    // Set extra headers
    await this.page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    });
  }

  async bypassCloudflare(url) {
    try {
      console.log('Navigating to ppv.to to establish session...');
      
      // First visit ppv.to to get Cloudflare clearance
      await this.page.goto('https://ppv.to/', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for a bit to ensure Cloudflare verification
      await this.page.waitForTimeout(3000);
      
      // Extract cookies
      this.cookies = await this.page.cookies();
      
      console.log('Cloudflare session established!');
      
      // Now navigate to target URL with the established session
      console.log(`Accessing target: ${url}`);
      
      // Set cookies for target domain
      const targetUrl = new URL(url);
      await this.page.setCookie(...this.cookies.map(cookie => ({
        ...cookie,
        domain: targetUrl.hostname,
        url: url
      })));
      
      await this.page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Get final cookies after Cloudflare
      const finalCookies = await this.page.cookies();
      
      return {
        cookies: finalCookies,
        userAgent: await this.page.evaluate(() => navigator.userAgent),
        headers: {
          'Referer': 'https://ppv.to/',
          'Origin': 'https://ppv.to',
          'X-Forwarded-For': '104.26.1.0',
          'X-Real-IP': '104.26.1.0',
          'CF-Connecting-IP': '104.26.1.0',
          'X-Forwarded-Host': 'ppv.to',
          'X-Forwarded-Proto': 'https'
        }
      };
      
    } catch (error) {
      console.error('Cloudflare bypass failed:', error);
      throw error;
    }
  }

  async getHeadersForUrl(url) {
    try {
      // Navigate to modistreams.org to establish Cloudflare session
      await this.page.goto('https://modistreams.org/', { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait a bit for any Cloudflare challenges
      await this.page.waitForTimeout(3000);
      
      // Get cookies from modistreams.org
      const cookies = await this.page.cookies();
      
      // Get the user agent
      const userAgent = await this.page.evaluate(() => navigator.userAgent);
      
      // Create headers object
      const headers = {
        'User-Agent': userAgent,
        'Referer': 'https://modistreams.org/',
        'Origin': 'https://modistreams.org',
        'Host': 'modistreams.org',
        'X-Forwarded-For': '172.67.146.192',
        'X-Real-IP': '172.67.146.192',
        'CF-Connecting-IP': '172.67.146.192',
        'X-Forwarded-Host': 'modistreams.org',
        'X-Forwarded-Proto': 'https',
        'Accept': 'application/vnd.apple.mpegurl+json, application/vnd.apple.mpegurl, application/json, application/x-mpegURL, video/mp2t, application/octet-stream, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
      };
      
      // Add cookies to headers
      cookies.forEach(cookie => {
        if (cookie.name === '__cfduid' || cookie.name === 'cf_clearance') {
          headers['Cookie'] = `${cookie.name}=${cookie.value}; ${headers['Cookie'] || ''}`;
        }
      });
      
      return headers;
    } catch (error) {
      console.error('Failed to get headers:', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Usage example
async function getCloudflareHeaders(targetUrl) {
  const cfSession = new CloudflareSession();
  
  try {
    await cfSession.init();
    const headers = await cfSession.getHeadersForUrl(targetUrl);
    await cfSession.close();
    
    return headers;
  } catch (error) {
    await cfSession.close();
    throw error;
  }
}

module.exports = { CloudflareSession, getCloudflareHeaders };
