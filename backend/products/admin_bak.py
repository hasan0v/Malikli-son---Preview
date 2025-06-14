# products/admin.py
from django.contrib import admin
from .models import Category, Product, ProductVariant, ProductImage, Size, Color
from django.http import HttpResponseRedirect
from django.urls import path
from django.shortcuts import render, get_object_or_404
from django import forms
from django.contrib import messages

class VariantBulkCreateForm(forms.Form):
    """Form for bulk creating variants"""
    sizes = forms.ModelMultipleChoiceField(
        queryset=Size.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple
    )
    colors = forms.ModelMultipleChoiceField(
        queryset=Color.objects.all(),
        required=False,
        widget=forms.CheckboxSelectMultiple
    )
    
    def clean(self):
        cleaned_data = super().clean()
        if not cleaned_data.get('sizes') and not cleaned_data.get('colors'):
            raise forms.ValidationError("You must select at least one size or color.")
        return cleaned_data

@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_order')
    search_fields = ('name',)
    ordering = ('display_order', 'name')

@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code', 'display_order')
    search_fields = ('name', 'hex_code')
    ordering = ('display_order', 'name')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'parent_category', 'is_active', 'created_at')
    list_filter = ('is_active', 'parent_category')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

class ProductVariantInline(admin.TabularInline): # Or StackedInline
    model = ProductVariant
    extra = 1
    fields = ('sku_suffix', 'name_suffix', 'size', 'color', 'attributes', 'additional_price', 'image', 'is_active')
    autocomplete_fields = ['size', 'color']  # Enables search-based autocomplete for these fields

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    # fields = ('image_url', 'alt_text', 'variant', 'display_order', 'is_primary')
    # fk_name = 'product' # if you have multiple FKs to Product, specify which one this inline uses

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'category', 'base_price', 'is_archived', 'created_at')
    list_filter = ('is_archived', 'category')
    search_fields = ('name', 'slug', 'sku_prefix', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductVariantInline, ProductImageInline]
    actions = ['bulk_create_variants']
    
    def get_urls(self):
        from django.urls import path
        urls = super(ProductAdmin, self).get_urls()
        custom_urls = [
            path(
                '<path:object_id>/variants/bulk-create/',
                self.admin_site.admin_view(self.bulk_create_variants_view),
                name='products_product_bulk_create_variants',
            ),
        ]
        return custom_urls + urls
    def bulk_create_variants(self, request, queryset):
        if queryset.count() != 1:
            self.message_user(request, "Please select only one product for this action.", level=messages.WARNING)
            return
        
        product = queryset.first()
        return HttpResponseRedirect(f"../admin/products/product/{product.id}/variants/bulk-create/")
    bulk_create_variants.short_description = "Bulk create variants for selected product"
    
    def bulk_create_variants_view(self, request, object_id):
        from django.shortcuts import get_object_or_404
        product = get_object_or_404(Product, pk=object_id)
        
        if request.method == 'POST':
            form = VariantBulkCreateForm(request.POST)
            if form.is_valid():
                sizes = form.cleaned_data.get('sizes', [])
                colors = form.cleaned_data.get('colors', [])
                
                try:
                    variants = product.create_variants_from_options(
                        sizes=sizes,
                        colors=colors
                    )
                    self.message_user(
                        request,
                        f"Successfully created {len(variants)} variants for {product.name}.",
                        level=messages.SUCCESS
                    )
                    return HttpResponseRedirect("../../../")
                except Exception as e:
                    self.message_user(
                        request,
                        f"Error creating variants: {str(e)}",
                        level=messages.ERROR
                    )
        else:
            form = VariantBulkCreateForm()
            
        context = {
            'title': f'Bulk Create Variants for {product.name}',
            'form': form,
            'product': product,
            'opts': self.model._meta,
        }
        
        return render(request, 'admin/products/bulk_create_variants.html', context)

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('product', 'size', 'color', 'name_suffix', 'sku_suffix', 'additional_price', 'is_active')
    list_filter = ('is_active', 'product__category', 'size', 'color')
    search_fields = ('product__name', 'sku_suffix', 'name_suffix')
    autocomplete_fields = ['product', 'size', 'color']  # Enables search-based autocomplete

@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'product_link', 'variant_link', 'image_url_preview', 'alt_text', 'is_primary', 'display_order')
    list_filter = ('is_primary', 'product', 'variant')
    search_fields = ('alt_text', 'product__name', 'variant__name_suffix')
    # raw_id_fields = ('product', 'variant')

    def product_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        if obj.product:
            link = reverse("admin:products_product_change", args=[obj.product.id])
            return format_html('<a href="{}">{}</a>', link, obj.product.name)
        return "-"
    product_link.short_description = 'Product'

    def variant_link(self, obj):
        from django.urls import reverse
        from django.utils.html import format_html
        if obj.variant:
            link = reverse("admin:products_productvariant_change", args=[obj.variant.id])
            return format_html('<a href="{}">{}</a>', link, obj.variant)
        return "-"
    variant_link.short_description = 'Variant'
    
    def image_url_preview(self, obj):
        from django.utils.html import format_html
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "-"
    image_url_preview.short_description = 'Image Preview'

def bulk_create_variants(modeladmin, request, queryset):
    if request.method == "POST":
        form = VariantBulkCreateForm(request.POST)
        if form.is_valid():
            sizes = form.cleaned_data['sizes']
            colors = form.cleaned_data['colors']
            for product in queryset:
                for size in sizes:
                    for color in colors:
                        ProductVariant.objects.create(
                            product=product,
                            size=size,
                            color=color,
                            # Set other fields as necessary
                        )
            modeladmin.message_user(request, "Variants created successfully.")
            return HttpResponseRedirect(request.path_info)
    else:
        form = VariantBulkCreateForm()
    return render(request, "admin/bulk_create_variants.html", {"form": form, "products": queryset})

bulk_create_variants.short_description = "Create variants in bulk"

def get_urls(self):
    urls = super().get_urls()
    custom_urls = [
        path(
            "bulk-create-variants/",
            self.admin_site.admin_view(bulk_create_variants),
            name="products_product_bulk_create_variants",
        ),
    ]
    return custom_urls + urls

ProductAdmin.get_urls = get_urls