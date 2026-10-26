import { motion } from "framer-motion";
import { Check, Label, Panel, Pill, Stagger, Swap, type SceneProps } from "../kit";

const MENTORS = [
  { i: "AK", name: "Aman K.", tags: ["React", "System design"] },
  { i: "NS", name: "Neha S.", tags: ["DSA", "Interviews"] },
  { i: "RV", name: "Rohit V.", tags: ["ML", "Python"] },
];

function Msg({ me, text, delay }: { me?: boolean; text: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.19, delay }}
      className={`max-w-[75%] rounded-xl px-2.5 py-1.5 text-[8.5px] leading-snug ${
        me ? "self-end rounded-br-sm bg-brand/15 text-text-primary" : "self-start rounded-bl-sm border border-stroke bg-bg text-text-primary"
      }`}
    >
      {text}
    </motion.div>
  );
}

export default function DiscomScene({ step }: SceneProps) {
  return (
    <>
      {/* Directory */}
      <Panel x={16} y={16} w={168} h={318} title="mentors">
        <div className="flex flex-col gap-2 p-2.5">
          {MENTORS.map((m, idx) => (
            <motion.div
              key={m.name}
              className={`rounded-lg border p-2 ${idx === 1 ? "border-brand/50 bg-brand/5" : "border-stroke"}`}
              initial={false}
              animate={{ opacity: step === 0 || idx === 1 ? 1 : 0.45 }}
            >
              <div className="flex items-center gap-2">
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-text-primary/10 text-[7.5px] text-text-primary">
                  {m.i}
                  <span className={`absolute -bottom-0 -right-0 h-2 w-2 rounded-full border border-surface ${idx === 2 ? "bg-muted" : "bg-green-500"}`} />
                </span>
                <span className="text-[9px] text-text-primary">{m.name}</span>
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {m.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
              {idx === 1 && (
                <motion.span
                  className="accent-gradient mt-1.5 grid h-[18px] place-items-center rounded text-[8px] text-white"
                  initial={false}
                  animate={{ scale: step === 0 ? [1, 1, 0.92, 1] : 1 }}
                  transition={{ duration: 1.32, times: [0, 0.6, 0.67, 0.75] }}
                >
                  Connect
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </Panel>

      {/* Conversation */}
      <Panel
        x={196}
        y={16}
        w={348}
        h={210}
        title={step === 2 ? "video call · Neha S." : "chat · Neha S."}
        aside={<span className="flex items-center gap-1 text-[7.5px] text-muted"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> online</span>}
      >
        <Swap id={step === 2 ? "call" : step >= 1 ? "chat" : "empty"} className="flex h-[176px] flex-col gap-1.5 p-3">
          {step === 0 && <span className="m-auto text-[9px] text-muted">Pick a mentor to start talking.</span>}
          {(step === 1 || step >= 3) && (
            <>
              {step === 1 && <Msg me text="Hi! I'm prepping for backend interviews. Could you look at my plan?" delay={0.11} />}
              <Msg text="Sure, send it over. Happy to do a quick call too." delay={step === 1 ? 0.5 : 0} />
              {step >= 3 ? (
                <>
                  <Msg me text="@assistant process vs thread, quickly?" delay={0.11} />
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-[80%] self-start rounded-xl border border-brand/40 bg-brand/5 px-2.5 py-1.5 text-[8.5px] leading-snug text-text-primary"
                  >
                    <Label className="mb-0.5">ai assistant</Label>
                    A process has its own memory. Threads share their process's memory, so they're lighter but need care with shared state.
                  </motion.div>
                </>
              ) : (
                <motion.span
                  className="self-start rounded-xl border border-stroke bg-bg px-2.5 py-1 text-[9px] text-muted"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.66, repeat: Infinity, delay: 0.88 }}
                >
                  typing…
                </motion.span>
              )}
            </>
          )}
          {step === 2 && (
            <div className="grid flex-1 grid-cols-2 gap-2">
              {["NS", "You"].map((who, i) => (
                <div key={who} className="relative grid place-items-center rounded-lg bg-[#101418]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-[11px] text-white">{who}</span>
                  {i === 0 && (
                    <motion.span
                      className="absolute inset-0 rounded-lg border-2 border-green-400/70"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.77, repeat: Infinity }}
                    />
                  )}
                  <span className="absolute bottom-1.5 left-2 text-[7px] text-white/70">{i === 0 ? "Neha S." : "You"}</span>
                </div>
              ))}
            </div>
          )}
        </Swap>
      </Panel>

      {/* Live / roles */}
      <Panel x={196} y={236} w={348} h={98} title={step === 4 ? "who can do what" : "live connections"}>
        <Swap id={step === 4 ? "roles" : "live"} className="px-3 py-2 text-[8.5px]">
          {step === 4 ? (
            <div className="grid grid-cols-[1.3fr_repeat(3,1fr)] gap-y-1">
              {["", "mentee", "mentor", "admin"].map((h) => (
                <span key={h} className="text-[7px] uppercase tracking-[0.15em] text-muted">{h}</span>
              ))}
              {[
                ["request a session", 1, 0, 1],
                ["accept requests", 0, 1, 1],
                ["manage users", 0, 0, 1],
              ].map(([label, ...cols]) => (
                <Stagger key={label as string} delay={0.11} gap={0.06} className="flex items-center">
                  {[
                    <span key="l" className="text-text-primary">{label}</span>,
                    ...cols.map((c, j) => (c ? <Check key={j} size={10} /> : <span key={j} className="text-muted">·</span>)),
                  ]}
                </Stagger>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div>
                <span className="block font-display text-[30px] italic leading-none text-text-primary">112</span>
                <span className="text-muted">people online</span>
              </div>
              <div className="relative h-[40px] flex-1">
                <span className="absolute inset-x-0 top-1/2 h-px bg-stroke" />
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand"
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.88, repeat: Infinity, delay: i * 0.22, ease: "linear" }}
                  />
                ))}
                <span className="absolute -bottom-1 left-0 text-[7px] text-muted">client</span>
                <span className="absolute -bottom-1 right-0 text-[7px] text-muted">server · WebSocket</span>
              </div>
            </div>
          )}
        </Swap>
      </Panel>
    </>
  );
}
