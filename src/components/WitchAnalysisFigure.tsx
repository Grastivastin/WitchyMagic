import witchImg from "@/assets/analysis-witch.png";

const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏"];

/** Skin Analysis / Results witch figure with breathing, crystal-ball pulse, zodiac twinkle, drift particles */
export function WitchAnalysisFigure() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* ambient halo */}
      <div
        aria-hidden
        className="anim-halo-slow absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.66 0.30 0 / 0.5), oklch(0.27 0.10 330 / 0.3) 50%, transparent 75%)",
        }}
      />

      {/* witch — breathing */}
      <img
        src={witchImg}
        alt="Mystical witch holding a glowing pink crystal ball, surrounded by zodiac symbols"
        className="anim-breathe relative z-10 h-full w-full object-contain"
      />

      {/* crystal ball glow overlay */}
      <div
        aria-hidden
        className="anim-orb absolute z-20 rounded-full blur-2xl"
        style={{
          left: "50%",
          top: "58%",
          width: "32%",
          height: "32%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, oklch(0.74 0.22 350 / 0.95), oklch(0.66 0.30 0 / 0.6) 40%, transparent 75%)",
        }}
      />

      {/* zodiac twinkle ring */}
      <div aria-hidden className="absolute inset-0 z-30">
        {ZODIAC.map((g, i) => {
          const angle = (i / ZODIAC.length) * Math.PI * 2 - Math.PI / 2;
          const r = 46;
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          return (
            <span
              key={g}
              className="anim-twinkle absolute font-display text-xl text-gold"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
                animationDelay: `${(i * 0.35) % 2.6}s`,
                textShadow: "0 0 10px #ff1493",
              }}
            >
              {g}
            </span>
          );
        })}
      </div>

      {/* rising particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => {
          const left = 20 + Math.random() * 60;
          return (
            <span
              key={i}
              className="anim-drift absolute bottom-0 rounded-full"
              style={{
                left: `${left}%`,
                width: 3 + Math.random() * 2,
                height: 3 + Math.random() * 2,
                background: i % 2 === 0 ? "#ff1493" : "#ff69b4",
                boxShadow: "0 0 8px #ff1493",
                animationDelay: `${i * 0.7}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
