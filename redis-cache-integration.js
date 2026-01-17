// Redis Cache Integration for StreamsPPV
// Optimized for 128GB RAM server

const Redis = require('redis');
const { promisify } = require('util');

class RedisCache {
  constructor(options = {}) {
    this.client = Redis.createClient({
      host: options.host || '127.0.0.1',
      port: options.port || 6379,
      db: options.db || 0,
      retry_delay_on_failover: 100,
      enable_offline_queue: false,
      connect_timeout: 60000,
      max_retries_per_request: 3
    });

    this.defaultTTL = options.defaultTTL || 3600; // 1 hour default
    this.keyPrefix = options.keyPrefix || 'streamsppv:';
    
    // Promisify Redis commands
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
    this.existsAsync = promisify(this.client.exists).bind(this.client);
    this.flushdbAsync = promisify(this.client.flushdb).bind(this.client);
    
    // Connection monitoring
    this.client.on('connect', () => {
      console.log('🔗 Redis connected');
    });
    
    this.client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });
    
    this.client.on('close', () => {
      console.log('🔌 Redis connection closed');
    });
  }

  // Generate cache key
  _key(key) {
    return `${this.keyPrefix}${key}`;
  }

  // Get value from cache
  async get(key) {
    try {
      const value = await this.getAsync(this._key(key));
      if (value) {
        console.log(`✅ Cache hit: ${key}`);
        return JSON.parse(value);
      }
      console.log(`❌ Cache miss: ${key}`);
      return null;
    } catch (error) {
      console.error(`❌ Cache get error for ${key}:`, error);
      return null;
    }
  }

  // Set value in cache
  async set(key, value, ttl = this.defaultTTL) {
    try {
      const serialized = JSON.stringify(value);
      await this.setAsync(this._key(key), serialized, 'EX', ttl);
      console.log(`💾 Cache set: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      console.error(`❌ Cache set error for ${key}:`, error);
      return false;
    }
  }

  // Delete from cache
  async del(key) {
    try {
      const result = await this.delAsync(this._key(key));
      if (result > 0) {
        console.log(`🗑️ Cache deleted: ${key}`);
      }
      return result > 0;
    } catch (error) {
      console.error(`❌ Cache delete error for ${key}:`, error);
      return false;
    }
  }

  // Check if key exists
  async exists(key) {
    try {
      const result = await this.existsAsync(this._key(key));
      return result === 1;
    } catch (error) {
      console.error(`❌ Cache exists error for ${key}:`, error);
      return false;
    }
  }

  // Clear all cache
  async clear() {
    try {
      await this.flushdbAsync();
      console.log('🧹 Cache cleared');
      return true;
    } catch (error) {
      console.error('❌ Cache clear error:', error);
      return false;
    }
  }

  // Get cache statistics
  async getStats() {
    try {
      const info = await promisify(this.client.info).bind(this.client)();
      const lines = info.split('\r\n');
      const stats = {};
      
      lines.forEach(line => {
        if (line.includes(':')) {
          const [key, value] = line.split(':');
          if (key.includes('used_memory') || key.includes('keyspace') || key.includes('connected_clients')) {
            stats[key] = value;
          }
        }
      });
      
      return stats;
    } catch (error) {
      console.error('❌ Cache stats error:', error);
      return {};
    }
  }

  // Close connection
  async quit() {
    try {
      await promisify(this.client.quit).bind(this.client)();
      console.log('🔌 Redis connection closed');
    } catch (error) {
      console.error('❌ Redis quit error:', error);
    }
  }
}

// Enhanced caching layer with Redis fallback
class EnhancedCache {
  constructor(redisOptions = {}) {
    this.redisCache = new RedisCache(redisOptions);
    this.memoryCache = new Map(); // Fallback memory cache
    this.redisAvailable = true;
    
    // Test Redis connection
    this.testRedisConnection();
  }

  async testRedisConnection() {
    try {
      await this.redisCache.get('test');
      this.redisAvailable = true;
      console.log('✅ Redis cache available');
    } catch (error) {
      this.redisAvailable = false;
      console.log('⚠️ Redis unavailable, using memory cache fallback');
    }
  }

  async get(key) {
    if (this.redisAvailable) {
      try {
        const value = await this.redisCache.get(key);
        if (value !== null) return value;
      } catch (error) {
        console.log('⚠️ Redis error, falling back to memory cache');
        this.redisAvailable = false;
      }
    }
    
    // Fallback to memory cache
    const memValue = this.memoryCache.get(key);
    if (memValue && memValue.expires > Date.now()) {
      return memValue.value;
    }
    
    return null;
  }

  async set(key, value, ttl = 3600) {
    if (this.redisAvailable) {
      try {
        const success = await this.redisCache.set(key, value, ttl);
        if (success) return true;
      } catch (error) {
        console.log('⚠️ Redis error, using memory cache');
        this.redisAvailable = false;
      }
    }
    
    // Fallback to memory cache
    this.memoryCache.set(key, {
      value,
      expires: Date.now() + (ttl * 1000)
    });
    
    return true;
  }

  async del(key) {
    if (this.redisAvailable) {
      try {
        await this.redisCache.del(key);
      } catch (error) {
        console.log('⚠️ Redis delete error');
      }
    }
    
    this.memoryCache.delete(key);
  }

  async getStats() {
    if (this.redisAvailable) {
      try {
        const redisStats = await this.redisCache.getStats();
        return {
          ...redisStats,
          memoryCacheSize: this.memoryCache.size,
          cacheType: 'redis'
        };
      } catch (error) {
        console.log('⚠️ Redis stats error');
      }
    }
    
    return {
      memoryCacheSize: this.memoryCache.size,
      cacheType: 'memory'
    };
  }
}

// Stream-specific cache operations
class StreamCache extends EnhancedCache {
  constructor(redisOptions) {
    super(redisOptions);
    this.keyPrefix = 'stream:';
  }

  // Cache stream data
  async cacheStream(streamId, streamData, ttl = 1800) { // 30 minutes
    const key = `${this.keyPrefix}${streamId}`;
    return await this.set(key, streamData, ttl);
  }

  // Get cached stream
  async getStream(streamId) {
    const key = `${this.keyPrefix}${streamId}`;
    return await this.get(key);
  }

  // Cache monoUrl
  async cacheMonoUrl(streamId, monoUrl, endsAt, ttl = 7200) { // 2 hours
    const key = `${this.keyPrefix}mono:${streamId}`;
    const data = {
      url: monoUrl,
      endsAt,
      cachedAt: Date.now()
    };
    return await this.set(key, data, ttl);
  }

  // Get cached monoUrl
  async getMonoUrl(streamId) {
    const key = `${this.keyPrefix}mono:${streamId}`;
    const cached = await this.get(key);
    
    if (cached && cached.endsAt > Date.now() / 1000) {
      return cached.url;
    }
    
    return null;
  }

  // Cache M3U8 content
  async cacheM3U8(streamId, m3u8Content, ttl = 300) { // 5 minutes
    const key = `${this.keyPrefix}m3u8:${streamId}`;
    return await this.set(key, m3u8Content, ttl);
  }

  // Get cached M3U8
  async getM3U8(streamId) {
    const key = `${this.keyPrefix}m3u8:${streamId}`;
    return await this.get(key);
  }

  // Cache API response
  async cacheApiResponse(endpoint, data, ttl = 300) { // 5 minutes
    const key = `${this.keyPrefix}api:${endpoint}`;
    return await this.set(key, data, ttl);
  }

  // Get cached API response
  async getApiResponse(endpoint) {
    const key = `${this.keyPrefix}api:${endpoint}`;
    return await this.get(key);
  }

  // Clean expired streams
  async cleanExpiredStreams() {
    const now = Date.now();
    let cleaned = 0;
    
    // This would require Redis SCAN operation for production
    // For now, we'll implement a basic cleanup
    console.log('🧹 Starting expired stream cleanup...');
    
    // In production, you'd use Redis SCAN with pattern matching
    // For memory cache fallback, clean expired entries
    for (const [key, value] of this.memoryCache.entries()) {
      if (value.expires < now) {
        this.memoryCache.delete(key);
        cleaned++;
      }
    }
    
    console.log(`🧹 Cleaned ${cleaned} expired cache entries`);
    return cleaned;
  }
}

// Initialize cache instance
const streamCache = new StreamCache({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  defaultTTL: 3600,
  keyPrefix: 'streamsppv:'
});

// Export for use in main application
module.exports = {
  RedisCache,
  EnhancedCache,
  StreamCache,
  streamCache
};
