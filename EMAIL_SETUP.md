# Email Service Setup Guide

## For Development (Gmail SMTP)

### Step 1: Enable 2-Factor Authentication
1. Go to your Gmail account settings
2. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate App Password
1. Go to https://myaccount.google.com/security
2. Click on "2-Step Verification"
3. Scroll down and click on "App passwords"
4. Select "Mail" and "Other (custom name)"
5. Enter "Django App" as the name
6. Copy the generated 16-character password

### Step 3: Configure Environment
1. Copy `.env.example` to `.env` in your backend folder
2. Replace the email settings:
   ```
   EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USE_TLS=True
   EMAIL_HOST_USER=your-gmail@gmail.com
   EMAIL_HOST_PASSWORD=your-16-character-app-password
   DEFAULT_FROM_EMAIL=your-gmail@gmail.com
   ```

### Step 4: Test Email
Run this command in Django shell to test:
```bash
python manage.py shell
```
```python
from django.core.mail import send_mail
send_mail(
    'Test Email',
    'This is a test email.',
    'your-gmail@gmail.com',
    ['recipient@example.com'],
    fail_silently=False,
)
```

## For Production (Recommended Services)

### Mailgun
1. Sign up at https://www.mailgun.com/
2. Verify your domain
3. Get your SMTP credentials
4. Update .env with Mailgun settings

### SendGrid
1. Sign up at https://sendgrid.com/
2. Create an API key
3. Update .env with SendGrid settings

### Resend
1. Sign up at https://resend.com/
2. Create an API key
3. Update .env with Resend settings

## Security Notes
- Never commit your .env file to version control
- Use environment variables in production
- Consider using a dedicated email service for production
- Monitor your email sending limits
