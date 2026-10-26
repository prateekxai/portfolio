import { motion } from "framer-motion";
import { Box, Check, Cursor, Label, Panel, Pill, Stagger, Swap, Typed, type SceneProps } from "../kit";

const STATES = ["identified", "generated", "under review", "approved", "posted"];
// Which state is lit for each step.
const STATE_AT = [0, 1, 1, 3, 4];

const DRAFT =
  "The weekly cadence point is underrated. We saw the\nsame thing when release notes moved into the product.\nDid it change how you plan the quarter?";

export default function CommentingAgentScene({ step }: SceneProps) {
  const lit = STATE_AT[step];
  return (
    <>
      {/* State machine */}
      <Box x={16} y={14} w={528} h={30} className="flex items-center gap-1.5">
        {STATES.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <span
              className={`flex-1 whitespace-nowrap rounded-full border px-2 py-[4px] text-center font-mono text-[7.5px] uppercase tracking-[0.12em] transition-all duration-500 ${
                i === lit
                  ? "accent-gradient border-transparent text-white"
                  : i < lit
                    ? "border-brand/30 bg-brand/10 text-brand-ink"
                    : "border-stroke bg-surface text-muted"
              }`}
            >
              {s}
            </span>
            {i < STATES.length - 1 && <span className="text-[8px] text-muted">→</span>}
          </div>
        ))}
      </Box>

      {/* Feed */}
      <Panel x={16} y={56} w={250} h={278} title="target feed">
        <div className="flex flex-col gap-1.5 p-2">
          {[
            { who: "A. Mehta · Founder, fintech", body: "Shipping weekly taught us more than any roadmap did.", verdict: "match" },
            { who: "News Daily", body: "Election results: what the numbers say", verdict: "skip: politics" },
            { who: "R. Iyer · Student", body: "Looking for internship tips!", verdict: "skip: role" },
          ].map((post, i) => (
            <motion.div
              key={post.who}
              className={`rounded-lg border p-2 ${i === 0 && step >= 0 ? "border-brand/40 bg-brand/5" : "border-stroke"}`}
              initial={false}
              animate={{ opacity: step >= 1 && i > 0 ? 0.35 : 1 }}
            >
              <div className="mb-1 flex items-center gap-1.5">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-text-primary/15 text-[6px] text-text-primary">
                  {post.who[0]}
                </span>
                <span className="truncate text-[7.5px] text-muted">{post.who}</span>
              </div>
              <span className="block text-[8.5px] leading-snug text-text-primary">{post.body}</span>
              <motion.div
                className="mt-1.5"
                initial={false}
                animate={{ opacity: step === 0 ? 1 : i === 0 ? 1 : 0.8 }}
                transition={{ delay: step === 0 ? 0.33 + i * 0.22 : 0 }}
              >
                <Pill tone={i === 0 ? "info" : "muted"}>{post.verdict}</Pill>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* Work area */}
      <Panel
        x={278}
        y={56}
        w={266}
        h={278}
        title={["filters", "drafting in the brand's voice", "brand rules, after generation", "approval queue", "paced posting"][step]}
      >
        <Swap id={step} className="flex flex-col gap-2.5 p-3 text-[8.5px]">
          {step === 0 && (
            <Stagger delay={0.17} gap={0.17}>
              {[
                ["industry", "SaaS, fintech, AI, dev tools"],
                ["people", "founders and leaders, no students"],
                ["topics", "no politics or religion"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-stroke pb-1.5">
                  <span className="text-muted">{k}</span>
                  <span className="text-right text-text-primary">{v}</span>
                </div>
              ))}
            </Stagger>
          )}
          {step === 1 && (
            <>
              <Label>draft 1 of 3</Label>
              <div className="rounded-lg border border-stroke bg-bg p-2.5 leading-relaxed text-text-primary">
                <Typed text={DRAFT} show duration={1.32} delay={0.17} />
              </div>
              <span className="text-muted">Context: brand rules, past approved comments, recent edits.</span>
            </>
          )}
          {step === 2 && (
            <>
              <div className="flex items-start gap-2 rounded-lg border border-green-500/30 bg-green-500/5 p-2">
                <Check />
                <span className="leading-snug text-text-primary">The weekly cadence point is underrated…</span>
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }} className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/5 p-2">
                <Check tone="bad" />
                <div>
                  <span className="block leading-snug text-muted line-through">Great post! Check out our tool for…</span>
                  <Pill tone="bad" className="mt-1">blocked: salesy</Pill>
                </div>
              </motion.div>
              <span className="text-muted">Rules go into the prompt, then get checked again here.</span>
            </>
          )}
          {step === 3 && (
            <>
              <div className="rounded-lg border border-stroke bg-bg p-2.5 leading-snug text-text-primary">
                The weekly cadence point is underrated. We saw the same thing when release notes moved into the product…
              </div>
              <div className="flex gap-1.5">
                <motion.span
                  className="accent-gradient grid h-[20px] flex-1 place-items-center rounded text-white"
                  initial={false}
                  animate={{ scale: [1, 1, 0.92, 1] }}
                  transition={{ duration: 1.1, times: [0, 0.6, 0.67, 0.75] }}
                >
                  Approve
                </motion.span>
                <span className="grid h-[20px] flex-1 place-items-center rounded border border-stroke text-muted">Edit</span>
                <span className="grid h-[20px] flex-1 place-items-center rounded border border-stroke text-muted">Reject</span>
              </div>
              <span className="text-muted">Every edit and rejection reason is stored and fed back next time.</span>
            </>
          )}
          {step === 4 && (
            <>
              <div className="flex items-center justify-between">
                <Label>today</Label>
                <Pill tone="info">7 of 10 daily limit</Pill>
              </div>
              <div className="relative mt-1 h-[40px]">
                <span className="absolute inset-x-0 top-1/2 h-px bg-stroke" />
                {["09:12", "10:47", "12:05", "13:31", "15:02", "16:40", "18:15"].map((t, i) => (
                  <motion.div
                    key={t}
                    className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center"
                    style={{ left: `${4 + i * 14}%` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.11 + i * 0.17 }}
                  >
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="mt-1 font-mono text-[6.5px] text-muted">{t}</span>
                  </motion.div>
                ))}
              </div>
              <span className="text-muted">Idempotent posting with bounded retries, and a global kill switch.</span>
            </>
          )}
        </Swap>
      </Panel>
      <Cursor x={step === 3 ? 320 : 470} y={step === 3 ? 172 : 260} show={step === 3} click={step === 3} />
    </>
  );
}
