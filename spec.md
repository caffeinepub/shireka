# Shireka

## Current State
Shireka is a fashion discovery and price comparison platform. The ResultsPage shows outfit styles and price comparisons. The HomePage has hero, category cards, twinning sections, and gallery.

## Requested Changes (Diff)

### Add
- A reusable `ProductCard` component with: product image, title, price, discount %, platform logo (Amazon, Myntra, Flipkart, Ajio, Meesho), and a 'View Product' button
- A product card grid section on the HomePage (and/or ResultsPage) showing 3-4 cards per row
- Platform logo badges rendered from named constants (Amazon, Myntra, Flipkart, Ajio, Meesho)

### Modify
- ResultsPage outfit cards should use the new ProductCard component styling where applicable
- HomePage sections (Trending, Wedding Special, Kids Matching) should display products using the new card layout

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/components/ProductCard.tsx` with image, title, price, discount %, platform logo pill, and 'View Product' button
2. Create platform logo helper with colored text/icon badges for Amazon, Myntra, Flipkart, Ajio, Meesho
3. Add a sample product grid section on HomePage under trending/wedding/kids sections using 3-4 cards per row responsive grid
4. Update ResultsPage to use ProductCard styling for outfit result cards
