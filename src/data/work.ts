/**
 * Everything on the /work page: the automation case studies (also published
 * at growitup.online/work) and the projects from the résumé, written up as
 * short stories. Figures marked [M], [C] or [E] are measured,
 * client-reported or estimated, and render as small superscripts.
 */

import {
  GROWITUP,
  H,
  list,
  p,
  plain,
  storyboard,
  type Figure,
  type WorkItem,
} from "./workKit";
import { GITHUB_WORK } from "./githubWork";

export * from "./workKit";
export { ARCHIVE, type ArchiveItem } from "./githubWork";

const CORE_WORK: WorkItem[] = [
  {
    slug: "tally-bookkeeping-automation",
    kind: "case-study",
    group: "Automation",
    name: "Tally Bookkeeping Automation",
    subtitle: "Bills, bank statements and reconciliation, posted straight into Tally",
    hook: "An accounts team was typing 3,000 vouchers a month by hand. Now they drop in PDFs and review a short list of exceptions.",
    category: "Tally & Accounting",
    status: "In production",
    statusTone: "success",
    headline: { value: "~120 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~120 hrs", source: "E" },
    annualValue: { value: "~₹3.6 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "Mid-size businesses with high voucher volumes" },
      { label: "Status", value: "In production" },
      { label: "Result", value: "Month-end close from 8 to 10 days down to about 2 [E]" },
      { label: "Annual value", value: "~₹3.6 lakh [E]" },
    ],
    stack: ["Python", "AI vision OCR", "TallyPrime XML over HTTP", "Excel & PDF parsing", "Windows CLI"],
    skills: ["Document AI", "Tally integration", "GST & ledger logic", "Reconciliation", "Python tooling"],
    steps: [
      { title: "A stack of bills lands", caption: "Vendor bills arrive as one thick PDF. The tool splits it page by page so every bill can be handled on its own." },
      { title: "Each bill gets read", caption: "AI vision pulls out the party, GSTIN, invoice number, date, items, rates, taxes and totals." },
      { title: "Checked before anything moves", caption: "Do the totals add up? Is the GST maths right? Has this invoice number already been booked for this party?" },
      { title: "Names matched to live Tally", caption: "Every party and ledger is matched against the company's chart of accounts as it stands today. Unknown names get flagged, never created." },
      { title: "A dry run, then the real post", caption: "First it shows exactly what it is about to post. Then the vouchers go into TallyPrime and every reply is read back." },
      { title: "The bank reconciles itself", caption: "Bank lines are matched against the books. Only the few that don't match land on a person's desk." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Every month this accounts team typed about 3,000 vouchers [E] into Tally, line by line, at roughly two minutes each. Then they spent another 30 hours [E] matching it all against the bank statement. Vendor bills came in as fat PDFs with dozens of bills stitched together, and they took days to get through."),
          p("The typing wasn't even the worst part. Party names were spelled a little differently every time, so Tally either rejected the entry or quietly filled up with near-duplicate ledgers. About 4% of entries had a mistake [E], and closing the books took 8 to 10 days [E]. I wanted the team to stop being typists and start being reviewers."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Bill importer.", "Splits a multi-bill PDF and reads each bill with AI vision: party, GSTIN, invoice details, items, taxes and totals."],
            ["Ledger resolver.", "Matches every name against the live Tally chart of accounts, using rules learned from how the company booked similar entries before."],
            ["Voucher poster.", "Builds clean voucher XML, posts it to Tally's local HTTP interface and reads the reply for every single voucher."],
            ["Bank statement parser.", "Reads Excel or PDF statements and prepares the payment and receipt entries."],
            ["Auto reconciliation.", "Matches bank lines against the books and sends only the leftovers to an exceptions sheet."],
            ["A Tally field guide.", "I wrote down everything I learned about Tally's XML, sign conventions, error messages and Edit Log behaviour, so a strange failure gets decoded instead of guessed."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Let AI read, let code do the accounting.", "Bills are messy: scans, odd layouts, handwriting. Accounting is strict. So the AI only reads. Plain, predictable code decides which ledger gets debited, never the model."],
            ["Trust Tally today, not a list from last month.", "Names are resolved against what is actually in the company's books right now."],
            ["Always rehearse first.", "In audited Tally companies every API write is logged forever. So every run starts with a connection test and a dry run that shows exactly what will be posted."],
            ["Show people the 5%, not the 100%.", "A reviewer's time should go to the entries that need judgement, not to re-checking the ones that are fine."],
          ),
        ],
      },
      {
        heading: H.guardrails,
        body: [
          plain(
            "Arithmetic and GST checks on every bill before it posts.",
            "Duplicate detection on party plus invoice number.",
            "An unknown party or ledger goes to a person. Nothing is auto-created.",
            "The bill importer only creates purchase vouchers. Other voucher types go through their own tested flows.",
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Accounting software is unforgiving, and that makes it a good teacher. I learned to keep the fuzzy part of a system (reading documents) far away from the strict part (posting money), and to make every write provable after the fact. The team now drops in their PDFs, reviews a short exceptions list, and month end feels like a check instead of a sprint."),
        ],
      },
    ],
    impact: [
      { metric: "Entry + reconciliation effort", before: { value: "~130 hrs/month", source: "E" }, after: { value: "~10 hrs/month of review", source: "E" } },
      { metric: "Time saved", after: { value: "~120 hrs/month", source: "E" } },
      { metric: "Entry error rate", before: { value: "~4%", source: "E" }, after: { value: "<0.5%", source: "E" } },
      { metric: "Month-end close", before: { value: "8 to 10 days", source: "E" }, after: { value: "~2 days", source: "E" } },
      { metric: "Annual value", after: { value: "~₹3.6 lakh", source: "E", note: "of accountant time" }, highlight: true },
    ],
    links: { original: GROWITUP + "tally-bookkeeping-automation" },
  },

  {
    slug: "truck-inward-to-tally",
    kind: "case-study",
    group: "Automation",
    name: "Truck Inward to Tally",
    subtitle: "Rate management and automatic receipt-note vouchers for a weighbridge",
    hook: "Around 40 trucks a day crossed this plant's weighbridge, and every one ended up typed into Tally by hand. Now one click turns the day's trucks into priced, numbered vouchers.",
    category: "Tally & Accounting",
    status: "In production",
    statusTone: "success",
    headline: { value: "~130 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~130 hrs", source: "E" },
    annualValue: { value: "~₹6 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A minerals processing plant" },
      { label: "Volume", value: "About 1,150 trucks a month [M]" },
      { label: "Status", value: "In production" },
      { label: "Result", value: "Stale rates and voucher-number clashes gone" },
      { label: "Annual value", value: "~₹6 lakh [E]" },
    ],
    stack: ["Chrome extension (JavaScript)", "ERP rates module", "PostgreSQL", "TallyPrime XML over HTTP", "Node.js verification tool"],
    skills: ["Browser extensions", "ERP integration", "Versioned pricing data", "Idempotent queues", "Tally XML", "Reconciliation"],
    steps: [
      { title: "A rate gets published", caption: "When a supplier contract changes, the purchase head publishes a new rate. It's stored as a price valid from a date. Nothing posts yet." },
      { title: "Trucks cross the weighbridge", caption: "Each truck is weighed and its slip lands in the ERP, exactly as it always did." },
      { title: "One click on Push", caption: "Each morning the accountant opens the extension and presses Push. It pulls the Daily Inwards report for the ticked materials." },
      { title: "Priced on the truck's own date", caption: "31,810 kg becomes 31.810 MT, times the rate that was live that day. Tax comes from the supplier's GSTIN, and the voucher takes the next number in its material's series." },
      { title: "Posted to Tally", caption: "The vouchers go to TallyPrime as XML and every reply is read. Created, duplicate, company closed or missing master: each is handled its own way." },
      { title: "Read back and reconciled", caption: "A separate tool reads the vouchers back out of Tally and checks them against the queue, so nothing marked posted is missing." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("The plant buys raw material from dozens of suppliers: two grades of limestone, charcoal, pet coke and marble. Around 40 trucks a day [M]. Weighing them already worked. Everything after the weighbridge was manual, and every step hid a trap."),
          p("Rates lived in three Excel files and two hand-edited JSON files. They changed during the year, differed by supplier and material, and came in two kinds. Kilograms had to become tonnes with three decimals. Tax depended on the supplier's state. Each material had its own voucher series, and some trucks needed two vouchers sharing one number. Then all of it had to be typed into Tally exactly the way Tally wanted, or Tally rejected the whole voucher."),
          p("That added up to more than 130 hours of accountant time a month [E], plus old rates applied after revisions, skipped voucher numbers and a backlog that never quite went away."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A rates module inside the ERP.", "Admins draft, publish and revise supplier rates. Rates move from Draft to Published to Active to Superseded, are never overwritten, and keep a full history of who changed what."],
            ["A pricing service.", "For each truck it finds the rate that applied on that truck's date, converts the weight, works out the tax and assigns the next voucher number in that material's own series."],
            ["A Chrome extension as the bridge to Tally.", "It logs into the ERP, pulls the inward report, sends the rows for pricing, builds the Tally XML, posts it and reports the outcome back."],
            ["A verify-in-Tally tool.", "It reads vouchers out of Tally, read only, and names anything that's marked posted but missing, or present in Tally but unknown to the queue."],
            ["A clean Tally setup.", "One voucher type per material, tonnes with three decimals, stock items with HSN codes, GST ledgers and a pre-flight checklist so the very first push works."],
          ),
          {
            kind: "table",
            table: {
              caption: "Where each voucher field comes from",
              columns: ["Tally field", "Source"],
              rows: [
                ["Reference No.", "Weighment receipt number + vehicle number"],
                ["Party", "Supplier name, exactly as the ERP spells it"],
                ["Item", "The material's Tally stock item"],
                ["Quantity", "Weighment quantity in MT, three decimals"],
                ["Rate", "The rate that was live on the truck's date"],
                ["Amount", "Quantity × rate"],
                ["Voucher No.", "Next number in that material's own series"],
                ["Date", "The truck's posting date"],
              ],
            },
          },
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["A rate is a price over a period, not a command.", "Publishing a rate posts nothing. A new rate simply closes the old one, so months later you can still answer which rate applied to a truck and who published it."],
            ["Price at the truck's date, not today's.", "If a rate changes on the 15th, a truck weighed on the 12th still gets the old one."],
            ["Refuse to guess.", "The ERP report has two weight columns that look alike. In one sample all 218 trucks [M] differed between them, adding up to 254.8 MT [M]. Picking the wrong one would have mis-stated every voucher, so the system uses the right one and loudly skips anything missing it."],
            ["Nobody types a material name.", "The ERP had \"Lime stone\", \"Lime Stone.\" and \"Lime Stone3\". One plural mismatch once made a whole material silently invisible. So the extension reads names from the ERP's own dropdown."],
            ["Never post twice, never leave gaps.", "Every voucher has a unique key, and anything queued but unconfirmed is retried with its original number. A closed browser or a Tally crash mid-batch can't break the series."],
          ),
        ],
      },
      {
        heading: H.guardrails,
        body: [
          plain(
            "Draft rates are invisible to pricing. Only published rates count.",
            "A truck with no rate, no Tally setup or no GSTIN is skipped with a named reason.",
            "Every Tally reply is read: created, duplicate, company not open (retried later) or rejected (kept with Tally's own message).",
            "Verification only ever exports from Tally. It never imports.",
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Most of the hard problems here weren't code. They were look-alike columns, near-identical names and number series that had to stay unbroken. I learned to treat every assumption as something to check against real data first. Today the accountant clicks Push each morning, reads a short popup of what posted and what was skipped, and gets on with the day."),
        ],
      },
    ],
    impact: [
      { metric: "Trucks handled per month", before: { value: "~1,150", source: "M" }, after: { value: "~1,150, no extra staff" } },
      { metric: "Time per voucher", before: { value: "~7 min", source: "E" }, after: { value: "Seconds, in one batch" } },
      { metric: "Accountant time per month", before: { value: "~135 hrs", source: "E" }, after: { value: "~5 hrs of review", source: "E" } },
      { metric: "Vouchers priced at a stale rate", before: { value: "~2 to 3%", source: "E" }, after: { value: "0, by design" } },
      { metric: "Duplicate or skipped voucher numbers", before: { value: "Regular" }, after: { value: "0, by design" } },
      { metric: "Posting backlog", before: { value: "3 to 5 days", source: "E" }, after: { value: "Same day" } },
      { metric: "Proof that books match the source", before: { value: "Manual sampling" }, after: { value: "Automated reconciliation against Tally" } },
      { metric: "Annual value", after: { value: "~₹6 lakh", source: "E", note: "(time saved + pricing errors prevented)" }, highlight: true },
    ],
    links: { original: GROWITUP + "truck-inward-to-tally" },
  },

  {
    slug: "asha-ai",
    kind: "project",
    group: "Health AI",
    name: "ASHA AI",
    subtitle: "A voice-first health companion for rural women and ASHA workers",
    hook: "Radha is 19, pregnant and anaemic in a village in Bihar, and she can't type her symptoms in English. ASHA AI lets her just speak, in her own language, right inside WhatsApp.",
    category: "Voice-First Rural Health Companion",
    status: "Live demo",
    statusTone: "success",
    headline: { value: "11", label: "languages, spoken not typed" },
    facts: [
      { label: "Built for", value: "Rural women and the ASHA workers who look after them" },
      { label: "Team", value: "With Prakhar Singh, Lakshya Barnwal and Pushkar Singh" },
      { label: "Channels", value: "WhatsApp and the mobile app, built for low-end phones and patchy networks" },
      { label: "Languages", value: "Hindi, Bhojpuri, Bengali, Marathi, Tamil, Telugu and five more" },
      { label: "Status", value: "Live demo" },
    ],
    stack: ["FastAPI", "React", "Whisper", "Mistral (fine-tuned)", "Gemini", "Vertex AI", "WhatsApp integration", "Supabase Auth", "NeonDB", "Google Cloud"],
    skills: ["Voice AI (speech to text, text to speech)", "Fine-tuned LLMs", "Conversational chatbots", "WhatsApp integration", "Intent detection", "Rule-based risk scoring"],
    steps: [
      { title: "She speaks, in her own words", caption: "On WhatsApp or in the app, she sends a voice note in Hindi, Bhojpuri or any of eleven languages. No typing, no English." },
      { title: "Heard and understood", caption: "Whisper turns her voice into text. A fine-tuned Mistral model reads the dialect and works out what she needs: pregnancy, periods, nutrition, mental health, schemes or an emergency." },
      { title: "Emergencies jump the queue", caption: "Words like bleeding or fainting skip the chat entirely and raise an SOS, before any AI is involved." },
      { title: "Asha Didi answers", caption: "Asha Didi, the chatbot, replies in the same language and reads the answer aloud. She can keep asking, like a real conversation." },
      { title: "The ASHA worker's side", caption: "Workers speak their visit notes, AI fills the visit form, they check it, and a risk check flags anyone who needs follow-up." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("India's rural health system leans on ASHA workers, roughly one for every thousand people, who might visit a village once a month. The women they look after often face low literacy, stigma around periods and pregnancy, and a long trip to the nearest doctor. Most health apps assume you can read English and type. Many of these women can't, or would rather not."),
          p("We built ASHA AI around one person from our README: Radha, 19, pregnant and anaemic, in a village in Bihar. Every decision came back to her. Could she use it without reading? Would she feel safe asking about something embarrassing? Would it notice if she was in danger?"),
          p("I built it with three teammates, Prakhar Singh, Lakshya Barnwal and Pushkar Singh."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Voice everywhere.", "The symptom checker, period tracker (\"Meri date aaj aayi hai\") and nutrition planner all work by voice, along with short audio lessons of 30 to 45 seconds."],
            ["WhatsApp integration.", "Women can talk to ASHA AI on WhatsApp, the app already on their phone, by voice note or text."],
            ["Asha Didi, an interactive chatbot.", "A warm, patient persona that keeps the conversation going. Emergency keywords are checked first, then the intent is found and Asha Didi answers. Every reply is stored and played back as speech."],
            ["A speech-to-intent pipeline.", "Whisper for speech to text, and fine-tuned Mistral models to understand regional dialects and mixed languages."],
            ["A visit assistant for ASHA workers.", "Workers dictate their notes, Gemini pulls out the patient, vitals, symptoms, medicines and follow-up, and the visit form fills itself for review."],
            ["A symptom checker with triage.", "Symptoms are reported by voice in the local dialect and triaged against WHO protocols, with an instant spoken answer."],
            ["Simple, explainable risk rules.", "Critical words trigger an SOS. Blood pressure of 140/90 or more is high risk. Three or more symptoms is medium."],
            ["Tools for the ASHA worker.", "Visit records that digitise themselves, real-time high-risk alerts and village-level health analytics."],
            ["The everyday tools.", "A QR health card, vaccination and child tracking, government scheme enrolment, an SOS button and an offline queue that syncs later."],
            ["Four kinds of users.", "Beneficiaries, ASHA workers, partner organisations and admins, each with their own view."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Voice first, not voice as an extra.", "If the main user can't read comfortably, the whole product has to work by speaking and listening."],
            ["Safety before cleverness.", "The emergency check is plain code that runs before any AI. A model should never be the thing that decides whether to call for help."],
            ["Meet her where she already is.", "Most of these women already use WhatsApp every day. Putting Asha Didi there meant no new app to install and nothing new to learn."],
            ["Tune for how people really talk.", "Nobody speaks textbook Hindi. Pairing Whisper with fine-tuned Mistral models let the system follow regional dialects and mixed languages."],
            ["Privacy as a feature.", "Whisper Privacy Mode allows anonymous use, keeps sensitive questions on the device and auto-deletes history on shared phones, so a woman can ask what she wouldn't say out loud at home."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Designing for someone who can't read your interface changes everything: the flows, the words, even where the safety checks sit. ASHA AI taught me to start from a real person and let her constraints shape the architecture."),
        ],
      },
    ],
    impact: [],
    links: { demo: "https://asha-ai.pages.dev/", repo: "https://github.com/prateekhbtu/asha-ai-nerds" },
  },

  {
    slug: "pulse-ai",
    kind: "project",
    group: "Health AI",
    name: "Pulse AI",
    subtitle: "Clinical surveillance that watches for change, not disease",
    hook: "Your watch already notices when your resting heart rate creeps up or your sleep falls apart. Pulse AI turns that into an early warning for you, your doctor and the people who care for you.",
    category: "Clinical Surveillance System",
    status: "Live demo",
    statusTone: "success",
    headline: { value: "14", label: "health signals, one CareScore" },
    facts: [
      { label: "Built for", value: "Patients, their doctors and their caretakers" },
      { label: "Positioning", value: "Early warning, not diagnosis" },
      { label: "Data", value: "Fitbit, Samsung Health, Google Fit and Garmin through Health Connect, plus manual readings" },
      { label: "Team", value: "With Prakhar Singh and Prakhar Dixit" },
      { label: "Status", value: "Live demo" },
    ],
    stack: ["FastAPI", "SQLAlchemy", "Neon PostgreSQL", "NumPy + Pandas", "Google OAuth + Drive API", "Health Connect webhook", "Gemini", "Next.js 14", "Recharts"],
    skills: ["Time-series analysis", "Anomaly detection", "Health data pipelines", "OAuth integrations", "Role-based access", "Data visualisation"],
    steps: [
      { title: "Data comes in", caption: "Fitbit, Samsung Health, Google Fit or Garmin data flows through Health Connect, live from an Android bridge app or as a Drive export." },
      { title: "Unzipped and cleaned up", caption: "The export is a ZIP with a SQLite database inside. Fourteen tables, from heart rate to sleep to SpO2, become tidy time series." },
      { title: "A personal baseline", caption: "Each person's last 14 days become their normal. Change is measured against them, not against a textbook." },
      { title: "One number: the CareScore", caption: "Severity, persistence, signals moving together and manual readings like blood pressure add up to a score from 0 to 100." },
      { title: "The right people hear about it", caption: "Mild drift is just a heads-up. Above 70 it recommends seeing a doctor, and the doctor and caretaker are told." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Phones and watches collect a huge amount of health data, and almost nobody looks at it. A resting heart rate creeping up, sleep falling apart, oxygen dipping at night: these can be visible well before someone feels ill enough to book an appointment."),
          p("I built it with Prakhar Singh and Prakhar Dixit. We didn't want another app that pretends to diagnose. Pulse AI's line is \"detect change, not disease\". It learns what normal looks like for one person, raises a hand when that changes, and gets the right people involved."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Two ways in.", "A Health Connect webhook for live data from an Android bridge app, and a Drive path that reads the user's Google Fit export with read-only access. No Fit API needed."],
            ["A parser for the real export.", "It opens the ZIP, pulls out the SQLite database and normalises 14 tables: steps, heart rate, resting heart rate, HRV, sleep, blood pressure, glucose, SpO2, temperature, weight and more."],
            ["Baselines and anomalies.", "A 14-day personal baseline and z-scores sort each change into normal, mild, moderate or severe."],
            ["The CareScore engine.", "Up to 40 points for severity, 25 for persistence, 20 for several signals moving together and 10 for manual readings."],
            ["Three roles.", "Patients see their trends. Doctors see a list of high-risk patients. Caretakers get simple status cards and join with an invite code."],
            ["Clear limits, written down.", "Pulse AI never diagnoses, never suggests treatment and never handles emergencies. It gives early awareness and a calm nudge to see a professional."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Early warning, not diagnosis.", "Being clear about what the system is not made every other design choice easier."],
            ["Personal baselines beat averages.", "A resting heart rate of 80 means something different for different people."],
            ["Escalate gently.", "Three levels, from awareness to attention to consultation, so nobody learns to ignore the alarms."],
            ["Import once, safely.", "Every Drive file is remembered, so importing the same export twice never doubles the data."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Pulse AI was my crash course in messy real-world health data: odd export formats, gaps, different units. It also taught me that a score people understand beats a black box that might be slightly more accurate. It grew out of an earlier experiment of mine, a LangGraph agent that watched chronic patients and decided when to escalate to a doctor."),
        ],
      },
    ],
    impact: [],
    links: { demo: "https://pulseai-hackshodh.pages.dev/" },
  },

  {
    slug: "ai-commenting-agent",
    kind: "case-study",
    group: "AI Agents",
    name: "AI Targeted Commenting Agent",
    subtitle: "Human-in-the-loop engagement that learns from every edit",
    hook: "Generic AI tools wrote \"Great post!\" and hurt the brand. This agent writes something specific, waits for a human yes, and remembers every edit.",
    category: "AI Agents & Content",
    status: "Built",
    statusTone: "info",
    headline: { value: "~50 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~50 hrs", source: "E" },
    annualValue: { value: "~₹2.4 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "B2B founders, agencies and personal brands" },
      { label: "Status", value: "Built" },
      { label: "Result", value: "About 20 comments in two hours became 50+ a day, reviewed in fifteen minutes [E]" },
      { label: "Annual value", value: "~₹2.4 lakh [E]" },
    ],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL (Supabase)", "Gemini via a model adapter", "pytest", "Render"],
    skills: ["Agentic workflows", "State machines", "Prompt pipelines", "LLM adapters", "Concurrency control", "AI safety engineering"],
    steps: [
      { title: "Find posts worth answering", caption: "Rule-based filters pick posts from the right industries and the right people, and skip politics, religion and anything off-topic." },
      { title: "Write something real", caption: "The model reads the post and drafts comments that respond to what it actually says, in the brand's voice. Never a template." },
      { title: "Brand rules, checked twice", caption: "The rules go into the prompt, then get checked again after generation. Salesy, unsafe or off-topic drafts are blocked." },
      { title: "A human approves", caption: "Approve, edit or reject. Edits and reasons are stored, and the agent learns from them without any retraining." },
      { title: "Posted at a human pace", caption: "Only an approved comment can move to posting, with daily limits and safe retries. There's no shortcut." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Growing on LinkedIn means showing up every day with comments that add something. Done by hand it took about two hours for twenty comments [E], and it was the first thing dropped on a busy day. The AI tools I tried wrote things like \"Great insights, thanks for sharing!\", which did more harm than good."),
          p("I wanted something in between: an agent that does the boring part, finding posts and drafting, while a person keeps the final say. The interesting challenge was safety. A comment that goes out wrong is public and permanent, so an accidental post had to be impossible, not just unlikely."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A strict state machine.", "Generated, under review, edited, approved, posting, then posted or failed. Illegal jumps are blocked, and row locks stop two workers from touching the same comment."],
            ["Two adapters.", "One for the language model, so I can swap models without touching anything else. One for platforms, so adding a network doesn't change the core."],
            ["Memory from approvals.", "Only approved comments are remembered, and they're fed back as constraints so the agent doesn't repeat itself across thousands of comments."],
            ["A brand compliance layer.", "Rules enforced twice: once in the prompt and once after generation."],
            ["Safe posting.", "Idempotency keys, bounded retries, daily limits and a global kill switch."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Engagement only works if it's real.", "The agent responds to the content of each post. Templates are where spam comes from."],
            ["People teach, the system remembers.", "Instead of fine-tuning a model, I feed it the team's own approvals and edits. It gets closer to the brand voice every week."],
            ["Stay model-agnostic.", "Models change every few months. The adapter means the best one can be swapped in without a rewrite."],
            ["Safety lives in the state.", "A comment can only be posted from the approved state. Full stop."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("This was my deepest dive into making an AI system trustworthy rather than just clever. State machines, locks, idempotency and a kill switch aren't glamorous, but they're what let a person hand over the repetitive part with confidence. Fifteen minutes in the approval queue each morning now replaces two hours of writing."),
        ],
      },
    ],
    impact: [
      { metric: "Comments per day", before: { value: "~20", source: "E" }, after: { value: "50+", source: "E" } },
      { metric: "Daily effort", before: { value: "~2 hrs", source: "E" }, after: { value: "~15 min review", source: "E" } },
      { metric: "Time saved", after: { value: "~50 hrs/month", source: "E" } },
      { metric: "First-draft approval rate", before: { value: "Starting point" }, after: { value: "Rises as it learns from edits (about 60% to 85% in a month)", source: "E" } },
      { metric: "Profile visits", before: { value: "Baseline" }, after: { value: "~3×", source: "E", note: "with steady inbound DMs and leads" } },
      { metric: "Consistency", before: { value: "Skipped on busy days" }, after: { value: "Every day" } },
      { metric: "Annual value", after: { value: "~₹2.4 lakh", source: "E", note: "(about a social media executive's time)" }, highlight: true },
    ],
    links: {
      demo: "https://auto-commenting-agent.onrender.com/docs",
      repo: "https://github.com/prateekxai/auto-commenting-agent",
      original: GROWITUP + "ai-commenting-agent",
    },
  },

  {
    slug: "ai-job-hunting-agent",
    kind: "project",
    group: "AI Agents",
    name: "AI Job Hunting Agent",
    subtitle: "An n8n pipeline that finds, ranks and sends me the right jobs",
    hook: "I was checking the same job boards every morning and guessing which roles fit. So I built an agent that does it for me every six hours.",
    category: "Agentic AI + Automation",
    status: "Built and used",
    statusTone: "info",
    headline: { value: "10+ hrs", label: "saved every week" },
    facts: [
      { label: "Built for", value: "Myself, during my own job search" },
      { label: "Runs", value: "Every 6 hours on n8n" },
      { label: "Output", value: "A ranked Google Sheet and email alerts" },
      { label: "Status", value: "Built and used" },
    ],
    stack: ["n8n", "LLM ranking", "Web scraping", "Google Sheets API", "Email alerts"],
    skills: ["Workflow automation", "Web scraping", "LLM-based ranking", "Scheduling", "API integration"],
    steps: [
      { title: "Every six hours", caption: "A schedule in n8n wakes the workflow up. No more remembering to check." },
      { title: "Scrape the boards", caption: "It collects fresh listings from several job platforms in one pass." },
      { title: "Ranked against my résumé", caption: "An AI step reads each role and scores how well it fits my skills and experience, with a short reason." },
      { title: "Into a clean sheet", caption: "Structured results land in Google Sheets: title, company, link, fit score and why." },
      { title: "An email when it matters", caption: "Strong matches trigger an email, so I only open the sheet when there's something worth reading." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Job hunting had turned into a routine I disliked: open the same boards, scroll the same listings, read descriptions that clearly weren't a fit, and still miss the good ones because they went up at 2 am."),
          p("It was a perfect automation problem. The steps were repetitive, the one real decision (does this fit me?) was something an AI could make reasonably well, and the output only needed to be a list I could act on."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A scheduled n8n workflow", "that runs every six hours without me."],
            ["Scrapers for several job platforms", "feeding one normalised list of roles."],
            ["An AI ranking step", "that compares each role with my résumé and explains its score."],
            ["Google Sheets output and email alerts", "so the results are easy to scan and act on."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Automate the boring part, keep the decision.", "The agent shortlists. I still choose where to apply."],
            ["Structured beats clever.", "A sheet with a score and a reason is more useful than a chatty summary."],
            ["Run often, notify rarely.", "Checking every six hours catches fresh posts. Emailing only strong matches keeps it from turning into noise."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("It saved me more than ten hours a week, and it's the project that got me hooked on automation. A lot of the workflows I build now follow the same shape: collect, check, rank, and only bother a person with what matters."),
        ],
      },
    ],
    impact: [],
    links: {
      demo: "https://www.linkedin.com/posts/prateek-workspace_ai-jobsearch-automation-activity-7348274499743555584-3a0i",
    },
  },

  {
    slug: "mdrs",
    kind: "project",
    group: "AI Products",
    name: "MDRS",
    subtitle: "A multimodal deception risk scorer for images, video, audio and text",
    hook: "Fact-checkers don't need another tool that shouts \"fake\". MDRS gives a risk score from 0 to 100 and shows the evidence behind it.",
    category: "Multimodal Deception Risk Scorer",
    status: "iSAFE World Finalist",
    statusTone: "success",
    headline: { value: "4", label: "kinds of media, one risk score" },
    facts: [
      { label: "Built for", value: "Journalists, moderators and anyone checking media" },
      { label: "Built at", value: "iSAFE Hackathon 2026, world finals" },
      { label: "Team", value: "Engineers at HBTU Kanpur" },
      { label: "Status", value: "Live demo" },
    ],
    stack: ["Python", "FastAPI", "Pillow, NumPy, SciPy", "TextBlob", "yt-dlp", "Next.js 14", "Chrome extension (MV3)", "NewsAPI", "Gemini"],
    skills: ["Multimodal signal processing", "Explainable scoring", "API gateway design", "Chrome extensions", "Responsible AI"],
    steps: [
      { title: "Something looks off", caption: "A user right-clicks an image, video or article on any page, or pastes a link into the web app." },
      { title: "Sent to the right detector", caption: "The FastAPI gateway routes it by type: image, video, audio or text. Long media is sampled, up to 300 seconds." },
      { title: "Signals, each with a confidence", caption: "Every detector reports what it found, how sure it is and how much that should count." },
      { title: "Weighed into a score", caption: "The risk engine weighs the signals into a score from 0 to 100. Under 30 is low, above 60 is high." },
      { title: "Evidence and a next step", caption: "The side panel shows the breakdown and a recommendation, usually that a person should review it. Never \"real\" or \"fake\"." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Edited media spreads faster than anyone can check it, and most detection tools answer with a single verdict: real or fake. That's dangerous. A confident wrong answer can do more damage than no answer at all."),
          p("For the iSAFE Hackathon 2026 we set out to build the opposite: a tool that measures risk, explains itself and leaves the final call to a person. It made it to the world finals."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A modality-aware gateway.", "A stateless FastAPI service that sends each input to the right detector and fetches media safely, capped at 100 MB and 300 seconds."],
            ["Detectors for four kinds of media.", "Each produces signals with a confidence instead of a yes or no."],
            ["A risk engine.", "Weighted aggregation, threshold mapping and a plain-language explanation of what drove the score."],
            ["A Chrome extension.", "Manifest V3 with a context menu, a service worker and a side panel, so checking happens right where you're reading. Users can bring their own Gemini key."],
            ["Optional outside checks.", "NewsAPI for source credibility, and Gemini to sum up the risk in plain words."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["No binary claims.", "The system never says real or fake. It says how risky something looks and why."],
            ["Explain every number.", "Each signal shows its confidence and its contribution, so a reviewer can disagree with one specific part."],
            ["Be honest about the models.", "Today's detectors use baseline heuristics, and the README says so. Trained models can plug in behind the same interface."],
            ["Meet people where they read.", "A side panel in the browser gets used far more than a separate website."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("MDRS taught me that in trust and safety, the explanation matters as much as the score. Designing a pluggable detector interface also showed me how to build for models that don't exist yet."),
        ],
      },
    ],
    impact: [],
    links: {
      demo: "https://isafe-hackathon.pages.dev/",
      repo: "https://github.com/prateekhbtu/isafe-hackathon",
    },
  },

  {
    slug: "anpr-weighbridge-autofill",
    kind: "case-study",
    group: "Computer Vision",
    name: "ANPR Weighbridge Auto-Fill",
    subtitle: "Number plate recognition, typed into software that has no API",
    hook: "A wrong digit typed at the weighbridge travelled all the way to a state compliance portal. Now the camera reads the plate and the operator just confirms.",
    category: "Computer Vision",
    status: "Rolling out in stages",
    statusTone: "info",
    headline: { value: "~30 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~30 hrs", source: "E" },
    annualValue: { value: "~₹2 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A minerals processing plant" },
      { label: "Status", value: "v1 built, rolling out: shadow mode, then suggest, then auto-fill" },
      { label: "Result", value: "Wrong vehicle numbers from 3 to 4% down to under 0.5% [E]" },
      { label: "Annual value", value: "~₹2 lakh [E], plus compliance risk avoided" },
    ],
    stack: ["Python", "YOLO (ONNX)", "PaddleOCR", "IoU tracking", "RTSP & window capture", "pywinauto (Windows UI Automation)", "Local HTTP agent"],
    skills: ["Computer vision", "OCR", "Desktop UI automation", "Edge deployment", "Data analysis before design", "Process supervision"],
    steps: [
      { title: "A truck rolls onto the bridge", caption: "The cameras already watching the weighbridge become the input. No new hardware." },
      { title: "The plate is found", caption: "A YOLO model finds the number plate and follows the truck across frames, one pipeline per camera." },
      { title: "Read and validated", caption: "OCR reads the plate and checks it against the strict Indian format. Exact match only, no clever auto-correct." },
      { title: "Suggested, not typed", caption: "A small always-on-top window shows the plate and its photo. The operator checks with the driver and clicks Fill." },
      { title: "Filled and read back", caption: "The agent types into the vendor's app through Windows UI Automation, reads the value back to be sure, then presses Tab." },
      { title: "Logged every night", caption: "Every suggestion, edit and dismissal is logged, and a nightly read-only job reports how accurate the plates were." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("At the weighbridge, the driver calls out the truck number and the operator types it. People mishear, misread, mistype. One wrong digit gets saved at the first weighment and then follows the truck through the second weighment, the slip, every report and the state mining department's e-Rawana portal. Nobody noticed until days later, when the records didn't tie up."),
          p("The catch was the weighbridge software itself: a compiled vendor app with no source code and no API, sitting on a fragile Access database. I couldn't change it. So the real question was how to get the right number into a program I wasn't allowed to touch."),
          p("Before writing any code I went through 3,446 old weighment slips [M]. Every plate followed the strict Indian format. There were only 386 unique trucks [M]. And 151 pairs of real trucks [M] had numbers just one character apart. That last finding killed the obvious idea of auto-correcting to the nearest known truck. It would have picked the wrong truck."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A plate reader.", "Frames from the existing CCTV, YOLO plate detection, tracking, OCR and format checks. Front and back cameras run in parallel, so a clear front plate never waits behind a blurry back one."],
            ["A weighbridge agent.", "A tiny local server on the weighbridge PC with an always-on-top overlay that never steals keyboard focus. Fill, Edit or Dismiss."],
            ["Two ways to deploy.", "A separate AI PC pushing plates over the LAN, or everything on one PC with the detector held at low priority so the weighbridge software always comes first."],
            ["Logs and a nightly report.", "Every event is recorded, and a read-only job compares what was saved with what ANPR suggested."],
          ),
          {
            kind: "table",
            table: {
              caption: "Six ways to do it, and the one I picked",
              columns: ["Option", "Verdict", "Why"],
              rows: [
                ["UI Automation of the vendor app", "Chosen", "No change to their software. All its validation, audit and e-Rawana flows keep working."],
                ["Write into the vendor's database", "Rejected", "The form holds data in memory and would overwrite it on save, and the database was already fragile."],
                ["Clipboard and a hotkey", "Fallback", "Zero risk, but one manual step stays."],
                ["Ask the vendor for an ANPR input", "Long term", "Most robust, but out of our hands."],
                ["Dedicated ANPR cameras", "Later", "New hardware and new integration cost."],
                ["Blind keystroke typing", "Rejected", "If focus is in the wrong field, numbers land in the weight box."],
              ],
            },
          },
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["The operator stays in charge.", "Version one suggests and waits for a click, so a wrong but valid fleet number can't slip through silently."],
            ["Never press a dangerous key.", "The agent only ever sends letters, digits and Tab."],
            ["Only fill an empty field.", "Whatever the operator typed is never overwritten."],
            ["Show the photo.", "Operators trust what they can see. The plate crop lets them catch a misread at a glance."],
            ["Roll out slowly.", "Shadow mode first, then suggest, then auto-fill. The site can roll back with one config change."],
          ),
        ],
      },
      {
        heading: H.guardrails,
        body: [
          plain(
            "If the camera or ANPR is down, the overlay says so and the operator types as before.",
            "If the vendor updates their app and a control moves, the agent notices at startup and switches itself off.",
            "The agent never presses Save. That's always a person.",
            "Secrets live in environment variables, and the local server only listens on the machine itself.",
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("This project taught me to look at the data before building the clever thing. The fuzzy matching I'd have reached for on day one would have done real harm here. It also taught me how to automate someone else's software politely: through the front door, the way a person would, with a read-back after every step."),
        ],
      },
    ],
    impact: [
      { metric: "Wrong vehicle numbers on tickets", before: { value: "~3 to 4%", source: "E" }, after: { value: "<0.5%", source: "E" } },
      { metric: "Time spent tracing mismatches", before: { value: "~30 hrs/month", source: "E" }, after: { value: "Near zero" } },
      { metric: "How the number is captured", before: { value: "Typed from what the driver says" }, after: { value: "Read from the plate, confirmed in seconds", source: "E" } },
      { metric: "Compliance exposure on the mining portal", before: { value: "Typos sent to the state portal" }, after: { value: "Verified numbers" } },
      { metric: "Changes to vendor software", before: { value: "n/a" }, after: { value: "Zero" } },
      { metric: "New hardware", before: { value: "n/a" }, after: { value: "None (existing CCTV)" } },
      { metric: "Annual value", after: { value: "~₹2 lakh", source: "E", note: "+ compliance risk avoided" }, highlight: true },
    ],
    links: { original: GROWITUP + "anpr-weighbridge-autofill" },
  },

  {
    slug: "digistamp",
    kind: "case-study",
    group: "Health AI",
    name: "Digistamp",
    subtitle: "AI document sealing for hospital insurance claims",
    hook: "Hospital staff were printing, stamping, signing and scanning hundreds of claim pages a day. Now they upload a PDF and get it back sealed in seconds.",
    category: "Documents & OCR",
    status: "v1 in production, v2 multi-hospital",
    statusTone: "success",
    headline: { value: "~500 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~500 hrs", source: "E" },
    annualValue: { value: "~₹8 lakh", source: "C" },
    facts: [
      { label: "Built for", value: "A multi-specialty hospital first, then many hospitals" },
      { label: "Status", value: "v1 in production, v2 platform built" },
      { label: "Result", value: "About ₹8 lakh a year saved for one hospital [C]" },
      { label: "Annual value", value: "~₹8 lakh [C]" },
    ],
    stack: ["Node.js + Hono", "PostgreSQL", "pdf.js + pdf-lib", "Google Gemini", "Private S3-compatible storage", "React + Vite", "OpenAPI"],
    skills: ["Document AI", "PDF processing", "Multi-tenant API design", "Rules engines", "Role-based API keys", "Testing AI systems"],
    steps: [
      { title: "A claim file comes in", caption: "Staff send the PDF with the hospital ID and the treating doctor's registration number, by hand or straight from their claim software." },
      { title: "Every page gets read", caption: "A claim file mixes bills, prescriptions and reports. Each page is read for text and layout, and identified for what it is." },
      { title: "The doctor is matched", caption: "The RMC registration number finds the doctor, and every way their name gets printed is recognised, from \"Dr. X\" to \"DR X\" to \"Dr. X, MS (Ophth)\"." },
      { title: "Rules draw the boundaries", caption: "Universal rules, plus the hospital's own rules written in plain English, decide which stamp goes on which page and exactly where." },
      { title: "Seal, seal, sign", caption: "Transparent stamps land on exact coordinates. The page underneath is never re-rendered, so the text stays sharp and searchable." },
      { title: "The sealed PDF comes back", caption: "A few seconds later the sealed file is back, ready for the scheme portal, and the request is logged for audit." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Government health-scheme claims need the right seal and signature on every relevant page. The hospital's round seal on bills. The treating doctor's seal on prescriptions. Signatures wherever the form asks. Some reports need one particular doctor's seal in one particular corner."),
          p("At this hospital that meant printing the claim file, hunting for the right pages, stamping, signing, scanning and uploading it all again. Hundreds of pages a day, roughly three people's full time [E], plus paper, ink and a tired scanner. Miss a single seal and the claim came back with a query, and payment slipped by weeks."),
          p("The rules were simple enough to explain to a new staff member in five minutes. That's what made me think a machine could follow them too."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["One Seal API.", "Send the hospital ID, the doctor's registration number and the PDF. Get the sealed PDF back."],
            ["Page understanding.", "An AI model looks at each page and decides which stamps belong on it and where, following a universal rulebook plus the hospital's own plain-English rules."],
            ["Doctor recognition.", "Each doctor has their registration number, their name as printed, other spellings and a department, so they're recognised across very different documents."],
            ["Precise placement.", "Stamps are transparent PNGs placed onto the PDF without re-rendering it."],
            ["A multi-hospital platform.", "Version two keeps every hospital's stamps, doctors, rules and logs apart, with API keys that can be limited to a single hospital and a web app to manage it all."],
            ["Production basics.", "Swagger docs, health checks, automatic migrations, private storage with a checksum-verified migration tool, and tests that use a scripted AI model so results are repeatable."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Rules belong in plain English.", "A hospital admin shouldn't need a developer to change which document gets which seal. They write the rule the way they'd explain it to a new colleague."],
            ["Understand the page, not just the file.", "One claim file holds bills, prescriptions and reports, and each needs something different."],
            ["Keep hospitals apart from day one.", "Stamps, doctors, rules and logs never mix between hospitals."],
            ["Private by default, authorised always.", "Stamp images sit in a private bucket. Digistamp only applies a hospital's own seals, at its request, and every request is logged."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Digistamp showed me how much value hides inside a boring, repetitive task once you understand its rules properly. It also taught me to design an API for the second customer, not just the first. Adding a new hospital is now a checklist, not a code change."),
        ],
      },
    ],
    impact: [
      { metric: "Annual cost of manual stamping (staff, paper, ink, scanning)", before: { value: "Baseline" }, after: { value: "~₹8 lakh saved per year", source: "C" } },
      { metric: "Staff effort", before: { value: "~3 people, ~500 hrs/month", source: "E" }, after: { value: "Minutes of checking per batch", source: "E" } },
      { metric: "Missed or misplaced seals", before: { value: "Regular cause of claim queries", source: "E" }, after: { value: "Near zero", source: "E" } },
      { metric: "Turnaround per claim file", before: { value: "Hours, or the next day", source: "E" }, after: { value: "Minutes", source: "E" } },
      { metric: "Onboarding a new hospital", before: { value: "n/a" }, after: { value: "A setup checklist, no code changes" } },
    ],
    links: { original: GROWITUP + "digistamp" },
  },

  {
    slug: "health-claim-form-automation",
    kind: "case-study",
    group: "Automation",
    name: "Health-Scheme Claim Automation",
    subtitle: "A browser bot for the ECHS claim portal",
    hook: "Every claim meant 15 minutes of retyping into a five-tab government portal. Now a bot fills it in and a person checks it before it goes.",
    category: "Portals & Browser",
    status: "In use",
    statusTone: "success",
    headline: { value: "~135 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~135 hrs", source: "E" },
    annualValue: { value: "~₹2.4 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A hospital processing ex-servicemen (ECHS) claims" },
      { label: "Status", value: "In use" },
      { label: "Result", value: "About 15 minutes per form down to about 2" },
      { label: "Annual value", value: "~₹2.4 lakh [E]" },
    ],
    stack: ["Playwright", "Google Sheets", "OCR on signed bill PDFs", "Batched in-page scripting"],
    skills: ["Browser automation", "Performance tuning", "OCR", "Data validation", "Safe test environments"],
    steps: [
      { title: "Today's patients, from the sheet", caption: "The bot reads the hospital's master Google Sheet and picks the current month's tab on its own." },
      { title: "The bill gets read", caption: "The signed bill PDF is read line by line, and duplicate expense codes are dropped." },
      { title: "Tab by tab", caption: "Patient, admission, bill, ailment, uploads. Every expense line goes through the portal's pop-up, the same way a person would do it." },
      { title: "The money is checked", caption: "Before moving on, the total in the portal has to match the total on the bill." },
      { title: "A person submits", caption: "The filled form waits for a quick human look. Submit is always a person's click." },
      { title: "Proof goes back in the sheet", caption: "The claim reference and a screenshot are written into the sheet. Then on to the next patient." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Every ECHS claim had to be keyed into a multi-tab government portal by hand: patient details, admission details, an itemised bill entered one line at a time through a pop-up, ailment details and uploads. About 25 forms a day at roughly 15 minutes each [E]."),
          p("All of that data already existed in the hospital's sheet and bills. Typing it again was the only bottleneck, and it was where the mistakes crept in. About one claim in ten [E] came back because of a typo, and every return delayed payment."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A sheet-driven bot.", "It reads each patient from the master Google Sheet and the signed bill PDF, then fills every tab of the portal in order."],
            ["A daily batch runner.", "It works through the day's patients one at a time and pauses before every submission."],
            ["Write-back.", "The reference number and a screenshot of each submitted claim go back into the sheet."],
            ["Three builds.", "A full version for the live portal, a fast version for testing, and a single-file version that runs inside a desktop app with no setup."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Be a perfect typist, then a careful one.", "The bot types exactly what's in the records, and its checks make it safer than a person in a hurry."],
            ["Fewer round trips, more speed.", "Instead of clicking field by field, it fills each tab in one batched step using known field selectors. That cut browser round trips by about five times [E]."],
            ["Check the money.", "Duplicate expense codes are removed and the total is matched against the bill before moving on."],
            ["Practise on a copy.", "I tuned everything against a test copy of the form first. The test build is locked so it can never press submit."],
          ),
        ],
      },
      {
        heading: H.guardrails,
        body: [
          plain(
            "A person checks every form before it's submitted.",
            "Totals are verified and duplicate lines removed.",
            "Failed submissions are retried or flagged.",
            "Test builds can't submit.",
            "The team keeps their sheet exactly as before.",
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Speed in browser automation comes from understanding the page, not from clicking faster. And the most important button, Submit, should stay with a person. The team now updates their sheet as usual, starts the run, and reviews instead of retyping."),
        ],
      },
    ],
    impact: [
      { metric: "Time per form", before: { value: "~15 min", source: "E" }, after: { value: "~2 min including a check", source: "E" } },
      { metric: "Time saved", after: { value: "~135 hrs/month", source: "E" } },
      { metric: "Rejections due to data-entry errors", before: { value: "~10%", source: "E" }, after: { value: "~1%", source: "E" } },
      { metric: "Audit trail", before: { value: "Notes, memory" }, after: { value: "Reference number + screenshot per claim" } },
      { metric: "Annual value", after: { value: "~₹2.4 lakh", source: "E" }, highlight: true },
    ],
    links: { original: GROWITUP + "health-claim-form-automation" },
  },

  {
    slug: "receipt-note-portal",
    kind: "case-study",
    group: "Full-Stack",
    name: "Receipt Note Portal",
    subtitle: "Inward material tracking where every entry carries its own proof",
    hook: "When a supplier disputed a short delivery, there was no photo, no time and no proof. Now every truckload is logged with all three.",
    category: "Custom Apps",
    status: "Phase 1 built",
    statusTone: "info",
    headline: { value: "~130 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~130 hrs", source: "E" },
    annualValue: { value: "~₹5 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A manufacturing plant receiving material from many suppliers" },
      { label: "Status", value: "Phase 1 built. Next: outward billing, then a full ERP" },
      { label: "Result", value: "Receipts in about 3 minutes instead of 15 [E], with photo, GPS and server time on every load" },
      { label: "Annual value", value: "~₹5 lakh [E]" },
    ],
    stack: ["React PWA", "Hono on Cloudflare Workers", "Cloudflare Pages + R2", "Neon PostgreSQL", "Gemini OCR (Flash, Pro fallback)"],
    skills: ["Full-stack PWAs", "Serverless APIs", "Device-bound auth", "Geofencing", "Document OCR", "Audit trails"],
    steps: [
      { title: "A truck at the gate", caption: "Store staff open the portal on an approved phone, and their location is checked against the site boundary." },
      { title: "Scan the bill", caption: "Photograph the bill and AI fills in the supplier, bill number, transporter and line items. Every value waits for a human yes." },
      { title: "Photos that prove themselves", caption: "Camera only, no gallery. The server stamps each photo with its own time and place, and fingerprints it with SHA-256." },
      { title: "Bill vs weighbridge", caption: "The weighbridge slip is read too, so the receipt shows the billed quantity, the weighed quantity and the difference." },
      { title: "Submit, number, sign", caption: "The database refuses a second receipt for the same truckload. A GRN number is issued and the approval ladder signs off." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Material arrived and nobody could say for sure how much came in, from whom, or where it went. Receipts lived in paper registers. Trucks often turned up before the bill. Nobody compared the weighbridge quantity with the billed quantity. And entries were sometimes written later, from memory, by someone who wasn't at the gate."),
          p("So when a supplier disputed a short-supply claim, the plant had nothing to show. I wanted every receipt to carry its own evidence: who made it, on which device, where they were standing and when, according to a clock nobody could change."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Device-bound login.", "Each user can only sign in from devices the admin has approved. A new phone creates an approval request."],
            ["A geofence.", "The site boundary is loaded from coordinates. Anything done outside it is flagged rather than blocked, and the admin gets an alert."],
            ["Signed photos.", "When the shutter is pressed, the server issues a one-time stamp valid for five minutes, carrying server time, location, user and device. The photo is watermarked from it and fingerprinted."],
            ["AI bill scanning.", "Gemini reads the bill, with a stronger model as a fallback for hard ones. What the AI suggested and what the person confirmed are both kept."],
            ["Drafts for real life.", "A truck with no bill yet can be saved as a draft with nothing mandatory. GRN numbers are only issued on final submit, so abandoned drafts leave no gaps."],
            ["Approvals and a full audit log.", "Up to eight sign-off levels, nine permission groups, and a record of who changed what, when and from where."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Proof beats trust.", "A photo with a server-signed time and place settles a dispute in minutes."],
            ["The server is the clock.", "Phone clocks can be changed. Every timestamp comes from the server."],
            ["Fit real life, not the ideal form.", "Trucks arrive without bills, so drafts ask for nothing. Discipline kicks in at final submit, where it matters."],
            ["Let the database say no.", "Uniqueness is enforced in the database, not just on screen, so two people pressing submit at the same moment still can't create a duplicate."],
            ["Nothing for the client to babysit.", "It's serverless. No servers or Docker for the plant to maintain."],
          ),
        ],
      },
      {
        heading: H.guardrails,
        body: [
          plain(
            "Signed, single-use capture stamps.",
            "SHA-256 fingerprints on every photo.",
            "Append-only logs.",
            "Remarks required for edits, reactivations and cancellations.",
            "Permission checks on every request.",
            "Cancelled GRN numbers are never reused.",
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Building for a factory gate is different from building for a desk. Phones lose signal, bills go missing and people are in a hurry. I learned to design around those facts instead of against them, and to put the security where it can't be argued with: on the server."),
        ],
      },
    ],
    impact: [
      { metric: "Inward loads recorded with proof", before: { value: "Partial, paper" }, after: { value: "100% with photo, GPS, server time" } },
      { metric: "Time to create a receipt", before: { value: "~15 min", source: "E" }, after: { value: "~3 min with AI scan", source: "E" } },
      { metric: "Short-supply visibility", before: { value: "Rarely checked" }, after: { value: "Bill vs weighbridge difference on every GRN" } },
      { metric: "Supplier dispute resolution", before: { value: "Days, often unresolved" }, after: { value: "Minutes, with evidence" } },
      { metric: "Duplicate receipts for the same truck", before: { value: "Possible" }, after: { value: "Blocked by the database" } },
      { metric: "Annual value", after: { value: "~₹5 lakh", source: "E", note: "(~130 hrs/month of effort + short supply caught)" }, highlight: true },
    ],
    links: { original: GROWITUP + "receipt-note-portal" },
  },

  {
    slug: "cctv-security-intelligence",
    kind: "case-study",
    group: "Computer Vision",
    name: "CCTV Security Intelligence",
    subtitle: "Turning 24 recording cameras into ones that report",
    hook: "Incidents were found the next morning, after hours of scrubbing footage. Now the right person gets a clip on their phone in about ten seconds.",
    category: "Computer Vision",
    status: "In production",
    statusTone: "success",
    headline: { value: "~10 sec", label: "from event to phone", source: "E" },
    timeSaved: { value: "~60 hrs", source: "E" },
    annualValue: { value: "~₹2.5 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A site with 24 cameras" },
      { label: "Status", value: "In production" },
      { label: "Result", value: "Alerts in about 10 seconds; finding footage went from about 2 hours to under 5 minutes" },
      { label: "Annual value", value: "~₹2.5 lakh [E]" },
    ],
    stack: ["RTSP streams", "Object detection (people, vehicles, motion)", "Zone & schedule rules", "Clip extraction", "WhatsApp & Telegram alerts", "Camera health checks"],
    skills: ["Real-time video", "Computer vision", "Rules engines", "Alerting", "Monitoring"],
    steps: [
      { title: "24 cameras, nobody watching", caption: "The site already had cameras and a recorder. They recorded everything and told nobody anything." },
      { title: "Zones and hours", caption: "Each camera gets zones like the gate or the store room, and time windows like after hours and weekends." },
      { title: "Someone steps into a zone", caption: "People, vehicles and motion are detected live. Only events inside a zone, inside a time window, count." },
      { title: "A clip on your phone", caption: "The event becomes a short timestamped clip, sent to the right person on WhatsApp or Telegram within seconds." },
      { title: "A dark camera is an incident too", caption: "A health check runs alongside. Offline, frozen, black or covered cameras raise their own alert." },
      { title: "The morning summary", caption: "Each morning a summary shows activity per camera, per zone and per hour. Footage is opened only when it's worth it." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("The site had 24 cameras [E]. Someone either sat watching the screens or, after an incident, spent hours scrubbing footage to find a two-minute clip, about two hours a day [E]. Incidents were found the next morning. Cameras went offline or got covered, and nobody noticed for days."),
          p("Nobody needs 24 hours of footage. They need the few minutes that matter, the moment they happen. That was the whole idea."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Detection by zone and time.", "People, vehicles and motion inside defined zones (the gate, the store room, the boundary wall) and time windows (after hours, weekends)."],
            ["Alerts with evidence.", "Every event is saved as a short timestamped clip and sent to the right person on WhatsApp or Telegram."],
            ["A daily summary.", "Activity per camera, per zone, per hour."],
            ["Camera health checks.", "An alert when a camera goes offline, freezes, goes black or gets blocked."],
            ["A searchable event log.", "Finding \"vehicles at gate 2 last Tuesday night\" takes seconds instead of hours."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["No new hardware.", "It runs on the cameras and recorder that were already there."],
            ["Alerts have to be trusted.", "Zones and schedules keep false alarms low. The moment people start ignoring alerts, the system is useless."],
            ["A camera that's off is an incident.", "Health monitoring closes the \"it wasn't recording\" gap."],
            ["Search beats scrubbing.", "Every event is indexed the moment it happens."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Most of the work in a vision system isn't the detection model. It's deciding what deserves a human's attention, and getting the alert there fast enough to matter. The site no longer needs a dedicated night monitoring shift."),
        ],
      },
    ],
    impact: [
      { metric: "Time to know about an event", before: { value: "Next day", source: "E" }, after: { value: "~10 seconds", source: "E" } },
      { metric: "Footage search per incident", before: { value: "~2 hrs", source: "E" }, after: { value: "<5 min", source: "E" } },
      { metric: "Dedicated night monitoring shift", before: { value: "Needed" }, after: { value: "Not needed (~₹2.2 lakh/yr)", source: "E" } },
      { metric: "Unnoticed camera outages", before: { value: "Common" }, after: { value: "Zero" } },
      { metric: "Time saved", after: { value: "~60 hrs/month", source: "E" } },
      { metric: "Annual value", after: { value: "~₹2.5 lakh", source: "E" }, highlight: true },
    ],
    links: { original: GROWITUP + "cctv-security-intelligence" },
  },

  {
    slug: "retail-video-intelligence",
    kind: "case-study",
    group: "Computer Vision",
    name: "Retail Video Intelligence",
    subtitle: "Footfall and checkout analytics from one ordinary camera",
    hook: "Store owners want simple answers: how many came in, where they stopped, how many bought. This gets them from a single camera, without touching the till.",
    category: "Computer Vision",
    status: "Working prototype",
    statusTone: "neutral",
    headline: { value: "2", label: "AI pipelines on one camera" },
    facts: [
      { label: "Built for", value: "Retail stores, pharmacies and showrooms" },
      { label: "Status", value: "Working prototype. Impact is projected, not measured" },
      { label: "Runs on", value: "An RTSP camera or a laptop webcam, fully local except an optional AI fallback" },
    ],
    stack: ["YOLOv8", "ByteTrack", "Motion & hand detection", "Local visual-similarity catalog", "Gemini vision (fallback)", "FastAPI", "WebSocket dashboard"],
    skills: ["Multi-object tracking", "Zone analytics", "Real-time streaming", "Cost-aware AI", "Dashboards"],
    steps: [
      { title: "One camera, two jobs", caption: "A single connection to the camera feeds two pipelines, so nothing ever opens the stream twice." },
      { title: "Every visitor gets an ID", caption: "YOLOv8 finds people and ByteTrack keeps one ID per person as they move around the store." },
      { title: "Zones tell the story", caption: "Entrance, aisle 3, billing queue. Entries, exits, dwell time and live occupancy all come from simple zones on the frame." },
      { title: "Something at the counter", caption: "At checkout it waits for a hand holding a product up, then for a sharp frame without the hand in the way." },
      { title: "Catalog first, AI on a miss", caption: "A local visual catalog recognises known products for free. Only new ones go to Gemini, and then they're learned." },
      { title: "Live on the dashboard", caption: "Annotated video and events stream to the browser, with numbers like conversion by hour." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Store owners ask simple questions. How many people came in today? When are we busiest? Which aisle do people stop at? How many visitors actually buy something? The answers usually come from guesswork, manual counting or expensive sensors."),
          p("At the counter they'd like to know what's being handed over, but plenty of small stores have no reliable POS or barcode habit. I wanted to see how far one ordinary camera could go without changing anything about how the store works."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A footfall pipeline.", "YOLOv8 people detection and ByteTrack IDs, with zones that fire enter and exit events, dwell times and live occupancy."],
            ["A checkout pipeline.", "Watches the counter for motion, spots a hand holding a product, waits for a clean frame and identifies the product."],
            ["A learning catalog.", "Known products are matched locally for free. Unknown ones go to Gemini vision once and are then added to the catalog."],
            ["One server, one stream.", "Both pipelines run as background threads inside one FastAPI server, sharing a single camera connection."],
            ["A live dashboard.", "Annotated video and events over WebSocket, with REST endpoints for stats and history."],
          ),
          {
            kind: "table",
            table: {
              caption: "What it could enable",
              columns: ["Use case", "What it unlocks"],
              rows: [
                ["Footfall vs bills", "Conversion rate by hour and day"],
                ["Staffing", "Staff matched to the real busy hours"],
                ["Layout", "Aisle dwell times guide product placement"],
                ["Queues", "Live occupancy alerts at billing"],
                ["Shrinkage (future)", "Counter activity vs POS bills flags possibly unbilled sales"],
              ],
            },
          },
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Video only, zero store changes.", "Starting from the camera means no POS integration and no new habits for the staff."],
            ["Cheap by design.", "Repeat products are matched locally for free. The paid AI call only happens for something genuinely new, and it's learned so the next sighting costs nothing."],
            ["Wait for a good frame.", "Guessing from a blurry frame is how you get confident wrong answers."],
            ["Be honest about accuracy.", "Checkout identification is an insight tool, not a billing system."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Tracking people across frames, defining zones and streaming results live taught me a lot about real-time systems. The bigger lesson was about cost: the cheapest AI call is the one you never make."),
        ],
      },
    ],
    impact: [],
    links: { original: GROWITUP + "retail-video-intelligence" },
  },

  {
    slug: "material-reconciliation",
    kind: "case-study",
    group: "Automation",
    name: "Material Reconciliation",
    subtitle: "Leakage detection across sheets, slips, invoices and Tally",
    hook: "Two days a week went into cross-checking rows by hand, and mistakes still slipped through. Now it takes twenty minutes and only the problems show up.",
    category: "Data & Audit",
    status: "In use",
    statusTone: "success",
    headline: { value: "~60 hrs", label: "saved every month", source: "E" },
    timeSaved: { value: "~60 hrs", source: "E" },
    annualValue: { value: "~₹4.8 lakh", source: "E" },
    facts: [
      { label: "Built for", value: "A plant buying raw material from many suppliers" },
      { label: "Status", value: "In use" },
      { label: "Result", value: "Weekly reconciliation from about 2 days to about 20 minutes" },
      { label: "Annual value", value: "~₹4.8 lakh [E], time plus leakage caught" },
    ],
    stack: ["Python comparison engine", "Google Sheets", "Tally read-back", "Exception reports"],
    skills: ["Data reconciliation", "Matching logic", "Tally integration", "Reporting"],
    steps: [
      { title: "Four records of one delivery", caption: "The tracker sheet, the weighbridge record, the supplier invoice and the Tally voucher all describe the same truckload." },
      { title: "Lined up by reference", caption: "Rows are matched on the weighment receipt, vehicle or invoice number, the one thing every source agrees on." },
      { title: "Compared field by field", caption: "Quantity, rate, party, date and whether a voucher was posted. Code doesn't get tired on row 400." },
      { title: "Only the exceptions", caption: "Rows that agree disappear. What's left is a short report: short supply, a wrong rate, a delivery billed twice." },
      { title: "Fixed before payment", caption: "It runs before every payment cycle. When the report is empty, payments go out." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Every week someone sat with the material tracker and checked it against weighbridge slips, invoices and Tally, line by line. It took about two days [E]. It was exhausting, and mismatches still slipped through."),
          p("Every missed mismatch was real money: short supply paid in full, a wrong rate, the same delivery billed twice. I'd already built a tool that reads vouchers back out of Tally for the truck project, so the question was simple. What if every record that says \"done\" got checked against the system that actually holds the truth?"),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A reconciliation agent.", "It pulls the tracker and every related source record and lines them up on a shared reference."],
            ["Field-by-field comparison.", "Quantity, rate, party, date and posted voucher, for every row."],
            ["An exception report.", "Only the rows that disagree, each with a plain reason next to it."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["People get tired on row 400. Code doesn't.", "That's exactly the kind of work to hand over."],
            ["Show the 5%, not the 100%.", "Reviewers only see what needs their judgement."],
            ["Run it before money moves.", "Scheduling it before each payment cycle means problems get fixed, not chased afterwards."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Small, focused tools compound. This one reused the read-back idea from the truck project and turned a two-day chore into a twenty-minute checklist."),
        ],
      },
    ],
    impact: [
      { metric: "Weekly reconciliation", before: { value: "~2 days", source: "E" }, after: { value: "~20 min", source: "E" } },
      { metric: "Time saved", after: { value: "~60 hrs/month", source: "E", note: "(~₹1.8 lakh/yr)" } },
      { metric: "Leakage caught (short supply, rate mismatch, double billing)", before: { value: "Mostly missed" }, after: { value: "~₹3 lakh/yr prevented", source: "E" } },
      { metric: "Annual value", after: { value: "~₹4.8 lakh", source: "E" }, highlight: true },
    ],
    links: { original: GROWITUP + "material-reconciliation" },
  },

  {
    slug: "discom",
    kind: "project",
    group: "Full-Stack",
    name: "Discom",
    subtitle: "A real-time mentor connect platform",
    hook: "Finding a mentor usually means cold messages that never get a reply. Discom put discovery, live chat, video calls and an AI helper in one place.",
    category: "Mentor Connect Platform",
    status: "Built, demo offline",
    statusTone: "neutral",
    headline: { value: "100+", label: "people online at once" },
    facts: [
      { label: "Built for", value: "People looking for mentors, and mentors with time to give" },
      { label: "Scale", value: "100+ concurrent users" },
      { label: "Status", value: "Built. The old demo is offline" },
    ],
    stack: ["React", "WebSockets", "Real-time messaging", "Video calling", "Role-based access", "AI assistant"],
    skills: ["Real-time systems", "WebSockets", "Video calling", "Role-based access", "Full-stack development"],
    steps: [
      { title: "Find a mentor", caption: "Browse mentors by what they know and what they're open to helping with." },
      { title: "Say hello in real time", caption: "Chat runs over WebSockets, so messages arrive instantly without refreshing." },
      { title: "Jump on a call", caption: "When text isn't enough, start a video call from the same conversation." },
      { title: "Ask the AI helper", caption: "Quick questions get an instant answer from the assistant, so a mentor's time goes to the real conversations." },
      { title: "Roles keep it tidy", caption: "Every role sees and does only what it should." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Good mentorship usually happens by luck: you happen to know someone senior who happens to have time. Everyone else sends cold messages that never get answered. I wanted a place where asking for help felt normal and getting it was quick."),
          p("It was also the first time I built something real-time end to end, and I wanted to learn what it takes to keep a hundred people talking at once without things falling over."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Live chat over WebSockets.", "Messages, presence and typing, with no refreshing."],
            ["Video calls", "started straight from a conversation."],
            ["An AI assistant", "for the quick, factual questions."],
            ["Role-based access", "so each kind of user sees only what they should."],
            ["A backend built for concurrency", "that held up with more than 100 people online at once."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Real-time or nothing.", "A mentor chat that needs refreshing feels dead. WebSockets made it feel like a conversation."],
            ["Save human time for humans.", "The assistant handles the quick questions so mentors don't have to."],
            ["Roles from day one.", "Bolting permissions on later is painful, so access rules were part of the first design."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Discom is where I learned real-time systems: connection handling, presence, and keeping state in sync across clients. Most of what I've built since with a live dashboard or an instant alert started with what I picked up here."),
        ],
      },
    ],
    impact: [],
    links: {},
  },
];

// Display order on /work: résumé projects first, then everything else.
const ORDER = [
  "tally-bookkeeping-automation",
  "truck-inward-to-tally",
  "asha-ai",
  "pulse-ai",
  "ai-commenting-agent",
  "ai-job-hunting-agent",
  "mdrs",
  "unicharge",
  "sahayak",
  "ats-ai",
  "anpr-weighbridge-autofill",
  "digistamp",
  "health-claim-form-automation",
  "receipt-note-portal",
  "cctv-security-intelligence",
  "retail-video-intelligence",
  "material-reconciliation",
  "cad-visualizer",
  "carbonseed",
  "chronic-ai",
  "discom",
];

const ALL_WORK = [...CORE_WORK, ...GITHUB_WORK];
export const WORK: WorkItem[] = ORDER.map((slug) => ALL_WORK.find((w) => w.slug === slug)!);

export function findWork(slug: string | undefined) {
  return WORK.find((w) => w.slug === slug);
}

/** Headline figures across the automation case studies. */
export const WORK_STATS: { value: string; label: string }[] = [
  { value: "~1,215 hrs", label: "freed up every month" },
  { value: "~₹37 lakh", label: "in value every year" },
  { value: "10", label: "automations designed and built" },
  { value: "~7", label: "full-time people's workload" },
];

export const WORK_STATS_NOTE =
  "Across the automation case studies and their clients. Most figures are estimates from typical volumes; each case study marks what's measured, client-reported or estimated.";

export interface GlanceRow {
  slug: string;
  project: string;
  category: string;
  replaced: string;
  status: string;
  timeSaved: Figure;
  annualValue: Figure;
}

export const AT_A_GLANCE: GlanceRow[] = [
  { slug: "truck-inward-to-tally", project: "Truck Inward to Tally", category: "Tally / ERP", replaced: "Looking up rates and typing receipt-note vouchers for every truck", status: "In production", timeSaved: { value: "~130 hrs", source: "E" }, annualValue: { value: "~₹6 lakh", source: "E" } },
  { slug: "tally-bookkeeping-automation", project: "Tally Bookkeeping Automation", category: "Tally / Accounting", replaced: "Typing bills and bank entries, month-end reconciliation", status: "In production", timeSaved: { value: "~120 hrs", source: "E" }, annualValue: { value: "~₹3.6 lakh", source: "E" } },
  { slug: "anpr-weighbridge-autofill", project: "ANPR Weighbridge Auto-Fill", category: "Computer vision / Desktop automation", replaced: "Typing truck numbers by hand, and tracing the typos later", status: "v1 built, staged rollout", timeSaved: { value: "~30 hrs", source: "E" }, annualValue: { value: "~₹2 lakh", source: "E" } },
  { slug: "receipt-note-portal", project: "Receipt Note Portal", category: "Custom web app / OCR", replaced: "Paper goods-receipt registers with no proof", status: "Phase 1 built", timeSaved: { value: "~130 hrs", source: "E" }, annualValue: { value: "~₹5 lakh", source: "E" } },
  { slug: "digistamp", project: "Digistamp", category: "AI document processing", replaced: "Printing, stamping, signing and scanning claim documents", status: "v1 in production, v2 multi-hospital", timeSaved: { value: "~500 hrs", source: "E" }, annualValue: { value: "~₹8 lakh", source: "C" } },
  { slug: "health-claim-form-automation", project: "Health-Scheme Claim Automation", category: "Browser automation", replaced: "Filling multi-tab claim portal forms by hand", status: "In use", timeSaved: { value: "~135 hrs", source: "E" }, annualValue: { value: "~₹2.4 lakh", source: "E" } },
  { slug: "ai-commenting-agent", project: "AI Targeted Commenting Agent", category: "AI agent / Marketing", replaced: "Finding posts and writing comments every day", status: "Built", timeSaved: { value: "~50 hrs", source: "E" }, annualValue: { value: "~₹2.4 lakh", source: "E" } },
  { slug: "cctv-security-intelligence", project: "CCTV Security Intelligence", category: "Computer vision", replaced: "Watching screens and scrubbing footage", status: "In production", timeSaved: { value: "~60 hrs", source: "E" }, annualValue: { value: "~₹2.5 lakh", source: "E" } },
  { slug: "retail-video-intelligence", project: "Retail Video Intelligence", category: "Computer vision / Analytics", replaced: "Manual footfall counting and checkout observation", status: "Working prototype", timeSaved: { value: "Projected" }, annualValue: { value: "Projected" } },
  { slug: "material-reconciliation", project: "Material Reconciliation", category: "Data / Audit", replaced: "Line-by-line weekly cross-checking", status: "In use", timeSaved: { value: "~60 hrs", source: "E" }, annualValue: { value: "~₹4.8 lakh", source: "E" } },
];

export const AT_A_GLANCE_TOTAL = {
  label: "Combined (excluding the retail prototype)",
  timeSaved: "~1,215 hrs/month",
  annualValue: "~₹37 lakh/year",
  caption: "About 1,215 hours a month is roughly the workload of 7 full-time people.",
};
