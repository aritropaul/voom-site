import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

type Props = { src: string; alt: string };

/** Floating product screenshot with mouse-parallax tilt + iridescent glow. */
export default function HeroShot({ src, alt }: Props) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5.5, -5.5]), {
    stiffness: 120,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6.5, 6.5]), {
    stiffness: 120,
    damping: 18,
  });

  function onMove(e: { currentTarget: HTMLElement; clientX: number; clientY: number }) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative" style={{ perspective: 1500 }}>
      {/* iridescent glow behind the frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-12 -top-16 bottom-2 z-0"
        style={{
          background:
            "radial-gradient(46% 52% at 46% 42%, rgba(255,59,49,0.40), transparent 70%), radial-gradient(40% 46% at 62% 40%, rgba(255,126,138,0.30), transparent 72%), radial-gradient(50% 56% at 56% 64%, rgba(124,140,255,0.18), transparent 74%)",
          filter: "blur(72px)",
        }}
      />
      <motion.div
        onMouseMove={reduce ? undefined : onMove}
        onMouseLeave={reduce ? undefined : onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative z-10"
      >
        <div className={reduce ? "" : "floaty"}>
          <div className="shot">
            <img
              src={src}
              alt={alt}
              loading="eager"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
