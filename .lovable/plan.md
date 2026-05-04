## Goal

1. Replace the small 4-corner ornaments with **full-height intricate golden rose-petal side borders** running down the left and right edges of every page.
2. Rebuild the **landing hero** to match the uploaded "Witchy Magic Boutique & Beauty" reference: dark red/purple smoke, gold sparkle dust trail, gold script logo, with deep-red roses bleeding inward from the four corners — blending seamlessly into the page background so it bleeds perfectly when scrolling.

## Changes

### 1. New side-border asset
Generate a new vertical ornament: `src/assets/side-border.png`
- Tall, narrow strip (e.g. 400×1600) — golden filigree vines, delicate rose petals, fairytale storybook feel
- Transparent background, medium thickness (not overpowering)
- Designed to tile/stretch vertically without seams

### 2. Replace `CornerOrnaments` with `SideBorders`
- Delete the 4 corner image instances
- New component renders **two fixed vertical strips**: one pinned to left edge, one mirrored on right edge
- `position: fixed`, full viewport height, `top: 0; bottom: 0`
- Width ~80–110px desktop, ~40–60px mobile, behind content (`z-40`, `pointer-events-none`)
- Stays still while scrolling (already fixed)
- Mounted once in `src/routes/__root.tsx` so it appears on every page
- Remove the old `corner-ornament.png` usage

### 3. New landing hero artwork
Generate `src/assets/hero-logo-cover.png` (replaces existing) — a wide 16:9 cover matching the uploaded reference exactly:
- Dark wine/aubergine background with crimson smoke
- Gold sparkle dust swooshing through the title
- "Witchy Magic" in elegant gold script + "Boutique & Beauty" subtitle
- Deep red roses & buds bleeding in from all four corners
- Edges fade/vignette to the site's deep-purple background so it bleeds seamlessly

### 4. Hero container — bleed into background
In `src/components/AnimatedHero.tsx` and/or `src/routes/index.tsx`:
- Make the hero **full-bleed** at the top of the landing page (escape the centered max-width container)
- Remove the `rose-frame` / `tarot-border` wrapper around the hero so there's no visible image frame — the artwork's own painted edges blend into the page
- Keep `object-cover` so the full width fills the screen on the landing only
- Other pages remain normal (no hero treatment, no full-bleed)

### 5. Cleanup
- Remove `.rose-frame` / corner-ornament CSS only where it framed the hero (keep it for non-hero images that still want a frame, unless you want it gone everywhere — confirm if needed)
- Keep all other images on other pages as they currently render

## Out of scope
- No changes to image frames on About / Consultation / Grimoire / Analysis pages
- No changes to header, footer, products, copy, or routing
- No backend / auth / Stripe work
