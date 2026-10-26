import { motion } from "framer-motion";
import { Gauge, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const TABLES = ["steps", "heart_rate", "resting_hr", "hrv_rmssd", "sleep", "spo2", "blood_pressure", "glucose", "respiratory", "temperature", "weight", "distance", "active_kcal", "total_kcal"];

// Resting heart rate over 21 days: steady, then drifting up.
const HR = [62, 63, 61, 62, 64, 62, 63, 61, 62, 63, 62, 61, 63, 62, 64, 66, 69, 71, 72, 74, 75];

function Chart({ step }: { step: number }) {
  const W = 320;
  const Hh = 98;
  const x = (i: number) => 10 + (i / (HR.length - 1)) * (W - 20);
  const y = (v: number) => Hh - 10 - ((v - 56) / 24) * (Hh - 20);
  const d = HR.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
  return (
    <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`} fill="none" aria-hidden>
      <motion.rect
        x={x(0)}
        y={y(65)}
        width={x(13) - x(0)}
        height={y(59) - y(65)}
        fill="rgb(var(--brand) / 0.12)"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
      />
      <motion.path
        d={`M${x(13)} ${y(65)}H${x(20)}M${x(13)} ${y(59)}H${x(20)}`}
        stroke="rgb(var(--brand) / 0.5)"
        strokeDasharray="3 3"
        initial={false}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
      />
      <motion.path
        d={d}
        stroke="hsl(var(--text))"
        strokeWidth="1.6"
        initial={false}
        animate={{ pathLength: step >= 1 ? 1 : 0.05, opacity: step >= 1 ? 1 : 0.2 }}
        transition={{ duration: 0.88, ease: "easeInOut" }}
      />
      {HR.slice(15).map((v, i) => (
        <motion.circle
          key={i}
          cx={x(15 + i)}
          cy={y(v)}
          r="2.6"
          fill="#ef4444"
          initial={false}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ delay: step === 2 ? 0.33 + i * 0.08 : 0 }}
        />
      ))}
    </svg>
  );
}

export default function PulseScene({ step }: SceneProps) {
  return (
    <>
      <Panel x={16} y={16} w={168} h={146} title="data in">
        <div className="flex flex-col gap-1 p-2 text-[8.5px]">
          {[
            ["Health Connect webhook", "live, from an Android bridge"],
            ["Google Fit export", "ZIP on Drive, read only"],
            ["Manual readings", "BP, sugar, symptoms"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              className="rounded-md border px-2 py-1"
              initial={false}
              animate={{ borderColor: step === 0 ? ["hsl(var(--stroke))", "rgb(var(--brand))", "hsl(var(--stroke))"] : "hsl(var(--stroke))" }}
              transition={{ duration: 0.66, delay: i * 0.22, repeat: step === 0 ? Infinity : 0, repeatDelay: 0.44 }}
            >
              <span className="block text-text-primary">{k}</span>
              <span className="block text-[7px] text-muted">{v}</span>
            </motion.div>
          ))}
        </div>
      </Panel>

      <Panel x={16} y={172} w={168} h={162} title="14 tables from the export">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 p-2.5 font-mono text-[7.5px]">
          {TABLES.map((t, i) => (
            <motion.span
              key={t}
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0.2, x: step >= 1 ? 0 : -4 }}
              transition={{ delay: step === 1 ? i * 0.06 : 0 }}
              className="truncate text-text-primary"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </Panel>

      <Panel x={196} y={16} w={348} h={156} title="resting heart rate · 21 days" aside={step >= 2 ? <Pill tone="warn">z 2.3 · moderate</Pill> : undefined}>
        <div className="px-3 pt-1.5">
          <Chart step={step} />
          <div className="flex justify-between text-[7px] text-muted">
            <span>{step >= 2 ? "shaded: 14-day personal baseline" : "day 1"}</span>
            <span>today</span>
          </div>
        </div>
      </Panel>

      <Panel x={196} y={182} w={168} h={152} title="score" aside={step >= 3 ? <Pill tone="bad">L3 · see a doctor</Pill> : undefined}>
        <div className="flex flex-col items-center gap-1.5 p-2">
          <Gauge value={74} show={step >= 3} size={110} label="out of 100" />
          <Swap id={step >= 3 ? "on" : "off"} className="w-full">
            {step >= 3 ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7px]">
                {[["severity", "30/40"], ["persistence", "20/25"], ["cross-signal", "16/20"], ["manual", "8/10"]].map(([k, v]) => (
                  <span key={k} className="flex justify-between">
                    <span className="text-muted">{k}</span>
                    <span className="font-mono text-text-primary">{v}</span>
                  </span>
                ))}
              </div>
            ) : (
              <span className="block text-center text-[7.5px] text-muted">waiting for enough signal</span>
            )}
          </Swap>
        </div>
      </Panel>

      <Panel x={376} y={182} w={168} h={152} title="escalation">
        <Swap id={step >= 4 ? "on" : "off"} className="flex flex-col gap-1.5 p-2.5 text-[8px]">
          {step >= 4 ? (
            <Stagger delay={0.11} gap={0.19}>
              {[
                ["patient", "resting HR up for 6 days"],
                ["doctor", "added to high-risk list"],
                ["caretaker", "status: attention"],
              ].map(([who, msg]) => (
                <div key={who} className="rounded-md border border-stroke bg-bg px-2 py-1 leading-snug">
                  <span className="mr-1 text-[7px] uppercase tracking-[0.15em] text-muted">{who}</span>
                  <span className="text-text-primary">{msg}</span>
                </div>
              ))}
            </Stagger>
          ) : (
            <div className="flex flex-col gap-1.5">
              {[["L1 awareness", "30 to 50"], ["L2 attention", "51 to 70"], ["L3 consultation", "above 70"]].map(([k, v]) => (
                <span key={k} className="flex justify-between border-b border-stroke pb-1">
                  <span className="text-text-primary">{k}</span>
                  <span className="text-muted">{v}</span>
                </span>
              ))}
              <span className="text-[7px] text-muted">Early warning, never a diagnosis.</span>
            </div>
          )}
        </Swap>
      </Panel>

    </>
  );
}
