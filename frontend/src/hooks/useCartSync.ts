// hooks/useCartSync.ts
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { 
  syncCartWithBackend, 
  mergeGuestCartWithUser, 
  loadCartFromBackend,
  markAsSynced,
  clearCart 
} from '@/store/cartSlice';
import { useAuth } from './useAuth';

export const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading: authLoading } = useAuth();
  const { 
    items, 
    cartId, 
    needsSync, 
    isLoading: cartLoading, 
    lastSyncTime 
  } = useSelector((state: RootState) => state.cart);
  // Auto-sync cart when user authentication state changes
  useEffect(() => {
    if (authLoading) return; // Wait for auth to be determined

    const handleCartSync = async () => {
      if (user && !cartLoading) {
        // User is logged in
        if (cartId && items.length > 0) {
          // User has a guest cart with items - merge it
          try {
            // Add a small delay to ensure token is properly set after login
            await new Promise(resolve => setTimeout(resolve, 100));
            await dispatch(mergeGuestCartWithUser({
              guestCartId: cartId,
              strategy: 'merge'
            })).unwrap();
          } catch (error) {
            console.error('Failed to merge guest cart:', error);
            // Fallback: load user's existing cart
            await dispatch(loadCartFromBackend({}));
          }
        } else {
          // Load user's existing cart from backend
          await dispatch(loadCartFromBackend({}));
        }
      } else if (!user && items.length > 0 && needsSync) {
        // Guest user with items that need syncing
        try {
          await dispatch(syncCartWithBackend()).unwrap();
        } catch (error) {
          console.error('Failed to sync guest cart:', error);
        }
      }
    };

    handleCartSync();
  }, [user, authLoading, dispatch]);  // Auto-sync cart periodically when needed (for both guest and logged-in users)
  useEffect(() => {
    if (needsSync && !cartLoading) {
      const syncTimeout = setTimeout(() => {
        // Always use the sync endpoint for both guest and authenticated users
        // This ensures quantities are set correctly rather than accumulated
        dispatch(syncCartWithBackend());
      }, 2000); // Debounce syncing by 2 seconds

      return () => clearTimeout(syncTimeout);
    }
  }, [needsSync, user, cartLoading, dispatch]);

  // Manual sync function
  const syncCart = useCallback(async () => {
    if (cartLoading) return;

    try {
      if (user) {
        await dispatch(loadCartFromBackend({})).unwrap();
      } else {
        await dispatch(syncCartWithBackend()).unwrap();
      }
    } catch (error) {
      console.error('Manual cart sync failed:', error);
      throw error;
    }
  }, [user, cartLoading, dispatch]);

  // Merge guest cart when logging in
  const mergeGuestCart = useCallback(async (strategy: 'replace' | 'merge' | 'keep_user' = 'merge') => {
    if (!cartId || cartLoading) return;

    try {
      await dispatch(mergeGuestCartWithUser({
        guestCartId: cartId,
        strategy
      })).unwrap();
    } catch (error) {
      console.error('Failed to merge guest cart:', error);
      throw error;
    }
  }, [cartId, cartLoading, dispatch]);

  // Clear cart on logout
  const clearCartOnLogout = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Force sync cart
  const forceSyncCart = useCallback(async () => {
    if (cartLoading) return;

    try {
      await dispatch(syncCartWithBackend()).unwrap();
      dispatch(markAsSynced());
    } catch (error) {
      console.error('Force sync failed:', error);
      throw error;
    }
  }, [cartLoading, dispatch]);

  return {
    syncCart,
    mergeGuestCart,
    clearCartOnLogout,
    forceSyncCart,
    isLoading: cartLoading,
    needsSync,
    lastSyncTime,
    cartId,
    isAuthenticated: !!user,
  };
};
