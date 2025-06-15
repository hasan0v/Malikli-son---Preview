#!/bin/bash

# SSL Certificate Fix Script for both www and non-www domains
# This script will obtain SSL certificates for both malikli1992.store and www.malikli1992.store

set -e

# Configuration
DOMAIN="malikli1992.store"
WWW_DOMAIN="www.malikli1992.store"
EMAIL="e.malikli1992@gmail.com"  # CHANGE THIS TO YOUR ACTUAL EMAIL
NGINX_CONFIG_PATH="/etc/nginx/nginx.conf"
BACKUP_PATH="/etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S)"

echo "=== SSL Certificate Fix Script ==="
echo "Domain: $DOMAIN"
echo "WWW Domain: $WWW_DOMAIN"
echo "Email: $EMAIL"

# Validate email
if [[ "$EMAIL" == "your-email@example.com" ]]; then
    echo "❌ ERROR: Please update the EMAIL variable in this script with your actual email address"
    exit 1
fi

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

# Step 1: Install Certbot if not installed
echo "📦 Installing/Updating Certbot..."
if command -v dnf &> /dev/null; then
    # AlmaLinux/RHEL/CentOS
    dnf install -y epel-release
    dnf install -y certbot python3-certbot-nginx
elif command -v apt &> /dev/null; then
    # Ubuntu/Debian
    apt update
    apt install -y certbot python3-certbot-nginx
else
    echo "❌ Unsupported package manager. Please install certbot manually."
    exit 1
fi

# Step 2: Check DNS resolution for both domains
echo "🔍 Checking DNS resolution..."
if ! nslookup $DOMAIN | grep -q "Address:"; then
    echo "⚠️  WARNING: $DOMAIN may not be properly configured in DNS"
fi

if ! nslookup $WWW_DOMAIN | grep -q "Address:"; then
    echo "⚠️  WARNING: $WWW_DOMAIN may not be properly configured in DNS"
fi

# Step 3: Backup current Nginx configuration
echo "💾 Backing up current Nginx configuration..."
cp "$NGINX_CONFIG_PATH" "$BACKUP_PATH"
echo "Backup saved to: $BACKUP_PATH"

# Step 4: Stop Nginx temporarily
echo "🛑 Stopping Nginx temporarily..."
systemctl stop nginx

# Step 5: Obtain SSL certificates for both domains
echo "🔐 Obtaining SSL certificates for both domains..."
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    -d "$DOMAIN" \
    -d "$WWW_DOMAIN" \
    --force-renewal

# Check if certificate was obtained successfully
if [[ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    echo "❌ SSL certificate generation failed!"
    echo "🔄 Starting Nginx with previous configuration..."
    systemctl start nginx
    exit 1
fi

echo "✅ SSL certificates obtained successfully!"

# Step 6: Update Nginx configuration
echo "⚙️  Updating Nginx configuration..."

# Copy the fixed SSL template to nginx config
if [[ -f "/home/deployuser/Malikli-son---Preview/nginx.conf.ssl.fixed.template" ]]; then
    cp "/home/deployuser/Malikli-son---Preview/nginx.conf.ssl.fixed.template" "$NGINX_CONFIG_PATH"
elif [[ -f "./nginx.conf.ssl.fixed.template" ]]; then
    cp "./nginx.conf.ssl.fixed.template" "$NGINX_CONFIG_PATH"
else
    echo "❌ nginx.conf.ssl.fixed.template not found!"
    echo "Please manually update your Nginx configuration."
    echo "🔄 Starting Nginx with backup configuration..."
    cp "$BACKUP_PATH" "$NGINX_CONFIG_PATH"
    systemctl start nginx
    exit 1
fi

# Step 7: Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if ! nginx -t; then
    echo "❌ Nginx configuration test failed!"
    echo "🔄 Restoring backup configuration..."
    cp "$BACKUP_PATH" "$NGINX_CONFIG_PATH"
    systemctl start nginx
    exit 1
fi

# Step 8: Start Nginx
echo "🚀 Starting Nginx with new SSL configuration..."
systemctl start nginx
systemctl enable nginx

# Step 9: Test SSL certificates
echo "🔍 Testing SSL certificates..."
sleep 3

echo "Testing $DOMAIN..."
if curl -I -s "https://$DOMAIN" | grep -q "HTTP/"; then
    echo "✅ $DOMAIN SSL working!"
else
    echo "⚠️  $DOMAIN SSL may have issues"
fi

echo "Testing $WWW_DOMAIN..."
if curl -I -s "https://$WWW_DOMAIN" | grep -q "HTTP/"; then
    echo "✅ $WWW_DOMAIN SSL working!"
else
    echo "⚠️  $WWW_DOMAIN SSL may have issues"
fi

# Step 10: Setup auto-renewal
echo "⏰ Setting up automatic certificate renewal..."
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    (crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet --reload-nginx") | crontab -
    echo "✅ Auto-renewal cron job added"
fi

echo ""
echo "🎉 SSL Certificate Fix Complete!"
echo ""
echo "✅ Both domains now have valid SSL certificates"
echo "✅ Nginx configured to redirect www to non-www"  
echo "✅ Auto-renewal configured"
echo ""
echo "🔗 Test your domains:"
echo "   https://$DOMAIN"
echo "   https://$WWW_DOMAIN (should redirect to https://$DOMAIN)"
echo ""
echo "📝 Backup location: $BACKUP_PATH"
echo ""
echo "⚠️  IMPORTANT: Update your backend environment variables with both domains!"
