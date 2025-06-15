# SSL Certificate Installation Guide

This guide explains how to install SSL certificates for your domain `app.malikli1992.store` using Let's Encrypt.

## Prerequisites

1. **Domain DNS Setup**: Ensure your domain `app.malikli1992.store` points to your server's public IP address
2. **HTTP Site Working**: Your site should be accessible via HTTP first
3. **Port 80 Access**: Certbot needs temporary access to port 80
4. **Root Access**: You need sudo/root privileges

## Quick Installation

### Option 1: Automated Script (Recommended)

1. **Update the email in the script**:
   ```bash
   nano install-ssl.sh
   # Change: EMAIL="your-email@example.com"
   # To:     EMAIL="your-actual-email@domain.com"
   ```

2. **Make script executable and run**:
   ```bash
   chmod +x install-ssl.sh
   sudo ./install-ssl.sh
   ```

### Option 2: Manual Installation

1. **Install Certbot**:
   ```bash
   # For AlmaLinux/RHEL/CentOS
   sudo dnf install -y epel-release
   sudo dnf install -y certbot python3-certbot-nginx

   # For Ubuntu/Debian
   sudo apt update
   sudo apt install -y certbot python3-certbot-nginx
   ```

2. **Stop Nginx temporarily**:
   ```bash
   sudo systemctl stop nginx
   ```

3. **Obtain SSL certificate**:
   ```bash
   sudo certbot certonly \
     --standalone \
     --email your-email@domain.com \
     --agree-tos \
     --no-eff-email \
     --domains app.malikli1992.store \
     --non-interactive
   ```

4. **Update Nginx configuration**:
   ```bash
   # Backup current config
   sudo cp /etc/nginx/sites-available/malikli-store /etc/nginx/sites-available/malikli-store.backup

   # Use SSL configuration
   sudo cp nginx.conf.ssl.template /etc/nginx/sites-available/malikli-store
   ```

5. **Test and restart Nginx**:
   ```bash
   sudo nginx -t
   sudo systemctl start nginx
   ```

## Verification

After installation, test these URLs:

- **Main site**: https://app.malikli1992.store
- **Health check**: https://app.malikli1992.store/health
- **API**: https://app.malikli1992.store/api/
- **Admin**: https://app.malikli1992.store/admin/

## Certificate Information

- **Certificate location**: `/etc/letsencrypt/live/app.malikli1992.store/`
- **Auto-renewal**: Configured via cron job (runs daily, renews if needed)
- **Validity**: 90 days (auto-renews at 30 days remaining)

## Troubleshooting

### Common Issues

1. **Domain not accessible**:
   ```bash
   # Check DNS
   nslookup app.malikli1992.store
   
   # Check if port 80 is accessible
   curl -I http://app.malikli1992.store/health
   ```

2. **Certbot fails with "Challenge failed"**:
   - Ensure domain DNS points to your server
   - Check firewall allows port 80
   - Make sure no other service is using port 80

3. **Nginx configuration errors**:
   ```bash
   # Test configuration
   sudo nginx -t
   
   # Check logs
   sudo tail -f /var/log/nginx/error.log
   ```

4. **Certificate not found**:
   ```bash
   # List certificates
   sudo certbot certificates
   
   # Check certificate files
   ls -la /etc/letsencrypt/live/app.malikli1992.store/
   ```

### Manual Certificate Renewal

```bash
# Test renewal (dry run)
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal

# Reload nginx after renewal
sudo systemctl reload nginx
```

## Security Features

The SSL configuration includes:

- **TLS 1.2 and 1.3** support
- **Strong cipher suites**
- **HSTS headers** (HTTP Strict Transport Security)
- **Security headers** (XSS protection, content type options, etc.)
- **HTTP to HTTPS redirect**

## Next Steps

After SSL installation:

1. **Update application settings** to use HTTPS URLs
2. **Test all functionality** (frontend, API, admin)
3. **Update any external integrations** to use HTTPS endpoints
4. **Monitor certificate expiration** (should auto-renew)

## Automatic Renewal

The script sets up automatic renewal via cron:
```bash
# Check cron job
sudo crontab -l

# Manual test of renewal
sudo certbot renew --dry-run
```

The certificate will automatically renew when it has 30 days or less remaining.
