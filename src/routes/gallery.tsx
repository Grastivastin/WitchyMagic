import { createFileRoute } from "@tanstack/react-router";
import { transformations } from "@/data/transformations";
import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TarotCard } from "@/components/TarotCard";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Transformations — Witchy Magic" },
      { name: "description", content: "Real results from the coven. Before-and-after transformations across acne, pigmentation, fine lines, sensitivity." },
      { property: "og:title", content: "Transformations — Real Results, Real Coven" },
      { property: "og:description", content: "Documented before-and-after journeys with our potions." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Documented Magic ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">The Transformation Gallery</h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            Real coven members. Honest journeys. Verified results.
          </p>
        </div>

        {/* BEFORE / AFTER */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          {transformations.map((t) => (
            <TarotCard key={t.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-cream">{t.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim mt-1">
                    <span className="text-gold">{t.zodiac} {t.sign}</span> · {t.concern}
                  </p>
                </div>
                <span className="border border-neon-pink/60 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-neon-pink">
                  {t.duration}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim mb-2">Before</p>
                  <div className="aspect-[4/5] rounded-sm border border-gold/20" style={{ background: t.beforeGradient }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neon-pink mb-2">After</p>
                  <div className="aspect-[4/5] rounded-sm border border-neon-pink/40 glow-pink" style={{ background: t.afterGradient }} />
                </div>
              </div>

              <p className="mt-5 font-display italic text-cream">"{t.quote}"</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim">
                Ritual: {t.productsUsed.join(" · ")}
              </p>
            </TarotCard>
          ))}
        </section>

        {/* TESTIMONIALS */}
        <section className="mt-24">
          <h2 className="font-display text-4xl text-cream text-center">Coven Voices</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => <TestimonialCard key={t.id} t={t} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
