# orders/serializers.py
from rest_framework import serializers
from django.db import transaction, models
from .models import ShippingMethod, Order, OrderItem, Payment
from users.models import Address
from users.serializers import AddressSerializer  # For address details
from carts.models import Cart  # To create order from cart
from drops.models import DropProduct  # For stock update
from products.models import Product, ProductVariant  # For direct order creation

class ShippingMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingMethod
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    # Add detailed product information
    product_id = serializers.SerializerMethodField()
    product_name = serializers.CharField(source='product_name_snapshot', read_only=True)
    product_image = serializers.SerializerMethodField()
    product_slug = serializers.SerializerMethodField()
    variant_id = serializers.SerializerMethodField()
    variant_name = serializers.CharField(source='variant_name_snapshot', read_only=True)
    color = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()
    price = serializers.DecimalField(source='price_per_unit', max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product_id', 'variant_id', 'product_name', 'variant_name',
            'product_image', 'product_slug', 'color', 'size', 'quantity', 
            'price', 'subtotal', 'sku_snapshot'
        ]

    def get_product_id(self, obj):
        """Get product ID from drop_product or direct fields"""
        try:
            if obj.drop_product and obj.drop_product.product:
                return obj.drop_product.product.id
            # For direct orders, return the stored product_id
            return obj.product_id
        except:
            return None

    def get_product_slug(self, obj):
        """Get product slug from drop_product or direct fields"""
        try:
            if obj.drop_product and obj.drop_product.product:
                return obj.drop_product.product.slug
            # For direct orders, return the stored product_slug
            return obj.product_slug
        except:
            return None

    def get_variant_id(self, obj):
        """Get variant ID from drop_product or direct fields"""
        try:
            if obj.drop_product and obj.drop_product.variant:
                return obj.drop_product.variant.id
            # For direct orders, return the stored product_variant_id
            return obj.product_variant_id
        except:
            return None

    def get_product_image(self, obj):
        """Get the primary product image or variant-specific image"""
        try:
            # If we have drop_product, use it
            if obj.drop_product:
                # First try to get variant-specific image if it exists
                if obj.drop_product.variant and hasattr(obj.drop_product.variant, 'image') and obj.drop_product.variant.image:
                    return obj.drop_product.variant.image.url
                
                # Fallback to product's primary image
                if obj.drop_product.product and obj.drop_product.product.images.exists():
                    primary_image = obj.drop_product.product.images.filter(is_primary=True).first()
                    if primary_image:
                        return primary_image.image.url
                    # If no primary image, get the first available image
                    first_image = obj.drop_product.product.images.first()
                    if first_image:
                        return first_image.image.url
            
            # For direct orders, return the stored product_image_url
            if obj.product_image_url:
                return obj.product_image_url
                
            # If no image available, return None (will show placeholder)            return None
        except:
            return None

    def get_color(self, obj):
        """Extract color from variant or direct fields"""
        try:
            if obj.drop_product and obj.drop_product.variant:
                # Assuming variant has color information
                if hasattr(obj.drop_product.variant, 'color'):
                    return obj.drop_product.variant.color
                # If color is stored as part of variant name
                variant_name = obj.variant_name_snapshot or ''
                # Try to extract color from variant name (customize based on your naming convention)
                # Example: "Red - L" or "Color: Red, Size: L"
                if 'Color:' in variant_name:
                    parts = variant_name.split('Color:')[1].split(',')[0].strip()
                    return parts
                elif ' - ' in variant_name:
                    # Assuming format like "Red - L"
                    return variant_name.split(' - ')[0].strip()
            
            # For direct orders, return the stored color
            if obj.color:
                return obj.color
                
            return None
        except:
            return None

    def get_size(self, obj):
        """Extract size from variant or direct fields"""
        try:
            if obj.drop_product and obj.drop_product.variant:
                # Assuming variant has size information
                if hasattr(obj.drop_product.variant, 'size'):
                    return obj.drop_product.variant.size
                # If size is stored as part of variant name
                variant_name = obj.variant_name_snapshot or ''
                # Try to extract size from variant name
                if 'Size:' in variant_name:
                    parts = variant_name.split('Size:')[1].split(',')[0].strip()
                    return parts
                elif ' - ' in variant_name and len(variant_name.split(' - ')) > 1:
                    # Assuming format like "Red - L"
                    return variant_name.split(' - ')[1].strip()
            
            # For direct orders, return the stored size
            if obj.size:
                return obj.size
                
            return None
        except:
            return None

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ['order']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    payments = PaymentSerializer(many=True, read_only=True)
    shipping_address_details = AddressSerializer(source='shipping_address', read_only=True)
    billing_address_details = AddressSerializer(source='billing_address', read_only=True)
    shipping_method_details = ShippingMethodSerializer(source='shipping_method', read_only=True)
    
    # User details
    user_username = serializers.CharField(source='user.username', read_only=True, allow_null=True)
    user_first_name = serializers.CharField(source='user.first_name', read_only=True, allow_null=True)
    user_last_name = serializers.CharField(source='user.last_name', read_only=True, allow_null=True)
    user_email = serializers.CharField(source='user.email', read_only=True, allow_null=True)
    user_phone = serializers.CharField(source='user.phone_number', read_only=True, allow_null=True)
    
    order_status_display = serializers.CharField(source='get_order_status_display', read_only=True)
    payment_status_display = serializers.CharField(source='get_payment_status_display', read_only=True)
    class Meta:
        model = Order
        fields = [
            'order_id', 'order_number', 'user', 'user_username', 'user_first_name', 'user_last_name', 'user_email', 'user_phone', 'email_for_guest',
            'shipping_address', 'shipping_address_details',
            'billing_address', 'billing_address_details',
            'shipping_method', 'shipping_method_details', 'shipping_cost',
            'subtotal_amount', 'discount_amount', 'tax_amount', 'total_amount',
            'order_status', 'order_status_display',
            'payment_status', 'payment_status_display',
            'customer_notes', 'tracking_number', 'shipped_at', 'delivered_at',
            'items', 'payments', 'created_at', 'updated_at'
        ]
        read_only_fields = (
            'order_number', 'user', 'subtotal_amount', 'total_amount',
            'order_status', 'payment_status', 'items', 'payments',
            'user_username', 'user_first_name', 'user_last_name', 'user_email', 'user_phone',
            'shipping_address_details', 'billing_address_details',
            'shipping_method_details', 'order_status_display', 'payment_status_display'
        )

# Serializer for creating an order
class OrderCreateSerializer(serializers.Serializer):
    cart_id = serializers.UUIDField(write_only=True)
    shipping_address_id = serializers.IntegerField(write_only=True, required=True)
    billing_address_id = serializers.IntegerField(write_only=True, required=False, allow_null=True) # Optional
    shipping_method_id = serializers.IntegerField(write_only=True, required=True)
    customer_notes = serializers.CharField(required=False, allow_blank=True, write_only=True)
    email_for_guest = serializers.EmailField(required=False, allow_null=True, write_only=True) # If guest user

    # Payment related fields would go here - e.g., payment_method_token from Stripe
    # For now, we'll assume payment is handled in a separate step or confirmed via webhook
    # payment_intent_id = serializers.CharField(write_only=True, required=False) # Example

    def validate_cart_id(self, value):
        try:
            cart = Cart.objects.get(cart_id=value)
            if not cart.items.exists():
                raise serializers.ValidationError("Cannot create an order from an empty cart.")
            # Check if user owns the cart or if it's a guest cart being claimed
            request = self.context.get('request')
            if request and request.user.is_authenticated:
                if cart.user and cart.user != request.user:
                    raise serializers.ValidationError("Cart does not belong to the authenticated user.")
                if cart.user is None: # Guest cart being claimed by logged-in user
                    pass # Allow this, will associate with user
            elif cart.user: # Guest trying to use a user's cart
                 raise serializers.ValidationError("Invalid cart for guest user.")

        except Cart.DoesNotExist:
            raise serializers.ValidationError("Cart not found.")
        return value

    def validate_shipping_address_id(self, value):
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        try:
            address = Address.objects.get(id=value)
            if user and address.user != user: # If user is logged in, check they own the address
                raise serializers.ValidationError("Shipping address does not belong to the authenticated user.")
        except Address.DoesNotExist:
            raise serializers.ValidationError("Shipping address not found.")
        return value

    def validate_billing_address_id(self, value):
        if value is None: return None # Optional
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        try:
            address = Address.objects.get(id=value)
            if user and address.user != user:
                raise serializers.ValidationError("Billing address does not belong to the authenticated user.")
        except Address.DoesNotExist:
            raise serializers.ValidationError("Billing address not found.")
        return value

    def validate_shipping_method_id(self, value):
        try:
            ShippingMethod.objects.get(id=value, is_active=True)
        except ShippingMethod.DoesNotExist:
            raise serializers.ValidationError("Active shipping method not found.")
        return value

    def create(self, validated_data):
        cart = Cart.objects.get(cart_id=validated_data['cart_id'])
        shipping_address = Address.objects.get(id=validated_data['shipping_address_id'])
        billing_address = Address.objects.get(id=validated_data['billing_address_id']) if validated_data.get('billing_address_id') else shipping_address
        shipping_method = ShippingMethod.objects.get(id=validated_data['shipping_method_id'])
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None

        # Use a database transaction to ensure atomicity for order creation and stock update
        with transaction.atomic():
            # 1. Calculate totals
            subtotal_amount = cart.subtotal
            # TODO: Add logic for discounts, taxes
            discount_amount = 0.00
            tax_amount = 0.00 # Example: (subtotal_amount - discount_amount) * 0.10
            total_amount = subtotal_amount - discount_amount + tax_amount + shipping_method.cost

            # 2. Create the Order
            order = Order.objects.create(
                user=user if user else None,
                email_for_guest=validated_data.get('email_for_guest') if not user else None,
                shipping_address=shipping_address,
                billing_address=billing_address,
                shipping_method=shipping_method,
                shipping_cost=shipping_method.cost,
                subtotal_amount=subtotal_amount,
                discount_amount=discount_amount,
                tax_amount=tax_amount,
                total_amount=total_amount,
                customer_notes=validated_data.get('customer_notes', ''),
                # order_status and payment_status default to 'pending_payment' / 'pending'
            )

            # 3. Create OrderItems and update stock
            for cart_item in cart.items.all():
                drop_product = cart_item.drop_product
                if cart_item.quantity > drop_product.current_stock_quantity:
                    raise serializers.ValidationError(
                        f"Not enough stock for {drop_product.product.name}. "
                        f"Available: {drop_product.current_stock_quantity}, Requested: {cart_item.quantity}"
                    )

                OrderItem.objects.create(
                    order=order,
                    drop_product=drop_product,
                    product_name_snapshot=drop_product.product.name,
                    variant_name_snapshot=str(drop_product.variant) if drop_product.variant else None,
                    sku_snapshot=f"{drop_product.product.sku_prefix or ''}{drop_product.variant.sku_suffix if drop_product.variant else ''}",
                    quantity=cart_item.quantity,
                    price_per_unit=drop_product.drop_price, # Price from DropProduct
                    subtotal=cart_item.total_price
                )

                # Update stock (critical part)
                # Using F() expressions to prevent race conditions as much as possible with DB-level update
                DropProduct.objects.filter(id=drop_product.id).update(
                    current_stock_quantity=models.F('current_stock_quantity') - cart_item.quantity
                )
                # Refresh to get the updated value if needed immediately, or rely on DB to handle it
                # drop_product.refresh_from_db(fields=['current_stock_quantity'])


            # 4. Clear the cart (or mark as processed)
            cart.items.all().delete()
            # Optionally delete the cart itself if it's a one-time use cart for checkout
            # Or keep it if user might want to re-order or see past cart contents (though order history is better for that)
            # cart.delete() # If cart is a guest cart, and this user is now creating an order

            # 5. (Placeholder) Initiate payment processing / Create Payment record
            # payment_intent_id = validated_data.get('payment_intent_id')
            # if payment_intent_id:
            #     Payment.objects.create(
            #         order=order,
            #         gateway_transaction_id=payment_intent_id, # Example for Stripe
            #         amount=order.total_amount,
            #         payment_method_type='stripe_pi',
            #         status='pending' # Will be updated by webhook
            #     )
            # Else, order remains 'pending_payment'

        return order

# New serializer for direct single-item order creation
class DirectOrderCreateSerializer(serializers.Serializer):
    # Product information
    product_id = serializers.IntegerField(write_only=True)
    product_variant_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    quantity = serializers.IntegerField(write_only=True, min_value=1, default=1)
    
    # Order information
    shipping_address_id = serializers.IntegerField(write_only=True, required=True)
    billing_address_id = serializers.IntegerField(write_only=True, required=False, allow_null=True)
    shipping_method_id = serializers.IntegerField(write_only=True, required=True)
    customer_notes = serializers.CharField(required=False, allow_blank=True, write_only=True)
    
    # Optional variant details
    color = serializers.CharField(required=False, allow_blank=True, write_only=True)
    color_code = serializers.CharField(required=False, allow_blank=True, write_only=True)
    size = serializers.CharField(required=False, allow_blank=True, write_only=True)

    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value, is_archived=False)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product not found or is archived.")
        return value

    def validate_product_variant_id(self, value):
        if value is None:
            return None
        try:
            ProductVariant.objects.get(id=value, is_active=True)
        except ProductVariant.DoesNotExist:
            raise serializers.ValidationError("Product variant not found or is inactive.")
        return value

    def validate_shipping_address_id(self, value):
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        try:
            address = Address.objects.get(id=value)
            if user and address.user != user:
                raise serializers.ValidationError("Shipping address does not belong to the authenticated user.")
        except Address.DoesNotExist:
            raise serializers.ValidationError("Shipping address not found.")
        return value

    def validate_billing_address_id(self, value):
        if value is None:
            return None
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        try:
            address = Address.objects.get(id=value)
            if user and address.user != user:
                raise serializers.ValidationError("Billing address does not belong to the authenticated user.")
        except Address.DoesNotExist:
            raise serializers.ValidationError("Billing address not found.")
        return value

    def validate_shipping_method_id(self, value):
        try:
            ShippingMethod.objects.get(id=value, is_active=True)
        except ShippingMethod.DoesNotExist:
            raise serializers.ValidationError("Active shipping method not found.")
        return value

    def validate(self, attrs):
        # Validate that variant belongs to the product if specified
        product_id = attrs.get('product_id')
        variant_id = attrs.get('product_variant_id')
        
        if variant_id:
            try:
                variant = ProductVariant.objects.get(id=variant_id)
                if variant.product_id != product_id:
                    raise serializers.ValidationError("Product variant does not belong to the specified product.")
            except ProductVariant.DoesNotExist:
                pass  # Already validated in validate_product_variant_id
        
        return attrs

    def create(self, validated_data):
        product = Product.objects.get(id=validated_data['product_id'])
        variant = None
        if validated_data.get('product_variant_id'):
            variant = ProductVariant.objects.get(id=validated_data['product_variant_id'])
        
        shipping_address = Address.objects.get(id=validated_data['shipping_address_id'])
        billing_address = Address.objects.get(id=validated_data['billing_address_id']) if validated_data.get('billing_address_id') else shipping_address
        shipping_method = ShippingMethod.objects.get(id=validated_data['shipping_method_id'])
        request = self.context.get('request')
        user = request.user if request and request.user.is_authenticated else None
        quantity = validated_data.get('quantity', 1)

        # Calculate price
        base_price = float(product.base_price)
        additional_price = float(variant.additional_price) if variant else 0
        unit_price = base_price + additional_price
        
        with transaction.atomic():
            # Calculate totals
            subtotal_amount = unit_price * quantity
            discount_amount = 0.00
            tax_amount = 0.00  # Add tax logic if needed
            total_amount = subtotal_amount - discount_amount + tax_amount + float(shipping_method.cost)

            # Create the Order
            order = Order.objects.create(
                user=user if user else None,
                shipping_address=shipping_address,
                billing_address=billing_address,
                shipping_method=shipping_method,
                shipping_cost=shipping_method.cost,
                subtotal_amount=subtotal_amount,
                discount_amount=discount_amount,
                tax_amount=tax_amount,
                total_amount=total_amount,
                customer_notes=validated_data.get('customer_notes', ''),
                # order_status and payment_status default to 'pending'
            )

            # Create OrderItem
            # For direct orders, we'll create a dummy DropProduct or handle it differently
            # For now, let's try to find an existing DropProduct or create the order item directly
            drop_product = None
            try:
                # Try to find a DropProduct for this product/variant combination
                if variant:
                    drop_product = DropProduct.objects.filter(
                        product=product, 
                        variant=variant,
                        drop__status='active'
                    ).first()
                else:
                    drop_product = DropProduct.objects.filter(
                        product=product, 
                        variant__isnull=True,
                        drop__status='active'
                    ).first()
            except:
                pass

            if drop_product:
                # Check stock
                if quantity > drop_product.current_stock_quantity:
                    raise serializers.ValidationError(
                        f"Not enough stock for {product.name}. "
                        f"Available: {drop_product.current_stock_quantity}, Requested: {quantity}"
                    )

                OrderItem.objects.create(
                    order=order,
                    drop_product=drop_product,
                    product_name_snapshot=product.name,
                    variant_name_snapshot=str(variant) if variant else None,
                    sku_snapshot=f"{product.sku_prefix or ''}{variant.sku_suffix if variant else ''}",
                    quantity=quantity,
                    price_per_unit=drop_product.drop_price,
                    subtotal=quantity * float(drop_product.drop_price)                )
                
                # Update stock
                DropProduct.objects.filter(id=drop_product.id).update(
                    current_stock_quantity=models.F('current_stock_quantity') - quantity
                )
            else:
                # Create order item for regular product (not in a drop)
                # Get product image URL
                product_image_url = None
                if variant and hasattr(variant, 'image') and variant.image:
                    product_image_url = variant.image.url
                elif product.images.exists():
                    primary_image = product.images.filter(is_primary=True).first()
                    if primary_image:
                        product_image_url = primary_image.image.url
                    else:
                        first_image = product.images.first()
                        if first_image:
                            product_image_url = first_image.image.url

                OrderItem.objects.create(
                    order=order,
                    drop_product=None,  # No drop product for regular orders
                    # Populate direct order fields
                    product_id=product.id,
                    product_variant_id=variant.id if variant else None,
                    product_slug=product.slug,
                    product_image_url=product_image_url,
                    color=validated_data.get('color'),
                    size=validated_data.get('size'),
                    # Snapshot fields
                    product_name_snapshot=product.name,
                    variant_name_snapshot=str(variant) if variant else None,
                    sku_snapshot=f"{product.sku_prefix or ''}{variant.sku_suffix if variant else ''}",
                    quantity=quantity,
                    price_per_unit=unit_price,
                    subtotal=quantity * unit_price
                )

        return order