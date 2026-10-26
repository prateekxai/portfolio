import { motion } from "framer-motion";
import { Box, Check, Cursor, Feed, Label, Panel, Pill, Stagger, Swap, Typed, Window, type SceneProps } from "../kit";

const PLATE = "RJ19GJ6140";

export default function AnprScene({ step }: SceneProps) {
  return (
    <>
      {/* Camera */}
      <Feed x={16} y={16} w={300} h={196} label="CAM 01 · FRONT" time="10:42:17">
        {/* Truck front */}
        <motion.div
          className="absolute"
          style={{ left: 92, top: 40, width: 120, height: 140 }}
          initial={false}
          animate={step === 0 ? { y: [60, 0], scale: [0.7, 1], opacity: [0, 1] } : { y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: step === 0 ? 1.21 : 0, ease: "easeOut" }}
        >
          <div className="absolute inset-x-2 top-0 h-[54px] rounded-t-lg bg-[#2c3640]" />
          <div className="absolute inset-x-5 top-2 h-[30px] rounded bg-[#5d7a92]/70" />
          <div className="absolute inset-x-0 top-[54px] h-[62px] rounded-b-md bg-[#38444f]" />
          <div className="absolute left-2 top-[64px] h-3 w-5 rounded-sm bg-amber-200/80" />
          <div className="absolute right-2 top-[64px] h-3 w-5 rounded-sm bg-amber-200/80" />
          <div className="absolute left-1/2 top-[86px] grid h-[16px] w-[62px] -translate-x-1/2 place-items-center rounded-[2px] bg-[#f4d64a] font-mono text-[7.5px] font-bold text-black">
            {PLATE}
          </div>
          <div className="absolute -bottom-1 left-0 h-4 w-6 rounded bg-black/80" />
          <div className="absolute -bottom-1 right-0 h-4 w-6 rounded bg-black/80" />
        </motion.div>

        {/* Detection box */}
        <motion.div
          className="absolute rounded-[3px] border-2 border-green-400"
          style={{ left: 119, top: 122, width: 70, height: 24 }}
          initial={false}
          animate={{ opacity: step >= 1 && step <= 2 ? 1 : 0, scale: step >= 1 ? 1 : 1.4 }}
          transition={{ duration: 0.22 }}
        >
          <span className="absolute -top-[13px] left-[-2px] whitespace-nowrap rounded-sm bg-green-400 px-1 font-mono text-[7px] text-black">
            plate 0.94 · #17
          </span>
        </motion.div>
        <motion.div
          className="absolute rounded border border-white/30"
          style={{ left: 88, top: 36, width: 128, height: 150 }}
          initial={false}
          animate={{ opacity: step === 1 ? [0, 1, 0.5] : 0 }}
          transition={{ duration: 0.66 }}
        >
          <span className="absolute -top-[12px] left-0 font-mono text-[7px] text-white/70">truck · tracking</span>
        </motion.div>
      </Feed>

      {/* OCR */}
      <Panel x={330} y={16} w={214} h={98} title="ocr + validation" show={step >= 2}>
        <div className="flex flex-col gap-1 p-2 text-[8.5px]">
          <span className="font-mono text-[13px] tracking-[0.12em] text-text-primary">
            <Typed text={PLATE} show={step >= 2} duration={0.5} delay={0.17} />
          </span>
          <Stagger delay={0.66} gap={0.22} className="flex items-center gap-1.5 text-muted">
            {[
              <><Check size={9} /> format AA00AA0000</>,
              <><Check size={9} /> exact match, no fuzzy guess</>,
            ]}
          </Stagger>
        </div>
      </Panel>

      {/* Operator overlay */}
      <Panel x={330} y={120} w={214} h={96} title="anpr · always on top" show={step >= 3} enter="left">
        <div className="flex gap-2.5 px-2.5 py-2">
          <div className="grid h-[34px] w-[64px] shrink-0 place-items-center rounded bg-[#f4d64a] font-mono text-[7.5px] font-bold text-black">
            {PLATE}
          </div>
          <div className="flex-1">
            <span className="block font-mono text-[11px] text-text-primary">{PLATE}</span>
            <span className="block text-[7.5px] text-muted">front camera · 10:42:17</span>
          </div>
        </div>
        <div className="flex gap-1.5 px-2.5">
          <motion.span
            className="accent-gradient grid h-[18px] flex-1 place-items-center rounded text-[8.5px] text-white"
            initial={false}
            animate={{ scale: step === 3 ? [1, 1, 0.92, 1] : 1 }}
            transition={{ duration: 1.1, times: [0, 0.6, 0.67, 0.75] }}
          >
            Fill
          </motion.span>
          <span className="grid h-[18px] flex-1 place-items-center rounded border border-stroke text-[8.5px] text-muted">Edit</span>
          <span className="grid h-[18px] flex-1 place-items-center rounded border border-stroke text-[8.5px] text-muted">Dismiss</span>
        </div>
      </Panel>
      <Cursor x={step >= 3 ? 372 : 470} y={step >= 3 ? 196 : 250} show={step === 3} click={step === 3} />

      {/* Vendor app */}
      <Window x={16} y={224} w={300} h={112} title="Weighbridge v4.2 (vendor app, no API)">
        <div className="grid grid-cols-[86px_1fr] items-center gap-x-2 gap-y-1.5 p-2.5 text-[8.5px]">
          <span className="text-muted">Vehicle No.</span>
          <span
            className={`flex h-[18px] items-center justify-between rounded border px-1.5 font-mono transition-colors duration-500 ${
              step === 4 ? "border-brand bg-brand/5" : "border-stroke"
            }`}
          >
            <Typed text={PLATE} show={step >= 4} duration={0.44} delay={0.22} className="text-text-primary" />
            {step >= 4 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.77 }} className="flex items-center gap-1 font-body text-[7px] text-muted">
                read back <Check size={9} />
              </motion.span>
            )}
          </span>
          <span className="text-muted">Gross weight</span>
          <span
            className={`flex h-[18px] items-center rounded border px-1.5 font-mono transition-colors duration-500 ${
              step === 4 ? "border-stroke" : "border-stroke"
            }`}
          >
            <span className="text-text-primary">41,260 kg</span>
            {step === 4 && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 1.04, duration: 0.55, repeat: Infinity }} className="ml-1 h-3 w-px bg-text-primary" />
            )}
          </span>
          <span className="text-muted">Save</span>
          <span className="text-[7.5px] text-muted">always pressed by the operator</span>
        </div>
      </Window>

      {/* Log */}
      <Panel x={330} y={224} w={214} h={112} title="event log">
        <Swap id={step >= 5 ? "report" : "log"} className="flex flex-col gap-1.5 p-2.5 font-mono text-[7.5px]">
          {step < 5 ? (
            <>
              {["10:42:17 received RJ19GJ6140", "10:42:21 filled, read back ok", "10:42:22 tab sent"].map((l, i) => (
                <motion.span key={l} initial={false} animate={{ opacity: step >= 3 + Math.min(i, 1) ? 1 : 0.25 }} className="text-muted">
                  {l}
                </motion.span>
              ))}
            </>
          ) : (
            <>
              <Label>nightly, read only</Label>
              <Stagger delay={0.11} gap={0.17} className="flex items-center justify-between font-body text-[8.5px]">
                {[
                  <><span className="text-muted">saved vs suggested</span><Pill tone="ok">match</Pill></>,
                  <><span className="text-muted">operator edits</span><span className="text-text-primary">logged</span></>,
                  <><span className="text-muted">no-plate cases</span><span className="text-text-primary">logged</span></>,
                ]}
              </Stagger>
            </>
          )}
        </Swap>
      </Panel>

      <Box x={198} y={196} show={step >= 1 && step <= 2} enter="fade">
        <Pill tone="info">one pipeline per camera</Pill>
      </Box>
    </>
  );
}
