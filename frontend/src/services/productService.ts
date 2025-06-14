// Product Service for handling API calls to the products endpoints
import { Product, ProductCategory } from '../types/product';
import apiClient from './api';

// Interface for paginated responses from Django REST Framework
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const categoryToSliderItem = (category: ProductCategory, index: number) => {
  // Use category image if available, otherwise use a placeholder
  const imageSrc = category.image || '/placeholder-slider.jpg';
  return {
    id: category.id || index + 1,
    type: 'image' as const,
    src: imageSrc,
    alt: category.name || `Category ${index + 1}`,
    slug: category.slug,
    title: category.name,
    description: category.description || 'Explore our collection'
  };
};

/**
 * Fetch all products from the API
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiClient.get<PaginatedResponse<Product>>('/products/');
    // Return the results array from the paginated response
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await apiClient.get(`/products/${slug}/`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch all categories
 * @param featured Optional flag to fetch only featured categories
 */
export async function getCategories(featured?: boolean): Promise<ProductCategory[]> {
  try {
    let url = '/categories/';
    if (featured) {
      url += '?is_featured=true';
    }
      const response = await apiClient.get<PaginatedResponse<ProductCategory>>(url);
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array on error
  }
}

/**
 * Fetch products by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const response = await apiClient.get<PaginatedResponse<Product>>(`/products/?category__slug=${categorySlug}`);
    return response.data.results || [];
  } catch (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return []; // Return empty array on error
  }
}
