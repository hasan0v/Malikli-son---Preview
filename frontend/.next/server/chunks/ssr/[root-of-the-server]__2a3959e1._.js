module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/store/slices/uiSlice.ts
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "setGlobalLoading": (()=>setGlobalLoading),
    "toggleMobileMenu": (()=>toggleMobileMenu)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    isMobileMenuOpen: false,
    globalLoading: false
};
const uiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'ui',
    initialState,
    reducers: {
        toggleMobileMenu: (state)=>{
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setGlobalLoading: (state, action)=>{
            state.globalLoading = action.payload;
        }
    }
});
const { toggleMobileMenu, setGlobalLoading } = uiSlice.actions;
const __TURBOPACK__default__export__ = uiSlice.reducer;
 // Export the reducer
}}),
"[project]/src/types/backendCart.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// types/backendCart.ts
// Backend cart item structure from Django API
__turbopack_context__.s({
    "convertBackendItemToFrontend": (()=>convertBackendItemToFrontend),
    "convertFrontendItemToBackend": (()=>convertFrontendItemToBackend)
});
function convertBackendItemToFrontend(backendItem) {
    // Extract product details - for drop products it's direct, for variants it's nested in product_details
    let productInfo;
    if (backendItem.drop_product_details) {
        productInfo = {
            name: backendItem.drop_product_details.product.name,
            basePrice: backendItem.drop_product_details.product.base_price
        };
    } else if (backendItem.product_variant_details?.product_details) {
        productInfo = {
            name: backendItem.product_variant_details.product_details.name,
            basePrice: parseFloat(backendItem.product_variant_details.product_details.base_price)
        };
    }
    // Extract image from variant or product details
    let image;
    if (backendItem.product_variant_details?.image) {
        image = backendItem.product_variant_details.image;
    } else if (backendItem.product_variant_details?.images && backendItem.product_variant_details.images.length > 0) {
        // Use the primary image or first image if available
        const primaryImage = backendItem.product_variant_details.images.find((img)=>img.is_primary);
        image = primaryImage ? primaryImage.image : backendItem.product_variant_details.images[0].image;
    } else if (backendItem.product_variant_details?.product_details?.images && backendItem.product_variant_details.product_details.images.length > 0) {
        // Use product images if variant doesn't have images
        const primaryImage = backendItem.product_variant_details.product_details.images.find((img)=>img.is_primary);
        image = primaryImage ? primaryImage.image : backendItem.product_variant_details.product_details.images[0].image;
    } else if (backendItem.drop_product_details?.image) {
        image = backendItem.drop_product_details.image;
    }
    // Extract color and size information - prioritize direct fields, fallback to nested variant info
    let color;
    let colorCode;
    let size;
    // Use direct cart item fields if available
    if (backendItem.color) {
        color = backendItem.color;
    } else if (backendItem.product_variant_details?.color_info?.name) {
        // Fallback to variant color info
        color = backendItem.product_variant_details.color_info.name;
    }
    if (backendItem.color_code) {
        colorCode = backendItem.color_code;
    } else if (backendItem.product_variant_details?.color_info?.hex_code) {
        // Fallback to variant color info
        colorCode = backendItem.product_variant_details.color_info.hex_code;
    }
    if (backendItem.size) {
        size = backendItem.size;
    } else if (backendItem.product_variant_details?.size_info?.name) {
        // Fallback to variant size info
        size = backendItem.product_variant_details.size_info.name;
    }
    return {
        id: backendItem.drop_product || backendItem.product_variant || backendItem.id,
        variantId: backendItem.product_variant || undefined,
        dropProductId: backendItem.drop_product || undefined,
        isDropProduct: !!backendItem.drop_product,
        name: productInfo?.name || 'Unknown Product',
        price: backendItem.unit_price,
        quantity: backendItem.quantity,
        image: image,
        color: color,
        colorCode: colorCode,
        size: size
    };
}
function convertFrontendItemToBackend(frontendItem) {
    // Check if this is a drop product or regular product
    if (frontendItem.isDropProduct || frontendItem.dropProductId) {
        return {
            drop_product_id: frontendItem.dropProductId || frontendItem.id,
            quantity: frontendItem.quantity,
            color: frontendItem.color || undefined,
            color_code: frontendItem.colorCode || undefined,
            size: frontendItem.size || undefined
        };
    } else {
        // This is a regular product with variants
        // Only send product_variant_id if we have a valid variantId
        if (frontendItem.variantId) {
            return {
                product_variant_id: frontendItem.variantId,
                quantity: frontendItem.quantity,
                color: frontendItem.color || undefined,
                color_code: frontendItem.colorCode || undefined,
                size: frontendItem.size || undefined
            };
        } else {
            // For products without variants, log a warning and return an invalid item
            // This will be filtered out in convertCartItemsToSyncFormat
            console.warn('Product without variant ID found in cart:', frontendItem);
            return {
                // Don't set either ID - this will be filtered out
                quantity: frontendItem.quantity,
                color: frontendItem.color || undefined,
                color_code: frontendItem.colorCode || undefined,
                size: frontendItem.size || undefined
            };
        }
    }
}
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/url [external] (url, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[project]/src/services/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// API service file for common API functionality
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://localhost:8000/api/v1';
// Create axios instance with default config
const apiClient = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Request interceptor for logging and adding auth token if needed
apiClient.interceptors.request.use((config)=>{
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return config;
}, (error)=>{
    console.error('API Request Error:', error);
    return Promise.reject(error);
});
// Response interceptor for error handling
apiClient.interceptors.response.use((response)=>response, (error)=>{
    // Handle specific error codes
    if (error.response) {
        // Log based on status code
        if (error.response.status === 401) {
            console.error('Authentication error. Please login again.');
        // Could trigger logout or redirect to login here
        }
    }
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = apiClient;
}}),
"[project]/src/services/cartService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// Cart Service for handling API calls to the cart endpoints
__turbopack_context__.s({
    "addToCartAPI": (()=>addToCartAPI),
    "bulkAddToCart": (()=>bulkAddToCart),
    "convertCartItemsToSyncFormat": (()=>convertCartItemsToSyncFormat),
    "createCart": (()=>createCart),
    "getCart": (()=>getCart),
    "getMyCart": (()=>getMyCart),
    "mergeGuestCart": (()=>mergeGuestCart),
    "removeFromCartAPI": (()=>removeFromCartAPI),
    "syncCart": (()=>syncCart),
    "updateCartItem": (()=>updateCartItem),
    "updateCartItemQuantity": (()=>updateCartItemQuantity)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/backendCart.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
;
;
async function getCart(cartId) {
    try {
        const url = cartId ? `/carts/${cartId}/` : '/carts/';
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get(url);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error('Error fetching cart:', error);
        return null;
    }
}
async function addToCartAPI(cartId, item) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(`/carts/${cartId}/items/`, item);
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return null;
    }
}
async function updateCartItem(cartId, itemId, quantity) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].patch(`/carts/${cartId}/items/${itemId}/`, {
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item:', error);
        return null;
    }
}
async function removeFromCartAPI(cartId, itemId) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].delete(`/carts/${cartId}/items/${itemId}/`);
        return true;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        return false;
    }
}
async function createCart() {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/carts/', {});
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        return null;
    }
}
async function syncCart(syncData) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/carts/sync/', syncData);
        return response.data.cart;
    } catch (error) {
        console.error('Error syncing cart:', error);
        return null;
    }
}
async function mergeGuestCart(mergeData) {
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/carts/merge/', mergeData);
        return response.data.cart;
    } catch (error) {
        console.error('Error merging guest cart:', error);
        return null;
    }
}
async function getMyCart(guestCartId) {
    try {
        const headers = {};
        if (guestCartId) {
            headers['X-Cart-ID'] = guestCartId;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('/carts/mine/', {
            headers
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null;
        }
        console.error('Error fetching my cart:', error);
        return null;
    }
}
async function bulkAddToCart(items, cartId) {
    try {
        const headers = {};
        if (cartId) {
            headers['X-Cart-ID'] = cartId;
        }
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post('/carts/bulk-add/', {
            items
        }, {
            headers
        });
        return response.data;
    } catch (error) {
        console.error('Error bulk adding to cart:', error);
        return null;
    }
}
function convertCartItemsToSyncFormat(items) {
    return items.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertFrontendItemToBackend"])(item)).filter((item)=>{
        // Filter out items that don't have valid IDs
        return item.drop_product_id || item.product_variant_id;
    });
}
async function updateCartItemQuantity(params) {
    try {
        // For now, we'll use the bulk add approach to update quantities
        // Since the backend doesn't have a specific endpoint for updating individual cart items by complex criteria
        // We can either implement a custom endpoint or use the existing sync mechanism
        // Use the sync mechanism to update quantity
        const syncItem = {
            quantity: params.quantity,
            color: params.color,
            color_code: undefined,
            size: params.size
        };
        // Determine if this is a drop product or variant
        if (params.variantId) {
            syncItem.product_variant_id = params.variantId;
        } else {
            syncItem.drop_product_id = params.itemId;
        }
        // Use bulk add which will merge/update existing items
        return await bulkAddToCart([
            syncItem
        ]);
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        return null;
    }
}
}}),
"[project]/src/store/cartSlice.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// store/cartSlice.ts
__turbopack_context__.s({
    "addToCart": (()=>addToCart),
    "addToCartAPI": (()=>addToCartAPI),
    "bulkAddToUserCart": (()=>bulkAddToUserCart),
    "clearCart": (()=>clearCart),
    "default": (()=>__TURBOPACK__default__export__),
    "loadCart": (()=>loadCart),
    "loadCartFromBackend": (()=>loadCartFromBackend),
    "markAsSynced": (()=>markAsSynced),
    "mergeGuestCartWithUser": (()=>mergeGuestCartWithUser),
    "removeFromCart": (()=>removeFromCart),
    "setCartFromBackend": (()=>setCartFromBackend),
    "setCartId": (()=>setCartId),
    "syncCartWithBackend": (()=>syncCartWithBackend),
    "updateCartItemQuantityAPI": (()=>updateCartItemQuantityAPI),
    "updateQuantity": (()=>updateQuantity)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cartService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/backendCart.ts [app-ssr] (ecmascript)");
;
;
;
// LocalStorage functions
const loadCartFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return [];
    "TURBOPACK unreachable";
};
const saveCartToStorage = (items)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
};
const loadCartIdFromStorage = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return undefined;
    "TURBOPACK unreachable";
};
const saveCartIdToStorage = (cartId)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    "TURBOPACK unreachable";
};
const syncCartWithBackend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/syncWithBackend', async (_, { getState, rejectWithValue })=>{
    try {
        const state = getState();
        const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertCartItemsToSyncFormat"])(state.cart.items);
        const guestCartId = state.cart.cartId;
        const syncData = {
            items,
            guest_cart_id: guestCartId
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncCart"])(syncData);
        if (!result) {
            throw new Error('Failed to sync cart with backend');
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to sync cart');
    }
});
const mergeGuestCartWithUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/mergeGuestCart', async ({ guestCartId, strategy }, { rejectWithValue })=>{
    try {
        const mergeData = {
            guest_cart_id: guestCartId,
            merge_strategy: strategy
        };
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeGuestCart"])(mergeData);
        if (!result) {
            throw new Error('Failed to merge guest cart');
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to merge cart');
    }
});
const loadCartFromBackend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/loadFromBackend', async (params = {}, { rejectWithValue })=>{
    try {
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMyCart"])(params.guestCartId);
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to load cart from backend');
    }
});
const bulkAddToUserCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/bulkAddToUserCart', async (_, { getState, rejectWithValue })=>{
    try {
        const state = getState();
        const { bulkAddToCart } = await __turbopack_context__.r("[project]/src/services/cartService.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        // Convert cart items to sync format
        const syncItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertCartItemsToSyncFormat"])(state.cart.items);
        if (syncItems.length === 0) {
            // No valid items to sync, just mark as synced
            return null;
        }
        const result = await bulkAddToCart(syncItems);
        if (!result) {
            throw new Error('Failed to bulk add items to cart');
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to bulk add items to cart');
    }
});
const addToCartAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/addToCartAPI', async (item, { getState, rejectWithValue })=>{
    try {
        const state = getState();
        const { bulkAddToCart } = await __turbopack_context__.r("[project]/src/services/cartService.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        // Convert single item to sync format
        const syncItems = [
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertFrontendItemToBackend"])(item)
        ].filter((item)=>item.drop_product_id || item.product_variant_id);
        if (syncItems.length === 0) {
            throw new Error('Invalid item to add to cart');
        }
        const result = await bulkAddToCart(syncItems, state.cart.cartId);
        if (!result) {
            throw new Error('Failed to add item to cart');
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to add item to cart');
    }
});
const updateCartItemQuantityAPI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('cart/updateCartItemQuantityAPI', async (params, { getState, rejectWithValue })=>{
    try {
        const state = getState();
        const { updateCartItemQuantity } = await __turbopack_context__.r("[project]/src/services/cartService.ts [app-ssr] (ecmascript, async loader)")(__turbopack_context__.i);
        const result = await updateCartItemQuantity({
            itemId: params.id,
            variantId: params.variantId,
            color: params.color,
            size: params.size,
            quantity: params.quantity
        });
        if (!result) {
            throw new Error('Failed to update cart item quantity');
        }
        return result;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to update cart item quantity');
    }
});
const initialState = {
    items: loadCartFromStorage(),
    cartId: loadCartIdFromStorage(),
    isLoading: false,
    needsSync: false,
    lastSyncTime: undefined
};
const cartSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            // Find existing item based on product ID and variant characteristics
            const existingItem = state.items.find((item)=>item.id === action.payload.id && item.variantId === action.payload.variantId && item.color === action.payload.color && item.size === action.payload.size);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                state.items.push(action.payload);
            }
            // Save to localStorage and mark for sync
            saveCartToStorage(state.items);
            state.needsSync = true;
        },
        removeFromCart: (state, action)=>{
            state.items = state.items.filter((item)=>!(item.id === action.payload.id && item.variantId === action.payload.variantId && item.color === action.payload.color && item.size === action.payload.size));
            // Save to localStorage and mark for sync
            saveCartToStorage(state.items);
            state.needsSync = true;
        },
        updateQuantity: (state, action)=>{
            const existingItem = state.items.find((item)=>item.id === action.payload.id && item.variantId === action.payload.variantId && item.color === action.payload.color && item.size === action.payload.size);
            if (existingItem) {
                // Ensure quantity is a positive integer
                const newQuantity = Math.max(1, Math.floor(action.payload.quantity));
                existingItem.quantity = newQuantity;
            }
            // Save to localStorage and mark for sync
            saveCartToStorage(state.items);
            state.needsSync = true;
        },
        clearCart: (state)=>{
            state.items = [];
            state.needsSync = false;
            // Clear from localStorage
            saveCartToStorage([]);
        },
        // Action to manually load cart from localStorage (useful for hydration)
        loadCart: (state)=>{
            state.items = loadCartFromStorage();
            state.cartId = loadCartIdFromStorage();
        },
        // Action to set cart ID
        setCartId: (state, action)=>{
            state.cartId = action.payload;
            saveCartIdToStorage(action.payload);
        },
        // Action to mark cart as synced
        markAsSynced: (state)=>{
            state.needsSync = false;
            state.lastSyncTime = Date.now();
        },
        setCartFromBackend: (state, action)=>{
            // Convert backend items to frontend format
            state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
            state.cartId = action.payload.cart_id;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            // Save to localStorage
            saveCartToStorage(state.items);
            saveCartIdToStorage(action.payload.cart_id);
        }
    },
    extraReducers: (builder)=>{
        // Handle syncCartWithBackend
        builder.addCase(syncCartWithBackend.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(syncCartWithBackend.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            if (action.payload.cart_id) {
                state.cartId = action.payload.cart_id;
                saveCartIdToStorage(action.payload.cart_id);
            }
        }).addCase(syncCartWithBackend.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Handle mergeGuestCartWithUser
        builder.addCase(mergeGuestCartWithUser.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(mergeGuestCartWithUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            // Update cart with merged data
            state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
            state.cartId = action.payload.cart_id;
            // Save to localStorage
            saveCartToStorage(state.items);
            saveCartIdToStorage(action.payload.cart_id);
        }).addCase(mergeGuestCartWithUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Handle loadCartFromBackend
        builder.addCase(loadCartFromBackend.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(loadCartFromBackend.fulfilled, (state, action)=>{
            state.isLoading = false;
            if (action.payload) {
                state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
                if (action.payload.cart_id) {
                    state.cartId = action.payload.cart_id;
                    saveCartIdToStorage(action.payload.cart_id);
                }
                state.needsSync = false;
                state.lastSyncTime = Date.now();
                // Save to localStorage
                saveCartToStorage(state.items);
            }
        }).addCase(loadCartFromBackend.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Handle bulkAddToUserCart
        builder.addCase(bulkAddToUserCart.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(bulkAddToUserCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            if (action.payload) {
                // Update cart with backend data
                state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
                if (action.payload.cart_id) {
                    state.cartId = action.payload.cart_id;
                    saveCartIdToStorage(action.payload.cart_id);
                }
                // Save to localStorage
                saveCartToStorage(state.items);
            } else {
            // No items were synced (all items were invalid), just mark as synced
            // Keep the current items but mark as synced
            }
        }).addCase(bulkAddToUserCart.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
        // Handle addToCartAPI
        builder.addCase(addToCartAPI.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(addToCartAPI.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            if (action.payload) {
                // Update cart with backend data
                state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
                if (action.payload.cart_id) {
                    state.cartId = action.payload.cart_id;
                    saveCartIdToStorage(action.payload.cart_id);
                }
                // Save to localStorage
                saveCartToStorage(state.items);
            }
        }).addCase(addToCartAPI.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        }).addCase(updateCartItemQuantityAPI.pending, (state)=>{
            state.isLoading = true;
            state.error = undefined;
        }).addCase(updateCartItemQuantityAPI.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.needsSync = false;
            state.lastSyncTime = Date.now();
            if (action.payload) {
                // Update cart with backend data
                state.items = action.payload.items.map((backendItem)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$backendCart$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["convertBackendItemToFrontend"])(backendItem));
                if (action.payload.cart_id) {
                    state.cartId = action.payload.cart_id;
                    saveCartIdToStorage(action.payload.cart_id);
                }
                // Save to localStorage
                saveCartToStorage(state.items);
            }
        }).addCase(updateCartItemQuantityAPI.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
const { addToCart, removeFromCart, updateQuantity, clearCart, loadCart, setCartId, markAsSynced, setCartFromBackend } = cartSlice.actions;
const __TURBOPACK__default__export__ = cartSlice.reducer;
}}),
"[project]/src/store/authSlice.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/store/authSlice.ts
__turbopack_context__.s({
    "clearError": (()=>clearError),
    "default": (()=>__TURBOPACK__default__export__),
    "fetchUserProfile": (()=>fetchUserProfile),
    "loadTokensFromStorage": (()=>loadTokensFromStorage),
    "loginUser": (()=>loginUser),
    "logout": (()=>logout),
    "refreshAccessToken": (()=>refreshAccessToken),
    "registerUser": (()=>registerUser),
    "requestPasswordReset": (()=>requestPasswordReset),
    "setTokens": (()=>setTokens)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    user: null,
    token: null,
    refreshToken: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,
    isInitialized: false
};
const loginUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/login', async (credentials, { rejectWithValue })=>{
    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        // Store tokens in localStorage
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        return data;
    } catch (error) {
        return rejectWithValue({
            message: 'Ошибка сети'
        });
    }
});
const registerUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/register', async (userData, { rejectWithValue })=>{
    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue({
            message: 'Ошибка сети'
        });
    }
});
const fetchUserProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/fetchProfile', async (_, { rejectWithValue, getState })=>{
    try {
        const state = getState();
        const token = state.auth.token || localStorage.getItem('access_token');
        if (!token) {
            return rejectWithValue({
                message: 'Нет токена авторизации'
            });
        }
        const response = await fetch('http://localhost:8000/api/v1/auth/profile/', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            if (response.status === 401) {
                // Token expired, try to refresh
                throw new Error('Token expired');
            }
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue({
            message: 'Ошибка получения профиля'
        });
    }
});
const refreshAccessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/refreshToken', async (_, { rejectWithValue })=>{
    try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            return rejectWithValue({
                message: 'Нет refresh токена'
            });
        }
        const response = await fetch('http://localhost:8000/api/v1/auth/login/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refresh: refreshToken
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        return data;
    } catch (error) {
        return rejectWithValue({
            message: 'Ошибка обновления токена'
        });
    }
});
const requestPasswordReset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createAsyncThunk"])('auth/requestPasswordReset', async (email, { rejectWithValue })=>{
    try {
        const response = await fetch('http://localhost:8000/api/v1/auth/password-reset/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return rejectWithValue({
            message: 'Ошибка сети'
        });
    }
});
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state)=>{
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
        clearError: (state)=>{
            state.error = null;
        },
        loadTokensFromStorage: (state)=>{
            const token = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            if (token && refreshToken) {
                state.token = token;
                state.refreshToken = refreshToken;
                state.isAuthenticated = true;
            }
            state.isInitialized = true;
        },
        setTokens: (state, action)=>{
            state.token = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.isAuthenticated = true;
        }
    },
    extraReducers: (builder)=>{
        builder// Login
        .addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.token = action.payload.access;
            state.refreshToken = action.payload.refresh;
            state.isAuthenticated = true;
            state.error = null;
        }).addCase(loginUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })// Register
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        }).addCase(registerUser.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })// Fetch Profile
        .addCase(fetchUserProfile.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchUserProfile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        }).addCase(fetchUserProfile.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
            // If token is invalid, clear auth state
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        })// Refresh Token
        .addCase(refreshAccessToken.fulfilled, (state, action)=>{
            state.token = action.payload.access;
        }).addCase(refreshAccessToken.rejected, (state)=>{
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        })// Password Reset Request
        .addCase(requestPasswordReset.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
        }).addCase(requestPasswordReset.fulfilled, (state)=>{
            state.isLoading = false;
            state.error = null;
        }).addCase(requestPasswordReset.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});
const { logout, clearError, loadTokensFromStorage, setTokens } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
}}),
"[project]/src/store/store.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/store/store.ts
__turbopack_context__.s({
    "makeStore": (()=>makeStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
// Import your reducers (slices) here
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/slices/uiSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartSlice.ts [app-ssr] (ecmascript)"); // Adjust the path as necessary
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/authSlice.ts [app-ssr] (ecmascript)");
;
;
;
;
// import productReducer from './slices/productSlice';
// ... etc.
// Create a temporary store to infer types
const tempStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        ui: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        cart: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
    }
});
const makeStore = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
        reducer: {
            ui: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$slices$2f$uiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            cart: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
            auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
        },
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // example
        devTools: ("TURBOPACK compile-time value", "development") !== 'production'
    });
};
}}),
"[project]/src/app/StoreProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// src/app/StoreProvider.tsx
__turbopack_context__.s({
    "default": (()=>StoreProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/store.ts [app-ssr] (ecmascript)"); // Adjust path to your store config
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/authSlice.ts [app-ssr] (ecmascript)");
"use client"; // This component uses Redux Provider, which needs to be client-side
;
;
;
;
;
function StoreProvider({ children }) {
    const storeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["makeStore"])();
    }
    // Initialize auth state from localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (storeRef.current) {
            const store = storeRef.current;
            // Load tokens from localStorage
            store.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadTokensFromStorage"])());
            // If tokens exist, fetch user profile
            const state = store.getState();
            if (state.auth.isAuthenticated && state.auth.token) {
                store.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchUserProfile"])());
            }
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: storeRef.current,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/StoreProvider.tsx",
        lineNumber: 36,
        columnNumber: 10
    }, this);
}
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/store/hooks.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useAppDispatch": (()=>useAppDispatch),
    "useAppSelector": (()=>useAppSelector)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
const useAppDispatch = ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"];
}}),
"[project]/src/components/Layout/Navbar.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "cartCount": "Navbar-module__eVzsNW__cartCount",
  "cartIconContainer": "Navbar-module__eVzsNW__cartIconContainer",
  "chevron": "Navbar-module__eVzsNW__chevron",
  "chevronUp": "Navbar-module__eVzsNW__chevronUp",
  "dark": "Navbar-module__eVzsNW__dark",
  "dropdownDivider": "Navbar-module__eVzsNW__dropdownDivider",
  "dropdownIcon": "Navbar-module__eVzsNW__dropdownIcon",
  "dropdownItem": "Navbar-module__eVzsNW__dropdownItem",
  "dropdownSlideIn": "Navbar-module__eVzsNW__dropdownSlideIn",
  "fixedCartButton": "Navbar-module__eVzsNW__fixedCartButton",
  "fixedCartCount": "Navbar-module__eVzsNW__fixedCartCount",
  "iconLight": "Navbar-module__eVzsNW__iconLight",
  "iconLink": "Navbar-module__eVzsNW__iconLink",
  "iconSvg": "Navbar-module__eVzsNW__iconSvg",
  "logo": "Navbar-module__eVzsNW__logo",
  "logoContainer": "Navbar-module__eVzsNW__logoContainer",
  "logoWhite": "Navbar-module__eVzsNW__logoWhite",
  "mobileActionIcon": "Navbar-module__eVzsNW__mobileActionIcon",
  "mobileAuthAction": "Navbar-module__eVzsNW__mobileAuthAction",
  "mobileAuthSection": "Navbar-module__eVzsNW__mobileAuthSection",
  "mobileLangSection": "Navbar-module__eVzsNW__mobileLangSection",
  "mobileMenu": "Navbar-module__eVzsNW__mobileMenu",
  "mobileMenuButton": "Navbar-module__eVzsNW__mobileMenuButton",
  "mobileMenuLinks": "Navbar-module__eVzsNW__mobileMenuLinks",
  "mobileOpen": "Navbar-module__eVzsNW__mobileOpen",
  "mobileUserAction": "Navbar-module__eVzsNW__mobileUserAction",
  "mobileUserActions": "Navbar-module__eVzsNW__mobileUserActions",
  "mobileUserAvatar": "Navbar-module__eVzsNW__mobileUserAvatar",
  "mobileUserDetails": "Navbar-module__eVzsNW__mobileUserDetails",
  "mobileUserEmail": "Navbar-module__eVzsNW__mobileUserEmail",
  "mobileUserInfo": "Navbar-module__eVzsNW__mobileUserInfo",
  "mobileUserName": "Navbar-module__eVzsNW__mobileUserName",
  "mobileUserSection": "Navbar-module__eVzsNW__mobileUserSection",
  "navContainer": "Navbar-module__eVzsNW__navContainer",
  "navIcons": "Navbar-module__eVzsNW__navIcons",
  "navLink": "Navbar-module__eVzsNW__navLink",
  "navLinks": "Navbar-module__eVzsNW__navLinks",
  "navbar": "Navbar-module__eVzsNW__navbar",
  "open": "Navbar-module__eVzsNW__open",
  "pulse": "Navbar-module__eVzsNW__pulse",
  "transparent": "Navbar-module__eVzsNW__transparent",
  "userAvatar": "Navbar-module__eVzsNW__userAvatar",
  "userButton": "Navbar-module__eVzsNW__userButton",
  "userDropdown": "Navbar-module__eVzsNW__userDropdown",
  "userMenuContainer": "Navbar-module__eVzsNW__userMenuContainer",
  "userName": "Navbar-module__eVzsNW__userName",
});
}}),
"[project]/src/locales/en.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"nav\":{\"home\":\"Home\",\"delivery\":\"Delivery & Payment\",\"about\":\"About Us\",\"contact\":\"Contacts\",\"profile\":\"My Profile\",\"orders\":\"My Orders\",\"favorites\":\"Favorites\",\"settings\":\"Settings\",\"logout\":\"Logout\",\"login\":\"Login\",\"register\":\"Sign Up\"},\"common\":{\"loading\":\"Loading...\",\"error\":\"Error occurred\",\"tryAgain\":\"Try Again\",\"buyNow\":\"Buy Now\",\"addToCart\":\"Add to Cart\",\"selectOptions\":\"Select Options\",\"checkingAuth\":\"Checking authorization...\"},\"home\":{\"error\":{\"title\":\"An error occurred\",\"button\":\"Try again\"},\"loading\":{\"slider\":\"Loading slider...\",\"products\":\"Loading products...\"},\"slider\":{\"promo1Alt\":\"Promotional banner 1\",\"promo1Title\":\"Promotional Banner 1\",\"promo1Description\":\"Check out our promotions\",\"promo2Alt\":\"Promotional banner 2\",\"promo2Title\":\"Promotional Banner 2\",\"promo2Description\":\"Special offers available\",\"newCollectionAlt\":\"New collection arrival\",\"newCollectionTitle\":\"New Collection\",\"newCollectionDescription\":\"Discover our latest items\"},\"welcome\":{\"title\":\"Welcome to Malikli\",\"subtitle\":\"Currently no products found. Please check back later.\",\"viewDrops\":\"View Drops\"},\"noProducts\":\"No products found in this collection.\"},\"auth\":{\"login\":{\"title\":\"Welcome\",\"subtitle\":\"Sign in to your account\",\"username\":\"Username or Email\",\"usernamePlaceholder\":\"Enter username or email\",\"password\":\"Password\",\"passwordPlaceholder\":\"Enter password\",\"rememberMe\":\"Remember me\",\"forgotPassword\":\"Forgot password?\",\"loginButton\":\"Sign In\",\"loginButtonLoading\":\"Signing in...\",\"noAccount\":\"Don't have an account?\",\"registerLink\":\"Sign up\",\"orDivider\":\"or\",\"socialGoogle\":\"Google\",\"socialFacebook\":\"Facebook\",\"errorDefault\":\"Login error. Please check your credentials.\"},\"register\":{\"title\":\"Create Account\",\"subtitle\":\"Join Malikli today\",\"firstName\":\"First Name\",\"firstNamePlaceholder\":\"Your first name\",\"lastName\":\"Last Name\",\"lastNamePlaceholder\":\"Your last name\",\"username\":\"Username\",\"usernamePlaceholder\":\"Choose a username\",\"email\":\"Email\",\"emailPlaceholder\":\"your@email.com\",\"phone\":\"Phone\",\"phonePlaceholder\":\"+7 (xxx) xxx-xx-xx\",\"password\":\"Password\",\"passwordPlaceholder\":\"Create password\",\"confirmPassword\":\"Confirm Password\",\"confirmPasswordPlaceholder\":\"Repeat password\",\"acceptTerms\":\"I agree with the\",\"termsLink\":\"terms of service\",\"andText\":\"and\",\"privacyLink\":\"privacy policy\",\"registerButton\":\"Create Account\",\"registerButtonLoading\":\"Creating account...\",\"hasAccount\":\"Already have an account?\",\"loginLink\":\"Sign in\",\"orDivider\":\"or\",\"socialGoogle\":\"Google\",\"socialFacebook\":\"Facebook\",\"errorDefault\":\"Registration error. Please check your data.\",\"successMessage\":\"Registration successful! We've sent an email verification to your address. Please check your email and follow the link to activate your account.\",\"redirectInfo\":\"Automatic redirect to login page in {{seconds}} seconds\",\"redirectNow\":\"Go now\",\"stayHere\":\"Stay here\",\"validation\":{\"acceptTerms\":\"Please accept the terms of service\",\"passwordMismatch\":\"Passwords don't match\"}},\"forgotPassword\":{\"title\":\"Forgot Password?\",\"subtitle\":\"Enter your email and we'll send password reset instructions\",\"emailSentTitle\":\"Email Sent\",\"emailSentSubtitle\":\"Check your email for password reset instructions\",\"email\":\"Email\",\"emailPlaceholder\":\"Enter your email\",\"sendButton\":\"Send Instructions\",\"sendButtonLoading\":\"Sending...\",\"successMessage\":\"We've sent password reset instructions to {{email}}\",\"helpText\":\"If the email doesn't arrive within a few minutes, check your spam folder\",\"backToLogin\":\"Back to login\",\"rememberedPassword\":\"Remembered your password?\",\"loginLink\":\"Sign in\",\"noAccount\":\"Don't have an account?\",\"registerLink\":\"Sign up\"},\"resetPassword\":{\"title\":\"New Password\",\"subtitle\":\"Enter your new password\",\"invalidLinkTitle\":\"Invalid Link\",\"invalidLinkMessage\":\"This password reset link is invalid or has expired. Please request a new one.\",\"successTitle\":\"Password Changed\",\"successMessage\":\"Your password has been successfully changed. You can now sign in with your new password.\",\"password\":\"New Password\",\"passwordPlaceholder\":\"Enter new password\",\"confirmPassword\":\"Confirm Password\",\"confirmPasswordPlaceholder\":\"Repeat new password\",\"resetButton\":\"Reset Password\",\"resetButtonLoading\":\"Resetting...\",\"backToLogin\":\"Back to login\",\"requestNewLink\":\"Request new link\",\"validation\":{\"passwordRequired\":\"Password is required\",\"passwordLength\":\"Password must be at least 8 characters\",\"confirmPasswordRequired\":\"Please confirm your password\",\"passwordMismatch\":\"Passwords don't match\"}},\"verifyEmail\":{\"title\":\"Email Verification\",\"subtitle\":\"Verifying your email address...\",\"successTitle\":\"Email Verified!\",\"successMessage\":\"Your email has been successfully verified. You can now sign in to your account.\",\"errorTitle\":\"Verification Error\",\"errorMessage\":\"The verification link is invalid or has expired. Please request a new verification email.\",\"backToLogin\":\"Back to login\",\"resendLink\":\"Resend verification email\"},\"changePassword\":{\"title\":\"Change Password\",\"subtitle\":\"Update your account password\",\"successTitle\":\"Password Changed\",\"successMessage\":\"Your password has been successfully changed.\",\"currentPassword\":\"Current Password\",\"currentPasswordPlaceholder\":\"Enter current password\",\"newPassword\":\"New Password\",\"newPasswordPlaceholder\":\"Enter new password\",\"confirmPassword\":\"Confirm New Password\",\"confirmPasswordPlaceholder\":\"Repeat new password\",\"changeButton\":\"Change Password\",\"changeButtonLoading\":\"Changing...\",\"backToProfile\":\"Back to profile\",\"validation\":{\"currentPasswordRequired\":\"Current password is required\",\"newPasswordRequired\":\"New password is required\",\"passwordLength\":\"Password must be at least 8 characters\",\"confirmPasswordRequired\":\"Please confirm your new password\",\"passwordMismatch\":\"Passwords don't match\"}},\"resendVerification\":{\"title\":\"Verify Email\",\"subtitle\":\"Resend email verification\",\"emailSentTitle\":\"Email Sent\",\"emailSentSubtitle\":\"Check your email for verification instructions\",\"email\":\"Email\",\"emailPlaceholder\":\"Enter your email\",\"resendButton\":\"Resend Verification\",\"resendButtonLoading\":\"Sending...\",\"successMessage\":\"We've sent a new verification email to {{email}}\",\"helpText\":\"If the email doesn't arrive within a few minutes, check your spam folder\",\"backToLogin\":\"Back to login\"}},\"product\":{\"loading\":{\"text\":\"Loading product...\"},\"error\":{\"somethingWrong\":\"Something went wrong\",\"notFound\":\"Product not found\",\"notFoundMessage\":\"We couldn't find the product you're looking for.\",\"backToHome\":\"Back to home\",\"invalidSlug\":\"Invalid product slug\"},\"breadcrumbs\":{\"home\":\"Home\"},\"price\":{\"currency\":\"EUR\"},\"availability\":{\"inStock\":\"In Stock\",\"outOfStock\":\"Out of Stock\",\"lowStock\":\"Low Stock\"},\"description\":{\"noDescription\":\"Product description is not available.\"},\"variants\":{\"size\":\"Size\",\"color\":\"Color\",\"variant\":\"Variant\",\"selectedInfo\":{\"size\":\"Size:\",\"color\":\"Color:\",\"variant\":\"Variant:\"}},\"quantity\":{\"label\":\"Quantity:\"},\"buttons\":{\"buyNow\":\"Buy Now\",\"addToCart\":\"Add to Cart\",\"processing\":\"Processing...\",\"adding\":\"Adding...\"},\"relatedProducts\":{\"title\":\"Related Products\"}},\"productCard\":{\"variants\":{\"colors\":\"{{count}} color\",\"colors_plural\":\"{{count}} colors\",\"sizes\":\"{{count}} size\",\"sizes_plural\":\"{{count}} sizes\"}},\"cart\":{\"loading\":\"Loading cart...\",\"title\":\"Your Cart\",\"empty\":{\"title\":\"Cart is Empty\",\"message\":\"Add items to your cart to place an order\",\"continueShopping\":\"Start Shopping\"},\"headers\":{\"product\":\"Product\",\"price\":\"Price\",\"quantity\":\"Quantity\",\"total\":\"Total\"},\"removeItem\":\"Remove item\",\"actions\":{\"clearCart\":\"Clear Cart\",\"continueShopping\":\"Continue Shopping\",\"checkout\":\"Checkout\"},\"summary\":{\"title\":\"Summary\",\"items\":\"Items ({{count}})\",\"shipping\":\"Shipping\",\"total\":\"Total to Pay\"},\"secureCheckout\":\"Secure Payment\",\"sidebar\":{\"title\":\"Cart ({{count}})\",\"close\":\"Close cart\",\"empty\":\"Your cart is empty\",\"startShopping\":\"Start Shopping\",\"total\":\"Total\",\"viewCart\":\"View Cart\",\"checkout\":\"Checkout\"}},\"checkout\":{\"title\":\"Checkout\",\"loading\":\"Loading...\",\"emptyCart\":{\"title\":\"Cart is Empty\",\"message\":\"Add items to your cart to continue checkout.\"},\"error\":{\"title\":\"Error\",\"productLoadFailed\":\"Failed to load product information. Please try again.\",\"orderSubmissionFailed\":\"An error occurred while placing your order. Please try again.\"},\"confirmations\":{\"deleteAddress\":\"Are you sure you want to delete this address?\"},\"navigation\":{\"back\":\"← Back\",\"continue\":\"Continue →\",\"placeOrder\":\"Place Order\",\"processing\":\"Processing...\"},\"steps\":{\"information\":\"Information\",\"shipping\":\"Shipping\",\"payment\":\"Payment\",\"confirmation\":\"Confirmation\"},\"customerInfo\":{\"title\":\"Customer Information\",\"loggedIn\":\"Logged in automatically saved\",\"saving\":\"Auto-saving...\",\"savedAddresses\":\"Saved Addresses\",\"loadingAddresses\":\"Loading addresses...\",\"default\":\"Default\",\"use\":\"Use\",\"delete\":\"Delete\",\"addNewAddress\":\"Add New Address\",\"selectedAddress\":\"Selected Address\",\"firstName\":\"First Name\",\"firstNamePlaceholder\":\"Enter first name\",\"lastName\":\"Last Name\",\"lastNamePlaceholder\":\"Enter last name\",\"email\":\"Email\",\"emailPlaceholder\":\"your@email.com\",\"phone\":\"Phone\",\"phoneLabel\":\"Tel\",\"phonePlaceholder\":\"+375 (44) 123-45-67\",\"shippingAddress\":\"Shipping Address\",\"addressNote\":\"You can enter address temporarily or save it for future orders\",\"streetAddress\":\"Address\",\"streetAddressPlaceholder\":\"Street, house number\",\"apartment\":\"Apartment/Office\",\"apartmentPlaceholder\":\"Apartment, office (optional)\",\"city\":\"City\",\"cityPlaceholder\":\"Minsk\",\"state\":\"Region\",\"statePlaceholder\":\"Minsk Region\",\"postalCode\":\"Postal Code\",\"postalCodePlaceholder\":\"220000\",\"country\":\"Country\",\"saveAddress\":\"Save address for future orders\",\"countries\":{\"australia\":\"Australia\",\"austria\":\"Austria\",\"azerbaijan\":\"Azerbaijan\",\"albania\":\"Albania\",\"algeria\":\"Algeria\",\"anguilla\":\"Anguilla\",\"angola\":\"Angola\",\"antiguaAndBarbuda\":\"Antigua and Barbuda\",\"argentina\":\"Argentina\",\"aruba\":\"Aruba\",\"afghanistan\":\"Afghanistan\",\"bahamas\":\"Bahamas\",\"bangladesh\":\"Bangladesh\",\"barbados\":\"Barbados\",\"bahrain\":\"Bahrain\",\"belize\":\"Belize\",\"belgium\":\"Belgium\",\"benin\":\"Benin\",\"bermuda\":\"Bermuda\",\"bonaire\":\"Bonaire, Sint Eustatius, and Saba\",\"bulgaria\":\"Bulgaria\",\"bolivia\":\"Bolivia\",\"bosniaHerzegovina\":\"Bosnia-Herzegovina\",\"botswana\":\"Botswana\",\"brazil\":\"Brazil\",\"brunei\":\"Brunei Darussalam\",\"burkinaFaso\":\"Burkina Faso\",\"burundi\":\"Burundi\",\"bhutan\":\"Bhutan\",\"vanuatu\":\"Vanuatu\",\"vatican\":\"Vatican\",\"unitedKingdom\":\"United Kingdom of Great Britain and Northern Ireland\",\"virginIslands\":\"Virgin Islands\",\"guernsey\":\"Guernsey (Britain)\",\"jersey\":\"Jersey (Britain)\",\"gibraltar\":\"Gibraltar (Britain)\",\"hungary\":\"Hungary\",\"venezuela\":\"Venezuela\",\"vietnam\":\"Vietnam\",\"gabon\":\"Gabon\",\"haiti\":\"Haiti\",\"guyana\":\"Guyana\",\"gambia\":\"Gambia\",\"ghana\":\"Ghana\",\"guatemala\":\"Guatemala\",\"guinea\":\"Guinea\",\"germany\":\"Germany\",\"grenada\":\"Grenada\",\"greece\":\"Greece\",\"georgia\":\"Georgia\",\"denmark\":\"Denmark\",\"greenland\":\"Greenland (Denmark)\",\"faroeIslands\":\"Faroe Islands (Denmark)\",\"drCongo\":\"Democratic Republic of the Congo\",\"djibouti\":\"Djibouti\",\"dominica\":\"Dominica\",\"dominicanRepublic\":\"Dominican Republic\",\"egypt\":\"Egypt\",\"zambia\":\"Zambia\",\"zimbabwe\":\"Zimbabwe\",\"india\":\"India\",\"indonesia\":\"Indonesia\",\"jordan\":\"Jordan\",\"iraq\":\"Iraq\",\"iran\":\"Iran (Islamic Rep.)\",\"ireland\":\"Ireland\",\"iceland\":\"Iceland\",\"spain\":\"Spain\",\"canaryIslands\":\"Canary Islands (Spain)\",\"italy\":\"Italy\",\"yemen\":\"Yemen\",\"capeVerde\":\"Cape Verde\",\"kazakhstan\":\"Kazakhstan\",\"caymanIslands\":\"Cayman Islands\",\"cambodia\":\"Cambodia\",\"cameroon\":\"Cameroon\",\"canada\":\"Canada\",\"qatar\":\"Qatar\",\"kenya\":\"Kenya\",\"cyprus\":\"Cyprus\",\"kyrgyzstan\":\"Kyrgyzstan\",\"kiribati\":\"Kiribati\",\"china\":\"China\",\"hongKong\":\"Hong Kong (China)\",\"taiwan\":\"Taiwan (China)\",\"colombia\":\"Columbia\",\"comoros\":\"Comoros Islands\",\"demRepCongo\":\"Dem. Republic of the Congo\",\"northKorea\":\"Dem. People's Rep. of Korea\",\"kosovo\":\"Kosovo\",\"costaRica\":\"Costa Rica\",\"coteIvoire\":\"Côte d'Ivoire (Rep.)\",\"cuba\":\"Cuba\",\"kuwait\":\"Kuwait\",\"curacao\":\"Curaçao\",\"laos\":\"Laos\",\"latvia\":\"Latvia\",\"lesotho\":\"Lesotho\",\"liberia\":\"Liberia\",\"lebanon\":\"Lebanon\",\"libya\":\"Libya\",\"lithuania\":\"Lithuania\",\"liechtenstein\":\"Liechtenstein\",\"luxembourg\":\"Luxembourg\",\"mauritius\":\"Mauritius\",\"mauritania\":\"Mauritania\",\"madagascar\":\"Madagascar\",\"macao\":\"Macao\",\"northMacedonia\":\"North Macedonia\",\"malawi\":\"Malawi\",\"malaysia\":\"Malaysia\",\"mali\":\"Mali\",\"maldives\":\"Maldives\",\"malta\":\"Malta\",\"morocco\":\"Morocco\",\"mexico\":\"Mexico\",\"mozambique\":\"Mozambique\",\"moldova\":\"Moldova\",\"monaco\":\"Monaco\",\"mongolia\":\"Mongolia\",\"myanmar\":\"Myanmar\",\"namibia\":\"Namibia\",\"netherlands\":\"Netherlands\",\"nepal\":\"Nepal\",\"niger\":\"Niger\",\"nigeria\":\"Nigeria\",\"nicaragua\":\"Nicaragua\",\"newZealand\":\"New Zealand\",\"newCaledonia\":\"New Caledonia\",\"norway\":\"Norway\",\"uae\":\"United Arab Emirates\",\"oman\":\"Oman\",\"pakistan\":\"Pakistan\",\"panama\":\"Panama (Rep.)\",\"papuaNewGuinea\":\"Papua New Guinea\",\"paraguay\":\"Paraguay\",\"peru\":\"Peru\",\"poland\":\"Poland\",\"portugal\":\"Portugal\",\"russia\":\"Russian Federation\",\"rwanda\":\"Rwanda\",\"romania\":\"Romania\",\"salvador\":\"Salvador\",\"samoa\":\"Samoa\",\"sanMarino\":\"San Marino\",\"saoTome\":\"Sao Tome and Principe\",\"saudiArabia\":\"Saudi Arabia\",\"eswatini\":\"Eswatini (ex. Swaziland)\",\"seychelles\":\"Seychelles\",\"senegal\":\"Senegal\",\"stVincent\":\"St. Vincent and the Grenadines\",\"stKitts\":\"Saint Kitts and Nevis\",\"stLucia\":\"St. Lucia\",\"saintMartin\":\"Saint-Martin\",\"serbia\":\"Serbia\",\"singapore\":\"Singapore\",\"syria\":\"Syrian Arab Republic\",\"slovakia\":\"Slovakia\",\"slovenia\":\"Slovenia\",\"solomonIsland\":\"Solomon Island\",\"sudan\":\"Sudan\",\"suriname\":\"Surinam\",\"usa\":\"USA (United States)\",\"usVirginIslands\":\"Virgin Islands\",\"sierraLeone\":\"Sierra Leone\",\"tajikistan\":\"Tajikistan\",\"thailand\":\"Thailand\",\"tanzania\":\"Tanzania\",\"turksAndCaicos\":\"Turks and Caicos Islands\",\"togo\":\"Togolese Republic\",\"tonga\":\"Tonga\",\"trinidadAndTobago\":\"Trinidad and Tobago\",\"tunisia\":\"Tunisia\",\"turkmenistan\":\"Turkmenistan\",\"turkey\":\"Turkey\",\"uganda\":\"Uganda\",\"uzbekistan\":\"Uzbekistan\",\"ukraine\":\"Ukraine\",\"uruguay\":\"Uruguay\",\"fiji\":\"Fiji\",\"philippines\":\"Philippines\",\"finland\":\"Finland\",\"france\":\"France\",\"frenchPolynesia\":\"French Polynesia\",\"croatia\":\"Croatia\",\"centralAfricanRepublic\":\"Central African Republic\",\"chad\":\"Chad\",\"montenegro\":\"Montenegro\",\"czechRepublic\":\"Czech Republic\",\"chile\":\"Chile\",\"switzerland\":\"Switzerland\",\"sweden\":\"Sweden\",\"sriLanka\":\"Sri Lanka\",\"ecuador\":\"Ecuador\",\"equatorialGuinea\":\"Equatorial Guinea\",\"eritrea\":\"Eritrea\",\"estonia\":\"Estonia\",\"ethiopia\":\"Ethiopia\",\"southAfrica\":\"South Africa\",\"jamaica\":\"Jamaica\",\"japan\":\"Japan\"}},\"summary\":{\"title\":\"Order Summary\",\"subtotal\":\"Subtotal\",\"shipping\":\"Shipping\",\"discount\":\"Discount\",\"total\":\"Total\",\"size\":\"Size\",\"freeReturns\":\"Free Returns\",\"support\":\"24/7 Support\",\"updating\":\"Updating totals...\"},\"shipping\":{\"title\":\"Shipping\",\"standardShipping\":\"Standard Shipping\",\"standardDescription\":\"Delivery within 5-14 business days\",\"deliveryTime\":{\"today\":\"Today\",\"days\":\"{{count}} day\",\"days_plural\":\"{{count}} days\",\"range\":\"{{min}}-{{max}} days\"},\"free\":\"Free\",\"info\":\"All orders are carefully packaged and shipped within 1-2 business days\"},\"payment\":{\"title\":\"Payment Method\",\"instructions\":\"After clicking 'Place Order' you will be redirected to a secure payment page to enter your card details.\",\"cardDescription\":\"Secure card payment\"},\"secureCheckout\":\"Secure Payment\",\"confirmation\":{\"title\":\"Order Confirmation\",\"reviewText\":\"Please review your order details before placing your order.\",\"customerInfo\":{\"title\":\"Customer Information\",\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\"},\"shippingInfo\":{\"title\":\"Shipping Information\",\"address\":\"Address\",\"method\":\"Method\",\"deliveryTime\":\"Delivery Time\",\"cost\":\"Shipping Cost\"},\"paymentMethod\":{\"title\":\"Payment Method\"},\"orderItems\":{\"title\":\"Order Items\",\"quantity\":\"Quantity\",\"variant\":\"Variant\"},\"orderTotal\":{\"title\":\"Order Total\",\"subtotal\":\"Subtotal\",\"shipping\":\"Shipping\",\"discount\":\"Discount\",\"total\":\"Total\"},\"deliveryTime\":{\"oneDay\":\"1 day\",\"days\":\"{{days}} days\",\"weeks\":\"{{weeks}} weeks\"},\"terms\":{\"agree\":\"I agree to the\",\"termsLink\":\"Terms and Conditions\",\"and\":\"and\",\"privacyLink\":\"Privacy Policy\",\"error\":\"Please agree to the Terms and Conditions and Privacy Policy to proceed\"},\"button\":{\"loading\":\"Redirecting to payment...\",\"placeOrder\":\"Proceed to Payment - {{amount}} EUR\"},\"redirectNotice\":\"You will be redirected to a secure payment page\",\"securityNotice\":\"Your payment data is protected and encrypted\"},\"validation\":{\"firstNameRequired\":\"First name is required\",\"lastNameRequired\":\"Last name is required\",\"emailRequired\":\"Email is required\",\"addressRequired\":\"Address is required\",\"cityRequired\":\"City is required\",\"postalCodeRequired\":\"Postal code is required\",\"shippingMethodRequired\":\"Please select a shipping method\",\"paymentMethodRequired\":\"Please select a payment method\"},\"success\":{\"loading\":\"Loading order details...\",\"title\":\"Order Confirmed!\",\"message\":\"Thank you for your purchase. Your order has been received and is being processed.\",\"error\":{\"title\":\"Something went wrong\",\"orderNotFound\":\"Order not found\",\"returnHome\":\"Return to Home\"},\"orderInfo\":{\"title\":\"Order Information\",\"orderNumber\":\"Order Number\",\"orderDate\":\"Order Date\",\"totalAmount\":\"Total Amount\",\"paymentStatus\":\"Payment Status\"},\"shipping\":{\"title\":\"Shipping Information\",\"method\":\"Shipping Method\",\"estimatedDelivery\":\"Estimated Delivery\"},\"items\":{\"title\":\"Order Items\",\"quantity\":\"Quantity\"},\"total\":{\"subtotal\":\"Subtotal\",\"shipping\":\"Shipping\",\"discount\":\"Discount\",\"total\":\"Total\"},\"nextSteps\":{\"title\":\"What's Next?\",\"email\":{\"title\":\"Order Confirmation Email\",\"description\":\"You'll receive a confirmation email with your order details shortly.\"},\"processing\":{\"title\":\"Processing\",\"description\":\"We'll prepare your order for shipment within 1-2 business days.\"},\"shipping\":{\"title\":\"Shipping Updates\",\"description\":\"You'll receive tracking information once your order ships.\"}},\"actions\":{\"continueShopping\":\"Continue Shopping\",\"printOrder\":\"Print Order\"},\"support\":{\"title\":\"Need Help?\",\"message\":\"If you have any questions about your order, please contact our customer support team.\"}}},\"faq\":{\"hero\":{\"title\":\"Frequently Asked Questions\",\"subtitle\":\"Find answers to the most popular questions about our services\",\"searchPlaceholder\":\"Search questions...\"},\"categoriesSection\":{\"title\":\"Question Categories\"},\"categories\":{\"all\":\"All Questions\",\"orders\":\"Orders\",\"delivery\":\"Delivery\",\"payment\":\"Payment\",\"returns\":\"Returns\",\"account\":\"Account\",\"general\":\"General\"},\"resultsCount\":\"Found {{count}} questions\",\"questions\":{\"orders\":{\"howToOrder\":{\"question\":\"How to place an order on the website?\",\"answer\":\"To place an order: 1) Select a product and add it to cart, 2) Go to cart and click 'Checkout', 3) Fill in contact details and choose delivery method, 4) Confirm the order. After placing the order, you'll receive confirmation via email.\"},\"changeOrder\":{\"question\":\"Can I change or cancel an order?\",\"answer\":\"You can change or cancel an order within 30 minutes after placing it by contacting us at +375 44 537 1787 or email e.malikli1992@gmail.com. Changes are not accepted after the order is sent for processing.\"},\"trackOrder\":{\"question\":\"How to track order status?\",\"answer\":\"Order status can be tracked in your personal account in the 'My Orders' section. We also send status notifications to the email and phone number provided during checkout.\"}},\"delivery\":{\"methods\":{\"question\":\"What delivery methods are available?\",\"answer\":\"We offer several delivery methods: courier delivery in Minsk (1-2 days), delivery throughout Belarus by transport companies (2-5 days), pickup from pickup point. See detailed information about cost and timing on the 'Delivery' page.\"},\"cost\":{\"question\":\"How much does delivery cost?\",\"answer\":\"Delivery cost depends on method and region: in Minsk - from 5 EUR, throughout Belarus - from 10 EUR. For orders over 100 EUR, delivery in Minsk is free. Exact cost is calculated during checkout.\"},\"time\":{\"question\":\"What are the delivery hours?\",\"answer\":\"Courier delivery is performed Monday to Friday from 9:00 to 18:00, Saturday from 10:00 to 16:00. You can choose a convenient time slot when placing your order.\"}},\"payment\":{\"methods\":{\"question\":\"What payment methods are accepted?\",\"answer\":\"We accept the following payment methods: Visa/MasterCard bank cards, electronic money (Yandex.Money, WebMoney), bank transfer, cash on delivery (only for courier delivery).\"},\"security\":{\"question\":\"Is card payment on the website secure?\",\"answer\":\"Yes, card payment is completely secure. We use protected SSL connection and comply with PCI DSS security standards. Your card data is not saved on our servers and is transmitted directly to the bank.\"},\"when\":{\"question\":\"When is money charged from the card?\",\"answer\":\"When paying by card, money is charged immediately after order confirmation. When choosing cash payment, money is accepted by the courier upon receiving the goods.\"}},\"returns\":{\"canReturn\":{\"question\":\"Can I return a product?\",\"answer\":\"Yes, you can return a product within 14 days from receipt according to Belarus legislation. The product must be in original packaging, without signs of use, with preserved tags and receipts.\"},\"howToReturn\":{\"question\":\"How to process a return?\",\"answer\":\"To process a return, contact us at +375 44 537 1787 or email e.malikli1992@gmail.com. We'll arrange product pickup or you can bring it to our office. Money refund is processed within 10 business days.\"},\"deliveryCost\":{\"question\":\"Is delivery cost refunded when returning?\",\"answer\":\"Delivery cost is refunded only if the product is defective or doesn't match the description. When returning at buyer's request, delivery cost is not compensated.\"}},\"account\":{\"registration\":{\"question\":\"Is website registration mandatory?\",\"answer\":\"Registration is not mandatory for one-time purchases, but we recommend creating an account for convenience: you can track orders, save delivery addresses, receive personal discounts and bonuses.\"},\"forgotPassword\":{\"question\":\"How to recover forgotten password?\",\"answer\":\"On the login page, click 'Forgot password?', enter the email used during registration. We'll send you a password recovery link. If the email doesn't arrive, check your 'Spam' folder.\"},\"changeData\":{\"question\":\"How to change data in personal account?\",\"answer\":\"In your personal account, go to 'My Data' section, make necessary changes and save. To change email, confirmation to the new email address is required.\"}},\"general\":{\"contact\":{\"question\":\"How to contact support?\",\"answer\":\"You can contact us: by phone +375 44 537 1787 (Mon-Fri 9:00-18:00), by email e.malikli1992@gmail.com, through the contact form on the website. We respond to all inquiries within 24 hours.\"},\"loyalty\":{\"question\":\"Is there a loyalty program?\",\"answer\":\"Yes, we have a bonus program. For each purchase you get bonuses (5% of order amount), which you can use to pay for future purchases. Seasonal promotions and discounts for regular customers are also available.\"},\"warranty\":{\"question\":\"Do you provide warranty on products?\",\"answer\":\"All products come with warranty according to Belarus legislation. Additionally, some products have extended manufacturer warranty. Warranty conditions are specified in each product description.\"}}},\"help\":{\"title\":\"Didn't find an answer to your question?\",\"description\":\"Our support team is ready to help you anytime\",\"call\":\"Call\",\"email\":\"Email\"},\"quickLinks\":{\"title\":\"Useful Links\",\"delivery\":{\"title\":\"Delivery\",\"description\":\"Methods and delivery conditions\"},\"returns\":{\"title\":\"Returns\",\"description\":\"Product return conditions\"},\"terms\":{\"title\":\"Terms\",\"description\":\"Terms of use\"},\"privacy\":{\"title\":\"Privacy\",\"description\":\"Data processing policy\"}}},\"terms\":{\"hero\":{\"title\":\"Terms of Use\",\"subtitle\":\"Rules and conditions for using our website and services\",\"effectiveDate\":\"Effective date: May 12, 2025\"},\"general\":{\"title\":\"General Provisions\",\"welcome\":\"Welcome to Malikli1992\",\"intro\":\"These Terms of Use govern the relationship between Malikli1992 (hereinafter - 'Company') and website users regarding the use of the Website and provided services.\",\"agreement\":\"By using our website, you agree to these terms and undertake to comply with them. If you disagree with any provisions, please refrain from using our website.\"},\"userGuidelines\":{\"title\":\"User Guidelines\",\"registration\":{\"title\":\"Registration\",\"description\":\"Providing accurate and up-to-date information when creating an account\",\"details\":\"User undertakes to provide accurate data and update it timely\"},\"orders\":{\"title\":\"Placing Orders\",\"description\":\"Following instructions and rules when placing orders\",\"details\":\"All orders are processed according to established procedures and timelines\"},\"payment\":{\"title\":\"Payment\",\"description\":\"Using legal payment methods and meeting deadlines\",\"details\":\"Payment is made in accordance with the conditions specified on the website\"},\"usage\":{\"title\":\"Website Usage\",\"description\":\"Compliance with rules and restrictions when working with the platform\",\"details\":\"Any malicious or illegal use of the resource is prohibited\"}},\"companyServices\":{\"title\":\"Our Services\",\"products\":{\"title\":\"Product Provision\",\"description\":\"Sale of quality products according to website description\"},\"delivery\":{\"title\":\"Delivery\",\"description\":\"Organization of product delivery to specified address\"},\"returns\":{\"title\":\"Returns and Exchange\",\"description\":\"Ensuring return possibility in accordance with law\"},\"dataProtection\":{\"title\":\"Data Protection\",\"description\":\"Ensuring security of users' personal data\"}},\"responsibilities\":{\"title\":\"Rights and Responsibilities\",\"user\":{\"title\":\"User Responsibilities\",\"items\":{\"accurate\":\"Providing accurate information\",\"rules\":\"Compliance with website usage rules\",\"payment\":\"Timely payment of orders\",\"updates\":\"Notification of contact data changes\"}},\"company\":{\"title\":\"Company Responsibilities\",\"items\":{\"quality\":\"Providing quality products\",\"delivery\":\"Meeting delivery deadlines\",\"website\":\"Ensuring website functionality\",\"dataProtection\":\"Protecting users' personal data\"}}},\"paymentDelivery\":{\"title\":\"Payment and Delivery\",\"payment\":{\"title\":\"Payment Terms\",\"description\":\"Payment is made in Belarusian rubles. Bank cards, electronic payments and cash on delivery are accepted. All prices are inclusive of VAT.\"},\"delivery\":{\"title\":\"Delivery Terms\",\"description\":\"Delivery is carried out throughout the Republic of Belarus. Detailed conditions and delivery cost are specified on the corresponding website page.\"}},\"intellectualProperty\":{\"title\":\"Intellectual Property\",\"copyright\":{\"title\":\"Copyright\",\"description\":\"All texts, images and website design are protected by copyright\"},\"trademarks\":{\"title\":\"Trademarks\",\"description\":\"Brand logos and names are registered trademarks\"},\"confidential\":{\"title\":\"Confidential Information\",\"description\":\"Copying and use without written consent is prohibited\"}},\"liability\":{\"title\":\"Limitation of Liability\",\"limitations\":{\"title\":\"Limitations\",\"description\":\"The Company is not liable for damage caused to the user due to improper use of the Website or provided services, except in cases provided by the legislation of the Republic of Belarus.\",\"technical\":\"Technical failures and temporary website unavailability\",\"thirdParty\":\"Actions of third parties\",\"forceMajeure\":\"Force majeure circumstances\",\"improperUse\":\"Improper use of products by the buyer\"}},\"applicableLaw\":{\"title\":\"Applicable Law\",\"jurisdiction\":{\"title\":\"Jurisdiction\",\"description\":\"These Terms of Use are governed by the legislation of the Republic of Belarus. All disputes are resolved in accordance with the current legislation of the Republic of Belarus.\"},\"disputes\":\"In case of disputes, the parties undertake to resolve them through negotiations. If agreement cannot be reached, disputes are considered in court.\"},\"contact\":{\"title\":\"Questions about terms of use?\",\"description\":\"Contact us for clarifications and assistance\",\"workingHours\":\"Working hours: 24/7\"},\"updates\":{\"title\":\"Changes to Terms of Use\",\"description\":\"The Company reserves the right to make changes to these Terms of Use. Changes take effect from the moment of their publication on the Website. We recommend regularly reviewing this page to familiarize yourself with current terms.\"}},\"privacy\":{\"hero\":{\"title\":\"Privacy Policy\",\"subtitle\":\"We take the protection of your personal data seriously\",\"effectiveDate\":\"Effective date: May 12, 2025\"},\"general\":{\"title\":\"General Provisions\",\"about\":\"About this policy\",\"intro\":\"This Privacy Policy defines the procedure for processing and protecting personal data of users provided when using the MALIKLI1992 website (hereinafter - 'Website').\",\"compliance\":\"Personal data processing is carried out in accordance with the Law of the Republic of Belarus of November 15, 2021 'On Personal Data Protection' and other regulatory acts of the Republic of Belarus.\"},\"dataTypes\":{\"title\":\"What Data We Collect\",\"personal\":{\"title\":\"Personal Information\",\"name\":\"Full name\",\"birthDate\":\"Date of birth\",\"passport\":\"Passport data\"},\"contact\":{\"title\":\"Contact Data\",\"email\":\"Email address\",\"phone\":\"Phone number\",\"address\":\"Delivery address\"},\"payment\":{\"title\":\"Payment Information\",\"details\":\"Payment details\",\"history\":\"Order history\",\"methods\":\"Payment methods\"},\"additional\":{\"title\":\"Additional Data\",\"preferences\":\"User preferences\",\"history\":\"Visit history\",\"reviews\":\"Reviews and comments\"}},\"purposes\":{\"title\":\"Data Processing Purposes\",\"orders\":{\"title\":\"Order Processing\",\"description\":\"Processing, confirming and fulfilling your orders\"},\"communication\":{\"title\":\"User Communication\",\"description\":\"Order status notifications and customer service\"},\"marketing\":{\"title\":\"Marketing Materials\",\"description\":\"Sending news and promotional offers (with consent)\"},\"improvement\":{\"title\":\"Service Improvement\",\"description\":\"Analysis and improvement of our service quality\"}},\"userRights\":{\"title\":\"Your Rights\",\"information\":{\"title\":\"Right to Information\",\"description\":\"Receive complete information about your personal data and methods of its processing\"},\"modification\":{\"title\":\"Right to Modification\",\"description\":\"Require correction of inaccurate or incomplete personal data\"},\"deletion\":{\"title\":\"Right to Deletion\",\"description\":\"Require deletion of your personal data in cases established by law\"},\"withdrawal\":{\"title\":\"Right to Withdraw Consent\",\"description\":\"Withdraw consent for personal data processing at any time\"}},\"security\":{\"title\":\"Data Protection and Storage\",\"technical\":{\"title\":\"Technical Measures\",\"description\":\"We use modern encryption technologies and secure servers to ensure the security of your data.\"},\"organizational\":{\"title\":\"Organizational Measures\",\"description\":\"Only authorized employees who are obliged to maintain confidentiality have access to personal data.\"},\"retention\":{\"title\":\"Storage Period\",\"description\":\"Personal data is stored no longer than necessary to achieve processing purposes.\"}},\"thirdParty\":{\"title\":\"Data Transfer to Third Parties\",\"when\":{\"title\":\"When we transfer data\",\"description\":\"Personal data may be transferred to third parties only in cases provided by the legislation of the Republic of Belarus or with your direct consent.\",\"contractual\":\"When fulfilling contractual obligations\",\"government\":\"At the request of authorized government agencies\",\"consent\":\"With your written consent\",\"security\":\"To ensure security and prevent fraud\"}},\"consent\":{\"title\":\"Consent for Processing\",\"how\":{\"title\":\"How you give consent\",\"description\":\"The user gives consent for processing their personal data when registering on the Website or placing an order, by checking the corresponding field.\"},\"withdrawal\":\"Consent can be withdrawn at any time by sending written notice to our email address.\"},\"contact\":{\"title\":\"Questions about data processing?\",\"description\":\"Contact us for additional information\",\"workingHours\":\"Working hours: 24/7\"},\"updates\":{\"title\":\"Changes to Privacy Policy\",\"description\":\"We reserve the right to make changes to this Privacy Policy. Changes take effect from the moment of their publication on the Website. We recommend regularly checking this page to familiarize yourself with the current version of the Policy.\"}},\"delivery\":{\"hero\":{\"title\":\"Delivery & Payment\",\"subtitle\":\"Fast and reliable delivery throughout Belarus\"},\"methods\":{\"title\":\"Delivery Methods\",\"post\":{\"title\":\"Belpost\",\"description\":\"Delivery throughout the Republic of Belarus\",\"timeframe\":\"2-5 business days\",\"pricing\":\"According to Belpost tariffs\"},\"courier\":{\"title\":\"Courier Delivery\",\"description\":\"Fast delivery in Minsk\",\"timeframe\":\"1-2 business days\",\"pricing\":\"Specified when ordering\"}},\"details\":{\"timeframe\":\"Duration\",\"cost\":\"Cost\"},\"conditions\":{\"title\":\"Delivery Conditions\",\"geography\":{\"title\":\"Geography\",\"description\":\"Delivery throughout the Republic of Belarus\"},\"payment\":{\"title\":\"Payment\",\"description\":\"Cash on delivery or online payment\"},\"support\":{\"title\":\"Support\",\"description\":\"24/7 round-the-clock support\"}},\"faq\":{\"title\":\"Frequently Asked Questions\",\"duration\":{\"question\":\"How long does delivery take?\",\"answer\":\"Average delivery time by post is two to five business days. Courier delivery in Minsk takes 1-2 business days.\"},\"changeAddress\":{\"question\":\"Can I change the delivery address after placing an order?\",\"answer\":\"Yes, you can change the delivery address before the order is shipped. Contact our support service at +375 44 537 1787 or write to e.malikli1992@gmail.com.\"},\"tracking\":{\"question\":\"How to track my order?\",\"answer\":\"After shipping the order, you will receive a tracking number. You can track the package on the Belpost website or in our personal account.\"},\"lostPackage\":{\"question\":\"What to do if the package is lost or damaged?\",\"answer\":\"Contact our support service within 48 hours of receipt. We will promptly resolve the issue with the carrier and ensure replacement or refund of the product.\"}},\"contact\":{\"title\":\"Have questions?\",\"description\":\"Contact our support service\"}},\"returns\":{\"hero\":{\"title\":\"Returns & Exchange\",\"subtitle\":\"Simple and transparent product return procedure\"},\"process\":{\"title\":\"Return Process\",\"contact\":{\"title\":\"Contact Us\",\"description\":\"Contact support within 14 days of purchase\"},\"prepare\":{\"title\":\"Prepare the Product\",\"description\":\"Ensure the product is in original condition with tags and packaging\"},\"send\":{\"title\":\"Send the Product\",\"description\":\"Send the product to the specified address or hand it to the courier\"},\"receive\":{\"title\":\"Receive Refund\",\"description\":\"After product inspection, we will refund or exchange\"}},\"conditions\":{\"title\":\"Return Conditions\",\"accepted\":{\"title\":\"We accept for return\",\"original\":\"Products in original packaging\",\"unworn\":\"Unworn items with tags\",\"unused\":\"Products without signs of use\",\"appearance\":\"Items with preserved appearance\"},\"notAccepted\":{\"title\":\"We do not accept for return\",\"used\":\"Used products\",\"noTags\":\"Items without original tags\",\"damaged\":\"Damaged products\",\"noPackaging\":\"Products with damaged packaging\"}},\"legal\":{\"title\":\"Legal Information\",\"basis\":{\"title\":\"Legislative Basis\",\"description\":\"A product of proper quality can be returned if its appearance, factory labels, tags, consumer properties are preserved, and a document confirming the purchase is attached. Used products cannot be returned.\"},\"law\":\"According to Article 28 of the Law of the Republic of Belarus of January 9, 2002 'On Consumer Rights Protection', the consumer has the right to return a product of proper quality or exchange it for a similar product within fourteen days.\"},\"faq\":{\"title\":\"Frequently Asked Questions\",\"timeLimit\":{\"question\":\"Within what time can a product be returned?\",\"answer\":\"According to Article 28 of the Law of the Republic of Belarus 'On Consumer Rights Protection', return of a product of proper quality is possible within fourteen days from the date of purchase.\"},\"documents\":{\"question\":\"What documents are needed for return?\",\"answer\":\"For return, a document confirming the purchase (receipt, payment receipt) is required, as well as a return application that can be filled out when applying.\"},\"exchange\":{\"question\":\"Can I exchange a product for a different size?\",\"answer\":\"Yes, exchange for a similar product of different size or color is possible if available in stock. If no suitable product is available, we will process a money refund.\"},\"shippingCost\":{\"question\":\"Who pays for shipping when returning?\",\"answer\":\"If the product is returned due to seller's fault (defect, non-compliance), we pay for shipping. When returning a product of proper quality, the buyer pays for shipping.\"},\"refundTime\":{\"question\":\"When will money be returned?\",\"answer\":\"Money refund is processed within 7 business days after receiving and checking the returned product to the same payment method used for purchase.\"}},\"contact\":{\"title\":\"Need help with return?\",\"description\":\"Our support service will help you with the return procedure\",\"workingHours\":\"Working hours: 24/7\"}},\"profile\":{\"loading\":\"Loading profile...\",\"edit\":\"Edit\",\"cancel\":\"Cancel\",\"logout\":\"Logout\",\"saveChanges\":\"Save Changes\",\"notSpecified\":\"Not specified\",\"personalInfo\":{\"title\":\"Personal Information\",\"firstName\":\"First Name\",\"lastName\":\"Last Name\",\"email\":\"Email\",\"phone\":\"Phone\",\"phonePlaceholder\":\"+375 (44) 123-45-67\"},\"accountSettings\":{\"title\":\"Account Settings\",\"changePassword\":{\"title\":\"Change Password\",\"description\":\"Update your password to keep your account secure\",\"button\":\"Change\"},\"notifications\":{\"title\":\"Notifications\",\"description\":\"Manage your notification preferences\",\"button\":\"Configure\"}},\"orders\":{\"title\":\"My Orders\",\"noOrders\":\"You don't have any orders yet\",\"startShopping\":\"Start Shopping\"}},\"footer\":{\"description\":\"Exclusive monthly drops and unique products.\",\"companyInfo\":{\"fullName\":\"Limited Liability Company \\\"MALIKLI 1992\\\"\",\"manufacturer\":\"Manufacturer: LLC \\\"MALIKLI 1992\\\"\",\"registration\":\"State registration certificate No. 193863901, issued on 21.04.2025 by Minsk City Executive Committee\",\"address\":\"220005, Minsk, Vera Khoruzhey str., 6A, premises 94I\",\"tradeRegistry\":\"Trade register registration\"},\"information\":{\"title\":\"Information\",\"faq\":\"FAQ\",\"delivery\":\"Delivery & Payment\",\"returns\":\"Returns\",\"terms\":\"Terms of Use\",\"privacy\":\"Privacy Policy\"},\"contact\":{\"title\":\"Contact Us\",\"workingHours\":\"Working hours: 24/7\"},\"copyright\":\"© {{year}} LLC \\\"MALIKLI 1992\\\". All rights reserved.\"},\"orders\":{\"title\":\"My Orders\",\"subtitle\":\"Track and manage your orders\",\"loading\":\"Loading your orders...\",\"orderCount\":\"{{count}} order\",\"orderCount_plural\":\"{{count}} orders\",\"orderDate\":\"Order Date\",\"total\":\"Total\",\"filters\":{\"status\":\"Filter by Status\",\"allStatuses\":\"All Statuses\",\"sortBy\":\"Sort By\",\"dateDesc\":\"Newest First\",\"dateAsc\":\"Oldest First\",\"amountDesc\":\"Highest Amount\",\"amountAsc\":\"Lowest Amount\",\"statusAsc\":\"Status A-Z\"},\"status\":{\"pending\":\"Pending\",\"confirmed\":\"Confirmed\",\"processing\":\"Processing\",\"shipped\":\"Shipped\",\"delivered\":\"Delivered\",\"cancelled\":\"Cancelled\"},\"paymentStatus\":{\"pending\":\"Payment Pending\",\"paid\":\"Paid\",\"failed\":\"Payment Failed\",\"refunded\":\"Refunded\"},\"item\":{\"color\":\"Color\",\"size\":\"Size\",\"quantity\":\"Qty\"},\"delivery\":{\"title\":\"Delivery Information\",\"trackingNumber\":\"Tracking Number\",\"track\":\"Track\",\"estimated\":\"Estimated Delivery\"},\"actions\":{\"viewDetails\":\"View Details\",\"reorder\":\"Reorder\",\"cancel\":\"Cancel Order\",\"confirmCancel\":\"Are you sure you want to cancel this order?\",\"backToOrders\":\"Back to Orders\",\"retryPayment\":\"Retry Payment\"},\"empty\":{\"title\":\"No Orders Yet\",\"message\":\"You haven't placed any orders yet. Start shopping to see your orders here.\",\"startShopping\":\"Start Shopping\"},\"error\":{\"title\":\"Something went wrong\",\"retry\":\"Try Again\",\"orderNotFound\":\"Order not found\",\"backToOrders\":\"Back to Orders\"}},\"orderDetails\":{\"summary\":{\"title\":\"Order Summary\",\"lastUpdated\":\"Last Updated\",\"shippingMethod\":\"Shipping Method\"},\"customer\":{\"title\":\"Customer Information\",\"name\":\"Name\",\"email\":\"Email\",\"phone\":\"Phone\"},\"shipping\":{\"title\":\"Shipping Information\",\"address\":\"Shipping Address\"},\"items\":{\"title\":\"Order Items\",\"each\":\"each\"},\"total\":{\"title\":\"Order Total\",\"subtotal\":\"Subtotal\",\"shipping\":\"Shipping\",\"discount\":\"Discount\",\"total\":\"Total\",\"free\":\"Free\"},\"actions\":{\"print\":\"Print Order\"}},\"paymentCallback\":{\"processing\":{\"title\":\"Processing Payment\",\"message\":\"Please wait while we process your payment...\"},\"error\":{\"title\":\"Payment Processing Error\",\"viewOrders\":\"View My Orders\",\"backHome\":\"Back to Home\"}},\"orderComplete\":{\"loading\":\"Loading order details...\",\"success\":{\"title\":\"Order Complete!\",\"message\":\"Thank you for your purchase. Your order has been successfully placed and payment confirmed.\"},\"summary\":{\"title\":\"Order Summary\",\"orderNumber\":\"Order Number\",\"total\":\"Total Amount\",\"paymentStatus\":\"Payment Status\",\"orderStatus\":\"Order Status\"},\"items\":{\"title\":\"Items Ordered\",\"quantity\":\"Qty\",\"andMore\":\"and {{count}} more items\"},\"nextSteps\":{\"title\":\"What happens next?\",\"confirmation\":\"You'll receive an order confirmation email shortly\",\"processing\":\"We'll start processing your order within 24 hours\",\"shipping\":\"Your items will be prepared for shipping\",\"tracking\":\"You'll receive tracking information once shipped\"},\"actions\":{\"viewOrder\":\"View Order Details\",\"continueShopping\":\"Continue Shopping\"},\"error\":{\"title\":\"Unable to Load Order\",\"viewOrders\":\"View All Orders\",\"backHome\":\"Back to Home\"}},\"orderFailed\":{\"loading\":\"Loading order details...\",\"title\":\"Payment Failed\",\"message\":\"We're sorry, but your payment could not be processed. Please try again or contact our support team.\",\"reason\":{\"title\":\"Failure Reason\"},\"orderInfo\":{\"title\":\"Order Information\",\"orderNumber\":\"Order Number\",\"amount\":\"Amount\",\"status\":\"Order Status\",\"paymentStatus\":\"Payment Status\"},\"nextSteps\":{\"title\":\"What you can do:\",\"checkPayment\":\"Check your payment method details\",\"tryAgain\":\"Try the payment again\",\"differentMethod\":\"Use a different payment method\",\"contactSupport\":\"Contact our support team for assistance\"},\"commonIssues\":{\"title\":\"Common Payment Issues\",\"insufficientFunds\":{\"title\":\"Insufficient Funds\",\"description\":\"Make sure your account has enough balance for this transaction.\"},\"cardExpired\":{\"title\":\"Expired Card\",\"description\":\"Check that your card hasn't expired and try again.\"},\"networkError\":{\"title\":\"Network Connection\",\"description\":\"Poor connection might have interrupted the payment. Please try again.\"}},\"actions\":{\"tryAgain\":\"Try Payment Again\",\"contactSupport\":\"Contact Support\",\"viewOrders\":\"View My Orders\"}}}"));}}),
"[project]/src/locales/ru.json (json)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v(JSON.parse("{\"nav\":{\"home\":\"На главную\",\"delivery\":\"Доставка и Оплата\",\"about\":\"О нас\",\"contact\":\"Контакты\",\"profile\":\"Мой профиль\",\"orders\":\"Мои заказы\",\"favorites\":\"Избранное\",\"settings\":\"Настройки\",\"logout\":\"Выйти\",\"login\":\"Войти\",\"register\":\"Регистрация\"},\"common\":{\"loading\":\"Загрузка...\",\"error\":\"Произошла ошибка\",\"tryAgain\":\"Попробовать снова\",\"buyNow\":\"Купить сейчас\",\"addToCart\":\"В корзину\",\"selectOptions\":\"Выберите варианты\",\"checkingAuth\":\"Проверка авторизации...\"},\"home\":{\"error\":{\"title\":\"Произошла ошибка\",\"button\":\"Попробовать снова\"},\"loading\":{\"slider\":\"Загрузка слайдера...\",\"products\":\"Загрузка товаров...\"},\"slider\":{\"promo1Alt\":\"Рекламный баннер 1\",\"promo1Title\":\"Рекламный баннер 1\",\"promo1Description\":\"Посмотрите наши акции\",\"promo2Alt\":\"Рекламный баннер 2\",\"promo2Title\":\"Рекламный баннер 2\",\"promo2Description\":\"Специальные предложения доступны\",\"newCollectionAlt\":\"Поступление новой коллекции\",\"newCollectionTitle\":\"Новая коллекция\",\"newCollectionDescription\":\"Откройте для себя наши новинки\"},\"welcome\":{\"title\":\"Добро пожаловать в Malikli\",\"subtitle\":\"В настоящее время товары не найдены. Пожалуйста, зайдите позже.\",\"viewDrops\":\"Смотреть Дропы\"},\"noProducts\":\"Товары в данной коллекции не найдены.\"},\"auth\":{\"login\":{\"title\":\"Добро пожаловать\",\"subtitle\":\"Войдите в свой аккаунт\",\"username\":\"Имя пользователя или Email\",\"usernamePlaceholder\":\"Введите имя пользователя или email\",\"password\":\"Пароль\",\"passwordPlaceholder\":\"Введите пароль\",\"rememberMe\":\"Запомнить меня\",\"forgotPassword\":\"Забыли пароль?\",\"loginButton\":\"Войти\",\"loginButtonLoading\":\"Входим...\",\"noAccount\":\"Нет аккаунта?\",\"registerLink\":\"Зарегистрироваться\",\"orDivider\":\"или\",\"socialGoogle\":\"Google\",\"socialFacebook\":\"Facebook\",\"errorDefault\":\"Ошибка входа. Проверьте данные.\"},\"register\":{\"title\":\"Создать аккаунт\",\"subtitle\":\"Присоединяйтесь к Malikli сегодня\",\"firstName\":\"Имя\",\"firstNamePlaceholder\":\"Ваше имя\",\"lastName\":\"Фамилия\",\"lastNamePlaceholder\":\"Ваша фамилия\",\"username\":\"Имя пользователя\",\"usernamePlaceholder\":\"Выберите имя пользователя\",\"email\":\"Email\",\"emailPlaceholder\":\"your@email.com\",\"phone\":\"Телефон\",\"phonePlaceholder\":\"+7 (xxx) xxx-xx-xx\",\"password\":\"Пароль\",\"passwordPlaceholder\":\"Создайте пароль\",\"confirmPassword\":\"Подтвердите пароль\",\"confirmPasswordPlaceholder\":\"Повторите пароль\",\"acceptTerms\":\"Я согласен с\",\"termsLink\":\"условиями использования\",\"andText\":\"и\",\"privacyLink\":\"политикой конфиденциальности\",\"registerButton\":\"Создать аккаунт\",\"registerButtonLoading\":\"Создаём аккаунт...\",\"hasAccount\":\"Уже есть аккаунт?\",\"loginLink\":\"Войти\",\"orDivider\":\"или\",\"socialGoogle\":\"Google\",\"socialFacebook\":\"Facebook\",\"errorDefault\":\"Ошибка регистрации. Проверьте данные.\",\"successMessage\":\"Регистрация успешна! Мы отправили письмо для подтверждения email на ваш адрес. Проверьте почту и перейдите по ссылке для активации аккаунта.\",\"redirectInfo\":\"Автоматический переход на страницу входа через {{seconds}} секунд\",\"redirectNow\":\"Перейти сейчас\",\"stayHere\":\"Остаться здесь\",\"validation\":{\"acceptTerms\":\"Пожалуйста, примите условия использования\",\"passwordMismatch\":\"Пароли не совпадают\"}},\"forgotPassword\":{\"title\":\"Забыли пароль?\",\"subtitle\":\"Введите ваш email и мы отправим инструкции для сброса пароля\",\"emailSentTitle\":\"Письмо отправлено\",\"emailSentSubtitle\":\"Проверьте вашу электронную почту для инструкций по сбросу пароля\",\"email\":\"Электронная почта\",\"emailPlaceholder\":\"Введите ваш email\",\"sendButton\":\"Отправить инструкции\",\"sendButtonLoading\":\"Отправка...\",\"successMessage\":\"Мы отправили инструкции по сбросу пароля на адрес {{email}}\",\"helpText\":\"Если письмо не пришло в течение нескольких минут, проверьте папку спам\",\"backToLogin\":\"Вернуться к входу\",\"rememberedPassword\":\"Вспомнили пароль?\",\"loginLink\":\"Войти\",\"noAccount\":\"Нет аккаунта?\",\"registerLink\":\"Зарегистрироваться\"},\"resetPassword\":{\"title\":\"Новый пароль\",\"subtitle\":\"Введите ваш новый пароль\",\"invalidLinkTitle\":\"Недействительная ссылка\",\"invalidLinkMessage\":\"Эта ссылка для сброса пароля недействительна или истекла. Пожалуйста, запросите новую.\",\"successTitle\":\"Пароль изменен\",\"successMessage\":\"Ваш пароль был успешно изменен. Теперь вы можете войти с новым паролем.\",\"password\":\"Новый пароль\",\"passwordPlaceholder\":\"Введите новый пароль\",\"confirmPassword\":\"Подтвердите пароль\",\"confirmPasswordPlaceholder\":\"Повторите новый пароль\",\"resetButton\":\"Сбросить пароль\",\"resetButtonLoading\":\"Сбрасываем...\",\"backToLogin\":\"Вернуться к входу\",\"requestNewLink\":\"Запросить новую ссылку\",\"validation\":{\"passwordRequired\":\"Пароль обязателен\",\"passwordLength\":\"Пароль должен содержать минимум 8 символов\",\"confirmPasswordRequired\":\"Подтвердите пароль\",\"passwordMismatch\":\"Пароли не совпадают\"}},\"verifyEmail\":{\"title\":\"Подтверждение email\",\"subtitle\":\"Подтверждаем ваш адрес электронной почты...\",\"successTitle\":\"Email подтвержден!\",\"successMessage\":\"Ваш email был успешно подтвержден. Теперь вы можете войти в свой аккаунт.\",\"errorTitle\":\"Ошибка подтверждения\",\"errorMessage\":\"Ссылка для подтверждения недействительна или истекла. Пожалуйста, запросите новое письмо для подтверждения.\",\"backToLogin\":\"Вернуться к входу\",\"resendLink\":\"Повторно отправить письмо подтверждения\"},\"changePassword\":{\"title\":\"Изменить пароль\",\"subtitle\":\"Обновите пароль вашего аккаунта\",\"successTitle\":\"Пароль изменен\",\"successMessage\":\"Ваш пароль был успешно изменен.\",\"currentPassword\":\"Текущий пароль\",\"currentPasswordPlaceholder\":\"Введите текущий пароль\",\"newPassword\":\"Новый пароль\",\"newPasswordPlaceholder\":\"Введите новый пароль\",\"confirmPassword\":\"Подтвердите новый пароль\",\"confirmPasswordPlaceholder\":\"Повторите новый пароль\",\"changeButton\":\"Изменить пароль\",\"changeButtonLoading\":\"Изменяем...\",\"backToProfile\":\"Вернуться в профиль\",\"validation\":{\"currentPasswordRequired\":\"Текущий пароль обязателен\",\"newPasswordRequired\":\"Новый пароль обязателен\",\"passwordLength\":\"Пароль должен содержать минимум 8 символов\",\"confirmPasswordRequired\":\"Подтвердите новый пароль\",\"passwordMismatch\":\"Пароли не совпадают\"}},\"resendVerification\":{\"title\":\"Подтвердить email\",\"subtitle\":\"Повторно отправить письмо подтверждения\",\"emailSentTitle\":\"Письмо отправлено\",\"emailSentSubtitle\":\"Проверьте вашу электронную почту для инструкций по подтверждению\",\"email\":\"Email\",\"emailPlaceholder\":\"Введите ваш email\",\"resendButton\":\"Повторно отправить подтверждение\",\"resendButtonLoading\":\"Отправка...\",\"successMessage\":\"Мы отправили новое письмо подтверждения на адрес {{email}}\",\"helpText\":\"Если письмо не пришло в течение нескольких минут, проверьте папку спам\",\"backToLogin\":\"Вернуться к входу\"}},\"product\":{\"loading\":{\"text\":\"Загружаем товар...\"},\"error\":{\"somethingWrong\":\"Что-то пошло не так\",\"notFound\":\"Товар не найден\",\"notFoundMessage\":\"Мы не смогли найти товар, который вы ищете.\",\"backToHome\":\"Вернуться на главную\",\"invalidSlug\":\"Неверный идентификатор товара\"},\"breadcrumbs\":{\"home\":\"Главная\"},\"price\":{\"currency\":\"EUR\"},\"availability\":{\"inStock\":\"В наличии\",\"outOfStock\":\"Нет в наличии\",\"lowStock\":\"Мало в наличии\"},\"description\":{\"noDescription\":\"Описание товара отсутствует.\"},\"variants\":{\"size\":\"Размер\",\"color\":\"Цвет\",\"variant\":\"Вариант\",\"selectedInfo\":{\"size\":\"Размер:\",\"color\":\"Цвет:\",\"variant\":\"Вариант:\"}},\"quantity\":{\"label\":\"Количество:\"},\"buttons\":{\"buyNow\":\"Купить сейчас\",\"addToCart\":\"В корзину\",\"processing\":\"Обрабатываем...\",\"adding\":\"Добавляем...\"},\"relatedProducts\":{\"title\":\"Похожие товары\"}},\"productCard\":{\"variants\":{\"colors\":\"{{count}} цвет\",\"colors_plural\":\"{{count}} цвета\",\"colors_many\":\"{{count}} цветов\",\"sizes\":\"{{count}} размер\",\"sizes_plural\":\"{{count}} размера\",\"sizes_many\":\"{{count}} размеров\"}},\"cart\":{\"loading\":\"Загрузка корзины...\",\"title\":\"Ваша корзина\",\"empty\":{\"title\":\"Корзина пуста\",\"message\":\"Добавьте товары в корзину, чтобы оформить заказ\",\"continueShopping\":\"Перейти к покупкам\"},\"headers\":{\"product\":\"Товар\",\"price\":\"Цена\",\"quantity\":\"Количество\",\"total\":\"Итого\"},\"removeItem\":\"Удалить товар\",\"actions\":{\"clearCart\":\"Очистить корзину\",\"continueShopping\":\"Продолжить покупки\",\"checkout\":\"Оформить заказ\"},\"summary\":{\"title\":\"Итого\",\"items\":\"Товары ({{count}})\",\"shipping\":\"Доставка\",\"total\":\"Итого к оплате\"},\"secureCheckout\":\"Безопасная оплата\",\"sidebar\":{\"title\":\"Корзина ({{count}})\",\"close\":\"Закрыть корзину\",\"empty\":\"Ваша корзина пуста\",\"startShopping\":\"Начать покупки\",\"total\":\"Итого\",\"viewCart\":\"Просмотр корзины\",\"checkout\":\"Оформить заказ\"}},\"checkout\":{\"title\":\"Оформление заказа\",\"loading\":\"Загрузка...\",\"emptyCart\":{\"title\":\"Корзина пуста\",\"message\":\"Добавьте товары в корзину для оформления заказа.\"},\"error\":{\"title\":\"Ошибка\",\"productLoadFailed\":\"Не удалось загрузить информацию о товаре. Попробуйте еще раз.\",\"orderSubmissionFailed\":\"Произошла ошибка при оформлении заказа. Попробуйте снова.\"},\"confirmations\":{\"deleteAddress\":\"Вы уверены, что хотите удалить этот адрес?\"},\"navigation\":{\"back\":\"← Назад\",\"continue\":\"Продолжить →\",\"placeOrder\":\"Оформить заказ\",\"processing\":\"Обработка...\"},\"steps\":{\"information\":\"Информация\",\"shipping\":\"Доставка\",\"payment\":\"Оплата\",\"confirmation\":\"Подтверждение\"},\"customerInfo\":{\"title\":\"Информация о клиенте\",\"loggedIn\":\"Вход выполнен, данные сохраняются автоматически\",\"saving\":\"Автосохранение...\",\"savedAddresses\":\"Сохраненные адреса\",\"loadingAddresses\":\"Загрузка адресов...\",\"default\":\"По умолчанию\",\"use\":\"Использовать\",\"delete\":\"Удалить\",\"addNewAddress\":\"Добавить новый адрес\",\"selectedAddress\":\"Выбранный адрес\",\"firstName\":\"Имя\",\"firstNamePlaceholder\":\"Введите имя\",\"lastName\":\"Фамилия\",\"lastNamePlaceholder\":\"Введите фамилию\",\"email\":\"Email\",\"emailPlaceholder\":\"your@email.com\",\"phone\":\"Телефон\",\"phoneLabel\":\"Тел\",\"phonePlaceholder\":\"+375 (44) 123-45-67\",\"shippingAddress\":\"Адрес доставки\",\"addressNote\":\"Вы можете ввести адрес временно или сохранить его для будущих заказов\",\"streetAddress\":\"Адрес\",\"streetAddressPlaceholder\":\"Улица, дом\",\"apartment\":\"Квартира/офис\",\"apartmentPlaceholder\":\"Квартира, офис (необязательно)\",\"city\":\"Город\",\"cityPlaceholder\":\"Минск\",\"state\":\"Область\",\"statePlaceholder\":\"Минская область\",\"postalCode\":\"Почтовый индекс\",\"postalCodePlaceholder\":\"220000\",\"country\":\"Страна\",\"saveAddress\":\"Сохранить адрес для будущих заказов\",\"countries\":{\"belarus\":\"Беларусь\",\"russia\":\"Россия\",\"ukraine\":\"Украина\",\"kazakhstan\":\"Казахстан\",\"poland\":\"Польша\",\"lithuania\":\"Литва\",\"latvia\":\"Латвия\",\"estonia\":\"Эстония\"}},\"summary\":{\"title\":\"Итоги заказа\",\"subtotal\":\"Подытог\",\"shipping\":\"Доставка\",\"discount\":\"Скидка\",\"total\":\"Итого\",\"size\":\"Размер\",\"freeReturns\":\"Бесплатный возврат\",\"support\":\"Поддержка 24/7\",\"updating\":\"Обновление итогов...\"},\"shipping\":{\"title\":\"Доставка\",\"standardShipping\":\"Стандартная доставка\",\"standardDescription\":\"Доставка в течение 5-14 рабочих дней\",\"deliveryTime\":{\"today\":\"Сегодня\",\"days\":\"{{count}} день\",\"days_plural\":\"{{count}} дней\",\"range\":\"{{min}}-{{max}} дней\"},\"free\":\"Бесплатно\",\"info\":\"Все заказы упаковываются с особой тщательностью и отправляются в течение 1-2 рабочих дней\"},\"payment\":{\"title\":\"Способ оплаты\",\"instructions\":\"После нажатия \\\"Оформить заказ\\\" вы будете перенаправлены на безопасную страницу оплаты для ввода данных карты.\",\"cardDescription\":\"Безопасная оплата картой\"},\"secureCheckout\":\"Безопасная оплата\",\"confirmation\":{\"title\":\"Подтверждение заказа\",\"reviewText\":\"Пожалуйста, проверьте детали заказа перед его оформлением.\",\"customerInfo\":{\"title\":\"Информация о клиенте\",\"name\":\"Имя\",\"email\":\"Email\",\"phone\":\"Телефон\"},\"shippingInfo\":{\"title\":\"Информация о доставке\",\"address\":\"Адрес\",\"method\":\"Способ\",\"deliveryTime\":\"Время доставки\",\"cost\":\"Стоимость доставки\"},\"paymentMethod\":{\"title\":\"Способ оплаты\"},\"orderItems\":{\"title\":\"Товары в заказе\",\"quantity\":\"Количество\",\"variant\":\"Вариант\"},\"orderTotal\":{\"title\":\"Итого заказа\",\"subtotal\":\"Подытог\",\"shipping\":\"Доставка\",\"discount\":\"Скидка\",\"total\":\"Итого\"},\"deliveryTime\":{\"oneDay\":\"1 день\",\"days\":\"{{days}} дней\",\"weeks\":\"{{weeks}} недель\"},\"terms\":{\"agree\":\"Я согласен с\",\"termsLink\":\"условиями использования\",\"and\":\"и\",\"privacyLink\":\"политикой конфиденциальности\",\"error\":\"Пожалуйста, примите условия использования и политику конфиденциальности для продолжения\"},\"button\":{\"loading\":\"Перенаправляем на оплату...\",\"placeOrder\":\"Перейти к оплате - {{amount}} EUR\"},\"redirectNotice\":\"Вы будете перенаправлены на безопасную страницу оплаты\",\"securityNotice\":\"Ваши платежные данные защищены и зашифрованы\"},\"validation\":{\"firstNameRequired\":\"Имя обязательно\",\"lastNameRequired\":\"Фамилия обязательна\",\"emailRequired\":\"Email обязателен\",\"addressRequired\":\"Адрес обязателен\",\"cityRequired\":\"Город обязателен\",\"postalCodeRequired\":\"Почтовый индекс обязателен\",\"shippingMethodRequired\":\"Выберите способ доставки\",\"paymentMethodRequired\":\"Выберите способ оплаты\"},\"success\":{\"loading\":\"Загрузка деталей заказа...\",\"title\":\"Заказ подтвержден!\",\"message\":\"Спасибо за покупку. Ваш заказ получен и обрабатывается.\",\"error\":{\"title\":\"Что-то пошло не так\",\"orderNotFound\":\"Заказ не найден\",\"returnHome\":\"Вернуться на главную\"},\"orderInfo\":{\"title\":\"Информация о заказе\",\"orderNumber\":\"Номер заказа\",\"orderDate\":\"Дата заказа\",\"totalAmount\":\"Общая сумма\",\"paymentStatus\":\"Статус оплаты\"},\"shipping\":{\"title\":\"Информация о доставке\",\"method\":\"Способ доставки\",\"estimatedDelivery\":\"Ожидаемая доставка\"},\"items\":{\"title\":\"Товары в заказе\",\"quantity\":\"Количество\"},\"total\":{\"subtotal\":\"Промежуточный итог\",\"shipping\":\"Доставка\",\"discount\":\"Скидка\",\"total\":\"Итого\"},\"nextSteps\":{\"title\":\"Что дальше?\",\"email\":{\"title\":\"Email подтверждения заказа\",\"description\":\"Вы получите письмо с подтверждением и деталями заказа в ближайшее время.\"},\"processing\":{\"title\":\"Обработка\",\"description\":\"Мы подготовим ваш заказ к отправке в течение 1-2 рабочих дней.\"},\"shipping\":{\"title\":\"Обновления о доставке\",\"description\":\"Вы получите информацию для отслеживания после отправки заказа.\"}},\"actions\":{\"continueShopping\":\"Продолжить покупки\",\"printOrder\":\"Распечатать заказ\"},\"support\":{\"title\":\"Нужна помощь?\",\"message\":\"Если у вас есть вопросы о заказе, свяжитесь с нашей службой поддержки.\"}}},\"faq\":{\"hero\":{\"title\":\"Часто задаваемые вопросы\",\"subtitle\":\"Найдите ответы на самые популярные вопросы о наших услугах\",\"searchPlaceholder\":\"Поиск по вопросам...\"},\"categoriesSection\":{\"title\":\"Категории вопросов\"},\"categories\":{\"all\":\"Все вопросы\",\"orders\":\"Заказы\",\"delivery\":\"Доставка\",\"payment\":\"Оплата\",\"returns\":\"Возврат\",\"account\":\"Аккаунт\",\"general\":\"Общие\"},\"resultsCount\":\"Найдено {{count}} вопросов\",\"questions\":{\"orders\":{\"howToOrder\":{\"question\":\"Как оформить заказ на сайте?\",\"answer\":\"Для оформления заказа: 1) Выберите товар и добавьте его в корзину, 2) Перейдите в корзину и нажмите \\\"Оформить заказ\\\", 3) Заполните контактные данные и выберите способ доставки, 4) Подтвердите заказ. После оформления вы получите подтверждение на указанный email.\"},\"changeOrder\":{\"question\":\"Можно ли изменить или отменить заказ?\",\"answer\":\"Изменить или отменить заказ можно в течение 30 минут после оформления, обратившись к нам по телефону +375 44 537 1787 или email e.malikli1992@gmail.com. После передачи заказа в обработку изменения не принимаются.\"},\"trackOrder\":{\"question\":\"Как отследить статус заказа?\",\"answer\":\"Статус заказа можно отследить в личном кабинете в разделе \\\"Мои заказы\\\". Также мы отправляем уведомления об изменении статуса на указанный при оформлении email и номер телефона.\"}},\"delivery\":{\"methods\":{\"question\":\"Какие способы доставки доступны?\",\"answer\":\"Мы предлагаем несколько способов доставки: курьерская доставка по Минску (1-2 дня), доставка по Беларуси транспортными компаниями (2-5 дней), самовывоз из пункта выдачи. Подробную информацию о стоимости и сроках смотрите на странице \\\"Доставка\\\".\"},\"cost\":{\"question\":\"Сколько стоит доставка?\",\"answer\":\"Стоимость доставки зависит от способа и региона: по Минску - от 5 EUR, по Беларуси - от 10 EUR. При заказе на сумму свыше 100 EUR доставка по Минску бесплатная. Точная стоимость рассчитывается при оформлении заказа.\"},\"time\":{\"question\":\"В какое время осуществляется доставка?\",\"answer\":\"Курьерская доставка осуществляется с понедельника по пятницу с 9:00 до 18:00, в субботу с 10:00 до 16:00. Вы можете выбрать удобный временной интервал при оформлении заказа.\"}},\"payment\":{\"methods\":{\"question\":\"Какие способы оплаты принимаются?\",\"answer\":\"Мы принимаем следующие способы оплаты: банковские карты Visa/MasterCard, электронные деньги (Яндекс.Деньги, WebMoney), банковский перевод, наличные при получении (только для курьерской доставки).\"},\"security\":{\"question\":\"Безопасна ли оплата картой на сайте?\",\"answer\":\"Да, оплата картой полностью безопасна. Мы используем защищенное SSL-соединение и соответствуем стандартам безопасности PCI DSS. Данные вашей карты не сохраняются на наших серверах и передаются напрямую в банк.\"},\"when\":{\"question\":\"Когда списываются деньги с карты?\",\"answer\":\"При оплате картой деньги списываются сразу после подтверждения заказа. При выборе оплаты наличными деньги принимаются курьером при получении товара.\"}},\"returns\":{\"canReturn\":{\"question\":\"Можно ли вернуть товар?\",\"answer\":\"Да, вы можете вернуть товар в течение 14 дней с момента получения согласно законодательству РБ. Товар должен быть в оригинальной упаковке, без следов использования, с сохраненными ярлыками и чеками.\"},\"howToReturn\":{\"question\":\"Как оформить возврат?\",\"answer\":\"Для оформления возврата свяжитесь с нами по телефону +375 44 537 1787 или email e.malikli1992@gmail.com. Мы организуем забор товара или вы можете привезти его в наш офис. Возврат денег осуществляется в течение 10 рабочих дней.\"},\"deliveryCost\":{\"question\":\"Возвращаются ли деньги за доставку при возврате?\",\"answer\":\"Стоимость доставки возвращается только в случае, если товар оказался бракованным или не соответствует описанию. При возврате по желанию покупателя стоимость доставки не компенсируется.\"}},\"account\":{\"registration\":{\"question\":\"Обязательно ли регистрироваться на сайте?\",\"answer\":\"Регистрация не обязательна для разовых покупок, но мы рекомендуем создать аккаунт для удобства: вы сможете отслеживать заказы, сохранять адреса доставки, получать персональные скидки и бонусы.\"},\"forgotPassword\":{\"question\":\"Как восстановить забытый пароль?\",\"answer\":\"На странице входа нажмите \\\"Забыли пароль?\\\", введите email, указанный при регистрации. Мы отправим вам ссылку для восстановления пароля. Если письмо не пришло, проверьте папку \\\"Спам\\\".\"},\"changeData\":{\"question\":\"Как изменить данные в личном кабинете?\",\"answer\":\"В личном кабинете перейдите в раздел \\\"Мои данные\\\", внесите необходимые изменения и сохраните. Для изменения email потребуется подтверждение на новый адрес электронной почты.\"}},\"general\":{\"contact\":{\"question\":\"Как связаться с поддержкой?\",\"answer\":\"Вы можете связаться с нами: по телефону +375 44 537 1787 (ПН-ПТ 9:00-18:00), по email e.malikli1992@gmail.com, через форму обратной связи на сайте. Мы отвечаем на все обращения в течение 24 часов.\"},\"loyalty\":{\"question\":\"Есть ли программа лояльности?\",\"answer\":\"Да, у нас действует бонусная программа. За каждую покупку вы получаете бонусы (5% от суммы заказа), которые можете использовать для оплаты следующих покупок. Также действуют сезонные акции и скидки для постоянных клиентов.\"},\"warranty\":{\"question\":\"Предоставляете ли вы гарантию на товары?\",\"answer\":\"На все товары предоставляется гарантия согласно законодательству РБ. Дополнительно некоторые товары имеют расширенную гарантию от производителя. Условия гарантии указаны в описании каждого товара.\"}}},\"help\":{\"title\":\"Не нашли ответ на свой вопрос?\",\"description\":\"Наша служба поддержки готова помочь вам в любое время\",\"call\":\"Позвонить\",\"email\":\"Написать\"},\"quickLinks\":{\"title\":\"Полезные ссылки\",\"delivery\":{\"title\":\"Доставка\",\"description\":\"Способы и условия доставки\"},\"returns\":{\"title\":\"Возврат\",\"description\":\"Условия возврата товаров\"},\"terms\":{\"title\":\"Условия\",\"description\":\"Правила использования\"},\"privacy\":{\"title\":\"Конфиденциальность\",\"description\":\"Политика обработки данных\"}}},\"terms\":{\"hero\":{\"title\":\"Условия Использования\",\"subtitle\":\"Правила и условия использования нашего сайта и услуг\",\"effectiveDate\":\"Дата вступления в силу: 12.05.2025\"},\"general\":{\"title\":\"Общие положения\",\"welcome\":\"Добро пожаловать в Malikli1992\",\"intro\":\"Настоящие Условия использования регулируют отношения между Malikli1992 (далее — «Компания») и пользователями Сайта в отношении использования Сайта и предоставляемых услуг.\",\"agreement\":\"Используя наш сайт, вы соглашаетесь с данными условиями и обязуетесь их соблюдать. Если вы не согласны с какими-либо положениями, пожалуйста, воздержитесь от использования нашего сайта.\"},\"userGuidelines\":{\"title\":\"Правила для пользователей\",\"registration\":{\"title\":\"Регистрация\",\"description\":\"Предоставление достоверной и актуальной информации при создании аккаунта\",\"details\":\"Пользователь обязуется предоставить точные данные и своевременно их обновлять\"},\"orders\":{\"title\":\"Оформление заказов\",\"description\":\"Следование инструкциям и правилам при размещении заказов\",\"details\":\"Все заказы обрабатываются согласно установленным процедурам и срокам\"},\"payment\":{\"title\":\"Оплата\",\"description\":\"Использование законных способов оплаты и соблюдение сроков\",\"details\":\"Оплата производится в соответствии с условиями, указанными на сайте\"},\"usage\":{\"title\":\"Использование сайта\",\"description\":\"Соблюдение правил и ограничений при работе с платформой\",\"details\":\"Запрещается любое вредоносное или незаконное использование ресурса\"}},\"companyServices\":{\"title\":\"Наши услуги\",\"products\":{\"title\":\"Предоставление товаров\",\"description\":\"Продажа качественных товаров согласно описанию на сайте\"},\"delivery\":{\"title\":\"Доставка\",\"description\":\"Организация доставки товаров по указанному адресу\"},\"returns\":{\"title\":\"Возврат и обмен\",\"description\":\"Обеспечение возможности возврата в соответствии с законом\"},\"dataProtection\":{\"title\":\"Защита данных\",\"description\":\"Обеспечение безопасности персональных данных пользователей\"}},\"responsibilities\":{\"title\":\"Права и обязанности\",\"user\":{\"title\":\"Обязанности пользователя\",\"items\":{\"accurate\":\"Предоставление достоверной информации\",\"rules\":\"Соблюдение правил использования сайта\",\"payment\":\"Своевременная оплата заказов\",\"updates\":\"Уведомление об изменении контактных данных\"}},\"company\":{\"title\":\"Обязанности компании\",\"items\":{\"quality\":\"Предоставление качественных товаров\",\"delivery\":\"Соблюдение сроков доставки\",\"website\":\"Обеспечение работоспособности сайта\",\"dataProtection\":\"Защита персональных данных пользователей\"}}},\"paymentDelivery\":{\"title\":\"Оплата и доставка\",\"payment\":{\"title\":\"Условия оплаты\",\"description\":\"Оплата производится в белорусских рублях. Принимаются банковские карты, электронные платежи и наличные при получении. Все цены указаны с учетом НДС.\"},\"delivery\":{\"title\":\"Условия доставки\",\"description\":\"Доставка осуществляется по всей территории Республики Беларусь. Подробные условия и стоимость доставки указаны на соответствующей странице сайта.\"}},\"intellectualProperty\":{\"title\":\"Интеллектуальная собственность\",\"copyright\":{\"title\":\"Авторские права\",\"description\":\"Все тексты, изображения и дизайн сайта защищены авторским правом\"},\"trademarks\":{\"title\":\"Торговые марки\",\"description\":\"Логотипы и названия брендов являются зарегистрированными торговыми марками\"},\"confidential\":{\"title\":\"Конфиденциальная информация\",\"description\":\"Запрещается копирование и использование без письменного согласия\"}},\"liability\":{\"title\":\"Ограничение ответственности\",\"limitations\":{\"title\":\"Ограничения\",\"description\":\"Компания не несет ответственности за ущерб, причиненный пользователю вследствие неправильного использования Сайта или предоставленных услуг, за исключением случаев, предусмотренных законодательством Республики Беларусь.\",\"technical\":\"Технические сбои и временная недоступность сайта\",\"thirdParty\":\"Действия третьих лиц\",\"forceMajeure\":\"Форс-мажорные обстоятельства\",\"improperUse\":\"Неправильное использование товаров покупателем\"}},\"applicableLaw\":{\"title\":\"Применимое право\",\"jurisdiction\":{\"title\":\"Юрисдикция\",\"description\":\"Настоящие Условия использования регулируются законодательством Республики Беларусь. Все спорные вопросы решаются в соответствии с действующим законодательством Республики Беларусь.\"},\"disputes\":\"В случае возникновения spoров стороны обязуются решать их путем переговоров. При невозможности достижения соглашения споры рассматриваются в судебном порядке.\"},\"contact\":{\"title\":\"Вопросы по условиям использования?\",\"description\":\"Обратитесь к нам за разъяснениями и помощью\",\"workingHours\":\"Режим работы: 24/7\"},\"updates\":{\"title\":\"Изменения в Условиях использования\",\"description\":\"Компания оставляет за собой право вносить изменения в настоящие Условия использования. Изменения вступают в силу с момента их публикации на Сайте. Мы рекомендуем регулярно просматривать данную страницу для ознакомления с актуальными условиями.\"}},\"privacy\":{\"hero\":{\"title\":\"Политика Конфиденциальности\",\"subtitle\":\"Мы серьезно относимся к защите ваших персональных данных\",\"effectiveDate\":\"Дата вступления в силу: 12.05.2025\"},\"general\":{\"title\":\"Общие положения\",\"about\":\"О данной политике\",\"intro\":\"Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей, предоставляемых при использовании веб-сайта MALIKLI1992 (далее — «Сайт»).\",\"compliance\":\"Обработка персональных данных осуществляется в соответствии с Законом Республики Беларусь от 15 ноября 2021 года «О защите персональных данных» и другими нормативными актами Республики Беларусь.\"},\"dataTypes\":{\"title\":\"Какие данные мы собираем\",\"personal\":{\"title\":\"Личная информация\",\"name\":\"ФИО\",\"birthDate\":\"Дата рождения\",\"passport\":\"Паспортные данные\"},\"contact\":{\"title\":\"Контактные данные\",\"email\":\"Адрес электронной почты\",\"phone\":\"Номер телефона\",\"address\":\"Адрес доставки\"},\"payment\":{\"title\":\"Платежная информация\",\"details\":\"Платежные реквизиты\",\"history\":\"История заказов\",\"methods\":\"Способы оплаты\"},\"additional\":{\"title\":\"Дополнительные данные\",\"preferences\":\"Предпочтения пользователя\",\"history\":\"История посещений\",\"reviews\":\"Отзывы и комментарии\"}},\"purposes\":{\"title\":\"Цели обработки данных\",\"orders\":{\"title\":\"Обработка заказов\",\"description\":\"Оформление, подтверждение и выполнение ваших заказов\"},\"communication\":{\"title\":\"Связь с пользователями\",\"description\":\"Уведомления о статусе заказа и обслуживание клиентов\"},\"marketing\":{\"title\":\"Маркетинговые материалы\",\"description\":\"Отправка новостей и рекламных предложений (с согласия)\"},\"improvement\":{\"title\":\"Улучшение сервиса\",\"description\":\"Анализ и совершенствование качества наших услуг\"}},\"userRights\":{\"title\":\"Ваши права\",\"information\":{\"title\":\"Право на информацию\",\"description\":\"Получать полную информацию о ваших персональных данных и способах их обработки\"},\"modification\":{\"title\":\"Право на изменение\",\"description\":\"Требовать исправления неточных или неполных персональных данных\"},\"deletion\":{\"title\":\"Право на удаление\",\"description\":\"Требовать удаления ваших персональных данных в установленных законом случаях\"},\"withdrawal\":{\"title\":\"Право на отзыв согласия\",\"description\":\"Отозвать согласие на обработку персональных данных в любой момент\"}},\"security\":{\"title\":\"Защита и хранение данных\",\"technical\":{\"title\":\"Технические меры\",\"description\":\"Мы используем современные технологии шифрования и защищенные серверы для обеспечения безопасности ваших данных.\"},\"organizational\":{\"title\":\"Организационные меры\",\"description\":\"Доступ к персональным данным имеют только уполномоченные сотрудники, которые обязаны соблюдать конфиденциальность.\"},\"retention\":{\"title\":\"Сроки хранения\",\"description\":\"Персональные данные хранятся не дольше, чем это необходимо для достижения целей обработки.\"}},\"thirdParty\":{\"title\":\"Передача данных третьим лицам\",\"when\":{\"title\":\"Когда мы передаем данные\",\"description\":\"Персональные данные могут быть переданы третьим лицам только в случаях, предусмотренных законодательством Республики Беларусь или с вашего прямого согласия.\",\"contractual\":\"При выполнении договорных обязательств\",\"government\":\"По требованию уполномоченных государственных органов\",\"consent\":\"С вашего письменного согласия\",\"security\":\"Для обеспечения безопасности и предотвращения мошенничества\"}},\"consent\":{\"title\":\"Согласие на обработку\",\"how\":{\"title\":\"Как вы даете согласие\",\"description\":\"Пользователь дает согласие на обработку своих персональных данных при регистрации на Сайте или оформлении заказа, путем проставления отметки в соответствующем поле.\"},\"withdrawal\":\"Согласие может быть отозвано в любой момент путем направления письменного уведомления на наш электронный адрес.\"},\"contact\":{\"title\":\"Вопросы по обработке данных?\",\"description\":\"Свяжитесь с нами для получения дополнительной информации\",\"workingHours\":\"Режим работы: 24/7\"},\"updates\":{\"title\":\"Изменения в Политике конфиденциальности\",\"description\":\"Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Изменения вступают в силу с момента их публикации на Сайте. Мы рекомендуем регулярно проверять данную страницу для ознакомления с актуальной версией Политики.\"}},\"delivery\":{\"hero\":{\"title\":\"Доставка и Оплата\",\"subtitle\":\"Быстрая и надежная доставка по всей Беларуси\"},\"methods\":{\"title\":\"Способы доставки\",\"post\":{\"title\":\"Белпочта\",\"description\":\"Доставка по всей территории Республики Беларусь\",\"timeframe\":\"2-5 рабочих дней\",\"pricing\":\"По тарифам РУП «Белпочта»\"},\"courier\":{\"title\":\"Курьерская доставка\",\"description\":\"Быстрая доставка по Минску\",\"timeframe\":\"1-2 рабочих дня\",\"pricing\":\"Уточняется при заказе\"}},\"details\":{\"timeframe\":\"Срок\",\"cost\":\"Стоимость\"},\"conditions\":{\"title\":\"Условия доставки\",\"geography\":{\"title\":\"География\",\"description\":\"Доставка по всей территории Республики Беларусь\"},\"payment\":{\"title\":\"Оплата\",\"description\":\"Наличные при получении или онлайн-оплата\"},\"support\":{\"title\":\"Поддержка\",\"description\":\"Круглосуточная поддержка 24/7\"}},\"faq\":{\"title\":\"Часто задаваемые вопросы\",\"duration\":{\"question\":\"Как долго осуществляется доставка?\",\"answer\":\"Средний срок доставки почтой составляет от двух до пяти рабочих дней. Курьерская доставка по Минску осуществляется в течение 1-2 рабочих дней.\"},\"changeAddress\":{\"question\":\"Можно ли изменить адрес доставки после оформления заказа?\",\"answer\":\"Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нашей службой поддержки по телефону +375 44 537 1787 или напишите на e.malikli1992@gmail.com.\"},\"tracking\":{\"question\":\"Как отследить мой заказ?\",\"answer\":\"После отправки заказа вы получите трек-номер для отслеживания. Вы сможете отслеживать посылку на сайте Белпочты или в нашем личном кабинете.\"},\"lostPackage\":{\"question\":\"Что делать, если посылка утеряна или повреждена?\",\"answer\":\"Свяжитесь с нашей службой поддержки в течение 48 часов с момента получения. Мы оперативно решим проблему с перевозчиком и обеспечим замену или возврат товара.\"}},\"contact\":{\"title\":\"Остались вопросы?\",\"description\":\"Свяжитесь с нашей службой поддержки\"}},\"returns\":{\"hero\":{\"title\":\"Возврат и Обмен\",\"subtitle\":\"Простая и прозрачная процедура возврата товаров\"},\"process\":{\"title\":\"Процесс возврата\",\"contact\":{\"title\":\"Свяжитесь с нами\",\"description\":\"Обратитесь в службу поддержки в течение 14 дней с момента покупки\"},\"prepare\":{\"title\":\"Подготовьте товар\",\"description\":\"Убедитесь, что товар в первоначальном состоянии с ярлыками и упаковкой\"},\"send\":{\"title\":\"Отправьте товар\",\"description\":\"Отправьте товар по указанному адресу или передайте курьеру\"},\"receive\":{\"title\":\"Получите возврат\",\"description\":\"После проверки товара мы вернем средства или произведем обмен\"}},\"conditions\":{\"title\":\"Условия возврата\",\"accepted\":{\"title\":\"Принимаем к возврату\",\"original\":\"Товары в оригинальной упаковке\",\"unworn\":\"Неношеные вещи с бирками\",\"unused\":\"Товары без следов использования\",\"appearance\":\"Изделия с сохраненным товарным видом\"},\"notAccepted\":{\"title\":\"Не принимаем к возврату\",\"used\":\"Товары, бывшие в употреблении\",\"noTags\":\"Изделия без оригинальных бирок\",\"damaged\":\"Поврежденные товары\",\"noPackaging\":\"Товары с нарушенной упаковкой\"}},\"legal\":{\"title\":\"Правовая информация\",\"basis\":{\"title\":\"Законодательная база\",\"description\":\"Вернуть товар надлежащего качества можно, если сохранены его товарный вид, фабричные ярлыки, этикетки, потребительские свойства, а также приложен документ, подтверждающий факт покупки указанного товара. Нельзя вернуть товар, бывший в употреблении.\"},\"law\":\"Согласно статье 28 Закона Республики Беларусь от 9 января 2002 года «О защите прав потребителей», потребитель вправе возвратить товар надлежащего качества или обменять его на аналогичный товар в течение четырнадцати дней.\"},\"faq\":{\"title\":\"Часто задаваемые вопросы\",\"timeLimit\":{\"question\":\"В течение какого времени можно вернуть товар?\",\"answer\":\"Согласно статье 28 Закона Республики Беларусь «О защите прав потребителей», возврат товара надлежащего качества возможен в течение четырнадцати дней с момента покупки.\"},\"documents\":{\"question\":\"Какие документы нужны для возврата?\",\"answer\":\"Для возврата необходим документ, подтверждающий факт покупки (чек, квитанция об оплате), а также заявление на возврат, которое можно заполнить при обращении.\"},\"exchange\":{\"question\":\"Можно ли обменять товар на другой размер?\",\"answer\":\"Да, возможен обмен на аналогичный товар другого размера или расцветки при наличии в ассортименте. Если подходящего товара нет, мы оформим возврат денежных средств.\"},\"shippingCost\":{\"question\":\"Кто оплачивает доставку при возврате?\",\"answer\":\"Если товар возвращается по вине продавца (брак, несоответствие), доставку оплачиваем мы. При возврате товара надлежащего качества доставку оплачивает покупатель.\"},\"refundTime\":{\"question\":\"Когда будут возвращены деньги?\",\"answer\":\"Возврат денежных средств осуществляется в течение 7 рабочих дней после получения и проверки возвращенного товара на тот же способ оплаты, который использовался при покупке.\"}},\"contact\":{\"title\":\"Нужна помощь с возвратом?\",\"description\":\"Наша служба поддержки поможет вам с процедурой возврата\",\"workingHours\":\"Режим работы: 24/7\"}},\"profile\":{\"loading\":\"Загрузка профиля...\",\"edit\":\"Редактировать\",\"cancel\":\"Отмена\",\"logout\":\"Выйти\",\"saveChanges\":\"Сохранить изменения\",\"notSpecified\":\"Не указано\",\"personalInfo\":{\"title\":\"Личная информация\",\"firstName\":\"Имя\",\"lastName\":\"Фамилия\",\"email\":\"Электронная почта\",\"phone\":\"Телефон\",\"phonePlaceholder\":\"+375 (44) 123-45-67\"},\"accountSettings\":{\"title\":\"Настройки аккаунта\",\"changePassword\":{\"title\":\"Изменить пароль\",\"description\":\"Обновите пароль для обеспечения безопасности аккаунта\",\"button\":\"Изменить\"},\"notifications\":{\"title\":\"Уведомления\",\"description\":\"Управляйте настройками уведомлений\",\"button\":\"Настроить\"}},\"orders\":{\"title\":\"Мои заказы\",\"noOrders\":\"У вас пока нет заказов\",\"startShopping\":\"Начать покупки\"}},\"footer\":{\"description\":\"Эксклюзивные ежемесячные дропы и уникальная продукция.\",\"companyInfo\":{\"fullName\":\"Общество с ограниченной ответственностью «МАЛИКЛИ 1992»\",\"manufacturer\":\"Производитель: ООО «МАЛИКЛИ 1992»\",\"registration\":\"Свидетельство о гос. регистрации №193863901, выдано 21.04.2025 Минским горисполкомом\",\"address\":\"220005, Минск, ул. Веры Хоружей, 6А, пом. 94И\",\"tradeRegistry\":\"Регистрация в торговом реестре\"},\"information\":{\"title\":\"Информация\",\"faq\":\"FAQ\",\"delivery\":\"Доставка и Оплата\",\"returns\":\"Возвраты\",\"terms\":\"Условия Использования\",\"privacy\":\"Политика Конфиденциальности\"},\"contact\":{\"title\":\"Связаться с нами\",\"workingHours\":\"Режим работы: 24/7\"},\"copyright\":\"© {{year}} ООО «МАЛИКЛИ 1992». Все права защищены.\"},\"orders\":{\"title\":\"Мои Заказы\",\"subtitle\":\"Отслеживайте и управляйте своими заказами\",\"loading\":\"Загрузка ваших заказов...\",\"orderCount\":\"{{count}} заказ\",\"orderCount_plural\":\"{{count}} заказов\",\"orderDate\":\"Дата заказа\",\"total\":\"Итого\",\"filters\":{\"status\":\"Фильтр по статусу\",\"allStatuses\":\"Все статусы\",\"sortBy\":\"Сортировать по\",\"dateDesc\":\"Сначала новые\",\"dateAsc\":\"Сначала старые\",\"amountDesc\":\"По убыванию суммы\",\"amountAsc\":\"По возрастанию суммы\",\"statusAsc\":\"По статусу А-Я\"},\"status\":{\"pending\":\"Ожидает\",\"confirmed\":\"Подтвержден\",\"processing\":\"Обрабатывается\",\"shipped\":\"Отправлен\",\"delivered\":\"Доставлен\",\"cancelled\":\"Отменен\"},\"paymentStatus\":{\"pending\":\"Ожидает оплаты\",\"paid\":\"Оплачен\",\"failed\":\"Ошибка оплаты\",\"refunded\":\"Возвращен\"},\"item\":{\"color\":\"Цвет\",\"size\":\"Размер\",\"quantity\":\"Кол-во\"},\"delivery\":{\"title\":\"Информация о доставке\",\"trackingNumber\":\"Номер отслеживания\",\"track\":\"Отследить\",\"estimated\":\"Ожидаемая доставка\"},\"actions\":{\"viewDetails\":\"Подробнее\",\"reorder\":\"Заказать снова\",\"cancel\":\"Отменить заказ\",\"confirmCancel\":\"Вы уверены, что хотите отменить этот заказ?\",\"backToOrders\":\"Вернуться к заказам\",\"retryPayment\":\"Повторить оплату\"},\"empty\":{\"title\":\"Пока нет заказов\",\"message\":\"Вы еще не совершали заказов. Начните покупки, чтобы увидеть свои заказы здесь.\",\"startShopping\":\"Начать покупки\"},\"error\":{\"title\":\"Что-то пошло не так\",\"retry\":\"Попробовать снова\",\"orderNotFound\":\"Заказ не найден\",\"backToOrders\":\"Вернуться к заказам\"}},\"orderDetails\":{\"summary\":{\"title\":\"Сводка заказа\",\"lastUpdated\":\"Последнее обновление\",\"shippingMethod\":\"Способ доставки\"},\"customer\":{\"title\":\"Информация о клиенте\",\"name\":\"Имя\",\"email\":\"Email\",\"phone\":\"Телефон\"},\"shipping\":{\"title\":\"Информация о доставке\",\"address\":\"Адрес доставки\"},\"items\":{\"title\":\"Товары в заказе\",\"each\":\"за шт.\"},\"total\":{\"title\":\"Итого по заказу\",\"subtotal\":\"Подытог\",\"shipping\":\"Доставка\",\"discount\":\"Скидка\",\"total\":\"Итого\",\"free\":\"Бесплатно\"},\"actions\":{\"print\":\"Печать заказа\"}},\"paymentCallback\":{\"processing\":{\"title\":\"Обработка платежа\",\"message\":\"Пожалуйста, подождите, пока мы обрабатываем ваш платеж...\"},\"error\":{\"title\":\"Ошибка обработки платежа\",\"viewOrders\":\"Мои заказы\",\"backHome\":\"На главную\"}},\"orderComplete\":{\"loading\":\"Загрузка деталей заказа...\",\"success\":{\"title\":\"Заказ оформлен!\",\"message\":\"Спасибо за покупку. Ваш заказ успешно размещен и оплата подтверждена.\"},\"summary\":{\"title\":\"Информация о заказе\",\"orderNumber\":\"Номер заказа\",\"total\":\"Общая сумма\",\"paymentStatus\":\"Статус оплаты\",\"orderStatus\":\"Статус заказа\"},\"items\":{\"title\":\"Заказанные товары\",\"quantity\":\"Кол-во\",\"andMore\":\"и еще {{count}} товаров\"},\"nextSteps\":{\"title\":\"Что будет дальше?\",\"confirmation\":\"Вы получите подтверждение заказа на email в ближайшее время\",\"processing\":\"Мы начнем обработку вашего заказа в течение 24 часов\",\"shipping\":\"Ваши товары будут подготовлены к отправке\",\"tracking\":\"Вы получите информацию для отслеживания после отправки\"},\"actions\":{\"viewOrder\":\"Детали заказа\",\"continueShopping\":\"Продолжить покупки\"},\"error\":{\"title\":\"Не удалось загрузить заказ\",\"viewOrders\":\"Все заказы\",\"backHome\":\"На главную\"}},\"orderFailed\":{\"loading\":\"Загрузка деталей заказа...\",\"title\":\"Оплата не прошла\",\"message\":\"Извините, но ваш платеж не может быть обработан. Попробуйте еще раз или обратитесь в службу поддержки.\",\"reason\":{\"title\":\"Причина отказа\"},\"orderInfo\":{\"title\":\"Информация о заказе\",\"orderNumber\":\"Номер заказа\",\"amount\":\"Сумма\",\"status\":\"Статус заказа\",\"paymentStatus\":\"Статус оплаты\"},\"nextSteps\":{\"title\":\"Что вы можете сделать:\",\"checkPayment\":\"Проверьте данные вашего способа оплаты\",\"tryAgain\":\"Попробуйте оплатить снова\",\"differentMethod\":\"Используйте другой способ оплаты\",\"contactSupport\":\"Обратитесь в службу поддержки за помощью\"},\"commonIssues\":{\"title\":\"Частые проблемы с оплатой\",\"insufficientFunds\":{\"title\":\"Недостаточно средств\",\"description\":\"Убедитесь, что на счету достаточно средств для транзакции.\"},\"cardExpired\":{\"title\":\"Карта просрочена\",\"description\":\"Проверьте, что срок действия карты не истек, и попробуйте снова.\"},\"networkError\":{\"title\":\"Проблемы с соединением\",\"description\":\"Плохое соединение могло прервать платеж. Попробуйте еще раз.\"}},\"actions\":{\"tryAgain\":\"Попробовать снова\",\"contactSupport\":\"Связаться с поддержкой\",\"viewOrders\":\"Мои заказы\"}}}"));}}),
"[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "I18nProvider": (()=>I18nProvider),
    "useI18n": (()=>useI18n)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$ru$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/ru.json (json)");
"use client";
;
;
;
;
const I18nContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const translations = {
    en: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__["default"],
    ru: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$ru$2e$json__$28$json$29$__["default"]
};
function I18nProvider({ children }) {
    const [locale, setCurrentLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('en');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load locale from localStorage or browser preference
        const savedLocale = localStorage.getItem('locale');
        const browserLocale = navigator.language.split('-')[0];
        const initialLocale = savedLocale || (browserLocale === 'ru' ? 'ru' : 'en');
        setCurrentLocale(initialLocale);
    }, []);
    const setLocale = (newLocale)=>{
        setCurrentLocale(newLocale);
        localStorage.setItem('locale', newLocale);
        // Update HTML lang attribute
        if (typeof document !== 'undefined') {
            document.documentElement.lang = newLocale;
        }
    };
    const t = (key, params)=>{
        const keys = key.split('.');
        let value = translations[locale];
        for (const k of keys){
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key; // Return key if translation not found
            }
        }
        if (typeof value !== 'string') {
            return key;
        }
        // Replace parameters in the translation
        if (params) {
            return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey)=>{
                return params[paramKey]?.toString() || match;
            });
        }
        return value;
    };
    const value = {
        locale,
        setLocale,
        t,
        availableLocales: [
            'en',
            'ru'
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(I18nContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/hooks/useI18n.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
function useI18n() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
}
}}),
"[project]/src/components/LanguageSwitcher/LanguageSwitcher.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "LanguageSwitcher-module__U9ItxG__active",
  "checkmark": "LanguageSwitcher-module__U9ItxG__checkmark",
  "chevron": "LanguageSwitcher-module__U9ItxG__chevron",
  "chevronOpen": "LanguageSwitcher-module__U9ItxG__chevronOpen",
  "code": "LanguageSwitcher-module__U9ItxG__code",
  "dark": "LanguageSwitcher-module__U9ItxG__dark",
  "dropdown": "LanguageSwitcher-module__U9ItxG__dropdown",
  "dropdownContent": "LanguageSwitcher-module__U9ItxG__dropdownContent",
  "flag": "LanguageSwitcher-module__U9ItxG__flag",
  "label": "LanguageSwitcher-module__U9ItxG__label",
  "languageSwitcher": "LanguageSwitcher-module__U9ItxG__languageSwitcher",
  "option": "LanguageSwitcher-module__U9ItxG__option",
  "slideDown": "LanguageSwitcher-module__U9ItxG__slideDown",
  "trigger": "LanguageSwitcher-module__U9ItxG__trigger",
});
}}),
"[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/LanguageSwitcher.module.css [app-ssr] (css module)");
;
;
;
;
const languageConfig = {
    en: {
        label: 'English',
        flag: '🇺🇸',
        code: 'EN'
    },
    ru: {
        label: 'Русский',
        flag: '🇷🇺',
        code: 'RU'
    }
};
const LanguageSwitcher = ()=>{
    const { locale, setLocale, availableLocales } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentLanguage = languageConfig[locale];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLanguageChange = (newLocale)=>{
        setLocale(newLocale);
        setIsOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].languageSwitcher,
        ref: dropdownRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trigger,
                onClick: ()=>setIsOpen(!isOpen),
                "aria-label": "Select language",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flag,
                        children: currentLanguage.flag
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].code,
                        children: currentLanguage.code
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevron} ${isOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronOpen : ''}`,
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M6 9l6 6 6-6",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }, void 0, false, {
                            fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdown,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownContent,
                    children: availableLocales.map((localeCode)=>{
                        const lang = languageConfig[localeCode];
                        const isActive = localeCode === locale;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].option} ${isActive ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ''}`,
                            onClick: ()=>handleLanguageChange(localeCode),
                            disabled: isActive,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].flag,
                                    children: lang.flag
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                                    lineNumber: 83,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                    children: lang.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                                    lineNumber: 84,
                                    columnNumber: 19
                                }, this),
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].checkmark,
                                    width: "16",
                                    height: "16",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M20 6L9 17l-5.5-5.5",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                                        lineNumber: 93,
                                        columnNumber: 23
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                                    lineNumber: 86,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, localeCode, true, {
                            fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                            lineNumber: 77,
                            columnNumber: 17
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = LanguageSwitcher;
}}),
"[project]/src/components/LanguageSwitcher/index.ts [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx [app-ssr] (ecmascript)");
;
}}),
"[project]/src/components/LanguageSwitcher/index.ts [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/index.ts [app-ssr] (ecmascript) <locals>");
}}),
"[project]/src/components/Layout/Navbar.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Navbar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Layout/Navbar.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$index$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/index.ts [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/LanguageSwitcher/LanguageSwitcher.tsx [app-ssr] (ecmascript)");
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
;
function Navbar() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    // Initialize with false and only update after hydration
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // const [cartSidebarOpen, setCartSidebarOpen] = useState(false); // Commented out for Buy Now flow
    const [userMenuOpen, setUserMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    // const cartItems = useSelector((state: RootState) => state.cart.items); // Commented out for Buy Now flow
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppSelector"])((state)=>state.auth);
    // Force scrolled appearance when mobile menu is open
    const isScrolledOrMenuOpen = scrolled || mobileMenuOpen;
    // Only calculate total items on client-side to avoid hydration mismatch - commented out for Buy Now flow
    /* const totalItems = mounted 
    ? cartItems.reduce((total: number, item: CartItem) => total + item.quantity, 0)
    : 0; */ // Mark component as mounted after hydration
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setMounted(true);
    }, []);
    // Handle scroll event to change navbar appearance
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleScroll = ()=>{
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        // Initial check
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return ()=>window.removeEventListener('scroll', handleScroll);
    }, [
        scrolled
    ]); // Only apply transparent style on homepage and when not scrolled or menu open
    const isHomePage = pathname === '/';
    // Only apply client-side effects after hydration
    const navbarClass = !mounted ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navbar : isHomePage ? isScrolledOrMenuOpen ? `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navbar} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileOpen : ''}` : `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navbar} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].transparent}` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navbar; /* Commented out for Buy Now flow
  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCartSidebarOpen(true);
  };
  */ 
    const handleUserMenuToggle = ()=>{
        setUserMenuOpen(!userMenuOpen);
    };
    const handleLogout = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["logout"])());
        setUserMenuOpen(false);
    };
    // Close user menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (userMenuOpen && !event.target.closest('.user-menu-container')) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, [
        userMenuOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            className: navbarClass,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navContainer,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoContainer,
                            children: [
                                "          ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/logo.png",
                                    alt: "Malikli1992 Logo",
                                    width: 150,
                                    height: 40,
                                    className: mounted && isHomePage && !isScrolledOrMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logoWhite : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].logo,
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 98,
                                    columnNumber: 111
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLinks,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://www.malikli1992.store/shipping.html",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLink,
                                    children: t('nav.delivery')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://www.malikli1992.store/about.html",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLink,
                                    children: t('nav.about')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "https://www.malikli1992.store/contact.html",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navLink,
                                    children: t('nav.contact')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                            lineNumber: 106,
                            columnNumber: 28
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].navIcons,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$LanguageSwitcher$2f$LanguageSwitcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this),
                                isAuthenticated && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userMenuContainer} user-menu-container`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userButton,
                                            onClick: handleUserMenuToggle,
                                            children: [
                                                "                  ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userAvatar,
                                                    children: (()=>{
                                                        const firstName = user.first_name?.trim();
                                                        const lastName = user.last_name?.trim();
                                                        if (firstName && lastName) {
                                                            return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
                                                        } else if (firstName) {
                                                            return firstName[0].toUpperCase();
                                                        } else if (lastName) {
                                                            return lastName[0].toUpperCase();
                                                        } else if (user.username) {
                                                            return user.username[0].toUpperCase();
                                                        } else {
                                                            return 'У';
                                                        }
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 126,
                                                    columnNumber: 36
                                                }, this),
                                                "                  ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userName,
                                                    children: (()=>{
                                                        const firstName = user.first_name?.trim();
                                                        const lastName = user.last_name?.trim();
                                                        if (firstName && lastName) {
                                                            return `${firstName} ${lastName}`;
                                                        } else if (firstName) {
                                                            return firstName;
                                                        } else if (lastName) {
                                                            return lastName;
                                                        } else {
                                                            return user.username;
                                                        }
                                                    })()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 43
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    viewBox: "0 0 20 20",
                                                    fill: "currentColor",
                                                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevron} ${userMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].chevronUp : ''}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        fillRule: "evenodd",
                                                        d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                                                        clipRule: "evenodd"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 159,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this),
                                        userMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].userDropdown,
                                            children: [
                                                "                    ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/profile",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownItem,
                                                    onClick: ()=>setUserMenuOpen(false),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            viewBox: "0 0 20 20",
                                                            fill: "currentColor",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownIcon,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                fillRule: "evenodd",
                                                                d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z",
                                                                clipRule: "evenodd"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                                lineNumber: 175,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                            lineNumber: 174,
                                                            columnNumber: 23
                                                        }, this),
                                                        t('nav.profile')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 76
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/orders",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownItem,
                                                    onClick: ()=>setUserMenuOpen(false),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            viewBox: "0 0 20 20",
                                                            fill: "currentColor",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownIcon,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                fillRule: "evenodd",
                                                                d: "M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z",
                                                                clipRule: "evenodd"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                                lineNumber: 185,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                            lineNumber: 184,
                                                            columnNumber: 23
                                                        }, this),
                                                        t('nav.orders')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 21
                                                }, this),
                                                "                    ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownItem,
                                                    onClick: handleLogout,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            viewBox: "0 0 20 20",
                                                            fill: "currentColor",
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dropdownIcon,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                fillRule: "evenodd",
                                                                d: "M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z",
                                                                clipRule: "evenodd"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                                lineNumber: 214,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, this),
                                                        t('nav.logout')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 52
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                            lineNumber: 169,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 122,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/auth/login",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconLink,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconSvg} ${mounted && isHomePage && !isScrolledOrMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconLight : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            viewBox: "0 0 24 24",
                                            fill: "currentColor",
                                            width: "24",
                                            height: "24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                fillRule: "evenodd",
                                                d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                                clipRule: "evenodd"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                lineNumber: 224,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                                            lineNumber: 223,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                        lineNumber: 222,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 221,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                            lineNumber: 116,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileMenuButton,
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconSvg} ${mounted && isHomePage && !isScrolledOrMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].iconLight : ''}`,
                                children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    width: "24",
                                    height: "24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                        lineNumber: 237,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 236,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    width: "24",
                                    height: "24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                        lineNumber: 241,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                    lineNumber: 240,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                lineNumber: 234,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Layout/Navbar.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        "        "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                    lineNumber: 96,
                    columnNumber: 9
                }, this),
                mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileMenu} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].open : ''} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dark : ''}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileMenuLinks} ${mobileMenuOpen ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].dark : ''}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/delivery",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: t('nav.delivery')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "https://www.malikli1992.store/about.html",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: t('nav.about')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                lineNumber: 254,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "https://www.malikli1992.store/contact.html",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: t('nav.contact')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            !isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileAuthSection,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/auth/login",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileAuthAction,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileActionIcon,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                lineNumber: 272,
                                                columnNumber: 19
                                            }, this),
                                            t('nav.login')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                        lineNumber: 271,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/auth/register",
                                        onClick: ()=>setMobileMenuOpen(false),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileAuthAction,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                viewBox: "0 0 24 24",
                                                fill: "currentColor",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].mobileActionIcon,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    fillRule: "evenodd",
                                                    d: "M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z",
                                                    clipRule: "evenodd"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                                lineNumber: 278,
                                                columnNumber: 19
                                            }, this),
                                            t('nav.register')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                                        lineNumber: 277,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Layout/Navbar.tsx",
                                lineNumber: 270,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Layout/Navbar.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/Layout/Navbar.tsx",
                    lineNumber: 249,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/Layout/Navbar.tsx",
            lineNumber: 95,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
}}),
"[project]/src/hooks/useCartPersistence.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// hooks/useCartPersistence.ts
__turbopack_context__.s({
    "useCartPersistence": (()=>useCartPersistence)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartSlice.ts [app-ssr] (ecmascript)");
;
;
;
const useCartPersistence = ()=>{
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load cart from localStorage when the app initializes
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCart"])());
    }, [
        dispatch
    ]);
    // Optional: Listen for storage events to sync cart across tabs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleStorageChange = (event)=>{
            if (event.key === 'cart' || event.key === 'cartId') {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCart"])());
            }
        };
        // Listen for changes in other tabs/windows
        window.addEventListener('storage', handleStorageChange);
        return ()=>{
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [
        dispatch
    ]);
};
}}),
"[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// hooks/useAuth.ts
__turbopack_context__.s({
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
;
const useAuth = ()=>{
    const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    return {
        user: auth.user,
        isLoading: auth.isLoading,
        isAuthenticated: auth.isAuthenticated,
        token: auth.token,
        error: auth.error
    };
};
}}),
"[project]/src/hooks/useCartSync.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// hooks/useCartSync.ts
__turbopack_context__.s({
    "useCartSync": (()=>useCartSync)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useAuth.ts [app-ssr] (ecmascript)");
;
;
;
;
const useCartSync = ()=>{
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { user, isLoading: authLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const { items, cartId, needsSync, isLoading: cartLoading, lastSyncTime } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.cart);
    // Auto-sync cart when user authentication state changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (authLoading) return; // Wait for auth to be determined
        const handleCartSync = async ()=>{
            if (user && !cartLoading) {
                // User is logged in
                if (cartId && items.length > 0) {
                    // User has a guest cart with items - merge it
                    try {
                        // Add a small delay to ensure token is properly set after login
                        await new Promise((resolve)=>setTimeout(resolve, 100));
                        await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeGuestCartWithUser"])({
                            guestCartId: cartId,
                            strategy: 'merge'
                        })).unwrap();
                    } catch (error) {
                        console.error('Failed to merge guest cart:', error);
                        // Fallback: load user's existing cart
                        await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCartFromBackend"])({}));
                    }
                } else {
                    // Load user's existing cart from backend
                    await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCartFromBackend"])({}));
                }
            } else if (!user && items.length > 0 && needsSync) {
                // Guest user with items that need syncing
                try {
                    await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncCartWithBackend"])()).unwrap();
                } catch (error) {
                    console.error('Failed to sync guest cart:', error);
                }
            }
        };
        handleCartSync();
    }, [
        user,
        authLoading,
        dispatch
    ]); // Auto-sync cart periodically when needed (for both guest and logged-in users)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (needsSync && !cartLoading) {
            const syncTimeout = setTimeout(()=>{
                // Always use the sync endpoint for both guest and authenticated users
                // This ensures quantities are set correctly rather than accumulated
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncCartWithBackend"])());
            }, 2000); // Debounce syncing by 2 seconds
            return ()=>clearTimeout(syncTimeout);
        }
    }, [
        needsSync,
        user,
        cartLoading,
        dispatch
    ]);
    // Manual sync function
    const syncCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (cartLoading) return;
        try {
            if (user) {
                await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["loadCartFromBackend"])({})).unwrap();
            } else {
                await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncCartWithBackend"])()).unwrap();
            }
        } catch (error) {
            console.error('Manual cart sync failed:', error);
            throw error;
        }
    }, [
        user,
        cartLoading,
        dispatch
    ]);
    // Merge guest cart when logging in
    const mergeGuestCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (strategy = 'merge')=>{
        if (!cartId || cartLoading) return;
        try {
            await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mergeGuestCartWithUser"])({
                guestCartId: cartId,
                strategy
            })).unwrap();
        } catch (error) {
            console.error('Failed to merge guest cart:', error);
            throw error;
        }
    }, [
        cartId,
        cartLoading,
        dispatch
    ]);
    // Clear cart on logout
    const clearCartOnLogout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCart"])());
    }, [
        dispatch
    ]);
    // Force sync cart
    const forceSyncCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (cartLoading) return;
        try {
            await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["syncCartWithBackend"])()).unwrap();
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["markAsSynced"])());
        } catch (error) {
            console.error('Force sync failed:', error);
            throw error;
        }
    }, [
        cartLoading,
        dispatch
    ]);
    return {
        syncCart,
        mergeGuestCart,
        clearCartOnLogout,
        forceSyncCart,
        isLoading: cartLoading,
        needsSync,
        lastSyncTime,
        cartId,
        isAuthenticated: !!user
    };
};
}}),
"[project]/src/components/Cart/CartSyncProvider.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
// components/Cart/CartSyncProvider.tsx
__turbopack_context__.s({
    "CartSyncProvider": (()=>CartSyncProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCartSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCartSync.ts [app-ssr] (ecmascript)");
"use client";
;
;
function CartSyncProvider({ children }) {
    // This hook handles all the cart synchronization logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCartSync$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCartSync"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}}),
"[project]/src/app/LayoutBody.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>LayoutBody)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$StoreProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/StoreProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Layout/Navbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCartPersistence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useCartPersistence.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cart$2f$CartSyncProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Cart/CartSyncProvider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
// Cart persistence wrapper component
function CartPersistenceWrapper({ children }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useCartPersistence$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCartPersistence"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
function LayoutBody({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$StoreProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["I18nProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CartPersistenceWrapper, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Cart$2f$CartSyncProvider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartSyncProvider"], {
                    children: [
                        "            ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "root-layout-container",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Layout$2f$Navbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/src/app/LayoutBody.tsx",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                    className: "main-content",
                                    children: children
                                }, void 0, false, {
                                    fileName: "[project]/src/app/LayoutBody.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/LayoutBody.tsx",
                            lineNumber: 23,
                            columnNumber: 41
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/LayoutBody.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/LayoutBody.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/LayoutBody.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/LayoutBody.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__2a3959e1._.js.map