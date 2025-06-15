# Custom middleware for performance optimizations
from django.utils.cache import add_never_cache_headers, patch_cache_control
from django.utils.deprecation import MiddlewareMixin
import time

class CacheHeadersMiddleware(MiddlewareMixin):
    """
    Add appropriate cache headers for API responses
    """
    
    def process_response(self, request, response):
        # Add cache headers for API endpoints
        if request.path.startswith('/api/'):
            if request.method == 'GET':
                # Cache GET requests for 5 minutes
                patch_cache_control(response, public=True, max_age=300)
                response['Vary'] = 'Accept-Encoding, Authorization'
            else:
                # Don't cache non-GET requests
                add_never_cache_headers(response)
        
        return response

class ResponseTimeMiddleware(MiddlewareMixin):
    """
    Add response time header for performance monitoring
    """
    
    def process_request(self, request):
        request.start_time = time.time()
    
    def process_response(self, request, response):
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            response['X-Response-Time'] = f'{duration:.3f}s'
        return response
