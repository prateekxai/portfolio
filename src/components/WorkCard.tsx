import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { WorkItem } from "../data/work";
import { SourceMark } from "./RichText";
import StatusPill from "./StatusPill";

const HALFTONE = "radial-gradient(circle, hsl(var(--text) / 0.55) 1px, transparent 1px)";

// Glow anchors cycle so neighbouring cards never look identical.
const GLOWS = ["18% 28%", "82% 22%", "50% 85%", "12% 80%", "88% 78%", "55% 18%"];

export default function WorkCard({
  item,
  index,
}: {
  item: WorkItem;
  /** Position in the full work list — drives the number and glow. */
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="h-full"
    >
      <Link to={`/work/${item.slug}`} className="group relative block h-full rounded-3xl">
        {/* Gradient ring on hover */}
        <span
          className="accent-gradient absolute rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ inset: "-1.5px" }}
        />

        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-stroke bg-surface">
          {/* Visual header: glow + halftone + headline figure */}
          <div className="relative h-48 overflow-hidden border-b border-stroke bg-bg">
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `radial-gradient(65% 85% at ${GLOWS[index % GLOWS.length]}, rgba(78,133,191,0.38), rgba(137,170,204,0.08) 45%, transparent 75%)`,
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: HALFTONE, backgroundSize: "4px 4px" }}
            />

            <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-2xl italic text-text-primary/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <StatusPill status={item.status} tone={item.statusTone} />
              </div>
              <div>
                <p className="font-display text-5xl italic leading-none text-text-primary">
                  {item.headline.value}
                  <SourceMark source={item.headline.source} />
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {item.headline.label}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col p-5 md:p-6">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted">
              {item.category}
            </p>
            <h3 className="mb-3 font-display text-2xl italic leading-tight text-text-primary md:text-3xl">
              {item.name}
            </h3>
            <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-text-primary/70">
              {item.hook}
            </p>

            <div className="mt-auto flex items-center justify-between gap-4 border-t border-stroke pt-4">
              <span className="truncate text-xs text-muted">
                {item.annualValue
                  ? `${item.annualValue.value} in value a year`
                  : item.skills.slice(0, 2).join(" · ")}
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm text-text-primary">
                {item.kind === "case-study" ? "Case study" : "Project"}
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
