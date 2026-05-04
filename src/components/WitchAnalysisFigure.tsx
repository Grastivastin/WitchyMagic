import witchImg from "@/assets/analysis-zodiac-witch.png";

/** Skin Analysis figure — zodiac witch portrait with golden frame, blends into purple bg. */
export function WitchAnalysisFigure() {
  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div
        aria-hidden
        className="anim-halo-slow absolute -inset-6 -z-10 rounded-[40%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.66 0.30 0 / 0.35), oklch(0.27 0.10 330 / 0.28) 50%, transparent 75%)",
        }}
      />
      <figure className="relative tarot-border ornament-corners rounded-sm overflow-hidden bg-deep-purple/30 p-2">
        <img
          src={witchImg}
          alt="Mystical zodiac witch holding a glowing pink crystal ball, surrounded by zodiac symbols"
          loading="lazy"
          className="w-full h-auto block object-contain rounded-sm"
        />
      </figure>
    </div>
  );
}
