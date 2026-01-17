module.exports = {
  apps: [
    {
      name: 'streamsppv-addon',
      script: './addon.js',
      instances: 'max', // Use all CPU cores
      exec_mode: 'cluster', // Enable cluster mode for load balancing
      env: {
        NODE_ENV: 'production',
        PORT: 7000,
        UV_THREADPOOL_SIZE: 128, // Increase thread pool for I/O operations
        NODE_OPTIONS: '--max-old-space-size=4096 --optimize-for-size'
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 7000
      },
      // Performance optimization settings
      max_memory_restart: '2G',
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000,
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules', 'cache', '*.log'],
      // Logging configuration
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      // Advanced clustering options
      node_args: '--experimental-modules --max-old-space-size=4096',
      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000
    }
  ],
  
  // Deployment configuration for production
  deploy: {
    production: {
      user: 'root',
      host: 'addon3.gstream.stream',
      ref: 'origin/main',
      repo: 'https://github.com/yourusername/streamsppv-addon.git',
      path: '/var/www/streamsppv-addon',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
