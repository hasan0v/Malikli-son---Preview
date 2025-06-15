#!/bin/bash

# Quick Status Check Script
echo "🔍 Current System Status"
echo "======================="

echo ""
echo "📊 PM2 Processes:"
pm2 list

echo ""
echo "🌐 Ports Listening:"
netstat -tlnp | grep -E ':(3000|8000|80|443)' | head -10

echo ""
echo "🔌 Testing Local Services:"
echo -n "Backend (8000): "
if curl -s --max-time 3 http://127.0.0.1:8000/admin/ > /dev/null; then
    echo "✅ RESPONDING"
else
    echo "❌ NOT RESPONDING"
fi

echo -n "Frontend (3000): "
if curl -s --max-time 3 http://127.0.0.1:3000 > /dev/null; then
    echo "✅ RESPONDING"
else
    echo "❌ NOT RESPONDING"
fi

echo ""
echo "🌍 Testing Public Website:"
echo -n "HTTPS Site: "
if curl -s --max-time 5 https://app.malikli1992.store/health > /dev/null; then
    echo "✅ RESPONDING"
else
    echo "❌ NOT RESPONDING"
fi

echo ""
echo "📋 Process Details:"
ps aux | grep -E "(gunicorn|node|npm)" | grep -v grep
