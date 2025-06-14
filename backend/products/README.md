# Product Variant Management System

This system provides a more user-friendly way to manage product variants with dedicated models for common attributes like Size and Color.

## Models

- `Size`: Represents product sizes (XS, S, M, L, XL, etc.)
- `Color`: Represents product colors, including hex codes for display
- `ProductVariant`: Now uses direct relationships to Size and Color instead of a JSON field

## Features

### 1. Bulk Creation of Variants

You can create multiple variants at once using:

- The Django Admin interface with a dedicated form
- The API endpoint for batch creation

### 2. Default Attributes

Run the following command to set up default sizes and colors:

```bash
python manage.py setup_product_attributes
```

This will create common sizes (XS, S, M, L, XL, XXL) and colors with their hex codes.

### 3. Admin Interface

The Django Admin interface now includes:

- A bulk variant creation action for products
- Autocomplete fields for choosing sizes and colors
- Improved display of variant information

### 4. API Endpoints

New API endpoints have been added:

- `/api/products/sizes/` - List all available sizes
- `/api/products/colors/` - List all available colors
- `/api/products/{slug}/create-variants/` - Create variants in bulk

## Usage Examples

### Creating Variants Through the API

```python
import requests

# Create variants for a product
response = requests.post(
    'http://127.0.0.1:8000/api/products/my-product/create-variants/',
    json={
        'sizes': [1, 2, 3],  # Size IDs
        'colors': [1, 2],    # Color IDs
        'additional_prices': {
            '1-1': 0,        # Small-Red: no additional cost
            '2-1': 5,        # Medium-Red: $5 additional
            '3-1': 10,       # Large-Red: $10 additional
            '1-2': 2,        # Small-Blue: $2 additional
            '2-2': 7,        # Medium-Blue: $7 additional
            '3-2': 12        # Large-Blue: $12 additional
        }
    },
    headers={'Authorization': 'Bearer your-token'}
)
```

### Creating Variants Programmatically

```python
from products.models import Product, Size, Color

# Get product, sizes, and colors
product = Product.objects.get(slug='my-product')
sizes = Size.objects.filter(name__in=['S', 'M', 'L'])
colors = Color.objects.filter(name__in=['Red', 'Blue'])

# Create variants with additional prices
additional_prices = {
    (sizes[0].id, colors[0].id): 0,    # Small, Red - no additional price
    (sizes[1].id, colors[0].id): 5,    # Medium, Red - $5 additional
    (sizes[2].id, colors[0].id): 10,   # Large, Red - $10 additional
    (sizes[0].id, colors[1].id): 2,    # Small, Blue - $2 additional
    (sizes[1].id, colors[1].id): 7,    # Medium, Blue - $7 additional
    (sizes[2].id, colors[1].id): 12,   # Large, Blue - $12 additional
}

variants = product.create_variants_from_options(
    sizes=sizes,
    colors=colors,
    additional_prices=additional_prices
)
```
