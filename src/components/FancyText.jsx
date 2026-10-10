/* Adapted from Fancy Components by Daniel Petho, MIT licensed.
 * Text Highlighter and Letter Swap Forward, https://github.com/danielpetho/fancy
 * See THIRD_PARTY_NOTICES.md for license and source links.
 */
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useAnimate,
  stagger,
} from "motion/react";
export function TextHighlighter({ children }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  return (
    <span ref={ref}>
      <motion.span
        className="fancy-highlight"
        style={{
          backgroundImage: "linear-gradient(#fde7c4,#fde7c4)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0% 90%",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
        initial={{ backgroundSize: reduced ? "100% 45%" : "0% 45%" }}
        animate={{ backgroundSize: visible || reduced ? "100% 45%" : "0% 45%" }}
        transition={{ type: "spring", duration: 1.05, bounce: 0, delay: 0.25 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
export function LetterSwap({ label }) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const reduced = useReducedMotion();
  async function swap() {
    if (blocked || reduced) return;
    setBlocked(true);
    await Promise.all([
      animate(
        ".letter",
        { y: "100%" },
        { duration: 0.35, delay: stagger(0.018) },
      ),
      animate(
        ".letter-secondary",
        { top: "0%" },
        { duration: 0.35, delay: stagger(0.018) },
      ),
    ]);
    await Promise.all([
      animate(".letter", { y: 0 }, { duration: 0 }),
      animate(".letter-secondary", { top: "-100%" }, { duration: 0 }),
    ]);
    setBlocked(false);
  }
  useEffect(() => {
    const control = scope.current?.closest("a,button");
    control?.addEventListener("focus", swap);
    return () => control?.removeEventListener("focus", swap);
  });
  return (
    <span
      className="letter-swap"
      ref={scope}
      onMouseEnter={swap}
      onFocus={swap}
    >
      <span className="sr-only">{label}</span>
      {label.split("").map((l, i) => (
        <span className="letter-slot" aria-hidden="true" key={i}>
          <motion.span className="letter">
            {l === " " ? "\u00a0" : l}
          </motion.span>
          <motion.span className="letter-secondary" style={{ top: "-100%" }}>
            {l === " " ? "\u00a0" : l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
