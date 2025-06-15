#!/bin/bash

# Performance Optimization Script for Malikli Website
# This script applies database optimizations and performance improvements

echo "🚀 Starting performance optimization for Malikli website..."

# Change to backend directory
cd backend

echo "📦 Installing required Python packages..."
pip install -r requirements.txt

echo "🗄️  Running database migrations with performance improvements..."
python manage.py makemigrations
python manage.py migrate

echo "🗃️  Creating database indexes for better performance..."
python manage.py migrate products 0008_add_performance_indexes

echo "🧹 Cleaning up expired sessions..."
python manage.py clearsessions

echo "📊 Collecting static files for production..."
python manage.py collectstatic --noinput

echo "🔍 Running Django checks..."
python manage.py check

echo "✅ Backend performance optimization completed!"

# Change to frontend directory
cd ../frontend

echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️  Building optimized frontend bundle..."
npm run build

echo "✅ Frontend optimization completed!"

echo "🎉 Performance optimization completed successfully!"
echo ""
echo "📈 Performance improvements applied:"
echo "   • Database indexes added for faster queries"
echo "   • Caching middleware configured"
echo "   • API response caching enabled"
echo "   • Frontend bundle optimization"
echo "   • Image optimization settings"
echo "   • Request/response compression"
echo ""
echo "🔧 Additional recommendations:"
echo "   • Set up Redis for better caching (configure REDIS_URL environment variable)"
echo "   • Enable CDN for static files"
echo "   • Monitor database query performance"
echo "   • Consider using a reverse proxy like Nginx"
