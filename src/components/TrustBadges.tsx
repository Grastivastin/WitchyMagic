import { ShieldCheck, Leaf, Sparkles, FlaskConical, Award } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Dermatologist Tested" },
  { icon: Leaf, label: "Cruelty-Free (PETA)" },
  { icon: Sparkles, label: "Clean Beauty Certified" },
  { icon: FlaskConical, label: "Hypoallergenic" },
  { icon: Award, label: "Best Beauty Innovation 2025" },
];

/** Rose glyph divider — small gold-and-pink rose between badges */
function RoseGlyph() {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className="shrink-0 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="9" cy="9" r="3.4" fill="oklch(0.66 0.30 0 / 0.7)" stroke="currentColor" />
      <circle cx="9" cy="9" r="1.6" fill="oklch(0.93 0.04 85)" stroke="none" />
      <path d="M2 14 l 3 -1 M16 14 l -3 -1" />
    </svg>
  );
}

/** Straight gold rule with rose accents — clean horizontal border */
function GoldRule({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`absolute left-0 right-0 ${flip ? "bottom-0" : "top-0"} flex items-center gap-3 px-2`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/70 to-gold/80" />
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-gold">
        <circle cx="7" cy="7" r="2.6" fill="currentColor" opacity="0.85" />
        <circle cx="7" cy="7" r="1.1" fill="oklch(0.66 0.30 0 / 0.85)" />
      </svg>
      <span className="h-px flex-1 bg-gold/80" />
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="text-gold">
        <circle cx="7" cy="7" r="2.6" fill="currentColor" opacity="0.85" />
        <circle cx="7" cy="7" r="1.1" fill="oklch(0.66 0.30 0 / 0.85)" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/70 to-gold/80" />
    </div>
  );
}

export function TrustBadges() {
  return (
    <div className="relative py-10">
      <GoldRule />
      <GoldRule flip />

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4">
        {BADGES.map(({ icon: Icon, label }, idx) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <Icon
                size={18}
                className="text-gold drop-shadow-[0_0_6px_oklch(0.74_0.10_80_/_0.7)]"
              />
              <span
                className="font-display text-[12px] md:text-[13px] uppercase tracking-[0.32em] text-cream font-medium"
                style={{
                  textShadow:
                    "0 0 10px oklch(0.74 0.10 80 / 0.45), 0 0 18px oklch(0.66 0.30 0 / 0.18)",
                }}
              >
                {label}
              </span>
            </div>
            {idx < BADGES.length - 1 && <RoseGlyph />}
          </div>
        ))}
      </div>
    </div>
  );
}
