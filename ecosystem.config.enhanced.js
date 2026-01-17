module.exports = {
  apps: [
    {
      name: 'streamsppv-addon',
      script: './addon.js',
      instances: 12, // Use all 12 threads on Ryzen 5 5600X
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 7000,
        UV_THREADPOOL_SIZE: 256, // Double thread pool for 128GB RAM
        NODE_OPTIONS: '--max-old-space-size=8192 --optimize-for-size --expose-gc',
        // Enhanced caching for 128GB RAM
        CACHE_SIZE_LIMIT: 17179869184, // 16GB cache
        MAX_CONCURRENT_SCRAPES: 8, // Double Puppeteer instances
        MAX_CONNECTIONS: 2000, // Double HTTP connections
        REDIS_URL: 'redis://127.0.0.1:6379',
        ENABLE_METRICS: 'true',
        METRICS_PORT: 9090
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 7000,
        UV_THREADPOOL_SIZE: 128,
        NODE_OPTIONS: '--max-old-space-size=4096'
      },
      // Performance settings optimized for 128GB RAM
      max_memory_restart: '4G', // Allow more memory per worker
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'cache', '*.log', 'logs'],
      // Enhanced logging
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Advanced clustering for high performance
      node_args: '--experimental-modules --max-old-space-size=8192 --expose-gc',
      // Graceful shutdown with longer timeout
      kill_timeout: 10000,
      wait_ready: true,
      listen_timeout: 15000,
      // Health check configuration
      health_check_grace_period: 3000,
      health_check_fatal_exceptions: true,
      // Performance monitoring
      pmx: true,
      instance_var: 'INSTANCE_ID',
      // Load balancing strategy
      load_test: {
        script: './load-test.js',
        config: {
          concurrency: 100,
          duration: 30
        }
      }
    }
  ],
  
  // Redis configuration for caching
  redis: {
    port: 6379,
    host: '127.0.0.1',
    max_memory: '32gb',
    max_memory_policy: 'allkeys-lru',
    save: '',
    appendonly: false
  },
  
  // Deployment configuration
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'addon3.gstream.stream',
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/streamsppv-addon.git',
      path: '/var/www/streamsppv-addon',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.enhanced.js --env production',
      'pre-setup': '',
      'ssh_options': 'StrictHostKeyChecking=no'
    }
  }
};
