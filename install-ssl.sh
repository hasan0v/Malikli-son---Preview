#!/bin/bash

# SSL Certificate Installation Script for app.malikli1992.store
# This script installs Let's Encrypt SSL certificates using Certbot

set -e

echo "🔒 Starting SSL Certificate Installation for app.malikli1992.store"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

# Variables
DOMAIN="app.malikli1992.store"
NGINX_CONFIG="/etc/nginx/sites-available/malikli-store"
NGINX_SSL_CONFIG="/var/www/malikli-store/nginx.conf.ssl.template"
EMAIL="your-email@example.com"  # Replace with your actual email

print_warning "Please update the EMAIL variable in this script with your actual email address"
echo "Current email set to: $EMAIL"
read -p "Press Enter to continue or Ctrl+C to exit and update the email..."

# Step 1: Install Certbot and Nginx plugin
print_status "Installing Certbot and Nginx plugin..."
if command -v dnf &> /dev/null; then
    # AlmaLinux/RHEL/CentOS
    dnf install -y epel-release
    dnf install -y certbot python3-certbot-nginx
elif command -v apt &> /dev/null; then
    # Ubuntu/Debian
    apt update
    apt install -y certbot python3-certbot-nginx
else
    print_error "Unsupported package manager. Please install certbot manually."
    exit 1
fi

# Step 2: Check if domain is accessible
print_status "Checking if domain $DOMAIN is accessible..."
if curl -s --max-time 10 "http://$DOMAIN/health" | grep -q "healthy"; then
    print_status "Domain is accessible and responding"
else
    print_warning "Domain might not be accessible. SSL installation may fail."
    print_warning "Make sure your domain DNS points to this server's IP address"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 3: Stop Nginx temporarily (Certbot needs port 80)
print_status "Stopping Nginx temporarily..."
systemctl stop nginx

# Step 4: Obtain SSL certificate using standalone method
print_status "Obtaining SSL certificate for $DOMAIN..."
certbot certonly \
    --standalone \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    --domains "$DOMAIN" \
    --non-interactive

# Step 5: Check if certificate was obtained
if [[ -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]]; then
    print_status "SSL certificate obtained successfully!"
else
    print_error "Failed to obtain SSL certificate"
    systemctl start nginx  # Restart nginx even if failed
    exit 1
fi

# Step 6: Backup current nginx config
print_status "Backing up current Nginx configuration..."
cp "$NGINX_CONFIG" "${NGINX_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)"

# Step 7: Replace HTTP config with HTTPS config
print_status "Updating Nginx configuration for HTTPS..."
cp "$NGINX_SSL_CONFIG" "$NGINX_CONFIG"

# Step 8: Test Nginx configuration
print_status "Testing Nginx configuration..."
if nginx -t; then
    print_status "Nginx configuration is valid"
else
    print_error "Nginx configuration is invalid. Restoring backup..."
    cp "${NGINX_CONFIG}.backup."* "$NGINX_CONFIG"
    systemctl start nginx
    exit 1
fi

# Step 9: Start Nginx with new SSL configuration
print_status "Starting Nginx with SSL configuration..."
systemctl start nginx
systemctl enable nginx

# Step 10: Test SSL certificate
print_status "Testing SSL certificate..."
sleep 5
if curl -s --max-time 10 "https://$DOMAIN/health" | grep -q "healthy"; then
    print_status "SSL is working! Site is accessible via HTTPS"
else
    print_warning "HTTPS site might not be fully accessible yet. Check nginx logs."
fi

# Step 11: Set up automatic certificate renewal
print_status "Setting up automatic certificate renewal..."
# Add cron job for certificate renewal
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx") | crontab -

# Step 12: Display certificate information
print_status "Certificate information:"
certbot certificates

echo ""
echo "🎉 SSL Installation Complete!"
echo "================================================"
print_status "Your site is now accessible at: https://$DOMAIN"
print_status "Certificate will auto-renew every 90 days"
print_status "HTTP traffic will automatically redirect to HTTPS"
echo ""
print_warning "Next steps:"
echo "1. Test your site: https://$DOMAIN"
echo "2. Update any hardcoded HTTP links to HTTPS"
echo "3. Check that API and admin panel work over HTTPS"
echo ""

# Test URLs
echo "🔍 Test these URLs:"
echo "• Main site: https://$DOMAIN"
echo "• Health check: https://$DOMAIN/health"
echo "• API: https://$DOMAIN/api/"
echo "• Admin: https://$DOMAIN/admin/"
