const axios = require('axios');
const { CloudflareSession } = require('./session-stealer');

class CloudflareBypass {
  constructor() {
    this.cache = new Map();
    this.session = null;
  }

  async getHeaders(url) {
    // Check cache first
    if (this.cache.has(url)) {
      const cached = this.cache.get(url);
      if (Date.now() - cached.timestamp < 300000) { // 5 minutes cache
        return cached.headers;
      }
    }

    try {
      // Get fresh headers using Puppeteer
      const headers = await this.getFreshHeaders(url);
      
      // Cache the headers
      this.cache.set(url, {
        headers,
        timestamp: Date.now()
      });

      return headers;
    } catch (error) {
      console.error('Failed to get Cloudflare headers:', error);
      
      // Fallback to basic spoofing
      return this.getBasicSpoofHeaders();
    }
  }

  async getFreshHeaders(url) {
    const session = new CloudflareSession();
    await session.init();
    
    try {
      const headers = await session.getHeadersForUrl(url);
      await session.close();
      return headers;
    } catch (error) {
      await session.close();
      throw error;
    }
  }

  getBasicSpoofHeaders() {
    return {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://modistreams.org/',
      'Origin': 'https://modistreams.org',
      'X-Forwarded-For': '172.67.146.192',
      'X-Real-IP': '172.67.146.192',
      'CF-Connecting-IP': '172.67.146.192',
      'X-Forwarded-Host': 'modistreams.org',
      'X-Forwarded-Proto': 'https',
      'Host': 'modistreams.org',
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
  }

  async testUrl(url) {
    const headers = await this.getHeaders(url);
    
    try {
      const response = await axios.get(url, {
        headers,
        timeout: 10000,
        maxRedirects: 5
      });
      
      return {
        success: true,
        status: response.status,
        headers: response.headers,
        data: response.data.slice(0, 1000) // First 1KB
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        status: error.response?.status
      };
    }
  }

  clearCache() {
    this.cache.clear();
  }
}

// Usage in your addon
const cfBypass = new CloudflareBypass();

// Example: Get headers for a URL
async function getStreamWithBypass(url) {
  const headers = await cfBypass.getHeaders(url);
  
  // Use headers in your stream request
  return {
    url,
    headers,
    proxy: false
  };
}

module.exports = { CloudflareBypass, getStreamWithBypass };
