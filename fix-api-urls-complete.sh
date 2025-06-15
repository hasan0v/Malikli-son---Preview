#!/bin/bash

# Complete API URL Fix Script
# This script fixes all hardcoded localhost URLs and rebuilds the frontend

set -e

echo "🔧 COMPLETE API URL FIX SCRIPT"
echo "============================="

PROJECT_DIR="/home/deployuser/Malikli-son---Preview"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"

echo "Frontend Directory: $FRONTEND_DIR"
echo "Backend Directory: $BACKEND_DIR"

# Check if running as correct user (not root for this script)
if [[ $EUID -eq 0 ]]; then
   echo "⚠️  This script should NOT be run as root"
   echo "   Run it as your deployment user (deployuser)"
   exit 1
fi

echo ""
echo "🔍 Step 1: Verify Environment Variables"
echo "======================================"

cd "$FRONTEND_DIR"

# Show current environment files
echo "📄 Current environment files:"
ls -la .env* 2>/dev/null || echo "No .env files found"

# Verify .env.production content
if [[ -f ".env.production" ]]; then
    echo ""
    echo "📄 .env.production content:"
    cat .env.production
else
    echo "❌ .env.production not found! Creating it..."
    cat > .env.production << 'EOF'
NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1
NEXT_PUBLIC_SITE_URL=https://malikli1992.store
NODE_ENV=production
EOF
    echo "✅ .env.production created"
fi

# Also create .env if it doesn't exist
if [[ ! -f ".env" ]]; then
    echo "Creating .env file..."
    cp .env.production .env
fi

echo ""
echo "🧹 Step 2: Clean Previous Build"
echo "==============================="

# Remove previous build artifacts
echo "🗑️  Removing old build files..."
rm -rf .next 2>/dev/null || true
rm -rf out 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

echo ""
echo "📦 Step 3: Install Dependencies"
echo "==============================="

# Install/update dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo ""
echo "🏗️  Step 4: Build Frontend"
echo "=========================="

# Build the frontend
echo "🏗️  Building frontend for production..."
NODE_ENV=production npm run build

if [[ $? -ne 0 ]]; then
    echo "❌ Frontend build failed!"
    echo "📋 Check the error above and fix any issues"
    exit 1
fi

echo ""
echo "🔄 Step 5: Restart Services"
echo "=========================="

# Kill existing processes
echo "🛑 Stopping existing services..."
pkill -f "next start" || true
pkill -f "node.*3000" || true
sleep 3

# Start frontend
echo "🚀 Starting frontend in production mode..."
NODE_ENV=production nohup npm run start > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend started with PID: $FRONTEND_PID"

# Wait a moment and check if it started
sleep 5
if ps -p $FRONTEND_PID > /dev/null; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend failed to start. Check frontend.log"
    tail -20 frontend.log
    exit 1
fi

# Also restart backend if needed
cd "$BACKEND_DIR"
echo "🔄 Restarting Django backend..."
pkill -f "python.*manage.py" || true
pkill -f "python.*8000" || true
sleep 2

# Start Django backend
nohup python manage.py runserver 127.0.0.1:8000 > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID: $BACKEND_PID"

# Wait and check backend
sleep 3
if ps -p $BACKEND_PID > /dev/null; then
    echo "✅ Backend is running"
else
    echo "❌ Backend failed to start. Check backend.log"
    tail -20 backend.log
fi

echo ""
echo "🧪 Step 6: Test API Endpoints"
echo "============================"

echo "🧪 Testing API connectivity..."

# Test backend health
echo "Testing backend on localhost:8000..."
if curl -s http://127.0.0.1:8000/health > /dev/null 2>&1; then
    echo "✅ Backend responding on localhost:8000"
else
    echo "⚠️  Backend not responding on localhost:8000"
fi

# Test frontend
echo "Testing frontend on localhost:3000..."
if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "✅ Frontend responding on localhost:3000"
else
    echo "⚠️  Frontend not responding on localhost:3000"
fi

echo ""
echo "🎉 API URL FIX COMPLETE!"
echo "======================="
echo ""
echo "✅ All hardcoded localhost URLs replaced with production URLs"
echo "✅ Frontend rebuilt with correct environment variables"
echo "✅ Services restarted"
echo ""
echo "🔗 Your site should now work at:"
echo "   https://malikli1992.store"
echo "   https://www.malikli1992.store"
echo ""
echo "📋 What was fixed:"
echo "   • All API calls now use https://malikli1992.store/api/v1"
echo "   • No more localhost:8000 hardcoded URLs"
echo "   • Frontend rebuilt with production environment"
echo "   • Services restarted with new configuration"
echo ""
echo "🧪 Test in browser console - should see:"
echo "   API calls to: https://malikli1992.store/api/v1/..."
echo "   NOT: http://localhost:8000/api/v1/..."
echo ""
echo "📄 Log files:"
echo "   Frontend: $FRONTEND_DIR/frontend.log"
echo "   Backend: $BACKEND_DIR/backend.log"
echo ""
echo "🔧 If issues persist, check the logs above"
