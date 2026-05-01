import { Link } from "@tanstack/react-router";

const ZODIAC = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-gold/20 bg-bg-black/80 py-16 mt-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl text-cream tracking-[0.2em]">WITCHY MAGIC</h3>
            <p className="mt-1 font-display text-xs italic text-neon-pink tracking-[0.3em] text-glow-pink">
              where dermatology meets mysticism
            </p>
            <p className="mt-4 text-xs text-cream-dim leading-relaxed">
              A premium cosmetic boutique blending peer-reviewed actives with the cycles, signs and ancient knowing of self.
            </p>
          </div>

          <FooterCol title="Discover" links={[
            { to: "/analysis", label: "Skin Analysis" },
            { to: "/recommendations", label: "Apothecary" },
            { to: "/ingredients", label: "Ingredient Dictionary" },
            { to: "/gallery", label: "Transformations" },
          ]} />

          <FooterCol title="The Coven" links={[
            { to: "/about", label: "About Us" },
            { to: "/grimoire", label: "The Grimoire" },
            { to: "/reviews", label: "Reviews" },
            { to: "/consultation", label: "Book a Consult" },
          ]} />

          <div>
            <h4 className="font-display text-sm uppercase tracking-[0.3em] text-cream">Join the Coven</h4>
            <p className="mt-3 text-xs text-cream-dim">
              Exclusive rituals, new potions, and lunar drops in your inbox.
            </p>
            <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="moonchild@coven.com"
                className="flex-1 rounded-sm border border-gold/40 bg-bg-black/60 px-3 py-2 text-xs text-cream placeholder:text-cream-dim/60 focus:border-neon-pink focus:outline-none focus:shadow-[0_0_16px_oklch(0.66_0.30_0_/_0.4)]"
              />
              <button className="border border-neon-pink bg-neon-pink/10 px-4 py-2 font-body text-[10px] uppercase tracking-[0.3em] text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.6)] transition-all">
                Join
              </button>
            </form>
          </div>
        </div>

        <div aria-hidden className="mt-12 flex justify-center gap-3 text-gold/60 text-lg">
          {ZODIAC.map((g) => <span key={g}>{g}</span>)}
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 border-t border-gold/10 pt-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-cream-dim">
            ✦ dermatologist tested · cruelty-free · clean beauty certified ✦
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/60">
            © {new Date().getFullYear()} Witchy Magic Boutique. All omens reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="font-display text-sm uppercase tracking-[0.3em] text-cream">{title}</h4>
      <ul className="mt-3 space-y-2">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-xs text-cream-dim hover:text-neon-pink transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
