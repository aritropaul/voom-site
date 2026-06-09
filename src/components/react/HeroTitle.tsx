import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Line = { text: string; tint?: boolean };

/**
 * cap.so-style per-character blur-reveal headline.
 * Splits into words (no mid-word wraps) then animates each glyph.
 */
export default function HeroTitle({
  lines,
  className,
}: {
  lines: Line[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  let idx = 0;

  return (
    <h1 className={className}>
      {lines.map((line, li) => {
        const grad = line.tint ? "text-grad-tint" : "text-grad";
        if (reduce) {
          return (
            <span key={li} className={`block ${grad}`}>
              {line.text}
            </span>
          );
        }
        const words = line.text.split(" ");
        return (
          <span key={li} className="block">
            {words.map((word, wi) => (
              <Fragment key={wi}>
                <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                  {word.split("").map((ch, ci) => {
                    const i = idx++;
                    return (
                      <motion.span
                        key={ci}
                        className={grad}
                        style={{ display: "inline-block" }}
                        initial={{ opacity: 0, y: "0.42em", filter: "blur(7px)" }}
                        animate={{ opacity: 1, y: "0em", filter: "blur(0px)" }}
                        transition={{
                          duration: 0.4,
                          delay: 0.12 + i * 0.022,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
                {wi < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </h1>
  );
}
