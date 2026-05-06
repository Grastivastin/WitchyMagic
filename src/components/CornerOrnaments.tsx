import sideBorder from "@/assets/side-border.png";

/** Slim golden rose-vine ribbons hugging the left and right edges of every page. */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed inset-y-0 z-40 select-none w-[22px] sm:w-[28px] md:w-[34px] lg:w-[40px] opacity-90";
  const style = {
    backgroundImage: `url(${sideBorder})`,
    backgroundRepeat: "repeat-y" as const,
    backgroundSize: "100% auto",
    backgroundPosition: "center top",
    filter: "drop-shadow(0 0 6px oklch(0.78 0.10 80 / 0.45))",
  };
  return (
    <div aria-hidden className="contents">
      <div className={`${base} left-0`} style={style} />
      <div
        className={`${base} right-0`}
        style={{ ...style, transform: "scaleX(-1)" }}
      />
    </div>
  );
}
