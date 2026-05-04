import { useEffect, useRef } from "react";

type Particle = {
  el: HTMLDivElement;
  born: number;
};

const COLORS = ["#ff1493", "#ff69b4", "#f0e8d8", "#c9a96e"];
const MAX_PARTICLES = 18;
const LIFE_MS = 700;

export function GlitterCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;

    const dot = dotRef.current;
    const layer = layerRef.current;
    if (!dot || !layer) return;

    let scaleUp = false;
    let lastSpawn = 0;
    let mouseX = -100;
    let mouseY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px) scale(${scaleUp ? 2 : 1})`;

      const now = performance.now();
      if (now - lastSpawn < 80) return;
      lastSpawn = now;

      if (particlesRef.current.length >= MAX_PARTICLES) return;

      const sparkle = document.createElement("div");
      const size = 2 + Math.random() * 3;
      const ox = (Math.random() - 0.5) * 14;
      const oy = (Math.random() - 0.5) * 14;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      sparkle.style.cssText = `
        position: fixed;
        left: ${mouseX + ox}px;
        top: ${mouseY + oy}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 9999px;
        pointer-events: none;
        box-shadow: 0 0 6px ${color};
        opacity: 1;
        transition: transform ${LIFE_MS}ms ease-out, opacity ${LIFE_MS}ms ease-out;
        will-change: transform, opacity;
        z-index: 9999;
      `;
      layer.appendChild(sparkle);
      const p: Particle = { el: sparkle, born: now };
      particlesRef.current.push(p);
      requestAnimationFrame(() => {
        sparkle.style.transform = `translateY(-${15 + Math.random() * 10}px)`;
        sparkle.style.opacity = "0";
      });
      setTimeout(() => {
        sparkle.remove();
        particlesRef.current = particlesRef.current.filter((x) => x !== p);
      }, LIFE_MS + 50);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [role='button'], input, textarea, select, label");
      scaleUp = !!interactive;
      dot.style.boxShadow = scaleUp
        ? "0 0 20px #ff1493, 0 0 36px #ff69b4"
        : "0 0 12px #ff1493, 0 0 24px #ff69b4";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 10,
          height: 10,
          borderRadius: 9999,
          background: "#ff1493",
          boxShadow: "0 0 12px #ff1493, 0 0 24px #ff69b4",
          transition: "transform 60ms ease-out, box-shadow 200ms ease",
          transform: "translate(-100px, -100px)",
        }}
      />
      <div ref={layerRef} aria-hidden className="pointer-events-none fixed inset-0 z-[9998]" />
    </>
  );
}
