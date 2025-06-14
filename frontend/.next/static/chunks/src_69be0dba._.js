(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/types/checkout.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Checkout-related TypeScript interfaces
__turbopack_context__.s({
    "CHECKOUT_STEPS": (()=>CHECKOUT_STEPS),
    "PAYMENT_METHODS": (()=>PAYMENT_METHODS)
});
const CHECKOUT_STEPS = [
    {
        id: 1,
        name: 'information',
        title: 'checkout.steps.information',
        completed: false,
        current: true,
        accessible: true
    },
    {
        id: 2,
        name: 'shipping',
        title: 'checkout.steps.shipping',
        completed: false,
        current: false,
        accessible: false
    },
    {
        id: 3,
        name: 'payment',
        title: 'checkout.steps.payment',
        completed: false,
        current: false,
        accessible: false
    },
    {
        id: 4,
        name: 'confirmation',
        title: 'checkout.steps.confirmation',
        completed: false,
        current: false,
        accessible: false
    }
];
const PAYMENT_METHODS = [
    {
        id: 'card',
        name: 'Visa/Mastercard',
        type: 'card',
        icon: '💳',
        description: 'checkout.payment.cardDescription'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/api/address.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Address API functions
__turbopack_context__.s({
    "deleteAddress": (()=>deleteAddress),
    "getUserAddresses": (()=>getUserAddresses),
    "saveAddress": (()=>saveAddress),
    "updateAddress": (()=>updateAddress)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const saveAddress = async (addressData, token)=>{
    const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://localhost:8000/api/v1';
    const response = await fetch(`${API_BASE}/auth/addresses/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('Save API Error Response:', errorText);
        const errorData = (()=>{
            try {
                return JSON.parse(errorText);
            } catch  {
                return {
                    message: errorText
                };
            }
        })();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
const getUserAddresses = async (token)=>{
    const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://localhost:8000/api/v1';
    const response = await fetch(`${API_BASE}/auth/addresses/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        const errorData = (()=>{
            try {
                return JSON.parse(errorText);
            } catch  {
                return {
                    message: errorText
                };
            }
        })();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // Handle both direct array response and paginated response
    if (Array.isArray(data)) {
        return data;
    } else if (data && typeof data === 'object' && Array.isArray(data.results)) {
        // Django REST Framework pagination
        return data.results;
    } else {
        return [];
    }
};
const updateAddress = async (addressId, addressData, token)=>{
    const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://localhost:8000/api/v1';
    const response = await fetch(`${API_BASE}/auth/addresses/${addressId}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressData)
    });
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};
const deleteAddress = async (addressId, token)=>{
    const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://localhost:8000/api/v1';
    const response = await fetch(`${API_BASE}/auth/addresses/${addressId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        const errorData = await response.json().catch(()=>({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/api/orders.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// Orders API functions
__turbopack_context__.s({
    "cancelOrder": (()=>cancelOrder),
    "createDirectOrder": (()=>createDirectOrder),
    "createOrder": (()=>createOrder),
    "getOrderById": (()=>getOrderById),
    "getUserOrders": (()=>getUserOrders),
    "reorderItems": (()=>reorderItems),
    "updateOrderPaymentStatus": (()=>updateOrderPaymentStatus)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000/api/v1") || 'http://127.0.0.1:8000/api/v1';
async function getUserOrders(token, params) {
    const url = new URL(`${API_BASE_URL}/orders/`);
    // Add query parameters
    if (params) {
        if (params.status && params.status !== 'all') {
            url.searchParams.append('status', params.status);
        }
        if (params.ordering) {
            url.searchParams.append('ordering', params.ordering);
        }
        if (params.page) {
            url.searchParams.append('page', params.page.toString());
        }
        if (params.page_size) {
            url.searchParams.append('page_size', params.page_size.toString());
        }
    }
    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - please log in again');
        }
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }
    const data = await response.json();
    return {
        ...data,
        results: data.results.map(transformOrder)
    };
}
async function createOrder(orderData, token) {
    console.log('=== CREATE ORDER API CALLED ===');
    console.log('API URL:', `${API_BASE_URL}/orders/create/`);
    console.log('Order data:', orderData);
    console.log('Token available:', !!token);
    const response = await fetch(`${API_BASE_URL}/orders/create/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    console.log('=== CREATE ORDER RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Status text:', response.statusText);
    console.log('Response OK:', response.ok);
    if (!response.ok) {
        const errorData = await response.json();
        console.error('=== CREATE ORDER ERROR RESPONSE ===');
        console.error('Error data:', errorData);
        throw new Error(errorData.message || 'Failed to create order');
    }
    const backendOrder = await response.json();
    console.log('=== CREATE ORDER SUCCESS ===');
    console.log('Backend order response:', backendOrder);
    const transformedOrder = transformOrder(backendOrder);
    console.log('Transformed order:', transformedOrder);
    return transformedOrder;
}
async function updateOrderPaymentStatus(orderId, paymentStatus, token) {
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/orders/payment-callback/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            uid: orderId,
            status: paymentStatus === 'paid' ? 'success' : 'failed'
        })
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update order payment status');
    }
    const result = await response.json();
    // If successful, fetch the updated order
    if (result.success && token) {
        return getOrderById(String(orderId), token);
    }
    throw new Error('Payment status update failed');
}
async function getOrderById(orderId, token) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - please log in again');
        }
        if (response.status === 404) {
            throw new Error('Order not found');
        }
        throw new Error(`Failed to fetch order: ${response.statusText}`);
    }
    const data = await response.json();
    return transformOrder(data);
}
async function cancelOrder(orderId, token) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - please log in again');
        }
        if (response.status === 404) {
            throw new Error('Order not found');
        }
        if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Cannot cancel this order');
        }
        throw new Error(`Failed to cancel order: ${response.statusText}`);
    }
    const data = await response.json();
    return transformOrder(data);
}
async function reorderItems(orderId, token) {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/reorder/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Unauthorized - please log in again');
        }
        if (response.status === 404) {
            throw new Error('Order not found');
        }
        if (response.status === 400) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Cannot reorder these items');
        }
        throw new Error(`Failed to reorder items: ${response.statusText}`);
    }
    return response.json();
}
/**
 * Transform backend order item to frontend format
 */ function transformOrderItem(backendItem) {
    return {
        id: backendItem.id,
        product_id: backendItem.product_id,
        variant_id: backendItem.variant_id,
        product_name: backendItem.product_name,
        variant_name: backendItem.variant_name,
        product_image: backendItem.product_image,
        product_slug: backendItem.product_slug,
        price: backendItem.price,
        quantity: backendItem.quantity,
        color: backendItem.color,
        size: backendItem.size,
        subtotal: backendItem.subtotal,
        sku_snapshot: backendItem.sku_snapshot,
        // Backward compatibility fields
        name: backendItem.product_name,
        image: backendItem.product_image || '/placeholder-product.png',
        variant: backendItem.variant_name
    };
}
/**
 * Transform backend order to frontend format
 */ function transformOrder(backendOrder) {
    console.log('Transforming backend order:', backendOrder);
    const shippingAddress = backendOrder.shipping_address_details || backendOrder.shipping_address || {};
    console.log('Shipping address details:', shippingAddress);
    console.log('User fields from backend:', {
        user_first_name: backendOrder.user_first_name,
        user_last_name: backendOrder.user_last_name,
        user_email: backendOrder.user_email,
        user_phone: backendOrder.user_phone,
        email_for_guest: backendOrder.email_for_guest
    });
    return {
        id: backendOrder.order_id || backendOrder.id,
        order_number: backendOrder.order_number,
        status: mapBackendStatus(backendOrder.order_status),
        payment_status: mapBackendPaymentStatus(backendOrder.payment_status),
        created_at: backendOrder.created_at,
        updated_at: backendOrder.updated_at,
        total_amount: backendOrder.total_amount,
        shipping_cost: backendOrder.shipping_cost,
        discount_amount: backendOrder.discount_amount,
        subtotal_amount: backendOrder.subtotal_amount,
        items: backendOrder.items?.map(transformOrderItem) || [],
        shipping_address: {
            first_name: shippingAddress.recipient_name?.split(' ')[0] || shippingAddress.first_name || '',
            last_name: shippingAddress.recipient_name?.split(' ').slice(1).join(' ') || shippingAddress.last_name || '',
            street_address: shippingAddress.street_address || shippingAddress.address_line_1 || '',
            city: shippingAddress.city || '',
            state: shippingAddress.state_province || shippingAddress.state || shippingAddress.region || '',
            postal_code: shippingAddress.postal_code || shippingAddress.zip_code || '',
            country: shippingAddress.country_code || shippingAddress.country || '',
            phone: shippingAddress.phone_number || shippingAddress.phone || ''
        },
        shipping_method: backendOrder.shipping_method_details?.name || backendOrder.shipping_method || 'Standard',
        shipping_method_details: backendOrder.shipping_method_details,
        tracking_number: backendOrder.tracking_number,
        estimated_delivery: backendOrder.estimated_delivery,
        customer_info: {
            // Use the serialized user fields from backend, then fall back to shipping address
            first_name: backendOrder.user_first_name || shippingAddress.recipient_name?.split(' ')[0] || '',
            last_name: backendOrder.user_last_name || shippingAddress.recipient_name?.split(' ').slice(1).join(' ') || '',
            email: backendOrder.user_email || backendOrder.email_for_guest || '',
            phone: backendOrder.user_phone || shippingAddress.phone_number || ''
        }
    };
}
/**
 * Map backend order status to frontend status
 */ function mapBackendStatus(backendStatus) {
    const statusMap = {
        'pending_payment': 'pending',
        'processing': 'processing',
        'shipped': 'shipped',
        'delivered': 'delivered',
        'cancelled': 'cancelled',
        'refunded': 'cancelled',
        'failed': 'cancelled'
    };
    return statusMap[backendStatus] || 'pending';
}
/**
 * Map backend payment status to frontend payment status
 */ function mapBackendPaymentStatus(backendStatus) {
    const statusMap = {
        'pending': 'pending',
        'paid': 'paid',
        'failed': 'failed',
        'refunded_partial': 'refunded',
        'refunded_full': 'refunded'
    };
    return statusMap[backendStatus] || 'pending';
}
async function createDirectOrder(orderData, token) {
    console.log('=== CREATE DIRECT ORDER API CALLED ===');
    console.log('API URL:', `${API_BASE_URL}/orders/create-direct/`);
    console.log('Order data:', orderData);
    console.log('Token available:', !!token);
    const headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}/orders/create-direct/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
    });
    console.log('=== CREATE DIRECT ORDER RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Status text:', response.statusText);
    console.log('Response OK:', response.ok);
    if (!response.ok) {
        const errorData = await response.json();
        console.error('=== CREATE DIRECT ORDER ERROR RESPONSE ===');
        console.error('Error data:', errorData);
        throw new Error(errorData.message || 'Failed to create direct order');
    }
    const backendOrder = await response.json();
    console.log('=== CREATE DIRECT ORDER SUCCESS ===');
    console.log('Backend order response:', backendOrder);
    const transformedOrder = transformOrder(backendOrder);
    console.log('Transformed direct order:', transformedOrder);
    return transformedOrder;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/checkout/checkout.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "backButton": "checkout-module__6Nj7Kq__backButton",
  "checkoutPage": "checkout-module__6Nj7Kq__checkoutPage",
  "container": "checkout-module__6Nj7Kq__container",
  "content": "checkout-module__6Nj7Kq__content",
  "continueButton": "checkout-module__6Nj7Kq__continueButton",
  "emptyCart": "checkout-module__6Nj7Kq__emptyCart",
  "errorMessage": "checkout-module__6Nj7Kq__errorMessage",
  "header": "checkout-module__6Nj7Kq__header",
  "mainContent": "checkout-module__6Nj7Kq__mainContent",
  "navigation": "checkout-module__6Nj7Kq__navigation",
  "sidebar": "checkout-module__6Nj7Kq__sidebar",
  "spin": "checkout-module__6Nj7Kq__spin",
  "spinner": "checkout-module__6Nj7Kq__spinner",
  "title": "checkout-module__6Nj7Kq__title",
});
}}),
"[project]/src/components/Checkout/CustomerInformation.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "addNewAddressBtn": "CustomerInformation-module__b9ChUq__addNewAddressBtn",
  "addressFormHeader": "CustomerInformation-module__b9ChUq__addressFormHeader",
  "addressModeNote": "CustomerInformation-module__b9ChUq__addressModeNote",
  "autoSaveStatus": "CustomerInformation-module__b9ChUq__autoSaveStatus",
  "billingSection": "CustomerInformation-module__b9ChUq__billingSection",
  "checkbox": "CustomerInformation-module__b9ChUq__checkbox",
  "checkboxGroup": "CustomerInformation-module__b9ChUq__checkboxGroup",
  "checkboxLabel": "CustomerInformation-module__b9ChUq__checkboxLabel",
  "customerInformation": "CustomerInformation-module__b9ChUq__customerInformation",
  "defaultBadge": "CustomerInformation-module__b9ChUq__defaultBadge",
  "deleteSavedAddressBtn": "CustomerInformation-module__b9ChUq__deleteSavedAddressBtn",
  "error": "CustomerInformation-module__b9ChUq__error",
  "errorMessage": "CustomerInformation-module__b9ChUq__errorMessage",
  "formGrid": "CustomerInformation-module__b9ChUq__formGrid",
  "formGroup": "CustomerInformation-module__b9ChUq__formGroup",
  "formSection": "CustomerInformation-module__b9ChUq__formSection",
  "fullWidth": "CustomerInformation-module__b9ChUq__fullWidth",
  "hidden": "CustomerInformation-module__b9ChUq__hidden",
  "input": "CustomerInformation-module__b9ChUq__input",
  "label": "CustomerInformation-module__b9ChUq__label",
  "loadingAddresses": "CustomerInformation-module__b9ChUq__loadingAddresses",
  "required": "CustomerInformation-module__b9ChUq__required",
  "savedAddressActions": "CustomerInformation-module__b9ChUq__savedAddressActions",
  "savedAddressInfo": "CustomerInformation-module__b9ChUq__savedAddressInfo",
  "savedAddressItem": "CustomerInformation-module__b9ChUq__savedAddressItem",
  "savedAddressName": "CustomerInformation-module__b9ChUq__savedAddressName",
  "savedAddressText": "CustomerInformation-module__b9ChUq__savedAddressText",
  "savedAddressesList": "CustomerInformation-module__b9ChUq__savedAddressesList",
  "savedAddressesSection": "CustomerInformation-module__b9ChUq__savedAddressesSection",
  "savedAddressesTitle": "CustomerInformation-module__b9ChUq__savedAddressesTitle",
  "sectionTitle": "CustomerInformation-module__b9ChUq__sectionTitle",
  "select": "CustomerInformation-module__b9ChUq__select",
  "selectedAddress": "CustomerInformation-module__b9ChUq__selectedAddress",
  "selectedAddressDetails": "CustomerInformation-module__b9ChUq__selectedAddressDetails",
  "selectedAddressDisplay": "CustomerInformation-module__b9ChUq__selectedAddressDisplay",
  "selectedAddressHeader": "CustomerInformation-module__b9ChUq__selectedAddressHeader",
  "selectedAddressRow": "CustomerInformation-module__b9ChUq__selectedAddressRow",
  "selectedAddressTitle": "CustomerInformation-module__b9ChUq__selectedAddressTitle",
  "useSavedAddressBtn": "CustomerInformation-module__b9ChUq__useSavedAddressBtn",
});
}}),
"[project]/src/components/Checkout/CustomerInformation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CustomerInformation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/CustomerInformation.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function CustomerInformation({ checkoutData, updateCheckoutData, errors, isAuthenticated, userAddresses = [], isLoadingAddresses = false, autoSaveInProgress = false, onLoadSavedAddress, onDeleteAddress, selectedAddressId = null }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const [showAddressForm, setShowAddressForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleCustomerInfoChange = (field, value)=>{
        updateCheckoutData({
            customer_info: {
                ...checkoutData.customer_info,
                [field]: value
            }
        });
    };
    const handleAddressChange = (field, value)=>{
        updateCheckoutData({
            shipping_address: {
                ...checkoutData.shipping_address,
                [field]: value
            }
        });
    };
    // Handle loading a saved address
    const handleUseSavedAddress = (address)=>{
        onLoadSavedAddress?.(address);
        setShowAddressForm(false); // Hide form when using saved address
    }; // Handle adding a new address
    const handleAddNewAddress = ()=>{
        // Clear current address data
        updateCheckoutData({
            shipping_address: {
                street_address: '',
                apartment: '',
                city: '',
                state: '',
                postal_code: '',
                country: 'BY'
            }
        });
        setShowAddressForm(true);
    };
    // Check if we're using a saved address (read-only mode)
    const isUsingSavedAddress = selectedAddressId && !showAddressForm;
    const selectedAddress = userAddresses.find((addr)=>addr.id === selectedAddressId);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                        children: t('checkout.customerInfo.title')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].authenticatedNotice,
                        children: [
                            "✓ ",
                            t('checkout.customerInfo.loggedIn'),
                            autoSaveInProgress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].autoSaveStatus,
                                children: [
                                    "🔄 ",
                                    t('checkout.customerInfo.saving')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this),
                    "        ",
                    isAuthenticated && userAddresses.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressesSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressesTitle,
                                children: t('checkout.customerInfo.savedAddresses')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            isLoadingAddresses ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingAddresses,
                                children: t('checkout.customerInfo.loadingAddresses')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressesList,
                                children: userAddresses.map((address)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressItem} ${selectedAddressId === address.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddress : ''}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressName,
                                                        children: [
                                                            address.recipient_name,
                                                            address.is_default_shipping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].defaultBadge,
                                                                children: t('checkout.customerInfo.default')
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                                lineNumber: 102,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                        lineNumber: 99,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressText,
                                                        children: [
                                                            address.street_address,
                                                            address.address_line_2 && `, ${address.address_line_2}`,
                                                            ",",
                                                            address.city,
                                                            ", ",
                                                            address.postal_code
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                        lineNumber: 105,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 98,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].savedAddressActions,
                                                children: [
                                                    "                      ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].useSavedAddressBtn,
                                                        onClick: ()=>handleUseSavedAddress(address),
                                                        children: t('checkout.customerInfo.use')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                        lineNumber: 111,
                                                        columnNumber: 87
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deleteSavedAddressBtn,
                                                        onClick: ()=>onDeleteAddress?.(address.id),
                                                        children: t('checkout.customerInfo.delete')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                        lineNumber: 118,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 111,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, address.id, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 94,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addNewAddressBtn,
                                onClick: handleAddNewAddress,
                                children: [
                                    "+ ",
                                    t('checkout.customerInfo.addNewAddress')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 87,
                        columnNumber: 11
                    }, this),
                    "        ",
                    isUsingSavedAddress && selectedAddress && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressDisplay,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressTitle,
                                    children: t('checkout.customerInfo.selectedAddress')
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressDetails,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressRow,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: selectedAddress.recipient_name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 147,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressRow,
                                        children: [
                                            selectedAddress.street_address,
                                            selectedAddress.address_line_2 && `, ${selectedAddress.address_line_2}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 150,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressRow,
                                        children: [
                                            selectedAddress.city,
                                            ", ",
                                            selectedAddress.state_province,
                                            " ",
                                            selectedAddress.postal_code
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    selectedAddress.phone_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selectedAddressRow,
                                        children: [
                                            t('checkout.customerInfo.phoneLabel'),
                                            ": ",
                                            selectedAddress.phone_number
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 158,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "firstName",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.firstName'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 168,
                                                columnNumber: 54
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 167,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "firstName",
                                        value: checkoutData.customer_info.first_name,
                                        onChange: (e)=>handleCustomerInfoChange('first_name', e.target.value),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.first_name ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                        placeholder: t('checkout.customerInfo.firstNamePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    errors.first_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                        children: errors.first_name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 178,
                                        columnNumber: 35
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "lastName",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.lastName'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 182,
                                                columnNumber: 53
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 181,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "lastName",
                                        value: checkoutData.customer_info.last_name,
                                        onChange: (e)=>handleCustomerInfoChange('last_name', e.target.value),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.last_name ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                        placeholder: t('checkout.customerInfo.lastNamePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 184,
                                        columnNumber: 13
                                    }, this),
                                    errors.last_name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                        children: errors.last_name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 192,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "email",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.email'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 198,
                                                columnNumber: 50
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 197,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        id: "email",
                                        value: checkoutData.customer_info.email,
                                        onChange: (e)=>handleCustomerInfoChange('email', e.target.value),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.email ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                        placeholder: t('checkout.customerInfo.emailPlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                        children: errors.email
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 208,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "phone",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: t('checkout.customerInfo.phone')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "tel",
                                        id: "phone",
                                        value: checkoutData.customer_info.phone,
                                        onChange: (e)=>handleCustomerInfoChange('phone', e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        placeholder: t('checkout.customerInfo.phonePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 215,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this),
                    "      "
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                lineNumber: 74,
                columnNumber: 45
            }, this),
            showAddressForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                children: [
                    "          ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addressFormHeader,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionTitle,
                                children: t('checkout.customerInfo.shippingAddress')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this),
                            !isUsingSavedAddress && isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].addressModeNote,
                                children: t('checkout.customerInfo.addressNote')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 231,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 228,
                        columnNumber: 51
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                        children: [
                            "          ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "streetAddress",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                children: [
                                    t('checkout.customerInfo.streetAddress'),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                        children: "*"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 238,
                                        columnNumber: 56
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 237,
                                columnNumber: 53
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "streetAddress",
                                value: checkoutData.shipping_address.street_address,
                                onChange: (e)=>handleAddressChange('street_address', e.target.value),
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.street_address ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                placeholder: t('checkout.customerInfo.streetAddressPlaceholder')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this),
                            errors.street_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                children: errors.street_address
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 248,
                                columnNumber: 37
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                        children: [
                            "          ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "apartment",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                children: t('checkout.customerInfo.apartment')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 251,
                                columnNumber: 53
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                id: "apartment",
                                value: checkoutData.shipping_address.apartment,
                                onChange: (e)=>handleAddressChange('apartment', e.target.value),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                placeholder: t('checkout.customerInfo.apartmentPlaceholder')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "city",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.city'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 266,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 265,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "city",
                                        value: checkoutData.shipping_address.city,
                                        onChange: (e)=>handleAddressChange('city', e.target.value),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.city ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                        placeholder: t('checkout.customerInfo.cityPlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    errors.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                        children: errors.city
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 276,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "state",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: t('checkout.customerInfo.state')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 279,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "state",
                                        value: checkoutData.shipping_address.state,
                                        onChange: (e)=>handleAddressChange('state', e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input,
                                        placeholder: t('checkout.customerInfo.statePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 282,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "postalCode",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.postalCode'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 296,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        id: "postalCode",
                                        value: checkoutData.shipping_address.postal_code,
                                        onChange: (e)=>handleAddressChange('postal_code', e.target.value),
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input} ${errors.postal_code ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputError : ''}`,
                                        placeholder: t('checkout.customerInfo.postalCodePlaceholder')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 298,
                                        columnNumber: 13
                                    }, this),
                                    errors.postal_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                                        children: errors.postal_code
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 306,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].formGroup,
                                children: [
                                    "            ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        htmlFor: "country",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: [
                                            t('checkout.customerInfo.country'),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].required,
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 310,
                                                columnNumber: 52
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 309,
                                        columnNumber: 57
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        id: "country",
                                        value: checkoutData.shipping_address.country,
                                        onChange: (e)=>handleAddressChange('country', e.target.value),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].select,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AU",
                                                children: t('checkout.customerInfo.countries.australia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 318,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AT",
                                                children: t('checkout.customerInfo.countries.austria')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 319,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AZ",
                                                children: t('checkout.customerInfo.countries.azerbaijan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 320,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AL",
                                                children: t('checkout.customerInfo.countries.albania')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 321,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DZ",
                                                children: t('checkout.customerInfo.countries.algeria')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 322,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AI",
                                                children: t('checkout.customerInfo.countries.anguilla')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 323,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AO",
                                                children: t('checkout.customerInfo.countries.angola')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 324,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AG",
                                                children: t('checkout.customerInfo.countries.antiguaAndBarbuda')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 325,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AR",
                                                children: t('checkout.customerInfo.countries.argentina')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 326,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AW",
                                                children: t('checkout.customerInfo.countries.aruba')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 327,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AF",
                                                children: t('checkout.customerInfo.countries.afghanistan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 328,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BS",
                                                children: t('checkout.customerInfo.countries.bahamas')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 329,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BD",
                                                children: t('checkout.customerInfo.countries.bangladesh')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 330,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BB",
                                                children: t('checkout.customerInfo.countries.barbados')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 331,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BH",
                                                children: t('checkout.customerInfo.countries.bahrain')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 332,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BZ",
                                                children: t('checkout.customerInfo.countries.belize')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 333,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BE",
                                                children: t('checkout.customerInfo.countries.belgium')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 334,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BJ",
                                                children: t('checkout.customerInfo.countries.benin')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 335,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BM",
                                                children: t('checkout.customerInfo.countries.bermuda')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 336,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BQ",
                                                children: t('checkout.customerInfo.countries.bonaireSintEustatiusSaba')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 337,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BG",
                                                children: t('checkout.customerInfo.countries.bulgaria')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 338,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BO",
                                                children: t('checkout.customerInfo.countries.bolivia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 339,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BA",
                                                children: t('checkout.customerInfo.countries.bosniaHerzegovina')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 340,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BW",
                                                children: t('checkout.customerInfo.countries.botswana')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 341,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BR",
                                                children: t('checkout.customerInfo.countries.brazil')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 342,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BN",
                                                children: t('checkout.customerInfo.countries.bruneiDarussalam')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 343,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BF",
                                                children: t('checkout.customerInfo.countries.burkinaFaso')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 344,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BI",
                                                children: t('checkout.customerInfo.countries.burundi')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 345,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "BT",
                                                children: t('checkout.customerInfo.countries.bhutan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 346,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VU",
                                                children: t('checkout.customerInfo.countries.vanuatu')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 347,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VA",
                                                children: t('checkout.customerInfo.countries.vatican')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 348,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GB",
                                                children: t('checkout.customerInfo.countries.unitedKingdom')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 349,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VG",
                                                children: t('checkout.customerInfo.countries.virginIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 350,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GG",
                                                children: t('checkout.customerInfo.countries.guernsey')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 351,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "JE",
                                                children: t('checkout.customerInfo.countries.jersey')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 352,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GI",
                                                children: t('checkout.customerInfo.countries.gibraltar')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 353,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HU",
                                                children: t('checkout.customerInfo.countries.hungary')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 354,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VE",
                                                children: t('checkout.customerInfo.countries.venezuela')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 355,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VN",
                                                children: t('checkout.customerInfo.countries.vietnam')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 356,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GA",
                                                children: t('checkout.customerInfo.countries.gabon')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 357,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HT",
                                                children: t('checkout.customerInfo.countries.haiti')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 358,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GY",
                                                children: t('checkout.customerInfo.countries.guyana')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 359,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GM",
                                                children: t('checkout.customerInfo.countries.gambia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 360,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GH",
                                                children: t('checkout.customerInfo.countries.ghana')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 361,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GT",
                                                children: t('checkout.customerInfo.countries.guatemala')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 362,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GN",
                                                children: t('checkout.customerInfo.countries.guinea')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 363,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DE",
                                                children: t('checkout.customerInfo.countries.germany')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 364,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GD",
                                                children: t('checkout.customerInfo.countries.grenada')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 365,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GR",
                                                children: t('checkout.customerInfo.countries.greece')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 366,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GE",
                                                children: t('checkout.customerInfo.countries.georgia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 367,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DK",
                                                children: t('checkout.customerInfo.countries.denmark')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 368,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GL",
                                                children: t('checkout.customerInfo.countries.greenland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 369,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FO",
                                                children: t('checkout.customerInfo.countries.faroeIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 370,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CD",
                                                children: t('checkout.customerInfo.countries.democraticRepublicCongo')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 371,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DJ",
                                                children: t('checkout.customerInfo.countries.djibouti')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 372,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DM",
                                                children: t('checkout.customerInfo.countries.dominica')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 373,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "DO",
                                                children: t('checkout.customerInfo.countries.dominicanRepublic')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 374,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "EG",
                                                children: t('checkout.customerInfo.countries.egypt')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 375,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ZM",
                                                children: t('checkout.customerInfo.countries.zambia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 376,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ZW",
                                                children: t('checkout.customerInfo.countries.zimbabwe')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 377,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IN",
                                                children: t('checkout.customerInfo.countries.india')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 378,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ID",
                                                children: t('checkout.customerInfo.countries.indonesia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 379,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "JO",
                                                children: t('checkout.customerInfo.countries.jordan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 380,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IQ",
                                                children: t('checkout.customerInfo.countries.iraq')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 381,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IR",
                                                children: t('checkout.customerInfo.countries.iran')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 382,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IE",
                                                children: t('checkout.customerInfo.countries.ireland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 383,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IS",
                                                children: t('checkout.customerInfo.countries.iceland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 384,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ES",
                                                children: t('checkout.customerInfo.countries.spain')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 385,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IC",
                                                children: t('checkout.customerInfo.countries.canaryIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 386,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "IT",
                                                children: t('checkout.customerInfo.countries.italy')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 387,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "YE",
                                                children: t('checkout.customerInfo.countries.yemen')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 388,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CV",
                                                children: t('checkout.customerInfo.countries.capeVerde')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 389,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KZ",
                                                children: t('checkout.customerInfo.countries.kazakhstan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 390,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KY",
                                                children: t('checkout.customerInfo.countries.caymanIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 391,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KH",
                                                children: t('checkout.customerInfo.countries.cambodia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 392,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CM",
                                                children: t('checkout.customerInfo.countries.cameroon')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 393,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CA",
                                                children: t('checkout.customerInfo.countries.canada')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 394,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "QA",
                                                children: t('checkout.customerInfo.countries.qatar')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 395,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KE",
                                                children: t('checkout.customerInfo.countries.kenya')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 396,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CY",
                                                children: t('checkout.customerInfo.countries.cyprus')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 397,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KG",
                                                children: t('checkout.customerInfo.countries.kyrgyzstan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 398,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KI",
                                                children: t('checkout.customerInfo.countries.kiribati')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 399,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CN",
                                                children: t('checkout.customerInfo.countries.china')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 400,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HK",
                                                children: t('checkout.customerInfo.countries.hongKong')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 401,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TW",
                                                children: t('checkout.customerInfo.countries.taiwan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 402,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CO",
                                                children: t('checkout.customerInfo.countries.colombia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 403,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KM",
                                                children: t('checkout.customerInfo.countries.comorosIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 404,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CG",
                                                children: t('checkout.customerInfo.countries.republicCongo')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 405,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KP",
                                                children: t('checkout.customerInfo.countries.northKorea')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 406,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "XK",
                                                children: t('checkout.customerInfo.countries.kosovo')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 407,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CR",
                                                children: t('checkout.customerInfo.countries.costaRica')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 408,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CI",
                                                children: t('checkout.customerInfo.countries.coteIvoire')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 409,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CU",
                                                children: t('checkout.customerInfo.countries.cuba')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 410,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KW",
                                                children: t('checkout.customerInfo.countries.kuwait')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 411,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CW",
                                                children: t('checkout.customerInfo.countries.curacao')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 412,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LA",
                                                children: t('checkout.customerInfo.countries.laos')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 413,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LV",
                                                children: t('checkout.customerInfo.countries.latvia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 414,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LS",
                                                children: t('checkout.customerInfo.countries.lesotho')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 415,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LR",
                                                children: t('checkout.customerInfo.countries.liberia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 416,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LB",
                                                children: t('checkout.customerInfo.countries.lebanon')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 417,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LY",
                                                children: t('checkout.customerInfo.countries.libya')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 418,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LT",
                                                children: t('checkout.customerInfo.countries.lithuania')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 419,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LI",
                                                children: t('checkout.customerInfo.countries.liechtenstein')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 420,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LU",
                                                children: t('checkout.customerInfo.countries.luxembourg')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 421,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MU",
                                                children: t('checkout.customerInfo.countries.mauritius')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 422,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MR",
                                                children: t('checkout.customerInfo.countries.mauritania')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 423,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MG",
                                                children: t('checkout.customerInfo.countries.madagascar')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 424,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MO",
                                                children: t('checkout.customerInfo.countries.macao')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 425,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MK",
                                                children: t('checkout.customerInfo.countries.northMacedonia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 426,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MW",
                                                children: t('checkout.customerInfo.countries.malawi')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 427,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MY",
                                                children: t('checkout.customerInfo.countries.malaysia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 428,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ML",
                                                children: t('checkout.customerInfo.countries.mali')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 429,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MV",
                                                children: t('checkout.customerInfo.countries.maldives')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 430,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MT",
                                                children: t('checkout.customerInfo.countries.malta')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 431,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MA",
                                                children: t('checkout.customerInfo.countries.morocco')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 432,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MX",
                                                children: t('checkout.customerInfo.countries.mexico')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 433,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MZ",
                                                children: t('checkout.customerInfo.countries.mozambique')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 434,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MD",
                                                children: t('checkout.customerInfo.countries.moldova')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 435,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MC",
                                                children: t('checkout.customerInfo.countries.monaco')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 436,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MN",
                                                children: t('checkout.customerInfo.countries.mongolia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 437,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MM",
                                                children: t('checkout.customerInfo.countries.myanmar')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 438,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NA",
                                                children: t('checkout.customerInfo.countries.namibia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 439,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NL",
                                                children: t('checkout.customerInfo.countries.netherlands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 440,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NP",
                                                children: t('checkout.customerInfo.countries.nepal')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 441,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NE",
                                                children: t('checkout.customerInfo.countries.niger')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 442,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NG",
                                                children: t('checkout.customerInfo.countries.nigeria')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 443,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NI",
                                                children: t('checkout.customerInfo.countries.nicaragua')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 444,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NZ",
                                                children: t('checkout.customerInfo.countries.newZealand')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 445,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NC",
                                                children: t('checkout.customerInfo.countries.newCaledonia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 446,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "NO",
                                                children: t('checkout.customerInfo.countries.norway')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 447,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "AE",
                                                children: t('checkout.customerInfo.countries.unitedArabEmirates')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 448,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "OM",
                                                children: t('checkout.customerInfo.countries.oman')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 449,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PK",
                                                children: t('checkout.customerInfo.countries.pakistan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 450,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PA",
                                                children: t('checkout.customerInfo.countries.panama')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 451,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PG",
                                                children: t('checkout.customerInfo.countries.papuaNewGuinea')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 452,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PY",
                                                children: t('checkout.customerInfo.countries.paraguay')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 453,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PE",
                                                children: t('checkout.customerInfo.countries.peru')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 454,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PL",
                                                children: t('checkout.customerInfo.countries.poland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 455,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PT",
                                                children: t('checkout.customerInfo.countries.portugal')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 456,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RU",
                                                children: t('checkout.customerInfo.countries.russianFederation')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 457,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RW",
                                                children: t('checkout.customerInfo.countries.rwanda')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 458,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RO",
                                                children: t('checkout.customerInfo.countries.romania')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 459,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SV",
                                                children: t('checkout.customerInfo.countries.salvador')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 460,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "WS",
                                                children: t('checkout.customerInfo.countries.samoa')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 461,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SM",
                                                children: t('checkout.customerInfo.countries.sanMarino')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 462,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ST",
                                                children: t('checkout.customerInfo.countries.saoTomeAndPrincipe')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 463,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SA",
                                                children: t('checkout.customerInfo.countries.saudiArabia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 464,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SZ",
                                                children: t('checkout.customerInfo.countries.eswatini')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 465,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SC",
                                                children: t('checkout.customerInfo.countries.seychelles')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 466,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SN",
                                                children: t('checkout.customerInfo.countries.senegal')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 467,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VC",
                                                children: t('checkout.customerInfo.countries.stVincentAndGrenadines')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 468,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "KN",
                                                children: t('checkout.customerInfo.countries.saintKittsAndNevis')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 469,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LC",
                                                children: t('checkout.customerInfo.countries.stLucia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 470,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "MF",
                                                children: t('checkout.customerInfo.countries.saintMartin')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 471,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "RS",
                                                children: t('checkout.customerInfo.countries.serbia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 472,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SG",
                                                children: t('checkout.customerInfo.countries.singapore')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 473,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SY",
                                                children: t('checkout.customerInfo.countries.syrianArabRepublic')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 474,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SK",
                                                children: t('checkout.customerInfo.countries.slovakia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 475,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SI",
                                                children: t('checkout.customerInfo.countries.slovenia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 476,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SB",
                                                children: t('checkout.customerInfo.countries.solomonIsland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 477,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SD",
                                                children: t('checkout.customerInfo.countries.sudan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 478,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SR",
                                                children: t('checkout.customerInfo.countries.surinam')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 479,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "US",
                                                children: t('checkout.customerInfo.countries.usa')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 480,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "VI",
                                                children: t('checkout.customerInfo.countries.usVirginIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 481,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SL",
                                                children: t('checkout.customerInfo.countries.sierraLeone')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 482,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TJ",
                                                children: t('checkout.customerInfo.countries.tajikistan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 483,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TH",
                                                children: t('checkout.customerInfo.countries.thailand')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 484,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TZ",
                                                children: t('checkout.customerInfo.countries.tanzania')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 485,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TC",
                                                children: t('checkout.customerInfo.countries.turksAndCaicosIslands')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 486,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TG",
                                                children: t('checkout.customerInfo.countries.togoleseRepublic')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 487,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TO",
                                                children: t('checkout.customerInfo.countries.tonga')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 488,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TT",
                                                children: t('checkout.customerInfo.countries.trinidadAndTobago')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 489,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TN",
                                                children: t('checkout.customerInfo.countries.tunisia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 490,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TM",
                                                children: t('checkout.customerInfo.countries.turkmenistan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 491,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TR",
                                                children: t('checkout.customerInfo.countries.turkey')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 492,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "UG",
                                                children: t('checkout.customerInfo.countries.uganda')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 493,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "UZ",
                                                children: t('checkout.customerInfo.countries.uzbekistan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 494,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "UA",
                                                children: t('checkout.customerInfo.countries.ukraine')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 495,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "UY",
                                                children: t('checkout.customerInfo.countries.uruguay')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 496,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FJ",
                                                children: t('checkout.customerInfo.countries.fiji')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 497,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PH",
                                                children: t('checkout.customerInfo.countries.philippines')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 498,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FI",
                                                children: t('checkout.customerInfo.countries.finland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 499,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "FR",
                                                children: t('checkout.customerInfo.countries.france')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 500,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "PF",
                                                children: t('checkout.customerInfo.countries.frenchPolynesia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 501,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "HR",
                                                children: t('checkout.customerInfo.countries.croatia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 502,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CF",
                                                children: t('checkout.customerInfo.countries.centralAfricanRepublic')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 503,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "TD",
                                                children: t('checkout.customerInfo.countries.chad')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 504,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ME",
                                                children: t('checkout.customerInfo.countries.montenegro')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 505,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CZ",
                                                children: t('checkout.customerInfo.countries.czechRepublic')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 506,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CL",
                                                children: t('checkout.customerInfo.countries.chile')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 507,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "CH",
                                                children: t('checkout.customerInfo.countries.switzerland')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 508,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "SE",
                                                children: t('checkout.customerInfo.countries.sweden')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 509,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "LK",
                                                children: t('checkout.customerInfo.countries.sriLanka')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 510,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "EC",
                                                children: t('checkout.customerInfo.countries.ecuador')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 511,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "GQ",
                                                children: t('checkout.customerInfo.countries.equatorialGuinea')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 512,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ER",
                                                children: t('checkout.customerInfo.countries.eritrea')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 513,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "EE",
                                                children: t('checkout.customerInfo.countries.estonia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 514,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ET",
                                                children: t('checkout.customerInfo.countries.ethiopia')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 515,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "ZA",
                                                children: t('checkout.customerInfo.countries.southAfrica')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 516,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "JM",
                                                children: t('checkout.customerInfo.countries.jamaica')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 517,
                                                columnNumber: 13
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "JP",
                                                children: t('checkout.customerInfo.countries.japan')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                                lineNumber: 518,
                                                columnNumber: 13
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                        lineNumber: 312,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxLabel,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: checkoutData.save_address,
                                    onChange: (e)=>updateCheckoutData({
                                            save_address: e.target.checked
                                        }),
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxInput
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                    lineNumber: 527,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkboxMark
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                                    lineNumber: 533,
                                    columnNumber: 15
                                }, this),
                                t('checkout.customerInfo.saveAddress')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
                lineNumber: 228,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Checkout/CustomerInformation.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(CustomerInformation, "udAPH3VeS+swgDtmoNterzUT5xg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = CustomerInformation;
var _c;
__turbopack_context__.k.register(_c, "CustomerInformation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Checkout/ShippingStep.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "container": "ShippingStep-module__43A7bq__container",
  "deliveryTime": "ShippingStep-module__43A7bq__deliveryTime",
  "errorMessage": "ShippingStep-module__43A7bq__errorMessage",
  "fadeInUp": "ShippingStep-module__43A7bq__fadeInUp",
  "freeShipping": "ShippingStep-module__43A7bq__freeShipping",
  "infoIcon": "ShippingStep-module__43A7bq__infoIcon",
  "infoText": "ShippingStep-module__43A7bq__infoText",
  "justSelected": "ShippingStep-module__43A7bq__justSelected",
  "methodContent": "ShippingStep-module__43A7bq__methodContent",
  "methodDescription": "ShippingStep-module__43A7bq__methodDescription",
  "methodHeader": "ShippingStep-module__43A7bq__methodHeader",
  "methodInfo": "ShippingStep-module__43A7bq__methodInfo",
  "methodName": "ShippingStep-module__43A7bq__methodName",
  "methodPrice": "ShippingStep-module__43A7bq__methodPrice",
  "methodPricing": "ShippingStep-module__43A7bq__methodPricing",
  "radioButton": "ShippingStep-module__43A7bq__radioButton",
  "radioInput": "ShippingStep-module__43A7bq__radioInput",
  "radioMark": "ShippingStep-module__43A7bq__radioMark",
  "selected": "ShippingStep-module__43A7bq__selected",
  "selectionPulse": "ShippingStep-module__43A7bq__selectionPulse",
  "shippingInfo": "ShippingStep-module__43A7bq__shippingInfo",
  "shippingMethod": "ShippingStep-module__43A7bq__shippingMethod",
  "shippingMethods": "ShippingStep-module__43A7bq__shippingMethods",
  "title": "ShippingStep-module__43A7bq__title",
});
}}),
"[project]/src/components/Checkout/ShippingStep.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ShippingStep)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/ShippingStep.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function ShippingStep({ checkoutData, updateCheckoutData, shippingMethods, errors }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const [selectedAnimation, setSelectedAnimation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleShippingMethodChange = (method)=>{
        updateCheckoutData({
            shipping_method: method
        });
        // Trigger selection animation
        setSelectedAnimation(method.id);
        setTimeout(()=>setSelectedAnimation(null), 600);
    };
    const formatDeliveryTime = (method)=>{
        const minDays = method.estimated_delivery_min_days || 0;
        const maxDays = method.estimated_delivery_max_days || 0;
        if (minDays === 0 && maxDays === 0) {
            return t('checkout.shipping.deliveryTime.today');
        }
        if (minDays === maxDays) {
            return t('checkout.shipping.deliveryTime.days', {
                count: minDays
            });
        }
        return t('checkout.shipping.deliveryTime.range', {
            min: minDays,
            max: maxDays
        });
    };
    const formatPrice = (price)=>{
        return price === 0 ? t('checkout.shipping.free') : `${price.toFixed(2)} EUR`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: t('checkout.shipping.title')
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shippingMethods,
                children: shippingMethods.filter((method)=>method.is_active).map((method)=>{
                    const isSelected = checkoutData.shipping_method?.id === method.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shippingMethod} ${isSelected ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''} ${selectedAnimation === method.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].justSelected : ''}`,
                        onClick: ()=>handleShippingMethodChange(method),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodContent,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioButton,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                name: "shipping_method",
                                                checked: isSelected,
                                                onChange: ()=>handleShippingMethodChange(method),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 68,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioMark
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 75,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                        lineNumber: 67,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodInfo,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodName,
                                                children: method.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 79,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodDescription,
                                                children: method.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 80,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                        lineNumber: 78,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodPricing,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodPrice,
                                                children: formatPrice(method.cost)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 84,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].deliveryTime,
                                                children: formatDeliveryTime(method)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                                lineNumber: 85,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                        lineNumber: 83,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                                lineNumber: 66,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                            lineNumber: 65,
                            columnNumber: 17
                        }, this)
                    }, method.id, false, {
                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                        lineNumber: 58,
                        columnNumber: 35
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this),
            "      ",
            errors.shipping_method && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: errors.shipping_method
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shippingInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoIcon,
                        children: "ℹ️"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].infoText,
                        children: t('checkout.shipping.info')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
                lineNumber: 98,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Checkout/ShippingStep.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(ShippingStep, "8EdKJpYeNSmgKgmlTqDXeC23dyo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = ShippingStep;
var _c;
__turbopack_context__.k.register(_c, "ShippingStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Checkout/PaymentStep.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "cardForm": "PaymentStep-module__WJ7oIa__cardForm",
  "cardIcon": "PaymentStep-module__WJ7oIa__cardIcon",
  "cardIcons": "PaymentStep-module__WJ7oIa__cardIcons",
  "checkbox": "PaymentStep-module__WJ7oIa__checkbox",
  "checkboxLabel": "PaymentStep-module__WJ7oIa__checkboxLabel",
  "container": "PaymentStep-module__WJ7oIa__container",
  "error": "PaymentStep-module__WJ7oIa__error",
  "errorMessage": "PaymentStep-module__WJ7oIa__errorMessage",
  "formGrid": "PaymentStep-module__WJ7oIa__formGrid",
  "formGroup": "PaymentStep-module__WJ7oIa__formGroup",
  "fullWidth": "PaymentStep-module__WJ7oIa__fullWidth",
  "input": "PaymentStep-module__WJ7oIa__input",
  "instructionsIcon": "PaymentStep-module__WJ7oIa__instructionsIcon",
  "instructionsList": "PaymentStep-module__WJ7oIa__instructionsList",
  "instructionsText": "PaymentStep-module__WJ7oIa__instructionsText",
  "label": "PaymentStep-module__WJ7oIa__label",
  "methodContent": "PaymentStep-module__WJ7oIa__methodContent",
  "methodDescription": "PaymentStep-module__WJ7oIa__methodDescription",
  "methodIcon": "PaymentStep-module__WJ7oIa__methodIcon",
  "methodInfo": "PaymentStep-module__WJ7oIa__methodInfo",
  "methodName": "PaymentStep-module__WJ7oIa__methodName",
  "orderTotal": "PaymentStep-module__WJ7oIa__orderTotal",
  "paymentInstructions": "PaymentStep-module__WJ7oIa__paymentInstructions",
  "paymentMethod": "PaymentStep-module__WJ7oIa__paymentMethod",
  "paymentMethods": "PaymentStep-module__WJ7oIa__paymentMethods",
  "paymentStep": "PaymentStep-module__WJ7oIa__paymentStep",
  "radioButton": "PaymentStep-module__WJ7oIa__radioButton",
  "saveCard": "PaymentStep-module__WJ7oIa__saveCard",
  "securityInfo": "PaymentStep-module__WJ7oIa__securityInfo",
  "selected": "PaymentStep-module__WJ7oIa__selected",
  "title": "PaymentStep-module__WJ7oIa__title",
});
}}),
"[project]/src/components/Checkout/PaymentStep.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PaymentStep)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/PaymentStep.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PaymentStep({ checkoutData, updateCheckoutData, paymentMethods, errors, orderSummary }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const handlePaymentMethodChange = (method)=>{
        updateCheckoutData({
            payment_method: method
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                children: t('checkout.payment.title')
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentMethods,
                children: paymentMethods.map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentMethod} ${checkoutData.payment_method?.id === method.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].selected : ''}`,
                        onClick: ()=>handlePaymentMethodChange(method),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioButton,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "radio",
                                            name: "payment_method",
                                            checked: checkoutData.payment_method?.id === method.id,
                                            onChange: ()=>handlePaymentMethodChange(method),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioInput
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                            lineNumber: 46,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].radioMark
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodIcon,
                                    children: method.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                    lineNumber: 56,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodName,
                                            children: method.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                            lineNumber: 58,
                                            columnNumber: 17
                                        }, this),
                                        method.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].methodDescription,
                                            children: t(method.description)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                            lineNumber: 60,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                                    lineNumber: 57,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    }, method.id, false, {
                        fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            errors.payment_method && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: errors.payment_method
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                lineNumber: 69,
                columnNumber: 9
            }, this),
            "      ",
            checkoutData.payment_method && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentInstructions,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].instructionsIcon,
                        children: "🔒"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].instructionsText,
                        children: t('checkout.payment.instructions')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                        lineNumber: 75,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            errors.payment_method && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                children: errors.payment_method
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Checkout/PaymentStep.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_s(PaymentStep, "82N5KF9nLzZ6+2WH7KIjzIXRkLw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = PaymentStep;
var _c;
__turbopack_context__.k.register(_c, "PaymentStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Checkout/ConfirmationStep.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "confirmationSections": "ConfirmationStep-module__r8HLVq__confirmationSections",
  "confirmationStep": "ConfirmationStep-module__r8HLVq__confirmationStep",
  "disabled": "ConfirmationStep-module__r8HLVq__disabled",
  "fadeInError": "ConfirmationStep-module__r8HLVq__fadeInError",
  "grandTotal": "ConfirmationStep-module__r8HLVq__grandTotal",
  "itemInfo": "ConfirmationStep-module__r8HLVq__itemInfo",
  "itemPrice": "ConfirmationStep-module__r8HLVq__itemPrice",
  "orderItem": "ConfirmationStep-module__r8HLVq__orderItem",
  "orderItems": "ConfirmationStep-module__r8HLVq__orderItems",
  "orderTotals": "ConfirmationStep-module__r8HLVq__orderTotals",
  "paymentIcon": "ConfirmationStep-module__r8HLVq__paymentIcon",
  "paymentMethod": "ConfirmationStep-module__r8HLVq__paymentMethod",
  "placeOrderButton": "ConfirmationStep-module__r8HLVq__placeOrderButton",
  "placeOrderSection": "ConfirmationStep-module__r8HLVq__placeOrderSection",
  "redirectNotice": "ConfirmationStep-module__r8HLVq__redirectNotice",
  "reviewText": "ConfirmationStep-module__r8HLVq__reviewText",
  "section": "ConfirmationStep-module__r8HLVq__section",
  "sectionContent": "ConfirmationStep-module__r8HLVq__sectionContent",
  "securityNotice": "ConfirmationStep-module__r8HLVq__securityNotice",
  "spin": "ConfirmationStep-module__r8HLVq__spin",
  "spinner": "ConfirmationStep-module__r8HLVq__spinner",
  "terms": "ConfirmationStep-module__r8HLVq__terms",
  "termsError": "ConfirmationStep-module__r8HLVq__termsError",
  "termsLabel": "ConfirmationStep-module__r8HLVq__termsLabel",
  "totalLine": "ConfirmationStep-module__r8HLVq__totalLine",
  "variant": "ConfirmationStep-module__r8HLVq__variant",
});
}}),
"[project]/src/components/Checkout/ConfirmationStep.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/ConfirmationStep.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ConfirmationStep = ({ checkoutData, orderSummary, onPlaceOrder, isLoading = false })=>{
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const [isTermsAgreed, setIsTermsAgreed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showTermsError, setShowTermsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { customer_info, shipping_address, shipping_method, payment_method } = checkoutData;
    const formatAddress = (address)=>{
        if (!address) return '';
        const parts = [];
        if (address.street_address) parts.push(address.street_address);
        if (address.apartment) parts.push(address.apartment);
        if (address.city) parts.push(address.city);
        if (address.state) parts.push(address.state);
        if (address.postal_code) parts.push(address.postal_code);
        if (address.country) parts.push(address.country);
        return parts.join(', ');
    };
    const formatDeliveryTime = (days)=>{
        if (days === 1) return t('checkout.confirmation.deliveryTime.oneDay');
        if (days <= 7) return t('checkout.confirmation.deliveryTime.days', {
            days
        });
        if (days <= 14) return t('checkout.confirmation.deliveryTime.weeks', {
            weeks: '1-2'
        });
        return t('checkout.confirmation.deliveryTime.weeks', {
            weeks: Math.ceil(days / 7)
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].confirmationStep,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: t('checkout.confirmation.title')
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].reviewText,
                children: t('checkout.confirmation.reviewText')
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].confirmationSections,
                children: [
                    "        ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: t('checkout.confirmation.customerInfo.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.customerInfo.name'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 54,
                                                columnNumber: 16
                                            }, this),
                                            " ",
                                            customer_info?.first_name,
                                            " ",
                                            customer_info?.last_name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.customerInfo.email'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 55,
                                                columnNumber: 16
                                            }, this),
                                            " ",
                                            customer_info?.email
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 55,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.customerInfo.phone'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 56,
                                                columnNumber: 16
                                            }, this),
                                            " ",
                                            customer_info?.phone
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 56,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this),
                    "        ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: t('checkout.confirmation.shippingInfo.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                t('checkout.confirmation.shippingInfo.address'),
                                                ":"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                            lineNumber: 62,
                                            columnNumber: 16
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 62,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: formatAddress(shipping_address)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 63,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.shippingInfo.method'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 64,
                                                columnNumber: 16
                                            }, this),
                                            " ",
                                            shipping_method?.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 64,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.shippingInfo.deliveryTime'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 65,
                                                columnNumber: 16
                                            }, this),
                                            " ",
                                            shipping_method?.estimated_delivery_min_days ? formatDeliveryTime(shipping_method.estimated_delivery_min_days) : 'N/A'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 65,
                                        columnNumber: 13
                                    }, this),
                                    shipping_method && shipping_method.cost > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    t('checkout.confirmation.shippingInfo.cost'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 67,
                                                columnNumber: 18
                                            }, this),
                                            " ",
                                            shipping_method.cost.toFixed(2),
                                            " EUR"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 67,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            "        "
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    "        ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: t('checkout.confirmation.paymentMethod.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sectionContent,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentMethod,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paymentIcon,
                                            children: [
                                                payment_method?.type === 'card' && '💳',
                                                payment_method?.type === 'paypal' && '🅿️',
                                                payment_method?.type === 'apple_pay' && '🍎',
                                                payment_method?.type === 'google_pay' && '🔍',
                                                payment_method?.type === 'bank_transfer' && '🏦'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: payment_method?.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: t('checkout.confirmation.orderItems.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItems,
                                children: orderSummary.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemInfo,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            t('checkout.confirmation.orderItems.quantity'),
                                                            ": ",
                                                            item.quantity
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                        lineNumber: 94,
                                                        columnNumber: 19
                                                    }, this),
                                                    item.variant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].variant,
                                                        children: [
                                                            t('checkout.confirmation.orderItems.variant'),
                                                            ": ",
                                                            item.variant
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                        lineNumber: 96,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 92,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemPrice,
                                                children: [
                                                    (item.price * item.quantity).toFixed(2),
                                                    " EUR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 99,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.id, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: t('checkout.confirmation.orderTotal.title')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTotals,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    t('checkout.confirmation.orderTotal.subtotal'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    orderSummary.subtotal.toFixed(2),
                                                    " EUR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this),
                                    orderSummary.shipping_cost > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    t('checkout.confirmation.orderTotal.shipping'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 117,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    orderSummary.shipping_cost.toFixed(2),
                                                    " EUR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 118,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 116,
                                        columnNumber: 15
                                    }, this),
                                    orderSummary.discount_amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    t('checkout.confirmation.orderTotal.discount'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "-",
                                                    orderSummary.discount_amount.toFixed(2),
                                                    " EUR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 124,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 122,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grandTotal}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    t('checkout.confirmation.orderTotal.total'),
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    orderSummary.total_amount.toFixed(2),
                                                    " EUR"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].terms,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].termsLabel,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: isTermsAgreed,
                                onChange: (e)=>{
                                    setIsTermsAgreed(e.target.checked);
                                    if (e.target.checked) {
                                        setShowTermsError(false);
                                    }
                                },
                                required: true
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    t('checkout.confirmation.terms.agree'),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/terms",
                                        target: "_blank",
                                        children: t('checkout.confirmation.terms.termsLink')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 150,
                                        columnNumber: 54
                                    }, this),
                                    " ",
                                    t('checkout.confirmation.terms.and'),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/privacy",
                                        target: "_blank",
                                        children: t('checkout.confirmation.terms.privacyLink')
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    showTermsError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].termsError,
                        children: t('checkout.confirmation.terms.error')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeOrderSection,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>{
                            console.log('=== PLACE ORDER BUTTON CLICKED ===');
                            console.log('Terms agreed:', isTermsAgreed);
                            console.log('Is loading:', isLoading);
                            if (!isTermsAgreed) {
                                console.log('Terms not agreed, showing error');
                                setShowTermsError(true);
                                return; // Prevent payment if terms not agreed
                            }
                            console.log('Calling onPlaceOrder...');
                            onPlaceOrder();
                        },
                        disabled: isLoading || !isTermsAgreed,
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeOrderButton} ${!isTermsAgreed ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner
                                }, void 0, false, {
                                    fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                t('checkout.confirmation.button.loading')
                            ]
                        }, void 0, true) : t('checkout.confirmation.button.placeOrder', {
                            amount: orderSummary.total_amount.toFixed(2)
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].redirectNotice,
                        children: t('checkout.confirmation.redirectNotice')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].securityNotice,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "🔒 ",
                        t('checkout.confirmation.securityNotice')
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Checkout/ConfirmationStep.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
};
_s(ConfirmationStep, "A6D1LctLXsvWlILz5D7CUCb0Em4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = ConfirmationStep;
const __TURBOPACK__default__export__ = ConfirmationStep;
var _c;
__turbopack_context__.k.register(_c, "ConfirmationStep");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Checkout/OrderSummary.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "applyButton": "OrderSummary-module__FqNLyG__applyButton",
  "badge": "OrderSummary-module__FqNLyG__badge",
  "badgeIcon": "OrderSummary-module__FqNLyG__badgeIcon",
  "colorCircle": "OrderSummary-module__FqNLyG__colorCircle",
  "colorOption": "OrderSummary-module__FqNLyG__colorOption",
  "discountAmount": "OrderSummary-module__FqNLyG__discountAmount",
  "discountCode": "OrderSummary-module__FqNLyG__discountCode",
  "discountInput": "OrderSummary-module__FqNLyG__discountInput",
  "discountSection": "OrderSummary-module__FqNLyG__discountSection",
  "grandTotal": "OrderSummary-module__FqNLyG__grandTotal",
  "itemDetails": "OrderSummary-module__FqNLyG__itemDetails",
  "itemImage": "OrderSummary-module__FqNLyG__itemImage",
  "itemName": "OrderSummary-module__FqNLyG__itemName",
  "itemOptions": "OrderSummary-module__FqNLyG__itemOptions",
  "itemPrice": "OrderSummary-module__FqNLyG__itemPrice",
  "itemVariant": "OrderSummary-module__FqNLyG__itemVariant",
  "loadingOverlay": "OrderSummary-module__FqNLyG__loadingOverlay",
  "orderItem": "OrderSummary-module__FqNLyG__orderItem",
  "orderItems": "OrderSummary-module__FqNLyG__orderItems",
  "orderSummary": "OrderSummary-module__FqNLyG__orderSummary",
  "orderTotals": "OrderSummary-module__FqNLyG__orderTotals",
  "placeholderImage": "OrderSummary-module__FqNLyG__placeholderImage",
  "quantity": "OrderSummary-module__FqNLyG__quantity",
  "securityBadges": "OrderSummary-module__FqNLyG__securityBadges",
  "spin": "OrderSummary-module__FqNLyG__spin",
  "spinner": "OrderSummary-module__FqNLyG__spinner",
  "totalLine": "OrderSummary-module__FqNLyG__totalLine",
  "visible": "OrderSummary-module__FqNLyG__visible",
});
}}),
"[project]/src/components/Checkout/OrderSummary.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/OrderSummary.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const OrderSummary = ({ orderSummary, isLoading = false })=>{
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderSummary,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                children: t('checkout.summary.title')
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItems,
                children: orderSummary.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItem,
                        children: [
                            "            ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemImage,
                                children: [
                                    item.image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.image,
                                        alt: item.name,
                                        onError: (e)=>{
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.add(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visible);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 28,
                                        columnNumber: 17
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderImage} ${!item.image ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].visible : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "📦"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                            lineNumber: 34,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 33,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].quantity,
                                        children: item.quantity
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 36,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 26,
                                columnNumber: 71
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemDetails,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemName,
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this),
                                    item.variant && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemVariant,
                                        children: item.variant
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this),
                                    "              ",
                                    (item.color || item.size) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemOptions,
                                        children: [
                                            item.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorOption,
                                                children: [
                                                    item.colorCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].colorCircle,
                                                        style: {
                                                            backgroundColor: item.colorCode
                                                        },
                                                        title: item.color
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                                        lineNumber: 47,
                                                        columnNumber: 25
                                                    }, this),
                                                    item.color
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                                lineNumber: 45,
                                                columnNumber: 21
                                            }, this),
                                            item.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    t('checkout.summary.size'),
                                                    ": ",
                                                    item.size
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                                lineNumber: 56,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                        lineNumber: 43,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemPrice,
                                children: [
                                    (item.price * item.quantity).toFixed(2),
                                    " EUR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 60,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 26,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTotals,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.subtotal')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    orderSummary.subtotal.toFixed(2),
                                    " EUR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    orderSummary.shipping_cost > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.shipping')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    orderSummary.shipping_cost.toFixed(2),
                                    " EUR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this),
                    orderSummary.discount_amount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.discount')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].discountAmount,
                                children: [
                                    "-",
                                    orderSummary.discount_amount.toFixed(2),
                                    " EUR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 95,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].totalLine} ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grandTotal}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.total')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    orderSummary.total_amount.toFixed(2),
                                    " EUR"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            "      ",
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].securityBadges,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeIcon,
                                children: "🔒"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.secureCheckout')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeIcon,
                                children: "🚚"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.freeReturns')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badge,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeIcon,
                                children: "📞"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t('checkout.summary.support')
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            "      ",
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingOverlay,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: t('checkout.summary.updating')
                    }, void 0, false, {
                        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Checkout/OrderSummary.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
};
_s(OrderSummary, "82N5KF9nLzZ6+2WH7KIjzIXRkLw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = OrderSummary;
const __TURBOPACK__default__export__ = OrderSummary;
var _c;
__turbopack_context__.k.register(_c, "OrderSummary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/Checkout/CheckoutSteps.module.css [app-client] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "checkmark": "CheckoutSteps-module__49SFbG__checkmark",
  "checkmarkPop": "CheckoutSteps-module__49SFbG__checkmarkPop",
  "checkoutSteps": "CheckoutSteps-module__49SFbG__checkoutSteps",
  "completed": "CheckoutSteps-module__49SFbG__completed",
  "connector": "CheckoutSteps-module__49SFbG__connector",
  "connectorCompleted": "CheckoutSteps-module__49SFbG__connectorCompleted",
  "current": "CheckoutSteps-module__49SFbG__current",
  "disabled": "CheckoutSteps-module__49SFbG__disabled",
  "pulse": "CheckoutSteps-module__49SFbG__pulse",
  "step": "CheckoutSteps-module__49SFbG__step",
  "stepLabel": "CheckoutSteps-module__49SFbG__stepLabel",
  "stepNumber": "CheckoutSteps-module__49SFbG__stepNumber",
  "steps": "CheckoutSteps-module__49SFbG__steps",
  "stepsContainer": "CheckoutSteps-module__49SFbG__stepsContainer",
});
}}),
"[project]/src/components/Checkout/CheckoutSteps.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CheckoutSteps)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/CheckoutSteps.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CheckoutSteps({ steps, currentStep, onStepClick }) {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepsContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].steps,
            children: steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].step} ${step.completed ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].completed : ''} ${step.current ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].current : ''} ${step.accessible === false ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].disabled : ''}`,
                    onClick: ()=>{
                        // Only allow clicking on accessible steps or previous steps
                        if (step.accessible !== false || step.id <= currentStep) {
                            onStepClick(step.id);
                        }
                    },
                    style: {
                        cursor: step.accessible === false && step.id > currentStep ? 'not-allowed' : 'pointer',
                        opacity: step.accessible === false && step.id > currentStep ? 0.5 : 1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepNumber,
                            children: step.completed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkmark,
                                children: "✓"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: step.id
                            }, void 0, false, {
                                fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                                lineNumber: 41,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stepLabel,
                            children: t(step.title)
                        }, void 0, false, {
                            fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this),
                        index < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].connector} ${step.completed ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].connectorCompleted : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                            lineNumber: 46,
                            columnNumber: 15
                        }, this)
                    ]
                }, step.id, true, {
                    fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
                    lineNumber: 21,
                    columnNumber: 11
                }, this))
        }, void 0, false, {
            fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/Checkout/CheckoutSteps.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(CheckoutSteps, "82N5KF9nLzZ6+2WH7KIjzIXRkLw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"]
    ];
});
_c = CheckoutSteps;
var _c;
__turbopack_context__.k.register(_c, "CheckoutSteps");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/checkout/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CheckoutPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/cartSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$checkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/checkout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/address.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/orders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/cartService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/checkout/checkout.module.css [app-client] (css module)");
// Components
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/CustomerInformation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/ShippingStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/PaymentStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/ConfirmationStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/OrderSummary.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Checkout/CheckoutSteps.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
;
;
;
;
;
;
function CheckoutPage() {
    _s();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { items: cartItems, cartId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "CheckoutPage.useSelector": (state)=>state.cart
    }["CheckoutPage.useSelector"]);
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "CheckoutPage.useSelector": (state)=>state.auth
    }["CheckoutPage.useSelector"]);
    // Check if this is a Buy Now flow
    const [isBuyNowFlow, setIsBuyNowFlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [buyNowProduct, setBuyNowProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [buyNowLink, setBuyNowLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isClientMounted, setIsClientMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userAddresses, setUserAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoadingAddresses, setIsLoadingAddresses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [autoSaveInProgress, setAutoSaveInProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedAddressId, setSelectedAddressId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Ensure component is mounted on client before accessing search params
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            setIsClientMounted(true);
        }
    }["CheckoutPage.useEffect"], []); // Initialize Buy Now flow if URL parameters are present
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (!isClientMounted || !searchParams) return;
            const isBuyNow = searchParams.get('buyNow') === 'true';
            if (isBuyNow) {
                setIsBuyNowFlow(true);
                // Extract product information from URL parameters
                const productData = {
                    id: parseInt(searchParams.get('productId') || '0'),
                    name: searchParams.get('productName') || '',
                    slug: searchParams.get('productSlug') || '',
                    price: parseFloat(searchParams.get('price') || '0'),
                    quantity: parseInt(searchParams.get('quantity') || '1'),
                    variantId: searchParams.get('variantId') ? parseInt(searchParams.get('variantId')) : undefined,
                    image: searchParams.get('image') || '',
                    color: searchParams.get('color') || undefined,
                    colorCode: searchParams.get('colorCode') || undefined,
                    size: searchParams.get('size') || undefined
                };
                setBuyNowProduct(productData);
                const extractedBuyNowLink = searchParams.get('buyNowLink');
                console.log('Buy Now Link from URL params:', extractedBuyNowLink);
                setBuyNowLink(extractedBuyNowLink);
            } else {
                // Not a Buy Now flow, check if cart is empty and redirect if needed
                if (cartItems.length === 0) {
                    router.push('/cart');
                }
            }
        }
    }["CheckoutPage.useEffect"], [
        isClientMounted,
        searchParams,
        cartItems,
        router
    ]);
    // Checkout state
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [steps, setSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$checkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CHECKOUT_STEPS"]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Form data
    const [checkoutData, setCheckoutData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        customer_info: {
            first_name: '',
            last_name: '',
            email: '',
            phone: ''
        },
        shipping_address: {
            street_address: '',
            apartment: '',
            city: '',
            state: '',
            postal_code: '',
            country: 'BY'
        },
        save_address: false,
        shipping_method: null,
        payment_method: null,
        customer_notes: ''
    });
    // Single standard shipping method with fixed $10 cost
    const [shippingMethods, setShippingMethods] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            id: 1,
            name: t('checkout.shipping.standardShipping'),
            description: t('checkout.shipping.standardDescription'),
            cost: 10.00,
            estimated_delivery_min_days: 5,
            estimated_delivery_max_days: 14,
            is_active: true
        }
    ]);
    // Initialize form with user data once user is available
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (isAuthenticated && user && isClientMounted) {
                setCheckoutData({
                    "CheckoutPage.useEffect": (prev)=>({
                            ...prev,
                            customer_info: {
                                ...prev.customer_info,
                                first_name: user.first_name || '',
                                last_name: user.last_name || '',
                                email: user.email || '',
                                phone: user.phone_number || ''
                            }
                        })
                }["CheckoutPage.useEffect"]);
            }
        }
    }["CheckoutPage.useEffect"], [
        isAuthenticated,
        user,
        isClientMounted
    ]);
    // Auto-select single shipping method and payment method
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (isClientMounted) {
                setCheckoutData({
                    "CheckoutPage.useEffect": (prev)=>{
                        const updates = {};
                        // Auto-select shipping method (only one available)
                        if (!prev.shipping_method && shippingMethods.length === 1) {
                            updates.shipping_method = shippingMethods[0];
                        }
                        // Auto-select payment method (only one available)
                        if (!prev.payment_method && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$checkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_METHODS"].length === 1) {
                            updates.payment_method = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$checkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_METHODS"][0];
                        }
                        // Only update if there are changes
                        if (Object.keys(updates).length > 0) {
                            return {
                                ...prev,
                                ...updates
                            };
                        }
                        return prev;
                    }
                }["CheckoutPage.useEffect"]);
            }
        }
    }["CheckoutPage.useEffect"], [
        isClientMounted,
        shippingMethods
    ]);
    // Load user addresses on component mount
    const loadUserAddresses = async ()=>{
        if (!isAuthenticated || !user) return;
        setIsLoadingAddresses(true);
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                const addressesResponse = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getUserAddresses"])(token);
                // Ensure addresses is an array
                const addresses = Array.isArray(addressesResponse) ? addressesResponse : [];
                setUserAddresses(addresses);
            // Note: Removed auto-population of form with default shipping address
            // Users must explicitly select an address to use it
            // Optional: You can still auto-populate customer info (name, phone) if needed
            // but not the shipping address fields
            // const defaultShippingAddress = addresses.find(addr => 
            //   addr.address_type === 'shipping' && addr.is_default_shipping
            // );
            // if (defaultShippingAddress && !checkoutData.customer_info.first_name) {
            //   setCheckoutData(prev => ({
            //     ...prev,
            //     customer_info: {
            //       ...prev.customer_info,
            //       first_name: prev.customer_info.first_name || defaultShippingAddress.recipient_name.split(' ')[0] || '',
            //       last_name: prev.customer_info.last_name || defaultShippingAddress.recipient_name.split(' ').slice(1).join(' ') || '',
            //       phone: prev.customer_info.phone || defaultShippingAddress.phone_number || '',
            //     },
            //   }));
            // }
            }
        } catch (error) {
            console.error('Failed to load user addresses:', error);
            // Set empty array on error to prevent crashes
            setUserAddresses([]);
        } finally{
            setIsLoadingAddresses(false);
        }
    };
    // Load addresses when user is authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (isAuthenticated && user && isClientMounted) {
                loadUserAddresses();
            }
        }
    }["CheckoutPage.useEffect"], [
        isAuthenticated,
        user,
        isClientMounted
    ]);
    // Calculate order summary
    const calculateOrderSummary = ()=>{
        // Use Buy Now product if in Buy Now flow, otherwise use cart items
        const items = isBuyNowFlow && buyNowProduct ? [
            buyNowProduct
        ] : cartItems;
        const subtotal = items.reduce((sum, item)=>sum + item.price * item.quantity, 0);
        const shipping_cost = checkoutData.shipping_method?.cost || 0;
        const discount_amount = 0; // Add discount logic later
        const total_amount = subtotal + shipping_cost - discount_amount;
        return {
            subtotal,
            shipping_cost,
            tax_amount: 0,
            discount_amount,
            total_amount,
            items: items.map((item, index)=>({
                    id: index + 1,
                    product_id: item.id,
                    variant_id: item.variantId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    color: item.color,
                    colorCode: item.colorCode,
                    size: item.size,
                    variant: item.variantId ? `${item.color || ''} ${item.size || ''}`.trim() : undefined
                }))
        };
    };
    const orderSummary = calculateOrderSummary();
    // Function to validate a specific step
    const validateStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CheckoutPage.useCallback[validateStep]": (stepNumber)=>{
            const tempErrors = {};
            switch(stepNumber){
                case 1:
                    if (!checkoutData.customer_info.first_name) {
                        tempErrors.first_name = t('checkout.validation.firstNameRequired');
                    }
                    if (!checkoutData.customer_info.last_name) {
                        tempErrors.last_name = t('checkout.validation.lastNameRequired');
                    }
                    if (!checkoutData.customer_info.email) {
                        tempErrors.email = t('checkout.validation.emailRequired');
                    }
                    if (!checkoutData.shipping_address.street_address) {
                        tempErrors.street_address = t('checkout.validation.addressRequired');
                    }
                    if (!checkoutData.shipping_address.city) {
                        tempErrors.city = t('checkout.validation.cityRequired');
                    }
                    if (!checkoutData.shipping_address.postal_code) {
                        tempErrors.postal_code = t('checkout.validation.postalCodeRequired');
                    }
                    break;
                case 2:
                    if (!checkoutData.shipping_method) {
                        tempErrors.shipping_method = t('checkout.validation.shippingMethodRequired');
                    }
                    break;
                case 3:
                    if (!checkoutData.payment_method) {
                        tempErrors.payment_method = t('checkout.validation.paymentMethodRequired');
                    }
                    break;
            }
            return Object.keys(tempErrors).length === 0;
        }
    }["CheckoutPage.useCallback[validateStep]"], [
        checkoutData
    ]); // Function to check if all previous steps are completed
    const areAllPreviousStepsValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CheckoutPage.useCallback[areAllPreviousStepsValid]": (targetStep)=>{
            for(let i = 1; i < targetStep; i++){
                if (!validateStep(i)) {
                    return false;
                }
            }
            return true;
        }
    }["CheckoutPage.useCallback[areAllPreviousStepsValid]"], [
        validateStep
    ]); // Function to update step states
    const updateSteps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CheckoutPage.useCallback[updateSteps]": (currentStepNumber)=>{
            setSteps({
                "CheckoutPage.useCallback[updateSteps]": (prevSteps)=>{
                    return prevSteps.map({
                        "CheckoutPage.useCallback[updateSteps]": (step, index)=>{
                            const stepNumber = index + 1;
                            const isCompleted = stepNumber < currentStepNumber;
                            const isCurrent = stepNumber === currentStepNumber;
                            // Determine accessibility - step 1 is always accessible
                            // Other steps are accessible only if all previous steps are valid
                            let isAccessible = stepNumber === 1;
                            if (stepNumber > 1) {
                                isAccessible = areAllPreviousStepsValid(stepNumber);
                            }
                            return {
                                ...step,
                                completed: isCompleted,
                                current: isCurrent,
                                accessible: isAccessible
                            };
                        }
                    }["CheckoutPage.useCallback[updateSteps]"]);
                }
            }["CheckoutPage.useCallback[updateSteps]"]);
        }
    }["CheckoutPage.useCallback[updateSteps]"], [
        areAllPreviousStepsValid
    ]); // Step navigation
    const goToStep = (stepNumber)=>{
        // Find the step to check if it's accessible
        const targetStep = steps.find((step)=>step.id === stepNumber);
        // Only allow navigation if:
        // 1. Going back to a previous step, OR
        // 2. Going to an accessible step
        if (stepNumber <= currentStep || targetStep && targetStep.accessible) {
            setCurrentStep(stepNumber);
        // updateSteps will be called by the useEffect when currentStep changes
        }
    };
    // Update step accessibility when form data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (isClientMounted) {
                updateSteps(currentStep);
            }
        }
    }["CheckoutPage.useEffect"], [
        checkoutData.customer_info,
        checkoutData.shipping_address,
        checkoutData.shipping_method,
        checkoutData.payment_method,
        currentStep,
        isClientMounted,
        updateSteps
    ]);
    const nextStep = ()=>{
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        // updateSteps will be called by the useEffect when currentStep changes
        }
    };
    const previousStep = ()=>{
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        // updateSteps will be called by the useEffect when currentStep changes
        }
    }; // Form handlers
    const updateCheckoutData = (data)=>{
        setCheckoutData((prev)=>({
                ...prev,
                ...data
            }));
    };
    const validateCurrentStep = ()=>{
        const isValid = validateStep(currentStep);
        // If validation fails, update errors state
        if (!isValid) {
            const newErrors = {};
            switch(currentStep){
                case 1:
                    if (!checkoutData.customer_info.first_name) {
                        newErrors.first_name = t('checkout.validation.firstNameRequired');
                    }
                    if (!checkoutData.customer_info.last_name) {
                        newErrors.last_name = t('checkout.validation.lastNameRequired');
                    }
                    if (!checkoutData.customer_info.email) {
                        newErrors.email = t('checkout.validation.emailRequired');
                    }
                    if (!checkoutData.shipping_address.street_address) {
                        newErrors.street_address = t('checkout.validation.addressRequired');
                    }
                    if (!checkoutData.shipping_address.city) {
                        newErrors.city = t('checkout.validation.cityRequired');
                    }
                    if (!checkoutData.shipping_address.postal_code) {
                        newErrors.postal_code = t('checkout.validation.postalCodeRequired');
                    }
                    break;
                case 2:
                    if (!checkoutData.shipping_method) {
                        newErrors.shipping_method = t('checkout.validation.shippingMethodRequired');
                    }
                    break;
                case 3:
                    if (!checkoutData.payment_method) {
                        newErrors.payment_method = t('checkout.validation.paymentMethodRequired');
                    }
                    break;
            }
            setErrors(newErrors);
        }
        return isValid;
    };
    // Auto-save address when proceeding from step 1 to step 2
    const autoSaveAddress = async ()=>{
        if (!isAuthenticated || !user || autoSaveInProgress) return;
        // Check if address information is filled
        const addressFilled = checkoutData.shipping_address.street_address && checkoutData.shipping_address.city && checkoutData.shipping_address.postal_code && checkoutData.customer_info.first_name && checkoutData.customer_info.last_name;
        if (!addressFilled) return;
        setAutoSaveInProgress(true);
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                // Ensure userAddresses is an array before using find
                const addressesArray = Array.isArray(userAddresses) ? userAddresses : [];
                // Check if we already have this address
                const existingAddress = addressesArray.find((addr)=>addr.street_address === checkoutData.shipping_address.street_address && addr.city === checkoutData.shipping_address.city && addr.postal_code === checkoutData.shipping_address.postal_code);
                if (!existingAddress) {
                    const addressData = {
                        address_type: 'shipping',
                        recipient_name: `${checkoutData.customer_info.first_name} ${checkoutData.customer_info.last_name}`.trim(),
                        street_address: checkoutData.shipping_address.street_address,
                        address_line_2: checkoutData.shipping_address.apartment || undefined,
                        city: checkoutData.shipping_address.city,
                        state_province: checkoutData.shipping_address.state || '',
                        postal_code: checkoutData.shipping_address.postal_code,
                        country_code: checkoutData.shipping_address.country,
                        phone_number: checkoutData.customer_info.phone || undefined,
                        is_default_shipping: addressesArray.length === 0,
                        is_default_billing: addressesArray.length === 0
                    };
                    const savedAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAddress"])(addressData, token);
                    // Update local addresses list
                    setUserAddresses((prev)=>{
                        const prevArray = Array.isArray(prev) ? prev : [];
                        return [
                            ...prevArray,
                            savedAddress
                        ];
                    });
                }
            }
        } catch (error) {
            console.error('Failed to auto-save address:', error);
        // Don't show error to user for auto-save failures
        } finally{
            setAutoSaveInProgress(false);
        }
    }; // Load a specific saved address into the form
    const loadSavedAddress = (address)=>{
        setSelectedAddressId(address.id);
        setCheckoutData((prev)=>({
                ...prev,
                // Do NOT auto-fill customer info from address data
                // Customer info should only be filled from user profile data
                shipping_address: {
                    street_address: address.street_address,
                    apartment: address.address_line_2 || '',
                    city: address.city,
                    state: address.state_province,
                    postal_code: address.postal_code,
                    country: address.country_code
                }
            }));
    };
    // Delete a saved address
    const handleDeleteAddress = async (addressId)=>{
        if (!confirm(t('checkout.confirmations.deleteAddress'))) return;
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteAddress"])(addressId, token);
                // Update local addresses list
                setUserAddresses((prev)=>prev.filter((addr)=>addr.id !== addressId));
                // If the deleted address was selected, clear selection
                if (selectedAddressId === addressId) {
                    setSelectedAddressId(null);
                // Optionally clear the form or load another address
                }
            }
        } catch (error) {
            console.error('Failed to delete address:', error);
        // You could show a toast notification here
        }
    };
    const handleContinue = ()=>{
        console.log('=== HANDLE CONTINUE CLICKED ===');
        console.log('Current step:', currentStep);
        console.log('Validation result:', validateCurrentStep());
        if (validateCurrentStep()) {
            // Auto-save address when moving from step 1 to step 2
            if (currentStep === 1) {
                console.log('Step 1: Auto-saving address and moving to next step');
                autoSaveAddress().then(()=>{
                    nextStep();
                });
            } else if (currentStep === 4) {
                console.log('Step 4: Starting order submission');
                // Final submission
                handleOrderSubmission();
            } else {
                console.log(`Step ${currentStep}: Moving to next step`);
                nextStep();
            }
        } else {
            console.log('Validation failed, errors:', errors);
        }
    };
    const handleOrderSubmission = async ()=>{
        setIsLoading(true);
        console.log('=== ORDER SUBMISSION STARTED ===');
        console.log('Current step:', currentStep);
        console.log('Cart ID:', cartId);
        console.log('Selected Address ID:', selectedAddressId);
        console.log('Is authenticated:', isAuthenticated);
        console.log('User:', user);
        console.log('Checkout data:', checkoutData);
        console.log('Is buy now flow:', isBuyNowFlow);
        try {
            let savedAddressId = selectedAddressId;
            let createdOrder = null; // Save address if needed and user is authenticated
            if (isAuthenticated && !selectedAddressId) {
                console.log('Creating address for order (save_address=', checkoutData.save_address, ')');
                try {
                    const token = localStorage.getItem('access_token');
                    if (token) {
                        // Prepare shipping address data
                        const shippingAddressData = {
                            address_type: 'shipping',
                            recipient_name: `${checkoutData.customer_info.first_name} ${checkoutData.customer_info.last_name}`.trim(),
                            street_address: checkoutData.shipping_address.street_address,
                            address_line_2: checkoutData.shipping_address.apartment || undefined,
                            city: checkoutData.shipping_address.city,
                            state_province: checkoutData.shipping_address.state || '',
                            postal_code: checkoutData.shipping_address.postal_code,
                            country_code: checkoutData.shipping_address.country,
                            phone_number: checkoutData.customer_info.phone || undefined,
                            is_default_shipping: checkoutData.save_address,
                            is_default_billing: checkoutData.save_address
                        };
                        console.log('Address data to save:', shippingAddressData);
                        // Save address (required for order creation)
                        const savedAddress = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$address$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveAddress"])(shippingAddressData, token);
                        savedAddressId = savedAddress.id;
                        console.log('Address saved successfully:', savedAddress);
                    } else {
                        throw new Error('Authentication token not found');
                    }
                } catch (addressError) {
                    console.error('Failed to save address:', addressError);
                    throw new Error('Failed to save shipping address: ' + (addressError instanceof Error ? addressError.message : 'Unknown error'));
                }
            } else if (selectedAddressId) {
                console.log('Using existing selected address:', selectedAddressId);
                savedAddressId = selectedAddressId;
            } // For Buy Now flow, use direct order creation
            if (isBuyNowFlow && buyNowProduct) {
                console.log('=== BUY NOW FLOW - CREATING DIRECT ORDER ===');
                console.log('Buy now product:', buyNowProduct);
                if (!savedAddressId) {
                    console.log('=== ERROR: NO ADDRESS ID ===');
                    throw new Error('Shipping address is required. Please ensure address is saved or selected.');
                }
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.log('=== ERROR: NO AUTH TOKEN ===');
                    throw new Error('Authentication required');
                } // Create direct order data
                const createDirectOrderData = {
                    product_id: buyNowProduct.id,
                    quantity: buyNowProduct.quantity || 1,
                    shipping_address_id: savedAddressId,
                    billing_address_id: savedAddressId,
                    shipping_method_id: checkoutData.shipping_method?.id || 1,
                    customer_notes: checkoutData.customer_notes || ''
                };
                // Add optional fields only if they exist
                if (buyNowProduct.variantId) {
                    createDirectOrderData.product_variant_id = buyNowProduct.variantId;
                }
                if (buyNowProduct.color) {
                    createDirectOrderData.color = buyNowProduct.color;
                }
                if (buyNowProduct.colorCode) {
                    createDirectOrderData.color_code = buyNowProduct.colorCode;
                }
                if (buyNowProduct.size) {
                    createDirectOrderData.size = buyNowProduct.size;
                }
                console.log('=== SENDING DIRECT ORDER CREATION REQUEST ===');
                console.log('Direct order data:', createDirectOrderData);
                // Create the order directly
                createdOrder = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDirectOrder"])(createDirectOrderData, token);
                console.log('=== DIRECT ORDER CREATED SUCCESSFULLY ===');
                console.log('Created order:', createdOrder);
            } else {
                console.log('=== REGULAR CHECKOUT FLOW - PROCEEDING WITH ORDER CREATION ===');
                // For regular checkout, ensure we have a cart with items
                let orderCartId = cartId;
                // If no cart ID exists (single item purchase), create a temporary cart
                if (!orderCartId) {
                    console.log('=== NO CART ID - CREATING TEMPORARY CART FOR SINGLE ITEM ===');
                    // Determine the items to add to cart
                    const itemsToAdd = isBuyNowFlow && buyNowProduct ? [
                        buyNowProduct
                    ] : cartItems;
                    if (itemsToAdd.length === 0) {
                        throw new Error('No items to order. Please add items to cart first.');
                    }
                    console.log('Items to add to cart:', itemsToAdd);
                    // Create a new cart
                    const newCart = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCart"])();
                    if (!newCart) {
                        throw new Error('Failed to create cart for order');
                    }
                    orderCartId = newCart.cart_id;
                    console.log('✓ Temporary cart created:', orderCartId);
                    // Add items to the cart
                    for (const item of itemsToAdd){
                        const addToCartData = {
                            drop_product: item.dropProductId,
                            product_variant: item.variantId,
                            quantity: item.quantity,
                            color: item.color,
                            color_code: item.colorCode,
                            size: item.size
                        };
                        console.log('Adding item to cart:', addToCartData);
                        const addedItem = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$cartService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addToCartAPI"])(orderCartId, addToCartData);
                        if (!addedItem) {
                            throw new Error(`Failed to add ${item.name} to cart`);
                        }
                    }
                    console.log('✓ All items added to temporary cart');
                }
                if (!orderCartId) {
                    console.log('=== ERROR: NO CART ID AVAILABLE ===');
                    throw new Error('Cart ID not available. Please refresh and try again.');
                }
                console.log('✓ Cart ID available:', orderCartId);
                if (!savedAddressId) {
                    console.log('=== ERROR: NO ADDRESS ID ===');
                    throw new Error('Shipping address is required. Please ensure address is saved or selected.');
                }
                console.log('✓ Address ID available:', savedAddressId);
                const token = localStorage.getItem('access_token');
                if (!token) {
                    console.log('=== ERROR: NO AUTH TOKEN ===');
                    throw new Error('Authentication required');
                }
                console.log('✓ Auth token available');
                console.log('=== CREATING ORDER ===');
                // Create order data
                const createOrderData = {
                    cart_id: orderCartId,
                    shipping_address_id: savedAddressId,
                    billing_address_id: savedAddressId,
                    shipping_method_id: checkoutData.shipping_method?.id || 1,
                    customer_notes: checkoutData.customer_notes || ''
                };
                console.log('=== SENDING ORDER CREATION REQUEST ===');
                console.log('Order data:', createOrderData);
                // Create the order with pending status
                createdOrder = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOrder"])(createOrderData, token);
                console.log('=== ORDER CREATED SUCCESSFULLY ===');
                console.log('Created order:', createdOrder);
                // Clear the cart after successful order creation
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$cartSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearCart"])());
            }
            console.log('=== REDIRECTING TO PAYMENT ===');
            console.log('isBuyNowFlow:', isBuyNowFlow);
            console.log('buyNowProduct:', buyNowProduct);
            console.log('buyNowLink:', buyNowLink);
            console.log('buyNowLink type:', typeof buyNowLink);
            console.log('buyNowLink length:', buyNowLink ? buyNowLink.length : 'null/undefined');
            // Determine the payment URL to use
            let paymentUrl = '';
            if (isBuyNowFlow && buyNowProduct) {
                // For Buy Now flow, first try to get buy_now_link from the product
                // The buyNowLink from URL params might be outdated, so we should fetch fresh product data
                // But for now, use the buyNowLink from URL if available, otherwise fall back to generic
                if (buyNowLink) {
                    console.log('Using product buy now link from URL params:', buyNowLink);
                    paymentUrl = buyNowLink;
                } else {
                    // If no buy_now_link, use generic payment gateway
                    console.log('No buy_now_link found, using generic payment gateway');
                    paymentUrl = `https://payment.gateway.com/pay?amount=${orderSummary.total_amount.toFixed(2)}&currency=EUR&orderid=${createdOrder.id}&returnUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=success&orderid=' + createdOrder.id)}&cancelUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=cancelled&orderid=' + createdOrder.id)}`;
                }
            } else {
                // Regular checkout flow - use generic payment gateway
                console.log('Regular checkout flow, using generic payment gateway');
                paymentUrl = `https://payment.gateway.com/pay?amount=${orderSummary.total_amount.toFixed(2)}&currency=EUR&orderid=${createdOrder.id}&returnUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=success&orderid=' + createdOrder.id)}&cancelUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=cancelled&orderid=' + createdOrder.id)}`;
            }
            console.log('Final payment URL:', paymentUrl);
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('=== ORDER SUBMISSION FAILED ===');
            console.error('Error:', error);
            console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
            setErrors({
                submit: t('checkout.error.orderSubmissionFailed') + ': ' + (error instanceof Error ? error.message : 'Unknown error')
            });
        } finally{
            setIsLoading(false);
        }
    };
    // Don't render anything until client is mounted to prevent hydration mismatch
    if (!isClientMounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutPage,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                        children: t('checkout.loading')
                    }, void 0, false, {
                        fileName: "[project]/src/app/checkout/page.tsx",
                        lineNumber: 733,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 732,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/checkout/page.tsx",
                lineNumber: 731,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 730,
            columnNumber: 7
        }, this);
    }
    // Don't render if cart is empty and not in Buy Now flow
    if (!isBuyNowFlow && cartItems.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCart,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: t('checkout.emptyCart.title')
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: t('checkout.emptyCart.message')
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 744,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 742,
            columnNumber: 19
        }, this);
    }
    // Don't render if in Buy Now flow but no product data
    if (isBuyNowFlow && !buyNowProduct) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyCart,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: t('checkout.error.title')
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 752,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: t('checkout.error.productLoadFailed')
                }, void 0, false, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 753,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 751,
            columnNumber: 19
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkoutPage,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: t('checkout.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 761,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CheckoutSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            steps: steps,
                            currentStep: currentStep,
                            onStepClick: goToStep
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 762,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 760,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mainContent,
                            children: [
                                "            ",
                                currentStep === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$CustomerInformation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    checkoutData: checkoutData,
                                    updateCheckoutData: updateCheckoutData,
                                    errors: errors,
                                    isAuthenticated: isAuthenticated,
                                    userAddresses: userAddresses,
                                    isLoadingAddresses: isLoadingAddresses,
                                    autoSaveInProgress: autoSaveInProgress,
                                    onLoadSavedAddress: loadSavedAddress,
                                    onDeleteAddress: handleDeleteAddress,
                                    selectedAddressId: selectedAddressId
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 767,
                                    columnNumber: 15
                                }, this),
                                currentStep === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ShippingStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    checkoutData: checkoutData,
                                    updateCheckoutData: updateCheckoutData,
                                    shippingMethods: shippingMethods,
                                    errors: errors
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this),
                                currentStep === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$PaymentStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    checkoutData: checkoutData,
                                    updateCheckoutData: updateCheckoutData,
                                    paymentMethods: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$checkout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAYMENT_METHODS"],
                                    errors: errors,
                                    orderSummary: orderSummary
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 791,
                                    columnNumber: 15
                                }, this),
                                "            ",
                                currentStep === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$ConfirmationStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    checkoutData: checkoutData,
                                    orderSummary: orderSummary,
                                    onPlaceOrder: handleOrderSubmission,
                                    isLoading: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 799,
                                    columnNumber: 15
                                }, this),
                                "            ",
                                currentStep < 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
                                    children: [
                                        currentStep > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: previousStep,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                                            disabled: isLoading,
                                            children: t('checkout.navigation.back')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 809,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleContinue,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].continueButton,
                                            disabled: isLoading,
                                            children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].spinner
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/checkout/page.tsx",
                                                        lineNumber: 827,
                                                        columnNumber: 23
                                                    }, this),
                                                    t('checkout.navigation.processing')
                                                ]
                                            }, void 0, true) : t('checkout.navigation.continue')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/checkout/page.tsx",
                                            lineNumber: 819,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 807,
                                    columnNumber: 15
                                }, this),
                                currentStep === 4 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navigation,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: previousStep,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                                        disabled: isLoading,
                                        children: t('checkout.navigation.back')
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/checkout/page.tsx",
                                        lineNumber: 840,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 839,
                                    columnNumber: 15
                                }, this),
                                errors.submit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorMessage,
                                    children: errors.submit
                                }, void 0, false, {
                                    fileName: "[project]/src/app/checkout/page.tsx",
                                    lineNumber: 852,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 766,
                            columnNumber: 11
                        }, this),
                        "          ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$checkout$2f$checkout$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sidebar,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Checkout$2f$OrderSummary$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                orderSummary: orderSummary,
                                isLoading: isLoading
                            }, void 0, false, {
                                fileName: "[project]/src/app/checkout/page.tsx",
                                lineNumber: 858,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/checkout/page.tsx",
                            lineNumber: 857,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/checkout/page.tsx",
                    lineNumber: 765,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/checkout/page.tsx",
            lineNumber: 759,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/checkout/page.tsx",
        lineNumber: 758,
        columnNumber: 5
    }, this);
}
_s(CheckoutPage, "LOOgK1d4NAABggCUNXtwYpJE/Q0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useI18n"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_69be0dba._.js.map