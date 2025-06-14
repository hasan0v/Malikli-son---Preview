# Resend Email Service Setup Guide

This guide will help you set up Resend as your email service provider for the Malikli application.

## 1. Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## 2. Get API Key

1. Login to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name like "Malikli Production" or "Malikli Development"
5. Copy the API key (it starts with `re_`)

## 3. Domain Setup (For Production)

### Option A: Use Resend's Default Domain (Development/Testing)
- For development, you can use Resend's default sending domain
- Emails will be sent from `onboarding@resend.dev`
- This is perfect for testing but not recommended for production

### Option B: Add Your Own Domain (Production)
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `malikli.com`)
4. Add the required DNS records to your domain provider:
   - **MX Record**: `feedback-smtp.us-east-1.amazonses.com` (priority 10)
   - **TXT Record**: SPF record provided by Resend
   - **CNAME Records**: DKIM records provided by Resend
5. Wait for verification (can take up to 24 hours)

## 4. Configure Backend

### Update .env file
Create or update your `.env` file in the backend directory:

```bash
# Email Configuration - Resend
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_USE_SSL=False
EMAIL_HOST_USER=resend
EMAIL_HOST_PASSWORD=re_YourActualAPIKey_here
DEFAULT_FROM_EMAIL=noreply@yourdomain.com

# Optional: Resend API Key for direct API usage
RESEND_API_KEY=re_YourActualAPIKey_here

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### For Production
Replace the values with your actual configuration:
- `EMAIL_HOST_PASSWORD`: Your actual Resend API key
- `DEFAULT_FROM_EMAIL`: Your verified email address (e.g., `noreply@yourdomain.com`)
- `FRONTEND_URL`: Your actual frontend URL (e.g., `https://malikli.com`)

## 5. Install Dependencies

Run the following command in your backend directory:

```bash
pip install -r requirements.txt
```

This will install the Resend Python SDK and other required packages.

## 6. Choose Email Backend

You have two options for sending emails:

### Option A: SMTP Backend (Recommended)
Uses Django's built-in SMTP backend with Resend's SMTP servers.
- **Pros**: Simple setup, works with existing Django email functions
- **Cons**: Basic features only

Your current configuration already uses this method.

### Option B: Resend API Backend (Advanced)
Uses Resend's API directly for enhanced features.
- **Pros**: Better deliverability, webhooks, analytics, advanced features
- **Cons**: Slightly more complex setup

To use the API backend, update your `.env`:
```bash
EMAIL_BACKEND=users.email_backends.ResendAPIBackend
```

## 7. Test Email Sending

### Method 1: Django Shell
```bash
cd backend
python manage.py shell
```

```python
from django.core.mail import send_mail
from django.conf import settings

# Test basic email
send_mail(
    'Test Email from Malikli',
    'This is a test email sent via Resend.',
    settings.DEFAULT_FROM_EMAIL,
    ['your-test-email@example.com'],
    fail_silently=False,
)
```

### Method 2: Test Registration
1. Start your Django server: `python manage.py runserver`
2. Start your frontend: `npm run dev`
3. Try registering a new user
4. Check your email for the verification message

## 8. Monitor Email Delivery

1. Login to your Resend dashboard
2. Go to **Logs** section
3. Monitor email delivery status, bounces, and opens
4. Set up webhooks if needed for advanced tracking

## 9. Production Checklist

Before going live, ensure:

- [ ] Domain is verified in Resend
- [ ] DNS records are properly configured
- [ ] API key is set in production environment variables
- [ ] `DEFAULT_FROM_EMAIL` uses your verified domain
- [ ] `FRONTEND_URL` points to your production frontend
- [ ] Email templates are tested and look good
- [ ] Bounce and complaint handling is set up

## 10. Security Best Practices

1. **Never commit API keys to version control**
2. **Use environment variables** for all sensitive configuration
3. **Rotate API keys** regularly in production
4. **Set up monitoring** for email delivery failures
5. **Implement proper error handling** in your email sending code

## 11. Troubleshooting

### Common Issues:

1. **"Authentication failed"**
   - Check if your API key is correct
   - Ensure EMAIL_HOST_USER is set to "resend"

2. **"Domain not verified"**
   - Check domain verification status in Resend dashboard
   - Verify DNS records are correctly configured

3. **Emails going to spam**
   - Set up proper SPF, DKIM, and DMARC records
   - Use a verified domain for sending
   - Avoid spam trigger words in subject lines

4. **Rate limiting**
   - Free plan: 100 emails/day
   - Check your usage in Resend dashboard
   - Upgrade plan if needed

### Get Help:
- Resend Documentation: [resend.com/docs](https://resend.com/docs)
- Resend Support: [resend.com/support](https://resend.com/support)

## Next Steps

After setting up Resend:

1. **Test all email flows**: Registration, password reset, email verification
2. **Customize email templates** to match your brand
3. **Set up monitoring** and alerting for email failures
4. **Configure webhooks** for advanced email tracking (optional)
5. **Implement email preferences** for users (optional)

Your Resend integration is now complete! 🎉
