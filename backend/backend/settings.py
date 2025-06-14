import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load .env file from the BASE_DIR (where manage.py typically is)
# Ensure .env is in the same directory as manage.py or adjust the path.
dotenv_path = BASE_DIR / '.env'
load_dotenv(dotenv_path=dotenv_path)

print(f"Attempting to load .env from: {dotenv_path}")
if os.path.exists(dotenv_path):
    print(".env file found and loaded by python-dotenv.")
else:
    print("WARNING: .env file NOT FOUND at the expected location.")

# Quick Glimpse of loaded env vars for R2 (for debugging, can remove later)
# print(f"SETTINGS.PY - AWS_ACCESS_KEY_ID: {os.getenv('AWS_ACCESS_KEY_ID')[:5] if os.getenv('AWS_ACCESS_KEY_ID') else 'Not Set'}")
# print(f"SETTINGS.PY - AWS_STORAGE_BUCKET_NAME: {os.getenv('AWS_STORAGE_BUCKET_NAME')}")
# print(f"SETTINGS.PY - AWS_S3_ENDPOINT_URL: {os.getenv('AWS_S3_ENDPOINT_URL')}")
# print(f"SETTINGS.PY - AWS_S3_CUSTOM_DOMAIN: {os.getenv('AWS_S3_CUSTOM_DOMAIN')}")
# print(f"SETTINGS.PY - AWS_LOCATION: {os.getenv('AWS_LOCATION')}")


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-fallback-key-for-dev-only')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv('DEBUG', 'False') == 'True'

ALLOWED_HOSTS_STRING = os.getenv('ALLOWED_HOSTS', '127.0.0.1,localhost')
ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_STRING.split(',') if host.strip()]


# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'storages', # For Cloudflare R2 / S3 storage

    # Your apps
    'users.apps.UsersConfig',
    'products.apps.ProductsConfig',
    'drops.apps.DropsConfig', 
    'carts.apps.CartsConfig',
    'orders.apps.OrdersConfig',
    'notifications_app.apps.NotificationsAppConfig',
    # 'bootstrap5', # For Django Bootstrap 5 integration
    # ... other apps (drops, carts, orders, notifications_app)
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', # Should be high, but after SecurityMiddleware if it has implications
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASE_URL_FROM_ENV = os.getenv('DATABASE_URL')
if DATABASE_URL_FROM_ENV:
    DATABASES = {
        'default': dj_database_url.config(default=DATABASE_URL_FROM_ENV, conn_max_age=600, ssl_require=False)
        # For Supabase, if your connection string includes `sslmode=require`, dj_database_url handles it.
        # If not, you might need to add `ssl_require=True` or other SSL options.
    }
else:
    print("WARNING: DATABASE_URL not found in environment. Falling back to SQLite.")
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/
LANGUAGE_CODE = 'ru-RU'  # Change to your desired language code
LANGUAGES = [
    ('ru', 'Russian'),
    ('en', 'English'),
]
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images for Django Admin itself)
# https://docs.djangoproject.com/en/4.2/howto/static-files/
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles_collected' # For collectstatic in production


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom User Model
AUTH_USER_MODEL = 'users.User'


# Django REST Framework Settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# Simple JWT Settings - Extended for 72-hour login
from datetime import timedelta
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=72),  # 72 hours to match session duration
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),  # 30 days for refresh token
    'ROTATE_REFRESH_TOKENS': True,  # Generate new refresh token on each refresh
    'BLACKLIST_AFTER_ROTATION': True,  # Blacklist old refresh tokens
    'UPDATE_LAST_LOGIN': True,  # Update last_login field when tokens are refreshed
    
    # Token security settings
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,  # Use Django's SECRET_KEY
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    
    # Token format
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    
    # Token validation
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}


# CORS Settings
CORS_ALLOWED_ORIGINS_STRING = os.getenv('CORS_ALLOWED_ORIGINS', 'http://localhost:3000,http://127.0.0.1:3000')
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in CORS_ALLOWED_ORIGINS_STRING.split(',') if origin.strip()]
# CORS_ALLOW_ALL_ORIGINS = True # Use for extreme debugging, then narrow down
# CORS_ALLOW_CREDENTIALS = True # If you need to send cookies (e.g., for frontend sessions with backend)


# Cloudflare R2 / S3 Storage Settings
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_ENDPOINT_URL = os.getenv('AWS_S3_ENDPOINT_URL') # e.g., https://<ACCOUNT_ID>.r2.cloudflarestorage.com
AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME', 'auto')
AWS_S3_CUSTOM_DOMAIN = os.getenv('AWS_S3_CUSTOM_DOMAIN') # e.g., 'media.yourdomain.com'
AWS_LOCATION = os.getenv('AWS_LOCATION', '').strip('/') # Sub-directory in bucket, ensure no leading/trailing slashes if not empty

AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400', # Cache files for 1 day
    # 'ACL': 'public-read', # R2 generally ignores S3 ACLs; public access via custom domain/worker
}

AWS_S3_ADDRESSING_STYLE = 'virtual' # IMPORTANT for R2
AWS_S3_SIGNATURE_VERSION = 's3v4'   # IMPORTANT for R2
# AWS_S3_FILE_OVERWRITE = False # Set to True if you want to overwrite, False to add unique suffix
# AWS_DEFAULT_ACL = None # R2 doesn't really use S3 ACLs in the same way

# Default File Storage (for Media Files)
if AWS_ACCESS_KEY_ID and AWS_STORAGE_BUCKET_NAME and AWS_S3_ENDPOINT_URL:
    DEFAULT_FILE_STORAGE = 'products.storage.CloudflareR2Storage'
    print("INFO: Using CloudflareR2Storage for DEFAULT_FILE_STORAGE.")
else:
    DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    print("WARNING: R2/S3 credentials not fully set. Falling back to FileSystemStorage for media.")


# Media files (user-uploaded files)
# MEDIA_ROOT is the absolute filesystem path to the directory that will hold user-uploaded files
# when using FileSystemStorage. For S3Boto3Storage, it's not directly used for storing files
# but Django might still expect it to be defined.
MEDIA_ROOT = BASE_DIR / 'local_media_debug' # Or any other local path for fallback

# MEDIA_URL is the base URL from which media served from MEDIA_ROOT will be served.
if DEFAULT_FILE_STORAGE == 'products.storage.CloudflareR2Storage':
    if AWS_S3_CUSTOM_DOMAIN:
        _base_url = f'https://{AWS_S3_CUSTOM_DOMAIN}'
    else:
        # This URL may not be directly public for R2 without signed URLs or a worker.
        # It's better to have AWS_S3_CUSTOM_DOMAIN set.
        _base_url = f'{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}'

    if AWS_LOCATION:
        MEDIA_URL = f'{_base_url}/{AWS_LOCATION}/'
    else:
        MEDIA_URL = f'{_base_url}/'
    print(f"INFO: MEDIA_URL (R2/S3) configured to: {MEDIA_URL}")
else:
    MEDIA_URL = '/media/' # For local FileSystemStorage fallback
    print(f"INFO: MEDIA_URL (Local Fallback) configured to: {MEDIA_URL}")


# Ensure the local media debug directory exists if FileSystemStorage is used
if not os.path.exists(MEDIA_ROOT) and DEFAULT_FILE_STORAGE == 'django.core.files.storage.FileSystemStorage':
    try:
        os.makedirs(MEDIA_ROOT)
        print(f"Created local media directory for fallback: {MEDIA_ROOT}")
    except Exception as e:
        print(f"Error creating local media directory {MEDIA_ROOT}: {e}")

# Email Configuration - Resend Integration
EMAIL_BACKEND = os.getenv('EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')

# Resend SMTP Configuration
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.resend.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '587'))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True') == 'True'
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'False') == 'True'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'resend')  # Resend uses 'resend' as username
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')  # This will be your Resend API key
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', 'noreply@malikli.com')

# Resend API Configuration (for direct API usage if needed)
RESEND_API_KEY = os.getenv('RESEND_API_KEY', '')

# Email settings for better deliverability
EMAIL_TIMEOUT = 30
EMAIL_SSL_KEYFILE = None
EMAIL_SSL_CERTFILE = None

# Frontend URL for password reset links
FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://app.malikli1992.store')

# Email verification settings
EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS = 24
PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 1

# ============================================================================
# SESSION CONFIGURATION - 72 Hour Login Duration
# ============================================================================

# Session timeout settings (72 hours = 259200 seconds)
SESSION_COOKIE_AGE = 72 * 60 * 60  # 72 hours in seconds (259200)

# Extend session when user is active
SESSION_SAVE_EVERY_REQUEST = True

# Session security settings
SESSION_COOKIE_SECURE = not DEBUG  # Use secure cookies in production (HTTPS)
SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript access to session cookies
SESSION_COOKIE_SAMESITE = 'Lax'  # CSRF protection

# Optional: Make sessions persistent across browser restart
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Session engine (default is database, but you can use cache for better performance)
SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # or 'django.contrib.sessions.backends.cache'

# Optional: Session cleanup (remove expired sessions)
# You can run 'python manage.py clearsessions' periodically
SESSION_COOKIE_NAME = 'malikli_sessionid'