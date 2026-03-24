# Shireka

## Current State
Full fashion discovery platform with hero, category cards, twinning finder (couple/family), 500 outfit styles, price comparison, wishlist, and results page. Modern black + pastel pink UI.

## Requested Changes (Diff)

### Add
- **Smart Search Bar** in the Navbar (and prominently in the hero section): text input with real-time suggestions as user types. Suggestions cover categories like 'wedding couple outfits', 'kids twinning', 'pink lehenga', 'men kurta', etc. Suggestions grouped by type (Occasion, Category, People). Clicking a suggestion navigates to Find page with those filters pre-applied or a search results view.
- **Upload Photo → Find Similar Outfit** feature: a button/area (camera icon or 'Upload Photo') that lets users pick an image from device. After upload, show a 'Finding similar outfits...' state and then display a grid of visually-similar style outfit cards (simulated matching with relevant outfit cards). Accessible from the hero section and the Find page.
- **Emotional trust section** on homepage: add a short tagline and a visual row with real faces/stories feel — a testimonial strip with 3 short user quotes, star ratings, and small avatar images to create emotional + visual connection.

### Modify
- Navbar: embed the search bar icon/input into the navbar so it's always accessible
- Hero section: add the Upload Photo feature as a secondary CTA below the main CTA button

### Remove
- Nothing removed

## Implementation Plan
1. Create `SearchBar` component with autocomplete suggestions list; suggestions are a static curated dataset of popular queries (occasion, category, people type combos relevant to Shireka)
2. Integrate search bar into Navbar — collapsed to icon on mobile, expanded on desktop
3. Add 'Upload Photo' button in hero and FindPage with file input, preview thumbnail, and simulated similar-outfit results panel
4. Add testimonials strip on homepage with 3 quotes, star ratings, avatar placeholders
5. Wire search suggestions to navigate to Find page with pre-filled state where relevant
