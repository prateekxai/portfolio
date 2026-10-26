import { motion } from "framer-motion";
import { Label, Panel, Pill, Swap, type SceneProps } from "../kit";

// LangGraph nodes, in stage coordinates inside the graph panel.
const NODES = [
  { id: "in", label: "patient data", x: 14, y: 52 },
  { id: "analyse", label: "analyse", x: 112, y: 52 },
  { id: "route", label: "route", x: 204, y: 52 },
  { id: "doctor", label: "doctor alert", x: 300, y: 18 },
  { id: "patient", label: "notify patient", x: 300, y: 86 },
  { id: "save", label: "save + dispatch", x: 412, y: 52 },
];
const EDGES: [string, string][] = [
  ["in", "analyse"],
  ["analyse", "route"],
  ["route", "doctor"],
  ["route", "patient"],
  ["doctor", "save"],
  ["patient", "save"],
];
const ACTIVE: string[][] = [["in"], ["in", "analyse"], ["in", "analyse", "route"], ["in", "analyse", "route", "doctor", "save"], ["in", "analyse", "route", "doctor", "patient", "save"]];

const NODE_W = 84;
const center = (id: string) => {
  const n = NODES.find((m) => m.id === id)!;
  return { x: n.x + NODE_W / 2, y: n.y + 13 };
};

// Systolic BP over ten days, against a target of 130.
const BP = [126, 128, 127, 131, 129, 134, 138, 141, 143, 146];

export default function ChronicAiScene({ step }: SceneProps) {
  const lit = ACTIVE[step];
  const W = 228;
  const Hh = 92;
  const x = (i: number) => 8 + (i / (BP.length - 1)) * (W - 16);
  const y = (v: number) => Hh - 8 - ((v - 120) / 30) * (Hh - 16);
  return (
    <>
      {/* Graph */}
      <Panel x={16} y={16} w={528} h={150} title="langgraph workflow">
        <div className="relative h-[124px]">
          <svg className="absolute inset-0" width="528" height="124" aria-hidden>
            {EDGES.map(([a, b]) => {
              const p1 = center(a);
              const p2 = center(b);
              const on = lit.includes(a) && lit.includes(b);
              return (
                <motion.path
                  key={`${a}-${b}`}
                  d={`M${p1.x} ${p1.y} L${p2.x} ${p2.y}`}
                  stroke={on ? "var(--accent-b)" : "hsl(var(--text) / 0.15)"}
                  strokeWidth={on ? 1.6 : 1}
                  initial={false}
                  animate={{ pathLength: on ? 1 : 1 }}
                />
              );
            })}
          </svg>
          {NODES.map((n) => {
            const on = lit.includes(n.id);
            const dimmed = step >= 3 && n.id === "patient" && step === 3;
            return (
              <motion.div
                key={n.id}
                className={`absolute grid h-[26px] place-items-center rounded-full border text-[8.5px] transition-colors duration-300 ${
                  on ? "border-brand bg-surface text-text-primary shadow-[inset_0_0_0_60px_rgb(var(--brand)/0.15)]" : "border-stroke bg-surface text-muted"
                }`}
                style={{ left: n.x, top: n.y, width: NODE_W }}
                initial={false}
                animate={{ scale: on && !dimmed ? 1 : 0.96, opacity: dimmed ? 0.5 : 1 }}
              >
                {n.label}
              </motion.div>
            );
          })}
        </div>
      </Panel>

      {/* Vitals */}
      <Panel x={16} y={176} w={250} h={158} title="10 days · systolic BP" aside={step >= 1 ? <Pill tone="warn">above target</Pill> : undefined}>
        <div className="px-3 pt-2">
          <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`} fill="none" aria-hidden>
            <path d={`M8 ${y(130)}H${W - 8}`} stroke="rgb(var(--brand) / 0.6)" strokeDasharray="3 3" />
            <motion.path
              d={BP.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ")}
              stroke="hsl(var(--text))"
              strokeWidth="1.6"
              initial={false}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.8 }}
            />
            {BP.map((v, i) => (v > 130 ? <circle key={i} cx={x(i)} cy={y(v)} r="2.4" fill={step >= 1 ? "#ef4444" : "transparent"} /> : null))}
          </svg>
          <div className="flex justify-between text-[7px] text-muted">
            <span>target 130</span>
            <span>today 146</span>
          </div>
        </div>
      </Panel>

      {/* Output */}
      <Panel x={278} y={176} w={266} h={158} title={["patient profile", "gemini analysis", "routing decision", "doctor alert", "patient summary"][step]}>
        <Swap id={step} className="flex flex-col gap-1.5 p-2.5 text-[8.5px] leading-snug">
          {step === 0 && (
            <>
              {[["patient", "R. Verma, 58"], ["condition", "Type 2 diabetes, hypertension"], ["target", "BP under 130/80"], ["logs", "HR, BP, SpO₂, steps · 10 days"]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-stroke pb-1">
                  <span className="text-muted">{k}</span>
                  <span className="text-right text-text-primary">{v}</span>
                </div>
              ))}
            </>
          )}
          {step === 1 && (
            <span className="text-text-primary">
              Systolic BP has risen steadily for six days and has been above target on five of them. Activity dropped by a third over the same period.
            </span>
          )}
          {step === 2 && (
            <>
              <Label>decision</Label>
              <div className="flex items-center gap-2">
                <Pill tone="bad">escalate to doctor</Pill>
                <span className="text-muted line-through">notify patient only</span>
              </div>
              <span className="text-muted">Reason: a sustained trend above target, not a single bad reading.</span>
            </>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-red-500/40 bg-red-500/5 p-2">
              <span className="block font-medium text-text-primary">Dr. Sharma · review R. Verma</span>
              <span className="mt-0.5 block text-muted">BP 146 systolic, rising 6 days. Reasoning and 10-day chart attached. Report saved.</span>
            </motion.div>
          )}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl rounded-bl-sm border border-stroke bg-bg p-2 text-text-primary">
              Your blood pressure has been higher than your target this week. Your doctor has been informed and may call you. Keep logging daily and take a short walk after meals.
            </motion.div>
          )}
        </Swap>
      </Panel>
    </>
  );
}
