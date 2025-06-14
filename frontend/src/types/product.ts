// Product-related TypeScript interfaces

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  parent_category?: number | null;
  image?: string;
  is_active: boolean;
  is_featured?: boolean;
  subcategories?: ProductCategory[];
}

export interface Size {
  id: number;
  name: string;
  display_order: number;
}

export interface Color {
  id: number;
  name: string;
  hex_code?: string;
  display_order: number;
}

export interface ProductImage {
  id: number;
  image: string; // URL to the image
  alt_text?: string;
  display_order?: number;
  is_primary: boolean;
}

export interface ProductVariant {
  id: number;
  product: number;
  name_suffix?: string;
  sku_suffix: string;
  size?: number; // Size ID
  size_info?: Size; // Full size object
  color?: number; // Color ID
  color_info?: Color; // Full color object
  attributes: Record<string, any>;
  additional_price: string; // Comes as string from DRF DecimalField
  image?: string; // URL to variant-specific image
  is_active: boolean;
  images?: ProductImage[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku_prefix?: string;
  description?: string;
  category?: number;
  category_name?: string;
  base_price: string; // Comes as string from DRF DecimalField
  buy_now_link?: string; // External payment link for Buy Now functionality
  tags?: string[];
  is_archived: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  created_at: string;
  updated_at: string;
}

export interface GroupedProducts {
  [categoryName: string]: Product[];
}
