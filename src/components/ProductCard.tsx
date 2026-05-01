import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="tarot-border ornament-corners group relative flex flex-col overflow-hidden rounded-sm transition-transform duration-300 hover:-translate-y-1">
      <Link to="/products/$productId" params={{ productId: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-deep-purple/40">
          <div
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            style={{
              background: product.gradient,
            }}
          >
            <div className="flex h-full w-full items-center justify-center p-8">
              <span className="font-display text-5xl text-cream/80 text-glow-pink">
                {product.glyph}
              </span>
            </div>
          </div>
          {product.dermatologistRecommended && (
            <span className="absolute left-2 top-2 border border-gold/60 bg-bg-black/80 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-gold">
              Derm Approved
            </span>
          )}
          <span className="absolute right-2 top-2 border border-neon-pink/60 bg-bg-black/80 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-neon-pink">
            Try AR
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim">{product.brand}</p>
        <Link to="/products/$productId" params={{ productId: product.id }}>
          <h3 className="font-display text-lg leading-tight text-cream hover:text-neon-pink transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-cream-dim">
          <span className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill={i < Math.round(product.rating) ? "currentColor" : "none"} />
            ))}
          </span>
          <span>{product.rating.toFixed(1)} · {product.reviews}</span>
        </div>
        <p className="text-xs text-cream-dim line-clamp-2">{product.keyIngredient}</p>
        <div className="flex flex-wrap gap-1">
          {product.concerns.slice(0, 3).map((c) => (
            <span key={c} className="border border-gold/30 px-2 py-0.5 text-[9px] uppercase tracking-wider text-cream-dim">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-xl text-cream text-glow-gold">₹{product.price}</span>
          <div className="flex items-center gap-2">
            <button aria-label="Wishlist" className="text-cream-dim hover:text-neon-pink transition-colors">
              <Heart size={16} />
            </button>
            <button
              aria-label="Add to cart"
              className="flex items-center gap-1 border border-neon-pink bg-neon-pink/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.6)] transition-all"
            >
              <ShoppingBag size={12} /> Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
