import { useLayoutEffect, useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { EASE, STAGE_H, STAGE_W, type SceneProps } from "./kit";

export interface StoryStep {
  title: string;
  caption: string;
}

/** How long each step stays on screen while auto-playing. */
const STEP_MS = 2600;

/** Fits the fixed-size stage to the available width. */
function Stage({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / STAGE_W);
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="relative w-full overflow-hidden bg-bg"
      style={{ height: STAGE_H * scale }}
    >
      {/* Dot grid + glow backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--text) / 0.09) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 35%, rgb(var(--brand) / 0.12), transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

function Icon({ name }: { name: "play" | "pause" | "prev" | "next" }) {
  const d = {
    play: "M2 1l7 4-7 4z",
    pause: "M2 1h2.2v8H2zM5.8 1H8v8H5.8z",
    prev: "M6.5 1.5 3 5l3.5 3.5",
    next: "M3.5 1.5 7 5 3.5 8.5",
  }[name];
  const stroke = name === "prev" || name === "next";
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <path
        d={d}
        fill={stroke ? "none" : "currentColor"}
        stroke={stroke ? "currentColor" : "none"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CONTROL =
  "grid h-8 w-8 place-items-center rounded-full border border-stroke bg-bg text-text-primary transition-colors hover:bg-surface";

/**
 * Plays a project's scene step by step. It starts on its own as soon as it
 * scrolls into view; readers can click the stage (or use the arrow keys) to
 * move ahead, jump to any step, or pause.
 */
export default function Storyboard({
  steps,
  Scene,
}: {
  steps: StoryStep[];
  Scene: ComponentType<SceneProps>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);

  const playing = inView && !paused && !reduceMotion;

  // Paced by the wall clock: framer caps per-frame deltas at 40 ms, which
  // would slow the walkthrough down on devices that drop frames.
  const lastFrame = useRef<number | null>(null);
  useAnimationFrame(() => {
    const now = performance.now();
    const last = lastFrame.current;
    lastFrame.current = now;
    if (!playing || last === null) return;
    const next = progress.get() + Math.min(now - last, 250) / STEP_MS;
    if (next >= 1) {
      progress.set(0);
      setStep((s) => (s + 1) % steps.length);
    } else {
      progress.set(next);
    }
  });

  const goTo = (i: number) => {
    progress.set(0);
    setStep((i + steps.length) % steps.length);
  };

  const current = steps[step];

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") goTo(step + 1);
        else if (e.key === "ArrowLeft") goTo(step - 1);
        else return;
        e.preventDefault();
      }}
      aria-label="Project walkthrough. Use the arrow keys to move between steps."
      className="overflow-hidden rounded-3xl border border-stroke bg-surface outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
    >
      <div onClick={() => goTo(step + 1)} className="group relative cursor-pointer border-b border-stroke">
        <Stage label={`${current.title}. ${current.caption}`}>
          <Scene step={step} />
        </Stage>
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-stroke bg-surface/80 px-2.5 py-1 text-[11px] text-muted opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
          Click for the next step
        </span>
      </div>

      {/* Steps */}
      <div className="p-5 md:p-6">
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
        >
          {steps.map((s, i) => (
            <button
              key={s.title}
              onClick={() => goTo(i)}
              aria-current={i === step ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className="group flex flex-col gap-2 py-1 text-left"
            >
              <span className="h-[3px] w-full overflow-hidden rounded-full bg-text-primary/10 transition-colors group-hover:bg-text-primary/20">
                {i < step ? (
                  <span className="accent-gradient block h-full w-full" />
                ) : i === step ? (
                  <motion.span
                    className="accent-gradient block h-full w-full origin-left"
                    style={{ scaleX: reduceMotion || paused ? 1 : progress }}
                  />
                ) : null}
              </span>
              <span
                className={`hidden text-xs leading-snug transition-colors duration-300 md:block ${
                  i === step ? "text-text-primary" : "text-muted group-hover:text-text-primary"
                }`}
              >
                <span className="font-display text-sm italic opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>{" "}
                {s.title}
              </span>
            </button>
          ))}
        </div>

        <div className="relative mt-5 md:min-h-[4.5rem] md:pr-40">
          <div aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <p className="mb-1.5 font-display text-2xl italic text-text-primary md:text-[1.7rem]">
                  {current.title}
                </p>
                <p className="max-w-[62ch] text-sm leading-relaxed text-muted md:text-[15px]">
                  {current.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Counter + controls (below the caption on phones) */}
          <div className="mt-4 flex items-center gap-1.5 md:absolute md:right-0 md:top-0.5 md:mt-0">
            <span className="mr-1 text-xs tabular-nums text-muted">
              {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <button onClick={() => goTo(step - 1)} aria-label="Previous step" className={CONTROL}>
              <Icon name="prev" />
            </button>
            {!reduceMotion && (
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play walkthrough" : "Pause walkthrough"}
                className={CONTROL}
              >
                <Icon name={paused ? "play" : "pause"} />
              </button>
            )}
            <button onClick={() => goTo(step + 1)} aria-label="Next step" className={CONTROL}>
              <Icon name="next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
