#!/bin/bash
# Django Backend Startup Script for PM2

cd /var/www/malikli-store/backend

# Activate virtual environment
source venv/bin/activate

# Start gunicorn
exec gunicorn --bind 127.0.0.1:8000 --workers 3 --timeout 120 --max-requests 1000 --preload backend.wsgi:application
