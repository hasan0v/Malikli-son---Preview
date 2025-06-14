'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ProductVariant, ProductImage } from '@/types/product';
import { getProductBySlug } from '@/services/productService';
import { addToCart, addToCartAPI } from '@/store/cartSlice';
import { RootState, AppDispatch } from '@/store/store';
import LoadingCircle from '@/components/LoadingCircle';
import { useI18n } from '../../../hooks/useI18n';
import styles from './productDetail.module.css';

// Types for variants with extended information from our backend
interface VariantWithExtendedInfo extends ProductVariant {
  size_info?: { id: number; name: string; display_order: number };
  color_info?: { id: number; name: string; hex_code: string; display_order: number };
}

export default function ProductDetailPage() {  const { t } = useI18n();
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  // Get auth state to determine which add-to-cart strategy to use
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
  // State
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantWithExtendedInfo | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageLoading, setImageLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {      if (!slug || typeof slug !== 'string') {
        setError(t('product.error.invalidSlug'));
        setLoading(false);
        return;
      }

      try {
        const productData = await getProductBySlug(slug);
        if (!productData) {
          setError(t('product.error.notFound'));
          setLoading(false);
          return;
        }

        setProduct(productData);
        
        // Set default selected image
        if (productData.images && productData.images.length > 0) {
          const primaryImage = productData.images.find(img => img.is_primary);
          setSelectedImage(primaryImage ? primaryImage.image : productData.images[0].image);
        }

        // If there are variants, initialize the UI
        if (productData.variants && productData.variants.length > 0) {
          // Get available sizes and colors
          processVariants(productData.variants as VariantWithExtendedInfo[]);
        }        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(t('common.error'));
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // Process variants to extract sizes and colors
  const processVariants = (variants: VariantWithExtendedInfo[]) => {
    // Handle the case where there's only one variant by selecting it
    if (variants.length === 1) {
      setSelectedVariant(variants[0]);
      if (variants[0].size_info) {
        setSelectedSize(variants[0].size_info.id);
      }
      if (variants[0].color_info) {
        setSelectedColor(variants[0].color_info.id);
      }
      return;
    }

    // If multiple variants, check if we have a default
    const defaultVariant = variants.find(v => v.is_active);
    if (defaultVariant) {
      setSelectedVariant(defaultVariant);
      if (defaultVariant.size_info) {
        setSelectedSize(defaultVariant.size_info.id);
      }
      if (defaultVariant.color_info) {
        setSelectedColor(defaultVariant.color_info.id);
      }
    }
  };
  // Handle variant selection
  useEffect(() => {
    if (!product || !product.variants) return;
    
    // Find the variant that matches both the selected size and color
    const matchingVariant = (product.variants as VariantWithExtendedInfo[]).find(variant => {
      const sizeMatch = selectedSize === null || (variant.size_info && variant.size_info.id === selectedSize);
      const colorMatch = selectedColor === null || (variant.color_info && variant.color_info.id === selectedColor);
      return sizeMatch && colorMatch;
    });
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
      
      // If the variant has its own image, use that
      if (matchingVariant.image) {
        setImageLoading(true);
        setSelectedImage(matchingVariant.image);
      } else if (matchingVariant.images && matchingVariant.images.length > 0) {
        setImageLoading(true);
        const primaryVariantImage = matchingVariant.images.find(img => img.is_primary);
        setSelectedImage(primaryVariantImage ? primaryVariantImage.image : matchingVariant.images[0].image);
      }
    }
  }, [selectedSize, selectedColor, product]);

  // Handle image selection with loading
  const handleImageSelect = (imageUrl: string) => {
    setImageLoading(true);
    setSelectedImage(imageUrl);
  };

  // Handle zoom functionality
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { left, top, width, height } = container.getBoundingClientRect();
    
    // Calculate position in percentage
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setMousePosition({ x, y });
  };

  // Handle quantity changes
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };  // Add to cart - commented out but preserved
  const handleAddToCart = async () => {
    // Original Add to Cart functionality is commented out but preserved for future use
    console.log('Add to Cart functionality is currently disabled in favor of Buy Now');
  };

  // New Buy Now functionality
  const handleBuyNow = async () => {
    if (!product) return;

    setAddingToCart(true);

    try {
      // Calculate the final price
      const finalPrice = selectedVariant 
        ? parseFloat(product.base_price) + parseFloat(selectedVariant.additional_price)
        : parseFloat(product.base_price);

      // Redirect to checkout with product information
      const params = new URLSearchParams({
        buyNow: 'true',
        productId: product.id.toString(),
        productName: product.name,
        productSlug: product.slug,
        price: finalPrice.toString(),
        quantity: quantity.toString(),
        ...(selectedVariant?.id && { variantId: selectedVariant.id.toString() }),
        ...(selectedImage && { image: selectedImage }),
        ...(selectedVariant?.color_info && { 
          color: selectedVariant.color_info.name,
          colorCode: selectedVariant.color_info.hex_code 
        }),        ...(selectedVariant?.size_info && { size: selectedVariant.size_info.name }),
        ...(product.buy_now_link && { buyNowLink: product.buy_now_link })
      });

      console.log('=== BUY NOW DEBUG - PRODUCT PAGE ===');
      console.log('product.buy_now_link:', product.buy_now_link);
      console.log('buyNowLink in params:', product.buy_now_link ? 'YES' : 'NO');
      console.log('Final URL params:', params.toString());window.location.href = `/checkout?${params.toString()}`;
    } catch (error) {
      console.error('Error processing Buy Now:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  // No wishlist functionality needed

  // Generate size options from the variants
  const renderSizeOptions = () => {
    if (!product || !product.variants) return null;

    // Extract unique size options from variants
    const uniqueSizes = new Map();
    (product.variants as VariantWithExtendedInfo[]).forEach(variant => {
      if (variant.size_info) {
        uniqueSizes.set(variant.size_info.id, variant.size_info);
      }
    });

    const sizes = Array.from(uniqueSizes.values());
    
    // If there are no sizes, don't render this section
    if (sizes.length === 0) return null;    return (
      <div className={styles.variantSection}>
        <div className={styles.variantTitle}>{t('product.variants.size')}</div>
        <div className={styles.variantOptions}>
          {sizes.sort((a, b) => a.display_order - b.display_order).map(size => (
            <div 
              key={size.id}
              className={`${styles.sizeOption} ${selectedSize === size.id ? styles.selected : ''}`}
              onClick={() => setSelectedSize(size.id)}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Generate color options from the variants
  const renderColorOptions = () => {
    if (!product || !product.variants) return null;

    // Extract unique color options from variants
    const uniqueColors = new Map();
    (product.variants as VariantWithExtendedInfo[]).forEach(variant => {
      if (variant.color_info) {
        uniqueColors.set(variant.color_info.id, variant.color_info);
      }
    });

    const colors = Array.from(uniqueColors.values());
    
    // If there are no colors, don't render this section
    if (colors.length === 0) return null;    return (
      <div className={styles.variantSection}>
        <div className={styles.variantTitle}>{t('product.variants.color')}</div>
        <div className={styles.variantOptions}>
          {colors.sort((a, b) => a.display_order - b.display_order).map(color => (
            <div 
              key={color.id}
              className={`${styles.colorOption} ${selectedColor === color.id ? styles.selected : ''}`}
              style={{ backgroundColor: color.hex_code || '#000000' }}
              onClick={() => setSelectedColor(color.id)}
              title={color.name}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render selected variant info
  const renderSelectedVariantInfo = () => {
    if (!selectedVariant) return null;

    return (      <div className={styles.selectedVariantInfo}>        {selectedVariant.size_info && (
          <div className={styles.variantInfoItem}>
            <span className={styles.variantInfoLabel}>{t('product.variants.selectedInfo.size')}</span>
            <span className={styles.variantInfoValue}>{selectedVariant.size_info.name}</span>
          </div>
        )}
        {selectedVariant.color_info && (
          <div className={styles.variantInfoItem}>
            <span className={styles.variantInfoLabel}>{t('product.variants.selectedInfo.color')}</span>
            <span className={styles.variantInfoValue}>
              {selectedVariant.color_info.hex_code && (
                <span 
                  className={styles.colorPreview} 
                  style={{ backgroundColor: selectedVariant.color_info.hex_code }}
                ></span>
              )}
              {selectedVariant.color_info.name}
            </span>
          </div>
        )}
        {selectedVariant.name_suffix && (
          <div className={styles.variantInfoItem}>
            <span className={styles.variantInfoLabel}>{t('product.variants.selectedInfo.variant')}</span>
            <span className={styles.variantInfoValue}>{selectedVariant.name_suffix}</span>
          </div>
        )}
      </div>
    );
  };

  // Predefined widths for skeleton elements to prevent hydration errors
  const skeletonWidths = [85, 92, 78, 88, 80]; // Fixed percentages instead of random values
    // Render loading state
  if (loading) {
    return (      <div className={styles.loadingContainer}>
        <LoadingCircle 
          size="large" 
          color="primary" 
          text={t('product.loading.text')} 
        />
        {/* Skeleton fallback for better UX */}
        <div className={styles.skeletonFallback}>
          <div className={styles.productContainer}>
            <div className={styles.galleryContainer}>
              <div className={`${styles.skeletonMainImage} ${styles.skeleton}`}></div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`${styles.skeletonThumbnail} ${styles.skeleton}`}></div>
                ))}
              </div>
            </div>
            <div>
              <div className={`${styles.skeletonTitle} ${styles.skeleton}`}></div>
              <div className={`${styles.skeletonPrice} ${styles.skeleton}`}></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className={`${styles.skeletonText} ${styles.skeleton}`} style={{ width: `${skeletonWidths[i-1]}%` }}></div>
              ))}
              <div className={`${styles.skeletonButton} ${styles.skeleton}`}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Render error state
  if (error) {
    return (      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>{t('product.error.somethingWrong')}</h1>
        <p className={styles.errorMessage}>{error}</p>
        <button className={styles.errorButton} onClick={() => router.push('/')}>
          {t('product.error.backToHome')}
        </button>
      </div>
    );
  }

  // Render product not found
  if (!product) {
    return (      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>{t('product.error.notFound')}</h1>
        <p className={styles.errorMessage}>{t('product.error.notFoundMessage')}</p>
        <button className={styles.errorButton} onClick={() => router.push('/')}>
          {t('product.error.backToHome')}
        </button>
      </div>
    );
  }

  // Calculate the effective price (base price + variant additional price)
  const effectivePrice = selectedVariant 
    ? (parseFloat(product.base_price) + parseFloat(selectedVariant.additional_price)).toFixed(2)
    : product.base_price;
  // Define availability status and classes to prevent hydration issues
  const productStatus = 'in-stock'; // Can be changed based on inventory logic
  const availabilityDotClass = styles.inStock; // Default to in-stock
  const availabilityTextClass = styles.inStockText; // Default to in-stock
  const availabilityLabel = 'In Stock'; // Default label
  const isOutOfStock = false; // Default to in-stock
    return (
    <>
      <div className={styles.productContainer}>{/* Left column: Gallery */}
        <div className={styles.galleryContainer}>
          <div 
            className={styles.mainImageContainer}
            onMouseMove={handleImageMouseMove}
          >
            {imageLoading && (
              <div className={styles.imageLoadingOverlay}>
                <LoadingCircle size="medium" color="primary" />
              </div>
            )}
            <Image 
              src={selectedImage || product.images[0]?.image || '/placeholder-product.jpg'} 
              alt={product.name}
              fill
              className={styles.mainImage}
              style={{ 
                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                opacity: imageLoading ? 0.3 : 1
              }}
              onLoad={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
            <div className={styles.zoomOverlay}></div>
          </div>
          <div className={styles.thumbnailsContainer}>
            {product.images.map((image) => (
              <div 
                key={image.id}
                className={`${styles.thumbnailWrapper} ${selectedImage === image.image ? styles.active : ''}`}
                onClick={() => handleImageSelect(image.image)}
              >
                <Image 
                  src={image.image} 
                  alt={image.alt_text || product.name}
                  width={80}
                  height={80}
                  className={styles.thumbnail}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Product Info */}
        <div className={styles.productInfo}>          {/* Breadcrumbs */}
          <div className={styles.breadcrumbs}>
            <Link href="/" className={styles.breadcrumbItem}>{t('product.breadcrumbs.home')}</Link>
            <span className={styles.breadcrumbSeparator}>/</span>
            {product.category_name && (
              <>
                <Link href={`/categories/${product.slug}`} className={styles.breadcrumbItem}>
                  {product.category_name}
                </Link>
                <span className={styles.breadcrumbSeparator}>/</span>
              </>
            )}
            <span className={styles.breadcrumbItem}>{product.name}</span>
          </div>

          {/* Product Title */}
          <h1 className={styles.productName}>{product.name}</h1>          {/* Price */}
          <div className={styles.priceContainer}>
            <span className={styles.price}>{effectivePrice} {t('product.price.currency')}</span>
          </div>

          {/* Availability */}
          <div className={styles.availabilitySection}>
            <div className={`${styles.availabilityDot} ${availabilityDotClass}`}></div>            <span className={`${styles.availabilityText} ${availabilityTextClass}`}>
              {t('product.availability.inStock')}
            </span>
          </div>

          {/* Description */}
          <div className={styles.description}>            {product.description || t('product.description.noDescription')}
          </div>

          <div className={styles.divider}></div>

          {/* Size Options */}
          {renderSizeOptions()}

          {/* Color Options */}
          {renderColorOptions()}

          {/* Selected Variant Info */}
          {renderSelectedVariantInfo()}          {/* Quantity Selector */}
          {/* <div className={styles.quantityWrapper}>
            <span className={styles.quantityLabel}>{t('product.quantity.label')}</span>
            <div className={styles.quantityControls}>
              <button className={styles.quantityButton} onClick={decreaseQuantity}>-</button>
              <input 
                type="number" 
                className={styles.quantityInput} 
                value={quantity} 
                onChange={handleQuantityChange}
                min="1"
              />
              <button className={styles.quantityButton} onClick={increaseQuantity}>+</button>
            </div>
          </div>    */}
          {/* CTA Buttons */}
          <div className={styles.ctaSection}>
            {/* Buy Now Button - replaced Add to Cart */}
            <button 
              className={`${styles.addToCartButton} ${addingToCart ? styles.loading : ''}`}
              onClick={handleBuyNow}
              disabled={isOutOfStock || addingToCart}
            >              {addingToCart ? (
                <>
                  <LoadingCircle size="small" color="white" />
                  <span>{t('product.buttons.processing')}</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3h2l.4 2m0 0L7 13h10l4-8H5.4z"></path>
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                  </svg>
                  {t('product.buttons.buyNow')}
                </>
              )}
            </button>
              {/* Original Add to Cart Button - commented out but preserved
            <button 
              className={`${styles.addToCartButton} ${addingToCart ? styles.loading : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || addingToCart}
            >
              {addingToCart ? (
                <>
                  <LoadingCircle size="small" color="white" />
                  <span>Добавляем...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  В корзину
                </>
              )}
            </button>
            */}          </div>
        </div>
      </div>
      
      {/* Related Products Section - commented out for now */}
      {/* 
      <div className={styles.relatedProductsSection}>
        <h2 className={styles.sectionTitle}>{t('product.relatedProducts.title')}</h2>
        <div className={styles.productGrid}>
          Related products would be rendered here
        </div>
      </div> 
      */}
    </>
  );
}
