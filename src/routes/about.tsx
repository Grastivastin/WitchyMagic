import { createFileRoute } from "@tanstack/react-router";
import { TarotCard } from "@/components/TarotCard";
import { team } from "@/data/team";
import aboutHero from "@/assets/about-hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Witchy Magic" },
      { name: "description", content: "The coven behind the cauldron. Dermatologists, formulators, sourcing alchemists, and ritual educators." },
      { property: "og:title", content: "About — The Witchy Magic Coven" },
      { property: "og:description", content: "Where peer-reviewed science meets devotional ritual." },
      { property: "og:image", content: aboutHero },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* HERO */}
        <section className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ The Coven ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">
            We are <span className="italic text-neon-pink text-glow-pink">witches with white coats.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-cream-dim leading-relaxed">
            Born from a refusal to choose. Skincare can be both clinically true and emotionally devotional. Both lab-tested and moon-blessed.
            We formulate with the rigor of dermatology and the reverence of ritual.
          </p>
        </section>

        <div className="mt-12">
          <img src={aboutHero} alt="The witchy magic founder portrait — dramatic, candlelit, mystical" className="w-full rounded-sm border border-gold/30" />
        </div>

        {/* MANIFESTO */}
        <section className="mt-20">
          <TarotCard>
            <h2 className="font-display text-3xl text-cream text-center">Our Manifesto</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 text-sm text-cream-dim leading-relaxed">
              <p>
                <span className="font-display text-cream text-glow-soft">We believe</span> the body holds memory. That what you put on your skin should be more than chemistry — it should be ceremony.
              </p>
              <p>
                <span className="font-display text-cream text-glow-soft">We refuse</span> to dilute either side of our heritage. Our formulas are 0.3–10% efficacious-strength actives. Our packaging is hand-illustrated tarot.
              </p>
              <p>
                <span className="font-display text-cream text-glow-soft">We honor</span> the cycles — moon, season, hormone, sign. Skin doesn't live in a vacuum and our routines won't pretend otherwise.
              </p>
              <p>
                <span className="font-display text-cream text-glow-soft">We promise</span> radical transparency. Every active concentration. Every clinical study. Every supplier. Listed.
              </p>
            </div>
          </TarotCard>
        </section>

        {/* TEAM */}
        <section className="mt-20">
          <h2 className="font-display text-4xl text-cream text-center">The Coven</h2>
          <p className="mt-3 text-center text-cream-dim text-sm">Each chair at our table.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {team.map((m) => (
              <TarotCard key={m.name}>
                <div className="flex items-start gap-5">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-2xl text-cream"
                    style={{ background: m.gradient }}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-cream">{m.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-neon-pink text-glow-pink mt-1">{m.title}</p>
                    <p className="text-xs text-gold mt-1">{m.zodiac} {m.sign}</p>
                    <p className="mt-3 text-xs text-cream-dim leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </TarotCard>
            ))}
          </div>
        </section>

        {/* VALUES */}
        <section className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "100%", v: "Cruelty-free (PETA)" },
            { k: "0", v: "Parabens · sulfates · phthalates" },
            { k: "47", v: "Peer-reviewed studies cited" },
            { k: "12", v: "Zodiac archetypes honored" },
          ].map((s) => (
            <div key={s.v} className="tarot-border ornament-corners text-center p-6 rounded-sm">
              <p className="font-display text-4xl text-neon-pink text-glow-pink">{s.k}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-cream-dim">{s.v}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
