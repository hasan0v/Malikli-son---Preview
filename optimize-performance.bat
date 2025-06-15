@echo off
echo 🚀 Starting performance optimization for Malikli website...

REM Change to backend directory
cd backend

echo 📦 Installing required Python packages...
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo ❌ Failed to install Python packages
    pause
    exit /b %errorlevel%
)

echo 🗄️  Running database migrations with performance improvements...
python manage.py makemigrations
python manage.py migrate

if %errorlevel% neq 0 (
    echo ❌ Failed to run migrations
    pause
    exit /b %errorlevel%
)

echo 🧹 Cleaning up expired sessions...
python manage.py clearsessions

echo 📊 Collecting static files for production...
python manage.py collectstatic --noinput

echo 🔍 Running Django checks...
python manage.py check

if %errorlevel% neq 0 (
    echo ⚠️  Django checks found issues
)

echo ✅ Backend performance optimization completed!

REM Change to frontend directory
cd ../frontend

echo 📦 Installing frontend dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b %errorlevel%
)

echo 🏗️  Building optimized frontend bundle...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    pause
    exit /b %errorlevel%
)

echo ✅ Frontend optimization completed!

echo.
echo 🎉 Performance optimization completed successfully!
echo.
echo 📈 Performance improvements applied:
echo    • Database indexes added for faster queries
echo    • Caching middleware configured
echo    • API response caching enabled
echo    • Frontend bundle optimization
echo    • Image optimization settings
echo    • Request/response compression
echo.
echo 🔧 Additional recommendations:
echo    • Set up Redis for better caching (configure REDIS_URL environment variable)
echo    • Enable CDN for static files
echo    • Monitor database query performance
echo    • Consider using a reverse proxy like Nginx

pause
