# Order Processing & Payment Flow Architecture

## Overview

This document outlines the complete order processing architecture that integrates with external banking platforms for payment processing. The system handles the full lifecycle from order creation to payment confirmation.

## Architecture Flow

### Step 1: Order Creation
1. **User Checkout** → User completes checkout form and clicks "Buy Now"
2. **Frontend** → Submits order data to backend via `createOrder()` API
3. **Backend** → Creates order with status = `pending` and generates unique UID
4. **Response** → Returns order details, payment URL, and redirect URLs

### Step 2: Payment Redirection
1. **Frontend** → Redirects user to external payment platform
2. **Payment URL** → Includes embedded UID and redirect URLs:
   - Success: `http://127.0.0.1:3000/order/payment-callback?status=success&token={token}&uid={uid}`
   - Failure: `http://127.0.0.1:3000/order/payment-callback?status=failed&token={token}&uid={uid}`

### Step 3: Payment Processing
1. **External Bank** → Processes payment
2. **Bank Redirect** → Returns to our callback URL with status and parameters
3. **Callback Handler** → Validates parameters and processes payment result
4. **Database Update** → Updates order status based on payment result
5. **User Redirect** → Sends user to success or failure page

## Frontend Components

### Payment Callback Handler
**File:** `/order/payment-callback/page.tsx`
- Receives redirect from banking platform
- Validates callback parameters (status, token, uid)
- Calls backend to process payment result
- Redirects to appropriate success/failure page

### Order Success Page
**File:** `/order/complete/page.tsx`
- Displays order confirmation
- Shows order details and next steps
- Provides navigation to order details or continue shopping

### Order Failure Page
**File:** `/order/failed/page.tsx`
- Displays payment failure information
- Shows common issues and solutions
- Provides options to retry payment or contact support

## API Endpoints

### Frontend API Functions
**File:** `/lib/api/payment.ts`

```typescript
// Create order and get payment URL
createOrder(orderData: CreateOrderRequest, token: string): Promise<CreateOrderResponse>

// Process payment callback
processPaymentCallback(callbackData: PaymentCallbackRequest): Promise<PaymentCallbackResponse>

// Generate redirect URLs for payment platform
generatePaymentRedirectUrls(baseUrl?: string): { success_url: string, failure_url: string }

// Validate callback parameters
validateCallbackParams(searchParams: URLSearchParams): ValidationResult
```

### Backend Endpoints (Required Implementation)

#### Create Order
```http
POST /api/v1/orders/create/
Authorization: Bearer {token}
Body: CreateOrderRequest
Response: CreateOrderResponse
```

#### Payment Callback Handler
```http
POST /api/v1/orders/payment-callback/
Body: { status: 'success'|'failed', token?: string, uid: string }
Response: PaymentCallbackResponse
```

#### Get Order by UID
```http
GET /api/v1/orders/by-uid/{uid}/
Response: Order details
```

## Payment Platform Integration

### Redirect URLs to Configure

**Success URL:**
```
http://127.0.0.1:3000/order/payment-callback?status=success&token={token}&uid={uid}
```

**Failure URL:**
```
http://127.0.0.1:3000/order/payment-callback?status=failed&token={token}&uid={uid}
```

### URL Parameters
- `status`: Payment result ('success' or 'failed')
- `token`: Optional security token from payment platform
- `uid`: Unique order identifier for matching

## Database Schema Considerations

### Orders Table
```sql
orders:
  - id (primary key)
  - uid (unique identifier for payment callbacks)
  - order_number (human-readable)
  - status (pending, confirmed, processing, shipped, delivered, cancelled)
  - payment_status (pending, paid, failed, refunded)
  - total_amount
  - created_at
  - updated_at
  - ... other order fields
```

### Status Flow
1. **Initial**: `status = pending, payment_status = pending`
2. **Payment Success**: `status = confirmed, payment_status = paid`
3. **Payment Failed**: `status = cancelled, payment_status = failed`

## Security Considerations

### Token Validation
- Optional token parameter can be used for additional security
- Backend should validate token against expected value
- Consider implementing signature verification if payment platform supports it

### UID Security
- UIDs should be cryptographically secure (UUID v4 recommended)
- UIDs should be unique and non-guessable
- Consider adding expiration times for pending orders

### HTTPS Required
- All payment-related endpoints must use HTTPS in production
- Ensure SSL certificates are valid and trusted

## Error Handling

### Common Error Scenarios
1. **Missing Parameters**: Invalid callback URL format
2. **Invalid UID**: Order not found or UID mismatch
3. **Network Failures**: Connection issues with payment platform
4. **Database Errors**: Failed to update order status

### Error Recovery
- Payment callback failures should be logged for manual review
- Implement retry mechanisms for transient failures
- Provide clear error messages to users
- Offer alternative payment methods on failure

## Testing

### Test Scenarios
1. **Successful Payment Flow**: End-to-end payment success
2. **Failed Payment Flow**: Payment failure handling
3. **Invalid Callbacks**: Malformed parameters
4. **Network Failures**: Timeout and connection issues
5. **Duplicate Callbacks**: Multiple calls with same UID

### Test URLs
Use test payment platform credentials and redirect to localhost:
```
Success: http://127.0.0.1:3000/order/payment-callback?status=success&token=test123&uid=550e8400-e29b-41d4-a716-446655440000
Failure: http://127.0.0.1:3000/order/payment-callback?status=failed&token=test123&uid=550e8400-e29b-41d4-a716-446655440000
```

## Localization

All user-facing text is fully localized with i18n keys:
- `paymentCallback.*` - Payment processing messages
- `orderComplete.*` - Success page content
- `orderFailed.*` - Failure page content

## Monitoring & Analytics

### Key Metrics
- Payment success rate
- Average payment processing time
- Common failure reasons
- User flow completion rates

### Logging Requirements
- All payment callbacks (success and failure)
- Order status changes
- User navigation through payment flow
- Error occurrences and stack traces

## Production Deployment

### Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Domain Configuration
Update redirect URLs for production:
```
https://your-domain.com/order/payment-callback?status=success&token={token}&uid={uid}
https://your-domain.com/order/payment-callback?status=failed&token={token}&uid={uid}
```

### Performance Considerations
- Implement caching for order lookups by UID
- Use database indexes on UID and order_number fields
- Consider implementing rate limiting on callback endpoints
- Monitor response times for payment callback processing

## Maintenance

### Regular Tasks
1. Clean up expired pending orders
2. Monitor payment success rates
3. Review failed payment logs
4. Update payment platform configurations
5. Test backup payment methods

### Troubleshooting
- Check payment platform logs for detailed error information
- Verify SSL certificates and domain configurations
- Monitor database connectivity and performance
- Review application logs for callback processing errors
