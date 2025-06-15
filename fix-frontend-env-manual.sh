#!/bin/bash

# Manual Frontend Environment Fix
# Use this if you need to manually update environment variables

set -e

echo "🔧 MANUAL FRONTEND ENVIRONMENT FIX"
echo "=================================="

PROJECT_DIR="/home/deployuser/Malikli-son---Preview"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "Frontend Directory: $FRONTEND_DIR"

cd "$FRONTEND_DIR"

echo ""
echo "📝 Updating all environment files..."

# Fix .env.production
echo "Fixing .env.production..."
cat > .env.production << 'EOF'
# Next.js Environment Configuration for Production
NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1
NEXT_PUBLIC_SITE_URL=https://malikli1992.store
NODE_ENV=production
EOF

# Fix .env.local if exists
if [[ -f ".env.local" ]]; then
    echo "Fixing .env.local..."
    cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1
NEXT_PUBLIC_SITE_URL=https://malikli1992.store
EOF
fi

# Fix .env if exists
if [[ -f ".env" ]]; then
    echo "Fixing .env..."
    cat > .env << 'EOF'
NEXT_PUBLIC_API_URL=https://malikli1992.store/api/v1
NEXT_PUBLIC_SITE_URL=https://malikli1992.store
EOF
fi

echo ""
echo "🏗️  Rebuilding frontend..."
npm run build

echo ""
echo "🔄 Restarting frontend..."
pkill -f "next" || true
pkill -f "node.*3000" || true
sleep 2
nohup npm run start > /dev/null 2>&1 &

echo ""
echo "✅ Frontend environment fix complete!"
echo ""
echo "🧪 Test the API calls in browser console:"
echo "   Should now call https://malikli1992.store/api/v1/"
echo "   instead of localhost:8000"
