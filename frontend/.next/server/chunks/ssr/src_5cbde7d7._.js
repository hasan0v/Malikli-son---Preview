module.exports = {

"[project]/src/lib/api/orders.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
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
}}),
"[project]/src/app/orders/orders.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "cancelButton": "orders-module__HlIdNG__cancelButton",
  "container": "orders-module__HlIdNG__container",
  "controls": "orders-module__HlIdNG__controls",
  "deliveryDetails": "orders-module__HlIdNG__deliveryDetails",
  "deliveryInfo": "orders-module__HlIdNG__deliveryInfo",
  "emptyIcon": "orders-module__HlIdNG__emptyIcon",
  "emptyState": "orders-module__HlIdNG__emptyState",
  "errorIcon": "orders-module__HlIdNG__errorIcon",
  "errorState": "orders-module__HlIdNG__errorState",
  "estimatedDelivery": "orders-module__HlIdNG__estimatedDelivery",
  "filterGroup": "orders-module__HlIdNG__filterGroup",
  "filters": "orders-module__HlIdNG__filters",
  "header": "orders-module__HlIdNG__header",
  "itemDetails": "orders-module__HlIdNG__itemDetails",
  "itemImage": "orders-module__HlIdNG__itemImage",
  "itemName": "orders-module__HlIdNG__itemName",
  "itemPrice": "orders-module__HlIdNG__itemPrice",
  "itemVariant": "orders-module__HlIdNG__itemVariant",
  "loadingState": "orders-module__HlIdNG__loadingState",
  "orderActions": "orders-module__HlIdNG__orderActions",
  "orderCard": "orders-module__HlIdNG__orderCard",
  "orderCount": "orders-module__HlIdNG__orderCount",
  "orderDate": "orders-module__HlIdNG__orderDate",
  "orderHeader": "orders-module__HlIdNG__orderHeader",
  "orderInfo": "orders-module__HlIdNG__orderInfo",
  "orderItem": "orders-module__HlIdNG__orderItem",
  "orderItems": "orders-module__HlIdNG__orderItems",
  "orderMeta": "orders-module__HlIdNG__orderMeta",
  "orderNumber": "orders-module__HlIdNG__orderNumber",
  "orderStatuses": "orders-module__HlIdNG__orderStatuses",
  "orderTotal": "orders-module__HlIdNG__orderTotal",
  "ordersList": "orders-module__HlIdNG__ordersList",
  "ordersPage": "orders-module__HlIdNG__ordersPage",
  "paymentStatus": "orders-module__HlIdNG__paymentStatus",
  "price": "orders-module__HlIdNG__price",
  "quantity": "orders-module__HlIdNG__quantity",
  "reorderButton": "orders-module__HlIdNG__reorderButton",
  "retryButton": "orders-module__HlIdNG__retryButton",
  "retryPaymentButton": "orders-module__HlIdNG__retryPaymentButton",
  "select": "orders-module__HlIdNG__select",
  "shopButton": "orders-module__HlIdNG__shopButton",
  "spin": "orders-module__HlIdNG__spin",
  "spinner": "orders-module__HlIdNG__spinner",
  "status": "orders-module__HlIdNG__status",
  "subtitle": "orders-module__HlIdNG__subtitle",
  "title": "orders-module__HlIdNG__title",
  "trackButton": "orders-module__HlIdNG__trackButton",
  "trackingInfo": "orders-module__HlIdNG__trackingInfo",
  "trackingNumber": "orders-module__HlIdNG__trackingNumber",
  "viewDetailsButton": "orders-module__HlIdNG__viewDetailsButton",
});
}}),
"[project]/src/app/orders/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OrdersPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useI18n.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/orders.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/orders/orders.module.css [app-ssr] (css module)");
'use client';
;
;
;
;
;
;
;
function OrdersPage() {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useI18n$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useI18n"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { isAuthenticated, user, isInitialized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSelector"])((state)=>state.auth);
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [ordersResponse, setOrdersResponse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedStatus, setSelectedStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('all');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('date');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('desc');
    // Redirect if not authenticated after initialization is complete
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isInitialized && !isAuthenticated) {
            router.push('/auth/login?redirect=/orders');
            return;
        }
    }, [
        isInitialized,
        isAuthenticated,
        router
    ]);
    // Load orders
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadOrders = async ()=>{
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    setError('No access token found');
                    return;
                }
                // Map sort options to API format
                let ordering = '';
                switch(sortBy){
                    case 'date':
                        ordering = sortOrder === 'desc' ? '-created_at' : 'created_at';
                        break;
                    case 'amount':
                        ordering = sortOrder === 'desc' ? '-total_amount' : 'total_amount';
                        break;
                    case 'status':
                        ordering = sortOrder === 'desc' ? '-status' : 'status';
                        break;
                }
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserOrders"])(token, {
                    status: selectedStatus,
                    ordering: ordering,
                    page_size: 50 // Get up to 50 orders
                });
                console.log('Orders response:', response); // Debug log
                setOrdersResponse(response);
                setOrders(response.results || []);
            } catch (error) {
                console.error('Failed to load orders:', error);
                setError(error instanceof Error ? error.message : 'Failed to load orders');
            } finally{
                setIsLoading(false);
            }
        };
        if (isInitialized && isAuthenticated && user) {
            loadOrders();
        }
    }, [
        isInitialized,
        isAuthenticated,
        user,
        selectedStatus,
        sortBy,
        sortOrder
    ]);
    // Handle payment result notifications
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const paymentStatus = searchParams?.get('payment');
        if (paymentStatus) {
            // Show notification based on payment status
            if (paymentStatus === 'success') {
                // You could show a success toast/notification here
                console.log('Payment successful!');
            } else if (paymentStatus === 'cancelled') {
                // You could show a cancelled notification here
                console.log('Payment cancelled');
            }
            // Clean up the URL by removing the payment parameter
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('payment');
            window.history.replaceState({}, document.title, newUrl.pathname + newUrl.search);
        }
    }, [
        searchParams
    ]);
    // Since we're now doing sorting and filtering on the server side,
    // we can use the orders directly without client-side filtering
    const filteredAndSortedOrders = Array.isArray(orders) ? orders : [];
    // Handle order cancellation
    const handleCancelOrder = async (orderId)=>{
        if (!confirm(t('orders.actions.confirmCancel'))) return;
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('No access token found');
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cancelOrder"])(orderId, token);
            // Refresh orders list
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserOrders"])(token, {
                status: selectedStatus,
                ordering: `${sortOrder === 'desc' ? '-' : ''}${sortBy === 'date' ? 'created_at' : sortBy === 'amount' ? 'total_amount' : 'status'}`,
                page_size: 50
            });
            setOrdersResponse(response);
            setOrders(response.results);
        } catch (error) {
            console.error('Failed to cancel order:', error);
            setError(error instanceof Error ? error.message : 'Failed to cancel order');
        }
    };
    // Handle reorder
    const handleReorder = async (orderId)=>{
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setError('No access token found');
                return;
            }
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$orders$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["reorderItems"])(orderId, token);
            alert(result.message || 'Items added to cart!');
        } catch (error) {
            console.error('Failed to reorder:', error);
            alert(error instanceof Error ? error.message : 'Failed to reorder items');
        }
    };
    // Handle retry payment
    const handleRetryPayment = (order)=>{
        if (!order) return;
        // Calculate total amount
        const totalAmount = parseFloat(order.total_amount || '0');
        // Redirect to payment gateway with the order ID
        const paymentUrl = `https://payment.gateway.com/pay?amount=${totalAmount.toFixed(2)}&currency=USD&orderid=${order.id}&returnUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=success&orderid=' + order.id)}&cancelUrl=${encodeURIComponent(window.location.origin + '/payment-result?status=cancelled&orderid=' + order.id)}`;
        window.location.href = paymentUrl;
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'pending':
                return '#F39C12';
            case 'confirmed':
                return '#3498DB';
            case 'processing':
                return '#0ABAB5';
            case 'shipped':
                return '#81D8D4';
            case 'delivered':
                return '#27AE60';
            case 'cancelled':
                return '#E74C3C';
            default:
                return '#95A5A6';
        }
    };
    const getPaymentStatusColor = (status)=>{
        switch(status){
            case 'paid':
                return '#27AE60';
            case 'pending':
                return '#F39C12';
            case 'failed':
                return '#E74C3C';
            case 'refunded':
                return '#3498DB';
            default:
                return '#95A5A6';
        }
    };
    const formatDate = (dateString)=>{
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return dateString; // Return original string if parsing fails
        }
    };
    // Show loading while auth initializes or while fetching orders
    if (!isInitialized || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ordersPage,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loadingState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].spinner
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: !isInitialized ? t('general.initializing') || 'Initializing...' : t('orders.loading')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/orders/page.tsx",
                    lineNumber: 191,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/orders/page.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/orders/page.tsx",
            lineNumber: 189,
            columnNumber: 7
        }, this);
    }
    if (!isAuthenticated) {
        return null; // Will redirect
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ordersPage,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorIcon,
                            children: "⚠️"
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 208,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: t('orders.error.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 209,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>window.location.reload(),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retryButton,
                            children: t('orders.error.retry')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 211,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/orders/page.tsx",
                    lineNumber: 207,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/orders/page.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/orders/page.tsx",
            lineNumber: 205,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ordersPage,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                            children: t('orders.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                            children: t('orders.subtitle')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        "        "
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/orders/page.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, this),
                filteredAndSortedOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyIcon,
                            children: "📦"
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 279,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            children: t('orders.empty.title')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: t('orders.empty.message')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 281,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.push('/'),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].shopButton,
                            children: t('orders.empty.startShopping')
                        }, void 0, false, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 282,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/orders/page.tsx",
                    lineNumber: 278,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].ordersList,
                    children: filteredAndSortedOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderCard,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderHeader,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderInfo,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderNumber,
                                                    children: order.order_number
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 296,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderMeta,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderDate,
                                                            children: [
                                                                t('orders.orderDate'),
                                                                ": ",
                                                                formatDate(order.created_at)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 23
                                                        }, this),
                                                        "                      ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderTotal,
                                                            children: [
                                                                t('orders.total'),
                                                                ": $",
                                                                order.total_amount ? parseFloat(order.total_amount).toFixed(2) : '0.00'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 52
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 297,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 295,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderStatuses,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].status,
                                                    style: {
                                                        backgroundColor: getStatusColor(order.status)
                                                    },
                                                    children: t(`orders.status.${order.status}`)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].paymentStatus,
                                                    style: {
                                                        color: getPaymentStatusColor(order.payment_status)
                                                    },
                                                    children: t(`orders.paymentStatus.${order.payment_status}`)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 306,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/orders/page.tsx",
                                    lineNumber: 294,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItems,
                                    children: [
                                        "                  ",
                                        order.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderItem,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemImage,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: item.image || '/placeholder-product.png',
                                                            alt: item.name,
                                                            onError: (e)=>{
                                                                e.currentTarget.src = '/placeholder-product.png';
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 326,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                        lineNumber: 325,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemDetails,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemName,
                                                                children: item.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/orders/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemVariant,
                                                                children: [
                                                                    item.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t('orders.item.color'),
                                                                            ": ",
                                                                            item.color
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                                        lineNumber: 337,
                                                                        columnNumber: 42
                                                                    }, this),
                                                                    item.size && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            t('orders.item.size'),
                                                                            ": ",
                                                                            item.size
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                                        lineNumber: 338,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/orders/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 25
                                                            }, this),
                                                            "                        ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].itemPrice,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quantity,
                                                                        children: [
                                                                            t('orders.item.quantity'),
                                                                            ": ",
                                                                            item.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                                        lineNumber: 340,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].price,
                                                                        children: [
                                                                            "$",
                                                                            item.price ? parseFloat(item.price).toFixed(2) : '0.00'
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                                        lineNumber: 341,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/orders/page.tsx",
                                                                lineNumber: 339,
                                                                columnNumber: 55
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/orders/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/src/app/orders/page.tsx",
                                                lineNumber: 324,
                                                columnNumber: 21
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/orders/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 17
                                }, this),
                                (order.tracking_number || order.estimated_delivery) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].deliveryInfo,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            children: t('orders.delivery.title')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 353,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].deliveryDetails,
                                            children: [
                                                order.tracking_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trackingInfo,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                t('orders.delivery.trackingNumber'),
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 357,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trackingNumber,
                                                            children: order.tracking_number
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 358,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].trackButton,
                                                            onClick: ()=>{
                                                                // In a real app, this would open tracking page
                                                                alert(`Track order: ${order.tracking_number}`);
                                                            },
                                                            children: t('orders.delivery.track')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 359,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 25
                                                }, this),
                                                "                      ",
                                                order.estimated_delivery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].estimatedDelivery,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: [
                                                                t('orders.delivery.estimated'),
                                                                ":"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 371,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: formatDate(order.estimated_delivery)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/orders/page.tsx",
                                                            lineNumber: 372,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/orders/page.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/orders/page.tsx",
                                    lineNumber: 352,
                                    columnNumber: 19
                                }, this),
                                "                ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].orderActions,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].viewDetailsButton,
                                            onClick: ()=>router.push(`/orders/${order.id}`),
                                            children: t('orders.actions.viewDetails')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 379,
                                            columnNumber: 19
                                        }, this),
                                        order.payment_status === 'pending' && order.status !== 'cancelled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].retryPaymentButton,
                                            onClick: ()=>handleRetryPayment(order),
                                            children: t('orders.actions.retryPayment') || 'Retry Payment'
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 387,
                                            columnNumber: 21
                                        }, this),
                                        order.status === 'delivered' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].reorderButton,
                                            onClick: ()=>handleReorder(order.id),
                                            children: t('orders.actions.reorder')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 396,
                                            columnNumber: 21
                                        }, this),
                                        (order.status === 'pending' || order.status === 'confirmed') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$orders$2f$orders$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cancelButton,
                                            onClick: ()=>handleCancelOrder(order.id),
                                            children: t('orders.actions.cancel')
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/orders/page.tsx",
                                            lineNumber: 405,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/orders/page.tsx",
                                    lineNumber: 378,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, order.id, true, {
                            fileName: "[project]/src/app/orders/page.tsx",
                            lineNumber: 292,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/orders/page.tsx",
                    lineNumber: 290,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/orders/page.tsx",
            lineNumber: 224,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/orders/page.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_5cbde7d7._.js.map