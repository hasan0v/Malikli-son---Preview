# WebP Image Conversion

## Overview
The system automatically converts uploaded images to WebP format to reduce file sizes and improve loading performance. WebP provides better compression than JPEG and PNG while maintaining high image quality.

## Automatic Conversion
All image uploads are automatically processed when:
- **Categories**: Uploading category images
- **Products**: Uploading product images via ProductImage model
- **Product Variants**: Uploading variant-specific images
- **Drops**: Uploading banner images

### Supported Input Formats
- JPEG (.jpg, .jpeg)
- PNG (.png) 
- BMP (.bmp)
- TIFF (.tiff, .tif)

### Formats NOT Converted
- WebP (.webp) - Already optimized
- GIF (.gif) - To preserve animations
- SVG (.svg) - Vector format

## Optimization Settings
Different image types use different optimization settings:

| Image Type | Quality | Max Width | Max Height | Use Case |
|------------|---------|-----------|------------|----------|
| Product    | 85%     | 1920px    | 1920px     | Product detail images |
| Variant    | 85%     | 1920px    | 1920px     | Product variant images |
| Category   | 80%     | 800px     | 600px      | Category thumbnails |
| Banner     | 90%     | 2400px    | 1200px     | Drop banners |
| General    | 85%     | 1920px    | 1920px     | Default settings |

## Benefits
- **File Size Reduction**: Typically 30-70% smaller than original
- **Faster Loading**: Reduced bandwidth usage
- **Better UX**: Improved page load times
- **SEO Benefits**: Better Core Web Vitals scores

## Management Commands

### Convert Existing Images
Convert all existing images in the database to WebP:

```bash
# Convert all images
python manage.py convert_images_to_webp

# Dry run (see what would be converted)
python manage.py convert_images_to_webp --dry-run

# Convert specific model only
python manage.py convert_images_to_webp --model category
python manage.py convert_images_to_webp --model variant
python manage.py convert_images_to_webp --model product
python manage.py convert_images_to_webp --model drop
```

## Admin Interface
The Django admin interface shows:
- **Image Format**: File extension (WebP shown in green)
- **File Size**: Human-readable file size
- **Image Preview**: Thumbnail preview

## Testing
Test the conversion functionality:

```bash
python test_webp_conversion.py
```

This will test:
- PNG to WebP conversion
- JPEG to WebP conversion
- File size reduction
- Format detection
- Optimization settings

## Technical Details

### Image Processing Pipeline
1. **Upload Detection**: Check if uploaded file needs conversion
2. **Format Conversion**: Convert to WebP using PIL/Pillow
3. **Optimization**: Apply compression and resizing
4. **Storage**: Save optimized image to Cloudflare R2

### Error Handling
- If conversion fails, original image is preserved
- Errors are logged for debugging
- Admin interface shows conversion status

### Dependencies
- **Pillow**: Image processing library
- **Django**: Web framework
- **django-storages**: Cloud storage integration

## Configuration
Image processing settings can be modified in `products/image_utils.py`:

```python
# Modify optimization settings
optimization_settings = {
    'product': {'quality': 85, 'max_width': 1920, 'max_height': 1920},
    # ... other settings
}
```

## Troubleshooting

### Common Issues
1. **Images not converting**: Check file permissions and storage configuration
2. **Poor quality**: Adjust quality settings in image_utils.py
3. **Large file sizes**: Verify compression settings are applied

### Logging
Enable Django logging to see conversion details:

```python
LOGGING = {
    'loggers': {
        'products.image_utils': {
            'level': 'INFO',
        },
    },
}
```

## Performance Impact
- **Upload Time**: Slight increase due to processing
- **Storage Costs**: Reduced due to smaller file sizes
- **Bandwidth**: Significantly reduced for users
- **Server Load**: Minimal impact with efficient processing
