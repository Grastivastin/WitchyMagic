export type Testimonial = {
  id: string;
  name: string;
  initials: string;
  zodiac: string; // glyph
  sign: string;
  rating: number;
  quote: string;
  duration: string;
  concern: string;
  avatarGradient: string;
};

const G = {
  pink: "linear-gradient(135deg, oklch(0.66 0.30 0 / 0.7), oklch(0.27 0.10 330))",
  purple: "linear-gradient(135deg, oklch(0.27 0.10 330), oklch(0.24 0.10 295))",
  gold: "linear-gradient(135deg, oklch(0.74 0.10 80 / 0.7), oklch(0.27 0.10 330))",
  rose: "linear-gradient(135deg, oklch(0.74 0.22 350 / 0.7), oklch(0.24 0.10 295))",
};

export const testimonials: Testimonial[] = [
  { id: "t1", name: "Aria N.", initials: "AN", zodiac: "♌", sign: "Leo", rating: 5, quote: "Acne-prone skin cleared in two weeks. The Cauldron serum is real magic.", duration: "3 months", concern: "Acne · inflammation", avatarGradient: G.pink },
  { id: "t2", name: "Selene V.", initials: "SV", zodiac: "♏", sign: "Scorpio", rating: 5, quote: "My skin finally drinks. The hydration ritual is everything.", duration: "5 months", concern: "Dryness · barrier", avatarGradient: G.purple },
  { id: "t3", name: "Maya R.", initials: "MR", zodiac: "♈", sign: "Aries", rating: 5, quote: "Sun spots faded in 8 weeks with the Venus Vit C + Wolfsbane SPF combo.", duration: "8 weeks", concern: "Pigmentation", avatarGradient: G.gold },
  { id: "t4", name: "Iris D.", initials: "ID", zodiac: "♎", sign: "Libra", rating: 5, quote: "The rose mist is my Venus moment. I keep one in every bag.", duration: "6 months", concern: "Dullness", avatarGradient: G.rose },
  { id: "t5", name: "Lyra P.", initials: "LP", zodiac: "♓", sign: "Pisces", rating: 5, quote: "Sensitive skin warrior here — Selene cream finally calmed me.", duration: "4 months", concern: "Sensitivity", avatarGradient: G.purple },
  { id: "t6", name: "Roza K.", initials: "RK", zodiac: "♉", sign: "Taurus", rating: 4, quote: "The Phoenix retinol works without the burn. Took 8 weeks but worth it.", duration: "10 weeks", concern: "Fine lines", avatarGradient: G.pink },
  { id: "t7", name: "Nova T.", initials: "NT", zodiac: "♍", sign: "Virgo", rating: 5, quote: "Methodical witch here — every ingredient checks out. Trust earned.", duration: "1 year", concern: "Texture", avatarGradient: G.gold },
  { id: "t8", name: "Esme F.", initials: "EF", zodiac: "♋", sign: "Cancer", rating: 5, quote: "Moonlight cleanser respects my mood-skin like nothing else has.", duration: "6 months", concern: "Sensitivity", avatarGradient: G.rose },
  { id: "t9", name: "Vera C.", initials: "VC", zodiac: "♑", sign: "Capricorn", rating: 5, quote: "I needed proof. The before/after on my 11s sold me.", duration: "12 weeks", concern: "Aging", avatarGradient: G.purple },
  { id: "t10", name: "Juno H.", initials: "JH", zodiac: "♐", sign: "Sagittarius", rating: 4, quote: "Travel-friendly minis saved my skin in 6 climates. Real talk.", duration: "3 months", concern: "Dehydration", avatarGradient: G.gold },
  { id: "t11", name: "Mira S.", initials: "MS", zodiac: "♒", sign: "Aquarius", rating: 5, quote: "AHA pads on Tuesdays, retinol on Fridays — my whole texture flipped.", duration: "4 months", concern: "Texture", avatarGradient: G.pink },
  { id: "t12", name: "Cleo W.", initials: "CW", zodiac: "♊", sign: "Gemini", rating: 5, quote: "Two faces, two routines, one brand. They get me.", duration: "5 months", concern: "Combination", avatarGradient: G.rose },
];
