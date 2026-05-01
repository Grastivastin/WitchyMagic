import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/analysis", label: "Analysis" },
  { to: "/scanner", label: "AR Scanner" },
  { to: "/recommendations", label: "Apothecary" },
  { to: "/grimoire", label: "Grimoire" },
  { to: "/consultation", label: "Consult" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.3em] text-cream md:text-2xl">
            WITCHY MAGIC
          </span>
          <span className="font-display text-[10px] italic text-neon-pink tracking-[0.4em] text-glow-pink">
            boutique &amp; beauty
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-body text-[11px] uppercase tracking-[0.3em] text-cream-dim transition-colors hover:text-neon-pink"
              activeProps={{ className: "text-neon-pink text-glow-pink" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/wishlist" aria-label="Wishlist" className="text-cream-dim hover:text-neon-pink transition-colors">
            <Heart size={18} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="text-cream-dim hover:text-neon-pink transition-colors">
            <ShoppingBag size={18} />
          </Link>
          <Link to="/profile" aria-label="Profile" className="text-cream-dim hover:text-neon-pink transition-colors">
            <User size={18} />
          </Link>
          <button
            type="button"
            aria-label="Open menu"
            className="text-cream-dim hover:text-neon-pink lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-gold/20 bg-bg-black/95 px-4 pb-6 pt-2 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-xs uppercase tracking-[0.3em] text-cream-dim hover:text-neon-pink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
