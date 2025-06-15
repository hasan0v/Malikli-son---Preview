"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SafeImage from './SafeImage';
import { addToCart } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { findMatchingVariant, calculateVariantPrice, getVariantDisplayName } from '@/utils/variantUtils';
import { useI18n } from '@/hooks/useI18n';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: string;
  imageUrl: string;
  secondaryImageUrl?: string; // For hover effect
  color?: string;
  colorName?: string;
  size?: string;
  sizeName?: string;
  availableColors?: Array<{id?: number, code: string, name: string, image?: string}>;
  availableSizes?: Array<{id?: number, code: string, name: string}>;
  product?: any; // We'll use this for more advanced variant handling
  priority?: boolean; // For prioritizing above-the-fold images
  index?: number; // Card position for lazy loading optimization
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  price,
  imageUrl,
  secondaryImageUrl,
  color,
  colorName,
  size,
  sizeName,
  availableColors = [],
  availableSizes = [],
  product,
  priority = false,
  index = 0
}) => {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [selectedColor, setSelectedColor] = useState<string | undefined>(color);
  const [selectedColorName, setSelectedColorName] = useState<string | undefined>(colorName);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(size);
  const [selectedSizeName, setSelectedSizeName] = useState<string | undefined>(sizeName);
  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(undefined);
  const [currentPrice, setCurrentPrice] = useState<number>(parseFloat(price));
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Initialize with default selections if provided
    if (color && colorName) {
      setSelectedColor(color);
      setSelectedColorName(colorName);
    }
    
    if (size && sizeName) {
      setSelectedSize(size);
      setSelectedSizeName(sizeName);
    }
    
    // Set initial variant and price
    if (product) {
      updateVariant(color, size);
    }
  }, [product]);

  // Function to update variant based on current selections
  const updateVariant = (newColor?: string, newSize?: string) => {
    if (product) {
      const matchingVariant = findMatchingVariant(product, newColor || selectedColor, newSize || selectedSize);
      if (matchingVariant) {
        setSelectedVariantId(matchingVariant.id);
        const newPrice = calculateVariantPrice(product, matchingVariant);
        setCurrentPrice(newPrice);
        
        // Update image if variant has a specific image
        if (matchingVariant.image && matchingVariant.image !== currentImageUrl) {
          setCurrentImageUrl(matchingVariant.image);
        }
      }
    }
  };
  const handleAddToCart = () => {
    // Original Add to Cart functionality - commented out but preserved
    /*
    const cartItemName = getVariantDisplayName(product || { name, base_price: price }, 
      product?.variants?.find((v: any) => v.id === selectedVariantId));
      
    dispatch(addToCart({
      id,
      variantId: selectedVariantId,
      name: cartItemName,
      price: currentPrice,
      quantity: 1,
      image: currentImageUrl,
      color: selectedColorName,
      colorCode: selectedColor,
      size: selectedSizeName
    }));
    */
  };  // New Buy Now functionality
  const handleBuyNow = () => {
    // Check authentication first
    if (!isAuthenticated) {
      // Store checkout data for after login
      const checkoutParams = new URLSearchParams({
        buyNow: 'true',
        productId: id.toString(),
        productName: name,
        productSlug: slug || '',
        image: currentImageUrl,
        ...(product?.buy_now_link && { buyNowLink: product.buy_now_link }),
        ...(selectedVariantId && { variantId: selectedVariantId.toString() }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedColorName && { colorName: selectedColorName }),
        ...(selectedSize && { size: selectedSize }),
        ...(selectedSizeName && { sizeName: selectedSizeName }),
        price: currentPrice.toString(),
        quantity: '1'
      });

      // Store the checkout URL to redirect after login
      localStorage.setItem('redirectAfterLogin', `/checkout?${checkoutParams.toString()}`);
      
      // Redirect to login
      router.push('/auth/login');
      return;
    }

    // User is authenticated, proceed with Buy Now
    // Redirect to checkout page with product information
    const params = new URLSearchParams({
      buyNow: 'true',
      productId: id.toString(),
      productName: name,
      productSlug: slug || '',
      image: currentImageUrl,
      ...(product?.buy_now_link && { buyNowLink: product.buy_now_link }),
      ...(selectedVariantId && { variantId: selectedVariantId.toString() }),
      ...(selectedColor && { color: selectedColor }),
      ...(selectedColorName && { colorName: selectedColorName }),
      ...(selectedSize && { size: selectedSize }),
      ...(selectedSizeName && { sizeName: selectedSizeName }),
      price: currentPrice.toString(),
      quantity: '1'
    });
    
    router.push(`/checkout?${params.toString()}`);
  };

  const handleColorSelect = (colorCode: string, colorName: string, colorImage?: string, variantId?: number) => {
    setSelectedColor(colorCode);
    setSelectedColorName(colorName);
    
    // Update the displayed image if this color has an image
    if (colorImage) {
      setCurrentImageUrl(colorImage);
    }
    
    // Update variant based on new color selection
    updateVariant(colorCode, selectedSize);
  };

  const handleSizeSelect = (sizeCode: string, sizeName: string, variantId?: number) => {
    setSelectedSize(sizeCode);
    setSelectedSizeName(sizeName);
    
    // Update variant based on new size selection
    updateVariant(selectedColor, sizeCode);
  };

  // Use the first available variant or the default one
  const effectiveColor = selectedColor || color;
  const effectiveColorName = selectedColorName || colorName;
  const effectiveSize = selectedSize || size;
  const effectiveSizeName = selectedSizeName || sizeName;
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use Buy Now instead of Add to Cart
    handleBuyNow();
  };

  const isSelectionComplete = 
    (availableColors.length === 0 || effectiveColor) && 
    (availableSizes.length === 0 || effectiveSize);

  return (
    <div 
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAdd(false);
      }}
    >
      {/* Product Image Container with Hover Effects */}
      <div className={styles.imageContainer}>
        <Link href={`/products/${slug}`}>
          <div className={styles.imageWrapper}>            <SafeImage
              src={isHovered && secondaryImageUrl ? secondaryImageUrl : currentImageUrl}
              alt={name}
              width={300}
              height={400}
              className={styles.productImage}
              priority={priority || index < 4} // Prioritize first 4 images
              quality={90}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-priority={priority || index < 4 ? "true" : "false"}
            />
            
            {/* Quick Add Overlay */}
            {isHovered && isSelectionComplete && (
              <div className={styles.quickAddOverlay}>                <button 
                  className={styles.quickAddButton}
                  onClick={handleQuickAdd}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  {t('common.buyNow')}
                </button>
              </div>
            )}
              {/* Badge for multiple variants */}
            {(availableColors.length > 1 || availableSizes.length > 1) && (
              <div className={styles.variantBadge}>
                {availableColors.length > 1 && t('productCard.variants.colors', { count: availableColors.length })}
                {availableColors.length > 1 && availableSizes.length > 1 && ' • '}
                {availableSizes.length > 1 && t('productCard.variants.sizes', { count: availableSizes.length })}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className={styles.productInfo}>
        {/* Product Name */}
        <h3 className={styles.productName}>
          <Link href={`/products/${slug}`}>
            {name}
          </Link>
        </h3>
          {/* Price */}
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>{currentPrice.toFixed(2)} {t('product.price.currency')}</span>
          {parseFloat(price) !== currentPrice && (
            <span className={styles.originalPrice}>{parseFloat(price).toFixed(2)} {t('product.price.currency')}</span>
          )}
        </div>

        {isClient && (
          <>            {/* Color Selection */}
            {availableColors.length > 0 && (
              <div className={styles.colorSelection}>
                <div className={styles.colorOptions}>
                  {availableColors.map((colorOption, index) => (
                    <button
                      key={colorOption.id || index}
                      className={`${styles.colorSwatch} ${
                        colorOption.code === effectiveColor ? styles.selectedSwatch : ''
                      }`}
                      style={{ backgroundColor: colorOption.code }}
                      title={colorOption.name}
                      onClick={() => handleColorSelect(colorOption.code, colorOption.name, colorOption.image, colorOption.id)}
                    >
                      {colorOption.code === effectiveColor && (
                        <svg className={styles.checkmark} width="12" height="12" viewBox="0 0 24 24" fill="none">
                          <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}            {/* Size Selection */}
            {availableSizes.length > 0 && (
              <div className={styles.sizeSelection}>
                <div className={styles.sizeOptions}>
                  {availableSizes.map((sizeOption, index) => (
                    <button
                      key={sizeOption.id || index}
                      className={`${styles.sizeButton} ${
                        sizeOption.code === effectiveSize ? styles.selectedSize : ''
                      }`}
                      onClick={() => handleSizeSelect(sizeOption.code, sizeOption.name, sizeOption.id)}
                    >
                      {sizeOption.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}        {/* Buy Now Button - replaced Add to Cart */}
        <button 
          className={`${styles.addToCartButton} ${
            !isSelectionComplete ? styles.addToCartDisabled : ''
          }`}
          onClick={handleBuyNow}
          disabled={!isSelectionComplete}
        >
          {!isSelectionComplete ? t('common.selectOptions') : t('common.buyNow')}
        </button>
        
        {/* Original Add to Cart Button - commented out but preserved 
        <button 
          className={`${styles.addToCartButton} ${
            !isSelectionComplete ? styles.addToCartDisabled : ''
          }`}
          onClick={handleAddToCart}
          disabled={!isSelectionComplete}
        >
          {!isSelectionComplete ? 'Выберите варианты' : 'В корзину'}
        </button>
        */}
      </div>
    </div>
  );
};

export default ProductCard;
