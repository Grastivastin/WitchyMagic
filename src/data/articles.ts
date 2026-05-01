export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  author: string;
  date: string;
  body: string;
};

export const articles: Article[] = [
  {
    slug: "niacinamide-vs-retinol",
    title: "Niacinamide vs Retinol: Which Should You Use?",
    excerpt: "Two powerhouse ingredients. How they differ, and which is right for YOUR skin type.",
    readTime: "5 min",
    category: "Ingredients",
    author: "Selene Voss",
    date: "April 12, 2026",
    body: `Two ingredients dominate every "must-have" list in skincare. They're often confused, sometimes pitted against each other, and almost always misunderstood.

## What Niacinamide Actually Does

Niacinamide (vitamin B3) is a workhorse. At 5–10% concentration, it:

- Reduces sebum production by 18–24% in 4 weeks (peer-reviewed)
- Strengthens the lipid barrier
- Calms redness and reduces visible pores
- Plays well with everything

It is the ingredient you start with. The forgiving witch.

## What Retinol Actually Does

Retinol is the rebuilder. It accelerates cell turnover and stimulates collagen production. At 0.3–1%, over 12 weeks, it visibly:

- Smooths fine lines
- Refines texture
- Fades pigmentation

But it demands respect. Begin twice weekly. Buffer with moisturizer. Always wear SPF the next morning.

## Which One Is For You?

- Oily, acne-prone, sensitive starter → **Niacinamide first**
- Aging concerns, comfortable with actives → **Retinol** (slow ramp)
- Pregnant or planning → **Bakuchiol** (plant retinol alternative)

You can use both. Niacinamide AM, retinol PM. They are not enemies — they are complementary spells in the same grimoire.`,
  },
  {
    slug: "5-acne-myths",
    title: "The 5 Myths About Acne That Are Wrong",
    excerpt: "Chocolate doesn't cause it. Neither does dirt. Here's what actually does.",
    readTime: "8 min",
    category: "Education",
    author: "Sashank Peddada",
    date: "April 5, 2026",
    body: `Acne is one of the most studied skin conditions on earth. It's also one of the most mythologized. Let's dismantle five.

## Myth 1: Chocolate causes acne

Studies don't support a direct link to chocolate itself. What does correlate: high-glycemic foods (sugar spikes → insulin → IGF-1 → sebum). Dark chocolate? Mostly fine. Milk chocolate with sugar? More suspect — but the sugar, not the cocoa.

## Myth 2: Acne means you're dirty

Acne is hormonal, genetic, and inflammatory. Over-cleansing makes it worse by stripping the barrier. Twice daily, gentle, pH-balanced cleanse. That's it.

## Myth 3: Sun helps acne

The "summer glow" is initial inflammation reduction. Then UV thickens the stratum corneum, which traps oil and bacteria. Six weeks later, post-summer breakouts. SPF is non-negotiable.

## Myth 4: You'll grow out of it

Adult-onset acne is rising — particularly hormonal acne in your 30s and 40s. You won't necessarily grow out of it. You manage it.

## Myth 5: Stronger products = faster results

Over-active routines damage the barrier. Damaged barrier = more inflammation = more acne. The most effective routines are simple: gentle cleanse, niacinamide, moisturizer, SPF.`,
  },
  {
    slug: "zodiac-skincare-science",
    title: "Zodiac Skincare: Science or Superstition?",
    excerpt: "Can your birth sign really determine your skin type? Let's separate mysticism from dermatology.",
    readTime: "6 min",
    category: "Zodiac",
    author: "Mira Solis",
    date: "March 28, 2026",
    body: `We get this question often. Honest answer: no, your sun sign does not biologically determine your skin type.

## Then why do we use the framework?

Because skincare is more than chemistry — it's *ritual*. And ritual is what makes a routine actually happen.

When we describe the Cauldron Serum as "a Scorpio elixir," we're not saying Scorpios biologically need niacinamide. We're saying: intense personality types tend to gravitate toward intense actives, and the framework helps you remember.

## What zodiac tells us (statistically)

Nothing about skin biology. But it correlates loosely with:

- **Personality** → which influences stress (which influences cortisol → sebum)
- **Routine adherence** → some signs are method, some are intuitive
- **Sensory preferences** → fire signs love bold scents, water signs love textures

## The actual science we trust

Every formulation is backed by peer-reviewed studies, dermatologist consultation, and clinical testing. The zodiac is the *story*. The science is the *substance*.

You don't need to believe in astrology to use Witchy Magic. You need a barrier. We give you both.`,
  },
];

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);
