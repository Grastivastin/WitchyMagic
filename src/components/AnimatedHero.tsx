import { motion } from "framer-motion";
import heroCover from "@/assets/hero-logo-cover.png";

/** Home hero: full-bleed storybook cover artwork that blends seamlessly into the page background. */
export function AnimatedHero() {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative w-full"
      >
        <img
          src={heroCover}
          alt="Witchy Magic Boutique & Beauty — twisted dark fairytale cover."
          className="w-full h-auto block select-none"
          draggable={false}
        />
        {/* Bottom blend into page background so it bleeds perfectly when scrolling */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 md:h-56"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, oklch(0.12 0.04 320 / 0.75) 60%, oklch(0.08 0.03 320) 100%)",
          }}
        />
        {/* Side blends so the artwork edges fade into the side borders */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40"
          style={{
            background:
              "linear-gradient(to right, oklch(0.08 0.03 320) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40"
          style={{
            background:
              "linear-gradient(to left, oklch(0.08 0.03 320) 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  );
}
