import { createFileRoute } from "@tanstack/react-router";
import { TarotCard } from "@/components/TarotCard";
import { NeonLink } from "@/components/NeonButton";
import { User, Sparkles, Calendar, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Witchy Magic" },
      { name: "description", content: "Your coven dashboard. Past readings, orders, and saved rituals." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 glow-gold"
            style={{ background: "linear-gradient(135deg, oklch(0.66 0.30 0 / 0.7), oklch(0.27 0.10 330))" }}
          >
            <User size={36} className="text-cream" />
          </div>
          <h1 className="mt-6 font-display text-4xl text-cream">Welcome, Moonchild</h1>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-neon-pink text-glow-pink">✦ Scorpio · Initiate ✦</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Sparkles, k: "1", v: "Reading Completed" },
            { icon: ShoppingBag, k: "3", v: "Orders Placed" },
            { icon: Calendar, k: "0", v: "Consults Booked" },
          ].map(({ icon: Icon, k, v }) => (
            <div key={v} className="tarot-border ornament-corners rounded-sm p-5 text-center">
              <Icon size={20} className="mx-auto text-gold" />
              <p className="mt-3 font-display text-3xl text-neon-pink text-glow-pink">{k}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cream-dim">{v}</p>
            </div>
          ))}
        </div>

        <TarotCard className="mt-10">
          <h2 className="font-display text-2xl text-cream">Your Cosmic Profile</h2>
          <p className="mt-3 text-sm text-cream-dim">
            Sign in to save readings, build a lasting wishlist, and earn coven points with every order.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <NeonLink to="/analysis">Begin a Reading</NeonLink>
            <NeonLink to="/consultation" variant="outline">Book a Dermatologist</NeonLink>
          </div>
        </TarotCard>
      </div>
    </div>
  );
}
