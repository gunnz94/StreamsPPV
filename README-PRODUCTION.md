# StreamsPPV Production Deployment Guide

## Overview
This guide covers deploying the StreamsPPV Stremio addon on Ubuntu 22.04 LTS with maximum performance optimization.

## System Requirements
- **OS**: Ubuntu Server 22.04 LTS
- **CPU**: AMD Ryzen 5 5600X (6c/12t) or equivalent
- **RAM**: 32GB ECC RAM
- **Storage**: 2×960GB NVMe SSD (RAID recommended)
- **Network**: 1 Gbps symmetric bandwidth

## Quick Start

### 1. Server Setup
```bash
# Download and run the setup script
wget https://your-server.com/server-setup.sh
chmod +x server-setup.sh
sudo ./server-setup.sh
```

### 2. Transfer Files
```bash
# Copy your addon files to the server
scp -r /path/to/StremioStreamsPPV/* root@addon3.gstream.stream:/var/www/streamsppv-addon/
```

### 3. Install Dependencies
```bash
cd /var/www/streamsppv-addon
npm install --production
```

### 4. Configure Environment
```bash
# Copy production environment file
cp .env.production .env

# Edit configuration as needed
nano .env
```

### 5. Setup Cloudflare Tunnel
```bash
# Follow the cloudflare-setup.md guide
# Then start the tunnel
systemctl start cloudflared
systemctl enable cloudflared
```

### 6. Start Application
```bash
# Start with PM2
./start.sh

# Or manually
pm2 start ecosystem.config.js --env production
```

## Performance Optimizations Applied

### CPU Optimization
- **Cluster Mode**: PM2 runs worker processes for each CPU core (6 workers on Ryzen 5 5600X)
- **Thread Pool**: Increased UV_THREADPOOL_SIZE to 128 for better I/O concurrency
- **Load Balancing**: Requests automatically distributed across worker processes

### Memory Optimization
- **Efficient Caching**: LRU cache with 1GB memory limit
- **Puppeteer Pool**: Limited to 4 concurrent browser instances
- **Garbage Collection**: Forced GC every 5 minutes
- **Memory Monitoring**: Automatic alerts for high memory usage

### Network Optimization
- **Connection Pooling**: HTTP requests pooled and limited to 1000 concurrent
- **Keep-Alive**: Optimized timeout settings for persistent connections
- **Rate Limiting**: Built-in protection against abuse
- **Nginx Proxy**: Optional reverse proxy with additional optimizations

### Kernel Tuning
- **TCP BBR**: Modern congestion control algorithm
- **Buffer Sizes**: Optimized for high-throughput streaming
- **File Limits**: Increased for high connection counts
- **Memory Management**: Swappiness and dirty ratio tuned for SSD

## Monitoring and Maintenance

### Health Checks
```bash
# Application health
curl https://addon3.gstream.stream/health

# PM2 status
pm2 status
pm2 monit

# System resources
htop
iotop
```

### Log Management
```bash
# Application logs
pm2 logs streamsppv-addon

# System logs
journalctl -u cloudflared -f

# Log rotation (automatic)
ls -la /var/www/streamsppv-addon/logs/
```

### Performance Metrics
```bash
# PM2 metrics
pm2 show streamsppv-addon

# Cloudflare tunnel metrics
curl http://localhost:2020/metrics

# System performance
vmstat 1
iostat 1
```

## Scaling Considerations

### Vertical Scaling
- **CPU**: Add more cores (PM2 will automatically utilize them)
- **RAM**: Increase cache sizes in .env configuration
- **Storage**: Use faster NVMe drives for better I/O

### Horizontal Scaling
- **Load Balancer**: Use Cloudflare Load Balancer
- **Multiple Servers**: Deploy across multiple instances
- **Database**: Consider Redis for distributed caching

## Security Hardening

### Firewall Rules
```bash
# Current UFW status
ufw status verbose

# Allowed ports:
# - SSH (22)
# - HTTP (80)
# - HTTPS (443)
# - Application (7000)
```

### SSL/TLS
- Cloudflare tunnel provides automatic HTTPS
- Optional: Let's Encrypt with Nginx for direct access
- HSTS and security headers configured

### Monitoring
- Fail2Ban for brute force protection
- Log monitoring for suspicious activity
- Rate limiting to prevent abuse

## Troubleshooting

### Common Issues

#### High Memory Usage
```bash
# Check memory usage
free -h
pm2 show streamsppv-addon

# Restart if needed
pm2 restart streamsppv-addon
```

#### Slow Response Times
```bash
# Check system load
uptime
top

# Check network connections
netstat -an | grep :7000

# Restart services
pm2 restart all
systemctl restart cloudflared
```

#### Puppeteer Issues
```bash
# Check Chrome processes
ps aux | grep chrome

# Clear Puppeteer cache
rm -rf /tmp/puppeteer*

# Restart application
pm2 restart streamsppv-addon
```

### Emergency Procedures

#### Full Restart
```bash
# Stop all services
pm2 stop all
systemctl stop cloudflared

# Clear caches
rm -rf /var/www/streamsppv-addon/cache/*

# Start services
systemctl start cloudflared
./start.sh
```

#### Rollback Deployment
```bash
# Keep previous version in /var/www/streamsppv-addon.backup
cd /var/www/streamsppv-addon
pm2 stop all
cp -r ../backup/* .
pm2 start ecosystem.config.js --env production
```

## Performance Benchmarks

### Expected Performance
- **Concurrent Users**: 1000+ simultaneous connections
- **Response Time**: <200ms average
- **Throughput**: 1Gbps+ network utilization
- **CPU Usage**: 60-80% under peak load
- **Memory Usage**: 2-4GB total

### Monitoring Targets
- **CPU Alert**: >90% sustained
- **Memory Alert**: >6GB used
- **Response Time**: >500ms average
- **Error Rate**: >1% of requests

## Backup and Recovery

### Automated Backups
```bash
# Create backup script
cat > /usr/local/bin/backup-addon.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf /backup/streamsppv-addon_$DATE.tar.gz /var/www/streamsppv-addon
find /backup -name "streamsppv-addon_*.tar.gz" -mtime +7 -delete
EOF

chmod +x /usr/local/bin/backup-addon.sh

# Add to cron (daily at 2 AM)
echo "0 2 * * * /usr/local/bin/backup-addon.sh" | crontab -
```

### Disaster Recovery
1. **Server Failure**: Spin up new Ubuntu 22.04 instance
2. **Run Setup**: Execute server-setup.sh
3. **Restore Files**: Extract latest backup
4. **Start Services**: Run start.sh
5. **Update DNS**: Point Cloudflare tunnel to new server

## Support and Maintenance

### Regular Tasks
- **Weekly**: Check logs and performance metrics
- **Monthly**: Update Node.js and dependencies
- **Quarterly**: Review and optimize configurations
- **Annually**: Hardware assessment and upgrade planning

### Contact Information
- **Discord**: discord.gg/pfMhfmWQam
- **Documentation**: This README and inline comments
- **Issues**: Check PM2 logs and system logs first

## Version History
- **v2.0.0**: Production optimization with PM2 clustering
- **v1.x**: Original single-threaded version

---

**Note**: This setup is optimized for your specific hardware configuration. Adjustments may be needed for different server specifications.
