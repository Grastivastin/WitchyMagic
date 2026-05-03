import witchImg from "@/assets/analysis-witch.png";

/** Skin Analysis witch figure — image blends into purple bg, golden shining zodiac stars orbit. */
export function WitchAnalysisFigure() {
  const ZODIAC_PATHS = [
    // simple decorative star/sun glyphs as SVG paths so they render as real golden marks
    "M12 2l2.39 7.36H22l-6.18 4.49L18.21 22 12 17.27 5.79 22l2.39-8.15L2 9.36h7.61z",
  ];
  const count = 12;
  return (
    <div className="relative mx-auto w-full max-w-[640px] aspect-square">
      {/* ambient halo */}
      <div
        aria-hidden
        className="anim-halo-slow absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.66 0.30 0 / 0.45), oklch(0.27 0.10 330 / 0.3) 50%, transparent 75%)",
        }}
      />

      {/* witch */}
      <img
        src={witchImg}
        alt="Mystical witch holding a glowing pink crystal ball"
        loading="lazy"
        className="anim-breathe relative z-10 h-full w-full object-contain mix-blend-screen"
        style={{ filter: "drop-shadow(0 0 30px oklch(0.27 0.10 330 / 0.6))" }}
      />

      {/* golden shining zodiac star ring */}
      <div aria-hidden className="absolute inset-0 z-30">
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
          const r = 48;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          return (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className="anim-twinkle absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: 22,
                height: 22,
                transform: "translate(-50%, -50%)",
                animationDelay: `${(i * 0.28) % 3}s`,
                filter:
                  "drop-shadow(0 0 6px #ffd166) drop-shadow(0 0 14px #ff1493)",
              }}
            >
              <defs>
                <linearGradient id={`g${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff2c4" />
                  <stop offset="50%" stopColor="#f5c542" />
                  <stop offset="100%" stopColor="#a8761b" />
                </linearGradient>
              </defs>
              <path d={ZODIAC_PATHS[0]} fill={`url(#g${i})`} stroke="#fff2c4" strokeWidth="0.4" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
