import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Witchy Magic" },
      { name: "description", content: "Potions you've saved for the next moon." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  // Demo: showcase a curated set
  const wished = products.slice(4, 10);

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Saved for the Next Moon ✦</p>
          <h1 className="mt-4 font-display text-5xl text-cream">Your Wishlist</h1>
          <p className="mt-3 text-cream-dim">Potions you have whispered to.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wished.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
