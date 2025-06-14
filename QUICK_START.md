# Malikli Store Quick Start Guide

This guide provides the essential steps to get your Malikli Store application running on an AlmaLinux server.

## 🚀 Quick Deployment Steps

### 1. Prepare Your Server
```bash
# Make the setup script executable and run it
chmod +x setup_server.sh
./setup_server.sh
```

### 2. Clone Your Repository
```bash
cd /var/www/malikli-store
git clone https://github.com/hasan0v/Malikli-son---Preview.git .
# or if already cloned:
# git pull origin main
```

### 3. Backend Setup
```bash
cd /var/www/malikli-store/backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install gunicorn

# Create environment file
cp .env.example .env  # or create new
# Edit .env with your production values
```

### 4. Frontend Setup
```bash
cd /var/www/malikli-store/frontend

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local  # or create new
# Edit .env.local with your production values

# Build the application
npm run build
```

### 5. Database Setup
```bash
cd /var/www/malikli-store/backend
source venv/bin/activate

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 6. Configure Nginx
```bash
# Copy the nginx configuration
sudo cp nginx.conf.template /etc/nginx/sites-available/malikli-store

# Enable the site
sudo ln -sf /etc/nginx/sites-available/malikli-store /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

### 7. Setup SSL Certificate
```bash
# Install SSL certificate (make sure DNS is pointing to your server)
sudo certbot --nginx -d app.malikli.store

# Test auto-renewal
sudo certbot renew --dry-run
```

### 8. Start Applications
```bash
cd /var/www/malikli-store

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions provided by the command above
```

### 9. Verify Deployment
- Visit https://app.malikli.store (frontend)
- Visit https://app.malikli.store/api/v1/ (API)
- Visit https://app.malikli.store/admin/ (Django admin)

## 📋 Environment Variables Checklist

### Backend (.env)
```bash
SECRET_KEY=your-super-secret-key
DEBUG=False
ALLOWED_HOSTS=your-server-ip,app.malikli.store
DATABASE_URL=postgresql://user:pass@host:5432/db
AWS_ACCESS_KEY_ID=your-r2-key
AWS_SECRET_ACCESS_KEY=your-r2-secret
AWS_STORAGE_BUCKET_NAME=malikli1992
AWS_S3_ENDPOINT_URL=https://your-r2-endpoint
AWS_S3_CUSTOM_DOMAIN=media.malikli1992.com
AWS_LOCATION=media
CORS_ALLOWED_ORIGINS=https://app.malikli.store
EMAIL_HOST_PASSWORD=your-resend-key
RESEND_API_KEY=your-resend-key
DEFAULT_FROM_EMAIL=no-reply@malikli.store
FRONTEND_URL=https://app.malikli.store
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://app.malikli.store/api/v1
```

## 🔧 Common Commands

### Check Application Status
```bash
pm2 status
pm2 logs
sudo systemctl status nginx
```

### Update Application
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
sudo systemctl reload nginx
```

### View Logs
```bash
# Application logs
pm2 logs

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

## 🛠️ Troubleshooting

### 502 Bad Gateway
- Check if PM2 processes are running: `pm2 status`
- Restart applications: `pm2 restart all`
- Check nginx configuration: `sudo nginx -t`

### SSL Certificate Issues
- Verify DNS is pointing to your server
- Check certificate status: `sudo certbot certificates`
- Renew certificate: `sudo certbot renew`

### Database Connection Issues
- Verify DATABASE_URL in backend/.env
- Check if Supabase allows connections from your server IP

### CORS Issues
- Verify CORS_ALLOWED_ORIGINS in backend settings
- Check nginx configuration for CORS headers

## 📚 Additional Resources

- [Full Deployment Guide](DEPLOYMENT_GUIDE.md) - Detailed deployment instructions
- [Django Documentation](https://docs.djangoproject.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)

## 🔒 Security Considerations

- Keep your server updated: `sudo dnf update`
- Monitor PM2 processes: `pm2 monit`
- Review nginx access logs regularly
- Use strong passwords and keep environment variables secure
- Enable automatic security updates
- Consider setting up monitoring and alerting

---

**Need help?** Check the full deployment guide or create an issue in your repository.
