export type TeamMember = {
  name: string;
  title: string;
  zodiac: string;
  sign: string;
  bio: string;
  initials: string;
  gradient: string;
};

const G = {
  pink: "linear-gradient(135deg, oklch(0.66 0.30 0 / 0.7), oklch(0.27 0.10 330))",
  purple: "linear-gradient(135deg, oklch(0.27 0.10 330), oklch(0.24 0.10 295))",
  gold: "linear-gradient(135deg, oklch(0.74 0.10 80 / 0.7), oklch(0.27 0.10 330))",
  rose: "linear-gradient(135deg, oklch(0.74 0.22 350 / 0.7), oklch(0.24 0.10 295))",
};

export const team: TeamMember[] = [
  { name: "Selene Voss", title: "Chief Alchemist", zodiac: "♏", sign: "Scorpio",
    bio: "15 years formulating peer-reviewed actives. Believes the best skincare reads like a spell and works like a clinical study.",
    initials: "SV", gradient: G.purple },
  { name: "Sashank Peddada", title: "Cosmic Formulations Director", zodiac: "♓", sign: "Pisces",
    bio: "Bridges ancient herbal apothecary with modern dermatology. Speaks four languages of skin.",
    initials: "SP", gradient: G.pink },
  { name: "Mira Solis", title: "Head of Rituals & Education", zodiac: "♌", sign: "Leo",
    bio: "Translates lab to ritual. If a routine is too complicated to remember, it doesn't get used.",
    initials: "MS", gradient: G.gold },
  { name: "Lyra Wynter", title: "Sustainability & Sourcing", zodiac: "♎", sign: "Libra",
    bio: "Sources every ingredient with provenance, ethics, and reverence for the earth.",
    initials: "LW", gradient: G.rose },
];

export type Expert = {
  name: string;
  title: string;
  credentials: string[];
  specialties: string[];
  rating: number;
  sessions: number;
  price: number;
  initials: string;
  gradient: string;
  endorsement: string;
};

export const experts: Expert[] = [
  { name: "Dr. Priya Sharma, MD", title: "Director, Clinical Dermatology Institute",
    credentials: ["Board-certified dermatologist", "Published 12+ peer-reviewed studies", "15+ years clinical practice"],
    specialties: ["Acne", "Hyperpigmentation", "Sensitive skin"], rating: 4.9, sessions: 156, price: 2499,
    initials: "PS", gradient: G.pink,
    endorsement: "I recommend Witchy Magic because their formulations are evidence-based, transparent, and effective for sensitive skin." },
  { name: "Dr. Kavya Iyer, MD", title: "Cosmetic Dermatologist",
    credentials: ["FAAD certified", "Specialist in melanin-rich skin", "10+ years"],
    specialties: ["Pigmentation", "Anti-aging", "Procedure-supported routines"], rating: 4.8, sessions: 92, price: 2999,
    initials: "KI", gradient: G.gold,
    endorsement: "Skincare with respect for skin tone diversity. The tranexamic acid formulations work for darker skin without irritation." },
  { name: "Dr. Maya Reyes, MD", title: "Pediatric & Hormonal Dermatology",
    credentials: ["MD Pediatric Dermatology", "Hormonal acne specialist", "8+ years"],
    specialties: ["Hormonal acne", "Teen & adult acne", "Cycle-aware skincare"], rating: 5.0, sessions: 67, price: 1999,
    initials: "MR", gradient: G.rose,
    endorsement: "Cycle-aware skincare is overdue. Witchy Magic's zodiac framework is poetic but their derm science is real." },
];
