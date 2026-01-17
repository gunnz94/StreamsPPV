# Advanced Server Optimizations for High-Performance StreamsPPV

## Current Server Analysis
- **RAM**: 128GB (only 1.2GB used - massive underutilization)
- **CPU**: Load at 0% (idle)
- **Storage**: RAID setup with 877GB available
- **Network**: Active on enp1s0f0 interface
- **Uptime**: 11 hours (fresh server)

## Immediate Optimizations

### 1. Memory Optimization for 128GB RAM

Your current setup is designed for 32GB RAM. With 128GB, we can dramatically increase caching:

```bash
# Update /etc/sysctl.conf
echo "vm.swappiness=1" >> /etc/sysctl.conf
echo "vm.dirty_ratio=20" >> /etc/sysctl.conf
echo "vm.dirty_background_ratio=5" >> /etc/sysctl.conf
echo "vm.vfs_cache_pressure=50" >> /etc/sysctl.conf
sysctl -p
```

### 2. Enhanced PM2 Configuration

Update your `ecosystem.config.js` for 128GB RAM:

```javascript
module.exports = {
  apps: [
    {
      name: 'streamsppv-addon',
      script: './addon.js',
      instances: 12, // Double the workers for 12 threads
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 7000,
        UV_THREADPOOL_SIZE: 256, // Double thread pool
        NODE_OPTIONS: '--max-old-space-size=8192 --optimize-for-size'
      },
      max_memory_restart: '4G', // Allow more memory per worker
      // ... rest of config
    }
  ]
};
```

### 3. Network Interface Optimization

Your server shows multiple network interfaces. Let's optimize the active one:

```bash
# Identify the fastest interface
ethtool enp1s0f0

# Optimize network settings for the active interface
echo "net.core.rmem_max = 268435456" >> /etc/sysctl.conf
echo "net.core.wmem_max = 268435456" >> /etc/sysctl.conf
echo "net.ipv4.tcp_rmem = 4096 131072 268435456" >> /etc/sysctl.conf
echo "net.ipv4.tcp_wmem = 4096 131072 268435456" >> /etc/sysctl.conf
echo "net.core.netdev_max_backlog = 10000" >> /etc/sysctl.conf
sysctl -p
```

### 4. File System Optimization

Your RAID setup can be optimized for streaming:

```bash
# Optimize I/O scheduler for SSD RAID
echo noop > /sys/block/md3/queue/scheduler
echo 0 > /sys/block/md3/queue/rotational

# Increase file limits for high concurrency
echo "* soft nofile 131072" >> /etc/security/limits.conf
echo "* hard nofile 131072" >> /etc/security/limits.conf
echo "fs.file-max = 4194304" >> /etc/sysctl.conf
sysctl -p
```

## Enhanced Caching Strategy

### 1. Redis for Distributed Caching

With 128GB RAM, we can implement Redis:

```bash
# Install Redis
apt install redis-server

# Configure Redis for high performance
cat > /etc/redis/redis.conf << EOF
bind 127.0.0.1
port 6379
timeout 0
tcp-keepalive 300
maxmemory 32gb
maxmemory-policy allkeys-lru
save ""
appendonly no
EOF

systemctl enable redis-server
systemctl start redis-server
```

### 2. Application-Level Caching

Update your caching strategy to use more memory:

```javascript
// In production-optimizations.js
const PRODUCTION_CONFIG = {
  // Increased for 128GB RAM
  CACHE_SIZE_LIMIT: 1024 * 1024 * 1024 * 16, // 16GB cache
  MAX_CONCURRENT_SCRAPES: 8, // Double Puppeteer instances
  WORKER_PROCESSES: 12, // Use all threads
  
  // Enhanced network settings
  REQUEST_TIMEOUT: 45000,
  MAX_CONNECTIONS: 2000, // Double connections
};
```

## Advanced Monitoring Setup

### 1. System Monitoring

```bash
# Install monitoring tools
apt install htop iotop nethogs iftop

# Create performance monitoring script
cat > /usr/local/bin/monitor-performance.sh << 'EOF'
#!/bin/bash
echo "=== System Performance $(date) ==="
echo "CPU Load: $(uptime | awk -F'load average:' '{ print $2 }')"
echo "Memory Usage: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
echo "Network I/O: $(cat /proc/net/dev | grep enp1s0f0 | awk '{print $2 " down / " $10 " up"}')"
echo "Disk I/O: $(iostat -x 1 1 | grep md3 | awk '{print $10 " KB/s read, " $11 " KB/s write"}')"
echo "=== PM2 Status ==="
pm2 status streamsppv-addon
echo "=== Redis Memory ==="
redis-cli info memory | grep used_memory_human
echo "================================"
EOF

chmod +x /usr/local/bin/monitor-performance.sh

# Add to cron for every 5 minutes
echo "*/5 * * * * /usr/local/bin/monitor-performance.sh >> /var/log/performance.log" | crontab -
```

### 2. Application Performance Monitoring

```bash
# Install Node.js monitoring
npm install -g clinic

# Create performance profiling script
cat > /var/www/streamsppv-addon/profile.sh << 'EOF'
#!/bin/bash
cd /var/www/streamsppv-addon
clinic doctor -- node addon.js
EOF

chmod +x /var/www/streamsppv-addon/profile.sh
```

## Load Testing and Benchmarking

### 1. Install Load Testing Tools

```bash
# Install Apache Bench
apt install apache2-utils

# Install wrk for modern load testing
wget https://github.com/wg/wrk/releases/download/v4.2.0/wrk-linux-4.2.0.tar.gz
tar xzvf wrk-linux-4.2.0.tar.gz
cp wrk-linux-4.2.0/wrk /usr/local/bin/
rm -rf wrk-linux-4.2.0*
```

### 2. Performance Test Scripts

```bash
# Create load testing script
cat > /usr/local/bin/load-test.sh << 'EOF'
#!/bin/bash
echo "Starting load test for StreamsPPV addon..."

# Test manifest endpoint
echo "Testing manifest endpoint..."
ab -n 1000 -c 50 http://localhost:7000/manifest.json

# Test catalog endpoint
echo "Testing catalog endpoint..."
ab -n 1000 -c 50 http://localhost:7000/catalog/StreamsPPV/streamsppv_live.json

# Test with wrk for concurrent connections
echo "Testing with wrk..."
wrk -t12 -c400 -d30s --timeout 10s --latency http://localhost:7000/manifest.json
EOF

chmod +x /usr/local/bin/load-test.sh
```

## Security Hardening for Production

### 1. Advanced Firewall Rules

```bash
# Configure UFW for production
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow from 127.0.0.1 to any port 7000  # Only local access to addon
ufw --force enable

# Rate limiting for SSH
ufw limit ssh

# Port knocking for additional security
ufw insert 1 deny in tcp dport 7000
```

### 2. Intrusion Detection

```bash
# Install and configure AIDE
apt install aide
aide --init
mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db

# Create aide check cron
echo "0 4 * * * /usr/bin/aide --check" | crontab -
```

## Database Optimization (if using external database)

### 1. PostgreSQL Optimization

```bash
# If you add PostgreSQL later
apt install postgresql

# Optimize for 128GB RAM
cat >> /etc/postgresql/14/main/postgresql.conf << EOF
# Memory settings for 128GB RAM
shared_buffers = 32GB
effective_cache_size = 96GB
work_mem = 256MB
maintenance_work_mem = 2GB
max_connections = 200
EOF
```

## Backup and Disaster Recovery

### 1. Enhanced Backup Strategy

```bash
# Create comprehensive backup script
cat > /usr/local/bin/backup-all.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup application
tar -czf $BACKUP_DIR/streamsppv-app_$DATE.tar.gz /var/www/streamsppv-addon

# Backup Redis data
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb $BACKUP_DIR/redis_$DATE.rdb

# Backup system configuration
tar -czf $BACKUP_DIR/system-config_$DATE.tar.gz /etc/sysctl.conf /etc/security/limits.conf /etc/nginx/sites-available/

# Cleanup old backups (keep 7 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.rdb" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup-all.sh

# Add to cron (daily at 3 AM)
echo "0 3 * * * /usr/local/bin/backup-all.sh" | crontab -
```

## Performance Tuning Checklist

### Immediate Actions (Run Now)
- [ ] Update PM2 configuration for 12 workers
- [ ] Increase cache limits to 16GB
- [ ] Optimize network settings for 1Gbps
- [ ] Configure Redis for caching
- [ ] Update system limits

### Monitoring Setup
- [ ] Install performance monitoring tools
- [ ] Set up automated performance logging
- [ ] Configure load testing scripts
- [ ] Set up backup automation

### Security Hardening
- [ ] Configure advanced firewall rules
- [ ] Set up intrusion detection
- [ ] Implement rate limiting
- [ ] Secure SSH access

## Expected Performance After Optimization

With these optimizations, expect:
- **Concurrent Users**: 5000+ simultaneous connections
- **Response Time**: <100ms average
- **Throughput**: Full 1Gbps utilization
- **Cache Hit Rate**: >90% with 16GB cache
- **Memory Usage**: 16-32GB (much better utilization)
- **CPU Usage**: 40-70% under peak load

## Next Steps

1. **Apply immediate optimizations**:
   ```bash
   sudo sysctl -p
   pm2 reload ecosystem.config.js --env production
   ```

2. **Install Redis** for enhanced caching
3. **Set up monitoring** to track improvements
4. **Run load tests** to verify performance gains
5. **Implement backup strategy** for production safety

Your server has massive potential - these optimizations will help you fully utilize the 128GB RAM and high-performance hardware.
