import { motion } from "framer-motion";
import { Check, Label, Panel, Phone, Pill, ScanBeam, Stagger, Swap, type SceneProps } from "../kit";

function Field({ k, v, ok = true }: { k: string; v: string; ok?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-stroke pb-1">
      <span className="text-muted">{k}</span>
      <span className="flex items-center gap-1 font-mono text-text-primary">
        {v} {ok && <Check size={8} />}
      </span>
    </div>
  );
}

function Screen({ step }: { step: number }) {
  return (
    <Swap id={step} className="flex h-full flex-col gap-2 p-2.5 text-[8px]">
      {step === 0 && (
        <>
          <span className="text-[9px] font-medium text-text-primary">New receipt</span>
          <div className="relative h-[110px] overflow-hidden rounded-lg bg-bg">
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--text) / 0.12) 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
            <motion.div
              className="absolute h-[80px] w-[80px] rounded-full border-2 border-dashed border-brand bg-brand/10"
              style={{ left: "calc(50% - 40px)", top: "calc(50% - 40px)" }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
            <motion.span
              className="absolute h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 shadow"
              initial={{ left: 18, top: 16 }}
              animate={{ left: "calc(50% - 5px)", top: "calc(50% - 5px)" }}
              transition={{ duration: 0.77, delay: 0.22 }}
            />
          </div>
          <Stagger delay={0.88} gap={0.17} className="flex items-center gap-1.5 text-text-primary">
            {[
              <><Check size={9} /> approved device</>,
              <><Check size={9} /> inside site boundary</>,
            ]}
          </Stagger>
        </>
      )}
      {step === 1 && (
        <>
          <div className="relative h-[92px] overflow-hidden rounded-lg bg-[#1a1d21] p-2">
            <div className="h-full rounded bg-white/90 p-1.5">
              <span className="block text-[6.5px] font-bold text-black">TAX INVOICE</span>
              {[70, 50, 85, 60].map((w, i) => (
                <span key={i} className="mt-1 block h-[2px] rounded bg-black/30" style={{ width: `${w}%` }} />
              ))}
            </div>
            <ScanBeam active height={92} />
          </div>
          <Stagger delay={0.33} gap={0.17}>
            {[
              <Field k="supplier" v="Jain Minerals" />,
              <Field k="bill no." v="JM/1187" />,
              <Field k="vehicle" v="RJ19GJ6140" />,
              <Field k="lines" v="2 items" />,
            ]}
          </Stagger>
        </>
      )}
      {step === 2 && (
        <>
          <div className="relative h-[130px] overflow-hidden rounded-lg bg-gradient-to-br from-stone-500 to-stone-700">
            <div className="absolute bottom-5 left-4 h-[46px] w-[70px] rounded-sm bg-stone-300/70" />
            <div className="absolute bottom-5 left-[60px] h-[34px] w-[60px] rounded-sm bg-stone-400/80" />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33 }}
              className="absolute inset-x-0 bottom-0 bg-black/55 px-1.5 py-1 font-mono text-[6px] leading-snug text-white"
            >
              12 Oct 10:44:02 IST · 26.91, 75.78 ±6 m
              <br />
              inside · ramesh.k · device 7f2c · RN draft
            </motion.div>
          </div>
          <span className="text-muted">Camera only. No gallery uploads.</span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.66 }} className="self-start">
            <Pill tone="info">SHA-256 fingerprinted</Pill>
          </motion.span>
        </>
      )}
      {step === 3 && (
        <>
          <span className="text-[9px] font-medium text-text-primary">Goods</span>
          <Field k="bill qty" v="32.000 MT" ok={false} />
          <Field k="weighbridge" v="31.810 MT" ok={false} />
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }} className="flex items-center justify-between">
            <span className="text-muted">difference</span>
            <Pill tone="warn">−0.190 MT</Pill>
          </motion.div>
        </>
      )}
      {step === 4 && (
        <>
          <span className="text-[9px] font-medium text-text-primary">Final submit</span>
          <Stagger delay={0.11} gap={0.17} className="flex items-center gap-1.5 text-text-primary">
            {[
              <><Check size={9} /> form rules met</>,
              <><Check size={9} /> 4 photos attached</>,
              <><Check size={9} /> not a duplicate truckload</>,
            ]}
          </Stagger>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.72 }}
            className="mt-1 rounded-lg border border-green-500/40 bg-green-500/10 p-2 text-center"
          >
            <span className="block font-mono text-[10px] text-text-primary">GRN/25-26/0417</span>
            <span className="text-[7px] text-muted">number issued on submit</span>
          </motion.div>
        </>
      )}
    </Swap>
  );
}

export default function ReceiptNoteScene({ step }: SceneProps) {
  return (
    <>
      <Phone x={28} y={10} w={164} h={330}>
        <div className="flex items-center justify-between px-3 pt-1 text-[7px] text-muted">
          <span>Receipt Notes</span>
          <span>10:44</span>
        </div>
        <Screen step={step} />
      </Phone>

      <Panel
        x={216}
        y={16}
        w={328}
        h={318}
        title={["who, where and when", "ai suggests, a person confirms", "server-signed capture stamp", "short supply, on paper", "the database says no"][step]}
      >
        <Swap id={step} className="flex flex-col gap-2.5 p-3.5 text-[9px]">
          {step === 0 && (
            <Stagger delay={0.17} gap={0.17}>
              {[
                ["device", "approved by admin · token 7f2c"],
                ["location", "26.91° N, 75.78° E"],
                ["gps accuracy", "± 6 m"],
                ["geofence", "inside (outside is flagged, not blocked)"],
                ["time", "from the server, never the phone"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-stroke pb-1.5">
                  <span className="text-muted">{k}</span>
                  <span className="text-right text-text-primary">{v}</span>
                </div>
              ))}
            </Stagger>
          )}
          {step === 1 && (
            <>
              <div className="grid grid-cols-3 text-[7.5px] uppercase tracking-[0.18em] text-muted">
                <span>field</span>
                <span>ai suggested</span>
                <span>confirmed</span>
              </div>
              <Stagger delay={0.17} gap={0.17}>
                {[
                  ["supplier", "Jain Minerals", "Jain Minerals"],
                  ["bill no.", "JM/1187", "JM/1187"],
                  ["transporter", "Shree Ganesh", "Shree Ganesh Rdw."],
                  ["vehicle", "RJ19GJ6140", "RJ19GJ6140"],
                ].map(([f, a, c]) => (
                  <div key={f} className="grid grid-cols-3 border-b border-stroke pb-1.5">
                    <span className="text-muted">{f}</span>
                    <span className="font-mono text-[8px] text-text-primary">{a}</span>
                    <span className="font-mono text-[8px] text-brand-ink">{c}</span>
                  </div>
                ))}
              </Stagger>
              <span className="text-muted">Both columns are kept. Gemini Flash reads first, Pro steps in for hard bills.</span>
            </>
          )}
          {step === 2 && (
            <div className="rounded-lg border border-stroke bg-bg p-3 font-mono text-[8.5px] leading-relaxed">
              <Stagger delay={0.11} gap={0.12}>
                {[
                  ["issued_at", "10:44:02 IST (server)"],
                  ["valid_for", "5 minutes, single use"],
                  ["position", "26.91, 75.78 ± 6 m · inside"],
                  ["user / device", "ramesh.k / 7f2c"],
                  ["receipt", "RN draft 0417"],
                  ["sha256", "9f3a…c21e"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <span className="text-muted">{k}</span>
                    <span className="text-text-primary">{v}</span>
                  </div>
                ))}
              </Stagger>
            </div>
          )}
          {step === 3 && (
            <>
              <Label>printed on the GRN</Label>
              <div className="flex items-end gap-6 px-2">
                {[["bill", 32, "32.000 MT"], ["weighbridge", 31.81, "31.810 MT"]].map(([k, v, t], i) => (
                  <div key={k as string} className="flex flex-col items-center gap-1">
                    <motion.div
                      className={`w-14 rounded-t ${i === 0 ? "bg-text-primary/20" : "accent-gradient"}`}
                      initial={{ height: 0 }}
                      animate={{ height: ((v as number) - 28) * 30 }}
                      transition={{ duration: 0.44, delay: 0.11 + i * 0.17 }}
                    />
                    <span className="font-mono text-[8.5px] text-text-primary">{t}</span>
                    <span className="text-[7.5px] text-muted">{k}</span>
                  </div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }} className="mb-6">
                  <Pill tone="warn">0.190 MT short</Pill>
                </motion.div>
              </div>
              <span className="text-muted">Accounts sees the gap before the bill is paid.</span>
            </>
          )}
          {step === 4 && (
            <>
              <div className="flex items-center justify-between rounded-lg border border-red-500/30 bg-red-500/5 px-2.5 py-2">
                <span className="text-text-primary">Second submit for WR 10482 + RJ19GJ6140</span>
                <Pill tone="bad">refused</Pill>
              </div>
              <Label className="mt-1">approval ladder</Label>
              <Stagger delay={0.33} gap={0.17}>
                {["Received by", "Checked by", "Store manager", "Authorised by"].map((s, i) => (
                  <div key={s} className="flex items-center justify-between border-b border-stroke pb-1.5">
                    <span className="text-muted">{s}</span>
                    {i < 3 ? <Check size={10} /> : <Pill>waiting</Pill>}
                  </div>
                ))}
              </Stagger>
            </>
          )}
        </Swap>
      </Panel>

    </>
  );
}
