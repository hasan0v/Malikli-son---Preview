from django.db import models
from django.utils.text import slugify
from django.contrib.postgres.fields import ArrayField  # PostgreSQL optimized field
from .storage import CloudflareR2Storage
from django.conf import settings

# Get the correct storage backend
def get_storage():
    if settings.DEFAULT_FILE_STORAGE == 'products.storage.CloudflareR2Storage':
        return CloudflareR2Storage()
    return None

# Add new models for Size and Color
class Size(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "Small", "Medium", "Large"
    display_order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['display_order', 'name']

class Color(models.Model):
    name = models.CharField(max_length=50, unique=True)  # e.g., "Red", "Blue", "Green"
    hex_code = models.CharField(max_length=7, blank=True, null=True)  # e.g., "#FF0000"
    display_order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['display_order', 'name']

# from users.models import User  # Uncomment if needed in future
def category_image_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/category_images/<category_slug>/<filename>
    return f'category_images/{instance.slug}/{filename}'


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    description = models.TextField(blank=True, null=True)
    parent_category = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='subcategories'
    )
    image = models.ImageField(
        upload_to=category_image_path, 
        blank=True, 
        null=True,
        storage=get_storage()
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

def product_image_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/product_images/<product_slug>/<filename>
    return f'product_images/{instance.slug}/{filename}'

class Product(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=270, unique=True, blank=True)
    sku_prefix = models.CharField(max_length=50, unique=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='products'
    )
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    # Add buyNowLink field for external payment links
    buy_now_link = models.URLField(max_length=500, blank=True, null=True, help_text="External payment link for Buy Now functionality")
    tags = ArrayField(models.CharField(max_length=50), blank=True, default=list)  # Changed from JSONField to ArrayField
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
            original_slug = self.slug
            counter = 1
            while Product.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    def create_variants_from_options(self, sizes=None, colors=None, additional_prices=None):
        """
        Create product variants from combinations of sizes and colors.
        
        Args:
            sizes: List of Size objects or IDs
            colors: List of Color objects or IDs
            additional_prices: Dictionary mapping (size_id, color_id) tuples to additional prices
        
        Example:
            product.create_variants_from_options(
                sizes=[1, 2, 3],  # Size IDs for S, M, L
                colors=[1, 2],    # Color IDs for Red, Blue
                additional_prices={
                    (1, 1): 0,    # Small, Red - no additional price
                    (2, 1): 5,    # Medium, Red - $5 additional
                    (3, 1): 10,   # Large, Red - $10 additional
                    (1, 2): 2,    # Small, Blue - $2 additional
                    (2, 2): 7,    # Medium, Blue - $7 additional
                    (3, 2): 12,   # Large, Blue - $12 additional
                }
            )
        """
        if not sizes and not colors:
            return []
            
        if additional_prices is None:
            additional_prices = {}
            
        created_variants = []
            
        # Get actual Size objects if IDs were provided
        if sizes and all(isinstance(s, int) for s in sizes):
            from .models import Size
            size_objects = Size.objects.filter(id__in=sizes)
            size_map = {s.id: s for s in size_objects}
            sizes = [size_map.get(s_id) for s_id in sizes if s_id in size_map]
            
        # Get actual Color objects if IDs were provided
        if colors and all(isinstance(c, int) for c in colors):
            from .models import Color
            color_objects = Color.objects.filter(id__in=colors)
            color_map = {c.id: c for c in color_objects}
            colors = [color_map.get(c_id) for c_id in colors if c_id in color_map]
        
        # If we have both sizes and colors, create all combinations
        if sizes and colors:
            for size in sizes:
                for color in colors:
                    size_id = size.id if hasattr(size, 'id') else size
                    color_id = color.id if hasattr(color, 'id') else color
                    
                    # Get additional price from mapping or default to 0
                    add_price = additional_prices.get((size_id, color_id), 0)
                    
                    # Create a sensible SKU suffix from size and color
                    size_code = size.name[0].upper() if hasattr(size, 'name') else 'S'
                    color_code = color.name[:3].upper() if hasattr(color, 'name') else 'COL'
                    sku_suffix = f"-{size_code}-{color_code}"
                    
                    # Create the variant
                    variant = ProductVariant.objects.create(
                        product=self,
                        size=size,
                        color=color,
                        sku_suffix=sku_suffix,
                        additional_price=add_price
                    )
                    created_variants.append(variant)
        
        # If we only have sizes, create variants for each size
        elif sizes:
            for size in sizes:
                size_id = size.id if hasattr(size, 'id') else size
                
                # Get additional price from mapping or default to 0
                add_price = additional_prices.get(size_id, 0)
                
                # Create a sensible SKU suffix from size
                size_code = size.name[0].upper() if hasattr(size, 'name') else 'S'
                sku_suffix = f"-{size_code}"
                
                # Create the variant
                variant = ProductVariant.objects.create(
                    product=self,
                    size=size,
                    sku_suffix=sku_suffix,
                    additional_price=add_price
                )
                created_variants.append(variant)
        
        # If we only have colors, create variants for each color
        elif colors:
            for color in colors:
                color_id = color.id if hasattr(color, 'id') else color
                
                # Get additional price from mapping or default to 0
                add_price = additional_prices.get(color_id, 0)
                
                # Create a sensible SKU suffix from color
                color_code = color.name[:3].upper() if hasattr(color, 'name') else 'COL'
                sku_suffix = f"-{color_code}"
                
                # Create the variant
                variant = ProductVariant.objects.create(
                    product=self,
                    color=color,
                    sku_suffix=sku_suffix,
                    additional_price=add_price
                )
                created_variants.append(variant)
        
        return created_variants

def product_variant_image_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/product_variant_images/<product_slug>/<variant_sku_suffix>/<filename>
    return f'product_variant_images/{instance.product.slug}/{instance.sku_suffix}/{filename}'

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku_suffix = models.CharField(max_length=50)  # e.g., "-S", "-RED"
    name_suffix = models.CharField(max_length=100, blank=True, null=True)  # e.g., "Small", "Red"
    
    # Replace JSON field with direct relationships
    size = models.ForeignKey(Size, on_delete=models.SET_NULL, null=True, blank=True, related_name='variants')
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True, related_name='variants')
    
    # Keep attributes for any other non-standard attributes
    attributes = models.JSONField(default=dict, blank=True, help_text="Additional attributes beyond size and color")
    
    additional_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    image = models.ImageField(
        upload_to=product_variant_image_path, 
        blank=True, 
        null=True,
        storage=get_storage()
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        variant_parts = []
        if self.size:
            variant_parts.append(str(self.size))
        if self.color:
            variant_parts.append(str(self.color))
        
        if variant_parts:
            return f"{self.product.name} - {', '.join(variant_parts)}"
        return f"{self.product.name} - {self.name_suffix or self.sku_suffix}"

    class Meta:
        unique_together = ('product', 'sku_suffix')
def general_product_image_path(instance, filename):
    # Define a path structure, e.g., based on product or variant
    if instance.variant:
        path_base = f'variants/{instance.variant.product.slug}/{instance.variant.sku_suffix}'
    elif instance.product:
        path_base = f'products/{instance.product.slug}'
    else:
        path_base = 'misc_images'
    return f'{path_base}/{filename}'

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE, related_name='images', null=True, blank=True)
    image = models.ImageField(
        upload_to=general_product_image_path, 
        blank=True, 
        null=True,
        storage=get_storage()
    )
    alt_text = models.CharField(max_length=255, blank=True, null=True)
    display_order = models.IntegerField(default=0)
    is_primary = models.BooleanField(default=False)  # Main image flag
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.product:
            return f"Image for {self.product.name}"
        elif self.variant:
            return f"Image for {self.variant.product.name} Variant"
        return "Product Image"

    class Meta:
        ordering = ['display_order']
