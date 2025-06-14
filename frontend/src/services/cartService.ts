// Cart Service for handling API calls to the cart endpoints
import { CartItem } from '../store/cartSlice';
import { BackendCart, convertFrontendItemToBackend } from '../types/backendCart';
import apiClient from './api';

export interface CartResponse extends BackendCart {}

export interface AddToCartRequest {
  product_variant?: number;
  drop_product?: number;
  quantity: number;
  color?: string;
  color_code?: string;
  size?: string;
}

// Add the missing sync interfaces
export interface CartSyncItem {
  drop_product_id?: number;
  product_variant_id?: number;
  quantity: number;
  color?: string;
  color_code?: string;
  size?: string;
}

export interface CartSyncRequest {
  items: CartSyncItem[];
  guest_cart_id?: string;
}

export interface CartMergeRequest {
  guest_cart_id: string;
  merge_strategy: 'replace' | 'merge' | 'keep_user';
}

export interface CartSyncResponse {
  cart: CartResponse;
  message: string;
}

/**
 * Get the current user's cart or guest cart
 */
export async function getCart(cartId?: string): Promise<CartResponse | null> {
  try {
    const url = cartId ? `/carts/${cartId}/` : '/carts/';
    const response = await apiClient.get<CartResponse>(url);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching cart:', error);
    return null;
  }
}

/**
 * Add an item to cart
 */
export async function addToCartAPI(cartId: string, item: AddToCartRequest): Promise<CartItem | null> {
  try {
    const response = await apiClient.post(`/carts/${cartId}/items/`, item);
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return null;
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartId: string, itemId: number, quantity: number): Promise<CartItem | null> {
  try {
    const response = await apiClient.patch(`/carts/${cartId}/items/${itemId}/`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return null;
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCartAPI(cartId: string, itemId: number): Promise<boolean> {
  try {
    await apiClient.delete(`/carts/${cartId}/items/${itemId}/`);
    return true;
  } catch (error) {
    console.error('Error removing item from cart:', error);
    return false;
  }
}

/**
 * Create a new cart (for guest users)
 */
export async function createCart(): Promise<CartResponse | null> {
  try {
    const response = await apiClient.post<CartResponse>('/carts/', {});
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

/**
 * Sync cart items from localStorage to backend
 */
export async function syncCart(syncData: CartSyncRequest): Promise<CartResponse | null> {
  try {
    const response = await apiClient.post<CartSyncResponse>('/carts/sync/', syncData);
    return response.data.cart;
  } catch (error) {
    console.error('Error syncing cart:', error);
    return null;
  }
}

/**
 * Merge guest cart with user cart on login
 */
export async function mergeGuestCart(mergeData: CartMergeRequest): Promise<CartResponse | null> {
  try {
    const response = await apiClient.post<CartSyncResponse>('/carts/merge/', mergeData);
    return response.data.cart;
  } catch (error) {
    console.error('Error merging guest cart:', error);
    return null;
  }
}

/**
 * Get user's cart (using 'mine' endpoint)
 */
export async function getMyCart(guestCartId?: string): Promise<CartResponse | null> {
  try {
    const headers: Record<string, string> = {};
    if (guestCartId) {
      headers['X-Cart-ID'] = guestCartId;
    }
    
    const response = await apiClient.get<CartResponse>('/carts/mine/', { headers });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Error fetching my cart:', error);
    return null;
  }
}

/**
 * Bulk add items to cart
 */
export async function bulkAddToCart(items: CartSyncItem[], cartId?: string): Promise<CartResponse | null> {
  try {
    const headers: Record<string, string> = {};
    if (cartId) {
      headers['X-Cart-ID'] = cartId;
    }
    
    const response = await apiClient.post<CartResponse>('/carts/bulk-add/', { items }, { headers });
    return response.data;
  } catch (error) {
    console.error('Error bulk adding to cart:', error);
    return null;
  }
}

/**
 * Convert frontend cart items to sync format
 */
export function convertCartItemsToSyncFormat(items: CartItem[]): CartSyncItem[] {
  return items
    .map(item => convertFrontendItemToBackend(item))
    .filter(item => {
      // Filter out items that don't have valid IDs
      return item.drop_product_id || item.product_variant_id;
    });
}

/**
 * Update cart item quantity (for specific item)
 */
export async function updateCartItemQuantity(params: {
  itemId: number;
  variantId?: number;
  color?: string;
  size?: string;
  quantity: number;
}): Promise<CartResponse | null> {
  try {
    // For now, we'll use the bulk add approach to update quantities
    // Since the backend doesn't have a specific endpoint for updating individual cart items by complex criteria
    // We can either implement a custom endpoint or use the existing sync mechanism
    
    // Use the sync mechanism to update quantity
    const syncItem: CartSyncItem = {
      quantity: params.quantity,
      color: params.color,
      color_code: undefined, // We don't have this info here
      size: params.size,
    };
    
    // Determine if this is a drop product or variant
    if (params.variantId) {
      syncItem.product_variant_id = params.variantId;
    } else {
      syncItem.drop_product_id = params.itemId;
    }
    
    // Use bulk add which will merge/update existing items
    return await bulkAddToCart([syncItem]);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return null;
  }
}
