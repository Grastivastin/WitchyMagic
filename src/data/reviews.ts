export type Review = {
  id: string;
  productId: string;
  author: string;
  zodiac: string;
  sign: string;
  rating: number;
  title: string;
  body: string;
  skinType: string;
  duration: string;
  helpful: number;
  verified: boolean;
};

export const reviews: Review[] = [
  { id: "r1", productId: "cauldron-serum", author: "Aria N.", zodiac: "♌", sign: "Leo", rating: 5, title: "Real magic for acne", body: "Cleared cystic breakouts in 14 days. Never going back.", skinType: "Oily", duration: "3 months", helpful: 247, verified: true },
  { id: "r2", productId: "moonlight-cleanser", author: "Esme F.", zodiac: "♋", sign: "Cancer", rating: 5, title: "Gentlest cleanser I've owned", body: "Doesn't strip. pH-balanced. My reactive skin is calm.", skinType: "Sensitive", duration: "6 months", helpful: 189, verified: true },
  { id: "r3", productId: "venus-vitc", author: "Maya R.", zodiac: "♈", sign: "Aries", rating: 5, title: "Sun spots are fading", body: "8 weeks in, dark spots from last summer are visibly lighter.", skinType: "Combination", duration: "8 weeks", helpful: 156, verified: true },
  { id: "r4", productId: "wolfsbane-spf", author: "Nova T.", zodiac: "♍", sign: "Virgo", rating: 5, title: "Mineral SPF that actually disappears", body: "No white cast on medium-deep skin. Tinted version is genius.", skinType: "All", duration: "5 months", helpful: 312, verified: true },
  { id: "r5", productId: "phoenix-retinol", author: "Vera C.", zodiac: "♑", sign: "Capricorn", rating: 5, title: "Worth the slow start", body: "Took 6 weeks to acclimate. Now my skin looks like glass.", skinType: "Mature", duration: "16 weeks", helpful: 98, verified: true },
  { id: "r6", productId: "selene-moisturizer", author: "Lyra P.", zodiac: "♓", sign: "Pisces", rating: 5, title: "72-hour hydration is real", body: "I can skip a day and still feel hydrated. Ceramides are no joke.", skinType: "Dry", duration: "4 months", helpful: 134, verified: true },
  { id: "r7", productId: "midnight-mask", author: "Selene V.", zodiac: "♏", sign: "Scorpio", rating: 5, title: "Wake up plump", body: "Snail mucin convert. My morning face is a different texture.", skinType: "Normal", duration: "5 months", helpful: 201, verified: true },
  { id: "r8", productId: "rose-quartz-mist", author: "Iris D.", zodiac: "♎", sign: "Libra", rating: 4, title: "My desk companion", body: "Sets my makeup, refreshes mid-day, smells like a garden.", skinType: "All", duration: "6 months", helpful: 87, verified: true },
  { id: "r9", productId: "amethyst-eye-cream", author: "Juno H.", zodiac: "♐", sign: "Sagittarius", rating: 4, title: "Depuffs in minutes", body: "Caffeine works fast. Dark circles need longer but improving.", skinType: "All", duration: "8 weeks", helpful: 76, verified: true },
  { id: "r10", productId: "scorpio-aha", author: "Mira S.", zodiac: "♒", sign: "Aquarius", rating: 5, title: "Glycolic done right", body: "No tingle, real resurfacing. Twice a week, transformed.", skinType: "Combination", duration: "9 weeks", helpful: 145, verified: true },
  { id: "r11", productId: "starfire-lipstick", author: "Cleo W.", zodiac: "♊", sign: "Gemini", rating: 5, title: "Doesn't dry my lips", body: "Velvet matte that doesn't crack. Comfortable 8 hours.", skinType: "All", duration: "3 months", helpful: 122, verified: true },
  { id: "r12", productId: "ember-blush", author: "Roza K.", zodiac: "♉", sign: "Taurus", rating: 5, title: "Adapts to my skin", body: "Comes out a different pink each time. Fascinating.", skinType: "All", duration: "2 months", helpful: 64, verified: true },
  { id: "r13", productId: "obsidian-mask", author: "Selene V.", zodiac: "♏", sign: "Scorpio", rating: 4, title: "Detox Sundays", body: "Pulls out blackheads I didn't know I had. Use weekly.", skinType: "Oily", duration: "3 months", helpful: 89, verified: true },
  { id: "r14", productId: "sage-cleanser", author: "Aria N.", zodiac: "♌", sign: "Leo", rating: 5, title: "Pairs with Cauldron", body: "AM cleanse + serum, my acne routine. Works.", skinType: "Oily", duration: "3 months", helpful: 178, verified: true },
  { id: "r15", productId: "lunar-pads", author: "Mira S.", zodiac: "♒", sign: "Aquarius", rating: 5, title: "Easy ritual", body: "One pad, three nights a week. Texture transformed.", skinType: "Combination", duration: "10 weeks", helpful: 167, verified: true },
  { id: "r16", productId: "elixir-essence", author: "Maya R.", zodiac: "♈", sign: "Aries", rating: 5, title: "Tranexamic acid works", body: "Melasma I'd given up on is finally fading.", skinType: "Combination", duration: "12 weeks", helpful: 234, verified: true },
  { id: "r17", productId: "midnight-oil", author: "Vera C.", zodiac: "♑", sign: "Capricorn", rating: 5, title: "Bakuchiol with no irritation", body: "All retinol benefits, none of the peeling.", skinType: "Mature", duration: "10 weeks", helpful: 154, verified: true },
  { id: "r18", productId: "moonstone-toner", author: "Iris D.", zodiac: "♎", sign: "Libra", rating: 5, title: "Mandelic for the win", body: "Sensitive AHA option that actually works.", skinType: "Sensitive", duration: "8 weeks", helpful: 98, verified: true },
  { id: "r19", productId: "willow-toner", author: "Esme F.", zodiac: "♋", sign: "Cancer", rating: 4, title: "Natural BHA", body: "Salicin is gentler than my old BHA, same results.", skinType: "Combination", duration: "5 months", helpful: 67, verified: true },
  { id: "r20", productId: "thorn-balm", author: "Lyra P.", zodiac: "♓", sign: "Pisces", rating: 5, title: "Healed cracked lips", body: "Manuka honey is no joke. Healed overnight.", skinType: "Sensitive", duration: "1 month", helpful: 88, verified: true },
  { id: "r21", productId: "cosmic-eyeshadow", author: "Cleo W.", zodiac: "♊", sign: "Gemini", rating: 5, title: "Buttery payoff", body: "12 shades that actually all get used. Travel friendly.", skinType: "All", duration: "4 months", helpful: 145, verified: true },
  { id: "r22", productId: "blackmoon-perfume", author: "Selene V.", zodiac: "♏", sign: "Scorpio", rating: 5, title: "Signature scent", body: "Strangers ask. The oud + rose combo is unforgettable.", skinType: "All", duration: "6 months", helpful: 112, verified: true },
  { id: "r23", productId: "raven-mascara", author: "Aria N.", zodiac: "♌", sign: "Leo", rating: 5, title: "No clumps, no smudge", body: "10-hour wear, lashes feel conditioned not crispy.", skinType: "All", duration: "2 months", helpful: 98, verified: true },
  { id: "r24", productId: "raven-liner", author: "Mira S.", zodiac: "♒", sign: "Aquarius", rating: 5, title: "Felt-tip precision", body: "Drew a wing, kept it through a workout. 12 hours.", skinType: "All", duration: "3 months", helpful: 76, verified: true },
  { id: "r25", productId: "moonlight-cleanser", author: "Vera C.", zodiac: "♑", sign: "Capricorn", rating: 4, title: "Solid AM cleanser", body: "Melts SPF and sebum without stripping. Gentle daily.", skinType: "Normal", duration: "3 months", helpful: 54, verified: true },
  { id: "r26", productId: "venus-vitc", author: "Cleo W.", zodiac: "♊", sign: "Gemini", rating: 5, title: "The Duke cocktail delivers", body: "15% L-AA + Vit E + ferulic = real photoprotection.", skinType: "Combination", duration: "5 months", helpful: 187, verified: true },
  { id: "r27", productId: "selene-moisturizer", author: "Maya R.", zodiac: "♈", sign: "Aries", rating: 5, title: "Ceramide stack", body: "1, 3, 6-II — the trio your skin makes. It works.", skinType: "Dry", duration: "4 months", helpful: 134, verified: true },
  { id: "r28", productId: "midnight-oil", author: "Iris D.", zodiac: "♎", sign: "Libra", rating: 5, title: "Squalane absorbs perfectly", body: "Mimics skin's own sebum, layers under everything.", skinType: "Combination", duration: "3 months", helpful: 92, verified: true },
  { id: "r29", productId: "obsidian-mask", author: "Roza K.", zodiac: "♉", sign: "Taurus", rating: 4, title: "Deep clean ritual", body: "Once a week for me. Pores stay refined between uses.", skinType: "Oily", duration: "2 months", helpful: 65, verified: true },
  { id: "r30", productId: "phoenix-retinol", author: "Esme F.", zodiac: "♋", sign: "Cancer", rating: 4, title: "Patient witch wins", body: "Slow ramp-up. Worth it. Skin smoother by week 8.", skinType: "Sensitive", duration: "12 weeks", helpful: 89, verified: true },
];
