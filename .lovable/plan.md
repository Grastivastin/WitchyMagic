## Goal
Make the golden rose-vine side borders look like a delicate fairytale storybook frame — thin, elegant strips flush against the very left and right edges of every page (not thick columns intruding into the content).

## Changes

### 1. `src/components/CornerOrnaments.tsx`
- Reduce strip width drastically:
  - mobile: `w-[22px]`
  - sm: `w-[28px]`
  - md: `w-[34px]`
  - lg: `w-[40px]`
- Keep `fixed top-0 / bottom-0`, `left-0` and `right-0` so they sit flush against the viewport edges.
- Replace `h-screen` with `inset-y-0 h-full` so the strip covers the full viewport height reliably (h-screen can break with mobile address-bar resize).
- Use `object-contain` with `objectPosition: "left top"` (and mirrored on right) plus `preserveAspectRatio`-friendly sizing so the vine isn't cropped/stretched horizontally — the full intricate vine pattern shows in a slim column, repeating vertically via `background-image` on a wrapper div instead of `<img>`.
- Switch implementation to a `<div>` with `backgroundImage: url(sideBorder)`, `backgroundRepeat: repeat-y`, `backgroundSize: 100% auto` so the vine tiles cleanly down the page at the slim width without distortion.
- Lower glow: `drop-shadow` → softer `filter: drop-shadow(0 0 6px gold/40%)`.
- Keep `z-40 pointer-events-none select-none`.

### 2. No layout/padding changes elsewhere
- Page content already has its own horizontal padding; the slimmer (~22–40px) borders won't overlap text, so no other files need editing.

### 3. Out of scope
- No changes to hero image, header, mirror page, or any other component.
- No new assets — reuse existing `src/assets/side-border.png`.

## Result
Two thin gold-and-rose vine ribbons hugging the left and right edges of every page, like the decorative margin of a fairytale storybook — not the thick columns currently rendered.
