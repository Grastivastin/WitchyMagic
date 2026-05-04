import corner from "@/assets/corner-ornament.png";

/** Fixed golden rose vine ornaments at the four viewport corners. Persists during scroll. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed z-40 select-none w-[110px] h-[110px] md:w-[150px] md:h-[150px] lg:w-[180px] lg:h-[180px] opacity-95 drop-shadow-[0_0_14px_oklch(0.74_0.10_80_/_0.45)]";
  return (
    <div aria-hidden className="contents">
      <img src={corner} alt="" className={`${base} top-0 left-0`} />
      <img src={corner} alt="" className={`${base} top-0 right-0 -scale-x-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 left-0 -scale-y-100`} />
      <img src={corner} alt="" className={`${base} bottom-0 right-0 -scale-x-100 -scale-y-100`} />
    </div>
  );
}
