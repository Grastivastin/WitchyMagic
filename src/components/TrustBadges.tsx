import { ShieldCheck, Leaf, Sparkles, FlaskConical, Award } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Dermatologist Tested" },
  { icon: Leaf, label: "Cruelty-Free (PETA)" },
  { icon: Sparkles, label: "Clean Beauty Certified" },
  { icon: FlaskConical, label: "Hypoallergenic" },
  { icon: Award, label: "Best Beauty Innovation 2025" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-8 border-y border-gold/20">
      {BADGES.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 text-cream-dim">
          <Icon size={16} className="text-gold" />
          <span className="text-[10px] uppercase tracking-[0.3em]">{label}</span>
        </div>
      ))}
    </div>
  );
}
