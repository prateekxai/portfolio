import { motion } from "framer-motion";
import { Check, Label, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const READINGS: [string, string][] = [
  ["temperature", "850.5 °C"],
  ["gas index", "320"],
  ["vibration", "2.1 mm/s"],
  ["humidity", "45 %"],
  ["power", "32.5 kW"],
];

// Vibration over a shift: steady, then drifting past the threshold.
const VIB = [2.0, 2.1, 1.9, 2.0, 2.2, 2.0, 2.1, 2.0, 2.3, 2.6, 2.9, 3.3, 3.6];

function Chart({ step }: { step: number }) {
  const W = 320;
  const Hh = 108;
  const x = (i: number) => 8 + (i / (VIB.length - 1)) * (W - 16);
  const y = (v: number) => Hh - 8 - ((v - 1.5) / 2.5) * (Hh - 16);
  const line = VIB.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
  const avg = VIB.map((_, i) => {
    const w = VIB.slice(Math.max(0, i - 3), i + 1);
    return w.reduce((a, b) => a + b, 0) / w.length;
  });
  const avgLine = avg.map((v, i) => `${i ? "L" : "M"}${x(i)} ${y(v)}`).join(" ");
  return (
    <svg width={W} height={Hh} viewBox={`0 0 ${W} ${Hh}`} fill="none" aria-hidden>
      <motion.rect x={8} y={y(2.3)} width={W - 16} height={y(1.8) - y(2.3)} fill="rgb(var(--brand) / 0.12)" initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} />
      <motion.path d={`M8 ${y(3)}H${W - 8}`} stroke="#ef4444" strokeDasharray="4 3" initial={false} animate={{ opacity: step >= 2 ? 0.8 : 0 }} />
      <motion.path d={line} stroke="hsl(var(--text))" strokeWidth="1.5" initial={false} animate={{ pathLength: step >= 1 ? 1 : 0.15 }} transition={{ duration: 0.8 }} />
      <motion.path d={avgLine} stroke="var(--accent-b)" strokeWidth="1.5" strokeDasharray="2 2" initial={false} animate={{ opacity: step >= 2 ? 1 : 0 }} />
      {VIB.map((v, i) =>
        v > 3 ? (
          <motion.circle key={i} cx={x(i)} cy={y(v)} r="3" fill="#ef4444" initial={false} animate={{ opacity: step >= 3 ? 1 : 0 }} transition={{ delay: step === 3 ? (i - 10) * 0.1 : 0 }} />
        ) : null
      )}
    </svg>
  );
}

export default function CarbonseedScene({ step }: SceneProps) {
  return (
    <>
      {/* ESP32 */}
      <Panel x={16} y={16} w={170} h={150} title="esp32 · SF-001">
        <div className="relative h-[118px] p-2.5">
          <div className="mx-auto mt-1 h-[54px] w-[96px] rounded-md border-2 border-text-primary/60 bg-text-primary/10 p-1.5">
            <div className="h-full w-[38px] rounded-sm bg-text-primary/30" />
          </div>
          <div className="absolute left-[22px] top-[14px] flex w-[126px] justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-2 w-[3px] rounded-sm bg-text-primary/40" />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-1">
            {["temp", "gas", "vibration"].map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
          {/* packets */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute right-0 top-[44px] h-1.5 w-1.5 rounded-full bg-brand"
              animate={step <= 1 ? { x: [-60, 20], opacity: [0, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </Panel>

      {/* Readings */}
      <Panel x={16} y={176} w={170} h={158} title="latest reading">
        <div className="flex flex-col gap-1.5 p-2.5 text-[8.5px]">
          {READINGS.map(([k, v], i) => (
            <motion.div key={k} className="flex justify-between border-b border-stroke pb-1" initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35 }} transition={{ delay: step === 1 ? i * 0.07 : 0 }}>
              <span className="text-muted">{k}</span>
              <span className={`font-mono ${k === "vibration" && step >= 3 ? "text-red-600 dark:text-red-400" : "text-text-primary"}`}>
                {k === "vibration" && step >= 3 ? "3.6 mm/s" : v}
              </span>
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* Chart */}
      <Panel x={198} y={16} w={346} h={150} title="vibration · press line 2" aside={step >= 2 ? <Pill tone="info">baseline + rolling avg</Pill> : undefined}>
        <div className="px-3 pt-1.5">
          <Chart step={step} />
        </div>
      </Panel>

      {/* Output */}
      <Panel x={198} y={176} w={346} h={158} title={["POST /ingest", "stored as a time series", "health score", "alert", "compliance report"][step]}>
        <Swap id={step} className="p-3 text-[8.5px]">
          {step === 0 && (
            <pre className="rounded-lg border border-stroke bg-bg p-2 font-mono text-[7.5px] leading-relaxed text-text-primary">
{`{ "device_id": "ESP32-SF-001",
  "temperature": 850.5, "gas_index": 320.0,
  "vibration_x": 2.1, "power_consumption": 32.5 }`}
            </pre>
          )}
          {step === 1 && (
            <Stagger gap={0.12} className="flex items-center gap-1.5 text-text-primary">
              {[
                <><Check size={9} /> device authenticated</>,
                <><Check size={9} /> reading validated</>,
                <><Check size={9} /> stored in PostgreSQL, TimescaleDB-ready</>,
              ]}
            </Stagger>
          )}
          {step === 2 && (
            <div className="flex items-center gap-5">
              <div>
                <span className="block font-display text-[34px] italic leading-none text-text-primary">82</span>
                <Label>machine health</Label>
              </div>
              <span className="leading-snug text-muted">Rolling averages and a baseline from history. Every number can be explained to an inspector.</span>
            </div>
          )}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="rounded-lg border border-red-500/40 bg-red-500/5 p-2.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-text-primary">Press line 2: vibration above limit</span>
                <Pill tone="bad">alert</Pill>
              </div>
              <span className="mt-1 block text-muted">3.6 mm/s against a 2.1 baseline for 20 minutes. Check the bearing before the next shift.</span>
            </motion.div>
          )}
          {step === 4 && (
            <div className="flex gap-3">
              <div className="w-[86px] shrink-0 rounded-md border border-stroke bg-bg p-2">
                <span className="block text-[7px] font-medium text-text-primary">SPCB REPORT</span>
                <span className="block text-[6.5px] text-muted">October · Steelforge</span>
                {[70, 90, 60, 80].map((w, i) => (
                  <span key={i} className="mt-1 block h-[2px] rounded bg-text-primary/20" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
              <Stagger gap={0.12} className="flex items-center gap-1.5 text-text-primary">
                {[
                  <><Check size={9} /> emissions within limits</>,
                  <><Check size={9} /> energy use for PAT</>,
                  <><Check size={9} /> CBAM data for exports</>,
                  <><Check size={9} /> audit trail attached</>,
                ]}
              </Stagger>
              </div>
            </div>
          )}
        </Swap>
      </Panel>
    </>
  );
}
