import { motion } from "framer-motion";
import { Label, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const APPLIANCES: [string, number][] = [
  ["AC", 1.62],
  ["Geyser", 0.71],
  ["Other", 0.24],
  ["Fridge", 0.18],
  ["TV", 0.09],
];

const AGENTS: [string, string][] = [
  ["Anomaly detective", "Fridge drawing 30% above normal"],
  ["Smart scheduler", "Run the washer after 10 pm"],
  ["Bill forecaster", "₹1,840 this month at this rate"],
  ["Carbon narrator", "12 kg CO₂ less than last week"],
  ["Lifecycle monitor", "AC filter due for a clean"],
  ["Benchmark", "You use 8% less than neighbours"],
  ["Energy chat", "Ask anything about your usage"],
];

const SPARK = "M0 30 L12 26 L24 28 L36 18 L48 22 L60 12 L72 16 L84 9 L96 14 L108 6 L120 10 L132 4";

export default function UnichargeScene({ step }: SceneProps) {
  return (
    <>
      {/* Meter */}
      <Panel x={16} y={16} w={168} h={140} title="smart meter" aside={<Pill tone="ok">live · 1 s</Pill>}>
        <div className="flex flex-col gap-1.5 p-2.5">
          <span className="font-display text-[34px] italic leading-none text-text-primary">2.84 kW</span>
          <div className="flex justify-between font-mono text-[8px] text-muted">
            <span>230.4 V</span>
            <span>12.3 A</span>
            <span>slab 2</span>
          </div>
          <svg width="140" height="34" viewBox="0 0 132 34" fill="none" aria-hidden>
            <motion.path
              d={SPARK}
              stroke="var(--accent-b)"
              strokeWidth="1.6"
              initial={false}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.6 }}
            />
          </svg>
        </div>
      </Panel>

      {/* NILM */}
      <Panel x={16} y={166} w={168} h={168} title="nilm · 480 samples">
        <div className="flex flex-col gap-2 p-2.5 text-[8.5px]">
          {APPLIANCES.map(([name, kw], i) => (
            <div key={name} className="flex items-center gap-2">
              <span className="w-10 text-text-primary">{name}</span>
              <span className="h-[6px] flex-1 overflow-hidden rounded-full bg-text-primary/10">
                <motion.span
                  className="accent-gradient block h-full origin-left rounded-full"
                  initial={false}
                  animate={{ scaleX: step >= 1 ? kw / 1.7 : 0 }}
                  transition={{ duration: 0.45, delay: step === 1 ? i * 0.08 : 0 }}
                />
              </span>
              <span className="w-8 text-right font-mono text-muted">{step >= 1 ? kw.toFixed(2) : "·"}</span>
            </div>
          ))}
          <span className="text-[7.5px] text-muted">{step >= 1 ? "appliances found from the meter alone" : "one total for the whole house"}</span>
        </div>
      </Panel>

      {/* Agents / chat */}
      <Panel x={196} y={16} w={192} h={318} title={step === 3 || step === 4 ? "energy assistant" : "seven ai agents"}>
        <Swap id={step < 2 ? "wait" : step === 2 ? "agents" : "chat"} className="flex flex-col gap-1.5 p-2.5 text-[8px]">
          {step < 2 && <span className="text-muted">Waiting for appliance data. Each agent has one job.</span>}
          {step === 2 && (
            <Stagger gap={0.1}>
              {AGENTS.map(([agent, insight]) => (
                <div key={agent} className="rounded-md border border-stroke bg-bg px-2 py-1">
                  <span className="block text-[7px] uppercase tracking-[0.15em] text-muted">{agent}</span>
                  <span className="text-text-primary">{insight}</span>
                </div>
              ))}
            </Stagger>
          )}
          {step >= 3 && (
            <>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="self-end rounded-xl rounded-br-sm bg-brand/15 px-2 py-1.5 text-text-primary">
                Why was my bill so high in May?
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-xl rounded-bl-sm border border-stroke bg-bg px-2 py-1.5 leading-snug text-text-primary">
                Your AC ran 6.5 hours a day, up from 4. Setting it to 24°C and running the geyser before 7 am would save about ₹310.
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-1">
                <Pill tone="info">vampire load: 140 W at night</Pill>
              </motion.div>
            </>
          )}
        </Swap>
      </Panel>

      {/* Bill or operator */}
      <Panel x={400} y={16} w={144} h={318} title={step === 4 ? "operator · discom" : "this month"}>
        <Swap id={step === 4 ? "op" : "bill"} className="flex flex-col gap-2 p-2.5 text-[8px]">
          {step < 4 ? (
            <>
              <Label>prepaid balance</Label>
              <span className="font-display text-[24px] italic leading-none text-text-primary">₹612</span>
              <Label>forecast</Label>
              <span className="font-mono text-text-primary">₹1,840</span>
              <motion.div
                initial={false}
                animate={{ opacity: step >= 2 ? 1 : 0.3 }}
                className="rounded-lg border border-green-500/30 bg-green-500/10 px-2 py-1 leading-snug text-green-700 dark:text-green-400"
              >
                ₹1,530 if you follow the scheduler
              </motion.div>
              <Label className="mt-1">energy iq</Label>
              <span className="text-text-primary">3 missions this week</span>
            </>
          ) : (
            <>
              <Label>region load</Label>
              {[["North", 0.82], ["Central", 0.64], ["East", 0.91], ["South", 0.47]].map(([r, v], i) => (
                <div key={r as string} className="flex items-center gap-1.5">
                  <span className="w-9 text-text-primary">{r}</span>
                  <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-text-primary/10">
                    <motion.span
                      className={`block h-full origin-left rounded-full ${(v as number) > 0.85 ? "bg-red-500" : "accent-gradient"}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: v as number }}
                      transition={{ delay: i * 0.08 }}
                    />
                  </span>
                </div>
              ))}
              <Stagger delay={0.4} gap={0.12}>
                {[
                  <Pill key="a" tone="bad">feeder E-12 overload</Pill>,
                  <Pill key="b" tone="info">peak 7 pm forecast</Pill>,
                  <Pill key="c">2 new connections</Pill>,
                  <Pill key="d">mandi: 14 trades</Pill>,
                ]}
              </Stagger>
            </>
          )}
        </Swap>
      </Panel>
    </>
  );
}
