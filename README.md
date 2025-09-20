# Project Description: Sklad Online (Frontend)

This repository contains the frontend part of the Sklad Online project, an e-commerce web application for product catalog browsing, shopping cart management, product comparison, favorites, and user authentication.

## Overview
- **Frontend Stack:** HTML, CSS, JavaScript
- **Structure:**
  - `html/` — All main pages (catalog, product, cart, login, etc.)
  - `img/` — Images and SVG icons
  - `js/` — JavaScript modules for UI logic (cart, catalog, filters, etc.)
  - `style/` — CSS styles (main, components, utilities, etc.)

## Key Features
- Product catalog with filtering and sorting
- Product detail pages
- Shopping cart and buying flow
- User login and authentication pages
- Favorites and comparison functionality
- Responsive design for mobile and desktop

## Backend Integration
- The frontend expects RESTful API endpoints for:
  - Product data (list, details, filters)
  - Cart operations (add, remove, update)
  - User authentication (login, registration)
  - Favorites and comparison lists
- API endpoints should return JSON responses.
- Authentication can use JWT or session cookies.

## Getting Started
1. Open `html/index.html` in a browser to preview the UI.
2. Connect frontend JS modules to backend API endpoints as needed.
3. Static assets are located in `img/` and `style/` folders.

## Notes for Backend Developer
- No backend code is present in this repository.
- All dynamic data and user actions are expected to be handled via API calls.
- Please provide API documentation or endpoints for integration.

---

For any questions or integration details, contact the frontend team.
