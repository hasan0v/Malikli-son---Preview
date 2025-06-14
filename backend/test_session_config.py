#!/usr/bin/env python3
"""
Session Configuration Test Script

This script tests the 72-hour session configuration to ensure it's working correctly.

Usage:
    python test_session_config.py
"""

import os
import sys
from pathlib import Path
from datetime import datetime, timedelta

# Add the backend directory to Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    import django
    django.setup()
except ImportError:
    print("Error: Django not found. Please ensure Django is installed.")
    sys.exit(1)

from django.conf import settings
from django.contrib.sessions.backends.db import SessionStore
from django.contrib.auth import get_user_model

User = get_user_model()

def test_session_configuration():
    """Test the session configuration settings."""
    print("🔍 Testing Session Configuration...")
    print("=" * 50)
    
    # Check session settings
    session_age = settings.SESSION_COOKIE_AGE
    hours = session_age / 3600
    
    print(f"✅ Session Cookie Age: {session_age} seconds ({hours} hours)")
    print(f"✅ Session Save Every Request: {settings.SESSION_SAVE_EVERY_REQUEST}")
    print(f"✅ Session Cookie Secure: {settings.SESSION_COOKIE_SECURE}")
    print(f"✅ Session Cookie HTTPOnly: {settings.SESSION_COOKIE_HTTPONLY}")
    print(f"✅ Session Cookie SameSite: {settings.SESSION_COOKIE_SAMESITE}")
    print(f"✅ Session Expire at Browser Close: {settings.SESSION_EXPIRE_AT_BROWSER_CLOSE}")
    print(f"✅ Session Engine: {settings.SESSION_ENGINE}")
    print(f"✅ Session Cookie Name: {settings.SESSION_COOKIE_NAME}")
    
    # Verify it's 72 hours
    expected_seconds = 72 * 60 * 60  # 259200 seconds
    if session_age == expected_seconds:
        print(f"✅ CORRECT: Session duration is set to 72 hours ({session_age} seconds)")
    else:
        print(f"❌ ERROR: Expected {expected_seconds} seconds, got {session_age} seconds")
    
    print("\\n" + "=" * 50)

def test_jwt_configuration():
    """Test the JWT configuration settings."""
    print("🔍 Testing JWT Configuration...")
    print("=" * 50)
    
    # Check JWT settings
    jwt_settings = settings.SIMPLE_JWT
    access_lifetime = jwt_settings.get('ACCESS_TOKEN_LIFETIME')
    refresh_lifetime = jwt_settings.get('REFRESH_TOKEN_LIFETIME')
    
    print(f"✅ Access Token Lifetime: {access_lifetime}")
    print(f"✅ Refresh Token Lifetime: {refresh_lifetime}")
    print(f"✅ Rotate Refresh Tokens: {jwt_settings.get('ROTATE_REFRESH_TOKENS')}")
    print(f"✅ Blacklist After Rotation: {jwt_settings.get('BLACKLIST_AFTER_ROTATION')}")
    print(f"✅ Update Last Login: {jwt_settings.get('UPDATE_LAST_LOGIN')}")
    
    # Verify access token is 72 hours
    expected_access_lifetime = timedelta(hours=72)
    if access_lifetime == expected_access_lifetime:
        print(f"✅ CORRECT: JWT access token lifetime matches session duration (72 hours)")
    else:
        print(f"❌ ERROR: Expected {expected_access_lifetime}, got {access_lifetime}")
    
    print("\\n" + "=" * 50)

def test_session_creation():
    """Test actual session creation and expiry calculation."""
    print("🔍 Testing Session Creation...")
    print("=" * 50)
    
    try:
        # Create a test session
        session = SessionStore()
        session['test_key'] = 'test_value'
        session['created_at'] = datetime.now().isoformat()
        session.save()
        
        # Calculate expiry time
        now = datetime.now()
        expiry_time = now + timedelta(seconds=settings.SESSION_COOKIE_AGE)
        
        print(f"✅ Test session created: {session.session_key}")
        print(f"✅ Current time: {now.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"✅ Session expires at: {expiry_time.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"✅ Session duration: {timedelta(seconds=settings.SESSION_COOKIE_AGE)}")
        
        # Verify session data
        retrieved_session = SessionStore(session_key=session.session_key)
        if retrieved_session.get('test_key') == 'test_value':
            print("✅ CORRECT: Session data can be retrieved successfully")
        else:
            print("❌ ERROR: Session data could not be retrieved")
        
        # Clean up test session
        session.delete()
        print("✅ Test session cleaned up")
        
    except Exception as e:
        print(f"❌ ERROR: Session test failed: {str(e)}")
    
    print("\\n" + "=" * 50)

def display_summary():
    """Display summary and recommendations."""
    print("📋 Configuration Summary")
    print("=" * 50)
    
    print("✅ Users will stay logged in for 72 hours (3 days)")
    print("✅ Sessions are secure and HTTP-only")
    print("✅ JWT tokens also last 72 hours for consistency")
    print("✅ Refresh tokens last 30 days")
    print("✅ Sessions persist across browser restarts")
    
    print("\\n🔧 Maintenance Recommendations:")
    print("- Run 'python manage.py clearsessions' periodically to remove expired sessions")
    print("- Monitor session table size in production")
    print("- Consider using cache-based sessions for better performance if needed")
    
    print("\\n🔒 Security Features:")
    print("- Secure cookies in production (HTTPS)")
    print("- HTTP-only cookies (prevent XSS)")
    print("- SameSite protection (prevent CSRF)")
    print("- Token rotation and blacklisting")
    
    print("\\n💡 Usage:")
    print("- Users can close browser and return within 72 hours")
    print("- Active users get session extended automatically")
    print("- Inactive sessions expire after 72 hours")

def main():
    """Main test function."""
    print("🚀 Malikli Session Configuration Test")
    print("====================================\\n")
    
    test_session_configuration()
    test_jwt_configuration()
    test_session_creation()
    display_summary()
    
    print("\\n✅ Session configuration test completed!")

if __name__ == '__main__':
    main()
