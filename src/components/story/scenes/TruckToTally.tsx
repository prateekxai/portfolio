import { motion } from "framer-motion";
import { Box, Check, Cursor, Label, Panel, Pill, Pipeline, Stagger, Swap, TruckIcon, type SceneProps } from "../kit";

const SLIPS = [
  ["RJ19GJ6140", "31,810 kg", "Limestone"],
  ["RJ14GB2231", "28,440 kg", "Charcoal"],
  ["RJ19GA0981", "30,120 kg", "Limestone"],
];

const MATERIALS: [string, boolean][] = [
  ["Limestone", true],
  ["Charcoal", true],
  ["Pet coke", true],
  ["Marble", false],
];

export default function TruckToTallyScene({ step }: SceneProps) {
  return (
    <>
      {/* Rates */}
      <Panel x={16} y={16} w={168} h={134} title="rates" aside={step === 0 ? <Pill tone="info">publishing</Pill> : undefined}>
        <div className="flex flex-col gap-1.5 p-2 text-[8.5px]">
          <span className="text-text-primary">Limestone · Supplier A</span>
          <div className="flex items-center justify-between text-muted">
            <span className="line-through">₹1,180/MT</span>
            <Pill>superseded</Pill>
          </div>
          <motion.div
            className="flex items-center justify-between rounded-md border border-brand/40 bg-brand/5 px-1.5 py-1"
            initial={false}
            animate={{ opacity: 1, scale: step === 0 ? [0.96, 1] : 1 }}
            transition={{ duration: 0.28 }}
          >
            <span className="whitespace-nowrap text-text-primary">₹1,250/MT</span>
            <Pill tone="ok">active from 15 Apr</Pill>
          </motion.div>
          <span className="text-[7.5px] text-muted">published by purchase head · v2</span>
        </div>
      </Panel>

      {/* Weighbridge */}
      <Panel x={16} y={158} w={168} h={124} title="weighbridge → ERP">
        <div className="relative h-[34px] overflow-hidden border-b border-stroke">
          <motion.div
            className="absolute top-0"
            initial={false}
            animate={step === 1 ? { x: [-80, 40, 40, 190] } : { x: 40 }}
            transition={step === 1 ? { duration: 1.98, times: [0, 0.35, 0.65, 1], ease: "easeInOut" } : { duration: 0 }}
          >
            <TruckIcon width={64} />
          </motion.div>
          <span className="absolute bottom-0 left-8 right-8 h-[3px] rounded bg-text-primary/20" />
        </div>
        <div className="flex flex-col gap-1.5 p-2.5">
          {SLIPS.map(([no, kg, mat], i) => (
            <Box key={no} x={0} y={0} show={step >= 1} delay={step === 1 ? 0.33 + i * 0.28 : 0} className="!relative flex justify-between font-mono text-[7.5px]">
              <span className="text-text-primary">{no}</span>
              <span className="text-muted">{kg}</span>
              <span className="text-muted">{mat}</span>
            </Box>
          ))}
        </div>
      </Panel>

      {/* Extension popup */}
      <Panel x={196} y={16} w={168} h={164} title="tally bridge · extension">
        <div className="flex flex-col gap-1.5 p-2.5 text-[8.5px]">
          {MATERIALS.map(([m, on]) => (
            <div key={m} className="flex items-center gap-2">
              <span className={`grid h-2.5 w-2.5 place-items-center rounded-[3px] border ${on ? "border-brand bg-brand" : "border-stroke"}`}>
                {on && <span className="h-1 w-1 rounded-[1px] bg-white" />}
              </span>
              <span className={on ? "text-text-primary" : "text-muted"}>{m}</span>
            </div>
          ))}
          <span className="mt-0.5 text-[7.5px] text-muted">yesterday → today</span>
          <motion.span
            className="accent-gradient mt-0.5 grid h-[20px] place-items-center rounded-md text-[9px] text-white"
            initial={false}
            animate={{ scale: step === 2 ? [1, 1, 0.93, 1] : 1 }}
            transition={{ duration: 0.99, times: [0, 0.55, 0.62, 0.72] }}
          >
            Push
          </motion.span>
        </div>
      </Panel>
      <Cursor x={step >= 2 ? 300 : 330} y={step >= 2 ? 160 : 210} show={step === 2} click={step === 2} />

      {/* Pricing */}
      <Panel x={196} y={186} w={168} h={104} title="priced on its own date" show={step >= 3}>
        <div className="flex flex-col gap-1 p-2 font-mono text-[8.5px]">
          <Stagger delay={0.17} gap={0.19}>
            {[
              <span key="a" className="text-muted">31,810 kg → <span className="text-text-primary">31.810 MT</span></span>,
              <span key="b" className="text-muted">× ₹1,250 = <span className="text-text-primary">₹39,762.50</span></span>,
              <span key="c" className="text-muted">tax: <span className="text-text-primary">none (LS family)</span></span>,
              <span key="d" className="text-muted">voucher <span className="text-brand-ink">LS / 4,563</span></span>,
            ]}
          </Stagger>
        </div>
      </Panel>

      {/* Tally */}
      <Panel x={376} y={16} w={168} h={266} title="tallyprime" aside={step >= 4 ? <Pill tone="ok">38 of 41</Pill> : undefined}>
        <Swap id={step < 4 ? "wait" : step === 4 ? "post" : "verify"} className="flex flex-col gap-2 p-2.5 text-[8.5px]">
          {step < 4 && (
            <span className="text-muted">Waiting for the push. Nothing is posted until rates and trucks are priced.</span>
          )}
          {step === 4 && (
            <Stagger delay={0.11} gap={0.17}>
              {[
                <Row key="1" no="LS/4,563" status={<Pill tone="ok">created</Pill>} />,
                <Row key="2" no="LS/4,564" status={<Pill tone="ok">created</Pill>} />,
                <Row key="3" no="CH/0,212" status={<Pill tone="warn">duplicate caught</Pill>} />,
                <Row key="4" no="PC/0,087" status={<Pill>company closed, retry</Pill>} />,
                <Row key="5" no="LS/4,565" status={<Pill tone="ok">created</Pill>} />,
              ]}
            </Stagger>
          )}
          {step === 5 && (
            <>
              <Label>read back out of tally</Label>
              <Stagger delay={0.11} gap={0.17}>
                {[
                  <Line key="q" k="in the queue" v="41" />,
                  <Line key="t" k="found in Tally" v="41" />,
                  <Line key="m" k="missing" v="0" />,
                  <Line key="u" k="unknown to queue" v="0" />,
                ]}
              </Stagger>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="mt-1 flex items-center gap-1.5 text-text-primary">
                <Check /> books match the weighbridge
              </motion.div>
            </>
          )}
        </Swap>
      </Panel>

      <Pipeline x={16} y={296} w={528} stages={["rate", "weigh", "push", "price", "post", "verify"]} active={step} />
    </>
  );
}

function Row({ no, status }: { no: string; status: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-stroke pb-1.5">
      <span className="font-mono text-[8px] text-text-primary">{no}</span>
      {status}
    </div>
  );
}

function Line({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-stroke pb-1.5">
      <span className="text-muted">{k}</span>
      <span className="font-mono text-text-primary">{v}</span>
    </div>
  );
}
