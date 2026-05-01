import { createFileRoute, Link } from "@tanstack/react-router";
import { reviews } from "@/data/reviews";
import { products } from "@/data/products";
import { TarotCard } from "@/components/TarotCard";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Witchy Magic" },
      { name: "description", content: "Verified, unfiltered reviews from the coven." },
      { property: "og:title", content: "Reviews — Witchy Magic" },
      { property: "og:description", content: "Honest reviews from real coven members." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Verified Voices ✦</p>
          <h1 className="mt-4 font-display text-5xl text-cream">Reviews from the Coven</h1>

          <div className="mt-6 inline-flex items-center gap-3 tarot-border ornament-corners rounded-sm px-6 py-3">
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill={i < Math.round(avg) ? "currentColor" : "none"} />
              ))}
            </span>
            <span className="font-display text-2xl text-cream">{avg.toFixed(2)}</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">{reviews.length} verified</span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => {
            const product = products.find((p) => p.id === r.productId);
            return (
              <TarotCard key={r.id}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base text-cream">
                      {r.author} <span className="text-gold text-glow-gold">{r.zodiac} {r.sign}</span>
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">
                      {r.skinType} · {r.duration} {r.verified && "· ✓ Verified"}
                    </p>
                  </div>
                  <span className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                  </span>
                </div>
                <p className="mt-3 font-display italic text-lg text-cream">"{r.title}"</p>
                <p className="mt-2 text-sm text-cream-dim leading-relaxed">{r.body}</p>
                {product && (
                  <Link to="/products/$productId" params={{ productId: product.id }}
                    className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neon-pink hover:underline">
                    {product.glyph} {product.name}
                  </Link>
                )}
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim">✦ {r.helpful} found helpful</p>
              </TarotCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
