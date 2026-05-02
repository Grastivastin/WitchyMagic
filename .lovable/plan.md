# Twisted Fairytale Visual Pass — Plan

## 1. New asset uploads
Copy the user-provided images into `src/assets/`:
- `user-uploads://Twisted_Fairy_Tale_Witchy_Magic_Logo.png` → `src/assets/hero-logo-cover.png` (new landing hero)
- `user-uploads://image-11.png` → `src/assets/corner-ornament.png` (gold-vine corner, used site-wide)
- `user-uploads://Dark_Twisted_Fairytale_Cosmetics.png` → `src/assets/about-cover.png` (new About hero)
- `user-uploads://image-14.png` → `src/assets/princess-prince.png` (moved to Consultation)
- `user-uploads://Dermatologist_Witchy_Magic_Brand.jpg` → overwrite `src/assets/derm-portrait.jpg` (already used on home dermatology section)

Delete (or stop importing) old assets that are being replaced:
- `src/assets/landing-hero.png` — no longer referenced after swap
- `src/assets/grimoire-prince-princess.jpg` — removed from Grimoire

## 2. Landing hero (home page)
Edit `src/components/AnimatedHero.tsx`:
- Replace `landing-hero.png` import with `hero-logo-cover.png`.
- Remove the radial mask (`maskImage` / `WebkitMaskImage`) so the framed cover art reads cleanly edge-to-edge.
- Keep the breathing pink halo + parallax tilt + sparkle overlay.
- Switch `object-contain` → `object-cover` and add `rounded-sm` border using existing `tarot-border` to keep storybook framing.

## 3. Site-wide corner ornaments (every route)
Create `src/components/CornerOrnaments.tsx`:
- Renders 4 `<img>` tags (one per corner) with the gold-vine ornament.
- `position: fixed`, `pointer-events: none`, `z-index: 40` (above swirl background, below header dropdowns/cursor).
- Each corner uses CSS transforms (`scaleX(-1)`, `scaleY(-1)`) to mirror the asset so the vines curl inward.
- Responsive sizing: `w-[180px] md:w-[260px] lg:w-[320px]`, with `opacity-90`.
- Generous inset (no `top:0` flush) so vines don't collide with header/footer borders.
- Hidden on viewports under `sm` to avoid mobile clutter (optional toggle).

Mount once in `src/routes/__root.tsx` so it appears on all 7+ pages automatically.

## 4. Trust badges — bolder twisted-fairytale styling
Edit `src/components/TrustBadges.tsx` + supporting CSS in `src/styles.css`:
- Increase font weight, letter-spacing, and gold glow.
- Replace plain divider lines with thorn/vine SVG borders (inline SVG of thorny rose stems).
- Add small rose-glyph dividers between badges.
- Boost contrast: gold text-shadow + subtle pink underglow.
- Keep layout responsive (wrap on small screens).

## 5. Tone calibration
Update `src/styles.css` `.bg-mystic-swirl` opacity from 0.55 → ~0.30 and blend mode from `screen` → `soft-light` so the page reads "luxury fairytale boutique" rather than gloomy. Headlines stay dark-purple/pink; product sections keep the existing cream/pink luxury palette.

## 6. About page (`src/routes/about.tsx`)
- Replace `about-hero.jpg` import with new `about-cover.png` (lipsticks + branding).
- Constrain hero figure: `max-w-3xl mx-auto aspect-[4/5]` (was full-bleed). Keep `tarot-border ornament-corners`.
- Remove the bottom mask gradient so the framed art looks like a storybook plate, not a fade-out.

## 7. Grimoire page (`src/routes/grimoire.tsx`)
- Remove `princeAndPrincess` import + its `<figure>` block.
- Promote the Poison Apple storybook image to a single centered hero (`max-w-2xl mx-auto`), wrapped in `tarot-border ornament-corners`.
- Add twisted-fairytale flourishes around it: thorn-rose SVG sprigs (top-left/bottom-right), small floating sparkle field (reuse pattern from `AnimatedHero`), and a pink halo behind the frame.
- Update copy under it to match the lone-image layout.

## 8. Consultation page (`src/routes/consultation.tsx`)
- Import new `princess-prince.png`.
- Add a dedicated section above (or beside) the booking form: a centered `tarot-border ornament-corners` figure, `max-w-xl`, with caption "The Princess & Her Dark Prince — book your private consultation".
- Place it as the hero of the page (top, centered) so it's anchored intentionally, not floated in a corner.

## 9. Remove zodiac glyph row (item 7)
Edit `src/components/SiteFooter.tsx`:
- Delete the `ZODIAC` constant and the `<div>` rendering the glyph row (around line 54).
- Keep the rest of the footer (links, demo notice).

Note: zodiac data on testimonials/products is NOT removed — only the visual glyph row the user pointed at. Confirm if you also want zodiac removed from product cards / reviews / about team copy.

## Files touched
- create: `src/components/CornerOrnaments.tsx`
- create assets: `hero-logo-cover.png`, `corner-ornament.png`, `about-cover.png`, `princess-prince.png` (overwrite `derm-portrait.jpg`)
- edit: `src/routes/__root.tsx`, `src/components/AnimatedHero.tsx`, `src/components/TrustBadges.tsx`, `src/components/SiteFooter.tsx`, `src/routes/about.tsx`, `src/routes/grimoire.tsx`, `src/routes/consultation.tsx`, `src/styles.css`
- delete: `src/assets/landing-hero.png`, `src/assets/grimoire-prince-princess.jpg`

## Out of scope (ask if needed)
- Removing zodiac glyphs from product cards, reviews, testimonials, and team copy (only the footer row is removed per item 7).
- Generating new artwork — using the uploaded images as-is.
