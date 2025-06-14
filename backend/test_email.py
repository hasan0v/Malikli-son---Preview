#!/usr/bin/env python
"""
Test script for Resend email configuration.
Run this after setting up your Resend API key to verify everything works.

Usage:
    cd backend
    python test_email.py your-test-email@example.com
"""

import os
import sys
import django
from pathlib import Path

# Add the backend directory to Python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.append(str(BASE_DIR))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.core.mail import send_mail
from django.conf import settings
from users.models import User
from users.email_utils import send_verification_email, send_password_reset_email
import uuid


def test_basic_email(recipient_email):
    """Test basic SMTP email sending."""
    print(f"🧪 Testing basic email to {recipient_email}...")
    
    try:
        send_mail(
            subject='Test Email from Malikli',
            message='This is a test email sent via Resend SMTP.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[recipient_email],
            fail_silently=False,
        )
        print("✅ Basic email sent successfully!")
        return True
    except Exception as e:
        print(f"❌ Basic email failed: {e}")
        return False


def test_templated_verification_email(recipient_email):
    """Test templated verification email."""
    print(f"🧪 Testing verification email template to {recipient_email}...")
    
    try:
        # Create a test user (without saving to database)
        test_user = User(
            username='test_user',
            email=recipient_email,
            first_name='Test',
            email_verification_token=str(uuid.uuid4())
        )
        
        success = send_verification_email(test_user)
        if success:
            print("✅ Verification email template sent successfully!")
            return True
        else:
            print("❌ Verification email template failed")
            return False
    except Exception as e:
        print(f"❌ Verification email template failed: {e}")
        return False


def test_templated_password_reset_email(recipient_email):
    """Test templated password reset email."""
    print(f"🧪 Testing password reset email template to {recipient_email}...")
    
    try:
        # Create a test user (without saving to database)
        test_user = User(
            username='test_user',
            email=recipient_email,
            first_name='Test',
            password_reset_token=str(uuid.uuid4())
        )
        
        success = send_password_reset_email(test_user)
        if success:
            print("✅ Password reset email template sent successfully!")
            return True
        else:
            print("❌ Password reset email template failed")
            return False
    except Exception as e:
        print(f"❌ Password reset email template failed: {e}")
        return False


def check_configuration():
    """Check email configuration."""
    print("🔍 Checking email configuration...")
    
    config_items = [
        ('EMAIL_BACKEND', settings.EMAIL_BACKEND),
        ('EMAIL_HOST', settings.EMAIL_HOST),
        ('EMAIL_PORT', settings.EMAIL_PORT),
        ('EMAIL_USE_TLS', settings.EMAIL_USE_TLS),
        ('EMAIL_HOST_USER', settings.EMAIL_HOST_USER),
        ('DEFAULT_FROM_EMAIL', settings.DEFAULT_FROM_EMAIL),
        ('FRONTEND_URL', settings.FRONTEND_URL),
    ]
    
    for name, value in config_items:
        if name == 'EMAIL_HOST_PASSWORD':
            # Don't print the actual password
            has_password = bool(getattr(settings, 'EMAIL_HOST_PASSWORD', ''))
            print(f"  {name}: {'✅ Set' if has_password else '❌ Not set'}")
        else:
            print(f"  {name}: {value}")
    
    # Check if API key is set
    api_key = getattr(settings, 'RESEND_API_KEY', '')
    print(f"  RESEND_API_KEY: {'✅ Set' if api_key else '❌ Not set'}")
    
    return True


def main():
    """Main test function."""
    print("🎯 Malikli Email Configuration Test")
    print("=" * 50)
    
    # Check if recipient email is provided
    if len(sys.argv) != 2:
        print("❌ Please provide a test email address:")
        print("   python test_email.py your-email@example.com")
        sys.exit(1)
    
    recipient_email = sys.argv[1]
    
    # Validate email format
    if '@' not in recipient_email:
        print("❌ Please provide a valid email address")
        sys.exit(1)
    
    print(f"📧 Testing email functionality with: {recipient_email}")
    print()
    
    # Check configuration
    check_configuration()
    print()
    
    # Run tests
    tests = [
        test_basic_email,
        test_templated_verification_email,
        test_templated_password_reset_email,
    ]
    
    passed = 0
    total = len(tests)
    
    for test_func in tests:
        try:
            if test_func(recipient_email):
                passed += 1
        except Exception as e:
            print(f"❌ Test {test_func.__name__} crashed: {e}")
        print()
    
    # Summary
    print("📊 Test Results")
    print("=" * 30)
    print(f"Passed: {passed}/{total}")
    
    if passed == total:
        print("🎉 All tests passed! Your email configuration is working perfectly.")
    elif passed > 0:
        print("⚠️  Some tests passed. Check your configuration and try again.")
    else:
        print("❌ All tests failed. Please check your Resend API key and configuration.")
    
    print()
    print("💡 Next steps:")
    if passed == 0:
        print("   1. Verify your Resend API key in .env file")
        print("   2. Make sure your domain is verified (for production)")
        print("   3. Check Django logs for detailed error messages")
    else:
        print("   1. Test the full registration flow in your application")
        print("   2. Monitor email delivery in your Resend dashboard")
        print("   3. Set up webhooks for advanced tracking (optional)")


if __name__ == '__main__':
    main()
