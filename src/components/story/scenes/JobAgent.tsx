import { motion } from "framer-motion";
import { Box, Check, Label, Panel, Pill, Progress, Stagger, Swap, type SceneProps } from "../kit";

const NODES = ["Every 6 hours", "Scrape boards", "Rank vs résumé", "Google Sheets", "Email"];

const JOBS = [
  { title: "Backend Engineer (Python)", co: "Fintech startup", src: "LinkedIn", fit: 92 },
  { title: "AI Automation Engineer", co: "SaaS company", src: "Wellfound", fit: 88 },
  { title: "Full-Stack Developer", co: "Agency", src: "Naukri", fit: 71 },
  { title: "Data Analyst", co: "Retail chain", src: "Indeed", fit: 34 },
];

export default function JobAgentScene({ step }: SceneProps) {
  return (
    <>
      {/* n8n-style canvas */}
      <Box x={16} y={16} w={528} h={92} className="rounded-xl border border-stroke bg-surface">
        <div className="relative flex h-full items-center justify-between px-5">
          <span className="absolute left-3 top-2 text-[7.5px] uppercase tracking-[0.2em] text-muted">n8n workflow</span>
          {NODES.map((n, i) => (
            <div key={n} className="relative flex flex-1 items-center">
              <motion.div
                className={`relative z-10 flex h-[46px] w-[78px] flex-col items-center justify-center rounded-lg border text-center text-[8px] transition-colors duration-500 ${
                  i === step ? "border-brand bg-brand/10 text-text-primary" : i < step ? "border-brand/30 text-text-primary" : "border-stroke text-muted"
                }`}
                initial={false}
                animate={{ scale: i === step ? 1.06 : 1 }}
              >
                {i === 0 ? (
                  <motion.svg width="14" height="14" viewBox="0 0 14 14" className="mb-1" animate={{ rotate: step === 0 ? 360 : 0 }} transition={{ duration: 1.65, repeat: step === 0 ? Infinity : 0, ease: "linear" }}>
                    <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 3v4h3" stroke="currentColor" strokeWidth="1.2" fill="none" />
                  </motion.svg>
                ) : (
                  <span className="mb-1 h-2 w-2 rounded-full bg-current opacity-50" />
                )}
                {n}
              </motion.div>
              {i < NODES.length - 1 && (
                <span className="relative mx-1 h-px flex-1 overflow-hidden bg-stroke">
                  <motion.span
                    className="absolute top-0 h-px w-4 bg-brand"
                    animate={i < step ? { left: ["-20%", "120%"] } : { left: "-20%" }}
                    transition={i < step ? { duration: 0.66, repeat: Infinity, ease: "linear" } : { duration: 0 }}
                  />
                </span>
              )}
            </div>
          ))}
        </div>
      </Box>

      <Panel
        x={16}
        y={120}
        w={528}
        h={214}
        title={["schedule", "fresh listings", "ranked against my résumé", "google sheets", "inbox"][step]}
      >
        <Swap id={step} className="p-3.5 text-[9px]">
          {step === 0 && (
            <div className="flex items-center gap-6">
              <div>
                <span className="block font-display text-[40px] italic leading-none text-text-primary">6h</span>
                <span className="text-muted">between runs</span>
              </div>
              <div className="flex flex-col gap-1.5 font-mono text-[8.5px]">
                {["00:00 ran · 4 strong matches", "06:00 ran · 1 strong match", "12:00 ran · 2 strong matches", "18:00 next run"].map((l, i) => (
                  <span key={l} className={i === 3 ? "text-brand-ink" : "text-muted"}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-2">
              <Stagger delay={0.11} gap={0.14}>
                {JOBS.map((j) => (
                  <div key={j.title} className="rounded-lg border border-stroke bg-bg p-2">
                    <span className="block text-text-primary">{j.title}</span>
                    <span className="mt-0.5 flex items-center justify-between text-[7.5px] text-muted">
                      {j.co} <Pill>{j.src}</Pill>
                    </span>
                  </div>
                ))}
              </Stagger>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-2.5">
              <Stagger delay={0.11} gap={0.17}>
                {JOBS.map((j) => (
                  <div key={j.title} className="grid grid-cols-[170px_1fr_34px] items-center gap-3">
                    <span className="truncate text-text-primary">{j.title}</span>
                    <Progress value={j.fit / 100} />
                    <span className={`text-right font-mono ${j.fit > 80 ? "text-green-600 dark:text-green-400" : "text-muted"}`}>{j.fit}</span>
                  </div>
                ))}
              </Stagger>
              <span className="text-muted">Why 92: Python backends, FastAPI and automation work match the role closely.</span>
            </div>
          )}
          {step === 3 && (
            <div className="overflow-hidden rounded-lg border border-stroke">
              <div className="grid grid-cols-[1.6fr_1fr_0.5fr_1.4fr] bg-bg px-2 py-1.5 text-[7px] uppercase tracking-[0.15em] text-muted">
                <span>role</span>
                <span>company</span>
                <span>fit</span>
                <span>why</span>
              </div>
              <Stagger delay={0.11} gap={0.17}>
                {JOBS.slice(0, 3).map((j) => (
                  <div key={j.title} className="grid grid-cols-[1.6fr_1fr_0.5fr_1.4fr] border-t border-stroke px-2 py-1.5 text-[8px]">
                    <span className="truncate text-text-primary">{j.title}</span>
                    <span className="text-muted">{j.co}</span>
                    <span className="font-mono text-text-primary">{j.fit}</span>
                    <span className="truncate text-muted">skills and stack overlap</span>
                  </div>
                ))}
              </Stagger>
            </div>
          )}
          {step === 4 && (
            <motion.div
              initial={{ y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.28, delay: 0.11 }}
              className="mx-auto mt-2 flex max-w-[330px] items-start gap-3 rounded-xl border border-stroke bg-bg p-3 shadow-lg"
            >
              <span className="accent-gradient grid h-7 w-7 shrink-0 place-items-center rounded-full text-[9px] text-white">AI</span>
              <div>
                <span className="block font-medium text-text-primary">2 strong matches since 12:00</span>
                <span className="block text-muted">Backend Engineer (Python) · 92, AI Automation Engineer · 88</span>
                <span className="mt-1.5 flex items-center gap-1.5 text-text-primary">
                  <Check size={9} /> open the sheet
                </span>
              </div>
            </motion.div>
          )}
        </Swap>
      </Panel>
      <Box x={420} y={96} show={step === 2} enter="pop">
        <Label className="rounded-full border border-stroke bg-surface px-2 py-0.5">AI step</Label>
      </Box>
    </>
  );
}
