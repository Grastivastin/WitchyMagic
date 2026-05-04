import sideBorder from "@/assets/side-border.png";

/** Fixed full-height golden rose vine borders down the left and right edges. Persist on every page during scroll. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed top-0 bottom-0 z-40 select-none h-screen w-[48px] sm:w-[64px] md:w-[88px] lg:w-[110px] opacity-90 drop-shadow-[0_0_12px_oklch(0.74_0.10_80_/_0.4)]";
  return (
    <div aria-hidden className="contents">
      <img
        src={sideBorder}
        alt=""
        className={`${base} left-0 object-cover object-left`}
        style={{ objectPosition: "left center" }}
      />
      <img
        src={sideBorder}
        alt=""
        className={`${base} right-0 object-cover -scale-x-100`}
        style={{ objectPosition: "left center" }}
      />
    </div>
  );
}
