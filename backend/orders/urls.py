# orders/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShippingMethodViewSet, OrderViewSet, CreateOrderView, CreateDirectOrderView, PaymentCallbackView, AdminOrderViewSet

router = DefaultRouter()
router.register(r'shipping-methods', ShippingMethodViewSet, basename='shipping-method')
router.register(r'orders', OrderViewSet, basename='order') # For listing/retrieving user's orders

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'orders', AdminOrderViewSet, basename='admin-order')

urlpatterns = [
    path('orders/create/', CreateOrderView.as_view(), name='create-order'),
    path('orders/create-direct/', CreateDirectOrderView.as_view(), name='create-direct-order'),
    path('orders/payment-callback/', PaymentCallbackView.as_view(), name='payment-callback'),
    # path('webhooks/stripe/', StripeWebhookView.as_view(), name='stripe-webhook'), # Example
    path('admin/', include(admin_router.urls)), # Admin endpoints
    path('', include(router.urls)), # Includes shipping-methods and orders list/detail
]