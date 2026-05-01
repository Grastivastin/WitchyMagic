import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/recommendations")({
  head: () => ({
    meta: [
      { title: "The Apothecary — Witchy Magic" },
      { name: "description", content: "Browse the full apothecary. Filter by concern, skin type, or zodiac. Speak to The Oracle for live guidance." },
      { property: "og:title", content: "The Apothecary — Personalized Beauty Recommendations" },
      { property: "og:description", content: "AI-powered skincare recommendations from The Oracle." },
    ],
  }),
  component: RecommendationsPage,
});

const ALL_CONCERNS = ["acne", "dryness", "aging", "pigmentation", "sensitivity", "dullness", "oiliness", "barrier", "redness", "pores"];

function RecommendationsPage() {
  const [concern, setConcern] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesConcern = !concern || p.concerns.includes(concern);
      const q = search.toLowerCase().trim();
      const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.keyIngredient.toLowerCase().includes(q);
      return matchesConcern && matchesSearch;
    });
  }, [concern, search]);

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ The Apothecary ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">Speak with The Oracle</h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            Live, AI-guided wisdom. Ask anything — root cause, ritual, ingredient, formulation — and receive an answer rooted in clinical evidence and cosmic knowing.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* CHAT */}
          <div>
            <ChatPanel />
          </div>

          {/* CATALOG */}
          <div>
            <div className="tarot-border ornament-corners rounded-sm p-6">
              <h2 className="font-display text-2xl text-cream">Filter the Apothecary</h2>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or ingredient…"
                className="mt-4 w-full rounded-sm border border-gold/40 bg-bg-black/60 px-3 py-2 text-sm text-cream placeholder:text-cream-dim/60 focus:border-neon-pink focus:outline-none focus:shadow-[0_0_16px_oklch(0.66_0.30_0_/_0.4)]"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setConcern(null)}
                  className={`border px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                    !concern
                      ? "border-neon-pink text-neon-pink bg-neon-pink/10"
                      : "border-gold/30 text-cream-dim hover:border-neon-pink hover:text-neon-pink"
                  }`}
                >
                  All
                </button>
                {ALL_CONCERNS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setConcern(c)}
                    className={`border px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                      concern === c
                        ? "border-neon-pink text-neon-pink bg-neon-pink/10"
                        : "border-gold/30 text-cream-dim hover:border-neon-pink hover:text-neon-pink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-cream-dim">
              {filtered.length} potion{filtered.length === 1 ? "" : "s"} divined
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              {filtered.length === 0 && (
                <p className="col-span-full text-sm text-cream-dim italic">No potions match your divination. Try a different concern.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
