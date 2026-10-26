import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Check,
  EASE,
  Label,
  Panel,
  Pill,
  ScanBeam,
  Seal,
  Signature,
  Target,
  Typed,
  type SceneProps,
} from "../kit";

const PAGES = ["final bill", "bill, page 2", "prescription", "OCT report", "perimetry", "discharge", "consent form"];
const STAGES = ["upload", "read", "match", "rules", "stamp", "return"];

function Side({ step }: { step: number }) {
  const swap = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.19, ease: EASE },
  };
  return (
    <AnimatePresence mode="wait" initial={false}>
      {step === 0 && (
        <motion.div key="req" {...swap} className="flex flex-col gap-2 p-3 font-mono text-[8.5px]">
          <span className="text-brand-ink">POST /v1/seal</span>
          {[
            ["hospital", "H-0112"],
            ["doctor_reg", "RMC 41792"],
            ["file", "claim_0417.pdf"],
            ["pages", "7"],
          ].map(([k, v], i) => (
            <motion.div key={k} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.17 + i * 0.14 }} className="flex justify-between border-b border-stroke pb-1.5">
              <span className="text-muted">{k}</span>
              <span className="text-text-primary">{v}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
      {step === 1 && (
        <motion.div key="read" {...swap} className="flex flex-col gap-2 p-3">
          <Label>what each page is</Label>
          {["bill", "bill", "prescription", "investigation", "investigation", "summary", "form"].map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 + i * 0.15 }} className="flex items-center justify-between text-[8.5px]">
              <span className="text-muted">page {i + 1}</span>
              <Pill tone={t === "investigation" ? "info" : "muted"}>{t}</Pill>
            </motion.div>
          ))}
        </motion.div>
      )}
      {step === 2 && (
        <motion.div key="doc" {...swap} className="flex flex-col gap-2.5 p-3">
          <Label>doctor, by registration no.</Label>
          <div className="rounded-lg border border-stroke bg-bg p-2.5">
            <span className="font-mono text-[9px] text-brand-ink">RMC 41792</span>
            <span className="mt-1 block text-[11px] text-text-primary">Dr. X</span>
            <span className="block text-[8px] text-muted">Ophthalmology</span>
          </div>
          <Label>however the name is printed</Label>
          {["Dr. X", "DR X", "Dr. X, MS (Ophth)"].map((n, i) => (
            <motion.div key={n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 + i * 0.22 }} className="flex items-center justify-between font-mono text-[8.5px] text-text-primary">
              {n}
              <Check />
            </motion.div>
          ))}
        </motion.div>
      )}
      {step === 3 && (
        <motion.div key="rules" {...swap} className="flex flex-col gap-2 p-3 text-[8.5px] leading-snug">
          <Label>everywhere</Label>
          {["every bill gets the hospital seal", "every prescription gets the doctor's seal", "a signature wherever the form asks"].map((r, i) => (
            <motion.span key={r} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.11 + i * 0.14 }} className="text-muted">
              {r}
            </motion.span>
          ))}
          <Label className="mt-1">this hospital</Label>
          <div className="border-l-2 border-brand pl-2 text-text-primary">
            <Typed show text={"OCT and perimetry reports always\nget Dr. X's seal and signature,\nbottom right."} duration={0.88} delay={0.5} />
          </div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.43 }}>
            <Pill tone="info">matched on page 4</Pill>
          </motion.span>
        </motion.div>
      )}
      {step === 4 && (
        <motion.div key="stamp" {...swap} className="flex flex-col gap-2.5 p-3">
          <Label>placing, page 4</Label>
          {[
            ["hospital seal", "x 34 · y 206"],
            ["doctor seal", "x 108 · y 228"],
            ["signature", "x 112 · y 194"],
          ].map(([what, at], i) => (
            <motion.div key={what} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.19 + i * 0.3 }} className="flex items-center gap-2 text-[9px] text-text-primary">
              <Check />
              <span className="flex-1">{what}</span>
              <span className="font-mono text-[7.5px] text-muted">{at}</span>
            </motion.div>
          ))}
          <span className="mt-1 text-[8px] leading-snug text-muted">
            Transparent PNGs on exact coordinates. The page itself is never re-rendered.
          </span>
        </motion.div>
      )}
      {step === 5 && (
        <motion.div key="done" {...swap} className="flex flex-col gap-2.5 p-3">
          <Label>request log</Label>
          {["7 pages read", "4 pages stamped", "doctor matched", "sealed.pdf returned"].map((l, i) => (
            <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.11 + i * 0.14 }} className="flex items-center gap-2 text-[9px] text-text-primary">
              <Check />
              {l}
            </motion.div>
          ))}
          <span className="font-mono text-[8px] text-muted">took 2.8 s · logged for audit</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function DigistampScene({ step }: SceneProps) {
  return (
    <>
      {/* Claim file: list of pages */}
      <Panel x={16} y={16} w={132} h={252} title={step === 0 ? "claim file" : "read, page by page"}>
        <div className="flex flex-col gap-[3px] p-2">
          {PAGES.map((p, i) => (
            <motion.div
              key={p}
              className={`flex items-center gap-2 rounded-md px-1.5 py-[5px] ${i === 3 && step >= 2 ? "bg-brand/10" : ""}`}
              initial={false}
              animate={{ opacity: step === 0 ? 0.35 : 1, x: step === 0 ? -4 : 0 }}
              transition={{ duration: 0.22, delay: step === 1 ? i * 0.15 : 0 }}
            >
              <span className={`h-[18px] w-[13px] shrink-0 rounded-[2px] border bg-surface ${i === 3 && step >= 2 ? "border-brand" : "border-stroke"}`} />
              <span className="font-mono text-[7.5px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className={`truncate text-[8.5px] ${i === 3 && step >= 2 ? "text-text-primary" : "text-text-primary/80"}`}>
                {step === 0 ? "········" : p}
              </span>
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* Page preview */}
      <Box x={162} y={16} w={186} h={252} className="overflow-hidden rounded-md border border-stroke bg-surface shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)]">
        <div className="relative h-full p-3.5">
          <span className="block font-mono text-[6.5px] text-muted">page 4 of 7 · 210 × 297 mm</span>
          <span className="mt-2 block text-[10px] font-medium text-text-primary">Investigation Report</span>
          <span className="block text-[7.5px] text-muted">Optical Coherence Tomography, both eyes</span>
          <div className="mt-2.5 rounded border border-stroke p-1.5">
            <svg width="100%" height="34" viewBox="0 0 150 46" preserveAspectRatio="none" fill="none" aria-hidden>
              {[1, 2, 3].map((r) => (
                <path key={r} d={`M0 ${r * 11.5}H150`} stroke="hsl(var(--text) / 0.08)" />
              ))}
              <path d="M2 30C20 30 28 27 40 17 52 8 60 7 75 7s23 1 35 10 20 13 38 13" stroke="hsl(var(--text) / 0.65)" strokeWidth="1.3" />
              <path d="M2 38C20 38 30 37 40 33c12-5 19-6 35-6s23 1 33 6c10 4 22 5 40 5" stroke="hsl(var(--text) / 0.3)" />
            </svg>
          </div>
          <div className="mt-2.5">
            {[["right eye", "258 µm"], ["left eye", "262 µm"], ["scan quality", "9 / 10"]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-stroke py-[3px] text-[7.5px]">
                <span className="text-muted">{k}</span>
                <span className="font-mono text-text-primary">{v}</span>
              </div>
            ))}
          </div>

          {/* Where things will land */}
          <div className="absolute" style={{ left: 16, top: 184, width: 58, height: 58 }}>
            <Target show={step === 3} label="seal" />
            <div className="absolute inset-0 grid place-items-center">
              <Seal text="HOSPITAL SEAL · EYE CARE ·" show={step >= 4} size={54} />
            </div>
          </div>
          <div className="absolute" style={{ left: 90, top: 180, width: 80, height: 28 }}>
            <Target show={step === 3} label="signature" />
            <div className="absolute inset-0 grid place-items-center">
              <Signature show={step >= 4} width={70} delay={0.61} />
            </div>
          </div>
          <div className="absolute" style={{ left: 90, top: 212, width: 80, height: 32 }}>
            <Target show={step === 3} label="doctor seal" />
            <motion.div
              className="absolute inset-0 rounded-[3px] border border-brand px-1.5 py-1"
              initial={false}
              animate={step >= 4 ? { opacity: 1, scale: 1, rotate: 2 } : { opacity: 0, scale: 1.5, rotate: -6 }}
              transition={{ duration: 0.19, ease: [0.3, 1.4, 0.5, 1], delay: step >= 4 ? 0.3 : 0 }}
            >
              <span className="block text-[8px] font-medium text-brand-ink">Dr. X</span>
              <span className="block font-mono text-[6px] text-brand-ink">RMC 41792</span>
              <span className="block text-[6px] text-brand-ink">Ophthalmology</span>
            </motion.div>
          </div>

          <ScanBeam active={step === 1} height={252} />
        </div>
      </Box>

      {/* Context panel */}
      <Panel
        x={362}
        y={16}
        w={182}
        h={252}
        title={["the request", "reading", "matching the doctor", "rules, in plain english", "stamping", "done"][step]}
      >
        <Side step={step} />
      </Panel>

      {/* Pipeline / output strip */}
      <Box x={16} y={282} w={528} h={52} className="flex items-center gap-3 rounded-xl border border-stroke bg-surface px-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {step < 5 ? (
            <motion.div key="pipe" className="flex flex-1 items-center gap-1.5" exit={{ opacity: 0 }}>
              {STAGES.map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-1.5">
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-[3px] text-[8.5px] transition-colors duration-500 ${
                      i === step ? "accent-gradient text-white" : i < step ? "bg-brand/10 text-brand-ink" : "bg-bg text-muted"
                    }`}
                  >
                    {s}
                  </span>
                  {i < STAGES.length - 1 && <span className="h-px flex-1 bg-stroke" />}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="out" className="flex flex-1 items-center gap-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              <span className="grid h-[30px] w-[24px] place-items-center rounded-[3px] border border-brand bg-brand/10 font-mono text-[6px] text-brand-ink">
                PDF
              </span>
              <div className="flex-1">
                <span className="block font-mono text-[10.5px] text-text-primary">sealed.pdf</span>
                <span className="block text-[8.5px] text-muted">7 pages back, 3 stamps placed, text still searchable</span>
              </div>
              <Pill tone="ok">
                <Check size={9} /> ready to upload
              </Pill>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
}
