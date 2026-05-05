import sideBorder from "@/assets/side-border.png";

/** Fixed full-height golden rose vine borders down the left and right edges of every page. */
export function CornerOrnaments() {
  return (
    <div aria-hidden className="contents">
      <img
        src={sideBorder}
        alt=""
        className="pointer-events-none fixed top-0 left-0 z-40 select-none h-screen w-[70px] sm:w-[90px] md:w-[120px] lg:w-[150px] object-cover opacity-95 drop-shadow-[0_0_18px_oklch(0.74_0.10_80_/_0.55)]"
        style={{ objectPosition: "center center" }}
      />
      <img
        src={sideBorder}
        alt=""
        className="pointer-events-none fixed top-0 right-0 z-40 select-none h-screen w-[70px] sm:w-[90px] md:w-[120px] lg:w-[150px] object-cover opacity-95 drop-shadow-[0_0_18px_oklch(0.74_0.10_80_/_0.55)]"
        style={{ objectPosition: "center center", transform: "scaleX(-1)" }}
      />
    </div>
  );
}
