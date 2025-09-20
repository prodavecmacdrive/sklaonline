# Sklad Online - E-commerce Platform

This repository contains the frontend implementation of Sklad Online, a comprehensive e-commerce platform designed for modern web browsers.

## Technical Stack
- **Frontend:**
  - HTML5
  - CSS3 (with modular structure)
  - Vanilla JavaScript (ES6+)
  - Responsive Design (Mobile-first approach)

## Project Structure
```
├── html/           # Static HTML templates
├── img/            # Images and SVG icons
│   └── icons/      # SVG icons for UI elements
├── js/             # JavaScript modules
└── style/          # CSS stylesheets
```

## Required Backend API Endpoints

### Products
```
GET /api/products           # List products with pagination
GET /api/products/{id}      # Get product details
GET /api/products/filter    # Filter products
GET /api/products/search    # Search products
```

### Cart
```
GET    /api/cart                # Get cart contents
POST   /api/cart/add           # Add item to cart
PUT    /api/cart/{id}          # Update cart item
DELETE /api/cart/{id}          # Remove from cart
POST   /api/cart/checkout      # Process checkout
```

### User Authentication
```
POST   /api/auth/login         # User login
POST   /api/auth/register      # User registration
POST   /api/auth/logout        # User logout
GET    /api/auth/profile       # Get user profile
```

### User Features
```
GET    /api/favorites          # Get user favorites
POST   /api/favorites/add      # Add to favorites
DELETE /api/favorites/{id}     # Remove from favorites
GET    /api/compare           # Get comparison list
POST   /api/compare/add       # Add to comparison
DELETE /api/compare/{id}      # Remove from comparison
```

## API Requirements

### Authentication
- Implementation: JWT (preferred) or Session Cookies
- Token format: Bearer authentication
- Refresh token mechanism required

### Response Format
```json
{
    "status": "success|error",
    "data": {
        // Response data
    },
    "error": {
        "code": "ERROR_CODE",
        "message": "Error description"
    }
}
```

### Pagination Format
```json
{
    "data": [...],
    "pagination": {
        "currentPage": 1,
        "perPage": 20,
        "totalItems": 100,
        "totalPages": 5
    }
}
```

## Backend Implementation Notes

### Required Features
1. **Product Management**
   - Categories and subcategories
   - Product variants (size, color, etc.)
   - Stock management
   - Price calculation with discounts

2. **User Management**
   - User roles (customer, admin)
   - Address management
   - Order history
   - Wishlist/Favorites

3. **Order Processing**
   - Cart management
   - Checkout process
   - Order status tracking
   - Payment integration

4. **Security Requirements**
   - Input validation
   - XSS protection
   - CSRF protection
   - Rate limiting
   - Data sanitization

### Database Considerations
- Product data structure must support variants
- User sessions and cart persistence
- Order history and status tracking
- Efficient query optimization for filters

### Performance Requirements
- API response time < 200ms
- Caching implementation required
- Image optimization support
- Database indexing strategy

## Getting Started
1. Clone the repository
2. Review HTML templates in `/html`
3. Check JavaScript modules in `/js`
4. Implement required API endpoints
5. Connect frontend to your API implementation

## Contact
For technical questions and API implementation details, contact the development team.
