# My Orders Page Documentation

## Overview
The My Orders page provides users with a comprehensive view of their order history, allowing them to track, manage, and view detailed information about their purchases.

## Features

### Main Orders Page (`/orders`)
- **Order List**: Displays all user orders in a clean, card-based layout
- **Order Filtering**: Filter orders by status (pending, confirmed, processing, shipped, delivered, cancelled)
- **Sorting Options**: Sort by date, amount, or status
- **Order Count**: Shows total number of orders matching current filters
- **Empty State**: Friendly message when no orders exist
- **Loading States**: Smooth loading animations during data fetch

### Order Details Page (`/orders/[id]`)
- **Detailed Order View**: Complete order information on a dedicated page
- **Order Summary**: Key details including order number, dates, and totals
- **Customer Information**: Display of customer contact details
- **Shipping Information**: Address, tracking number, and delivery estimates
- **Item Details**: Individual product information with variants and pricing
- **Order Actions**: Reorder, cancel, or print functionality

## Design Features

### Visual Appeal
- **Modern UI**: Clean, professional design with subtle gradients
- **Responsive Layout**: Fully responsive design for all screen sizes
- **Color-Coded Status**: Visual status indicators for quick recognition
- **Card-Based Design**: Organized information in easy-to-scan cards
- **Interactive Elements**: Hover effects and smooth transitions

### User Experience
- **Intuitive Navigation**: Clear back buttons and breadcrumbs
- **Search & Filter**: Easy filtering and sorting options
- **Quick Actions**: One-click tracking, reordering, and cancellation
- **Print Support**: Print-optimized order details page
- **Loading States**: Smooth loading animations to improve perceived performance

## Order Status System

### Order Statuses
- **Pending**: Order received, awaiting confirmation
- **Confirmed**: Order confirmed, preparing for processing
- **Processing**: Order being prepared for shipment
- **Shipped**: Order shipped, tracking available
- **Delivered**: Order successfully delivered
- **Cancelled**: Order cancelled by user or system

### Payment Statuses
- **Pending**: Payment awaiting processing
- **Paid**: Payment successfully processed
- **Failed**: Payment processing failed
- **Refunded**: Payment refunded to customer

## Technical Implementation

### Components
- `OrdersPage`: Main orders listing component
- `OrderDetailsPage`: Individual order details component
- CSS Modules for styling with responsive design
- TypeScript for type safety

### Internationalization
- Full i18n support with English and Russian translations
- Pluralization support for order counts
- Localized date formatting

### State Management
- Redux integration for authentication state
- Local state for order data and UI controls
- Error handling and loading states

### Mock Data
- Comprehensive mock data for development and testing
- Realistic order scenarios and status combinations
- Sample tracking numbers and delivery dates

## File Structure
```
/orders/
├── page.tsx                 # Main orders listing page
├── orders.module.css        # Styles for main page
└── [id]/
    ├── page.tsx             # Order details page
    └── orderDetails.module.css # Styles for details page
```

## Translation Keys
All user-facing text is localized using i18n keys under the `orders` namespace:
- Order status labels
- Filter and sort options
- Action buttons
- Error messages
- Empty states

## Responsive Design
- Mobile-first approach
- Optimized for tablets and desktop
- Touch-friendly interface elements
- Collapsible mobile layouts

## Future Enhancements
- Real API integration
- Advanced filtering options
- Order export functionality
- Email order sharing
- Delivery notifications
- Return/refund management
