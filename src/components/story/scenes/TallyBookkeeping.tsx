import { motion } from "framer-motion";
import { Box, Check, Label, Lines, Panel, Pill, Pipeline, ScanBeam, Stagger, Swap, type SceneProps } from "../kit";

const FIELDS: [string, string][] = [
  ["party", "Sharma Traders"],
  ["GSTIN", "08AABCS1429B1Z5"],
  ["invoice", "ST/24-25/0917"],
  ["date", "12 Oct"],
  ["total", "₹1,18,000"],
];

export default function TallyBookkeepingScene({ step }: SceneProps) {
  return (
    <>
      {/* The PDF stack */}
      <Box x={16} y={16} w={124} h={266}>
        <Label className="mb-2">bills_october.pdf</Label>
        <div className="relative h-[230px]">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 h-[150px] w-[108px] rounded-md border border-stroke bg-surface p-2 shadow-sm"
              initial={false}
              animate={
                step === 0
                  ? { x: i * 3, y: i * 3, rotate: (i - 3) * 1.2 }
                  : { x: 0, y: i * 13, rotate: 0 }
              }
              transition={{ duration: 0.33, delay: i * 0.03 }}
            >
              <Lines widths={[60, 90, 75]} gap={4} />
            </motion.div>
          ))}
          <Box x={0} y={205} show={step >= 1}>
            <Pill tone="info">14 bills, split</Pill>
          </Box>
        </div>
      </Box>

      {/* One bill */}
      <Box x={150} y={16} w={196} h={266} className="overflow-hidden rounded-md border border-stroke bg-surface shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]">
        <div className="relative h-full p-3">
          <span className="block text-[9.5px] font-medium tracking-[0.15em] text-text-primary">TAX INVOICE</span>
          <div className="mt-2 flex flex-col gap-1.5">
            {FIELDS.slice(0, 4).map(([k, v], i) => (
              <div key={k} className="relative flex justify-between text-[8px]">
                <span className="text-muted">{k}</span>
                <span className="font-mono text-text-primary">{v}</span>
                <motion.span
                  className="absolute -inset-x-1 -inset-y-0.5 rounded border border-brand"
                  initial={false}
                  animate={{ opacity: step === 1 ? 1 : 0 }}
                  transition={{ delay: step === 1 ? 0.28 + i * 0.19 : 0 }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 rounded border border-stroke">
            {[["Cement OPC 53", "180 bags", "₹500"], ["TMT binding wire", "20 kg", "₹500"]].map(([it, q, r]) => (
              <div key={it} className="flex justify-between border-b border-stroke px-1.5 py-1 text-[7.5px] last:border-0">
                <span className="text-text-primary">{it}</span>
                <span className="text-muted">{q}</span>
                <span className="font-mono text-muted">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex flex-col gap-1 text-[8px]">
            {[["taxable", "₹1,00,000"], ["GST 18%", "₹18,000"]].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-muted">{k}</span>
                <span className="font-mono text-text-primary">{v}</span>
              </div>
            ))}
            <div className="relative flex justify-between border-t border-stroke pt-1 font-medium">
              <span className="text-text-primary">total</span>
              <span className="font-mono text-text-primary">₹1,18,000</span>
              <motion.span
                className="absolute -inset-x-1 -inset-y-0.5 rounded border border-brand"
                initial={false}
                animate={{ opacity: step === 1 || step === 2 ? 1 : 0 }}
                transition={{ delay: step === 1 ? 1.04 : 0 }}
              />
            </div>
          </div>
          <div className="mt-3">
            <Lines widths={[80, 55]} gap={5} />
          </div>
          <ScanBeam active={step === 1} height={266} />
        </div>
      </Box>

      {/* What the engine is doing */}
      <Panel
        x={356}
        y={16}
        w={188}
        h={266}
        title={["incoming", "read by AI vision", "checks", "names vs live tally", "dry run, then post", "bank reconciliation"][step]}
      >
        <Swap id={step} className="flex flex-col gap-2 p-2.5 text-[8.5px]">
          {step === 0 && (
            <>
              <span className="text-muted">One PDF, 14 bills stitched together, 61 pages.</span>
              <span className="text-muted">Plus this month's bank statement (Excel).</span>
            </>
          )}
          {step === 1 && (
            <Stagger delay={0.22} gap={0.19}>
              {FIELDS.map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-stroke pb-1.5">
                  <span className="text-muted">{k}</span>
                  <span className="font-mono text-text-primary">{v}</span>
                </div>
              ))}
            </Stagger>
          )}
          {step === 2 && (
            <Stagger delay={0.17} gap={0.25}>
              {[
                ["totals add up", "₹1,00,000 + ₹18,000"],
                ["GST maths right", "18% of taxable"],
                ["not a duplicate", "party + invoice no."],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start gap-2">
                  <Check />
                  <div>
                    <span className="block text-text-primary">{k}</span>
                    <span className="block text-[7.5px] text-muted">{v}</span>
                  </div>
                </div>
              ))}
            </Stagger>
          )}
          {step === 3 && (
            <Stagger delay={0.17} gap={0.25}>
              {[
                ["Sharma Traders", "Sharma Traders Pvt Ltd", true],
                ["GST 18% input", "Input IGST @18%", true],
                ["R K Enterprises", "no ledger, flagged", false],
              ].map(([from, to, ok]) => (
                <div key={from as string} className="border-b border-stroke pb-1.5">
                  <span className="block text-muted">{from}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-text-primary">
                    → {ok ? <Check size={9} /> : <Pill tone="warn">for a person</Pill>} <span className="truncate">{ok ? to : ""}</span>
                  </span>
                </div>
              ))}
            </Stagger>
          )}
          {step === 4 && (
            <>
              <Pill tone="info" className="self-start">DRY RUN</Pill>
              <span className="text-muted">13 purchase vouchers would be posted, 1 held back for review.</span>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.77 }} className="flex flex-col gap-1.5">
                <Pill tone="info" className="self-start">LIVE</Pill>
                <span className="flex items-center gap-1.5 text-text-primary">
                  <Check /> 13 of 13 · tally: created
                </span>
              </motion.div>
            </>
          )}
          {step === 5 && (
            <>
              <Stagger delay={0.11} gap={0.14}>
                {[
                  ["NEFT Sharma Traders", true],
                  ["UPI 4471 Jain Steel", true],
                  ["CHQ 004512", true],
                  ["IMPS 88213", false],
                  ["NEFT Om Logistics", true],
                ].map(([l, ok]) => (
                  <div key={l as string} className="flex items-center justify-between border-b border-stroke pb-1.5">
                    <span className="font-mono text-[7.5px] text-text-primary">{l}</span>
                    {ok ? <Check size={10} /> : <Pill tone="warn">exception</Pill>}
                  </div>
                ))}
              </Stagger>
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="text-muted">
                Only the exceptions go to a person.
              </motion.span>
            </>
          )}
        </Swap>
      </Panel>

      <Pipeline x={16} y={296} w={528} stages={["split", "read", "check", "match", "post", "reconcile"]} active={step} />
    </>
  );
}
