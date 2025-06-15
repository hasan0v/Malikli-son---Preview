#!/bin/bash

# Frontend Fix Script
# This script properly starts the Next.js frontend

echo "🔧 Fixing Frontend (Next.js) Process"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() { echo -e "${GREEN}✅ $1${NC}"; }
print_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
print_error() { echo -e "${RED}❌ $1${NC}"; }

# Use your actual project path
PROJECT_PATH="/home/deployuser/Malikli-son---Preview"
FRONTEND_PATH="$PROJECT_PATH/frontend"

print_warning "Step 1: Stopping existing frontend processes"
pm2 delete malikli-frontend 2>/dev/null || true
sudo lsof -t -i:3000 | xargs -r sudo kill -9 2>/dev/null || true

sleep 2

print_warning "Step 2: Checking frontend directory and build"
cd "$FRONTEND_PATH"

if [ ! -d ".next" ]; then
    print_warning "No build found. Building Next.js application..."
    npm run build
fi

print_warning "Step 3: Starting frontend with different methods"

# Method 1: Direct npm start
print_warning "Trying Method 1: Direct npm start with PM2"
pm2 start npm --name "malikli-frontend" -- start --cwd "$FRONTEND_PATH"
sleep 5

# Test if it's working
if curl -s --max-time 5 http://127.0.0.1:3000 > /dev/null; then
    print_status "Method 1 successful! Frontend is responding on port 3000"
    pm2 save
    exit 0
fi

# Method 2: Using next start directly
print_warning "Method 1 failed. Trying Method 2: Direct next start"
pm2 delete malikli-frontend 2>/dev/null || true
pm2 start "./node_modules/.bin/next" --name "malikli-frontend" --cwd "$FRONTEND_PATH" -- start
sleep 5

if curl -s --max-time 5 http://127.0.0.1:3000 > /dev/null; then
    print_status "Method 2 successful! Frontend is responding on port 3000"
    pm2 save
    exit 0
fi

# Method 3: Using node directly
print_warning "Method 2 failed. Trying Method 3: Node server.js"
pm2 delete malikli-frontend 2>/dev/null || true

# Check if server.js exists, if not create it
if [ ! -f "$FRONTEND_PATH/server.js" ]; then
    print_warning "Creating server.js file..."
    cat > "$FRONTEND_PATH/server.js" << 'EOF'
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '127.0.0.1'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
EOF
fi

pm2 start "$FRONTEND_PATH/server.js" --name "malikli-frontend"
sleep 5

if curl -s --max-time 5 http://127.0.0.1:3000 > /dev/null; then
    print_status "Method 3 successful! Frontend is responding on port 3000"
    pm2 save
    exit 0
fi

# Method 4: Manual npm start in background
print_warning "Method 3 failed. Trying Method 4: Background npm start"
pm2 delete malikli-frontend 2>/dev/null || true

cd "$FRONTEND_PATH"
nohup npm start > /tmp/frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > /tmp/frontend.pid

sleep 10

if curl -s --max-time 5 http://127.0.0.1:3000 > /dev/null; then
    print_status "Method 4 successful! Frontend is responding on port 3000"
    print_warning "Frontend is running as background process (PID: $FRONTEND_PID)"
    print_warning "To stop: kill $FRONTEND_PID"
    exit 0
fi

print_error "All methods failed. Manual debugging needed."
print_warning "Debug steps:"
echo "1. Check if build exists: ls -la $FRONTEND_PATH/.next"
echo "2. Try manual start: cd $FRONTEND_PATH && npm start"
echo "3. Check package.json scripts: cat $FRONTEND_PATH/package.json | grep -A5 scripts"
echo "4. Check logs: cat /tmp/frontend.log"

print_warning "Current PM2 status:"
pm2 list
