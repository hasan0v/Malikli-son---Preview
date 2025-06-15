#!/bin/bash

# 502 Bad Gateway Troubleshooting Script
# This script helps diagnose why Nginx can't connect to backend services

echo "🔍 Diagnosing 502 Bad Gateway Error"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }
print_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }

echo ""
print_info "Step 1: Checking PM2 Process Status"
echo "-----------------------------------"
pm2 list
pm2 show malikli-backend
pm2 show malikli-frontend

echo ""
print_info "Step 2: Checking What Ports Are Actually Open"
echo "--------------------------------------------"
echo "Ports that should be listening:"
echo "- Port 3000: Next.js frontend"
echo "- Port 8000: Django backend"
echo ""
netstat -tlnp | grep -E ':(3000|8000|80|443)'
echo ""
ss -tlnp | grep -E ':(3000|8000|80|443)'

echo ""
print_info "Step 3: Testing Local Service Connectivity"
echo "-----------------------------------------"
echo "Testing if services respond locally..."

# Test backend
echo -n "Backend (port 8000): "
if curl -s --max-time 5 http://127.0.0.1:8000/health > /dev/null 2>&1; then
    print_status "RESPONDING"
else
    print_error "NOT RESPONDING"
    echo "Trying Django admin URL..."
    curl -I http://127.0.0.1:8000/admin/ 2>/dev/null | head -1
fi

# Test frontend
echo -n "Frontend (port 3000): "
if curl -s --max-time 5 http://127.0.0.1:3000 > /dev/null 2>&1; then
    print_status "RESPONDING"
else
    print_error "NOT RESPONDING"
    echo "Trying to curl frontend..."
    curl -I http://127.0.0.1:3000 2>/dev/null | head -1
fi

echo ""
print_info "Step 4: Checking Nginx Configuration and Logs"
echo "--------------------------------------------"
echo "Nginx configuration test:"
nginx -t

echo ""
echo "Recent Nginx error log entries:"
tail -20 /var/log/nginx/error.log

echo ""
print_info "Step 5: Checking PM2 Logs"
echo "------------------------"
echo "Backend logs (last 20 lines):"
pm2 logs malikli-backend --lines 20 --nostream

echo ""
echo "Frontend logs (last 20 lines):"
pm2 logs malikli-frontend --lines 20 --nostream

echo ""
print_info "Step 6: Process Information"
echo "-------------------------"
echo "All processes using ports 3000 and 8000:"
lsof -i :3000 2>/dev/null || echo "No process on port 3000"
lsof -i :8000 2>/dev/null || echo "No process on port 8000"

echo ""
print_info "Step 7: Service Status"
echo "--------------------"
systemctl status nginx --no-pager -l

echo ""
print_info "Step 8: Firewall Status"
echo "---------------------"
if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --list-all
elif command -v ufw &> /dev/null; then
    ufw status
else
    echo "No firewall management tool found"
fi

echo ""
print_info "Step 9: Testing External Connectivity"
echo "------------------------------------"
echo "Testing domain resolution:"
nslookup app.malikli1992.store

echo ""
echo "Testing HTTP/HTTPS connectivity:"
curl -I https://app.malikli1992.store 2>/dev/null | head -5

echo ""
echo "🔧 QUICK FIXES TO TRY:"
echo "======================"
print_warning "1. Restart PM2 processes:"
echo "   pm2 restart all"
echo ""
print_warning "2. Check if services are binding to correct interface:"
echo "   pm2 delete all"
echo "   pm2 start ecosystem.config.js"
echo ""
print_warning "3. Manually test backend:"
echo "   cd /var/www/malikli-store/backend"
echo "   source venv/bin/activate"
echo "   python manage.py runserver 127.0.0.1:8000"
echo ""
print_warning "4. Manually test frontend:"
echo "   cd /var/www/malikli-store/frontend"
echo "   npm run start"
echo ""
print_warning "5. Restart Nginx:"
echo "   systemctl restart nginx"
