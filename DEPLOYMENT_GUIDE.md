# Malikli Store Deployment Guide for AlmaLinux Server

## Overview
This guide will help you deploy the Malikli Store application (Django + Next.js) on an AlmaLinux server with the frontend accessible at https://app.malikli1992.store.

## Project Architecture
- **Backend**: Django REST Framework + PostgreSQL (Supabase) + Cloudflare R2 + Resend Email
- **Frontend**: Next.js + TypeScript + Tailwind CSS + Redux Toolkit
- **Server**: AlmaLinux with Nginx reverse proxy
- **Domain**: https://app.malikli1992.store (frontend), API at subdomain or path

---

## Prerequisites

### 1. AlmaLinux Server Setup
```bash
# Update system
sudo dnf update -y

# Install EPEL repository
sudo dnf install -y epel-release

# Install required packages
sudo dnf install -y git curl wget nginx certbot python3-certbot-nginx nodejs npm python3 python3-pip postgresql-devel gcc python3-devel

# Install PM2 for process management
sudo npm install -g pm2

# Install Python virtual environment
sudo dnf install -y python3-venv
```

### 2. Domain Configuration
- Point `app.malikli1992.store` to your server IP
- Optionally set up `api.malikli1992.store` for API or use path-based routing

---

## Step 1: Clone and Setup Backend

```bash
# Create application directory
sudo mkdir -p /var/www/malikli-store
sudo chown $USER:$USER /var/www/malikli-store
cd /var/www/malikli-store

# Clone your repository
git clone <your-repo-url> .

# Setup Python virtual environment
cd backend
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env  # If you have one, otherwise create new
```

### Backend Environment Configuration (.env)
```bash
# Django Settings
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-server-ip,app.malikli1992.store,api.malikli1992.store

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://username:password@host:5432/database_name

# Cloudflare R2 Storage
AWS_ACCESS_KEY_ID=your-r2-access-key
AWS_SECRET_ACCESS_KEY=your-r2-secret-key
AWS_STORAGE_BUCKET_NAME=malikli1992
AWS_S3_ENDPOINT_URL=https://1b3def703603101d5702f1381efebf2a.r2.cloudflarestorage.com
AWS_S3_REGION_NAME=auto
AWS_S3_CUSTOM_DOMAIN=media.malikli1992.com
AWS_LOCATION=media

# CORS Settings
CORS_ALLOWED_ORIGINS=https://app.malikli1992.store

# Email Configuration (Resend)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_USER=resend
EMAIL_HOST_PASSWORD=your-resend-api-key
DEFAULT_FROM_EMAIL=no-reply@malikli.store
RESEND_API_KEY=your-resend-api-key

# Frontend URL
FRONTEND_URL=https://app.malikli1992.store
```

```bash
# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput

# Test the application
python manage.py runserver 0.0.0.0:8000
```

---

## Step 2: Setup Frontend

```bash
cd /var/www/malikli-store/frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local  # If exists, otherwise create new
```

### Frontend Environment Configuration (.env.local)
```bash
# API URL - adjust based on your setup
NEXT_PUBLIC_API_URL=https://app.malikli1992.store/api/v1
# OR if using subdomain:
# NEXT_PUBLIC_API_URL=https://api.malikli1992.store/api/v1

# Other environment variables as needed
```

```bash
# Build the application
npm run build

# Test the application
npm run start
```

---

## Step 3: Setup PM2 Process Management

### Backend PM2 Configuration
Create `/var/www/malikli-store/ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'malikli-backend',
      cwd: '/var/www/malikli-store/backend',
      script: 'venv/bin/gunicorn',
      args: '--bind 127.0.0.1:8000 --workers 3 backend.wsgi:application',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '/var/log/pm2/malikli-backend-error.log',
      out_file: '/var/log/pm2/malikli-backend-out.log',
      log_file: '/var/log/pm2/malikli-backend.log',
      max_memory_restart: '1G'
    },
    {
      name: 'malikli-frontend',
      cwd: '/var/www/malikli-store/frontend',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/pm2/malikli-frontend-error.log',
      out_file: '/var/log/pm2/malikli-frontend-out.log',
      log_file: '/var/log/pm2/malikli-frontend.log',
      max_memory_restart: '1G'
    }
  ]
};
```

### Install Gunicorn and start services
```bash
# Install gunicorn in backend virtual environment
cd /var/www/malikli-store/backend
source venv/bin/activate
pip install gunicorn

# Create PM2 log directory
sudo mkdir -p /var/log/pm2
sudo chown $USER:$USER /var/log/pm2

# Start applications with PM2
cd /var/www/malikli-store
pm2 start ecosystem.config.js

# Save PM2 configuration and setup startup
pm2 save
pm2 startup
# Follow the instructions provided by PM2 startup command
```

---

## Step 4: Configure Nginx

Create `/etc/nginx/sites-available/malikli-store`:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name app.malikli.store;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server block
server {
    listen 443 ssl http2;
    server_name app.malikli.store;

    # SSL Configuration (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/app.malikli.store/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/app.malikli.store/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate max-age=0;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Client max body size for file uploads
    client_max_body_size 20M;

    # API routes - proxy to Django backend
    location /api/ {
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

    # Django admin - proxy to Django backend
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
    }

    # Static files for Django admin (if serving locally)
    location /static/ {
        alias /var/www/malikli-store/backend/staticfiles_collected/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
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
    }

    # Next.js static files
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable the site and configure Nginx
```bash
# Create sites-enabled directory if it doesn't exist
sudo mkdir -p /etc/nginx/sites-enabled

# Add include directive to main nginx.conf if not present
sudo grep -q "include /etc/nginx/sites-enabled" /etc/nginx/nginx.conf || \
sudo sed -i '/http {/a\    include /etc/nginx/sites-enabled/*;' /etc/nginx/nginx.conf

# Enable the site
sudo ln -sf /etc/nginx/sites-available/malikli-store /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## Step 5: Setup SSL with Let's Encrypt

**Important**: The deployment script initially configures Nginx for HTTP only to avoid SSL certificate issues. After the initial deployment, follow these steps to enable HTTPS:

### Phase 1: Initial HTTP Setup (Done by deploy script)
The deployment script uses `nginx.conf.template` which is configured for HTTP only to allow initial setup without SSL certificates.

### Phase 2: Enable HTTPS with SSL Certificate

1. **Obtain SSL Certificate**:
```bash
# Stop nginx temporarily
sudo systemctl stop nginx

# Get SSL certificate from Let's Encrypt
sudo certbot certonly --standalone -d app.malikli1992.store

# Start nginx again
sudo systemctl start nginx
```

2. **Update Nginx Configuration to HTTPS**:
```bash
# Replace the HTTP-only configuration with the SSL-enabled version
cd /var/www/malikli-store
sudo cp nginx.conf.ssl.template /etc/nginx/sites-available/malikli-store

# Test the new configuration
sudo nginx -t

# Reload nginx with SSL configuration
sudo systemctl reload nginx
```

3. **Verify SSL Setup**:
```bash
# Check certificate status
sudo certbot certificates

# Verify auto-renewal
sudo certbot renew --dry-run

# Set up automatic renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet && systemctl reload nginx" | sudo crontab -
```

### SSL Configuration Files
- `nginx.conf.template`: HTTP-only configuration for initial deployment
- `nginx.conf.ssl.template`: HTTPS configuration with SSL enabled

**Note**: The domain `app.malikli1992.store` must be pointing to your server's IP address before requesting SSL certificates.

---

## Step 6: Configure Firewall

```bash
# Install and configure firewall
sudo dnf install -y firewalld
sudo systemctl start firewalld
sudo systemctl enable firewalld

# Allow HTTP, HTTPS, and SSH
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-service=ssh

# Reload firewall
sudo firewall-cmd --reload
```

---

## Step 7: Final Steps and Testing

### Start all services
```bash
# Restart PM2 processes
pm2 restart all

# Restart Nginx
sudo systemctl restart nginx

# Check status
pm2 status
sudo systemctl status nginx
```

### Test the deployment
1. Visit https://app.malikli1992.store - should show your Next.js frontend
2. Visit https://app.malikli1992.store/api/v1/ - should show Django API
3. Visit https://app.malikli1992.store/admin/ - should show Django admin

---

## Monitoring and Maintenance

### View logs
```bash
# PM2 logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

### Update deployment
```bash
# Pull latest changes
cd /var/www/malikli-store
git pull origin main

# Update backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

# Update frontend
cd ../frontend
npm install
npm run build

# Restart services
pm2 restart all
```

### Backup considerations
- Database: Backup your Supabase PostgreSQL database
- Media files: Your Cloudflare R2 storage handles this
- Application code: Keep your Git repository updated
- Environment files: Backup `.env` files securely

---

## Troubleshooting

### Common issues:
1. **502 Bad Gateway**: Check if PM2 processes are running (`pm2 status`)
2. **SSL issues**: Verify certificate with `sudo certbot certificates`
3. **Database connection**: Check DATABASE_URL in backend/.env
4. **CORS errors**: Verify CORS_ALLOWED_ORIGINS in backend settings
5. **API not found**: Check Nginx configuration and proxy_pass settings

### Performance optimization:
- Enable Redis for Django caching
- Use CDN for static assets
- Implement database connection pooling
- Monitor server resources with htop/pm2 monit

---

This deployment guide provides a production-ready setup for your Malikli Store application on AlmaLinux with proper security, SSL, and process management.
