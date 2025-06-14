# Extended Session Configuration - 72 Hour Login

This document explains the extended session configuration implemented for Malikli to allow users to stay logged in for up to 72 hours.

## Configuration Changes

### Django Sessions (72 hours)
- **SESSION_COOKIE_AGE**: 72 hours (259,200 seconds)
- **SESSION_SAVE_EVERY_REQUEST**: True (extends session on activity)
- **SESSION_EXPIRE_AT_BROWSER_CLOSE**: False (persist across browser restart)

### JWT Tokens (72 hours)
- **ACCESS_TOKEN_LIFETIME**: 72 hours
- **REFRESH_TOKEN_LIFETIME**: 30 days
- **ROTATE_REFRESH_TOKENS**: True (security enhancement)

## Security Features

### Session Security
- **SESSION_COOKIE_SECURE**: True in production (HTTPS only)
- **SESSION_COOKIE_HTTPONLY**: True (prevents XSS)
- **SESSION_COOKIE_SAMESITE**: 'Lax' (CSRF protection)

### JWT Security
- **BLACKLIST_AFTER_ROTATION**: True (invalidates old tokens)
- **UPDATE_LAST_LOGIN**: True (tracks user activity)
- **ALGORITHM**: HS256 (secure signing)

## How It Works

### User Login Flow
1. User logs in with email/password
2. System generates JWT access token (72-hour lifetime)
3. System creates session cookie (72-hour lifetime)
4. Both token and session extend automatically on user activity

### Session Extension
- Every request extends the session by another 72 hours
- User remains logged in as long as they're active
- Inactive users are logged out after 72 hours of inactivity

### Token Refresh
- Access tokens last 72 hours
- Refresh tokens last 30 days
- Old refresh tokens are blacklisted for security

## Frontend Implementation

### JavaScript Session Management
```javascript
// Check if user session is still valid
const checkSession = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    const response = await fetch('/api/v1/auth/verify/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Refresh token if needed
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await fetch('/api/v1/auth/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken })
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
```

### Redux/State Management
```javascript
// Auto-refresh tokens before expiry
const setupTokenRefresh = () => {
  setInterval(async () => {
    const isValid = await checkSession();
    if (!isValid) {
      await refreshToken();
    }
  }, 60 * 60 * 1000); // Check every hour
};
```

## Backend Maintenance

### Session Cleanup
Run this command periodically to clean expired sessions:

```bash
# Clean expired sessions
python manage.py cleanup_sessions

# Dry run to see what would be deleted
python manage.py cleanup_sessions --dry-run

# Use Django's built-in command
python manage.py clearsessions
```

### Cron Job Setup
Add to your system's crontab for automatic cleanup:

```bash
# Clean sessions daily at 2 AM
0 2 * * * cd /path/to/your/project && python manage.py cleanup_sessions
```

### Monitoring
Monitor session usage:

```python
from django.contrib.sessions.models import Session
from django.utils import timezone

# Active sessions
active_count = Session.objects.filter(expire_date__gte=timezone.now()).count()

# Total sessions
total_count = Session.objects.count()

print(f"Active sessions: {active_count}")
print(f"Total sessions: {total_count}")
```

## Production Considerations

### Database Performance
- Monitor session table size
- Consider using cache-based sessions for high traffic
- Regular cleanup is essential

### Security
- Use HTTPS in production (SESSION_COOKIE_SECURE=True)
- Monitor for suspicious session activity
- Implement session invalidation on password change

### Load Balancing
For multiple server instances:
- Use database or cache-based sessions (not file-based)
- Ensure session data is shared across instances
- Consider Redis for session storage

## User Experience

### Benefits
- ✅ Users stay logged in for 3 days
- ✅ Sessions extend automatically with activity
- ✅ Seamless experience across browser restarts
- ✅ No frequent login prompts

### User Communication
- Inform users about the 72-hour login duration
- Provide manual logout option
- Show session status in UI if needed

## Testing

### Test Cases
1. **Login Duration**: Verify user stays logged in for 72 hours
2. **Activity Extension**: Confirm session extends with activity
3. **Inactivity Logout**: Test logout after 72 hours of inactivity
4. **Token Refresh**: Verify automatic token refresh
5. **Security**: Test logout on password change

### Testing Commands
```bash
# Test session settings
python manage.py shell
>>> from django.conf import settings
>>> print(f"Session age: {settings.SESSION_COOKIE_AGE / 3600} hours")

# Test JWT settings
>>> from rest_framework_simplejwt.settings import api_settings
>>> print(f"Access token lifetime: {api_settings.ACCESS_TOKEN_LIFETIME}")
```

## Troubleshooting

### Common Issues
1. **Sessions not persisting**: Check SESSION_EXPIRE_AT_BROWSER_CLOSE
2. **Frequent logouts**: Verify SESSION_SAVE_EVERY_REQUEST is True
3. **Token errors**: Check JWT settings and SECRET_KEY

### Debug Commands
```bash
# Check current sessions
python manage.py shell
>>> from django.contrib.sessions.models import Session
>>> Session.objects.count()

# Inspect session data
>>> session = Session.objects.first()
>>> session.get_decoded()
```

---

**Note**: These settings balance user convenience with security. Monitor usage patterns and adjust if needed.
