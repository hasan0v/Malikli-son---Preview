module.exports = {

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
"[project]/src/app/products/[slug]/productDetail.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "productDetail-module__VFscRa__active",
  "addToCartButton": "productDetail-module__VFscRa__addToCartButton",
  "additionalInfoSection": "productDetail-module__VFscRa__additionalInfoSection",
  "availabilityDot": "productDetail-module__VFscRa__availabilityDot",
  "availabilitySection": "productDetail-module__VFscRa__availabilitySection",
  "availabilityText": "productDetail-module__VFscRa__availabilityText",
  "breadcrumbItem": "productDetail-module__VFscRa__breadcrumbItem",
  "breadcrumbSeparator": "productDetail-module__VFscRa__breadcrumbSeparator",
  "breadcrumbs": "productDetail-module__VFscRa__breadcrumbs",
  "colorOption": "productDetail-module__VFscRa__colorOption",
  "colorPreview": "productDetail-module__VFscRa__colorPreview",
  "ctaSection": "productDetail-module__VFscRa__ctaSection",
  "description": "productDetail-module__VFscRa__description",
  "descriptionContent": "productDetail-module__VFscRa__descriptionContent",
  "descriptionHeader": "productDetail-module__VFscRa__descriptionHeader",
  "discount": "productDetail-module__VFscRa__discount",
  "divider": "productDetail-module__VFscRa__divider",
  "errorButton": "productDetail-module__VFscRa__errorButton",
  "errorContainer": "productDetail-module__VFscRa__errorContainer",
  "errorMessage": "productDetail-module__VFscRa__errorMessage",
  "errorTitle": "productDetail-module__VFscRa__errorTitle",
  "galleryContainer": "productDetail-module__VFscRa__galleryContainer",
  "imageLoadingOverlay": "productDetail-module__VFscRa__imageLoadingOverlay",
  "inStock": "productDetail-module__VFscRa__inStock",
  "inStockText": "productDetail-module__VFscRa__inStockText",
  "loading": "productDetail-module__VFscRa__loading",
  "loadingContainer": "productDetail-module__VFscRa__loadingContainer",
  "lowStock": "productDetail-module__VFscRa__lowStock",
  "lowStockText": "productDetail-module__VFscRa__lowStockText",
  "mainImage": "productDetail-module__VFscRa__mainImage",
  "mainImageContainer": "productDetail-module__VFscRa__mainImageContainer",
  "originalPrice": "productDetail-module__VFscRa__originalPrice",
  "outOfStock": "productDetail-module__VFscRa__outOfStock",
  "outOfStockText": "productDetail-module__VFscRa__outOfStockText",
  "price": "productDetail-module__VFscRa__price",
  "priceContainer": "productDetail-module__VFscRa__priceContainer",
  "productContainer": "productDetail-module__VFscRa__productContainer",
  "productGrid": "productDetail-module__VFscRa__productGrid",
  "productInfo": "productDetail-module__VFscRa__productInfo",
  "productName": "productDetail-module__VFscRa__productName",
  "pulse": "productDetail-module__VFscRa__pulse",
  "quantityButton": "productDetail-module__VFscRa__quantityButton",
  "quantityControls": "productDetail-module__VFscRa__quantityControls",
  "quantityInput": "productDetail-module__VFscRa__quantityInput",
  "quantityLabel": "productDetail-module__VFscRa__quantityLabel",
  "quantityWrapper": "productDetail-module__VFscRa__quantityWrapper",
  "relatedProductsSection": "productDetail-module__VFscRa__relatedProductsSection",
  "sectionTitle": "productDetail-module__VFscRa__sectionTitle",
  "selected": "productDetail-module__VFscRa__selected",
  "selectedVariantInfo": "productDetail-module__VFscRa__selectedVariantInfo",
  "shimmer": "productDetail-module__VFscRa__shimmer",
  "sizeOption": "productDetail-module__VFscRa__sizeOption",
  "skeleton": "productDetail-module__VFscRa__skeleton",
  "skeletonButton": "productDetail-module__VFscRa__skeletonButton",
  "skeletonFallback": "productDetail-module__VFscRa__skeletonFallback",
  "skeletonMainImage": "productDetail-module__VFscRa__skeletonMainImage",
  "skeletonPrice": "productDetail-module__VFscRa__skeletonPrice",
  "skeletonText": "productDetail-module__VFscRa__skeletonText",
  "skeletonThumbnail": "productDetail-module__VFscRa__skeletonThumbnail",
  "skeletonTitle": "productDetail-module__VFscRa__skeletonTitle",
  "thumbnail": "productDetail-module__VFscRa__thumbnail",
  "thumbnailWrapper": "productDetail-module__VFscRa__thumbnailWrapper",
  "thumbnailsContainer": "productDetail-module__VFscRa__thumbnailsContainer",
  "variantInfoItem": "productDetail-module__VFscRa__variantInfoItem",
  "variantInfoLabel": "productDetail-module__VFscRa__variantInfoLabel",
  "variantInfoValue": "productDetail-module__VFscRa__variantInfoValue",
  "variantOptions": "productDetail-module__VFscRa__variantOptions",
  "variantSection": "productDetail-module__VFscRa__variantSection",
  "variantTitle": "productDetail-module__VFscRa__variantTitle",
  "zoomOverlay": "productDetail-module__VFscRa__zoomOverlay",
});
}}),
"[project]/src/app/products/[slug]/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/productService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LoadingCircle.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/products/[slug]/productDetail.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
;
;
;
function ProductDetailPage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const slug = params?.slug;
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    // Get auth state to determine which add-to-cart strategy to use
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>!!state.auth.user);
    // State
    const [product, setProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedVariant, setSelectedVariant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedSize, setSelectedSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedColor, setSelectedColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mousePosition, setMousePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const [imageLoading, setImageLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [addingToCart, setAddingToCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Fetch product data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchProduct = async ()=>{
            if (!slug || typeof slug !== 'string') {
                setError(t('product.error.invalidSlug'));
                setLoading(false);
                return;
            }
            try {
                const productData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$productService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getProductBySlug"])(slug);
                if (!productData) {
                    setError(t('product.error.notFound'));
                    setLoading(false);
                    return;
                }
                setProduct(productData);
                // Set default selected image
                if (productData.images && productData.images.length > 0) {
                    const primaryImage = productData.images.find((img)=>img.is_primary);
                    setSelectedImage(primaryImage ? primaryImage.image : productData.images[0].image);
                }
                // If there are variants, initialize the UI
                if (productData.variants && productData.variants.length > 0) {
                    // Get available sizes and colors
                    processVariants(productData.variants);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(t('common.error'));
                setLoading(false);
            }
        };
        fetchProduct();
    }, [
        slug
    ]);
    // Process variants to extract sizes and colors
    const processVariants = (variants)=>{
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
        const defaultVariant = variants.find((v)=>v.is_active);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!product || !product.variants) return;
        // Find the variant that matches both the selected size and color
        const matchingVariant = product.variants.find((variant)=>{
            const sizeMatch = selectedSize === null || variant.size_info && variant.size_info.id === selectedSize;
            const colorMatch = selectedColor === null || variant.color_info && variant.color_info.id === selectedColor;
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
                const primaryVariantImage = matchingVariant.images.find((img)=>img.is_primary);
                setSelectedImage(primaryVariantImage ? primaryVariantImage.image : matchingVariant.images[0].image);
            }
        }
    }, [
        selectedSize,
        selectedColor,
        product
    ]);
    // Handle image selection with loading
    const handleImageSelect = (imageUrl)=>{
        setImageLoading(true);
        setSelectedImage(imageUrl);
    };
    // Handle zoom functionality
    const handleImageMouseMove = (e)=>{
        const container = e.currentTarget;
        const { left, top, width, height } = container.getBoundingClientRect();
        // Calculate position in percentage
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        setMousePosition({
            x,
            y
        });
    };
    // Handle quantity changes
    const increaseQuantity = ()=>{
        setQuantity((prev)=>prev + 1);
    };
    const decreaseQuantity = ()=>{
        if (quantity > 1) {
            setQuantity((prev)=>prev - 1);
        }
    };
    const handleQuantityChange = (e)=>{
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    }; // Add to cart - commented out but preserved
    const handleAddToCart = async ()=>{
        // Original Add to Cart functionality is commented out but preserved for future use
        console.log('Add to Cart functionality is currently disabled in favor of Buy Now');
    };
    // New Buy Now functionality
    const handleBuyNow = async ()=>{
        if (!product) return;
        setAddingToCart(true);
        try {
            // Calculate the final price
            const finalPrice = selectedVariant ? parseFloat(product.base_price) + parseFloat(selectedVariant.additional_price) : parseFloat(product.base_price);
            // Redirect to checkout with product information
            const params = new URLSearchParams({
                buyNow: 'true',
                productId: product.id.toString(),
                productName: product.name,
                productSlug: product.slug,
                price: finalPrice.toString(),
                quantity: quantity.toString(),
                ...selectedVariant?.id && {
                    variantId: selectedVariant.id.toString()
                },
                ...selectedImage && {
                    image: selectedImage
                },
                ...selectedVariant?.color_info && {
                    color: selectedVariant.color_info.name,
                    colorCode: selectedVariant.color_info.hex_code
                },
                ...selectedVariant?.size_info && {
                    size: selectedVariant.size_info.name
                },
                ...product.buy_now_link && {
                    buyNowLink: product.buy_now_link
                }
            });
            console.log('=== BUY NOW DEBUG - PRODUCT PAGE ===');
            console.log('product.buy_now_link:', product.buy_now_link);
            console.log('buyNowLink in params:', product.buy_now_link ? 'YES' : 'NO');
            console.log('Final URL params:', params.toString());
            window.location.href = `/checkout?${params.toString()}`;
        } catch (error) {
            console.error('Error processing Buy Now:', error);
        } finally{
            setAddingToCart(false);
        }
    };
    // No wishlist functionality needed
    // Generate size options from the variants
    const renderSizeOptions = ()=>{
        if (!product || !product.variants) return null;
        // Extract unique size options from variants
        const uniqueSizes = new Map();
        product.variants.forEach((variant)=>{
            if (variant.size_info) {
                uniqueSizes.set(variant.size_info.id, variant.size_info);
            }
        });
        const sizes = Array.from(uniqueSizes.values());
        // If there are no sizes, don't render this section
        if (sizes.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantSection,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantTitle,
                    children: t('product.variants.size')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 233,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantOptions,
                    children: sizes.sort((a, b)=>a.display_order - b.display_order).map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sizeOption} ${selectedSize === size.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selected : ''}`,
                            onClick: ()=>setSelectedSize(size.id),
                            children: size.name
                        }, size.id, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 236,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 232,
            columnNumber: 7
        }, this);
    };
    // Generate color options from the variants
    const renderColorOptions = ()=>{
        if (!product || !product.variants) return null;
        // Extract unique color options from variants
        const uniqueColors = new Map();
        product.variants.forEach((variant)=>{
            if (variant.color_info) {
                uniqueColors.set(variant.color_info.id, variant.color_info);
            }
        });
        const colors = Array.from(uniqueColors.values());
        // If there are no colors, don't render this section
        if (colors.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantSection,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantTitle,
                    children: t('product.variants.color')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 266,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantOptions,
                    children: colors.sort((a, b)=>a.display_order - b.display_order).map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].colorOption} ${selectedColor === color.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selected : ''}`,
                            style: {
                                backgroundColor: color.hex_code || '#000000'
                            },
                            onClick: ()=>setSelectedColor(color.id),
                            title: color.name
                        }, color.id, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 269,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 267,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 265,
            columnNumber: 7
        }, this);
    };
    // Render selected variant info
    const renderSelectedVariantInfo = ()=>{
        if (!selectedVariant) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].selectedVariantInfo,
            children: [
                "        ",
                selectedVariant.size_info && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoItem,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoLabel,
                            children: t('product.variants.selectedInfo.size')
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoValue,
                            children: selectedVariant.size_info.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 287,
                    columnNumber: 11
                }, this),
                selectedVariant.color_info && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoItem,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoLabel,
                            children: t('product.variants.selectedInfo.color')
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoValue,
                            children: [
                                selectedVariant.color_info.hex_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].colorPreview,
                                    style: {
                                        backgroundColor: selectedVariant.color_info.hex_code
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 297,
                                    columnNumber: 17
                                }, this),
                                selectedVariant.color_info.name
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 295,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 293,
                    columnNumber: 11
                }, this),
                selectedVariant.name_suffix && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoItem,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoLabel,
                            children: t('product.variants.selectedInfo.variant')
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 308,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].variantInfoValue,
                            children: selectedVariant.name_suffix
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 309,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 307,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 286,
            columnNumber: 19
        }, this);
    };
    // Predefined widths for skeleton elements to prevent hydration errors
    const skeletonWidths = [
        85,
        92,
        78,
        88,
        80
    ]; // Fixed percentages instead of random values
    // Render loading state
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    size: "large",
                    color: "primary",
                    text: t('product.loading.text')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 321,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonFallback,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productContainer,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].galleryContainer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonMainImage} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 330,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexWrap: 'wrap'
                                        },
                                        children: [
                                            1,
                                            2,
                                            3,
                                            4
                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonThumbnail} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`
                                            }, i, false, {
                                                fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                lineNumber: 333,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/products/[slug]/page.tsx",
                                lineNumber: 329,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonTitle} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonPrice} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 15
                                    }, this),
                                    [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5
                                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonText} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`,
                                            style: {
                                                width: `${skeletonWidths[i - 1]}%`
                                            }
                                        }, i, false, {
                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                            lineNumber: 341,
                                            columnNumber: 17
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeletonButton} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].skeleton}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 343,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/products/[slug]/page.tsx",
                                lineNumber: 337,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 327,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 320,
            columnNumber: 19
        }, this);
    }
    // Render error state
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorTitle,
                    children: t('product.error.somethingWrong')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 353,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                    children: error
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 354,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorButton,
                    onClick: ()=>router.push('/'),
                    children: t('product.error.backToHome')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 352,
            columnNumber: 19
        }, this);
    }
    // Render product not found
    if (!product) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorTitle,
                    children: t('product.error.notFound')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 365,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                    children: t('product.error.notFoundMessage')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorButton,
                    onClick: ()=>router.push('/'),
                    children: t('product.error.backToHome')
                }, void 0, false, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 367,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 364,
            columnNumber: 19
        }, this);
    }
    // Calculate the effective price (base price + variant additional price)
    const effectivePrice = selectedVariant ? (parseFloat(product.base_price) + parseFloat(selectedVariant.additional_price)).toFixed(2) : product.base_price;
    // Define availability status and classes to prevent hydration issues
    const productStatus = 'in-stock'; // Can be changed based on inventory logic
    const availabilityDotClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inStock; // Default to in-stock
    const availabilityTextClass = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inStockText; // Default to in-stock
    const availabilityLabel = 'In Stock'; // Default label
    const isOutOfStock = false; // Default to in-stock
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productContainer,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].galleryContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainImageContainer,
                            onMouseMove: handleImageMouseMove,
                            children: [
                                imageLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].imageLoadingOverlay,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        size: "medium",
                                        color: "primary"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 394,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 393,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: selectedImage || product.images[0]?.image || '/placeholder-product.jpg',
                                    alt: product.name,
                                    fill: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mainImage,
                                    style: {
                                        transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                                        opacity: imageLoading ? 0.3 : 1
                                    },
                                    onLoad: ()=>setImageLoading(false),
                                    onError: ()=>setImageLoading(false)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].zoomOverlay
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 409,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnailsContainer,
                            children: product.images.map((image)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnailWrapper} ${selectedImage === image.image ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                                    onClick: ()=>handleImageSelect(image.image),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: image.image,
                                        alt: image.alt_text || product.name,
                                        width: 80,
                                        height: 80,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].thumbnail
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/products/[slug]/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 17
                                    }, this)
                                }, image.id, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 387,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productInfo,
                    children: [
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbs,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbItem,
                                    children: t('product.breadcrumbs.home')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, this),
                                product.category_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/categories/${product.slug}`,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbItem,
                                            children: product.category_name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                            lineNumber: 437,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbSeparator,
                                            children: "/"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                            lineNumber: 440,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].breadcrumbItem,
                                    children: product.name
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].productName,
                            children: product.name
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 447,
                            columnNumber: 11
                        }, this),
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].priceContainer,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].price,
                                children: [
                                    effectivePrice,
                                    " ",
                                    t('product.price.currency')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/products/[slug]/page.tsx",
                                lineNumber: 449,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].availabilitySection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].availabilityDot} ${availabilityDotClass}`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this),
                                "            ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].availabilityText} ${availabilityTextClass}`,
                                    children: t('product.availability.inStock')
                                }, void 0, false, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 100
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                            children: [
                                "            ",
                                product.description || t('product.description.noDescription')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].divider
                        }, void 0, false, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this),
                        renderSizeOptions(),
                        renderColorOptions(),
                        renderSelectedVariantInfo(),
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ctaSection,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].addToCartButton} ${addingToCart ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$products$2f5b$slug$5d2f$productDetail$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading : ''}`,
                                    onClick: handleBuyNow,
                                    disabled: isOutOfStock || addingToCart,
                                    children: [
                                        "              ",
                                        addingToCart ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LoadingCircle$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    size: "small",
                                                    color: "white"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: t('product.buttons.processing')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                    lineNumber: 497,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "20",
                                                    height: "20",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M3 3h2l.4 2m0 0L7 13h10l4-8H5.4z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                            lineNumber: 502,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "9",
                                                            cy: "21",
                                                            r: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                            lineNumber: 503,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "20",
                                                            cy: "21",
                                                            r: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                                    lineNumber: 501,
                                                    columnNumber: 19
                                                }, this),
                                                t('product.buttons.buyNow')
                                            ]
                                        }, void 0, true)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                                    lineNumber: 490,
                                    columnNumber: 13
                                }, this),
                                "          "
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/products/[slug]/page.tsx",
                            lineNumber: 488,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/products/[slug]/page.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/products/[slug]/page.tsx",
            lineNumber: 386,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}}),

};

//# sourceMappingURL=src_19d7c441._.js.map