import { motion } from "framer-motion";
import { Check, Gauge, Label, Panel, Pill, Progress, Stagger, Swap, type SceneProps } from "../kit";

const KEYWORDS: [string, boolean][] = [
  ["Python", true],
  ["FastAPI", true],
  ["PostgreSQL", true],
  ["Docker", true],
  ["AWS", false],
  ["CI/CD", false],
];

const WEIGHTS: [string, number, number][] = [
  ["keywords", 30, 0.8],
  ["market fit", 25, 0.72],
  ["sections", 15, 0.9],
  ["readability", 15, 0.76],
  ["depth", 15, 0.68],
];

export default function AtsAiScene({ step }: SceneProps) {
  return (
    <>
      {/* Résumé */}
      <Panel x={16} y={16} w={176} h={318} title="your résumé">
        <div className="flex flex-col gap-2 p-2.5 text-[8px] leading-snug">
          <span className="text-[10px] font-medium text-text-primary">Backend Engineer</span>
          <Label>experience</Label>
          <div className="rounded border border-transparent px-1">
            <span className="text-text-primary/80">Built REST APIs in FastAPI for a 100K-user product.</span>
          </div>
          <div className={`rounded border px-1 py-0.5 ${step === 2 ? "border-brand/50 bg-brand/5" : "border-transparent"}`}>
            {step >= 2 ? (
              <>
                <span className="block text-muted line-through">Worked on database stuff.</span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="block text-text-primary">
                  Tuned PostgreSQL queries and indexes for the core API.
                </motion.span>
              </>
            ) : (
              <span className="text-text-primary/80">Worked on database stuff.</span>
            )}
          </div>
          <div className="rounded border border-transparent px-1">
            <span className="text-text-primary/80">Shipped Docker-based deployments.</span>
          </div>
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="rounded border border-red-500/40 bg-red-500/5 px-1 py-0.5">
              <span className="block text-muted line-through">Led a team of 12 engineers at Google.</span>
              <Pill tone="bad" className="mt-0.5">blocked: not in your original</Pill>
            </motion.div>
          )}
          <Label className="mt-1">skills</Label>
          <span className="text-text-primary/80">Python · FastAPI · PostgreSQL · Docker · React</span>
        </div>
      </Panel>

      {/* Job description */}
      <Panel x={204} y={16} w={150} h={156} title="job description">
        <div className="flex flex-wrap gap-1 p-2.5">
          {KEYWORDS.map(([k, ok], i) => (
            <motion.span key={k} initial={false} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
              <Pill tone={step >= 1 ? (ok ? "ok" : "warn") : "muted"}>{k}</Pill>
            </motion.span>
          ))}
          <span className="mt-1 text-[7.5px] text-muted">{step >= 1 ? "4 of 6 required keywords found" : "Backend Engineer, fintech"}</span>
        </div>
      </Panel>

      {/* Exports */}
      <Panel x={204} y={182} w={150} h={152} title="ready to apply" show={step === 4}>
        <div className="flex flex-col gap-1.5 p-2.5 text-[8.5px]">
          <Stagger gap={0.12} className="flex items-center gap-1.5 text-text-primary">
            {[
              <><Check size={9} /> résumé.pdf, ATS-ready</>,
              <><Check size={9} /> cover letter</>,
              <><Check size={9} /> interview prep</>,
            ]}
          </Stagger>
          <div className="mt-1 flex flex-wrap gap-1">
            {["Formal", "Conversational", "Assertive"].map((t, i) => (
              <Pill key={t} tone={i === 1 ? "info" : "muted"}>{t}</Pill>
            ))}
          </div>
        </div>
      </Panel>

      {/* Engine */}
      <Panel x={366} y={16} w={178} h={318} title={["upload", "uniscore, no ai", "targeted rewrite", "hallucination checker", "done"][step]}>
        <Swap id={step} className="flex flex-col gap-2 p-2.5 text-[8.5px]">
          {step === 0 && <span className="text-muted">Résumé and job description in. Nothing is rewritten until you ask.</span>}
          {(step === 1 || step === 4) && (
            <>
              <div className="flex justify-center">
                <Gauge value={step === 4 ? 86 : 74} show size={110} label="uniscore" />
              </div>
              {WEIGHTS.map(([k, w, v]) => (
                <div key={k} className="flex flex-col gap-0.5">
                  <span className="flex justify-between">
                    <span className="text-text-primary">{k}</span>
                    <span className="font-mono text-muted">{w}%</span>
                  </span>
                  <Progress value={step === 4 ? Math.min(1, v + 0.12) : v} />
                </div>
              ))}
            </>
          )}
          {step === 2 && (
            <>
              <div className="rounded-lg border border-stroke bg-bg p-2 text-text-primary">"Make this sound more technical"</div>
              <Label>diff</Label>
              <span className="rounded bg-red-500/10 px-1.5 py-1 text-red-700 dark:text-red-400">− Worked on database stuff.</span>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="rounded bg-green-500/10 px-1.5 py-1 text-green-700 dark:text-green-400">
                + Tuned PostgreSQL queries and indexes for the core API.
              </motion.span>
              <span className="text-muted">Only this bullet changed.</span>
            </>
          )}
          {step === 3 && (
            <Stagger gap={0.12}>
              {[
                ["companies", true],
                ["degrees", true],
                ["certifications", true],
                ["skills", true],
                ["projects and roles", false],
              ].map(([k, ok]) => (
                <div key={k as string} className="flex items-center justify-between border-b border-stroke pb-1">
                  <span className="text-text-primary">{k}</span>
                  {ok ? <Check size={10} /> : <Check tone="bad" size={10} />}
                </div>
              ))}
            </Stagger>
          )}
        </Swap>
      </Panel>
    </>
  );
}
