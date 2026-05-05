import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ScanFace, Camera, Sparkles, X, Loader2 } from "lucide-react";
import { TarotCard } from "@/components/TarotCard";
import { WitchAnalysisFigure } from "@/components/WitchAnalysisFigure";
import { NeonButton, NeonLink } from "@/components/NeonButton";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { ingredients } from "@/data/ingredients";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/mirror")({
  head: () => ({
    meta: [
      { title: "The Mirror — AI Skin Reading & AR Scanner | Witchy Magic" },
      { name: "description", content: "The Mirror: a 60-second cosmic skin analysis plus a live AI-powered AR face scan that detects skin concerns and prescribes ingredients from our Grimoire." },
      { property: "og:title", content: "The Mirror — Skin Analysis + AR Scanner" },
      { property: "og:description", content: "AI-powered skin reading. Detect concerns, learn the cause, and receive ingredient + product prescriptions." },
    ],
  }),
  component: MirrorPage,
});

const QUESTIONS = [
  { q: "What is your sun sign?", options: ["♈ Aries", "♉ Taurus", "♊ Gemini", "♋ Cancer", "♌ Leo", "♍ Virgo", "♎ Libra", "♏ Scorpio", "♐ Sagittarius", "♑ Capricorn", "♒ Aquarius", "♓ Pisces"] },
  { q: "How does your skin feel by midday?", options: ["Tight & parched (Dry)", "Shiny in the T-zone (Combination)", "Oily across (Oily)", "Calm & balanced (Normal)", "Reactive & easily flushed (Sensitive)"] },
  { q: "What concern haunts you most?", options: ["Acne & breakouts", "Hyperpigmentation & dark spots", "Fine lines & loss of firmness", "Dryness & dehydration", "Redness & sensitivity", "Dullness & uneven texture"] },
  { q: "How would you describe your current ritual?", options: ["Devout (5+ steps, AM & PM)", "Steady (3-4 steps daily)", "Minimal (cleanser + moisturizer)", "Inconsistent — I want to begin again"] },
  { q: "Which element calls to you?", options: ["🜂 Fire — bold, transformative", "🜄 Water — gentle, hydrating", "🜁 Air — light, clarifying", "🜃 Earth — grounding, restorative"] },
];

const ARCHETYPES = [
  { name: "The Mystic Healer", element: "Water 🜄", traits: "Sensitive · Restorative · Barrier-first", potion: "Selene Moisturizer + Moonlight Cleanser" },
  { name: "The Phoenix", element: "Fire 🜂", traits: "Transformative · Resurfacing · Bold", potion: "Phoenix Retinol + Scorpio AHA" },
  { name: "The Oracle", element: "Air 🜁", traits: "Brightening · Clarifying · Luminous", potion: "Venus Vit C + Rose Quartz Mist" },
  { name: "The High Priestess", element: "Earth 🜃", traits: "Grounding · Balancing · Resilient", potion: "Cauldron Serum + Sage Cleanser" },
];

type AIFinding = {
  concern: string;
  severity: number; // 0-100
  cause: string;
  ingredientIds: string[];
  productIds: string[];
};

type AIReading = {
  archetype: string;
  glyph: string;
  summary: string;
  findings: AIFinding[];
};

function MirrorPage() {
  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">
            ✦ The Mirror ✦
          </p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">
            Skin Reading <span className="italic text-neon-pink text-glow-pink">&amp;</span> AR Scanner
          </h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            Two oracles, one mirror. Take the cosmic quiz to discover your archetype,
            then hold your gaze to the lens for a real AI skin reading — concerns
            detected, causes explained, ingredients prescribed from the Grimoire.
          </p>
        </div>

        {/* QUIZ + ARCHETYPE FIGURE */}
        <section className="mt-16">
          <SectionLabel>Part I · The Cosmic Reading</SectionLabel>
          <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <Quiz />
            </div>
            <div className="order-1 lg:order-2">
              <WitchAnalysisFigure />
            </div>
          </div>
        </section>

        {/* AR SCANNER */}
        <section className="mt-24">
          <SectionLabel>Part II · The Living Mirror</SectionLabel>
          <ARScanner />
        </section>

        <div className="mt-20 text-center">
          <p className="text-xs text-cream-dim">
            Want to go deeper?{" "}
            <Link to="/consultation" className="text-neon-pink hover:underline">
              Book a 1:1 reading with a dermatologist →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center font-display text-[11px] uppercase tracking-[0.5em] text-gold">
      {children}
    </p>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= QUESTIONS.length;
  const archetype = ARCHETYPES[(answers.length * 7) % ARCHETYPES.length];

  const choose = (opt: string) => {
    setAnswers((a) => [...a, opt]);
    setStep((s) => s + 1);
  };
  const restart = () => {
    setAnswers([]);
    setStep(0);
  };

  if (!done) {
    return (
      <TarotCard>
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
          Step {step + 1} of {QUESTIONS.length}
        </p>
        <div className="mt-2 h-1 w-full bg-bg-black/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-neon-pink glow-pink transition-all duration-500"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <h2 className="mt-6 font-display text-2xl text-cream">{QUESTIONS[step].q}</h2>
        <div className="mt-6 grid gap-2">
          {QUESTIONS[step].options.map((o) => (
            <button
              key={o}
              onClick={() => choose(o)}
              className="w-full text-left border border-gold/30 bg-bg-black/40 px-4 py-3 text-sm text-cream hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.4)] transition-all"
            >
              {o}
            </button>
          ))}
        </div>
      </TarotCard>
    );
  }

  return (
    <TarotCard>
      <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Your Archetype ✦</p>
      <h2 className="mt-3 font-display text-4xl text-cream">{archetype.name}</h2>
      <p className="mt-2 text-gold text-sm">{archetype.element}</p>
      <p className="mt-4 text-sm text-cream-dim">{archetype.traits}</p>
      <div className="mt-6 border-t border-gold/20 pt-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">Your prescribed ritual</p>
        <p className="mt-2 font-display text-lg text-cream">{archetype.potion}</p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <NeonLink to="/recommendations">Speak to The Oracle</NeonLink>
        <NeonButton variant="outline" onClick={restart}>Read Again</NeonButton>
      </div>
    </TarotCard>
  );
}

function ARScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [reading, setReading] = useState<AIReading | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => () => stopCamera(), []);

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
    } catch {
      setError("Camera access denied or unavailable. Grant permission to begin.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  }

  async function runScan() {
    if (!videoRef.current || !canvasRef.current) return;
    setScanning(true);
    setReading(null);
    try {
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext("2d")!;
      // mirror to match user's view
      ctx.translate(c.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const dataUrl = c.toDataURL("image/jpeg", 0.85);

      const { data, error: fnErr } = await supabase.functions.invoke("face-analysis", {
        body: { image: dataUrl },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setReading(data as AIReading);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "The mirror clouded over. Try again.");
    } finally {
      setScanning(false);
    }
  }

  const matchedProductIds = new Set(reading?.findings.flatMap((f) => f.productIds) ?? []);
  const matchedProducts = products.filter((p) => matchedProductIds.has(p.id));

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-sm p-4 md:p-6 border border-gold/30 bg-bg-black/30">
        <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-bg-black border border-neon-pink/30">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`h-full w-full object-cover transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
            style={{ transform: "scaleX(-1)" }}
          />
          <canvas ref={canvasRef} className="hidden" />

          {!active && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
              <ScanFace size={56} className="text-neon-pink anim-twinkle" />
              <p className="font-display text-2xl text-cream">Awaken the Mirror</p>
              <p className="text-xs text-cream-dim max-w-xs">
                Grant camera access. Your image is analyzed once and never stored.
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
              {scanning ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
              {scanning ? "Reading…" : "Scan My Skin"}
            </button>
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="space-y-6">
        <TarotCard>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your Reading</p>
          <h2 className="mt-2 font-display text-3xl text-cream">
            {reading ? `${reading.glyph} ${reading.archetype}` : "☾ Awaiting reading…"}
          </h2>
          <p className="mt-3 text-sm text-cream-dim">
            {reading?.summary ?? "Start the camera and run a scan. Our AI will detect concerns, explain causes, and prescribe ingredients from the Grimoire."}
          </p>
        </TarotCard>

        {reading && reading.findings.length > 0 && (
          <div className="space-y-4">
            {reading.findings.map((f) => {
              const ings = ingredients.filter((i) => f.ingredientIds.includes(i.id));
              return (
                <TarotCard key={f.concern}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-cream">{f.concern}</h3>
                    <span className="text-neon-pink text-sm">{f.severity}</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-deep-purple/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-neon-pink to-magenta-soft glow-pink"
                      style={{ width: `${f.severity}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-cream-dim leading-relaxed">
                    <span className="text-gold">Why:</span> {f.cause}
                  </p>
                  {ings.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold">From the Grimoire</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {ings.map((i) => (
                          <Link
                            key={i.id}
                            to="/grimoire/$ingredientId"
                            params={{ ingredientId: i.id }}
                            className="text-[11px] border border-gold/40 px-2 py-1 text-cream hover:border-neon-pink hover:text-neon-pink"
                          >
                            {i.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </TarotCard>
              );
            })}
          </div>
        )}

        <TarotCard>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Privacy Spell</p>
          <p className="mt-2 text-xs text-cream-dim leading-relaxed">
            One frame is sent securely to our AI oracle for analysis, then discarded. No video, no biometric storage.
          </p>
        </TarotCard>
      </div>

      {reading && matchedProducts.length > 0 && (
        <section className="lg:col-span-2 mt-6">
          <div className="text-center">
            <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Conjured For You ✦</p>
            <h2 className="mt-3 font-display text-3xl text-cream">Your Prescribed Formulary</h2>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {matchedProducts.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="mt-8 text-center">
            <NeonLink to="/recommendations" variant="outline">Explore Full Apothecary →</NeonLink>
          </div>
        </section>
      )}
    </div>
  );
}

function ScanOverlay({ scanning }: { scanning: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <ellipse cx="50" cy="50" rx="28" ry="36" fill="none" stroke="oklch(0.66 0.30 0)" strokeWidth="0.3" strokeDasharray="2 1.5" opacity="0.85" />
        <ellipse cx="50" cy="50" rx="28" ry="36" fill="none" stroke="oklch(0.74 0.10 80)" strokeWidth="0.15" opacity="0.6" />
      </svg>
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
    </div>
  );
}
