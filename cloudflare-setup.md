# Cloudflare Tunnel Setup for StreamsPPV Addon

## Prerequisites
- Ubuntu 22.04 LTS server with cloudflared installed
- Cloudflare account with existing tunnel configured for addon3.gstream.stream

## Step 1: Authenticate Cloudflared

```bash
# Login to Cloudflare (this will open a browser URL)
cloudflared tunnel login

# Or use a service token (recommended for production)
# Create a service token in Cloudflare dashboard > Workers & Pages > Tokens
cloudflared tunnel login --token YOUR_SERVICE_TOKEN
```

## Step 2: Download Tunnel Configuration

```bash
# Download existing tunnel configuration
cloudflared tunnel route dns <YOUR_TUNNEL_ID> addon3.gstream.stream

# List available tunnels
cloudflared tunnel list
```

## Step 3: Create Tunnel Configuration File

Create `/etc/cloudflared/config.yml`:

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  # Main addon traffic
  - hostname: addon3.gstream.stream
    service: http://localhost:7000
    originRequest:
      noTLSVerify: false
      connectTimeout: 30s
      httpHostHeader: addon3.gstream.stream
      
  # Health check endpoint
  - hostname: addon3.gstream.stream
    path: /health
    service: http://localhost:7000/health
    
  # Fallback for any other requests
  - service: http_status:404
```

## Step 4: Create Systemd Service

Create `/etc/systemd/system/cloudflared.service`:

```ini
[Unit]
Description=cloudflared
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/local/bin/cloudflared tunnel --config /etc/cloudflared/config.yml run
Restart=on-failure
RestartDelay=5s
LimitNOFILE=1048576

[Install]
WantedBy=multi-user.target
```

## Step 5: Enable and Start Cloudflared

```bash
# Create config directory
mkdir -p /etc/cloudflared

# Move config file
mv config.yml /etc/cloudflared/

# Set permissions
chmod 600 /etc/cloudflared/config.yml

# Enable and start service
systemctl enable cloudflared
systemctl start cloudflared

# Check status
systemctl status cloudflared
```

## Step 6: Verify Tunnel Operation

```bash
# Check tunnel logs
cloudflared tunnel info YOUR_TUNNEL_ID

# Check service logs
journalctl -u cloudflared -f

# Test connectivity
curl -H "Host: addon3.gstream.stream" http://localhost:7000/manifest.json
```

## Step 7: PM2 Integration with Cloudflare

Update your PM2 ecosystem to ensure proper startup order:

```javascript
// In ecosystem.config.js, add:
{
  name: 'streamsppv-addon',
  script: './addon.js',
  // ... existing config
  wait_ready: true,
  listen_timeout: 30000,
  env: {
    NODE_ENV: 'production',
    PORT: 7000,
    // Add Cloudflare detection
    VIRTUAL_HOST: 'addon3.gstream.stream'
  }
}
```

## Advanced Configuration

### Load Balancing with Multiple Tunnels

For maximum performance, you can create multiple tunnels:

```bash
# Create additional tunnels
cloudflared tunnel create streamsppv-1
cloudflared tunnel create streamsppv-2
cloudflared tunnel create streamsppv-3

# Point DNS to load balancer
cloudflared tunnel route dns streamsppv-1 addon3.gstream.stream
```

### Performance Optimizations

Add these to your `config.yml`:

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

# Performance settings
metrics: 0.0.0.0:2020
no-autoupdate: true

ingress:
  - hostname: addon3.gstream.stream
    service: http://localhost:7000
    originRequest:
      noTLSVerify: false
      connectTimeout: 30s
      httpHostHeader: addon3.gstream.stream
      # Performance optimizations
      keepAliveConnections: 100
      keepAliveTimeout: 90s
      tcpKeepAlive: true
```

### Monitoring and Health Checks

Create a health check script `/usr/local/bin/check-tunnel.sh`:

```bash
#!/bin/bash

# Check if cloudflared is running
if ! systemctl is-active --quiet cloudflared; then
    echo "Cloudflared is not running, restarting..."
    systemctl restart cloudflared
fi

# Check if addon is responding
if ! curl -s -f http://localhost:7000/health > /dev/null; then
    echo "Addon not responding, restarting PM2..."
    pm2 restart all
fi

# Log status
echo "$(date): Tunnel and addon status checked" >> /var/log/tunnel-health.log
```

Make it executable and add to cron:

```bash
chmod +x /usr/local/bin/check-tunnel.sh
echo "*/2 * * * * /usr/local/bin/check-tunnel.sh" | crontab -
```

## Troubleshooting

### Common Issues

1. **Tunnel not starting**
   ```bash
   # Check logs
   journalctl -u cloudflared -n 50
   
   # Verify credentials
   cloudflared tunnel login
   ```

2. **DNS not resolving**
   ```bash
   # Check DNS configuration
   cloudflared tunnel route dns list
   
   # Force DNS update
   cloudflared tunnel route dns YOUR_TUNNEL_ID addon3.gstream.stream
   ```

3. **Performance issues**
   ```bash
   # Check metrics
   curl http://localhost:2020/metrics
   
   # Monitor connections
   netstat -an | grep :7000
   ```

### Performance Monitoring

Monitor tunnel performance with:

```bash
# Real-time metrics
watch -n 1 'curl -s http://localhost:2020/metrics | grep -E "(conn|req|bytes)"'

# Connection statistics
ss -s
```

## Security Considerations

1. **Restrict tunnel access**: Only allow specific origins
2. **Monitor logs**: Regularly check for unusual activity
3. **Update regularly**: Keep cloudflared updated
4. **Use service tokens**: Prefer service tokens over interactive login

## Production Checklist

- [ ] Cloudflared authenticated with service token
- [ ] Tunnel configuration file created
- [ ] Systemd service enabled and running
- [ ] DNS properly configured
- [ ] Health checks implemented
- [ ] Log rotation configured
- [ ] Monitoring set up
- [ ] SSL certificate bypassed (tunnel provides HTTPS)
- [ ] Performance optimizations applied
- [ ] Security measures in place
