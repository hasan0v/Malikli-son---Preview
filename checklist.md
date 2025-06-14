Phase 0: Foundation & Setup (Both Frontend & Backend)
Goal: Establish project structures, version control, and initial configurations.
Checklist:
[x] Version Control:
[x] Create a new Git repository (e.g., on GitHub, GitLab).
[x] Initialize Git in both frontend and backend project roots (consider a monorepo structure or separate repos).
[x] Environment Variables:
[x] Plan for .env files for sensitive data (API keys, DB URLs, secret keys). Create .env.example files.
[x] Backend (DRF) Project Setup:
[x] Create a Python virtual environment (python -m venv venv).
[x] Activate the virtual environment.
[x] Install Django: pip install django.
[x] Start a new Django project: django-admin startproject backend . (or your preferred name).
[x] Install DRF & DB connector: pip install djangorestframework psycopg2-binary dj-database-url python-dotenv.
[x] Configure settings.py:
[x] Add rest_framework to INSTALLED_APPS.
[x] Set up Supabase database connection using dj_database_url and environment variables (from Supabase: Project Settings > Database > Connection string > URI).
[x] Configure SECRET_KEY from environment variable.
[x] Set DEBUG mode based on environment.
[x] Run initial migrations: python manage.py migrate.
[x] Create a Django superuser: python manage.py createsuperuser.

[x] Frontend (Next.js) Project Setup:
[x] Install Node.js and npm/yarn if not already present.
[x] Create a new Next.js app: npx create-next-app@latest frontend-app --typescript (or JavaScript).
[x] cd frontend-app.
[x] Install Tailwind CSS: Follow official Next.js + Tailwind CSS guide.
[x] Install Redux Toolkit & React-Redux: npm install @reduxjs/toolkit react-redux.
[x] Install Axios (for API calls): npm install axios.
[ ] Set up basic project structure (e.g., components, pages, store, services, hooks, styles).
[ ] Configure environment variables for backend API URL (NEXT_PUBLIC_API_URL).
[ ] Communication:
[ ] Decide on API versioning strategy (e.g., /api/v1/).
[ ] Configure CORS on DRF (django-cors-headers) to allow requests from your Next.js development and production URLs.
pip install django-cors-headers
Add corsheaders to INSTALLED_APPS.
Add corsheaders.middleware.CorsMiddleware to MIDDLEWARE.
Configure CORS_ALLOWED_ORIGINS or CORS_ALLOW_ALL_ORIGINS = True (for development).
