# orders/views.py
import uuid
from django.db import models
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import viewsets, generics, permissions, status, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ShippingMethod, Order, Payment
from .serializers import (
    ShippingMethodSerializer, OrderSerializer, OrderCreateSerializer,
    PaymentSerializer, DirectOrderCreateSerializer
)
from drops.models import DropProduct
from rest_framework.views import APIView

class ShippingMethodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShippingMethod.objects.filter(is_active=True)
    serializer_class = ShippingMethodSerializer
    permission_classes = [permissions.AllowAny] # Publicly viewable

class OrderViewSet(mixins.ListModelMixin,
                   mixins.RetrieveModelMixin,
                   # mixins.CreateModelMixin, # Handled by dedicated CreateOrderView
                   viewsets.GenericViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated] # Users can only see their own orders
    lookup_field = 'order_id' # Use UUID for lookup

    def get_queryset(self):
        # Users can only see their own orders. Admins can see all (if IsAdminUser perm added).
        user = self.request.user
        if user.is_staff: # Or use IsAdminUser permission class
            return Order.objects.all().prefetch_related(
                'items__drop_product__product__images', 'items__drop_product__variant',
                'payments', 'shipping_address', 'billing_address', 'shipping_method'
            )
        return Order.objects.filter(user=user).prefetch_related(
            'items__drop_product__product__images', 'items__drop_product__variant',
            'payments', 'shipping_address', 'billing_address', 'shipping_method'
        )

    @action(detail=True, methods=['post'])
    def cancel(self, request, order_id=None):
        """Cancel an order if it's in a cancellable state"""
        order = self.get_object()
        
        # Check if order can be cancelled
        if order.order_status not in ['pending_payment', 'processing']:
            return Response(
                {'detail': 'Order cannot be cancelled at this stage.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update order status
        order.order_status = 'cancelled'
        order.payment_status = 'refunded' if order.payment_status == 'paid' else order.payment_status
        order.save()
        
        # TODO: Restore stock quantities
        for item in order.items.all():
            DropProduct.objects.filter(id=item.drop_product.id).update(
                current_stock_quantity=models.F('current_stock_quantity') + item.quantity
            )
        
        # TODO: Process refund if payment was made
        
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def reorder(self, request, order_id=None):
        """Add all items from this order back to the user's cart"""
        order = self.get_object()
        
        from carts.models import Cart, CartItem
        
        # Get or create user's cart
        cart, created = Cart.objects.get_or_create(
            user=request.user,
            defaults={'cart_id': uuid.uuid4()}
        )
        
        items_added = 0
        items_unavailable = []
        
        for order_item in order.items.all():
            drop_product = order_item.drop_product
            
            # Check if product is still available
            if drop_product.current_stock_quantity < order_item.quantity:
                items_unavailable.append({
                    'name': order_item.product_name_snapshot,
                    'requested': order_item.quantity,
                    'available': drop_product.current_stock_quantity
                })
                continue
            
            # Add to cart or update existing cart item
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                drop_product=drop_product,
                defaults={'quantity': order_item.quantity}
            )
            
            if not created:
                # Update quantity if item already in cart
                new_quantity = cart_item.quantity + order_item.quantity
                if new_quantity <= drop_product.current_stock_quantity:
                    cart_item.quantity = new_quantity
                    cart_item.save()
                else:
                    items_unavailable.append({
                        'name': order_item.product_name_snapshot,
                        'requested': order_item.quantity,
                        'available': max(0, drop_product.current_stock_quantity - cart_item.quantity)
                    })
                    continue
            
            items_added += 1
        
        message = f'{items_added} items added to cart'
        if items_unavailable:
            message += f'. {len(items_unavailable)} items unavailable or insufficient stock.'
        
        return Response({
            'success': True,
            'message': message,
            'items_added': items_added,
            'items_unavailable': items_unavailable,
            'cart_id': str(cart.cart_id)
        })

class CreateOrderView(generics.CreateAPIView):
    serializer_class = OrderCreateSerializer
    permission_classes = [permissions.AllowAny] # Allow guests or authenticated users
                                               # Permissions on cart/address ownership handled in serializer

    def perform_create(self, serializer):
        # Serializer's create method handles the actual object creation and logic
        order = serializer.save()
        # Optionally, trigger email notifications, etc. here or with signals
        # The response will be the created order, using OrderSerializer
        # Need to pass the created order instance to OrderSerializer
        # This is tricky because the create method of this view expects to return the output of serializer.save()
        # One way is to override create method of this view entirely.

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        order = serializer.save() # This calls OrderCreateSerializer.create()
        # Now serialize the created order for the response using OrderSerializer
        response_serializer = OrderSerializer(order, context={'request': request})
        headers = self.get_success_headers(response_serializer.data)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CreateDirectOrderView(generics.CreateAPIView):
    """
    Create an order directly from product information without requiring a cart.
    Used for single-item purchases like Buy Now functionality.
    """
    serializer_class = DirectOrderCreateSerializer
    permission_classes = [permissions.AllowAny] # Allow guests or authenticated users

    def create(self, request, *args, **kwargs):
        import logging
        logger = logging.getLogger(__name__)
        
        logger.info(f"=== CREATE DIRECT ORDER REQUEST ===")
        logger.info(f"Request data: {request.data}")
        logger.info(f"User authenticated: {request.user.is_authenticated}")
        logger.info(f"User: {request.user}")
        
        serializer = self.get_serializer(data=request.data, context={'request': request})
        
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            logger.error(f"=== VALIDATION ERROR ===")
            logger.error(f"Validation errors: {serializer.errors}")
            logger.error(f"Exception: {str(e)}")
            return Response(
                {'error': 'Validation failed', 'details': serializer.errors}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            order = serializer.save() # This calls DirectOrderCreateSerializer.create()
            logger.info(f"=== ORDER CREATED SUCCESSFULLY ===")
            logger.info(f"Order ID: {order.order_id}")
            
            # Serialize the created order for the response using OrderSerializer
            response_serializer = OrderSerializer(order, context={'request': request})
            headers = self.get_success_headers(response_serializer.data)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            logger.error(f"=== ORDER CREATION ERROR ===")
            logger.error(f"Exception: {str(e)}")
            logger.error(f"Exception type: {type(e)}")
            import traceback
            logger.error(f"Traceback: {traceback.format_exc()}")
            return Response(
                {'error': 'Order creation failed', 'details': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@method_decorator(csrf_exempt, name='dispatch')
class PaymentCallbackView(APIView):
    """
    Handle payment callbacks from external banking systems.
    This endpoint should NOT require authentication since it's called by external systems.
    CSRF is disabled since this is called by external systems.
    """
    permission_classes = [permissions.AllowAny]  # Allow unauthenticated access
    def post(self, request):
        """Process payment callback"""
        import logging
        logger = logging.getLogger(__name__)
        
        try:
            logger.info(f"Payment callback received: {request.data}")
            
            status_param = request.data.get('status')
            uid = request.data.get('uid')
            token = request.data.get('token')
            
            if not uid:
                logger.error("Missing UID parameter in payment callback")
                return Response(
                    {'success': False, 'message': 'Missing required parameter: uid'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find the order by UID
            try:
                order = Order.objects.get(order_id=uid)
            except Order.DoesNotExist:                return Response(
                    {'success': False, 'message': 'Order not found'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Update order status based on payment result
            if status == 'success':
                order.order_status = 'processing'
                order.payment_status = 'paid'
                
                # Create a payment record
                Payment.objects.create(
                    order=order,
                    payment_method_type='bank_transfer',
                    gateway_transaction_id=token or f'bank_{uid}',
                    amount=order.total_amount,
                    status='succeeded'
                )
                
                message = 'Payment successful, order confirmed'
            
            elif status == 'failed':
                order.order_status = 'failed'
                order.payment_status = 'failed'
                
                # Restore stock quantities
                for item in order.items.all():
                    DropProduct.objects.filter(id=item.drop_product.id).update(
                        current_stock_quantity=models.F('current_stock_quantity') + item.quantity
                    )
                
                # Create a failed payment record
                Payment.objects.create(
                    order=order,
                    payment_method_type='bank_transfer',
                    gateway_transaction_id=token or f'bank_{uid}',
                    amount=order.total_amount,
                    status='failed'
                )
                
                message = 'Payment failed, order cancelled'
            
            else:                return Response(
                    {'success': False, 'message': 'Invalid status parameter'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            order.save()
            
            return Response({
                'success': True,
                'orderId': order.order_id,
                'order_number': order.order_number,
                'status': order.order_status,
                'payment_status': order.payment_status,
                'message': message
            })
            
        except Exception as e:            return Response(
                {'success': False, 'message': f'Internal server error: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )