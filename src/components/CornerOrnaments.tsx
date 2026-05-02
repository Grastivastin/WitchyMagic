import cornerImg from "@/assets/corner-ornament.png";

/**
 * Storybook gold-vine ornaments fixed to each corner of the viewport.
 * Renders site-wide via __root.tsx so every page gets the framed-page feel.
 * pointer-events: none so it never blocks interaction. Hidden on small screens.
 */
export function CornerOrnaments() {
  const base =
    "pointer-events-none fixed z-40 hidden sm:block w-[160px] md:w-[220px] lg:w-[280px] opacity-90 select-none drop-shadow-[0_4px_18px_rgba(0,0,0,0.55)]";
  return (
    <div aria-hidden>
      <img src={cornerImg} alt="" className={`${base} top-2 left-2`} />
      <img
        src={cornerImg}
        alt=""
        className={`${base} top-2 right-2`}
        style={{ transform: "scaleX(-1)" }}
      />
      <img
        src={cornerImg}
        alt=""
        className={`${base} bottom-2 left-2`}
        style={{ transform: "scaleY(-1)" }}
      />
      <img
        src={cornerImg}
        alt=""
        className={`${base} bottom-2 right-2`}
        style={{ transform: "scale(-1, -1)" }}
      />
    </div>
  );
}
