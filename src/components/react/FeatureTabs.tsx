import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Feature = { title: string; desc: string };
type Tab = { id: string; label: string; features: Feature[] };

/** Interactive feature switcher with a spring "pill" indicator + panel cross-fade. */
export default function FeatureTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tab = tabs[active];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className="relative h-10 rounded-full px-4 text-[13.5px] font-medium transition-colors"
            style={{ color: active === i ? "var(--color-tint-bright)" : "var(--color-muted)" }}
          >
            {active === i && (
              <motion.span
                layoutId="tabpill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "var(--color-tint-soft)",
                  border: "1px solid rgba(255,59,49,0.35)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 grid gap-3.5 sm:grid-cols-2"
        >
          {tab.features.map((f, i) => (
            <div key={i} className="card card-hover">
              <h3 className="text-[15px] font-medium" style={{ color: "var(--color-title)" }}>
                {f.title}
              </h3>
              <p className="mt-1.5 text-[14px]" style={{ color: "var(--color-body)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
