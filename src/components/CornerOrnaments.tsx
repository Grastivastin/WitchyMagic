import corner from "@/assets/corner-ornament.png";

/** Fixed golden rose vine ornaments at the four viewport corners. Persists during scroll. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed z-40 select-none w-[70px] h-[70px] md:w-[96px] md:h-[96px] lg:w-[110px] lg:h-[110px] opacity-80 drop-shadow-[0_0_10px_oklch(0.74_0.10_80_/_0.35)]";
  return (
    <div aria-hidden className="contents">
      <img src={corner} alt="" className={`${base} top-0 left-0`} />
      <img src={corner} alt="" className={`${base} top-0 right-0 -scale-x-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 left-0 -scale-y-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 right-0 -scale-x-100 -scale-y-100`} />
    </div>
  );
}
