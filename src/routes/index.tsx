import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHero } from "@/components/AnimatedHero";
import { TrustBadges } from "@/components/TrustBadges";
import { TarotCard } from "@/components/TarotCard";
import { NeonLink } from "@/components/NeonButton";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { Sparkles, FlaskConical, Moon, Star, ScanFace } from "lucide-react";
import dermPortrait from "@/assets/derm-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Witchy Magic — Where Dermatology Meets Mysticism" },
      { name: "description", content: "Premium cosmetic boutique. AI skin analysis, clinically-proven actives, and rituals written in the language of the cosmos." },
      { property: "og:title", content: "Witchy Magic — Premium Cosmetic Collection" },
      { property: "og:description", content: "Where dermatology meets mysticism. Discover your skin's elemental archetype." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestSellers = products.slice(0, 4);
  const featuredVoices = testimonials.slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="font-display text-xs uppercase tracking-[0.5em] text-neon-pink text-glow-pink mb-6">
            ✦ A Premium Cosmetic Collection ✦
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.95] tracking-tight">
            Witchy <span className="italic text-neon-pink text-glow-pink">Magic</span>
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-base md:text-lg text-cream-dim leading-relaxed">
            Where peer-reviewed dermatology meets ancient ritual.
            <br className="hidden md:block" />
            Skincare written in the language of the cosmos.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <NeonLink to="/analysis" size="lg">Begin Your Analysis</NeonLink>
            <NeonLink to="/recommendations" variant="outline" size="lg">Meet The Oracle</NeonLink>
          </div>

          <div className="mt-16">
            <AnimatedHero />
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-4 md:px-8">
        <div className="mx-auto max-w-7xl">
          <TrustBadges />
        </div>
      </section>

      {/* THE THREE PILLARS */}
      <section className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="Our Practice" title="Three Pillars of the Craft" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: FlaskConical, title: "Clinical Truth", body: "Every ingredient cited. Every claim peer-reviewed. Dermatologist-formulated, never theatrical." },
              { icon: Moon, title: "Cosmic Knowing", body: "Your zodiac, your cycle, your moon-tide. Ancient wisdom encoded into modern routines." },
              { icon: Sparkles, title: "Ritual Beauty", body: "Skincare as devotion. Slow gestures, intentional breathwork, sacred spaces." },
            ].map(({ icon: Icon, title, body }) => (
              <TarotCard key={title} className="text-center">
                <Icon size={28} className="mx-auto text-neon-pink mb-4" />
                <h3 className="font-display text-2xl text-cream tracking-wide">{title}</h3>
                <p className="mt-3 text-sm text-cream-dim leading-relaxed">{body}</p>
              </TarotCard>
            ))}
          </div>
        </div>
      </section>

      {/* HERO ELIXIRS — premium spotlight */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.5em] text-gold">✦ Featured ✦</p>
              <h2 className="mt-2 font-display text-4xl md:text-5xl text-cream">Hero Elixirs</h2>
            </div>
            <Link to="/recommendations" className="font-body text-[11px] uppercase tracking-[0.3em] text-neon-pink hover:text-glow-pink">
              Full Apothecary →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* DERM-BACKED — realistic credibility */}
      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
          <div className="tarot-border rose-thorn-border overflow-hidden rounded-sm">
            <img
              src={dermPortrait}
              alt="Board-certified dermatologist examining a Witchy Magic skincare formulation in a clinical lab"
              loading="lazy"
              width={1280}
              height={1280}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Clinically Backed ✦</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl text-cream">
              Formulated with <span className="italic text-neon-pink text-glow-pink">board-certified dermatologists.</span>
            </h2>
            <p className="mt-5 text-cream-dim leading-relaxed">
              Every active is dosed at clinical strength. Every claim is sourced from peer-reviewed dermatology journals. The mysticism is for your soul — the science is for your skin.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-cream-dim">
              <li>✦ Niacinamide 10% — proven sebum reduction</li>
              <li>✦ Bakuchiol — retinol-equivalent collagen results</li>
              <li>✦ Tranexamic Acid 3% — pigmentation gold standard</li>
            </ul>
            <div className="mt-8">
              <NeonLink to="/grimoire" variant="outline">Read The Grimoire →</NeonLink>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLERS — reuse same card grid removed; keep only Hero Elixirs above */}

      {/* CTA: ANALYSIS */}
      <section className="px-4 py-24 md:px-8">
        <div className="mx-auto max-w-5xl tarot-border ornament-corners rounded-sm p-10 md:p-16 text-center">
          <Star size={28} className="mx-auto text-gold mb-6 anim-twinkle" />
          <h2 className="font-display text-4xl md:text-5xl text-cream">
            Discover Your <span className="italic text-neon-pink text-glow-pink">Cosmic Skin Archetype</span>
          </h2>
          <p className="mt-4 text-cream-dim max-w-xl mx-auto">
            A 60-second ritual: answer the oracle, and receive your personalized formulary — clinically calibrated, mystically tuned.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <NeonLink to="/analysis" size="lg">Begin the Reading</NeonLink>
            <NeonLink to="/scanner" variant="outline" size="lg">
              <span className="inline-flex items-center gap-2"><ScanFace size={14}/> AR Face Scanner</span>
            </NeonLink>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle eyebrow="The Coven Speaks" title="Voices from the Veil" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredVoices.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
          <div className="mt-12 text-center">
            <Link to="/reviews" className="font-body text-xs uppercase tracking-[0.3em] text-cream-dim hover:text-neon-pink">
              See All Reviews →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">
        ✦ {eyebrow} ✦
      </p>
      <h2 className="mt-3 font-display text-4xl md:text-5xl text-cream">{title}</h2>
    </div>
  );
}
