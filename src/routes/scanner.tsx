import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScanFace, Camera, Sparkles, X } from "lucide-react";
import { TarotCard } from "@/components/TarotCard";
import { NeonLink } from "@/components/NeonButton";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/scanner")({
  head: () => ({
    meta: [
      { title: "AR Face Scanner — Witchy Magic" },
      { name: "description", content: "Live AR face scanner. Hold the camera to your face and the oracle reads your skin in real time — concerns mapped, products matched." },
      { property: "og:title", content: "AR Face Scanner — Witchy Magic" },
      { property: "og:description", content: "Real-time AR skin scan. Concerns detected, rituals prescribed." },
    ],
  }),
  component: ScannerPage,
});

type Reading = {
  archetype: string;
  glyph: string;
  concerns: { label: string; score: number }[];
  matched: string[];
};

const DEMO_READING: Reading = {
  archetype: "The Moonlit Oracle",
  glyph: "☾",
  concerns: [
    { label: "Hydration deficit", score: 72 },
    { label: "Pigmentation pockets", score: 48 },
    { label: "Pore congestion (T-zone)", score: 36 },
    { label: "Fine lines · expression zones", score: 24 },
  ],
  matched: ["cauldron-serum", "selene-moisturizer", "venus-vitc", "wolfsbane-spf"],
};

function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  async function startCamera() {
    setError(null);
    setReading(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch (e) {
      setError("Camera access denied or unavailable. This is a demo — try on a device with a camera and grant permission.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  }

  function runScan() {
    setScanning(true);
    setReading(null);
    setTimeout(() => {
      setScanning(false);
      setReading(DEMO_READING);
    }, 3200);
  }

  const matched = reading
    ? products.filter((p) => reading.matched.includes(p.id))
    : [];

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HERO */}
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">
            ✦ Live Augmented Reality ✦
          </p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">
            The <span className="italic text-neon-pink text-glow-pink">AR Face Scanner</span>
          </h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            Hold your gaze to the lens. The oracle traces your skin in real time —
            mapping hydration, pigmentation, pores, and texture, then conjuring your formulary.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-gold/80">
            Demo simulation — for showcase only. No biometric data is stored.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* SCANNER STAGE */}
          <div className="tarot-border ornament-corners rounded-sm p-4 md:p-6">
            <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-bg-black border border-neon-pink/30">
              <video
                ref={videoRef}
                playsInline
                muted
                className={`h-full w-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
                style={{ transform: "scaleX(-1)" }}
              />

              {!active && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                  <ScanFace size={56} className="text-neon-pink anim-twinkle" />
                  <p className="font-display text-2xl text-cream">Awaken the Mirror</p>
                  <p className="text-xs text-cream-dim max-w-xs">
                    Grant camera access to begin your reading. The scanner runs entirely in your browser.
                  </p>
                  <button
                    onClick={startCamera}
                    className="mt-2 inline-flex items-center gap-2 border border-neon-pink bg-neon-pink/10 px-6 py-3 font-body text-[11px] uppercase tracking-[0.3em] text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_24px_oklch(0.66_0.30_0_/_0.7)] transition-all"
                  >
                    <Camera size={14} /> Start Camera
                  </button>
                  {error && <p className="text-xs text-destructive max-w-xs">{error}</p>}
                </div>
              )}

              {/* AR overlay */}
              {active && (
                <>
                  <ScanOverlay scanning={scanning} />
                  <button
                    onClick={stopCamera}
                    aria-label="Stop camera"
                    className="absolute top-3 right-3 z-30 rounded-full bg-bg-black/80 border border-gold/40 p-2 text-cream-dim hover:text-neon-pink"
                  >
                    <X size={14} />
                  </button>
                </>
              )}
            </div>

            {active && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
                  {scanning ? "Reading the cosmos…" : reading ? "Reading complete." : "Ready."}
                </p>
                <button
                  onClick={runScan}
                  disabled={scanning}
                  className="inline-flex items-center gap-2 border border-neon-pink bg-neon-pink/10 px-5 py-2.5 font-body text-[10px] uppercase tracking-[0.3em] text-neon-pink hover:bg-neon-pink/20 disabled:opacity-50 transition-all"
                >
                  <Sparkles size={12} /> {scanning ? "Scanning…" : "Scan My Skin"}
                </button>
              </div>
            )}
          </div>

          {/* RESULTS */}
          <div className="space-y-6">
            <TarotCard>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your Archetype</p>
              <h2 className="mt-2 font-display text-3xl text-cream">
                {reading ? `${reading.glyph} ${reading.archetype}` : "☾ Awaiting reading…"}
              </h2>
              <p className="mt-3 text-sm text-cream-dim">
                {reading
                  ? "Your skin's signature has been mapped against our 12 cosmic archetypes. Concerns are scored 0–100 by visible severity."
                  : "Start the camera and run a scan to reveal your skin's elemental archetype and detected concerns."}
              </p>

              {reading && (
                <ul className="mt-5 space-y-3">
                  {reading.concerns.map((c) => (
                    <li key={c.label}>
                      <div className="flex items-center justify-between text-xs text-cream-dim">
                        <span>{c.label}</span>
                        <span className="text-neon-pink">{c.score}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-deep-purple/60">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-neon-pink to-magenta-soft glow-pink"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </TarotCard>

            <TarotCard>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Privacy Spell</p>
              <p className="mt-2 text-xs text-cream-dim leading-relaxed">
                Video never leaves your device. No frames are uploaded, stored, or analyzed on any server. This is a demo simulation — readings shown are illustrative.
              </p>
            </TarotCard>
          </div>
        </div>

        {/* MATCHED PRODUCTS */}
        {reading && matched.length > 0 && (
          <section className="mt-20">
            <div className="text-center">
              <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Conjured For You ✦</p>
              <h2 className="mt-3 font-display text-4xl text-cream">Your Prescribed Formulary</h2>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {matched.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-10 text-center">
              <NeonLink to="/recommendations" variant="outline">Explore Full Apothecary →</NeonLink>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ScanOverlay({ scanning }: { scanning: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* face oval guide */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <ellipse
          cx="50" cy="50" rx="28" ry="36"
          fill="none"
          stroke="oklch(0.66 0.30 0)"
          strokeWidth="0.3"
          strokeDasharray="2 1.5"
          opacity="0.85"
        />
        <ellipse
          cx="50" cy="50" rx="28" ry="36"
          fill="none"
          stroke="oklch(0.74 0.10 80)"
          strokeWidth="0.15"
          opacity="0.6"
        />
      </svg>

      {/* scanning line */}
      {scanning && (
        <div
          className="absolute left-[22%] right-[22%] h-[2px]"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.66 0.30 0 / 0.95), transparent)",
            boxShadow: "0 0 24px oklch(0.66 0.30 0 / 0.9)",
            animation: "scan-sweep 1.6s ease-in-out infinite",
            top: "14%",
          }}
        />
      )}

      {/* corner brackets */}
      {[
        { t: 8, l: 8, br: "br" },
        { t: 8, r: 8, bl: "bl" },
        { b: 8, l: 8, tr: "tr" },
        { b: 8, r: 8, tl: "tl" },
      ].map((c, i) => (
        <span
          key={i}
          className="absolute h-5 w-5 border-neon-pink"
          style={{
            top: c.t !== undefined ? `${c.t}%` : undefined,
            bottom: c.b !== undefined ? `${c.b}%` : undefined,
            left: c.l !== undefined ? `${c.l}%` : undefined,
            right: c.r !== undefined ? `${c.r}%` : undefined,
            borderTopWidth: c.t !== undefined ? 2 : 0,
            borderBottomWidth: c.b !== undefined ? 2 : 0,
            borderLeftWidth: c.l !== undefined ? 2 : 0,
            borderRightWidth: c.r !== undefined ? 2 : 0,
            boxShadow: "0 0 10px oklch(0.66 0.30 0 / 0.7)",
          }}
        />
      ))}

      {/* concern markers when scanning */}
      {scanning && (
        <>
          {[
            { top: "32%", left: "38%", label: "T-zone" },
            { top: "55%", left: "30%", label: "Cheek" },
            { top: "55%", left: "66%", label: "Cheek" },
            { top: "72%", left: "50%", label: "Chin" },
          ].map((m, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 anim-twinkle"
              style={{ top: m.top, left: m.left, animationDelay: `${i * 0.25}s` }}
            >
              <span className="block h-3 w-3 rounded-full bg-neon-pink shadow-[0_0_18px_oklch(0.66_0.30_0)]" />
              <span className="absolute left-4 top-0 text-[9px] uppercase tracking-[0.2em] text-cream font-body whitespace-nowrap"
                style={{ textShadow: "0 0 8px oklch(0.12 0.012 30)" }}>
                {m.label}
              </span>
            </span>
          ))}
        </>
      )}
    </div>
  );
}
