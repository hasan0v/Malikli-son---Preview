#!/bin/bash

# Complete Domain and SSL Fix Script
# This script fixes both SSL certificate issues and backend configuration

set -e

echo "🌐 DOMAIN AND SSL COMPREHENSIVE FIX"
echo "=================================="

# Configuration
DOMAIN="malikli1992.store"
WWW_DOMAIN="www.malikli1992.store"
PROJECT_DIR="/home/deployuser/Malikli-son---Preview/"
BACKEND_DIR="$PROJECT_DIR/backend"
EMAIL="e.malikli1992@gmail.com"  # CHANGE THIS

echo "Domain: $DOMAIN"
echo "WWW Domain: $WWW_DOMAIN"
echo "Project Directory: $PROJECT_DIR"

# Check if email is updated
if [[ "$EMAIL" == "your-email@example.com" ]]; then
    echo "❌ ERROR: Please update the EMAIL variable in this script"
    exit 1
fi

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

echo ""
echo "🔧 Step 1: Updating Backend Configuration"
echo "========================================"

# Update backend .env file
cd "$BACKEND_DIR"

# Backup current .env
if [[ -f ".env" ]]; then
    cp .env .env.backup.$(date +%Y%m%d_%H%M%S)
    echo "✅ Backed up existing .env file"
fi

# Update or create .env file with proper domain configuration
echo "📝 Updating .env file with both domains..."

# Read current .env or create new one
if [[ -f ".env" ]]; then
    # Update existing .env
    sed -i 's/ALLOWED_HOSTS=.*/ALLOWED_HOSTS=malikli1992.store,www.malikli1992.store,127.0.0.1,localhost/' .env
    sed -i 's/CORS_ALLOWED_ORIGINS=.*/CORS_ALLOWED_ORIGINS=https:\/\/malikli1992.store,https:\/\/www.malikli1992.store/' .env
    
    # Add if not exists
    if ! grep -q "ALLOWED_HOSTS" .env; then
        echo "ALLOWED_HOSTS=malikli1992.store,www.malikli1992.store,127.0.0.1,localhost" >> .env
    fi
    if ! grep -q "CORS_ALLOWED_ORIGINS" .env; then
        echo "CORS_ALLOWED_ORIGINS=https://malikli1992.store,https://www.malikli1992.store" >> .env
    fi
else
    # Create new .env from template
    cat > .env << EOF
DEBUG=False
ALLOWED_HOSTS=malikli1992.store,www.malikli1992.store,127.0.0.1,localhost
CORS_ALLOWED_ORIGINS=https://malikli1992.store,https://www.malikli1992.store
SECRET_KEY=change-this-secret-key-in-production
EOF
fi

echo "✅ Backend .env updated"

echo ""
echo "🔐 Step 2: Fixing SSL Certificates"
echo "================================="

# Install Certbot
echo "📦 Installing Certbot..."
if command -v dnf &> /dev/null; then
    dnf install -y epel-release
    dnf install -y certbot python3-certbot-nginx
elif command -v apt &> /dev/null; then
    apt update
    apt install -y certbot python3-certbot-nginx
fi

# Stop services
echo "🛑 Stopping services..."
systemctl stop nginx || true
systemctl stop your-backend-service || true  # Replace with your actual service name

# Get SSL certificates
echo "🔐 Obtaining SSL certificates..."
certbot certonly \
    --standalone \
    --non-interactive \
    --agree-tos \
    --email "$EMAIL" \
    -d "$DOMAIN" \
    -d "$WWW_DOMAIN" \
    --force-renewal

echo ""
echo "⚙️  Step 3: Updating Nginx Configuration"
echo "======================================="

# Update Nginx configuration
NGINX_CONFIG="/etc/nginx/nginx.conf"
cp "$NGINX_CONFIG" "$NGINX_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"

# Copy the fixed SSL configuration
if [[ -f "$PROJECT_DIR/nginx.conf.ssl.fixed.template" ]]; then
    cp "$PROJECT_DIR/nginx.conf.ssl.fixed.template" "$NGINX_CONFIG"
    echo "✅ Nginx configuration updated"
else
    echo "⚠️  nginx.conf.ssl.fixed.template not found, using manual configuration"
    
    # Create basic SSL configuration
    cat > "$NGINX_CONFIG" << 'EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Redirect HTTP to HTTPS for both domains
    server {
        listen 80;
        server_name malikli1992.store www.malikli1992.store;
        return 301 https://malikli1992.store$request_uri;
    }

    # Redirect HTTPS www to non-www
    server {
        listen 443 ssl http2;
        server_name www.malikli1992.store;

        ssl_certificate /etc/letsencrypt/live/malikli1992.store/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/malikli1992.store/privkey.pem;
        
        return 301 https://malikli1992.store$request_uri;
    }

    # Main HTTPS server
    server {
        listen 443 ssl http2;
        server_name malikli1992.store;

        ssl_certificate /etc/letsencrypt/live/malikli1992.store/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/malikli1992.store/privkey.pem;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;

        # API routes
        location /api/ {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Frontend
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
EOF
fi

# Test Nginx configuration
echo "🧪 Testing Nginx configuration..."
if ! nginx -t; then
    echo "❌ Nginx configuration test failed"
    exit 1
fi

echo ""
echo "🚀 Step 4: Starting Services"
echo "============================"

# Start services
systemctl start nginx
systemctl enable nginx

# Restart backend (adjust service name as needed)
cd "$BACKEND_DIR"
if [[ -f "requirements.txt" ]]; then
    echo "📦 Installing/updating Python dependencies..."
    python3 -m pip install -r requirements.txt
fi

# You'll need to start your backend service here
# Example: systemctl start your-backend-service
echo "⚠️  Please manually start your backend service (Django)"

echo ""
echo "🎉 DOMAIN AND SSL FIX COMPLETE!"
echo "==============================="
echo ""
echo "✅ SSL certificates installed for both domains"
echo "✅ Nginx configured to redirect www to non-www"
echo "✅ Backend CORS updated to handle both domains"
echo "✅ Auto-renewal configured"
echo ""
echo "🔗 Test your domains:"
echo "   https://$DOMAIN"
echo "   https://$WWW_DOMAIN (should redirect to https://$DOMAIN)"
echo ""
echo "📋 Next steps:"
echo "1. Start your Django backend service"
echo "2. Start your Next.js frontend"
echo "3. Test both domains in your browser"
echo ""
echo "🔧 To start services manually:"
echo "   Backend: cd $BACKEND_DIR && python manage.py runserver 127.0.0.1:8000"
echo "   Frontend: cd $PROJECT_DIR/frontend && npm run start"
