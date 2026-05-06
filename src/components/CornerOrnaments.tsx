import cornerOrnament from "@/assets/corner-ornament.png";

/** Four delicate gold rose-vine corner ornaments framing every page like a storybook. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed z-40 select-none w-[70px] sm:w-[90px] md:w-[120px] lg:w-[140px] h-auto opacity-85";
  const filter = "drop-shadow(0 0 6px oklch(0.78 0.10 80 / 0.35))";
  return (
    <div aria-hidden className="contents">
      {/* top-left */}
      <img
        src={cornerOrnament}
        alt=""
        className={`${base} top-0 left-0`}
        style={{ filter }}
      />
      {/* top-right */}
      <img
        src={cornerOrnament}
        alt=""
        className={`${base} top-0 right-0`}
        style={{ filter, transform: "scaleX(-1)" }}
      />
      {/* bottom-left */}
      <img
        src={cornerOrnament}
        alt=""
        className={`${base} bottom-0 left-0`}
        style={{ filter, transform: "scaleY(-1)" }}
      />
      {/* bottom-right */}
      <img
        src={cornerOrnament}
        alt=""
        className={`${base} bottom-0 right-0`}
        style={{ filter, transform: "scale(-1, -1)" }}
      />
    </div>
  );
}
