import { motion } from "framer-motion";
import { Box, Feed, Label, Panel, Phone, Pill, Swap, type SceneProps } from "../kit";

const CAMS = ["CAM 01 · LOBBY", "CAM 02 · GATE", "CAM 03 · STORE", "CAM 04 · YARD", "CAM 05 · WALL", "CAM 06 · DOCK"];
const HOURS = [2, 1, 0, 0, 3, 1, 0, 5, 2, 0, 1, 0];

function Alert({ title, body, tone, delay }: { title: string; body: string; tone: "bad" | "warn"; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      className="rounded-lg border border-stroke bg-bg p-1.5"
    >
      <div className="flex items-center justify-between">
        <span className="text-[7.5px] font-medium text-text-primary">{title}</span>
        <Pill tone={tone}>{tone === "bad" ? "alert" : "health"}</Pill>
      </div>
      <span className="mt-0.5 block text-[7px] text-muted">{body}</span>
    </motion.div>
  );
}

export default function CctvScene({ step }: SceneProps) {
  return (
    <>
      {CAMS.map((c, i) => {
        const x = 16 + (i % 3) * 122;
        const y = 16 + Math.floor(i / 3) * 112;
        const dark = i === 4 && step >= 4;
        return (
          <Feed key={c} x={x} y={y} w={114} h={104} label={c} time={i === 1 ? "23:41" : undefined}>
            <div className="absolute bottom-0 h-[38%] w-full bg-white/5" />
            <div className="absolute bottom-[38%] left-[15%] h-[30%] w-[30%] bg-white/[0.06]" />
            {i === 1 && (
              <>
                <svg className="absolute inset-0" width="114" height="104" aria-hidden>
                  <motion.polygon
                    points="20,88 60,40 104,46 104,98 20,98"
                    fill="rgba(78,133,191,0.18)"
                    stroke="#89aacc"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    initial={false}
                    animate={{ opacity: step >= 1 ? 1 : 0 }}
                    transition={{ duration: 0.44 }}
                  />
                </svg>
                <motion.div
                  className="absolute rounded-[2px] border-2 border-red-400"
                  style={{ left: 58, top: 44, width: 22, height: 42 }}
                  initial={false}
                  animate={{ opacity: step >= 2 && step <= 3 ? 1 : 0, x: step >= 2 ? [0, -6, 0] : 0 }}
                  transition={{ x: { duration: 1.65, repeat: Infinity }, opacity: { duration: 0.17 } }}
                >
                  <span className="absolute -top-[11px] left-[-2px] whitespace-nowrap bg-red-400 px-0.5 font-mono text-[6px] text-black">person 0.91</span>
                  <span className="absolute inset-x-1 top-1 h-2.5 rounded-full bg-white/50" />
                  <span className="absolute inset-x-[5px] bottom-1 top-4 rounded-sm bg-white/35" />
                </motion.div>
              </>
            )}
            <motion.div
              className="absolute inset-0 grid place-items-center bg-black"
              initial={false}
              animate={{ opacity: dark ? 1 : 0 }}
              transition={{ duration: 0.28 }}
            >
              <span className="font-mono text-[7px] text-white/60">NO SIGNAL</span>
            </motion.div>
          </Feed>
        );
      })}

      <Box x={16} y={238} show={step >= 1 && step <= 2} enter="fade">
        <div className="flex gap-1.5">
          <Pill tone="info">zone: gate</Pill>
          <Pill tone="info">22:00 to 06:00</Pill>
          <Pill>other cameras: weekends</Pill>
        </div>
      </Box>
      <Box x={16} y={238} show={step === 0} enter="fade">
        <Pill>24 streams recording, nobody watching</Pill>
      </Box>
      <Box x={16} y={240} show={step === 4} enter="fade">
        <Label>the health check runs beside detection</Label>
      </Box>

      {/* Phone */}
      <Phone x={392} y={14} w={152} h={240}>
        <div className="px-2.5 pt-1.5 text-[7px] text-muted">Security alerts</div>
        <div className="flex flex-col gap-1.5 p-2">
          {step >= 3 && step < 5 && (
            <>
              <Alert title="Gate 2 · person" body="23:41 · inside zone, after hours" tone="bad" delay={0.17} />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.39 }} className="relative h-[54px] overflow-hidden rounded-lg bg-[#101418]">
                <span className="absolute left-[44%] top-[22%] h-[30px] w-[12px] rounded-sm bg-white/40" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-white/80 text-[7px] text-black">▶</span>
                </span>
                <span className="absolute bottom-1 right-1.5 font-mono text-[6px] text-white/70">0:12 clip</span>
              </motion.div>
            </>
          )}
          {step === 4 && <Alert title="Wall camera offline" body="23:58 · black frame for 2 min" tone="warn" delay={0.33} />}
          {step >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-lg border border-stroke bg-bg p-2">
              <span className="block text-[8px] font-medium text-text-primary">Good morning</span>
              <span className="block text-[7px] text-muted">3 events overnight, 1 camera issue. Summary attached.</span>
            </motion.div>
          )}
          {step < 3 && <span className="px-1 text-[7.5px] text-muted">Quiet. Alerts arrive here with a clip.</span>}
        </div>
      </Phone>

      {/* Summary / log strip */}
      <Panel x={16} y={264} w={528} h={72} title={step >= 5 ? "overnight summary, events per hour" : "event log"}>
        <Swap id={step >= 5 ? "sum" : "log"} className="px-3 py-2.5">
          {step >= 5 ? (
            <div className="flex h-[22px] items-end gap-1.5">
              {HOURS.map((h, i) => (
                <motion.span
                  key={i}
                  className={`flex-1 rounded-t ${h ? "accent-gradient" : "bg-text-primary/10"}`}
                  initial={{ height: 0 }}
                  animate={{ height: Math.max(2, h * 4) }}
                  transition={{ delay: i * 0.03 }}
                />
              ))}
            </div>
          ) : (
            <span className="font-mono text-[8px] text-muted">
              {step >= 3 ? "23:41:07 person · gate · clip saved · sent to the security lead" : "searchable: “vehicles at gate 2 last Tuesday night”"}
            </span>
          )}
        </Swap>
      </Panel>
    </>
  );
}
