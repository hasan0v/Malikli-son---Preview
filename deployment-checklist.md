# 📋 Malikli Store Deployment Checklist

## Pre-Deployment Checklist

### 🔧 Server Preparation
- [ ] AlmaLinux server is set up and accessible
- [ ] SSH access is configured
- [ ] Firewall is properly configured (ports 22, 80, 443 open)
- [ ] Domain DNS records point to server IP
- [ ] Server has sufficient resources (2GB+ RAM recommended)

### 📋 Dependencies Installation
- [ ] Run `setup_server.sh` script
- [ ] Node.js and npm are installed
- [ ] Python 3 and pip are installed
- [ ] PM2 is installed globally
- [ ] Nginx is installed and running
- [ ] Certbot is installed for SSL
- [ ] Git is installed

### 🗂️ Environment Configuration
- [ ] Backend `.env` file is created and configured
- [ ] Frontend `.env.local` file is created and configured
- [ ] Database URL is correct and accessible
- [ ] Cloudflare R2 credentials are valid
- [ ] Resend email credentials are configured
- [ ] SECRET_KEY is generated for production
- [ ] DEBUG is set to False
- [ ] ALLOWED_HOSTS includes your domain

### 🔐 External Services
- [ ] Supabase database is accessible from server
- [ ] Cloudflare R2 bucket is configured
- [ ] Resend email service is set up
- [ ] All API keys and credentials are valid

## Deployment Process

### 📁 Code Deployment
- [ ] Repository is cloned to `/var/www/malikli-store`
- [ ] Latest code is pulled from main branch
- [ ] File permissions are correct
- [ ] Environment files are in place

### 🐍 Backend Deployment
- [ ] Python virtual environment is created
- [ ] Dependencies are installed from requirements.txt
- [ ] Gunicorn is installed
- [ ] Database migrations are run
- [ ] Static files are collected
- [ ] Django configuration passes check --deploy

### ⚛️ Frontend Deployment
- [ ] Node.js dependencies are installed
- [ ] Next.js application builds successfully
- [ ] Build files are generated in `.next` directory

### 🔄 Process Management
- [ ] PM2 ecosystem configuration is set up
- [ ] Backend process starts successfully
- [ ] Frontend process starts successfully
- [ ] PM2 processes are saved
- [ ] PM2 startup script is configured

### 🌐 Web Server Configuration
- [ ] Nginx configuration is deployed
- [ ] Nginx configuration passes syntax test
- [ ] Nginx is restarted successfully

### 🔒 SSL Certificate Installation
- [ ] Update email address in `install-ssl.sh` script
- [ ] Domain DNS is pointing to server IP
- [ ] HTTP site is accessible (required for SSL verification)
- [ ] Run SSL installation script: `sudo ./install-ssl.sh`
- [ ] SSL certificate is obtained successfully
- [ ] Nginx SSL configuration is applied
- [ ] HTTPS redirect is working
- [ ] Certificate auto-renewal is configured

## Post-Deployment Verification

### 🔍 Application Testing
- [ ] Frontend loads at https://app.malikli1992.store
- [ ] API responds at https://app.malikli1992.store/api/v1/
- [ ] Django admin loads at https://app.malikli1992.store/admin/
- [ ] User registration works
- [ ] Email sending works
- [ ] File uploads work (products, images)
- [ ] Database operations work

### 🔐 Security Testing
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] Security headers are present
- [ ] Admin panel requires authentication
- [ ] API authentication works
- [ ] CORS is properly configured

### 📊 Performance Testing
- [ ] Page load times are acceptable
- [ ] API response times are reasonable
- [ ] Static files are served efficiently
- [ ] Image optimization works

### 🔧 System Health
- [ ] PM2 processes are running
- [ ] Nginx is serving requests
- [ ] SSL certificate is valid
- [ ] Logs are being written
- [ ] Error handling works

## Sign-off

### ✅ Deployment Complete
- [ ] All checklist items completed
- [ ] Application is accessible and functional
- [ ] Monitoring is in place
- [ ] Team is notified of deployment
- [ ] Documentation is updated

**Deployed by:** ________________  
**Date:** ________________  
**Version:** ________________
