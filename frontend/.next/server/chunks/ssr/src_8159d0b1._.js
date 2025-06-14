module.exports = {

"[project]/src/app/home.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "home-module__Hx0lNG__active",
  "add-to-cart-button": "home-module__Hx0lNG__add-to-cart-button",
  "addToCartButton": "home-module__Hx0lNG__addToCartButton",
  "bounce": "home-module__Hx0lNG__bounce",
  "clickableSlide": "home-module__Hx0lNG__clickableSlide",
  "collection-section": "home-module__Hx0lNG__collection-section",
  "collection-title": "home-module__Hx0lNG__collection-title",
  "imageContainer": "home-module__Hx0lNG__imageContainer",
  "page-container": "home-module__Hx0lNG__page-container",
  "product-card": "home-module__Hx0lNG__product-card",
  "product-grid": "home-module__Hx0lNG__product-grid",
  "product-image": "home-module__Hx0lNG__product-image",
  "product-image-container": "home-module__Hx0lNG__product-image-container",
  "product-name": "home-module__Hx0lNG__product-name",
  "product-price": "home-module__Hx0lNG__product-price",
  "productCard": "home-module__Hx0lNG__productCard",
  "productCardSkeleton": "home-module__Hx0lNG__productCardSkeleton",
  "productGrid": "home-module__Hx0lNG__productGrid",
  "productGridLoading": "home-module__Hx0lNG__productGridLoading",
  "productImage": "home-module__Hx0lNG__productImage",
  "productImageContainer": "home-module__Hx0lNG__productImageContainer",
  "productName": "home-module__Hx0lNG__productName",
  "productPrice": "home-module__Hx0lNG__productPrice",
  "productsContainer": "home-module__Hx0lNG__productsContainer",
  "productsLoading": "home-module__Hx0lNG__productsLoading",
  "scrollArrow": "home-module__Hx0lNG__scrollArrow",
  "scrollIndicator": "home-module__Hx0lNG__scrollIndicator",
  "sectionLoading": "home-module__Hx0lNG__sectionLoading",
  "skeletonLoading": "home-module__Hx0lNG__skeletonLoading",
  "slide": "home-module__Hx0lNG__slide",
  "slideButton": "home-module__Hx0lNG__slideButton",
  "slideCaption": "home-module__Hx0lNG__slideCaption",
  "slider-controls": "home-module__Hx0lNG__slider-controls",
  "slider-dot": "home-module__Hx0lNG__slider-dot",
  "slider-section": "home-module__Hx0lNG__slider-section",
  "sliderContainer": "home-module__Hx0lNG__sliderContainer",
  "sliderImage": "home-module__Hx0lNG__sliderImage",
  "sliderLoading": "home-module__Hx0lNG__sliderLoading",
  "sliderLoadingContent": "home-module__Hx0lNG__sliderLoadingContent",
  "sliderSection": "home-module__Hx0lNG__sliderSection",
});
}}),
"[project]/src/services/productService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Product Service for handling API calls to the products endpoints
__turbopack_context__.s({
    "categoryToSliderItem": (()=>categoryToSliderItem),
    "getCategories": (()=>getCategories),
    "getProductBySlug": (()=>getProductBySlug),
    "getProducts": (()=>getProducts),
    "getProductsByCategory": (()=>getProductsByCategory)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
;
const categoryToSliderItem = (category, index)=>{
    // Use category image if available, otherwise use a placeholder
    const imageSrc = category.image || '/placeholder-slider.jpg';
    return {
        id: category.id || index + 1,
        type: 'image',
        src: imageSrc,
        alt: category.name || `Category ${index + 1}`,
        slug: category.slug,
        title: category.name,
        description: category.description || 'Explore our collection'
    };
};
async function getProducts() {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/products/');
        // Return the results array from the paginated response
        return response.data.results || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // Return empty array on error
    }
}
async function getProductBySlug(slug) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/products/${slug}/`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error(`Error fetching product with slug ${slug}:`, error);
        return null;
    }
}
async function getCategories(featured) {
    try {
        let url = '/categories/';
        if (featured) {
            url += '?is_featured=true';
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(url);
        return response.data.results || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return []; // Return empty array on error
    }
}
async function getProductsByCategory(categorySlug) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(`/products/?category__slug=${categorySlug}`);
        return response.data.results || [];
    } catch (error) {
        console.error(`Error fetching products for category ${categorySlug}:`, error);
        return []; // Return empty array on error
    }
}
}}),
"[project]/src/components/ImageSlider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/home.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
const ImageSlider = ({ items })=>{
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Add a client-side only flag to handle hydration
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Mark component as client-side rendered after mount
        setIsClient(true);
        const timer = setTimeout(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex + 1) % items.length);
        }, 5000);
        return ()=>clearTimeout(timer);
    }, [
        currentIndex,
        items.length
    ]);
    // Add a function to handle clicks on slides
    // const handleSlideClick = (slug?: string) => {
    //   if (slug) {
    //     window.location.href = `/categories/${slug}`;
    //   }
    // };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sliderSection,
        children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].slide} ${index === currentIndex ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                children: item.type === 'image' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            src: item.src,
                            alt: item.alt,
                            fill: true,
                            sizes: "100vw",
                            style: {
                                objectFit: 'cover'
                            },
                            priority: index === 0,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sliderImage
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImageSlider.tsx",
                            lineNumber: 62,
                            columnNumber: 15
                        }, this),
                        "              ",
                        (item.title || item.description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].slideCaption
                        }, void 0, false, {
                            fileName: "[project]/src/components/ImageSlider.tsx",
                            lineNumber: 71,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ImageSlider.tsx",
                    lineNumber: 61,
                    columnNumber: 13
                }, this)
            }, item.id, false, {
                fileName: "[project]/src/components/ImageSlider.tsx",
                lineNumber: 46,
                columnNumber: 44
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ImageSlider.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ImageSlider;
}}),
"[project]/src/components/SafeImage.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const SafeImage = ({ src, alt, width, height, className, priority = false })=>{
    const [imageSrc, setImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(src);
    const [hasError, setHasError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleError = ()=>{
        if (!hasError) {
            setHasError(true);
            setImageSrc('/placeholder-product.jpg');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        src: imageSrc,
        alt: alt,
        width: width,
        height: height,
        className: className,
        priority: priority,
        onError: handleError
    }, void 0, false, {
        fileName: "[project]/src/components/SafeImage.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = SafeImage;
}}),
"[project]/src/utils/variantUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "calculateVariantPrice": (()=>calculateVariantPrice),
    "findMatchingVariant": (()=>findMatchingVariant),
    "getVariantDisplayName": (()=>getVariantDisplayName)
});
const findMatchingVariant = (product, selectedColor, selectedSize)=>{
    if (!product.variants || product.variants.length === 0) {
        return undefined;
    }
    // Try to find an exact match first (both color and size)
    if (selectedColor && selectedSize) {
        const exactMatch = product.variants.find((variant)=>{
            const colorMatch = variant.color_info?.hex_code === selectedColor || variant.color_info?.name === selectedColor || variant.attributes?.color === selectedColor;
            const sizeMatch = variant.size_info?.name === selectedSize || variant.attributes?.size === selectedSize;
            return colorMatch && sizeMatch;
        });
        if (exactMatch) return exactMatch;
    }
    // Try to find a color match
    if (selectedColor) {
        const colorMatch = product.variants.find((variant)=>{
            return variant.color_info?.hex_code === selectedColor || variant.color_info?.name === selectedColor || variant.attributes?.color === selectedColor;
        });
        if (colorMatch) return colorMatch;
    }
    // Try to find a size match
    if (selectedSize) {
        const sizeMatch = product.variants.find((variant)=>{
            return variant.size_info?.name === selectedSize || variant.attributes?.size === selectedSize;
        });
        if (sizeMatch) return sizeMatch;
    }
    // Return the first active variant as fallback
    return product.variants.find((variant)=>variant.is_active) || product.variants[0];
};
const calculateVariantPrice = (product, variant)=>{
    const basePrice = parseFloat(product.base_price);
    const additionalPrice = variant ? parseFloat(variant.additional_price) : 0;
    return basePrice + additionalPrice;
};
const getVariantDisplayName = (product, variant)=>{
    if (!variant) return product.name;
    const parts = [
        product.name
    ];
    if (variant.size_info?.name) {
        parts.push(variant.size_info.name);
    }
    if (variant.color_info?.name) {
        parts.push(variant.color_info.name);
    }
    if (variant.name_suffix) {
        parts.push(variant.name_suffix);
    }
    return parts.join(' - ');
};
}}),
"[project]/src/components/ProductCard.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "addToCartButton": "ProductCard-module__t53O_a__addToCartButton",
  "colorOptions": "ProductCard-module__t53O_a__colorOptions",
  "colorSwatch": "ProductCard-module__t53O_a__colorSwatch",
  "imageContainer": "ProductCard-module__t53O_a__imageContainer",
  "loading": "ProductCard-module__t53O_a__loading",
  "price": "ProductCard-module__t53O_a__price",
  "priceContainer": "ProductCard-module__t53O_a__priceContainer",
  "productCard": "ProductCard-module__t53O_a__productCard",
  "productImage": "ProductCard-module__t53O_a__productImage",
  "productInfo": "ProductCard-module__t53O_a__productInfo",
  "productName": "ProductCard-module__t53O_a__productName",
  "quickAddButton": "ProductCard-module__t53O_a__quickAddButton",
  "quickAddOverlay": "ProductCard-module__t53O_a__quickAddOverlay",
  "selectBounce": "ProductCard-module__t53O_a__selectBounce",
  "selectedColor": "ProductCard-module__t53O_a__selectedColor",
  "selectedSize": "ProductCard-module__t53O_a__selectedSize",
  "shimmer": "ProductCard-module__t53O_a__shimmer",
  "sizeButton": "ProductCard-module__t53O_a__sizeButton",
  "sizeOptions": "ProductCard-module__t53O_a__sizeOptions",
});
}}),
"[project]/src/components/ProductCard.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SafeImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SafeImage.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$variantUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/variantUtils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
;
const ProductCard = ({ id, name, slug, price, imageUrl, secondaryImageUrl, color, colorName, size, sizeName, availableColors = [], availableSizes = [], product })=>{
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const [selectedColor, setSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(color);
    const [selectedColorName, setSelectedColorName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(colorName);
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(size);
    const [selectedSizeName, setSelectedSizeName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(sizeName);
    const [selectedVariantId, setSelectedVariantId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [currentPrice, setCurrentPrice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(parseFloat(price));
    const [currentImageUrl, setCurrentImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(imageUrl);
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showQuickAdd, setShowQuickAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
    }, [
        product
    ]);
    // Function to update variant based on current selections
    const updateVariant = (newColor, newSize)=>{
        if (product) {
            const matchingVariant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$variantUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findMatchingVariant"])(product, newColor || selectedColor, newSize || selectedSize);
            if (matchingVariant) {
                setSelectedVariantId(matchingVariant.id);
                const newPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$variantUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateVariantPrice"])(product, matchingVariant);
                setCurrentPrice(newPrice);
                // Update image if variant has a specific image
                if (matchingVariant.image && matchingVariant.image !== currentImageUrl) {
                    setCurrentImageUrl(matchingVariant.image);
                }
            }
        }
    };
    const handleAddToCart = ()=>{
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
    */ }; // New Buy Now functionality
    const handleBuyNow = ()=>{
        // Redirect to checkout page with product information
        const params = new URLSearchParams({
            buyNow: 'true',
            productId: id.toString(),
            productName: name,
            productSlug: slug || '',
            image: currentImageUrl,
            ...product?.buy_now_link && {
                buyNowLink: product.buy_now_link
            },
            ...selectedVariantId && {
                variantId: selectedVariantId.toString()
            },
            ...selectedColor && {
                color: selectedColor
            },
            ...selectedColorName && {
                colorName: selectedColorName
            },
            ...selectedSize && {
                size: selectedSize
            },
            ...selectedSizeName && {
                sizeName: selectedSizeName
            },
            price: currentPrice.toString(),
            quantity: '1'
        });
        window.location.href = `/checkout?${params.toString()}`;
    };
    const handleColorSelect = (colorCode, colorName, colorImage, variantId)=>{
        setSelectedColor(colorCode);
        setSelectedColorName(colorName);
        // Update the displayed image if this color has an image
        if (colorImage) {
            setCurrentImageUrl(colorImage);
        }
        // Update variant based on new color selection
        updateVariant(colorCode, selectedSize);
    };
    const handleSizeSelect = (sizeCode, sizeName, variantId)=>{
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
    const handleQuickAdd = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        // Use Buy Now instead of Add to Cart
        handleBuyNow();
    };
    const isSelectionComplete = (availableColors.length === 0 || effectiveColor) && (availableSizes.length === 0 || effectiveSize);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productCard,
        onMouseEnter: ()=>setIsHovered(true),
        onMouseLeave: ()=>{
            setIsHovered(false);
            setShowQuickAdd(false);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: `/products/${slug}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageWrapper,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SafeImage$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: isHovered && secondaryImageUrl ? secondaryImageUrl : currentImageUrl,
                                alt: name,
                                width: 300,
                                height: 400,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productImage
                            }, void 0, false, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            isHovered && isSelectionComplete && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quickAddOverlay,
                                children: [
                                    "                ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quickAddButton,
                                        onClick: handleQuickAdd,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "16",
                                                height: "16",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M12 5V19M5 12H19",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ProductCard.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this),
                                            t('common.buyNow')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 193,
                                        columnNumber: 71
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this),
                            (availableColors.length > 1 || availableSizes.length > 1) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantBadge,
                                children: [
                                    availableColors.length > 1 && t('productCard.variants.colors', {
                                        count: availableColors.length
                                    }),
                                    availableColors.length > 1 && availableSizes.length > 1 && ' • ',
                                    availableSizes.length > 1 && t('productCard.variants.sizes', {
                                        count: availableSizes.length
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 206,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ProductCard.tsx",
                    lineNumber: 181,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProductCard.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productName,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: `/products/${slug}`,
                            children: name
                        }, void 0, false, {
                            fileName: "[project]/src/components/ProductCard.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].priceContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].currentPrice,
                                children: [
                                    currentPrice.toFixed(2),
                                    " ",
                                    t('product.price.currency')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this),
                            parseFloat(price) !== currentPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].originalPrice,
                                children: [
                                    parseFloat(price).toFixed(2),
                                    " ",
                                    t('product.price.currency')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    isClient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "            ",
                            availableColors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].colorSelection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectionHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectionLabel,
                                                children: [
                                                    t('product.variants.color'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 237,
                                                columnNumber: 19
                                            }, this),
                                            effectiveColorName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectedValue,
                                                children: effectiveColorName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 239,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 236,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].colorOptions,
                                        children: availableColors.map((colorOption, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].colorSwatch} ${colorOption.code === effectiveColor ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectedSwatch : ''}`,
                                                style: {
                                                    backgroundColor: colorOption.code
                                                },
                                                title: colorOption.name,
                                                onClick: ()=>handleColorSelect(colorOption.code, colorOption.name, colorOption.image, colorOption.id),
                                                children: colorOption.code === effectiveColor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checkmark,
                                                    width: "12",
                                                    height: "12",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 6L9 17L4 12",
                                                        stroke: "white",
                                                        strokeWidth: "3",
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/ProductCard.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ProductCard.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 25
                                                }, this)
                                            }, colorOption.id || index, false, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 244,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 242,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this),
                            "            ",
                            availableSizes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sizeSelection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectionHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectionLabel,
                                                children: [
                                                    t('product.variants.size'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 266,
                                                columnNumber: 19
                                            }, this),
                                            effectiveSizeName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectedValue,
                                                children: effectiveSizeName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 268,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 265,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sizeOptions,
                                        children: availableSizes.map((sizeOption, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sizeButton} ${sizeOption.code === effectiveSize ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectedSize : ''}`,
                                                onClick: ()=>handleSizeSelect(sizeOption.code, sizeOption.name, sizeOption.id),
                                                children: sizeOption.name
                                            }, sizeOption.id || index, false, {
                                                fileName: "[project]/src/components/ProductCard.tsx",
                                                lineNumber: 273,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ProductCard.tsx",
                                        lineNumber: 271,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ProductCard.tsx",
                                lineNumber: 264,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true),
                    "        ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addToCartButton} ${!isSelectionComplete ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addToCartDisabled : ''}`,
                        onClick: handleBuyNow,
                        disabled: !isSelectionComplete,
                        children: !isSelectionComplete ? t('common.selectOptions') : t('common.buyNow')
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProductCard.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProductCard.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProductCard.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ProductCard;
}}),
"[project]/src/components/LoadingCircle.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "bounce1": "LoadingCircle-module__d_8MDa__bounce1",
  "bounce2": "LoadingCircle-module__d_8MDa__bounce2",
  "bounce3": "LoadingCircle-module__d_8MDa__bounce3",
  "cardSkeleton": "LoadingCircle-module__d_8MDa__cardSkeleton",
  "circleSpinner": "LoadingCircle-module__d_8MDa__circleSpinner",
  "fullPageOverlay": "LoadingCircle-module__d_8MDa__fullPageOverlay",
  "gray": "LoadingCircle-module__d_8MDa__gray",
  "large": "LoadingCircle-module__d_8MDa__large",
  "loading": "LoadingCircle-module__d_8MDa__loading",
  "loadingContainer": "LoadingCircle-module__d_8MDa__loadingContainer",
  "loadingText": "LoadingCircle-module__d_8MDa__loadingText",
  "medium": "LoadingCircle-module__d_8MDa__medium",
  "primary": "LoadingCircle-module__d_8MDa__primary",
  "productCardSkeleton": "LoadingCircle-module__d_8MDa__productCardSkeleton",
  "productGridLoading": "LoadingCircle-module__d_8MDa__productGridLoading",
  "sectionLoading": "LoadingCircle-module__d_8MDa__sectionLoading",
  "sk-bouncedelay": "LoadingCircle-module__d_8MDa__sk-bouncedelay",
  "small": "LoadingCircle-module__d_8MDa__small",
  "spin": "LoadingCircle-module__d_8MDa__spin",
  "spinner": "LoadingCircle-module__d_8MDa__spinner",
  "white": "LoadingCircle-module__d_8MDa__white",
});
}}),
"[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.module.css [app-ssr] (css module)");
"use client";
;
;
const LoadingCircle = ({ size = 'medium', color = 'primary', text, className = '' })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingContainer} ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].spinner} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][size]} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"][color]}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce1
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce2
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].bounce3
                    }, void 0, false, {
                        fileName: "[project]/src/components/LoadingCircle.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LoadingCircle.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingText,
                children: text
            }, void 0, false, {
                fileName: "[project]/src/components/LoadingCircle.tsx",
                lineNumber: 26,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LoadingCircle.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LoadingCircle;
}}),
"[project]/src/utils/imageUtils.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "extractAvailableColors": (()=>extractAvailableColors),
    "extractAvailableSizes": (()=>extractAvailableSizes),
    "extractVariantInfo": (()=>extractVariantInfo),
    "getColorImageUrl": (()=>getColorImageUrl),
    "getPrimaryImageUrl": (()=>getPrimaryImageUrl),
    "getProductVariantInfo": (()=>getProductVariantInfo)
});
const getPrimaryImageUrl = (product)=>{
    try {
        // First try to get the primary image
        const primaryImage = product.images?.find((img)=>img.is_primary && img.image);
        if (primaryImage?.image) return primaryImage.image;
        // Fallback to the first image if no primary is set
        if (product.images?.length > 0 && product.images[0].image) return product.images[0].image;
        // Fallback for variant image if product has variants and the first variant has an image
        if (product.variants?.length > 0 && product.variants[0].image) return product.variants[0].image;
        // If no image is found, use a placeholder
        return '/placeholder-product.png'; // Generic placeholder
    } catch (error) {
        console.error('Error getting product image URL:', error);
        return '/placeholder-product.png'; // Return placeholder on error
    }
};
const getColorImageUrl = (product, colorCode)=>{
    try {
        // Look for a variant with matching color code
        const matchingVariant = product.variants?.find((variant)=>{
            const attributes = variant.attributes || {};
            return attributes.color === colorCode || attributes.colour === colorCode || attributes.color_code === colorCode;
        });
        // If we found a matching variant with an image, return it
        if (matchingVariant?.image) {
            return matchingVariant.image;
        }
        // Check if this variant has associated images
        if (matchingVariant?.images && matchingVariant.images.length > 0) {
            const primaryVariantImage = matchingVariant.images.find((img)=>img.is_primary);
            if (primaryVariantImage?.image) return primaryVariantImage.image;
            return matchingVariant.images[0].image;
        }
        // If we can't find a variant-specific image, fall back to the product's primary image
        return getPrimaryImageUrl(product);
    } catch (error) {
        console.error('Error getting color variant image URL:', error);
        return undefined;
    }
};
const extractVariantInfo = (variant)=>{
    // Use the structured size_info and color_info from the backend
    const sizeInfo = variant.size_info;
    const colorInfo = variant.color_info;
    // Fallback to attributes for legacy support
    const attributes = variant.attributes || {};
    // For color: prioritize color_info, then fallback to attributes
    let color;
    let colorName;
    if (colorInfo) {
        color = colorInfo.hex_code || `#${colorInfo.name.toLowerCase()}`;
        colorName = colorInfo.name;
    } else {
        // Fallback to attributes-based extraction
        color = attributes.color || attributes.colour || attributes.color_code;
        const isHexColor = typeof color === 'string' && (color.startsWith('#') || /^[0-9A-F]{6}$/i.test(color));
        colorName = attributes.color_name || attributes.colour_name || (!isHexColor && typeof color === 'string' ? color : undefined);
    }
    // For size: prioritize size_info, then fallback to attributes
    let size;
    let sizeName;
    if (sizeInfo) {
        size = sizeInfo.name;
        sizeName = sizeInfo.name;
    } else {
        // Fallback to attributes-based extraction
        size = attributes.size;
        sizeName = attributes.size_name || attributes.size;
    }
    return {
        color,
        colorName,
        size,
        sizeName,
        image: variant.image,
        variantId: variant.id // Include variant ID for cart operations
    };
};
const getProductVariantInfo = (product)=>{
    if (!product.variants || product.variants.length === 0) {
        return {
            color: undefined,
            colorName: undefined,
            size: undefined,
            sizeName: undefined,
            image: undefined,
            variantId: undefined
        };
    }
    // Try to find a variant with color or size information
    for (const variant of product.variants){
        const info = extractVariantInfo(variant);
        if (info.color || info.size) {
            return info;
        }
    }
    // Default to first variant if none have color/size
    return extractVariantInfo(product.variants[0]);
};
const extractAvailableColors = (product)=>{
    if (!product.variants || product.variants.length === 0) {
        return [];
    }
    const colorMap = new Map(); // Use Map to ensure uniqueness
    product.variants.forEach((variant)=>{
        const { color, colorName, image, variantId } = extractVariantInfo(variant);
        if (color && !colorMap.has(color)) {
            colorMap.set(color, {
                id: variantId,
                code: color,
                name: colorName || color,
                image: image || getColorImageUrl(product, color)
            });
        }
    });
    return Array.from(colorMap.values());
};
const extractAvailableSizes = (product)=>{
    if (!product.variants || product.variants.length === 0) {
        return [];
    }
    const sizeMap = new Map(); // Use Map to ensure uniqueness
    product.variants.forEach((variant)=>{
        const { size, sizeName, variantId } = extractVariantInfo(variant);
        if (size && !sizeMap.has(size)) {
            sizeMap.set(size, {
                id: variantId,
                code: size,
                name: sizeName || size
            });
        }
    });
    return Array.from(sizeMap.values());
};
}}),
"[project]/src/components/ProductGrid.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/imageUtils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const ProductGrid = ({ products, styles = {}, isLoading = false })=>{
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const [isImageLoading, setIsImageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (products && products.length > 0) {
            // Simulate image loading delay
            const timer = setTimeout(()=>{
                setIsImageLoading(false);
            }, 500);
            return ()=>clearTimeout(timer);
        }
    }, [
        products
    ]);
    if (isLoading || isImageLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: styles.sectionLoading || 'sectionLoading',
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                size: "medium",
                color: "primary",
                text: t('home.loading.products')
            }, void 0, false, {
                fileName: "[project]/src/components/ProductGrid.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProductGrid.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    if (!products || products.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: t('home.noProducts')
        }, void 0, false, {
            fileName: "[project]/src/components/ProductGrid.tsx",
            lineNumber: 51,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: styles.productGrid || '',
        children: products.map((product)=>{
            const { color, colorName, size, sizeName } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductVariantInfo"])(product);
            const availableColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractAvailableColors"])(product);
            const availableSizes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["extractAvailableSizes"])(product);
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.base_price,
                imageUrl: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$imageUtils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getPrimaryImageUrl"])(product),
                color: color,
                colorName: colorName,
                size: size,
                sizeName: sizeName,
                availableColors: availableColors,
                availableSizes: availableSizes,
                product: product
            }, product.id, false, {
                fileName: "[project]/src/components/ProductGrid.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/ProductGrid.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = ProductGrid;
}}),
"[project]/src/components/HomePageClient.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/home.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/productService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageSlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ImageSlider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProductGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
const HomePageClient = ()=>{
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    // Fallback slider items in case we don't get any categories with images
    const fallbackSliderItems = [
        {
            id: 1,
            type: 'image',
            src: '/placeholder-slider-1.jpg',
            alt: t('home.slider.promo1Alt'),
            slug: 'promo-1',
            title: t('home.slider.promo1Title'),
            description: t('home.slider.promo1Description')
        },
        {
            id: 2,
            type: 'image',
            src: '/placeholder-slider-2.jpg',
            alt: t('home.slider.promo2Alt'),
            slug: 'promo-2',
            title: t('home.slider.promo2Title'),
            description: t('home.slider.promo2Description')
        },
        {
            id: 3,
            type: 'image',
            src: '/placeholder-slider-3.jpg',
            alt: t('home.slider.newCollectionAlt'),
            slug: 'new-collection',
            title: t('home.slider.newCollectionTitle'),
            description: t('home.slider.newCollectionDescription')
        }
    ];
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sliderItems, setSliderItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingSlider, setIsLoadingSlider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingProducts, setIsLoadingProducts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = async ()=>{
            try {
                // Load slider data first
                setIsLoadingSlider(true);
                const categories = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCategories"])(true);
                // Create slider items from categories with images
                let items = categories.filter((category)=>category.image).map((category, index)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryToSliderItem"])(category, index));
                // If no categories with images were found, use fallback images
                if (items.length === 0) {
                    items = fallbackSliderItems;
                }
                setSliderItems(items);
                setIsLoadingSlider(false);
                // Load products
                setIsLoadingProducts(true);
                const productsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProducts"])();
                setProducts(productsData);
                setIsLoadingProducts(false);
            } catch (err) {
                console.error('Error loading homepage data:', err);
                setError(t('common.error'));
                setIsLoadingSlider(false);
                setIsLoadingProducts(false);
            }
        };
        loadData();
    }, []);
    const groupedProducts = products.reduce((acc, product)=>{
        const categoryName = product.category_name || 'Uncategorized';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {});
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"]["page-container"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mb-6 text-red-600",
                        children: t('home.error.title')
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xl text-gray-600 mb-8",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>window.location.reload(),
                        className: "btn-primary text-lg py-3 px-8",
                        children: t('home.error.button')
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomePageClient.tsx",
                lineNumber: 75,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/HomePageClient.tsx",
            lineNumber: 74,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"]["page-container"],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sliderContainer,
                children: [
                    "        ",
                    isLoadingSlider ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sliderLoading,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            size: "large",
                            color: "white",
                            text: t('home.loading.slider'),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sliderLoadingContent
                        }, void 0, false, {
                            fileName: "[project]/src/components/HomePageClient.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ImageSlider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        items: sliderItems
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 106,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomePageClient.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productsContainer,
                children: [
                    "        ",
                    isLoadingProducts ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productsLoading,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: "large",
                                color: "primary",
                                text: t('home.loading.products')
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomePageClient.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productGridLoading,
                                children: [
                                    ...Array(8)
                                ].map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productCardSkeleton
                                    }, index, false, {
                                        fileName: "[project]/src/components/HomePageClient.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/HomePageClient.tsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomePageClient.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            Object.entries(groupedProducts).map(([categoryName, productsInCategory])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"]["collection-section"],
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"]["collection-title"],
                                            children: categoryName
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomePageClient.tsx",
                                            lineNumber: 129,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProductGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            products: productsInCategory,
                                            styles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$home$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"]
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomePageClient.tsx",
                                            lineNumber: 130,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, categoryName, true, {
                                    fileName: "[project]/src/components/HomePageClient.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)),
                            products.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center py-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold mb-6 text-brand-navy",
                                        children: [
                                            t('home.welcome.title'),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-brand-malikli-blue",
                                                children: "1992"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HomePageClient.tsx",
                                                lineNumber: 138,
                                                columnNumber: 44
                                            }, this),
                                            "!"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HomePageClient.tsx",
                                        lineNumber: 137,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-brand-charcoal mb-8",
                                        children: t('home.welcome.subtitle')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomePageClient.tsx",
                                        lineNumber: 140,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/drops",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "btn-primary text-lg py-3 px-8",
                                            children: t('home.welcome.viewDrops')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HomePageClient.tsx",
                                            lineNumber: 144,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HomePageClient.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HomePageClient.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomePageClient.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HomePageClient.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = HomePageClient;
}}),

};

//# sourceMappingURL=src_8159d0b1._.js.map