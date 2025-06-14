# products/serializers.py
from rest_framework import serializers
from .models import Category, Product, ProductVariant, ProductImage, Size, Color

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name', 'display_order']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name', 'hex_code', 'display_order']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'display_order', 'is_primary']

class ProductVariantSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    size_info = SizeSerializer(source='size', read_only=True)
    color_info = ColorSerializer(source='color', read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'product', 'sku_suffix', 'name_suffix', 
            'size', 'size_info', 'color', 'color_info', 'attributes',
            'additional_price', 'image', 'is_active', 'images'
        ]

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'sku_prefix', 'description', 'category', 'category_name',
            'base_price', 'buy_now_link', 'tags', 'is_archived', 'variants', 'images',
            'created_at', 'updated_at'
        ]
        # Make slug read_only as it's auto-generated, or allow setting it but ensure validation
        read_only_fields = ('slug',)


class ProductVariantWithProductSerializer(serializers.ModelSerializer):
    """
    ProductVariant serializer that includes nested product details for cart items
    """
    images = ProductImageSerializer(many=True, read_only=True)
    size_info = SizeSerializer(source='size', read_only=True)
    color_info = ColorSerializer(source='color', read_only=True)
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = ProductVariant
        fields = [
            'id', 'product', 'product_details', 'sku_suffix', 'name_suffix', 
            'size', 'size_info', 'color', 'color_info', 'attributes',
            'additional_price', 'image', 'is_active', 'images'
        ]


class CategorySerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True) # Optional: if you want to nest products under category list/detail
    subcategories = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Category
        fields = [
            'id', 'name', 'slug', 'description', 'parent_category',
            'image', 'is_active', 'subcategories' # 'products'
        ]
        read_only_fields = ('slug',)

    def get_subcategories(self, obj):
        # Recursive serialization for subcategories
        return CategorySerializer(obj.subcategories.filter(is_active=True), many=True, context=self.context).data


# For Admin/Write operations, you might want separate, simpler serializers
# e.g., ProductCreateUpdateSerializer without read_only nested variants/images
# and then handle nested creation/updates in the view or serializer's create/update methods.