## WITCHY MAGIC — Production Build Plan

A dark-luxury beauty platform where dermatology meets mysticism. Built with TanStack Start + Tailwind + Framer Motion + Lovable Cloud + Lovable AI, full integrations (real AI chatbot, Stripe checkout, Calendly booking).

Given the size of this spec, I'll ship it in **3 phased waves**. Wave 1 lands a complete, polished site with all pages and the real AI chatbot. Waves 2–3 layer in commerce and booking. Each wave leaves the site fully functional.

---

### Brand & Design System

- **Name:** WITCHY MAGIC (boutique & beauty)
- **Palette (oklch tokens in `src/styles.css`):** bg-black `#0a0806`, deep-purple `#2a1a4a`, dark-purple `#3d1a3d`, neon-pink `#ff1493` (primary glow), magenta-soft `#ff69b4`, gold `#c9a96e`, rose-gold `#d4a574`, cream `#f0e8d8`, cream-dim `#9a8f7e`
- **Fonts (Google Fonts):** Cormorant Garamond (headers, italics) + Outfit (body)
- **Custom utilities:** `.glow-pink`, `.tarot-card`, `.text-glow`, gradient backgrounds, ornamental SVG corners
- **Global components:** `<GlitterCursor />` (magenta dot + sparkle particles, throttled, disabled on touch), `<MoonScrollIndicator />`, `<TrustBadgeRow />`

### Tech & Integrations

- **Framework:** TanStack Start (already scaffolded), file-based routes in `src/routes/`
- **Animation:** Framer Motion + CSS keyframes
- **Backend:** Lovable Cloud (auto-provisioned Supabase under the hood) for products, reviews, chat history, wishlist/cart, consultations
- **AI Chatbot:** Streaming server route → Lovable AI Gateway (`google/gemini-3-flash-preview`) with the mystical-dermatology system prompt
- **Payments:** Stripe (built-in Lovable payments) — Wave 2
- **Booking:** Calendly embed — Wave 2
- **Images:** Generate the 2 missing reference images (About title card + witch with crystal ball) in matching dark/magenta style; copy uploaded image 1 + image 3 into `src/assets`

---

### WAVE 1 — Foundation, Design, All Pages, Real AI Chatbot

**Setup**
- Enable Lovable Cloud (database + AI gateway access)
- Install: `framer-motion`, `lucide-react`, `react-markdown`
- Wire fonts in `__root.tsx`, paint design tokens into `src/styles.css`
- Copy uploaded images to `src/assets/`; generate `about-hero.jpg` (Wolf-Among-Us style rose-tangle title card) and `analysis-witch.png` (witch with glowing crystal ball + zodiac symbols)
- Build `<GlitterCursor />`, `<TarotCard />`, `<NeonButton />`, `<TrustBadges />`, `<SiteHeader />`, `<SiteFooter />`, `<PageShell />` primitives

**Routes (file-based)**
- `/` — Home: hero (image 1, breathing pink halo + parallax tilt + sparkle overlay), 4 pillar tarot cards, featured testimonials, trust strip, dermatologist endorsement, big CTA
- `/about` — image 2 cinematic title card (zoom-breathe), brand story, 3 pillars (Mysticism / Science / Beauty), Coven team cards, Dr. Priya Sharma endorsement, awards strip, Grimoire blog teaser cards
- `/analysis` — left: upload dropzone + camera button, right: image 4 with hair-float, crystal-ball pulse, zodiac twinkle, particle drift; mock 4-second cauldron loading transition → results
- `/results` — quick-analysis tarot trio (skin tone / type / concerns), root-cause prose with severity bars, zodiac interpretation block, CTA to recommendations
- `/recommendations` — left: streaming AI chat (real Lovable AI), right: filterable product grid (mock product JSON of 24 items with images, ratings, concern tags)
- `/products/$productId` — product detail with gallery, ingredient accordion, scientific backing, related products
- `/gallery` — before/after transformations grid with filters
- `/reviews` — full review hub with rating/skin-type/sort filters
- `/ingredients` — searchable ingredient dictionary with detail cards
- `/grimoire` — blog index + `/grimoire/$slug` for article pages (3 seed articles)
- `/consultation` — expert cards (Wave 2 will add live Calendly)
- `/wishlist`, `/cart`, `/profile` — Wave 2/3
- `__root.tsx` — header, footer, glitter cursor, fixed image-3 background at 30% opacity with dark gradient mask

**AI Chatbot (real, this wave)**
- Server route `src/routes/api/chat.ts` (POST) — SSE-streams to Lovable AI Gateway with system prompt blending mystical voice + dermatology root-cause framework + product recommendation links; handles 429 / 402 with friendly errors
- Frontend hook `useStreamingChat` parses SSE line-by-line (per template), updates last assistant message; `react-markdown` renders responses; suggested-prompt chips below input

**Animations**
- Hero halo: 4s opacity pulse (0.6→1→0.6) on absolutely-positioned blurred magenta gradient
- Image 1 parallax: Framer `useMotionValue` + `useTransform`, max ±2° tilt, spring damping
- Image 4: whole-image breathing (`translateY ±2px`, 6s) + radial-gradient overlay on crystal ball pulsing 2s + 6 zodiac SVGs twinkling on staggered 2–4s intervals + rising pink particles
- Buttons: `box-shadow: 0 0 20px #ff1493` on hover, scale 1.03
- Tarot cards: gold→magenta border shift on hover, lift 5px, pink glow
- Page transitions: fade + 20px translateY on mount

**Data (mock JSON in `src/data/`)**
- 24 products with image, brand, price, rating, reviews count, concerns, skin types, ingredients, dermatologist-recommended flag
- 12 testimonials, 8 before/after transformations, 30 reviews, 20 ingredients, 4 team members, 3 blog articles

---

### WAVE 2 — Commerce + Booking

- Enable Stripe (Lovable built-in payments) — eligibility check first
- Cart + wishlist persisted in Lovable Cloud (auth required → email/password + Google sign-in via `profiles` table + `user_roles` table for future admin)
- Stripe Checkout edge function for cart + product-detail "Add to cart"
- Calendly embed on `/consultation` with 3 expert profiles
- `/profile` dashboard: previous analyses, wishlist, orders, consultation history

### WAVE 3 — Polish & Real Data

- Real review submission flow (authenticated, stored in Cloud, moderated)
- User-generated before/after upload
- Newsletter signup (capture to Cloud table; can wire Resend later)
- Performance pass: lazy-load route components, image optimization, Lighthouse > 90
- Accessibility audit: contrast, alt text, keyboard nav, focus rings, screen-reader pass

---

### Technical Details

```text
src/
├── routes/
│   ├── __root.tsx              (header, footer, cursor, bg layer)
│   ├── index.tsx               (home)
│   ├── about.tsx
│   ├── analysis.tsx
│   ├── results.tsx
│   ├── recommendations.tsx
│   ├── products.$productId.tsx
│   ├── gallery.tsx
│   ├── reviews.tsx
│   ├── ingredients.tsx
│   ├── grimoire.tsx
│   ├── grimoire.$slug.tsx
│   ├── consultation.tsx
│   ├── wishlist.tsx
│   ├── cart.tsx
│   ├── profile.tsx
│   └── api/chat.ts             (SSE streaming to Lovable AI)
├── components/
│   ├── GlitterCursor.tsx
│   ├── SiteHeader.tsx
│   ├── SiteFooter.tsx
│   ├── TarotCard.tsx
│   ├── NeonButton.tsx
│   ├── TrustBadges.tsx
│   ├── ProductCard.tsx
│   ├── TestimonialCard.tsx
│   ├── AnimatedHero.tsx
│   ├── WitchAnalysisFigure.tsx
│   └── ChatPanel.tsx
├── hooks/useStreamingChat.ts
├── data/{products,testimonials,transformations,reviews,ingredients,team,articles}.ts
├── lib/cursor.ts
└── assets/{landing-hero.png, universal-bg.jpg, about-hero.jpg, analysis-witch.png}
```

**Risk notes:** Custom cursor must be perf-tuned (cap particles at 60, disable on `(pointer: coarse)`). Streaming SSE parser must handle CRLF, comments, and partial JSON exactly per the template. Wave 1 ships without Stripe so the site is live and demoable immediately.
