import { ShieldCheck, Leaf, Sparkles, FlaskConical, Award } from "lucide-react";

const BADGES = [
  { icon: ShieldCheck, label: "Dermatologist Tested" },
  { icon: Leaf, label: "Cruelty-Free (PETA)" },
  { icon: Sparkles, label: "Clean Beauty Certified" },
  { icon: FlaskConical, label: "Hypoallergenic" },
  { icon: Award, label: "Best Beauty Innovation 2025" },
];

/** Thorny rose divider — small SVG sprig used between badges */
function ThornDivider() {
  return (
    <svg
      aria-hidden
      width="28"
      height="14"
      viewBox="0 0 28 14"
      className="text-neon-pink/80 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <path d="M2 7 Q 7 1, 14 7 T 26 7" />
      <path d="M5 7 l -2 -3" />
      <path d="M9 5 l 1 -3" />
      <path d="M19 5 l 1 -3" />
      <path d="M23 7 l 2 -3" />
      <circle cx="14" cy="7" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function TrustBadges() {
  return (
    <div className="relative py-10">
      {/* thorny vine top border */}
      <svg
        aria-hidden
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-3 text-gold/70"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 6 Q 100 0, 200 6 T 400 6 T 600 6 T 800 6 T 1000 6 T 1200 6" />
        <path d="M150 6 l -6 -5 M250 6 l 6 -5 M450 6 l -6 -5 M550 6 l 6 -5 M750 6 l -6 -5 M850 6 l 6 -5 M1050 6 l -6 -5" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 1200 12"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-3 text-gold/70 rotate-180"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M0 6 Q 100 0, 200 6 T 400 6 T 600 6 T 800 6 T 1000 6 T 1200 6" />
        <path d="M150 6 l -6 -5 M250 6 l 6 -5 M450 6 l -6 -5 M550 6 l 6 -5 M750 6 l -6 -5 M850 6 l 6 -5 M1050 6 l -6 -5" />
      </svg>

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
