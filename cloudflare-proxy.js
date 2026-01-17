const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fetch = require('node-fetch');
const axios = require('axios');

const app = express();

// Cloudflare bypass proxy
app.use('/stream/*', async (req, res) => {
  try {
    const targetUrl = req.originalUrl.replace('/stream/', '');
    
    // Get modistreams.org page to extract cookies/tokens
    const pageResponse = await fetch('https://modistreams.org/', {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    // Extract cookies from modistreams.org
    async function getCookies() {
      try {
        const response = await axios.get('https://modistreams.org/', {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          }
        });
        
        // Extract cookies from response headers
        const setCookieHeader = response.headers['set-cookie'];
        if (setCookieHeader) {
          const cookies = setCookieHeader.map(cookie => cookie.split(';')[0]).join('; ');
          return cookies;
        }
        
        return null;
      } catch (error) {
        console.error('Failed to get cookies:', error.message);
        return null;
      }
    }
    
    const cookies = await getCookies();
    const cfClearance = cookies?.match(/cf_clearance=([^;]+)/)?.[1] || '';
    const cfduid = cookies?.match(/__cfduid=([^;]+)/)?.[1] || '';
    
    // Forward request with modistreams.org headers
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://modistreams.org/',
        'Origin': 'https://modistreams.org',
        'X-Forwarded-For': '172.67.146.192',
        'X-Real-IP': '172.67.146.192',
        'CF-Connecting-IP': '172.67.146.192',
        'X-Forwarded-Host': 'modistreams.org',
        'X-Forwarded-Proto': 'https',
        'Host': 'modistreams.org',
        'Cookie': `__cfduid=${cfduid}; cf_clearance=${cfClearance}`,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site'
      }
    });
    
    // Stream response
    response.body.pipe(res);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Cloudflare proxy running on port ${PORT}`);
  console.log(`Usage: http://localhost:${PORT}/stream/YOUR_TARGET_URL`);
});
