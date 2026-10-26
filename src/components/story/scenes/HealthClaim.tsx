import { motion } from "framer-motion";
import { Box, Check, Cursor, Label, Lines, Panel, Pill, ScanBeam, Stagger, Swap, Typed, Window, type SceneProps } from "../kit";

const TABS = ["Patient", "Admission", "Bill", "Ailment", "Uploads"];
const PATIENTS = [
  ["R. Sharma", "ECHS 2231", "₹48,250"],
  ["S. Yadav", "ECHS 1180", "₹22,900"],
  ["M. Khan", "ECHS 0974", "₹61,400"],
];

export default function HealthClaimScene({ step }: SceneProps) {
  const activeTab = step < 2 ? -1 : step === 2 ? null : 4;
  return (
    <>
      {/* Master sheet */}
      <Window x={16} y={16} w={206} h={134} title="ECHS master · October">
        <div className="grid grid-cols-[1fr_1fr_0.9fr_0.9fr] gap-y-1 p-2 text-[7.5px]">
          {["patient", "card", "amount", "ref"].map((h) => (
            <span key={h} className="uppercase tracking-[0.15em] text-[6.5px] text-muted">
              {h}
            </span>
          ))}
          {PATIENTS.map(([n, c, a], i) => (
            <motion.div
              key={n}
              className="contents"
              initial={false}
              animate={{ opacity: 1 }}
            >
              <span className={`rounded-l px-0.5 ${i === 0 && step >= 0 ? "bg-brand/10 text-text-primary" : "text-text-primary/80"}`}>{n}</span>
              <span className={`font-mono ${i === 0 ? "bg-brand/10" : ""} text-muted`}>{c}</span>
              <span className={`font-mono ${i === 0 ? "bg-brand/10" : ""} text-muted`}>{a}</span>
              <span className={`rounded-r font-mono ${i === 0 ? "bg-brand/10" : ""}`}>
                {i === 0 && step >= 5 ? (
                  <Typed text="88213" show duration={0.33} delay={0.44} className="text-green-600 dark:text-green-400" />
                ) : (
                  <span className="text-muted/50">·</span>
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </Window>

      {/* Signed bill */}
      <Panel x={16} y={160} w={206} h={174} title="signed bill.pdf">
        <div className="relative h-[140px] p-2.5">
          <div className="flex flex-col gap-1.5 text-[7.5px]">
            {[["Room rent, 3 days", "₹9,000"], ["Surgeon fee", "₹18,000"], ["Pharmacy", "₹12,750"], ["Pharmacy", "₹12,750"], ["Investigations", "₹8,500"]].map(([k, v], i) => (
              <motion.div
                key={i}
                className="flex justify-between"
                initial={false}
                animate={{ opacity: step >= 1 && i === 3 ? 0.3 : 1, x: 0 }}
              >
                <span className={step >= 1 && i === 3 ? "text-muted line-through" : "text-text-primary"}>{k}</span>
                <span className="font-mono text-muted">{v}</span>
              </motion.div>
            ))}
            <div className="mt-1 flex justify-between border-t border-stroke pt-1 font-medium text-text-primary">
              <span>Total</span>
              <span className="font-mono">₹48,250</span>
            </div>
          </div>
          <ScanBeam active={step === 1} height={140} />
          <Box x={10} y={112} show={step >= 1} delay={step === 1 ? 0.77 : 0}>
            <Pill tone="info">5 lines read, 1 duplicate dropped</Pill>
          </Box>
        </div>
      </Panel>

      {/* The portal */}
      <Window x={234} y={16} w={310} h={318} title="claims.echs.gov.in · new claim">
        <div className="flex gap-1 border-b border-stroke px-2 pt-2">
          {TABS.map((t, i) => (
            <motion.span
              key={t}
              className="rounded-t-md px-2 py-1 text-[8px]"
              initial={false}
              animate={
                step === 2
                  ? {
                      backgroundColor: ["rgb(var(--brand) / 0)", "rgb(var(--brand) / 0.15)", "rgb(var(--brand) / 0)"],
                      color: ["hsl(var(--muted))", "hsl(var(--text))", "hsl(var(--muted))"],
                    }
                  : {
                      backgroundColor: activeTab === i ? "rgb(var(--brand) / 0.15)" : "rgb(var(--brand) / 0)",
                      color: step >= 3 ? "hsl(var(--text))" : "hsl(var(--muted))",
                    }
              }
              transition={step === 2 ? { duration: 0.44, delay: i * 0.39 } : { duration: 0.17 }}
            >
              {step >= 3 && <span className="mr-1 text-green-600 dark:text-green-400">✓</span>}
              {t}
            </motion.span>
          ))}
        </div>
        <div className="relative p-3">
          <Swap id={step < 2 ? "empty" : step < 4 ? "fill" : step === 4 ? "submit" : "done"} className="flex flex-col gap-2 text-[8.5px]">
            {step < 2 && <Lines widths={[90, 70, 80, 60, 75]} gap={9} className="bg-text-primary/10" />}
            {(step === 2 || step === 3) && (
              <>
                {[
                  ["Patient name", "Ram Sharma"],
                  ["ECHS card no.", "2231-0098-44"],
                  ["Admission", "08 Oct, 11:20"],
                  ["Diagnosis", "Cholelithiasis"],
                ].map(([k, v], i) => (
                  <div key={k} className="grid grid-cols-[86px_1fr] items-center gap-2">
                    <span className="text-muted">{k}</span>
                    <span className="rounded border border-stroke px-1.5 py-[3px] font-mono text-text-primary">
                      <Typed text={v} show duration={0.28} delay={step === 2 ? 0.17 + i * 0.33 : 0} />
                    </span>
                  </div>
                ))}
                <motion.div
                  className="mt-1 rounded-lg border border-stroke bg-bg p-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: step === 2 ? 1.43 : 0 }}
                >
                  <Label>expense pop-up · line by line</Label>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {["Room ₹9,000", "Surgeon ₹18,000", "Pharmacy ₹12,750", "Tests ₹8,500"].map((e) => (
                      <Pill key={e}>{e}</Pill>
                    ))}
                  </div>
                </motion.div>
                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }} className="flex items-center justify-between rounded-lg border border-green-500/40 bg-green-500/10 px-2 py-1.5">
                    <span className="text-text-primary">portal total ₹48,250 = bill total ₹48,250</span>
                    <Check />
                  </motion.div>
                )}
              </>
            )}
            {step === 4 && (
              <>
                <span className="text-muted">All five tabs filled. A person reads it through.</span>
                <Lines widths={[90, 80, 70]} gap={8} className="bg-text-primary/10" />
                <span className="mt-4 grid h-[24px] w-[110px] place-items-center rounded-md bg-text-primary text-[9px] text-bg">
                  Submit Claim
                </span>
              </>
            )}
            {step === 5 && (
              <Stagger delay={0.11} gap={0.19}>
                {[
                  <div key="a" className="flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/10 p-2 text-text-primary">
                    <Check /> Claim submitted · ref ECHS/24/88213
                  </div>,
                  <span key="b" className="text-muted">Reference and screenshot written back to the sheet.</span>,
                  <span key="c" className="flex items-center gap-1.5 text-text-primary">Next: S. Yadav →</span>,
                ]}
              </Stagger>
            )}
          </Swap>
        </div>
      </Window>
      <Cursor x={step === 4 ? 300 : 420} y={step === 4 ? 172 : 260} show={step === 4} click={step === 4} />
      <Box x={330} y={196} show={step === 4} delay={0.88} enter="fade">
        <Pill tone="info">a person clicks submit</Pill>
      </Box>
    </>
  );
}
