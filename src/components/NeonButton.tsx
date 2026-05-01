import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

type Common = {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 font-body uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] rounded-sm";

const sizes = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-neon-pink/10 border border-neon-pink text-neon-pink hover:bg-neon-pink/20 hover:shadow-[0_0_24px_oklch(0.66_0.30_0_/_0.7)] text-glow-pink",
  outline:
    "border border-gold/60 text-cream hover:border-neon-pink hover:text-neon-pink hover:shadow-[0_0_18px_oklch(0.66_0.30_0_/_0.5)]",
  ghost: "text-cream-dim hover:text-neon-pink",
};

export function NeonButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function NeonLink({
  to,
  variant = "primary",
  size = "md",
  children,
  className = "",
  params,
}: Common & { to: string; params?: Record<string, string> }) {
  return (
    <Link
      to={to}
      params={params as never}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
