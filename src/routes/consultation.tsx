import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { experts } from "@/data/team";
import { TarotCard } from "@/components/TarotCard";
import { NeonButton } from "@/components/NeonButton";
import { Star, Calendar, Video, ShieldCheck } from "lucide-react";
import consultationDermatologist from "@/assets/consultation-dermatologist.jpg";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Book a Consult — Witchy Magic" },
      { name: "description", content: "1:1 sessions with board-certified dermatologists who understand cycle-aware, evidence-based skincare." },
      { property: "og:title", content: "Book a Dermatologist Consultation" },
      { property: "og:description", content: "Speak directly with our coven of board-certified specialists." },
    ],
  }),
  component: ConsultationPage,
});

function ConsultationPage() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ The Consultation Ritual ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">Speak with the Coven</h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            1:1 video sessions with board-certified dermatologists who understand both clinical evidence and cycle-aware ritual.
          </p>
        </div>

        {/* Consultation dermatologist portrait */}
        <figure className="mt-12 mx-auto max-w-4xl relative overflow-hidden rounded-sm tarot-border rose-thorn-border anim-fade-up aspect-[16/9]">
          <img
            src={consultationDermatologist}
            alt="Dermatologist for Witchy Magic consultations in a refined rose-framed clinic portrait"
            width={1600}
            height={900}
            className="w-full h-full object-cover object-center block"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-black/95 to-transparent p-5 text-center">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon-pink text-glow-pink">Clinical Beauty Ritual</p>
            <p className="mt-1 font-display text-xl text-cream italic">Book your consultation with a dermatologist</p>
          </figcaption>
        </figure>

        {/* TRUST */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, label: "Board-certified MDs" },
            { icon: Video, label: "Encrypted video calls" },
            { icon: Calendar, label: "Same-week availability" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="tarot-border ornament-corners rounded-sm p-5 flex items-center gap-3">
              <Icon size={18} className="text-gold" />
              <span className="text-sm text-cream-dim">{label}</span>
            </div>
          ))}
        </div>

        {/* EXPERTS */}
        <section className="mt-16">
          <h2 className="font-display text-3xl text-cream text-center">Choose Your Guide</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {experts.map((e) => (
              <TarotCard key={e.name}>
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 font-display text-3xl text-cream glow-gold"
                  style={{ background: e.gradient }}
                >
                  {e.initials}
                </div>
                <h3 className="mt-4 font-display text-xl text-cream text-center">{e.name}</h3>
                <p className="text-[10px] uppercase tracking-[0.3em] text-neon-pink text-glow-pink text-center mt-1">{e.title}</p>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-cream-dim">
                  <span className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill={i < Math.round(e.rating) ? "currentColor" : "none"} />
                    ))}
                  </span>
                  <span>{e.rating} · {e.sessions} sessions</span>
                </div>

                <ul className="mt-4 space-y-1 text-xs text-cream-dim">
                  {e.credentials.map((c) => <li key={c}>· {c}</li>)}
                </ul>

                <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cream-dim">Specialties</p>
                <p className="text-xs text-cream">{e.specialties.join(" · ")}</p>

                <p className="mt-5 text-center font-display text-3xl text-cream text-glow-gold">₹{e.price}</p>
                <p className="text-center text-[10px] uppercase tracking-[0.3em] text-cream-dim">45-min session</p>

                <div className="mt-5 text-center">
                  <NeonButton onClick={() => setPicked(e.name)}>Book {e.name.split(",")[0]}</NeonButton>
                </div>
              </TarotCard>
            ))}
          </div>
        </section>

        {/* CALENDLY EMBED */}
        {picked && (
          <section className="mt-16">
            <TarotCard>
              <h2 className="font-display text-2xl text-cream">Schedule with {picked}</h2>
              <p className="mt-2 text-sm text-cream-dim">Pick a slot that aligns with your moon. Confirmation sent by raven (email).</p>
              <div className="mt-6 aspect-[4/3] w-full bg-deep-purple/40 border border-gold/30 rounded-sm flex flex-col items-center justify-center text-center p-8">
                <Calendar size={36} className="text-neon-pink anim-twinkle" />
                <p className="mt-4 font-display text-2xl text-cream">Calendly Embed</p>
                <p className="mt-2 text-xs text-cream-dim max-w-md">
                  In production, the Calendly inline widget renders here.
                  Configure with: <code className="text-neon-pink">https://calendly.com/witchymagic/{picked.toLowerCase().replace(/[^a-z]/g, "-")}</code>
                </p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-block border border-neon-pink bg-neon-pink/10 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_24px_oklch(0.66_0.30_0_/_0.7)] transition-all"
                >
                  Open Calendly →
                </a>
              </div>
            </TarotCard>
          </section>
        )}
      </div>
    </div>
  );
}
