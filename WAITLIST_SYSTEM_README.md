# Waitlist Subscriber Processing System

This system automatically processes waitlist subscribers by creating user accounts and sending welcome emails with login credentials.

## Features

- ✅ **Secure Password Generation**: Creates strong, random passwords
- ✅ **Email Templates**: Beautiful HTML and text email templates
- ✅ **Continuous Processing**: Runs every 60 seconds by default
- ✅ **Batch Processing**: Configurable batch sizes
- ✅ **Comprehensive Logging**: File and console logging
- ✅ **Error Handling**: Robust error handling and recovery
- ✅ **Admin Interface**: Django admin interface for management
- ✅ **Production Ready**: Includes safety checks and validation

## Installation & Setup

### 1. Database Migration

First, create and apply the migration for the WaitlistSubscriber model:

```bash
cd backend
python manage.py makemigrations users
python manage.py migrate
```

### 2. Email Configuration

Ensure your Django settings have proper email configuration:

```python
# settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.resend.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'resend'
EMAIL_HOST_PASSWORD = 'your-resend-api-key'
DEFAULT_FROM_EMAIL = 'noreply@yourdomain.com'
FRONTEND_URL = 'https://app.malikli1992.store'
```

### 3. Template Files

The system uses these email templates (already created):
- `backend/templates/emails/waitlist_welcome.html`
- `backend/templates/emails/waitlist_welcome.txt`

## Usage

### Method 1: Django Management Command

```bash
# Run continuously (checks every 60 seconds)
python manage.py process_waitlist_subscribers

# Run once
python manage.py process_waitlist_subscribers --once

# Custom interval (30 seconds)
python manage.py process_waitlist_subscribers --interval 30

# Custom batch size (5 subscribers per batch)
python manage.py process_waitlist_subscribers --batch-size 5
```

### Method 2: Standalone Script

```bash
# Run continuously
python waitlist_processor_standalone.py

# Run once
python waitlist_processor_standalone.py --once

# Custom interval and batch size
python waitlist_processor_standalone.py --interval 30 --batch-size 5
```

## Testing

### Add Test Data

```bash
python add_test_waitlist_data.py
```

This creates 5 test waitlist subscribers that you can use to test the system.

### Manual Testing

1. Add test subscribers using the script above
2. Run the processor once: `python manage.py process_waitlist_subscribers --once`
3. Check the logs for processing results
4. Verify users were created in Django admin
5. Check email delivery

## WaitlistSubscriber Model

```python
class WaitlistSubscriber(models.Model):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255, blank=True)  # Full name (optional)
    first_name = models.CharField(max_length=150, blank=True)  # Auto-extracted
    last_name = models.CharField(max_length=150, blank=True, null=True)  # Auto-extracted
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES, default='website')
    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(null=True, blank=True)
```

### Source Options
- `website` - Website
- `social_media` - Social Media  
- `email_campaign` - Email Campaign
- `referral` - Referral
- `advertisement` - Advertisement
- `influencer` - Influencer
- `newsletter` - Newsletter
- `other` - Other

### Name Handling
- **name**: Optional full name field
- **first_name/last_name**: Automatically extracted from `name` field when saved
- **get_display_name()**: Returns the best available name for display

## Admin Interface

Access the Django admin at `/admin/` to:
- View all waitlist subscribers
- Filter by processing status
- Search by email or name
- Mark subscribers as processed/unprocessed
- View links to created user accounts

## Process Flow

1. **Check Waitlist**: Script queries for unprocessed subscribers
2. **User Validation**: Checks if user already exists with email
3. **Account Creation**: Creates new user account with secure password
4. **Email Sending**: Sends welcome email with login credentials
5. **Status Update**: Marks subscriber as processed
6. **Error Handling**: Rolls back changes if email fails

## Security Features

- **Secure Passwords**: 12-character passwords with mixed case, numbers, and symbols
- **Unique Usernames**: Automatically generates unique usernames from email prefixes
- **Transaction Safety**: Database transactions ensure data consistency
- **Email Verification**: Users are created with `is_verified=False`
- **Credential Protection**: Temporary passwords with immediate change requirement

## Configuration Options

### Environment Variables

```bash
DJANGO_SETTINGS_MODULE=backend.settings
FRONTEND_URL=https://app.malikli1992.store
```

### Command Arguments

- `--once`: Run once instead of continuously
- `--interval <seconds>`: Time between processing cycles (default: 60)
- `--batch-size <number>`: Max subscribers per batch (default: 10)

## Logging

The system logs to:
- **File**: `waitlist_processor.log`
- **Console**: Standard output

Log levels include:
- `INFO`: Normal processing events
- `ERROR`: Processing errors and failures
- `WARNING`: Non-critical issues

## Production Deployment

### Systemd Service (Linux)

Create `/etc/systemd/system/waitlist-processor.service`:

```ini
[Unit]
Description=Waitlist Processor
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/your/backend
Environment=DJANGO_SETTINGS_MODULE=backend.settings
ExecStart=/path/to/your/venv/bin/python waitlist_processor_standalone.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable waitlist-processor
sudo systemctl start waitlist-processor
sudo systemctl status waitlist-processor
```

### Docker Deployment

Add to your `docker-compose.yml`:

```yaml
services:
  waitlist-processor:
    build: .
    command: python waitlist_processor_standalone.py
    environment:
      - DJANGO_SETTINGS_MODULE=backend.settings
    volumes:
      - ./backend:/app
    depends_on:
      - db
      - redis
    restart: unless-stopped
```

### Cron Job (Alternative)

Add to crontab for periodic processing:

```bash
# Run every 5 minutes
*/5 * * * * cd /path/to/backend && python manage.py process_waitlist_subscribers --once
```

## Monitoring

Monitor the system by:
- Checking log files regularly
- Setting up log rotation
- Monitoring email delivery rates
- Tracking processing statistics
- Setting up alerts for errors

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check email configuration in settings
   - Verify API keys and credentials
   - Check network connectivity

2. **Database Errors**
   - Ensure migrations are applied
   - Check database connectivity
   - Verify model definitions

3. **Template Errors**
   - Ensure template files exist
   - Check template syntax
   - Verify context variables

### Debug Mode

Enable debug logging by setting:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'waitlist_debug.log',
        },
    },
    'loggers': {
        '__main__': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

## API Integration

To add subscribers programmatically:

```python
from users.models import WaitlistSubscriber

# Add a subscriber with full name
subscriber = WaitlistSubscriber.objects.create(
    email='new.subscriber@example.com',
    name='New Subscriber',
    phone_number='+1234567890',
    source='social_media'
)

# Add a subscriber with minimal info
subscriber = WaitlistSubscriber.objects.create(
    email='minimal@example.com',
    source='website'
)
```

Or via Django REST API (if implemented):

```bash
curl -X POST https://your-api.com/api/waitlist/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new.subscriber@example.com",
    "name": "New Subscriber",
    "source": "social_media"
  }'
```

## Support

For issues or questions:
- Check the logs first
- Review the troubleshooting section
- Contact the development team
- File an issue in the project repository

---

**Note**: This system handles sensitive user data. Ensure proper security measures are in place in your production environment.
