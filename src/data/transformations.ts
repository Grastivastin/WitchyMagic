export type Transformation = {
  id: string;
  name: string;
  zodiac: string;
  sign: string;
  concern: string;
  duration: string;
  quote: string;
  productsUsed: string[]; // product ids
  beforeGradient: string;
  afterGradient: string;
};

export const transformations: Transformation[] = [
  {
    id: "x1", name: "Aria N.", zodiac: "♌", sign: "Leo", concern: "Severe Acne",
    duration: "8 weeks",
    quote: "From cystic breakouts to 90% clear with Cauldron + Sage cleanser.",
    productsUsed: ["sage-cleanser", "cauldron-serum", "selene-moisturizer"],
    beforeGradient: "linear-gradient(135deg, oklch(0.55 0.18 25 / 0.8), oklch(0.30 0.10 20 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.78 0.10 50 / 0.7), oklch(0.27 0.10 330 / 0.5))",
  },
  {
    id: "x2", name: "Maya R.", zodiac: "♈", sign: "Aries", concern: "Sun Pigmentation",
    duration: "12 weeks",
    quote: "Forehead spots faded — the Vit C + SPF stack changed my face.",
    productsUsed: ["venus-vitc", "wolfsbane-spf", "elixir-essence"],
    beforeGradient: "linear-gradient(135deg, oklch(0.55 0.10 50 / 0.9), oklch(0.40 0.08 30 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.85 0.06 80 / 0.85), oklch(0.74 0.10 80 / 0.6))",
  },
  {
    id: "x3", name: "Selene V.", zodiac: "♏", sign: "Scorpio", concern: "Texture & Pores",
    duration: "10 weeks",
    quote: "Lunar pads three nights a week — pores I forgot existed.",
    productsUsed: ["lunar-pads", "moonstone-toner", "selene-moisturizer"],
    beforeGradient: "linear-gradient(135deg, oklch(0.45 0.06 320 / 0.9), oklch(0.30 0.05 300 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.78 0.05 320 / 0.7), oklch(0.55 0.15 350 / 0.6))",
  },
  {
    id: "x4", name: "Vera C.", zodiac: "♑", sign: "Capricorn", concern: "Fine Lines",
    duration: "16 weeks",
    quote: "Crow's feet softened. Phoenix retinol respected my barrier.",
    productsUsed: ["phoenix-retinol", "amethyst-eye-cream", "midnight-oil"],
    beforeGradient: "linear-gradient(135deg, oklch(0.50 0.04 60 / 0.9), oklch(0.35 0.04 80 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.80 0.06 70 / 0.8), oklch(0.74 0.10 80 / 0.5))",
  },
  {
    id: "x5", name: "Lyra P.", zodiac: "♓", sign: "Pisces", concern: "Reactive Sensitivity",
    duration: "6 weeks",
    quote: "Redness, gone. Selene + Moonlight cleanser only.",
    productsUsed: ["moonlight-cleanser", "selene-moisturizer", "rose-quartz-mist"],
    beforeGradient: "linear-gradient(135deg, oklch(0.65 0.18 20 / 0.9), oklch(0.50 0.15 15 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.85 0.05 30 / 0.7), oklch(0.74 0.22 350 / 0.4))",
  },
  {
    id: "x6", name: "Iris D.", zodiac: "♎", sign: "Libra", concern: "Dullness",
    duration: "5 weeks",
    quote: "Glow returned. Toner + Vit C every dawn.",
    productsUsed: ["moonstone-toner", "venus-vitc", "rose-quartz-mist"],
    beforeGradient: "linear-gradient(135deg, oklch(0.50 0.02 80 / 0.9), oklch(0.35 0.02 80 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.85 0.10 80 / 0.85), oklch(0.74 0.10 80 / 0.6))",
  },
  {
    id: "x7", name: "Esme F.", zodiac: "♋", sign: "Cancer", concern: "Hormonal Acne",
    duration: "10 weeks",
    quote: "Cycle-related breakouts vanished. Willow bark is my Tuesday witch.",
    productsUsed: ["willow-toner", "cauldron-serum", "moonlight-cleanser"],
    beforeGradient: "linear-gradient(135deg, oklch(0.55 0.18 20 / 0.9), oklch(0.40 0.10 15 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.80 0.06 50 / 0.7), oklch(0.55 0.15 330 / 0.4))",
  },
  {
    id: "x8", name: "Mira S.", zodiac: "♒", sign: "Aquarius", concern: "Combination Texture",
    duration: "9 weeks",
    quote: "T-zone calmed, cheeks plumped. The Scorpio AHA is bold magic.",
    productsUsed: ["scorpio-aha", "selene-moisturizer", "midnight-mask"],
    beforeGradient: "linear-gradient(135deg, oklch(0.45 0.05 290 / 0.9), oklch(0.30 0.05 280 / 0.95))",
    afterGradient: "linear-gradient(135deg, oklch(0.78 0.10 320 / 0.8), oklch(0.55 0.20 350 / 0.5))",
  },
];
