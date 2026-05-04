import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import heroCover from "@/assets/hero-logo-cover.png";

/** Home hero: storybook cover art with breathing pink halo, parallax tilt, sparkle overlay. */
export function AnimatedHero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [2, -2]), { stiffness: 80, damping: 18 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-2, 2]), { stiffness: 80, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="relative mx-auto w-full max-w-[900px] aspect-square rose-frame">
      {/* breathing halo */}
      <div
        aria-hidden
        className="anim-halo absolute -inset-6 -z-10 rounded-[40%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.66 0.30 0 / 0.55), oklch(0.27 0.10 330 / 0.4) 40%, transparent 70%)",
        }}
      />
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="relative h-full w-full tarot-border rounded-sm overflow-hidden"
      >
        <img
          src={heroCover}
          alt="Witchy Magic — A Premium Cosmetic Collection. Twisted dark fairytale boutique cover."
          className="h-full w-full object-contain object-center"
        />
        <SparkleField count={6} />
      </motion.div>
    </div>
  );
}

function SparkleField({ count }: { count: number }) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    top: 10 + Math.random() * 80,
    left: 10 + Math.random() * 80,
    delay: Math.random() * 4,
    size: 2 + Math.random() * 3,
    color: i % 3 === 0 ? "#f0e8d8" : i % 3 === 1 ? "#ff1493" : "#ff69b4",
  }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="anim-twinkle absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 8px ${s.color}`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
