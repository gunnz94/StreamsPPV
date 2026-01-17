#!/bin/bash

# Ubuntu 22.04 LTS Server Setup for StreamsPPV Stremio Addon
# Optimized for AMD Ryzen 5 5600X, 32GB RAM, 2x960GB NVMe SSD

set -e

echo "🚀 Starting StreamsPPV Server Setup for Ubuntu 22.04 LTS..."

# Update system packages
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install essential system packages
echo "🔧 Installing essential system packages..."
apt install -y curl wget git build-essential software-properties-common \
    apt-transport-https ca-certificates gnupg lsb-release htop iotop \
    nginx certbot python3-certbot-nginx ufw fail2ban

# Install Node.js 20.x (LTS) for optimal performance
echo "📥 Installing Node.js 20.x LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Verify Node.js and npm versions
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install PM2 globally
echo "⚡ Installing PM2 process manager..."
npm install -g pm2

# Install Cloudflared
echo "☁️ Installing Cloudflared..."
wget -q https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared-linux-amd64.deb
rm cloudflared-linux-amd64.deb

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /var/www/streamsppv-addon
mkdir -p /var/www/streamsppv-addon/logs
mkdir -p /var/www/streamsppv-addon/cache

# Set proper permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/streamsppv-addon
chmod -R 755 /var/www/streamsppv-addon

# Configure system limits for high performance
echo "⚙️ Configuring system limits..."
cat >> /etc/security/limits.conf << EOF
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536
root soft nofile 65536
root hard nofile 65536
root soft nproc 65536
root hard nproc 65536
EOF

# Optimize kernel parameters for high-performance networking
echo "🌐 Optimizing kernel parameters..."
cat >> /etc/sysctl.conf << EOF
# Network optimization for high-performance streaming
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.ipv4.tcp_rmem = 4096 65536 134217728
net.ipv4.tcp_wmem = 4096 65536 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr
net.ipv4.tcp_slow_start_after_idle = 0
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535

# Memory management
vm.swappiness = 10
vm.dirty_ratio = 15
vm.dirty_background_ratio = 5

# File system optimization
fs.file-max = 2097152
fs.inotify.max_user_watches = 524288
EOF

# Apply sysctl changes
sysctl -p

# Configure UFW firewall
echo "🛡️ Configuring firewall..."
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 7000/tcp  # Stremio addon port
ufw --force enable

# Configure Fail2Ban
echo "🚨 Configuring Fail2Ban..."
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log

[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
EOF

systemctl enable fail2ban
systemctl start fail2ban

# Configure Nginx as reverse proxy (optional but recommended)
echo "🌐 Configuring Nginx reverse proxy..."
cat > /etc/nginx/sites-available/streamsppv << EOF
server {
    listen 80;
    server_name addon3.gstream.stream;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;
    
    # Proxy to Node.js application
    location / {
        proxy_pass http://127.0.0.1:7000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable Nginx site
ln -sf /etc/nginx/sites-available/streamsppv /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Create PM2 startup script
echo "📝 Creating PM2 startup script..."
cat > /var/www/streamsppv-addon/start.sh << 'EOF'
#!/bin/bash
cd /var/www/streamsppv-addon
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
EOF

chmod +x /var/www/streamsppv-addon/start.sh

# Create log rotation configuration
echo "📋 Setting up log rotation..."
cat > /etc/logrotate.d/streamsppv << EOF
/var/www/streamsppv-addon/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        pm2 reload all
    endscript
}
EOF

# Optimize Node.js for production
echo "⚡ Optimizing Node.js environment..."
cat >> /etc/environment << EOF
NODE_ENV=production
UV_THREADPOOL_SIZE=128
NODE_OPTIONS="--max-old-space-size=4096 --optimize-for-size"
EOF

echo "✅ Server setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Transfer your addon files to /var/www/streamsppv-addon/"
echo "2. Run 'cd /var/www/streamsppv-addon && npm install'"
echo "3. Configure Cloudflared tunnel (see cloudflare-setup.md)"
echo "4. Start the application with './start.sh'"
echo "5. Setup SSL certificate with 'certbot --nginx -d addon3.gstream.stream'"
echo ""
echo "🔧 System optimizations applied:"
echo "- Node.js 20.x LTS with PM2 cluster mode"
echo "- Kernel parameters optimized for high-performance streaming"
echo "- Nginx reverse proxy with rate limiting"
echo "- UFW firewall and Fail2Ban security"
echo "- Log rotation and monitoring"
