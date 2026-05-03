import corner from "@/assets/corner-ornament.png";

/** Fixed golden rose vine ornaments at the four viewport corners. Persists during scroll. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed z-40 select-none w-[140px] h-[140px] md:w-[200px] md:h-[200px] lg:w-[240px] lg:h-[240px] opacity-90 drop-shadow-[0_0_18px_oklch(0.74_0.10_80_/_0.35)]";
  return (
    <div aria-hidden className="contents">
      <img src={corner} alt="" className={`${base} top-0 left-0`} />
      <img src={corner} alt="" className={`${base} top-0 right-0 -scale-x-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 left-0 -scale-y-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 right-0 -scale-x-100 -scale-y-100`} />
    </div>
  );
}
