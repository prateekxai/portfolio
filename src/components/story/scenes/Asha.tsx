import { motion } from "framer-motion";
import { Check, Label, Panel, Phone, Pill, Stagger, Swap, Wave, type SceneProps } from "../kit";

const LANGS = ["हिन्दी", "भोजपुरी", "বাংলা", "मराठी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "ગુજરાતી", "ਪੰਜਾਬੀ", "English"];
const INTENTS = ["pregnancy", "periods", "nutrition", "mental health", "schemes", "emergency"];

function Bubble({ me, children, delay = 0 }: { me?: boolean; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      className={`max-w-[88%] rounded-xl px-2 py-1.5 text-[8px] leading-snug ${
        me ? "self-end rounded-br-sm bg-brand/15 text-text-primary" : "self-start rounded-bl-sm border border-stroke bg-bg text-text-primary"
      }`}
    >
      {children}
    </motion.div>
  );
}

export default function AshaScene({ step }: SceneProps) {
  const worker = step === 4;
  return (
    <>
      <Phone x={26} y={10} w={168} h={330}>
        <div className="flex items-center gap-1.5 border-b border-stroke px-2.5 pb-1.5 pt-1">
          <span className="accent-gradient grid h-5 w-5 place-items-center rounded-full text-[7px] text-white">आ</span>
          <div>
            <span className="block text-[8px] font-medium text-text-primary">{worker ? "ASHA worker" : "Asha Didi"}</span>
            <span className="block text-[6.5px] text-muted">{worker ? "visit notes" : "on WhatsApp"}</span>
          </div>
        </div>
        <Swap id={worker ? "w" : "c"} className="flex h-[270px] flex-col gap-1.5 p-2">
          {!worker ? (
            <>
              <Bubble me>
                <span className="mb-1 flex items-center gap-1.5">
                  <span className="text-[7px] text-muted">0:06</span>
                  <Wave active={step === 0} bars={14} height={12} />
                </span>
                {step >= 1 && <span>मुझे चक्कर आ रहे हैं और बहुत कमज़ोरी लग रही है</span>}
              </Bubble>
              {step >= 3 && (
                <Bubble delay={0.22}>
                  घबराइए मत। आयरन की गोली रोज़ लीजिए, और गुड़, चना, हरी सब्ज़ी खाइए। आज ही अपनी आशा दीदी से BP जँचवा लीजिए।
                  <span className="mt-1 flex items-center gap-1">
                    <span className="text-[7px] text-brand-ink">▶ reading aloud</span>
                    <Wave active bars={10} height={10} />
                  </span>
                </Bubble>
              )}
              <div className="mt-auto flex items-center justify-center">
                <motion.span
                  className="accent-gradient grid h-9 w-9 place-items-center rounded-full text-white"
                  animate={step === 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ duration: 0.66, repeat: step === 0 ? Infinity : 0 }}
                >
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
                    <rect x="3.5" y="0.5" width="5" height="8" rx="2.5" stroke="white" />
                    <path d="M1 6.5a5 5 0 0 0 10 0M6 11.5v2" stroke="white" />
                  </svg>
                </motion.span>
              </div>
            </>
          ) : (
            <>
              <Bubble me>
                <span className="mb-1 flex items-center gap-1.5">
                  <span className="text-[7px] text-muted">0:21</span>
                  <Wave active bars={14} height={12} />
                </span>
                Sunita, 7 months, BP 146/94, pair mein sujan, IFA nahi le rahi
              </Bubble>
              <Stagger delay={0.33} gap={0.17}>
                {[
                  ["patient", "Sunita"],
                  ["BP", "146/94"],
                  ["symptoms", "swelling in feet"],
                  ["medicines", "IFA missed"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b border-stroke pb-1 text-[7.5px]">
                    <span className="text-muted">{k}</span>
                    <span className="text-text-primary">{v}</span>
                  </div>
                ))}
              </Stagger>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-1">
                <Pill tone="bad">high risk, follow-up alert</Pill>
              </motion.div>
            </>
          )}
        </Swap>
      </Phone>

      <Panel
        x={214}
        y={16}
        w={330}
        h={318}
        title={["she speaks", "speech to text, then intent", "safety check, before any ai", "asha didi replies", "the asha worker's side"][step]}
      >
        <Swap id={step} className="flex flex-col gap-3 p-3.5 text-[9px]">
          {step === 0 && (
            <>
              <span className="text-muted">A voice note on WhatsApp or in the app. No typing and no English needed. Eleven languages.</span>
              <div className="flex flex-wrap gap-1.5">
                {LANGS.map((l, i) => (
                  <motion.span
                    key={l}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.11 + i * 0.04 }}
                    className={`rounded-full border px-2 py-[3px] text-[9px] ${i === 0 ? "border-brand bg-brand/10 text-text-primary" : "border-stroke text-muted"}`}
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="rounded-lg border border-stroke bg-bg p-2.5">
                <Label>transcript · hindi</Label>
                <span className="mt-1 block text-text-primary">"I feel dizzy and very weak"</span>
              </div>
              <Label>intent</Label>
              <div className="flex flex-wrap gap-1.5">
                {INTENTS.map((t, i) => (
                  <motion.span key={t} initial={false} animate={{ opacity: t === "pregnancy" ? 1 : 0.45 }} transition={{ delay: 0.22 + i * 0.06 }}>
                    <Pill tone={t === "pregnancy" ? "info" : "muted"}>{t}</Pill>
                  </motion.span>
                ))}
              </div>
              <span className="text-muted">Whisper turns speech into text. A fine-tuned Mistral model reads the dialect and finds the intent.</span>
            </>
          )}
          {step === 2 && (
            <>
              <Label>critical words, checked in plain code</Label>
              <Stagger delay={0.11} gap={0.17}>
                {["bleeding", "behosh (fainted)", "seizure", "severe pain"].map((w) => (
                  <div key={w} className="flex items-center justify-between border-b border-stroke pb-1.5">
                    <span className="text-text-primary">{w}</span>
                    <span className="text-muted">not found</span>
                  </div>
                ))}
              </Stagger>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="flex items-center gap-2 text-text-primary">
                <Check /> Safe to answer. A match would raise an SOS instead.
              </motion.div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3">
                <span className="accent-gradient grid h-10 w-10 place-items-center rounded-full text-[12px] text-white">आ</span>
                <div>
                  <span className="block text-text-primary">Asha Didi</span>
                  <span className="block text-muted">an interactive chatbot, in her language</span>
                </div>
              </div>
              <Stagger delay={0.17} gap={0.17}>
                {[
                  <span key="a" className="flex items-center gap-2 text-text-primary"><Check size={9} /> iron-rich local food</span>,
                  <span key="b" className="flex items-center gap-2 text-text-primary"><Check size={9} /> IFA tablet reminder</span>,
                  <span key="c" className="flex items-center gap-2 text-text-primary"><Check size={9} /> a nudge to see her ASHA worker</span>,
                  <span key="d" className="flex items-center gap-2 text-text-primary"><Check size={9} /> stored, then read aloud</span>,
                ]}
              </Stagger>
            </>
          )}
          {step === 4 && (
            <>
              <span className="text-muted">The worker dictates, AI fills the visit form, she checks it, then the risk rules run.</span>
              <Stagger delay={0.17} gap={0.17}>
                {[
                  ["BP 140/90 or more", "high", "bad"],
                  ["3 or more symptoms", "medium", "warn"],
                  ["critical words", "SOS", "bad"],
                ].map(([rule, level, tone]) => (
                  <div key={rule} className="flex items-center justify-between border-b border-stroke pb-1.5">
                    <span className="text-text-primary">{rule}</span>
                    <Pill tone={tone as "bad" | "warn"}>{level}</Pill>
                  </div>
                ))}
              </Stagger>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.88 }} className="rounded-lg border border-stroke bg-bg p-2">
                <Label>patient list</Label>
                <div className="mt-1 flex justify-between"><span className="text-text-primary">Sunita</span><Pill tone="bad">high risk</Pill></div>
                <div className="mt-1 flex justify-between"><span className="text-text-primary">Radha</span><Pill tone="warn">medium</Pill></div>
              </motion.div>
            </>
          )}
        </Swap>
      </Panel>
    </>
  );
}
