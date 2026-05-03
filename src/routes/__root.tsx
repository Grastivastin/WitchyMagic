import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { GlitterCursor } from "@/components/GlitterCursor";
import { CornerOrnaments } from "@/components/CornerOrnaments";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-radial-purple flex items-center justify-center px-4">
      <div className="tarot-border ornament-corners max-w-md text-center p-10 rounded-sm">
        <p className="font-display text-7xl text-neon-pink text-glow-pink">404</p>
        <h1 className="mt-3 font-display text-2xl text-cream tracking-[0.2em]">PATH UNWRITTEN</h1>
        <p className="mt-3 text-sm text-cream-dim">
          The grimoire holds no record of this page. Perhaps the moon has hidden it.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block border border-neon-pink bg-neon-pink/10 px-6 py-3 font-body text-xs uppercase tracking-[0.3em] text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_24px_oklch(0.66_0.30_0_/_0.7)] transition-all"
        >
          Return to the boutique
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Witchy Magic — Where Dermatology Meets Mysticism" },
      { name: "description", content: "Premium cosmetic boutique. Peer-reviewed actives, ancient rituals, dermatologist-backed luxury beauty for every cosmic skin type." },
      { name: "author", content: "Witchy Magic Boutique" },
      { property: "og:title", content: "Witchy Magic — Premium Cosmetic Collection" },
      { property: "og:description", content: "Where dermatology meets mysticism. AI skin analysis, clinically-proven formulas, mystical ritual." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@witchymagic" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Outfit:wght@200;300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-bg-black text-cream">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-mystic-swirl">
      <GlitterCursor />
      <CornerOrnaments />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
