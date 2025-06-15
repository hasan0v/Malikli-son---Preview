#!/bin/bash

# Quick Fix Script for 502 Bad Gateway
# This script restarts all services in the correct order

echo "🔧 Fixing 502 Bad Gateway Error"
echo "==============================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Change to project directory
cd /home/deployuser/Malikli-son---Preview/

print_warning "Step 1: Stopping all PM2 processes"
pm2 delete all 2>/dev/null || true
pm2 kill 2>/dev/null || true

print_warning "Step 2: Checking for processes on ports 3000 and 8000"
echo "Killing any processes on port 3000..."
sudo lsof -t -i:3000 | xargs -r sudo kill -9 2>/dev/null || true

echo "Killing any processes on port 8000..."
sudo lsof -t -i:8000 | xargs -r sudo kill -9 2>/dev/null || true

sleep 2

print_warning "Step 3: Starting Backend (Django)"
cd /home/deployuser/Malikli-son---Preview/backend

# Activate virtual environment
source venv/bin/activate

# Set environment variables
export DJANGO_SETTINGS_MODULE=backend.settings
export PYTHONPATH=/home/deployuser/Malikli-son---Preview/backend:$PYTHONPATH

# Start Django with gunicorn
echo "Starting Django backend with gunicorn..."
gunicorn backend.wsgi:application \
    --bind 127.0.0.1:8000 \
    --workers 3 \
    --worker-class sync \
    --timeout 120 \
    --keep-alive 2 \
    --max-requests 1000 \
    --max-requests-jitter 100 \
    --daemon \
    --pid /tmp/gunicorn.pid \
    --access-logfile /var/log/gunicorn-access.log \
    --error-logfile /var/log/gunicorn-error.log

sleep 3

# Test backend
if curl -s http://127.0.0.1:8000/admin/ > /dev/null; then
    print_status "Backend is responding on port 8000"
else
    print_error "Backend is not responding on port 8000"
fi

print_warning "Step 4: Starting Frontend (Next.js)"
cd /var/www/malikli-store/frontend

# Start Next.js with PM2 (better process management)
pm2 start npm --name "malikli-frontend" -- start
pm2 save

sleep 5

# Test frontend
if curl -s http://127.0.0.1:3000 > /dev/null; then
    print_status "Frontend is responding on port 3000"
else
    print_error "Frontend is not responding on port 3000"
    print_warning "Trying alternative frontend start method..."
    
    # Alternative: Start with node directly
    pm2 delete malikli-frontend 2>/dev/null || true
    pm2 start "npm start" --name "malikli-frontend" --cwd /var/www/malikli-store/frontend
    sleep 5
    
    if curl -s http://127.0.0.1:3000 > /dev/null; then
        print_status "Frontend is now responding on port 3000"
    else
        print_error "Frontend still not responding. Manual intervention needed."
    fi
fi

print_warning "Step 5: Restarting Nginx"
systemctl restart nginx

sleep 2

print_warning "Step 6: Testing the website"
echo "Testing HTTPS site..."
if curl -s https://app.malikli1992.store/health > /dev/null; then
    print_status "Website is responding! 🎉"
else
    print_error "Website still not responding"
    echo ""
    echo "Manual checks needed:"
    echo "1. Check PM2 status: pm2 list"
    echo "2. Check ports: netstat -tlnp | grep -E ':(3000|8000)'"
    echo "3. Check nginx logs: tail -f /var/log/nginx/error.log"
fi

echo ""
echo "Current status:"
pm2 list
echo ""
echo "Ports listening:"
netstat -tlnp | grep -E ':(3000|8000|80|443)'
