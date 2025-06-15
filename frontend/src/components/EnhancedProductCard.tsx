"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { addToCart } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { findMatchingVariant, calculateVariantPrice, getVariantDisplayName } from '@/utils/variantUtils';
import { useI18n } from '@/hooks/useI18n';
import styles from './EnhancedProductCard.module.css';

interface EnhancedProductCardProps {
  id: number;
  name: string;
  slug: string;
  price: string;
  imageUrl: string;
  color?: string;
  colorName?: string;
  size?: string;
  sizeName?: string;
  availableColors?: Array<{id?: number, code: string, name: string, image?: string}>;
  availableSizes?: Array<{id?: number, code: string, name: string}>;
  product?: any;
  priority?: boolean;
  index?: number;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  id,
  name,
  slug,
  price,
  imageUrl,
  color,
  colorName,
  size,
  sizeName,
  availableColors = [],
  availableSizes = [],
  product,
  priority = false,
  index = 0
}) => {  const { t } = useI18n();
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(color);
  const [selectedColorName, setSelectedColorName] = useState<string | undefined>(colorName);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(size);
  const [selectedSizeName, setSelectedSizeName] = useState<string | undefined>(sizeName);
  const [selectedVariantId, setSelectedVariantId] = useState<number | undefined>(undefined);
  const [currentPrice, setCurrentPrice] = useState<number>(parseFloat(price.replace(/[^0-9.-]+/g, "")));
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // Initialize component state
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
  };  // Get first 3 additional images for sequential display (excluding primary image)
  const displayImages = product?.images?.filter((img: any) => 
    img.image && img.image !== currentImageUrl
  ).slice(0, 3) || [];

  // State for fade animation and current image order
  const [currentOrder, setCurrentOrder] = useState([0, 1, 2]);
  const [isAnimating, setIsAnimating] = useState(false);  // Auto-rotate images in sequence with fade animation
  useEffect(() => {
    if (displayImages.length >= 2) {
      const interval = setInterval(() => {
        setIsAnimating(true);
          // Fade out, then change order, then fade in
        setTimeout(() => {
          setCurrentOrder(prev => {
            // Rotate array: move first element to end
            const newOrder = [...prev];
            const first = newOrder.shift();
            if (first !== undefined) {
              newOrder.push(first);
            }
            return newOrder;
          });
          
          // Fade back in with increased delay
          setTimeout(() => setIsAnimating(false), 600); // Increased from 300ms to 600ms
        }, 400); // Increased fade-out duration from 300ms to 400ms
      }, 4000); // 4-second intervals

      return () => clearInterval(interval);
    }
  }, [displayImages.length]);

  // Get first paragraph of description
  const getFirstParagraph = (description: string) => {
    if (!description) return '';
    
    // Split by double newlines or sentence endings to get first meaningful paragraph
    const paragraphs = description.split(/\n\n+|\. [A-Z]/).filter(p => p.trim());
    if (paragraphs.length > 0) {
      let firstParagraph = paragraphs[0].trim();
      // If it doesn't end with punctuation, add period
      if (!/[.!?]$/.test(firstParagraph)) {
        firstParagraph += '.';
      }
      return firstParagraph.length > 200 ? firstParagraph.substring(0, 200) + '...' : firstParagraph;
    }
    return '';
  };  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      // Check authentication first
      if (!isAuthenticated) {
        // Use the calculated current price which includes variant pricing
        const finalPrice = currentPrice;

        // Store checkout data for after login
        const checkoutParams = new URLSearchParams({
          buyNow: 'true',
          productId: id.toString(),
          productName: name,
          productSlug: slug,
          price: finalPrice.toString(),
          quantity: '1',
          image: currentImageUrl,
          ...(product?.buy_now_link && { buyNowLink: product.buy_now_link }),
          ...(selectedVariantId && { variantId: selectedVariantId.toString() }),
          ...(selectedColorName && { colorName: selectedColorName }),
          ...(selectedColor && { color: selectedColor }),
          ...(selectedSizeName && { sizeName: selectedSizeName }),
          ...(selectedSize && { size: selectedSize })
        });

        // Store the checkout URL to redirect after login
        localStorage.setItem('redirectAfterLogin', `/checkout?${checkoutParams.toString()}`);
        
        // Redirect to login
        router.push('/auth/login');
        return;
      }

      // User is authenticated, proceed with Buy Now
      // Use the calculated current price which includes variant pricing
      const finalPrice = currentPrice;

      // Redirect to checkout with product information (Buy Now functionality)
      const params = new URLSearchParams({
        buyNow: 'true',
        productId: id.toString(),
        productName: name,
        productSlug: slug,
        price: finalPrice.toString(),
        quantity: '1',
        image: currentImageUrl,
        ...(product?.buy_now_link && { buyNowLink: product.buy_now_link }),
        ...(selectedVariantId && { variantId: selectedVariantId.toString() }),
        ...(selectedColorName && { colorName: selectedColorName }),
        ...(selectedColor && { color: selectedColor }),
        ...(selectedSizeName && { sizeName: selectedSizeName }),
        ...(selectedSize && { size: selectedSize })
      });

      console.log('=== BUY NOW - ENHANCED PRODUCT CARD ===');
      console.log('Final URL params:', params.toString());
      
      router.push(`/checkout?${params.toString()}`);
    } catch (error) {
      console.error('Error processing Buy Now:', error);
    } finally {
      setIsAddingToCart(false);
    }
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

  // Use effective values for current selections
  const effectiveColor = selectedColor || color;
  const effectiveColorName = selectedColorName || colorName;
  const effectiveSize = selectedSize || size;
  const effectiveSizeName = selectedSizeName || sizeName;

  // Check if all required selections are made
  const isSelectionComplete = 
    (availableColors.length === 0 || effectiveColor) && 
    (availableSizes.length === 0 || effectiveSize);

  return (
    <div className={styles.enhancedCard}>
      {/* Left side - Product Card */}
      <div className={styles.productCardSection}>        <div className={styles.imageContainer}>
          <Link href={`/products/${slug}`}>
            <Image
              src={currentImageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className={styles.productImage}
              priority={priority}
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center top' // Focus on top of vertical images
              }}
            />
          </Link>
        </div>
        
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>
            <Link href={`/products/${slug}`}>{name}</Link>
          </h3>
            <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>{currentPrice.toFixed(2)} {t('product.price.currency')}</span>
            {parseFloat(price.replace(/[^0-9.-]+/g, "")) !== currentPrice && (
              <span className={styles.originalPrice}>{parseFloat(price.replace(/[^0-9.-]+/g, "")).toFixed(2)} {t('product.price.currency')}</span>
            )}
          </div>        {isClient && (
          <>
            {/* Color Selection */}
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
                      onClick={() => handleColorSelect(colorOption.code, colorOption.name, colorOption.image, colorOption.id)}
                      aria-label={colorOption.name}
                      title={colorOption.name}
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
            )}

            {/* Size Selection */}
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
        )}

        <button
          className={`${styles.addToCartButton} ${
            !isSelectionComplete ? styles.addToCartDisabled : ''
          }`}
          onClick={handleAddToCart}
          disabled={isAddingToCart || !isSelectionComplete}
        >
          {!isSelectionComplete ? t('common.selectOptions') : 
           isAddingToCart ? t('product.buttons.processing') : t('common.buyNow')}
        </button>
        </div>
      </div>      {/* Right side - Dynamic Images + Story Section */}
      <div className={styles.rightSection}>        {/* Sequential Image Gallery - 3 images next to each other with fade animation */}
        {displayImages.length > 0 && (
          <div className={styles.imageGalleryRow}>
            {currentOrder.map((orderIndex: number, position: number) => {
              const img = displayImages[orderIndex];
              if (!img) return null;
              
              return (
                <div
                  key={`${img.image}-${position}`}
                  className={`${styles.galleryImageItem} ${
                    isAnimating ? styles.fading : ''
                  }`}
                  style={{
                    transitionDelay: `${position * 0.1}s`
                  }}
                >
                  <Image
                    src={img.image}
                    alt={`${name} - Gallery view ${orderIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={styles.galleryImg}
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Product Story Section */}
        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <div className={styles.storyHeader}>
              <h4 className={styles.storyTitle}>{t('product.story.title')}</h4>
              <div className={styles.storyAccent}></div>
            </div>
            
            <div className={styles.storyText}>
              <p className={styles.storyParagraph}>
                {getFirstParagraph(product?.description || '')}
              </p>
              
              <div className={styles.storyDetails}>
                <div className={styles.craftedBadge}>
                  <span className={styles.badgeIcon}>✨</span>
                  <span>{t('product.story.crafted')}</span>
                </div>
                
                <Link href={`/products/${slug}`} className={styles.exploreLink}>
                  {t('product.story.explore')} 
                  <svg className={styles.arrowIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className={styles.storyBackground}></div>
          </div>
        </div>

        {/* Mobile Description (shown only on mobile) */}
        <div className={styles.mobileDescriptionSection}>
          <p className={styles.descriptionText}>
            {getFirstParagraph(product?.description || '')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;
