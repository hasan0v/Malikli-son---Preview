#!/usr/bin/env python3
"""
Django Backend Test Script
Tests if Django can be imported and run properly
"""

import sys
import os

# Add the backend directory to Python path
backend_dir = '/var/www/malikli-store/backend'
sys.path.insert(0, backend_dir)

# Change to backend directory
os.chdir(backend_dir)

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    import django
    print(f"✅ Django imported successfully (version: {django.get_version()})")
    
    django.setup()
    print("✅ Django setup completed")
    
    # Test importing the WSGI application
    from backend.wsgi import application
    print("✅ WSGI application imported successfully")
    
    # Test basic Django functionality
    from django.conf import settings
    print(f"✅ Settings loaded (DEBUG: {settings.DEBUG})")
    
    print("\n🎉 Django backend is ready for gunicorn!")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
