#!/bin/bash

# Complete Mobile & Browser Fix Script
# Fixes MIME types, API URLs, and mobile compatibility issues

set -e

echo "📱 MOBILE & BROWSER COMPATIBILITY FIX"
echo "===================================="

# Configuration
DOMAIN="malikli1992.store"
WWW_DOMAIN="www.malikli1992.store"
PROJECT_DIR="/home/deployuser/Malikli-son---Preview"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
NGINX_CONFIG="/etc/nginx/nginx.conf"

echo "Domain: $DOMAIN"
echo "Project Directory: $PROJECT_DIR"

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "❌ This script must be run as root (use sudo)"
   exit 1
fi

echo ""
echo "🔧 Step 1: Fix Frontend Environment Variables"
echo "============================================="

cd "$FRONTEND_DIR"

# Fix .env.production
echo "📝 Updating frontend .env.production..."
cat > .env.production << EOF
# Next.js Environment Configuration for Production

# Backend API URL - Production (Fixed for SSL domain)
NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1

# Site URL
NEXT_PUBLIC_SITE_URL=https://malikli1992.store

# Enable production optimizations
NODE_ENV=production
EOF

# Fix .env.local if it exists
if [[ -f ".env.local" ]]; then
    echo "📝 Updating frontend .env.local..."
    sed -i 's|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1|g' .env.local
fi

# Fix .env if it exists
if [[ -f ".env" ]]; then
    echo "📝 Updating frontend .env..."
    sed -i 's|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1|g' .env
fi

echo "✅ Frontend environment variables updated"

echo ""
echo "⚙️  Step 2: Update Nginx Configuration for Better MIME Support"
echo "=============================================================="

# Backup current nginx config
echo "💾 Creating backup..."
cp "$NGINX_CONFIG" "$NGINX_CONFIG.mobile.backup.$(date +%Y%m%d_%H%M%S)"

# Create updated nginx configuration with better MIME type handling
echo "⚙️  Creating mobile-friendly nginx configuration..."

cat > "$NGINX_CONFIG" << 'EOF'
events {
    worker_connections 1024;
}

http {
    # MIME type configuration
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    # Add additional MIME types for better compatibility
    types {
        text/css css;
        application/javascript js;
        application/json json;
        image/webp webp;
        image/avif avif;
        font/woff woff;
        font/woff2 woff2;
    }
    
    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
    
    # Basic settings optimized for mobile
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_names_hash_bucket_size 64;
    
    # Gzip compression for mobile optimization
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_proxied any;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        application/xml
        image/svg+xml
        font/truetype
        font/opentype
        application/font-woff
        application/font-woff2;
    
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

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/malikli1992.store/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/malikli1992.store/privkey.pem;
        
        # SSL Security Settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Redirect www to non-www
        return 301 https://malikli1992.store$request_uri;
    }

    # Main HTTPS server block
    server {
        listen 443 ssl http2;
        server_name malikli1992.store;

        # SSL Configuration
        ssl_certificate /etc/letsencrypt/live/malikli1992.store/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/malikli1992.store/privkey.pem;
        
        # SSL Security Settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # Security headers optimized for mobile
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-DNS-Prefetch-Control "on" always;

        # Client max body size for file uploads
        client_max_body_size 20M;
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        fastcgi_send_timeout 600s;
        fastcgi_read_timeout 600s;

        # API routes - proxy to Django backend with enhanced CORS
        location /api/ {
            proxy_pass http://127.0.0.1:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Forwarded-Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
            
            # Enhanced CORS headers for mobile compatibility
            add_header 'Access-Control-Allow-Origin' 'https://malikli1992.store' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Accept,Origin' always;
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range' always;
            add_header 'Access-Control-Allow-Credentials' 'true' always;
            
            # Handle preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' 'https://malikli1992.store' always;
                add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
                add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization,Accept,Origin' always;
                add_header 'Access-Control-Max-Age' 86400;
                add_header 'Content-Type' 'text/plain; charset=utf-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }

        # Django admin
        location /admin/ {
            proxy_pass http://127.0.0.1:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }

        # Static files with proper MIME types
        location /static/ {
            alias /home/deployuser/Malikli-son---Preview/backend/staticfiles_collected/;
            expires 30d;
            add_header Cache-Control "public, no-transform";
            add_header Vary "Accept-Encoding";
            
            # Force correct MIME types
            location ~* \.css$ {
                add_header Content-Type "text/css; charset=utf-8";
                expires 1y;
            }
            location ~* \.js$ {
                add_header Content-Type "application/javascript; charset=utf-8";
                expires 1y;
            }
            
            try_files $uri $uri/ =404;
        }

        # Media files
        location /media/ {
            alias /home/deployuser/Malikli-son---Preview/backend/local_media_debug/;
            expires 30d;
            add_header Cache-Control "public, no-transform";
            try_files $uri $uri/ =404;
        }

        # Next.js static files with correct MIME types
        location /_next/static/ {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Override any incorrect MIME types
            location ~* \.css$ {
                proxy_pass http://127.0.0.1:3000;
                add_header Content-Type "text/css; charset=utf-8" always;
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
            location ~* \.js$ {
                proxy_pass http://127.0.0.1:3000;
                add_header Content-Type "application/javascript; charset=utf-8" always;
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
            
            expires 365d;
            add_header Cache-Control "public, immutable";
        }

        # Next.js image optimization
        location /_next/image {
            proxy_pass http://127.0.0.1:3000;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Next.js application - everything else
        location / {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
            
            # Handle Next.js routing
            try_files $uri $uri/ @nextjs;
        }

        # Fallback for Next.js routing
        location @nextjs {
            proxy_pass http://127.0.0.1:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Security: Block access to sensitive files
        location ~ /\.ht {
            deny all;
        }
        
        location ~ /\.git {
            deny all;
        }
        
        location ~ /\.env {
            deny all;
        }
    }
}
EOF

echo "✅ Nginx configuration updated for mobile compatibility"

# Test the configuration
echo "🧪 Testing Nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration test passed!"
    
    # Restart Nginx
    echo "🔄 Restarting Nginx..."
    systemctl restart nginx
    
else
    echo "❌ Nginx configuration test failed!"
    exit 1
fi

echo ""
echo "🔄 Step 3: Rebuild and Restart Frontend"
echo "======================================="

cd "$FRONTEND_DIR"

# Install dependencies and rebuild
echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️  Building frontend for production..."
npm run build

echo "🔄 Restarting frontend service..."
# Kill any existing Next.js processes
pkill -f "next" || true
pkill -f "node.*3000" || true

# Start Next.js in production mode
echo "🚀 Starting Next.js in production mode..."
nohup npm run start > /dev/null 2>&1 &

echo ""
echo "🔧 Step 4: Update Backend CORS Settings"
echo "======================================="

cd "$BACKEND_DIR"

# Update backend .env if it exists
if [[ -f ".env" ]]; then
    echo "📝 Updating backend CORS settings..."
    sed -i 's|CORS_ALLOWED_ORIGINS=.*|CORS_ALLOWED_ORIGINS=https://malikli1992.store,https://www.malikli1992.store|g' .env
    sed -i 's|ALLOWED_HOSTS=.*|ALLOWED_HOSTS=malikli1992.store,www.malikli1992.store,127.0.0.1,localhost|g' .env
fi

# Restart Django backend
echo "🔄 Restarting Django backend..."
pkill -f "python.*manage.py" || true
pkill -f "python.*8000" || true

# Start Django backend
echo "🚀 Starting Django backend..."
nohup python manage.py runserver 127.0.0.1:8000 > /dev/null 2>&1 &

echo ""
echo "📱 MOBILE & BROWSER FIX COMPLETE!"
echo "================================="
echo ""
echo "✅ Frontend environment updated to use HTTPS API"
echo "✅ Nginx configured with proper MIME types"
echo "✅ Enhanced CORS headers for mobile compatibility"
echo "✅ Both frontend and backend restarted"
echo ""
echo "🔗 Test your site:"
echo "   https://malikli1992.store"
echo "   https://www.malikli1992.store"
echo ""
echo "📋 What was fixed:"
echo "   • API calls now use https://malikli1992.store/api/v1"
echo "   • CSS/JS MIME type errors resolved"
echo "   • Enhanced CORS for mobile browsers"
echo "   • Gzip compression enabled"
echo "   • Security headers optimized"
echo ""
echo "🧪 Test on different devices and browsers now!"
