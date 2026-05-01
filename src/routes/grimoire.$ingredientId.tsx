import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { ingredients } from "@/data/ingredients";
import { articles } from "@/data/articles";
import { products } from "@/data/products";
import { TarotCard } from "@/components/TarotCard";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/grimoire/$ingredientId")({
  loader: ({ params }) => {
    const ingredient = ingredients.find((i) => i.id === params.ingredientId);
    const article = articles.find((a) => a.slug === params.ingredientId);
    if (!ingredient && !article) throw notFound();
    return { ingredient, article };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.ingredient?.name ?? loaderData?.article?.title ?? "Grimoire Entry";
    const desc = loaderData?.ingredient?.scientificBacking ?? loaderData?.article?.excerpt ?? "";
    return {
      meta: [
        { title: `${title} — The Grimoire` },
        { name: "description", content: desc },
        { property: "og:title", content: `${title} — Witchy Magic Grimoire` },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl text-cream">Entry not found</h1>
      <Link to="/grimoire" className="mt-6 inline-block text-neon-pink hover:underline">← Back to grimoire</Link>
    </div>
  ),
  component: EntryPage,
});

function EntryPage() {
  const { ingredient, article } = Route.useLoaderData();

  return (
    <div className="px-4 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Link to="/grimoire" className="inline-flex items-center gap-2 text-xs text-cream-dim uppercase tracking-[0.3em] hover:text-neon-pink">
          <ChevronLeft size={14} /> Back to grimoire
        </Link>

        {ingredient && (
          <article className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ {ingredient.category} ✦</p>
            <h1 className="mt-3 font-display text-6xl text-cream">{ingredient.name}</h1>
            <p className="mt-3 text-sm text-cream-dim italic">Also known as: {ingredient.aliases.join(", ")}</p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Stat label="Optimal" value={ingredient.optimalConcentration} />
              <Stat label="Best for" value={ingredient.bestFor.join(" · ")} />
              <Stat label="Allergens" value={ingredient.allergenInfo} />
            </div>

            <TarotCard className="mt-10">
              <h2 className="font-display text-2xl text-cream">The Science</h2>
              <p className="mt-3 text-sm text-cream leading-relaxed">{ingredient.scientificBacking}</p>
            </TarotCard>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <TarotCard>
                <h3 className="font-display text-xl text-cream">Benefits</h3>
                <ul className="mt-3 space-y-2 text-sm text-cream-dim">
                  {ingredient.benefits.map((b) => <li key={b}>✦ {b}</li>)}
                </ul>
              </TarotCard>
              <TarotCard>
                <h3 className="font-display text-xl text-cream">Pairs Well With</h3>
                <p className="mt-3 text-sm text-cream-dim"><span className="text-gold">Safe:</span> {ingredient.safeWith.join(", ") || "Universally compatible"}</p>
                <p className="mt-2 text-sm text-cream-dim"><span className="text-destructive">Avoid:</span> {ingredient.avoidWith.join(", ") || "None"}</p>
              </TarotCard>
            </div>

            <section className="mt-10">
              <h2 className="font-display text-2xl text-cream">Found In</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {ingredient.productsContaining.map((pid) => {
                  const p = products.find((x) => x.id === pid);
                  if (!p) return null;
                  return (
                    <Link key={pid} to="/products/$productId" params={{ productId: pid }} className="tarot-border ornament-corners rounded-sm p-4 flex items-center gap-3 hover:border-neon-pink">
                      <span className="font-display text-3xl">{p.glyph}</span>
                      <div>
                        <p className="font-display text-cream">{p.name}</p>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">₹{p.price}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </article>
        )}

        {article && !ingredient && (
          <article className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">{article.category} · {article.readTime}</p>
            <h1 className="mt-3 font-display text-5xl text-cream">{article.title}</h1>
            <p className="mt-3 text-sm text-cream-dim">By {article.author} · {article.date}</p>

            <div className="mt-10 prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:text-cream prose-headings:tracking-wide prose-strong:text-gold prose-a:text-neon-pink">
              <ReactMarkdown>{article.body}</ReactMarkdown>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="tarot-border ornament-corners rounded-sm p-5">
      <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">{label}</p>
      <p className="mt-2 font-display text-base text-cream">{value}</p>
    </div>
  );
}
