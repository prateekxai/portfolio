import { motion } from "framer-motion";
import { Label, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const ROOMS = [
  { name: "Living", x: 10, y: 10, w: 110, h: 90, tint: "#c9b79c" },
  { name: "Kitchen & Dining", x: 120, y: 10, w: 80, h: 90, tint: "#a7b8a0" },
  { name: "Bedroom", x: 10, y: 100, w: 100, h: 90, tint: "#b9a8c4" },
  { name: "Bath", x: 110, y: 100, w: 90, h: 90, tint: "#9fb6c8" },
];

function Render({ tint, delay, variant }: { tint: string; delay: number; variant: number }) {
  return (
    <motion.div
      className="relative h-[58px] overflow-hidden rounded-md"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.45, delay }}
      style={{ background: `linear-gradient(180deg, ${tint}55, ${tint})` }}
    >
      <span className="absolute inset-x-0 bottom-0 h-[38%]" style={{ background: variant ? "#8a6b4e" : "#a98c6d" }} />
      <span className="absolute left-[12%] top-[14%] h-[44%] w-[24%] rounded-sm bg-white/70" />
      <span className="absolute bottom-[22%] right-[10%] h-[30%] w-[38%] rounded-md" style={{ background: variant ? "#5d6b5a" : "#efe6d8" }} />
      <span className="absolute bottom-[38%] left-[46%] h-[22%] w-[6%] rounded-full bg-green-700/70" />
    </motion.div>
  );
}

export default function CadVisualizerScene({ step }: SceneProps) {
  return (
    <>
      {/* The CAD drawing */}
      <Panel x={16} y={16} w={228} h={318} title="floor_plan.pdf">
        <div className="relative p-3">
          <svg width="210" height="200" viewBox="0 0 210 200" fill="none" aria-hidden>
            <rect x="10" y="10" width="190" height="180" stroke="hsl(var(--text))" strokeWidth="2.4" />
            <path d="M120 10V100M10 100H200M110 100V190" stroke="hsl(var(--text))" strokeWidth="1.4" />
            <path d="M60 100h18M150 100h16M120 40v16M110 140v16" stroke="hsl(var(--bg))" strokeWidth="3" />
            <path d="M60 100a18 18 0 0 1 18 -18M150 100a16 16 0 0 0 16 16" stroke="hsl(var(--text) / 0.5)" strokeWidth="0.8" />
            {[30, 50, 70].map((x) => (
              <rect key={x} x={x} y="150" width="12" height="24" stroke="hsl(var(--text) / 0.4)" strokeWidth="0.8" />
            ))}
            <circle cx="160" cy="160" r="10" stroke="hsl(var(--text) / 0.4)" strokeWidth="0.8" />
          </svg>
          {ROOMS.map((r, i) => (
            <motion.div
              key={r.name}
              className="absolute grid place-items-center rounded-sm border border-dashed border-brand"
              style={{ left: 12 + r.x, top: 12 + r.y, width: r.w, height: r.h, background: `${r.tint}33` }}
              initial={false}
              animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.95 }}
              transition={{ delay: step === 2 ? 0.1 + i * 0.12 : 0 }}
            >
              <span className="rounded bg-brand px-1 text-[7px] text-white">{r.name}</span>
            </motion.div>
          ))}
          <div className="mt-2 flex flex-wrap gap-1">
            <Pill tone={step >= 2 ? "info" : "muted"}>{step >= 2 ? "4 sections found" : "uploaded · 2.1 MB"}</Pill>
          </div>
        </div>
      </Panel>

      {/* Preferences */}
      <Panel x={256} y={16} w={288} h={74} title="look and feel">
        <div className="flex items-center gap-1.5 p-2.5">
          {[["style", "Japandi"], ["vibe", "Calm"]].map(([k, v]) => (
            <motion.span key={k} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
              <Pill tone={step >= 1 ? "info" : "muted"}>
                {k}: {v}
              </Pill>
            </motion.span>
          ))}
          <motion.div className="ml-1 flex gap-1" initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }}>
            {["#efe6d8", "#c9b79c", "#8a6b4e", "#5d6b5a"].map((c) => (
              <span key={c} className="h-4 w-4 rounded-full border border-stroke" style={{ background: c }} />
            ))}
          </motion.div>
        </div>
      </Panel>

      {/* Renders */}
      <Panel
        x={256}
        y={100}
        w={288}
        h={234}
        title={step >= 3 ? "renders · 2 per room" : "renders"}
        aside={step === 4 ? <Pill tone="ok">pick one per room</Pill> : step === 3 ? <Pill tone="info">in parallel</Pill> : undefined}
      >
        <Swap id={step >= 3 ? "renders" : step === 2 ? "sections" : "wait"} className="p-2.5 text-[8px]">
          {step < 2 && <span className="text-muted">No room list to fill in. The model finds the rooms itself.</span>}
          {step === 2 && (
            <Stagger gap={0.1}>
              {ROOMS.map((r) => (
                <div key={r.name} className="mb-1.5 border-b border-stroke pb-1">
                  <span className="block text-text-primary">{r.name}</span>
                  <span className="text-[7px] text-muted">viewpoint: from the doorway, facing the window</span>
                </div>
              ))}
            </Stagger>
          )}
          {step >= 3 && (
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
              {ROOMS.map((r, i) => (
                <div key={r.name}>
                  <Label className="mb-0.5">{r.name}</Label>
                  <div className="grid grid-cols-2 gap-1">
                    <Render tint={r.tint} delay={step === 3 ? i * 0.12 : 0} variant={0} />
                    <Render tint={r.tint} delay={step === 3 ? i * 0.12 + 0.06 : 0} variant={1} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Swap>
      </Panel>
    </>
  );
}
