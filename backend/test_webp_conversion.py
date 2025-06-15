#!/usr/bin/env python
"""
Test script for WebP image conversion functionality.
Run this script to test the image conversion utilities.
"""

import os
import sys
import django
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from products.image_utils import convert_to_webp, should_convert_image, optimize_image_for_upload
from PIL import Image, ImageDraw
from io import BytesIO
from django.core.files.base import ContentFile

def create_test_image(format_name='PNG'):
    """Create a test image for conversion testing."""
    img = Image.new('RGB', (400, 300), color='lightblue')
    d = ImageDraw.Draw(img)
    d.text((50, 50), f"Test {format_name} Image", fill='black')
    d.text((50, 100), "This should be converted to WebP", fill='darkblue')
    
    output = BytesIO()
    img.save(output, format=format_name, quality=90)
    output.seek(0)
    
    return ContentFile(output.getvalue(), name=f'test_image.{format_name.lower()}')

def test_webp_conversion():
    """Test the WebP conversion functionality."""
    print("Testing WebP Image Conversion")
    print("=" * 40)
    
    # Test formats to convert
    test_formats = ['PNG', 'JPEG']
    
    for format_name in test_formats:
        print(f"\nTesting {format_name} conversion:")
        
        # Create test image
        test_image = create_test_image(format_name)
        print(f"  Original image: {test_image.name} ({len(test_image.read())} bytes)")
        test_image.seek(0)  # Reset file pointer
        
        # Check if should convert
        should_convert = should_convert_image(test_image)
        print(f"  Should convert: {should_convert}")
        
        if should_convert:
            # Convert to WebP
            test_image.seek(0)  # Reset file pointer
            webp_image = convert_to_webp(test_image, quality=85)
            print(f"  Converted image: {webp_image.name} ({len(webp_image.read())} bytes)")
            
            # Calculate compression ratio
            test_image.seek(0)
            webp_image.seek(0)
            original_size = len(test_image.read())
            webp_size = len(webp_image.read())
            compression_ratio = (1 - webp_size / original_size) * 100
            print(f"  Compression: {compression_ratio:.1f}% size reduction")
        
        print()
    
    # Test optimization function
    print("Testing optimize_image_for_upload function:")
    test_image = create_test_image('PNG')
    optimized = optimize_image_for_upload(test_image, 'product')
    print(f"  Optimized for product: {optimized.name}")
    
    test_image = create_test_image('PNG')
    optimized = optimize_image_for_upload(test_image, 'banner')
    print(f"  Optimized for banner: {optimized.name}")
    
    # Test unsupported format
    print("\nTesting unsupported format (should not convert):")
    test_webp = ContentFile(b"fake webp content", name='test.webp')
    should_convert = should_convert_image(test_webp)
    print(f"  WebP should convert: {should_convert}")
    
    test_gif = ContentFile(b"fake gif content", name='test.gif')
    should_convert = should_convert_image(test_gif)
    print(f"  GIF should convert: {should_convert}")
    
    print("\n✅ WebP conversion testing completed!")

if __name__ == "__main__":
    try:
        test_webp_conversion()
    except Exception as e:
        print(f"❌ Error during testing: {str(e)}")
        import traceback
        traceback.print_exc()
