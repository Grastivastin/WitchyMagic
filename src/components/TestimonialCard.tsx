import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="tarot-border ornament-corners flex flex-col gap-4 rounded-sm p-6">
      <div className="flex items-center gap-3">
        <div
          aria-hidden
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 font-display text-xl text-cream glow-gold"
          style={{ background: t.avatarGradient }}
        >
          {t.initials}
        </div>
        <div>
          <p className="font-display text-base text-cream tracking-wide">
            {t.name} <span className="text-cream-dim">·</span>{" "}
            <span className="text-gold text-glow-gold">{t.zodiac} {t.sign}</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
            Verified · {t.duration}
          </p>
        </div>
      </div>
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} />
        ))}
      </div>
      <p className="font-display italic text-lg leading-snug text-cream">
        "{t.quote}"
      </p>
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
        Resolved: {t.concern}
      </p>
    </article>
  );
}
