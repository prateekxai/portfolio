import { motion } from "framer-motion";
import { Check, Label, Panel, Pill, Stagger, Swap, Typed, Wave, Window, type SceneProps } from "../kit";

const INTENTS = ["explain", "quiz", "translate", "activity"];
const LIT = [[], ["explain"], ["explain"], ["quiz", "translate"], ["activity"]];
const SAID = [
  "Explain photosynthesis in Hinglish",
  "Explain photosynthesis in Hinglish",
  "Explain photosynthesis in Hinglish",
  "Make a 5 question quiz on fractions",
  "aage… next step",
];

function Node({ x, y, w, label, delay }: { x: number; y: number; w: number; label: string; delay: number }) {
  return (
    <motion.div
      className="absolute grid h-[26px] place-items-center rounded-md border border-brand/50 bg-brand/10 text-[8px] text-text-primary"
      style={{ left: x, top: y, width: w }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
    >
      {label}
    </motion.div>
  );
}

export default function SahayakScene({ step }: SceneProps) {
  return (
    <>
      {/* Teacher's voice */}
      <Panel x={16} y={16} w={168} h={118} title="teacher says">
        <div className="flex flex-col gap-2 p-2.5">
          <div className="flex items-center gap-2">
            <span className="accent-gradient grid h-6 w-6 place-items-center rounded-full text-[9px] text-white">🎤</span>
            <Wave active={step === 0 || step === 3 || step === 4} bars={16} height={14} />
          </div>
          <Swap id={SAID[step]}>
            <span className="block text-[9px] leading-snug text-text-primary">
              <Typed text={`"${SAID[step]}"`} show duration={0.6} />
            </span>
          </Swap>
          <span className="text-[7px] text-muted">browser speech to text · hi-IN / en-IN</span>
        </div>
      </Panel>

      {/* Router */}
      <Panel x={16} y={144} w={168} h={190} title="command router">
        <div className="flex flex-col gap-1.5 p-2.5 text-[8.5px]">
          <span className="text-muted">Gemini detects the intent, then calls one endpoint.</span>
          {INTENTS.map((intent) => {
            const on = LIT[step].includes(intent);
            return (
              <div
                key={intent}
                className={`flex items-center justify-between rounded-md border px-2 py-1 transition-colors duration-300 ${
                  on ? "border-brand/50 bg-brand/10 text-text-primary" : "border-stroke text-muted"
                }`}
              >
                <span className="font-mono">/{intent}</span>
                {on && <Check size={9} />}
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Smartboard */}
      <Window x={196} y={16} w={348} h={318} title="Smartboard · Class 7 Science">
        <Swap id={step} className="relative h-[290px] p-3 text-[8.5px]">
          {step === 0 && <span className="m-auto block pt-24 text-center text-muted">Tap Speak and say what the class needs.</span>}
          {step === 1 && (
            <div className="flex flex-col items-center gap-2 pt-20">
              <Pill tone="info">intent: explain · language: Hinglish</Pill>
              <span className="text-muted">routing to /simplify…</span>
            </div>
          )}
          {step === 2 && (
            <>
              <span className="block text-[11px] font-medium text-text-primary">Photosynthesis</span>
              <span className="mt-1 block leading-snug text-text-primary/80">
                Plants apne khaane ka intezaam khud karte hain. Patte sunlight, paani aur CO₂ se glucose banate hain, aur oxygen bahar chhodte hain.
              </span>
              <div className="relative mt-3 h-[150px]">
                <Node x={0} y={10} w={70} label="☀ Sunlight" delay={0.2} />
                <Node x={0} y={50} w={70} label="💧 Water" delay={0.3} />
                <Node x={0} y={90} w={70} label="CO₂" delay={0.4} />
                <Node x={124} y={50} w={80} label="Leaf (chlorophyll)" delay={0.55} />
                <Node x={252} y={30} w={64} label="Glucose" delay={0.75} />
                <Node x={252} y={74} w={64} label="Oxygen" delay={0.85} />
                <svg className="absolute inset-0" width="320" height="150" aria-hidden>
                  {[
                    "M70 23 L124 63",
                    "M70 63 L124 63",
                    "M70 103 L124 63",
                    "M204 63 L252 43",
                    "M204 63 L252 87",
                  ].map((d, i) => (
                    <motion.path
                      key={d}
                      d={d}
                      stroke="var(--accent-b)"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.45 + i * 0.08, duration: 0.3 }}
                    />
                  ))}
                </svg>
              </div>
              <Pill tone="muted">mermaid diagram, drawn automatically</Pill>
            </>
          )}
          {step === 3 && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>quiz · fractions</Label>
                <span className="mt-1 block text-[10px] text-text-primary">Q1. 1/2 + 1/4 = ?</span>
                <Stagger gap={0.1}>
                  {["A. 2/6", "B. 3/4", "C. 1/6", "D. 2/4"].map((o) => (
                    <div
                      key={o}
                      className={`mt-1 rounded-md border px-2 py-1 ${o.startsWith("B") ? "border-green-500/40 bg-green-500/10 text-text-primary" : "border-stroke text-muted"}`}
                    >
                      {o}
                    </div>
                  ))}
                </Stagger>
              </div>
              <div>
                <Label>hindi | english</Label>
                <div className="mt-1 rounded-md border border-stroke bg-bg p-2 leading-snug">
                  <span className="block text-text-primary">पत्तियों में प्रकाश संश्लेषण होता है।</span>
                  <span className="mt-1.5 block text-muted">Photosynthesis happens in the leaves.</span>
                </div>
              </div>
            </div>
          )}
          {step === 4 && (
            <>
              <Label>activity · air has weight</Label>
              <span className="mt-1 block text-[10px] text-text-primary">Step 2 of 5</span>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 rounded-lg border border-stroke bg-bg p-2.5 text-[10px] leading-snug text-text-primary">
                Blow up two balloons to the same size and tie them to each end of a ruler.
              </motion.div>
              <div className="mt-3 flex items-center gap-2">
                <span className="text-brand-ink">▶ narrating</span>
                <Wave active bars={14} height={12} />
              </div>
              <div className="mt-3 flex gap-1.5">
                {["next", "dobara", "pichla"].map((c, i) => (
                  <Pill key={c} tone={i === 0 ? "info" : "muted"}>"{c}"</Pill>
                ))}
              </div>
            </>
          )}
        </Swap>
      </Window>
    </>
  );
}
