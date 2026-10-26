import { motion } from "framer-motion";
import { Check, Feed, Label, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const PEOPLE = [
  { id: 12, path: { left: [30, 90, 150, 150], top: [130, 120, 80, 70] } },
  { id: 13, path: { left: [60, 60, 120, 230], top: [140, 100, 90, 110] } },
  { id: 14, path: { left: [250, 240, 245, 250], top: [60, 70, 65, 60] } },
];

const ZONES = [
  { label: "entrance", left: 12, top: 110, w: 90, h: 56 },
  { label: "aisle 3", left: 118, top: 50, w: 80, h: 70 },
  { label: "billing", left: 220, top: 40, w: 90, h: 60 },
];

export default function RetailScene({ step }: SceneProps) {
  const store = step !== 3 && step !== 4;
  return (
    <>
      <Feed x={16} y={16} w={340} h={210} label="STORE · CAM 1" time="18:22">
        {[50, 80, 110].map((y) => (
          <div key={y} className="absolute left-[110px] h-[6px] w-[100px] bg-white/10" style={{ top: y }} />
        ))}
        {ZONES.map((z) => (
          <motion.div
            key={z.label}
            className="absolute rounded border border-dashed border-[#89aacc] bg-[#4e85bf]/10"
            style={{ left: z.left, top: z.top, width: z.w, height: z.h }}
            initial={false}
            animate={{ opacity: step >= 2 && store ? 1 : 0 }}
          >
            <span className="absolute left-1 top-0.5 font-mono text-[6.5px] text-[#89aacc]">{z.label}</span>
          </motion.div>
        ))}
        {PEOPLE.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ width: 16, height: 30, left: p.path.left[0], top: p.path.top[0] }}
            initial={false}
            animate={step >= 1 && store ? { ...p.path, opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 3.3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
          >
            <span className="absolute inset-x-[3px] top-0 h-[9px] rounded-full bg-white/50" />
            <span className="absolute inset-x-0 bottom-0 top-[10px] rounded-sm bg-white/35" />
            <span className="absolute -inset-1 rounded-[2px] border border-green-400" />
            <span className="absolute -top-[12px] left-[-4px] bg-green-400 px-0.5 font-mono text-[6px] text-black">#{p.id}</span>
          </motion.div>
        ))}

        {/* Counter close-up */}
        <motion.div className="absolute inset-0 bg-[#101418]" initial={false} animate={{ opacity: store ? 0 : 1 }}>
          <span className="absolute left-2 top-1.5 font-mono text-[7.5px] text-white/70">COUNTER REGION</span>
          <div className="absolute bottom-0 h-[60px] w-full bg-white/5" />
          <motion.div
            className="absolute left-[140px] top-[60px] h-[70px] w-[50px] rounded-md bg-amber-200/80"
            initial={false}
            animate={step === 3 ? { y: [20, 0, 0], rotate: [-8, 0, 0], filter: ["blur(3px)", "blur(2px)", "blur(0px)"] } : { y: 0, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.32, times: [0, 0.5, 1] }}
          >
            <span className="absolute inset-x-2 top-3 h-2 rounded bg-red-500/70" />
            <span className="absolute inset-x-3 top-7 h-1 rounded bg-black/30" />
          </motion.div>
          <motion.div
            className="absolute left-[118px] top-[100px] h-[46px] w-[30px] rounded-full bg-orange-200/40"
            initial={false}
            animate={step === 3 ? { opacity: [1, 1, 0], x: [0, 0, -40] } : { opacity: 0 }}
            transition={{ duration: 1.32, times: [0, 0.6, 1] }}
          />
          <motion.div
            className="absolute left-[134px] top-[54px] h-[82px] w-[62px] rounded border-2 border-green-400"
            initial={false}
            animate={{ opacity: step === 3 ? [0, 0, 1] : step === 4 ? 1 : 0 }}
            transition={{ duration: 1.32, times: [0, 0.8, 1] }}
          />
        </motion.div>
      </Feed>

      <Panel x={370} y={16} w={174} h={210} title={["one stream, two jobs", "footfall", "zones", "checkout", "identify", "live"][step]}>
        <Swap id={step} className="flex flex-col gap-2 p-2.5 text-[8.5px]">
          {step === 0 && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="rounded-md border border-stroke bg-bg px-2 py-1 text-text-primary">camera (RTSP / webcam)</span>
              <span className="text-muted">↓ one connection</span>
              <div className="flex gap-2">
                <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-text-primary">A · footfall</span>
                <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-1 text-text-primary">B · checkout</span>
              </div>
              <span className="text-center text-muted">Both run as threads inside one FastAPI server.</span>
            </div>
          )}
          {step === 1 && (
            <>
              <span className="text-muted">YOLOv8 finds people, ByteTrack keeps their IDs.</span>
              <Stagger delay={0.17} gap={0.17}>
                {[["#12", "since 18:19"], ["#13", "since 18:21"], ["#14", "since 18:16"]].map(([id, t]) => (
                  <div key={id} className="flex justify-between border-b border-stroke pb-1">
                    <span className="font-mono text-text-primary">{id}</span>
                    <span className="text-muted">{t}</span>
                  </div>
                ))}
              </Stagger>
            </>
          )}
          {step === 2 && (
            <Stagger delay={0.11} gap={0.17}>
              {[["came in today", "142"], ["inside right now", "9"], ["aisle 3 dwell", "1m 40s"], ["billing queue", "3"]].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-stroke pb-1">
                  <span className="text-muted">{k}</span>
                  <span className="font-display text-[15px] italic text-text-primary">{v}</span>
                </div>
              ))}
            </Stagger>
          )}
          {step === 3 && (
            <Stagger delay={0.11} gap={0.28}>
              {[
                <span key="a" className="flex items-center gap-1.5 text-text-primary"><Check size={9} /> motion at the counter</span>,
                <span key="b" className="flex items-center gap-1.5 text-text-primary"><Check size={9} /> hand holding a product</span>,
                <span key="c" className="flex items-center gap-1.5 text-text-primary"><Check size={9} /> sharp frame, no hand</span>,
              ]}
            </Stagger>
          )}
          {step === 4 && (
            <>
              <Label>local catalog</Label>
              <div className="flex items-center justify-between rounded-md border border-green-500/30 bg-green-500/5 px-2 py-1.5">
                <span className="text-text-primary">Biscuit pack, 200 g</span>
                <Pill tone="ok">0.93 · free</Pill>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex flex-col gap-1">
                <Label>new item? only then</Label>
                <span className="text-muted">A miss goes to Gemini vision once, then it's added to the catalog so the next sighting is free.</span>
              </motion.div>
            </>
          )}
          {step === 5 && (
            <>
              <span className="text-muted">Streaming over WebSocket.</span>
              <div className="flex items-baseline justify-between">
                <span className="text-muted">conversion today</span>
                <span className="font-display text-[20px] italic text-text-primary">31%</span>
              </div>
              <Pill tone="info">projected, from the prototype</Pill>
            </>
          )}
        </Swap>
      </Panel>

      <Panel x={16} y={238} w={528} h={96} title="visitors by hour" aside={step >= 2 ? <Pill tone="info">busiest at 17:00</Pill> : undefined}>
        <div className="flex h-[54px] items-end gap-2 px-3 pt-2">
          {[6, 9, 14, 11, 8, 12, 18, 24, 20, 15, 10, 7].map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
              <motion.span
                className={`w-full rounded-t ${i === 7 ? "accent-gradient" : "bg-text-primary/15"}`}
                initial={false}
                animate={{ height: step >= 2 ? v * 1.6 : 3 }}
                transition={{ duration: 0.33, delay: step >= 2 ? i * 0.03 : 0 }}
              />
              <span className="font-mono text-[6px] text-muted">{10 + i}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
