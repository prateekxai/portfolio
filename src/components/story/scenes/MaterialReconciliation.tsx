import { motion } from "framer-motion";
import { Box, Check, Panel, Pill, Pipeline, type SceneProps } from "../kit";

const SOURCES = ["tracker sheet", "weighbridge", "invoices", "tally vouchers"];
const REFS = ["WR 10482", "WR 10483", "WR 10484", "WR 10485", "WR 10486"];

type Cell = "ok" | "bad";
const ROWS: { ref: string; cells: Cell[]; reason?: string }[] = [
  { ref: "WR 10482", cells: ["ok", "ok", "ok", "ok", "ok"] },
  { ref: "WR 10483", cells: ["bad", "ok", "ok", "ok", "ok"], reason: "short by 0.4 MT" },
  { ref: "WR 10484", cells: ["ok", "ok", "ok", "ok", "ok"] },
  { ref: "WR 10485", cells: ["ok", "bad", "ok", "ok", "ok"], reason: "wrong rate" },
  { ref: "WR 10486", cells: ["ok", "ok", "ok", "ok", "bad"], reason: "billed twice" },
];
const COLS = ["qty", "rate", "party", "date", "voucher"];

export default function MaterialReconciliationScene({ step }: SceneProps) {
  return (
    <>
      {SOURCES.map((s, c) => (
        <Panel key={s} x={16 + c * 134} y={16} w={124} h={104} title={s} delay={c * 0.06}>
          <div className="flex flex-col gap-[2px] px-2 py-1.5">
            {REFS.map((r, i) => (
              <motion.div
                key={r}
                className="flex items-center justify-between rounded px-1 font-mono text-[7.5px]"
                initial={false}
                animate={{
                  backgroundColor: step === 1 ? `rgb(var(--brand) / ${0.06 + (i % 2) * 0.08})` : "rgb(var(--brand) / 0)",
                }}
                transition={{ delay: step === 1 ? i * 0.14 : 0 }}
              >
                <span className="text-text-primary">{r}</span>
                <span className="text-muted">{c === 3 ? `RN/${410 + i}` : c === 2 ? `INV ${71 + i}` : "31.8 MT"}</span>
              </motion.div>
            ))}
          </div>
        </Panel>
      ))}

      {/* Comparison grid */}
      <Panel x={16} y={128} w={528} h={162} title={step >= 3 ? "exception report" : "compared field by field"} show={step >= 1}>
        <div className="grid grid-cols-[72px_repeat(5,1fr)_118px] items-center gap-y-[6px] px-3 pt-2.5 text-[8px]">
          <span className="text-[7px] uppercase tracking-[0.18em] text-muted">ref</span>
          {COLS.map((c) => (
            <span key={c} className="text-center text-[7px] uppercase tracking-[0.18em] text-muted">
              {c}
            </span>
          ))}
          <span />
          {ROWS.map((row, i) => {
            const clean = !row.reason;
            return (
              <motion.div
                key={row.ref}
                className="contents"
                initial={false}
                animate={{ opacity: 1 }}
              >
                <motion.span
                  className="font-mono text-text-primary"
                  initial={false}
                  animate={{ opacity: step >= 3 && clean ? 0.15 : 1 }}
                  transition={{ duration: 0.28 }}
                >
                  {row.ref}
                </motion.span>
                {row.cells.map((cell, j) => (
                  <motion.span
                    key={j}
                    className="flex justify-center"
                    initial={false}
                    animate={{ opacity: step < 2 ? 0 : step >= 3 && clean ? 0.15 : 1, scale: step < 2 ? 0.6 : 1 }}
                    transition={{ duration: 0.17, delay: step === 2 ? i * 0.14 + j * 0.04 : 0 }}
                  >
                    {step >= 4 && cell === "bad" ? <Check size={10} /> : <Check tone={cell === "ok" ? "ok" : "bad"} size={10} />}
                  </motion.span>
                ))}
                <motion.span
                  initial={false}
                  animate={{ opacity: step >= 3 && row.reason ? 1 : 0, x: step >= 3 ? 0 : 6 }}
                  transition={{ duration: 0.22, delay: step === 3 ? 0.22 + i * 0.08 : 0 }}
                >
                  {row.reason && <Pill tone={step >= 4 ? "ok" : "bad"}>{step >= 4 ? "resolved" : row.reason}</Pill>}
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </Panel>

      <Box x={366} y={132} show={step >= 4} enter="pop">
        <Pill tone="ok">
          <Check size={9} /> report empty, payments go out
        </Pill>
      </Box>

      <Pipeline x={16} y={300} w={528} stages={["collect", "line up", "compare", "exceptions", "pay"]} active={step} />
    </>
  );
}
