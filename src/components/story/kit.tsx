/**
 * Building blocks for the case-study storyboards. Scenes are drawn on a fixed
 * 560 × 350 stage (scaled to fit) and receive the active `step`; elements fade
 * or slide in as the story reaches them. Colours come from theme tokens so
 * every scene works in light and dark mode.
 */
import { AnimatePresence, motion, type MotionStyle } from "framer-motion";
import type { ReactNode } from "react";

export const STAGE_W = 560;
export const STAGE_H = 350;
export const EASE = [0.25, 0.1, 0.25, 1] as const;

export interface SceneProps {
  step: number;
}

type Enter = "up" | "down" | "left" | "right" | "pop" | "fade";

const OFFSET: Record<Enter, { x?: number; y?: number; scale?: number }> = {
  up: { y: 10 },
  down: { y: -10 },
  left: { x: 14 },
  right: { x: -14 },
  pop: { scale: 0.88 },
  fade: {},
};

/** Absolutely positioned block in stage coordinates that appears when `show`. */
export function Box({
  x,
  y,
  w,
  h,
  show = true,
  delay = 0,
  enter = "up",
  className = "",
  style,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  show?: boolean;
  delay?: number;
  enter?: Enter;
  className?: string;
  style?: MotionStyle;
  children?: ReactNode;
}) {
  const hidden = { opacity: 0, x: 0, y: 0, scale: 1, ...OFFSET[enter] };
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ left: x, top: y, width: w, height: h, ...style }}
      initial={false}
      animate={show ? { opacity: 1, x: 0, y: 0, scale: 1 } : hidden}
      transition={{ duration: 0.4, ease: EASE, delay: show ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

/** Card with an optional small caps title bar. */
export function Panel({
  title,
  aside,
  className = "",
  children,
  ...box
}: Parameters<typeof Box>[0] & { title?: string; aside?: ReactNode }) {
  return (
    <Box
      {...box}
      className={`overflow-hidden rounded-xl border border-stroke bg-surface shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-stroke px-3 py-[7px]">
          <span className="truncate text-[8px] uppercase tracking-[0.22em] text-muted">{title}</span>
          {aside}
        </div>
      )}
      {children}
    </Box>
  );
}

/** Window chrome with traffic lights, for desktop apps and browsers. */
export function Window({
  title,
  className = "",
  children,
  ...box
}: Parameters<typeof Box>[0] & { title: string }) {
  return (
    <Box
      {...box}
      className={`overflow-hidden rounded-xl border border-stroke bg-surface shadow-[0_10px_40px_-14px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-stroke bg-bg/60 px-3 py-[7px]">
        <span className="h-[6px] w-[6px] rounded-full bg-red-400/80" />
        <span className="h-[6px] w-[6px] rounded-full bg-amber-400/80" />
        <span className="h-[6px] w-[6px] rounded-full bg-green-400/80" />
        <span className="ml-2 truncate text-[8.5px] text-muted">{title}</span>
      </div>
      {children}
    </Box>
  );
}

/** Phone outline with a notch. */
export function Phone({ className = "", children, ...box }: Parameters<typeof Box>[0]) {
  return (
    <Box
      {...box}
      className={`overflow-hidden rounded-[22px] border-[3px] border-text-primary/80 bg-surface shadow-[0_14px_40px_-12px_rgba(0,0,0,0.4)] ${className}`}
    >
      <div className="mx-auto mt-1.5 h-[5px] w-12 rounded-full bg-text-primary/80" />
      {children}
    </Box>
  );
}

/** A camera feed: always dark, with timestamp and REC dot. */
export function Feed({
  label,
  time,
  className = "",
  children,
  ...box
}: Parameters<typeof Box>[0] & { label: string; time?: string }) {
  return (
    <Box {...box} className={`overflow-hidden rounded-lg bg-[#101418] ${className}`}>
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 60%, rgba(120,150,180,0.25), transparent 70%), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 3px)",
        }}
      />
      <span className="absolute left-2 top-1.5 font-mono text-[7.5px] text-white/70">{label}</span>
      {time && (
        <span className="absolute right-2 top-1.5 flex items-center gap-1 font-mono text-[7.5px] text-white/70">
          <motion.span
            className="h-[5px] w-[5px] rounded-full bg-red-500"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          {time}
        </span>
      )}
      {children}
    </Box>
  );
}

/** Placeholder text lines. */
export function Lines({
  widths,
  gap = 7,
  className = "bg-text-primary/15",
}: {
  widths: number[];
  gap?: number;
  className?: string;
}) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {widths.map((w, i) => (
        <span key={i} className={`block h-[3px] rounded-full ${className}`} style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

export type Tone = "ok" | "info" | "warn" | "bad" | "muted";

const PILL: Record<Tone, string> = {
  ok: "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400",
  info: "border-brand/30 bg-brand/10 text-brand-ink",
  warn: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  bad: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
  muted: "border-stroke bg-bg text-muted",
};

export function Pill({
  tone = "muted",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-[2px] text-[8.5px] leading-[1.4] ${PILL[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Check({ tone = "ok", size = 11 }: { tone?: "ok" | "bad"; size?: number }) {
  const ok = tone === "ok";
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-full ${ok ? "bg-green-500" : "bg-red-500"}`}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none" aria-hidden>
        {ok ? (
          <path d="M2.5 6.2 5 8.6l4.6-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M3 3l6 6M9 3 3 9" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
    </span>
  );
}

/** Small caps label. */
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`block text-[7.5px] uppercase tracking-[0.2em] text-muted ${className}`}>
      {children}
    </span>
  );
}

/** A horizontal light beam sweeping down its parent, while `active`. */
export function ScanBeam({ active, height = 140 }: { active: boolean; height?: number }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-0 h-8"
      style={{
        background:
          "linear-gradient(180deg, transparent, color-mix(in srgb, var(--accent-a) 35%, transparent), transparent)",
      }}
      initial={false}
      animate={active ? { opacity: 1, y: [-20, height] } : { opacity: 0 }}
      transition={
        active
          ? { y: { duration: 1, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.2 } }
          : { duration: 0.3 }
      }
    />
  );
}

/** Round rubber-stamp seal that slams onto the page. */
export function Seal({
  text,
  show,
  size = 54,
  rotate = -8,
  delay = 0,
}: {
  text: string;
  show: boolean;
  size?: number;
  rotate?: number;
  delay?: number;
}) {
  const id = `seal-${text.replace(/\W/g, "")}`;
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, rotate }
          : { opacity: 0, scale: 1.7, rotate: rotate - 12 }
      }
      transition={{ duration: 0.28, ease: [0.3, 1.4, 0.5, 1], delay: show ? delay : 0 }}
    >
      <circle cx="30" cy="30" r="27" stroke="var(--accent-b)" strokeWidth="2" />
      <circle cx="30" cy="30" r="21" stroke="var(--accent-b)" strokeWidth="0.8" />
      <path id={id} d="M30 12a18 18 0 1 1 -0.01 0" fill="none" />
      <text style={{ fontSize: 6, letterSpacing: 1.2 }} fill="var(--accent-b)">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
      <path d="M18 28h24M18 33h24" stroke="var(--accent-b)" strokeWidth="1" />
    </motion.svg>
  );
}

/** A signature that draws itself. */
export function Signature({ show, width = 70, delay = 0 }: { show: boolean; width?: number; delay?: number }) {
  return (
    <svg width={width} height={width * 0.36} viewBox="0 0 76 27" fill="none" aria-hidden>
      {[
        "M3 20c4-13 7-15 8-9s-2 14 1 13 5-12 8-11 1 9 4 9 5-9 8-8 0 7 3 7 6-5 8-9",
        "M43 19c10 4 20 2 29-9",
      ].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="hsl(var(--text))"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={false}
          animate={{ pathLength: show ? 1 : 0, opacity: show ? 0.85 : 0 }}
          transition={{ duration: show ? 0.5 : 0.15, ease: "easeInOut", delay: show ? delay + i * 0.4 : 0 }}
        />
      ))}
    </svg>
  );
}

/** Mouse pointer that glides to (x, y) and clicks when `click` is set. */
export function Cursor({
  x,
  y,
  show,
  click = false,
}: {
  x: number;
  y: number;
  show: boolean;
  click?: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-20"
      initial={false}
      animate={{ left: x, top: y, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {click && (
        <motion.span
          key={`${x}-${y}`}
          className="absolute -left-2.5 -top-2.5 h-5 w-5 rounded-full border border-brand"
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 1.4], opacity: [0, 0.9, 0] }}
          transition={{ duration: 0.45, delay: 0.45 }}
        />
      )}
      <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden>
        <path
          d="M1 1l11.5 10.2-5.1.6 2.9 5.6-2 .9-2.9-5.6L1.6 16z"
          fill="hsl(var(--text))"
          stroke="hsl(var(--surface))"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/** Text revealed left to right like it is being typed. */
export function Typed({
  text,
  show,
  duration = 0.7,
  delay = 0,
  className = "",
}: {
  text: string;
  show: boolean;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={`inline-block whitespace-pre ${className}`}
      initial={false}
      animate={{ clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
      transition={{ duration: show ? duration : 0.15, ease: "linear", delay: show ? delay : 0 }}
    >
      {text}
    </motion.span>
  );
}

/** Dashed target box that marks where something will land. */
export function Target({ show, label, className = "" }: { show: boolean; label?: string; className?: string }) {
  return (
    <motion.div
      className={`absolute inset-0 rounded-md border border-dashed border-brand ${className}`}
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 1.15 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {label && (
        <span className="absolute -top-[11px] left-1 whitespace-nowrap rounded bg-brand px-1 text-[6.5px] uppercase tracking-[0.12em] text-white">
          {label}
        </span>
      )}
    </motion.div>
  );
}

/** Arrow between two points on the stage. */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  show,
  delay = 0,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  show: boolean;
  delay?: number;
}) {
  return (
    <svg className="pointer-events-none absolute left-0 top-0" width={STAGE_W} height={STAGE_H} aria-hidden>
      <motion.path
        d={`M${x1} ${y1} L${x2} ${y2}`}
        stroke="var(--accent-b)"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        initial={false}
        animate={{ pathLength: show ? 1 : 0, opacity: show ? 0.9 : 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: show ? delay : 0 }}
      />
      <motion.circle
        cx={x2}
        cy={y2}
        r="2.2"
        fill="var(--accent-b)"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.2, delay: show ? delay + 0.3 : 0 }}
      />
    </svg>
  );
}

/** Thin progress bar that fills while `active`. */
export function Progress({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-[3px] overflow-hidden rounded-full bg-text-primary/10 ${className}`}>
      <motion.div
        className="accent-gradient h-full origin-left rounded-full"
        initial={false}
        animate={{ scaleX: value }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </div>
  );
}

/** Row of named stages along the bottom of a scene; the current one glows. */
export function Pipeline({
  x,
  y,
  w,
  stages,
  active,
}: {
  x: number;
  y: number;
  w: number;
  stages: string[];
  active: number;
}) {
  return (
    <Box x={x} y={y} w={w} h={40} className="flex items-center rounded-xl border border-stroke bg-surface px-3">
      {stages.map((s, i) => (
        <div key={s} className={`flex items-center gap-1.5 ${i < stages.length - 1 ? "flex-1" : ""}`}>
          <span
            className={`whitespace-nowrap rounded-full px-2 py-[3px] text-[8.5px] transition-colors duration-500 ${
              i === active
                ? "accent-gradient text-white"
                : i < active
                  ? "bg-brand/10 text-brand-ink"
                  : "bg-bg text-muted"
            }`}
          >
            {s}
          </span>
          {i < stages.length - 1 && (
            <span className="relative h-px flex-1 overflow-hidden bg-stroke">
              <motion.span
                className="accent-gradient absolute inset-0 origin-left"
                initial={false}
                animate={{ scaleX: i < active ? 1 : 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </span>
          )}
        </div>
      ))}
    </Box>
  );
}

/** Container whose contents cross-fade whenever `id` changes. */
export function Swap({ id, className = "", children }: { id: string | number; className?: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        className={className}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Children that appear one after another (for lists inside a Swap). */
export function Stagger({
  children,
  delay = 0.1,
  gap = 0.14,
  className = "",
}: {
  children: ReactNode[];
  delay?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <>
      {children.map((child, i) => (
        <motion.div
          key={i}
          className={className}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease: EASE, delay: delay + i * gap }}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
}

/** Semicircle gauge from 0 to 100. */
export function Gauge({ value, show, size = 120, label }: { value: number; show: boolean; size?: number; label?: string }) {
  const r = 42;
  const len = Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size * 0.62 }}>
      <svg width={size} height={size * 0.62} viewBox="0 0 100 62" fill="none" aria-hidden>
        <path d="M8 54a42 42 0 0 1 84 0" stroke="hsl(var(--text) / 0.1)" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d="M8 54a42 42 0 0 1 84 0"
          stroke="var(--accent-b)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={len}
          initial={false}
          animate={{ strokeDashoffset: show ? len * (1 - value / 100) : len }}
          transition={{ duration: 0.8, ease: EASE, delay: show ? 0.1 : 0 }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <motion.span
          className="block font-display text-[26px] italic leading-none text-text-primary"
          initial={false}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.3, delay: show ? 0.5 : 0 }}
        >
          {value}
        </motion.span>
        {label && <span className="block text-[7.5px] uppercase tracking-[0.2em] text-muted">{label}</span>}
      </div>
    </div>
  );
}

/** Animated audio waveform. */
export function Wave({ active, bars = 18, height = 18, className = "bg-brand" }: { active: boolean; bars?: number; height?: number; className?: string }) {
  return (
    <div className="flex items-center gap-[2px]" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span
          key={i}
          className={`block w-[2px] rounded-full ${className}`}
          initial={false}
          animate={
            active
              ? { height: [height * 0.2, height * (0.35 + ((i * 37) % 60) / 100), height * 0.2] }
              : { height: height * 0.15 }
          }
          transition={active ? { duration: 0.7 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
}

/** Side view of a tipper truck. */
export function TruckIcon({ width = 90 }: { width?: number }) {
  return (
    <svg width={width} height={width * 0.5} viewBox="0 0 90 45" fill="none" aria-hidden>
      <path d="M4 10h50v22H4z" fill="hsl(var(--text) / 0.12)" stroke="hsl(var(--text) / 0.55)" strokeWidth="1.2" />
      <path d="M8 10l6-6h34l6 6" stroke="hsl(var(--text) / 0.4)" strokeWidth="1.2" />
      <path d="M54 16h16l10 9v7H54z" fill="hsl(var(--text) / 0.18)" stroke="hsl(var(--text) / 0.55)" strokeWidth="1.2" />
      <path d="M60 19h9l6 6H60z" fill="rgb(var(--brand) / 0.35)" />
      {[16, 40, 68].map((cx) => (
        <circle key={cx} cx={cx} cy="35" r="6" fill="hsl(var(--surface))" stroke="hsl(var(--text) / 0.6)" strokeWidth="1.6" />
      ))}
      <rect x="72" y="27" width="10" height="4" rx="1" fill="#facc15" />
    </svg>
  );
}
