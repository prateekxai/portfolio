import { motion } from "framer-motion";
import { Box, Gauge, Label, Lines, Panel, Pill, Progress, Stagger, Swap, Window, type SceneProps } from "../kit";

const MODES = ["image", "video", "audio", "text"];
const SIGNALS = [
  { name: "compression inconsistency", conf: 0.71, weight: "high" },
  { name: "noise pattern mismatch", conf: 0.58, weight: "medium" },
  { name: "metadata stripped", conf: 0.4, weight: "low" },
  { name: "source credibility (NewsAPI)", conf: 0.66, weight: "medium" },
];

export default function MdrsScene({ step }: SceneProps) {
  return (
    <>
      {/* A news page */}
      <Window x={16} y={16} w={326} h={318} title="dailyviral.news/flood-photo">
        <div className="relative p-3">
          <span className="block text-[12px] font-medium leading-snug text-text-primary">
            Shocking photo shows city underwater overnight
          </span>
          <span className="mt-1 block text-[7.5px] text-muted">Shared 48,000 times · 2 hours ago</span>
          <div className="relative mt-2.5 h-[130px] overflow-hidden rounded-md bg-gradient-to-b from-sky-300 to-sky-700">
            <div className="absolute bottom-0 h-[50px] w-full bg-sky-800/80" />
            {[20, 70, 120, 170, 220].map((x, i) => (
              <div key={x} className="absolute bottom-[30px] bg-slate-700/80" style={{ left: x, width: 34, height: 50 + (i % 3) * 18 }} />
            ))}
            <motion.div
              className="absolute inset-0 border-2 border-brand"
              initial={false}
              animate={{ opacity: step >= 1 ? 1 : 0 }}
            />
          </div>
          <div className="mt-3">
            <Lines widths={[95, 88, 92, 60]} gap={6} />
          </div>

          {/* Context menu */}
          <motion.div
            className="absolute left-[150px] top-[110px] w-[150px] overflow-hidden rounded-md border border-stroke bg-surface text-[8.5px] shadow-xl"
            initial={false}
            animate={{ opacity: step === 0 ? 1 : 0, scale: step === 0 ? 1 : 0.95 }}
            transition={{ duration: 0.17, delay: step === 0 ? 0.44 : 0 }}
          >
            {["Open image in new tab", "Copy image address"].map((m) => (
              <span key={m} className="block px-2.5 py-1.5 text-muted">
                {m}
              </span>
            ))}
            <span className="block border-t border-stroke bg-brand/10 px-2.5 py-1.5 text-text-primary">Check with MDRS</span>
          </motion.div>
        </div>
      </Window>

      {/* Side panel */}
      <Panel x={354} y={16} w={190} h={318} title="mdrs · side panel">
        <Swap id={step} className="flex flex-col gap-2.5 p-3 text-[8.5px]">
          {step === 0 && <span className="text-muted">Right-click any image, video or article to check it here, without leaving the page.</span>}
          {step === 1 && (
            <>
              <Label>routed by the gateway</Label>
              <div className="grid grid-cols-2 gap-1.5">
                {MODES.map((m) => (
                  <span
                    key={m}
                    className={`rounded-md border px-2 py-1.5 text-center ${m === "image" ? "border-brand bg-brand/10 text-text-primary" : "border-stroke text-muted"}`}
                  >
                    {m}
                  </span>
                ))}
              </div>
              <span className="text-muted">Video and audio are sampled, up to 300 seconds. Downloads capped at 100 MB.</span>
            </>
          )}
          {step === 2 && (
            <Stagger delay={0.11} gap={0.19}>
              {SIGNALS.map((s) => (
                <div key={s.name} className="flex flex-col gap-1">
                  <span className="flex justify-between">
                    <span className="text-text-primary">{s.name}</span>
                    <span className="font-mono text-muted">{s.conf.toFixed(2)}</span>
                  </span>
                  <Progress value={s.conf} />
                </div>
              ))}
            </Stagger>
          )}
          {step === 3 && (
            <div className="flex flex-col items-center gap-2 pt-2">
              <Gauge value={72} show label="risk score" size={130} />
              <div className="flex w-full justify-between text-[7.5px] text-muted">
                <span>low &lt; 30</span>
                <span>medium</span>
                <span>high &gt; 60</span>
              </div>
              <Pill tone="bad">high risk</Pill>
            </div>
          )}
          {step === 4 && (
            <>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-text-primary">
                Recommendation: a person should review this before sharing.
              </div>
              <Label>what drove the score</Label>
              <Stagger delay={0.17} gap={0.14}>
                {SIGNALS.map((s) => (
                  <span key={s.name} className="flex justify-between">
                    <span className="text-muted">{s.name}</span>
                    <span className="text-text-primary">{s.weight}</span>
                  </span>
                ))}
              </Stagger>
              <span className="text-muted">Never "real" or "fake". Just risk, and why.</span>
            </>
          )}
        </Swap>
      </Panel>

      <Box x={170} y={300} show={step >= 1 && step <= 3} enter="fade">
        <Pill tone="info">sent to FastAPI gateway</Pill>
      </Box>
    </>
  );
}
