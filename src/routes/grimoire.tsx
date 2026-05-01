import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ingredients } from "@/data/ingredients";
import { articles } from "@/data/articles";
import { TarotCard } from "@/components/TarotCard";
import princeAndPrincess from "@/assets/grimoire-prince-princess.jpg";
import poisonApple from "@/assets/poison-apple-storybook.png";

export const Route = createFileRoute("/grimoire")({
  head: () => ({
    meta: [
      { title: "The Grimoire — Witchy Magic" },
      { name: "description", content: "An ingredient dictionary and journal. Peer-reviewed actives, mystical lore, and articles by the coven." },
      { property: "og:title", content: "The Grimoire — Ingredient Dictionary & Journal" },
      { property: "og:description", content: "Search every ingredient. Read every spell." },
    ],
  }),
  component: GrimoirePage,
});

const CATEGORIES = ["All", "Active", "Humectant", "BHA", "AHA", "Antioxidant", "Peptide", "Botanical"];

function GrimoirePage() {
  const [tab, setTab] = useState<"ingredients" | "journal">("ingredients");
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const filteredIngredients = useMemo(() => {
    return ingredients.filter((i) => {
      const matchesCat = cat === "All" || i.category === cat;
      const query = q.toLowerCase().trim();
      const matchesQuery =
        !query ||
        i.name.toLowerCase().includes(query) ||
        i.aliases.some((a) => a.toLowerCase().includes(query)) ||
        i.benefits.some((b) => b.toLowerCase().includes(query));
      return matchesCat && matchesQuery;
    });
  }, [cat, q]);

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center anim-fade-up">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ The Grimoire ✦</p>
          <h1 className="mt-4 font-display text-5xl md:text-6xl text-cream">A Library of Spells & Ingredients</h1>
          <p className="mt-4 text-cream-dim max-w-2xl mx-auto">
            Every active. Every paper cited. Every ritual explained.
          </p>
        </div>

        {/* Storybook hero — twisted dark fairytale */}
        <div className="mt-12 grid gap-6 md:grid-cols-5 anim-fade-up">
          <figure className="md:col-span-3 relative overflow-hidden rounded-sm tarot-border ornament-corners">
            <img
              src={princeAndPrincess}
              alt="A dark prince and pale princess sharing a glowing potion in a moonlit gothic forest"
              loading="lazy"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-black/95 to-transparent p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.4em] text-neon-pink text-glow-pink">Tale I</p>
              <p className="mt-1 font-display text-xl text-cream italic">The Princess & Her Dark Prince</p>
            </figcaption>
          </figure>
          <figure className="md:col-span-2 relative overflow-hidden rounded-sm tarot-border ornament-corners bg-bg-black/40">
            <img
              src={poisonApple}
              alt="Vintage storybook page reading 'Poison Apple' in old Disney style"
              loading="lazy"
              width={800}
              height={800}
              className="w-full h-full object-contain"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-black/95 to-transparent p-5">
              <p className="font-display text-[10px] uppercase tracking-[0.4em] text-gold">Tale II</p>
              <p className="mt-1 font-display text-xl text-cream italic">The Poisoned Apple</p>
            </figcaption>
          </figure>
        </div>

        {/* TABS */}
        <div className="mt-12 flex justify-center gap-2">
          {(["ingredients", "journal"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`border px-6 py-2 text-[11px] uppercase tracking-[0.3em] transition-all ${
                tab === t
                  ? "border-neon-pink text-neon-pink bg-neon-pink/10 shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.5)]"
                  : "border-gold/30 text-cream-dim hover:border-neon-pink hover:text-neon-pink"
              }`}
            >
              {t === "ingredients" ? "Ingredient Dictionary" : "Journal"}
            </button>
          ))}
        </div>

        {tab === "ingredients" ? (
          <>
            <div className="mt-10 tarot-border ornament-corners rounded-sm p-5">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search ingredients, aliases, benefits…"
                className="w-full rounded-sm border border-gold/40 bg-bg-black/60 px-3 py-2 text-sm text-cream placeholder:text-cream-dim/60 focus:border-neon-pink focus:outline-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`border px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                      cat === c
                        ? "border-neon-pink text-neon-pink bg-neon-pink/10"
                        : "border-gold/30 text-cream-dim hover:border-neon-pink hover:text-neon-pink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {filteredIngredients.map((i) => (
                <Link to="/grimoire/$ingredientId" params={{ ingredientId: i.id }} key={i.id}>
                  <TarotCard className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl text-cream">{i.name}</h3>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">{i.category} · {i.optimalConcentration}</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-neon-pink">→ Read</span>
                    </div>
                    <p className="mt-3 text-sm text-cream-dim line-clamp-2">{i.scientificBacking}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {i.benefits.slice(0, 3).map((b) => (
                        <span key={b} className="border border-gold/30 px-2 py-0.5 text-[9px] uppercase tracking-wider text-cream-dim">{b}</span>
                      ))}
                    </div>
                  </TarotCard>
                </Link>
              ))}
              {filteredIngredients.length === 0 && (
                <p className="col-span-full text-center text-sm text-cream-dim italic">No ingredients found in the grimoire.</p>
              )}
            </div>
          </>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
              <Link to="/grimoire/$ingredientId" params={{ ingredientId: a.slug }} key={a.slug}>
                <TarotCard className="h-full">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neon-pink text-glow-pink">{a.category} · {a.readTime}</p>
                  <h3 className="mt-3 font-display text-2xl text-cream">{a.title}</h3>
                  <p className="mt-3 text-sm text-cream-dim leading-relaxed">{a.excerpt}</p>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-cream-dim">By {a.author} · {a.date}</p>
                </TarotCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
