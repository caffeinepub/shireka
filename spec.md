# Shireka

## Current State
The app has a FindPage with Myntra-style filters (occasion, size, color, outfit type, etc.) and a ResultsPage with price comparison across platforms. The navbar has HOME, MEN, WOMEN, BOYS, GIRLS, INFANTS. There's also a WishlistPage, ProfilePage, OutfitFinderPage (mostly unused), and a HomePage with AI-generated outfit images.

## Requested Changes (Diff)

### Add
- A new **Twinning Outfit Finder** flow (main feature) accessible from the homepage and Find page:
  1. **Step 1 – Select Members**: User picks which family members to include (e.g., Man, Woman, Boy, Girl, Infant)
  2. **Step 2 – Select Outfit per Member**: For each selected member, choose an outfit category from the full category list (Men: Kurtas & Kurta Sets, T-Shirts, etc.; Women: Churidar, Dresses, etc.; Boy/Girl: full kids lists)
  3. **Step 3 – Select Color**: A single color picker for the coordinated twinning color (from 50+ colors)
  4. **Step 4 – Select Size per Member**: For adults: XS/S/M/L/XL/XXL; for kids by age (2Y, 4Y, 6Y, 8Y, 10Y, 12Y); for infants by months (0-3M, 3-6M, 6-9M, 9-12M, 12-18M, 18-24M)
  5. **FIND RESULT button**: Navigates to a results page showing product cards for each member's outfit
- **Multi-member Results Page**: Shows outfit results split by member (e.g., "For Man", "For Woman", "For Boy"). Each section shows 3-4 product cards from different platforms (Myntra, Amazon, Flipkart, Ajio, Meesho) with product image, name, price in INR, platform badge, and a "Buy Now" link. A price comparison table below each member section highlights the cheapest option in green.

### Modify
- Homepage hero section: Add a prominent "Find Twinning Outfits" CTA button that opens the Twinning Outfit Finder
- FindPage: Replace or supplement current filters with the multi-member twinning flow
- ResultsPage: Update to show per-member sections with platform comparison

### Remove
- OutfitFinderPage (old 4-step wizard) -- replaced by the new flow

## Implementation Plan
1. Update `FindPage.tsx` to implement the 4-step twinning outfit selector (members → outfits → color → sizes → FIND RESULT)
2. Update `ResultsPage.tsx` to show per-member product cards from simulated platform data (Myntra, Amazon, Flipkart, Ajio, Meesho) with price comparison table
3. Pass selection state via URL params or React state from FindPage to ResultsPage
4. Update `HomePage.tsx` hero CTA to link to the new finder flow
5. Keep all existing filters available as secondary filters below the main twinning selector
