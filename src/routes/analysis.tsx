import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { WitchAnalysisFigure } from "@/components/WitchAnalysisFigure";
import { TarotCard } from "@/components/TarotCard";
import { NeonButton, NeonLink } from "@/components/NeonButton";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Skin Analysis — Witchy Magic" },
      { name: "description", content: "A 60-second cosmic skin analysis. Discover your archetype and receive your personalized formulary." },
      { property: "og:title", content: "Skin Analysis — Discover Your Cosmic Archetype" },
      { property: "og:description", content: "AI-powered skin analysis grounded in dermatology and astrology." },
    ],
  }),
  component: AnalysisPage,
});

const QUESTIONS = [
  {
    q: "What is your sun sign?",
    options: ["♈ Aries", "♉ Taurus", "♊ Gemini", "♋ Cancer", "♌ Leo", "♍ Virgo", "♎ Libra", "♏ Scorpio", "♐ Sagittarius", "♑ Capricorn", "♒ Aquarius", "♓ Pisces"],
  },
  {
    q: "How does your skin feel by midday?",
    options: ["Tight & parched (Dry)", "Shiny in the T-zone (Combination)", "Oily across (Oily)", "Calm & balanced (Normal)", "Reactive & easily flushed (Sensitive)"],
  },
  {
    q: "What concern haunts you most?",
    options: ["Acne & breakouts", "Hyperpigmentation & dark spots", "Fine lines & loss of firmness", "Dryness & dehydration", "Redness & sensitivity", "Dullness & uneven texture"],
  },
  {
    q: "How would you describe your current ritual?",
    options: ["Devout (5+ steps, AM & PM)", "Steady (3-4 steps daily)", "Minimal (cleanser + moisturizer)", "Inconsistent — I want to begin again"],
  },
  {
    q: "Which element calls to you?",
    options: ["🜂 Fire — bold, transformative", "🜄 Water — gentle, hydrating", "🜁 Air — light, clarifying", "🜃 Earth — grounding, restorative"],
  },
];

const ARCHETYPES = [
  { name: "The Mystic Healer", element: "Water 🜄", traits: "Sensitive · Restorative · Barrier-first", potion: "Selene Moisturizer + Moonlight Cleanser" },
  { name: "The Phoenix", element: "Fire 🜂", traits: "Transformative · Resurfacing · Bold", potion: "Phoenix Retinol + Scorpio AHA" },
  { name: "The Oracle", element: "Air 🜁", traits: "Brightening · Clarifying · Luminous", potion: "Venus Vit C + Rose Quartz Mist" },
  { name: "The High Priestess", element: "Earth 🜃", traits: "Grounding · Balancing · Resilient", potion: "Cauldron Serum + Sage Cleanser" },
];

function AnalysisPage() {
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

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ The Reading ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">Your Cosmic Skin Analysis</h1>
          <p className="mt-4 text-cream-dim max-w-xl mx-auto">
            Answer five questions. Receive your archetype, your elemental match, and your personalized formulary.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            {!done ? (
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
            ) : (
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
            )}
          </div>

          <div className="order-1 lg:order-2">
            <WitchAnalysisFigure />
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs text-cream-dim">
            Want to go deeper? <Link to="/consultation" className="text-neon-pink hover:underline">Book a 1:1 reading with a dermatologist →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
