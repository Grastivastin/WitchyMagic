import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { TarotCard } from "@/components/TarotCard";
import { NeonButton } from "@/components/NeonButton";
import { Star, Heart, ShieldCheck, FlaskConical, ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.productId);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name} — Witchy Magic` },
      { name: "description", content: loaderData?.product.description ?? "" },
      { property: "og:title", content: `${loaderData?.product.name} — Witchy Magic` },
      { property: "og:description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl text-cream">Potion not found</h1>
      <p className="mt-4 text-cream-dim">The grimoire has no record of this brew.</p>
      <Link to="/recommendations" className="mt-6 inline-block text-neon-pink hover:underline">← Back to Apothecary</Link>
    </div>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <div className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Link to="/recommendations" className="inline-flex items-center gap-2 text-xs text-cream-dim uppercase tracking-[0.3em] hover:text-neon-pink">
          <ChevronLeft size={14} /> Back to apothecary
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="rounded-sm overflow-hidden border border-gold/20">
            <div
              className="relative aspect-square flex items-center justify-center"
              style={{ background: product.gradient }}
            >
              <span className="font-display text-[12rem] text-cream/80 text-glow-pink anim-breathe">{product.glyph}</span>
              <div aria-hidden className="anim-halo absolute inset-0 -z-10 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle at center, oklch(0.66 0.30 0 / 0.5), transparent 70%)" }}
              />
            </div>
          </div>

          {/* INFO */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">{product.brand}</p>
            <h1 className="mt-2 font-display text-5xl text-cream">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
                ))}
              </span>
              <span className="text-xs text-cream-dim">{product.rating.toFixed(1)} · {product.reviews} reviews</span>
            </div>

            {product.dermatologistRecommended && (
              <div className="mt-4 inline-flex items-center gap-2 border border-gold/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold">
                <ShieldCheck size={12} /> Dermatologist Approved
              </div>
            )}

            <p className="mt-6 text-sm text-cream leading-relaxed">{product.description}</p>

            <div className="mt-8 flex items-center gap-6">
              <span className="font-display text-4xl text-cream text-glow-gold">₹{product.price}</span>
              <NeonButton size="lg">Add to Cauldron</NeonButton>
              <button aria-label="Wishlist" className="text-cream-dim hover:text-neon-pink"><Heart size={20} /></button>
            </div>

            {/* TAGS */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">Concerns</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.concerns.map((c: string) => (
                    <span key={c} className="border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream-dim">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">Skin types</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {product.skinTypes.map((c: string) => (
                    <span key={c} className="border border-gold/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-cream-dim">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WHY IT WORKS */}
        <section className="mt-20 grid gap-6 md:grid-cols-3">
          <TarotCard>
            <FlaskConical size={20} className="text-neon-pink" />
            <h3 className="mt-3 font-display text-xl text-cream">Why It Works</h3>
            <p className="mt-3 text-sm text-cream-dim leading-relaxed">{product.whyItWorks}</p>
          </TarotCard>
          <TarotCard>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neon-pink text-glow-pink">Hero Ingredient</p>
            <h3 className="mt-2 font-display text-xl text-cream">{product.keyIngredient}</h3>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim">Full formulary</p>
            <ul className="mt-2 space-y-1 text-sm text-cream-dim">
              {product.ingredients.map((ing: string) => <li key={ing}>· {ing}</li>)}
            </ul>
          </TarotCard>
          <TarotCard>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Cosmic Match</p>
            <h3 className="mt-2 font-display text-xl text-cream">{product.bestForZodiac ?? "All signs welcome"}</h3>
            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim">Benefits</p>
            <ul className="mt-2 space-y-1 text-sm text-cream-dim">
              {product.benefits.map((b: string) => <li key={b}>✦ {b}</li>)}
            </ul>
          </TarotCard>
        </section>

        {/* REVIEWS */}
        <section className="mt-20">
          <h2 className="font-display text-3xl text-cream">Voices of the Coven</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {productReviews.map((r) => (
              <TarotCard key={r.id}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-base text-cream">{r.author} <span className="text-gold text-glow-gold">{r.zodiac}</span></p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">{r.skinType} · {r.duration}</p>
                  </div>
                  <span className="flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < r.rating ? "currentColor" : "none"} />
                    ))}
                  </span>
                </div>
                <p className="mt-3 font-display italic text-cream">"{r.title}"</p>
                <p className="mt-2 text-sm text-cream-dim">{r.body}</p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim">✦ {r.helpful} found helpful</p>
              </TarotCard>
            ))}
            {productReviews.length === 0 && (
              <p className="text-sm text-cream-dim italic">No reviews yet. Be the first to speak.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
