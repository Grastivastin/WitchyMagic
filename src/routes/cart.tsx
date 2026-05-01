import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { TarotCard } from "@/components/TarotCard";
import { NeonButton, NeonLink } from "@/components/NeonButton";
import { ShoppingBag, Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cauldron — Witchy Magic" },
      { name: "description", content: "Review your selected potions before checkout." },
    ],
  }),
  component: CartPage,
});

// Demo cart — first 3 products
const demoCart = products.slice(0, 3).map((p) => ({ product: p, qty: 1 }));

function CartPage() {
  const subtotal = demoCart.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const shipping = subtotal > 1500 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.5em] text-neon-pink text-glow-pink">✦ Your Cauldron ✦</p>
          <h1 className="mt-4 font-display text-5xl text-cream">The Cart</h1>
        </div>

        {demoCart.length === 0 ? (
          <div className="mt-16 text-center">
            <ShoppingBag size={48} className="mx-auto text-cream-dim" />
            <p className="mt-4 text-cream-dim">Your cauldron is empty.</p>
            <NeonLink to="/recommendations" className="mt-6">Browse the Apothecary</NeonLink>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-4">
              {demoCart.map(({ product, qty }) => (
                <TarotCard key={product.id} className="!p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm border border-gold/30"
                      style={{ background: product.gradient }}
                    >
                      <span className="font-display text-3xl text-cream">{product.glyph}</span>
                    </div>
                    <div className="flex-1">
                      <Link to="/products/$productId" params={{ productId: product.id }} className="font-display text-lg text-cream hover:text-neon-pink">
                        {product.name}
                      </Link>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim mt-1">{product.brand}</p>
                      <p className="text-xs text-cream-dim mt-1">Qty: {qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-xl text-cream text-glow-gold">₹{product.price * qty}</p>
                      <button aria-label="Remove" className="mt-2 text-cream-dim hover:text-destructive">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </TarotCard>
              ))}
            </div>

            <aside>
              <TarotCard>
                <h2 className="font-display text-2xl text-cream">Summary</h2>
                <dl className="mt-4 space-y-2 text-sm">
                  <Row label="Subtotal" value={`₹${subtotal}`} />
                  <Row label="Shipping" value={shipping === 0 ? "Free ✦" : `₹${shipping}`} />
                  <div className="border-t border-gold/20 pt-3 mt-3">
                    <Row label={<span className="font-display text-lg text-cream">Total</span>} value={<span className="font-display text-2xl text-cream text-glow-gold">₹{total}</span>} />
                  </div>
                </dl>
                <NeonButton className="mt-6 w-full" size="lg">Proceed to Checkout</NeonButton>
                <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-cream-dim text-center">
                  Secure · Encrypted · Stripe
                </p>
              </TarotCard>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-cream-dim">
      <dt>{label}</dt>
      <dd className="text-cream">{value}</dd>
    </div>
  );
}
