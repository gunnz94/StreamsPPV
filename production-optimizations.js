// Production optimizations for StreamsPPV Addon
// This file contains optimizations to be integrated into addon.js

const cluster = require('cluster');
const os = require('os');

// Production configuration
const PRODUCTION_CONFIG = {
  // CPU optimization for AMD Ryzen 5 5600X (6 cores/12 threads)
  WORKER_PROCESSES: os.cpus().length,
  
  // Memory optimization for 32GB RAM
  CACHE_SIZE_LIMIT: 1024 * 1024 * 1024, // 1GB cache limit
  MAX_CONCURRENT_SCRAPES: 4, // Limit Puppeteer instances
  
  // Network optimization
  REQUEST_TIMEOUT: 30000,
  MAX_CONNECTIONS: 1000,
  KEEP_ALIVE_TIMEOUT: 65000,
  
  // Performance tuning
  GC_INTERVAL: 300000, // 5 minutes
  CLEANUP_INTERVAL: 600000, // 10 minutes
};

// Enhanced caching with memory limits
class MemoryEfficientCache {
  constructor(maxSize = PRODUCTION_CONFIG.CACHE_SIZE_LIMIT) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.currentSize = 0;
  }

  set(key, value) {
    const size = this._estimateSize(value);
    
    // Remove old entries if we're over the limit
    while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
      const firstKey = this.cache.keys().next().value;
      const firstValue = this.cache.get(firstKey);
      this.currentSize -= this._estimateSize(firstValue);
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
    this.currentSize += size;
  }

  get(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (LRU)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  has(key) {
    return this.cache.has(key);
  }

  delete(key) {
    const value = this.cache.get(key);
    if (value !== undefined) {
      this.currentSize -= this._estimateSize(value);
      return this.cache.delete(key);
    }
    return false;
  }

  clear() {
    this.cache.clear();
    this.currentSize = 0;
  }

  _estimateSize(obj) {
    // Rough estimation of object size in bytes
    return JSON.stringify(obj).length * 2; // UTF-16
  }
}

// Connection pooling for HTTP requests
const http = require('http');
const https = require('https');

class ConnectionPool {
  constructor(maxConnections = PRODUCTION_CONFIG.MAX_CONNECTIONS) {
    this.maxConnections = maxConnections;
    this.activeConnections = 0;
    this.pendingRequests = [];
  }

  async execute(requestFn) {
    return new Promise((resolve, reject) => {
      if (this.activeConnections < this.maxConnections) {
        this._executeRequest(requestFn, resolve, reject);
      } else {
        this.pendingRequests.push({ requestFn, resolve, reject });
      }
    });
  }

  _executeRequest(requestFn, resolve, reject) {
    this.activeConnections++;
    
    requestFn()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      })
      .finally(() => {
        this.activeConnections--;
        this._processPending();
      });
  }

  _processPending() {
    if (this.pendingRequests.length > 0 && this.activeConnections < this.maxConnections) {
      const { requestFn, resolve, reject } = this.pendingRequests.shift();
      this._executeRequest(requestFn, resolve, reject);
    }
  }
}

// Optimized HTTP client with connection pooling
const connectionPool = new ConnectionPool();

async function optimizedRequest(url, options = {}) {
  return connectionPool.execute(async () => {
    const axios = require('axios');
    return axios.get(url, {
      timeout: PRODUCTION_CONFIG.REQUEST_TIMEOUT,
      ...options
    });
  });
}

// Puppeteer pool management
class PuppeteerPool {
  constructor(maxSize = PRODUCTION_CONFIG.MAX_CONCURRENT_SCRAPES) {
    this.maxSize = maxSize;
    this.pool = [];
    this.active = 0;
    this.pending = [];
  }

  async getBrowser() {
    return new Promise((resolve, reject) => {
      if (this.pool.length > 0) {
        const browser = this.pool.pop();
        resolve(browser);
      } else if (this.active < this.maxSize) {
        this._createBrowser().then(resolve).catch(reject);
      } else {
        this.pending.push({ resolve, reject });
      }
    });
  }

  async releaseBrowser(browser) {
    try {
      // Check if browser is still connected
      if (browser && browser.isConnected()) {
        // Clear any remaining pages to prevent memory leaks
        const pages = await browser.pages();
        await Promise.all(pages.map(page => page.close()));
        
        this.pool.push(browser);
      } else {
        // Browser is disconnected, don't return to pool
        this.active--;
      }
    } catch (error) {
      console.error('Error releasing browser:', error);
      this.active--;
    }
    
    this._processPending();
  }

  async _createBrowser() {
    this.active++;
    const puppeteer = require('puppeteer');
    
    return puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--disable-features=VizDisplayCompositor',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--memory-pressure-off', // Disable memory pressure for better performance
        '--max_old_space_size=2048' // Limit browser memory
      ]
    });
  }

  _processPending() {
    if (this.pending.length > 0 && (this.pool.length > 0 || this.active < this.maxSize)) {
      const { resolve, reject } = this.pending.shift();
      
      if (this.pool.length > 0) {
        resolve(this.pool.pop());
      } else {
        this._createBrowser().then(resolve).catch(reject);
      }
    }
  }

  async cleanup() {
    // Close all browsers in pool
    const closePromises = this.pool.map(browser => browser.close());
    await Promise.all(closePromises);
    this.pool = [];
    this.active = 0;
  }
}

// Global puppeteer pool
const puppeteerPool = new PuppeteerPool();

// Enhanced scraping with pool management
async function optimizedScrapeMonoUrl(streamId, iframeUrl) {
  let browser;
  try {
    browser = await puppeteerPool.getBrowser();
    const page = await browser.newPage();
    
    // Rest of the scraping logic from original function
    // ... (copy existing scraping logic here)
    
    return result;
  } catch (error) {
    console.error(`Error scraping monoUrl for stream ${streamId}:`, error);
    return null;
  } finally {
    if (browser) {
      await puppeteerPool.releaseBrowser(browser);
    }
  }
}

// Memory management and garbage collection
function setupMemoryManagement() {
  // Force garbage collection periodically
  setInterval(() => {
    if (global.gc) {
      global.gc();
      console.log('🧹 Forced garbage collection');
    }
  }, PRODUCTION_CONFIG.GC_INTERVAL);

  // Monitor memory usage
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const memUsageMB = {
      rss: Math.round(memUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
      external: Math.round(memUsage.external / 1024 / 1024)
    };
    
    console.log(`📊 Memory usage:`, memUsageMB);
    
    // Alert if memory usage is high
    if (memUsageMB.heapUsed > 2048) { // 2GB
      console.warn('⚠️ High memory usage detected, consider scaling');
    }
  }, PRODUCTION_CONFIG.CLEANUP_INTERVAL);
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      requests: 0,
      errors: 0,
      scrapes: 0,
      cacheHits: 0,
      cacheMisses: 0,
      avgResponseTime: 0
    };
    this.responseTimes = [];
  }

  recordRequest(duration, isError = false) {
    this.metrics.requests++;
    if (isError) this.metrics.errors++;
    
    this.responseTimes.push(duration);
    if (this.responseTimes.length > 100) {
      this.responseTimes.shift();
    }
    
    this.metrics.avgResponseTime = this.responseTimes.reduce((a, b) => a + b, 0) / this.responseTimes.length;
  }

  recordScrape() {
    this.metrics.scrapes++;
  }

  recordCacheHit() {
    this.metrics.cacheHits++;
  }

  recordCacheMiss() {
    this.metrics.cacheMisses++;
  }

  getMetrics() {
    return {
      ...this.metrics,
      cacheHitRate: this.metrics.cacheHits / (this.metrics.cacheHits + this.metrics.cacheMisses) || 0,
      errorRate: this.metrics.errors / this.metrics.requests || 0
    };
  }
}

const performanceMonitor = new PerformanceMonitor();

// Cluster mode setup for PM2
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  console.log(`🚀 Master process ${process.pid} is running`);
  
  // Fork workers for each CPU core
  const numWorkers = Math.min(PRODUCTION_CONFIG.WORKER_PROCESSES, os.cpus().length);
  
  for (let i = 0; i < numWorkers; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
  
  // Setup monitoring in master
  setupMemoryManagement();
  
} else {
  // Worker process - your existing addon.js code would run here
  console.log(`🔧 Worker process ${process.pid} started`);
}

// Export optimizations for use in main addon
module.exports = {
  PRODUCTION_CONFIG,
  MemoryEfficientCache,
  ConnectionPool,
  PuppeteerPool,
  optimizedRequest,
  optimizedScrapeMonoUrl,
  setupMemoryManagement,
  PerformanceMonitor,
  performanceMonitor
};
