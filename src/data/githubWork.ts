/**
 * Projects from GitHub (and their write-ups) beyond the résumé and the
 * automation case studies, plus a short archive of smaller builds.
 */

import { H, list, p, storyboard, type WorkItem } from "./workKit";

export const GITHUB_WORK: WorkItem[] = [
  {
    slug: "unicharge",
    kind: "project",
    group: "IoT & Hardware",
    name: "UniCharge",
    subtitle: "A smart-metering super app for homes and power distribution companies",
    hook: "Most families only find out what their electricity cost when the bill arrives. UniCharge shows which appliance is drawing power right now, and gives the power company a live view of its grid.",
    category: "Energy · Smart Metering",
    status: "Live demo",
    statusTone: "success",
    headline: { value: "7", label: "AI agents on one meter" },
    facts: [
      { label: "Built for", value: "Electricity consumers and DISCOMs (power distribution companies)" },
      { label: "Context", value: "India's RDSS smart-meter rollout" },
      { label: "Two apps", value: "A consumer app and an operator control room, on one backend" },
      { label: "Status", value: "Live demo" },
    ],
    stack: ["React + Vite", "TypeScript", "Hono on Cloudflare Workers", "Supabase", "NILM ML API", "Gemini 2.5 Flash (Vertex AI)", "Cloudinary", "OpenAPI"],
    skills: ["Energy data systems", "NILM integration", "Agentic AI services", "Edge APIs", "Role-based products", "Real-time dashboards"],
    steps: [
      { title: "The meter speaks", caption: "Voltage, current and power arrive from the smart meter every second, as one total for the whole house." },
      { title: "NILM splits it up", caption: "Non-intrusive load monitoring turns 480 samples of total power into individual appliances: AC, geyser, fridge." },
      { title: "Seven agents read it", caption: "An anomaly detective, bill forecaster, smart scheduler, carbon narrator and three more turn usage into plain advice." },
      { title: "Ask it anything", caption: "A Gemini assistant answers questions like \"why was my bill so high?\" from the household's own data." },
      { title: "The operator's view", caption: "The DISCOM sees region-wise load, outages, demand forecasts and energy trading from one control room." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("An electricity bill is one number that arrives a month late. You can't tell whether the AC, the geyser or a tired old fridge is to blame, and by then you can't change last month anyway."),
          p("Power companies have the opposite problem. India is rolling out smart meters by the million under RDSS, so DISCOMs suddenly have a flood of readings but very little that turns them into decisions. I wanted both sides to get a live, useful picture from the same meter data."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A live dashboard.", "Watts, voltage, current, tariff state and a monthly estimate, refreshed every second."],
            ["An appliance matrix.", "NILM-detected appliances with live power, on, off or standby, and a health score. New ones can be added by photographing the label, which Gemini reads."],
            ["Seven focused AI agents.", "Anomaly detective, smart scheduler, carbon narrator, lifecycle monitor, bill forecaster, neighbour benchmark and an energy chat, each with one clear job."],
            ["Billing that looks ahead.", "Prepaid balance, recharges, history and an AI bill forecast, plus vampire-load detection for things that never really switch off."],
            ["Mandi, EV and solar.", "A peer-to-peer energy marketplace, EV charging bookings and solar generation with net metering."],
            ["An operator control room.", "Grid monitoring, user management, billing and revenue, new connections, outage alerts, demand forecasting, trading control and support tickets."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Disaggregate, don't install.", "NILM finds appliances from the meter alone. Nobody has to fit a smart plug on every socket."],
            ["Agents with one job each.", "Seven small, testable services are easier to trust than one giant prompt that does everything."],
            ["Two products, one backend.", "Consumers and operators share the same API and data, so what a family sees and what the DISCOM sees always agree."],
            ["Edge first.", "The API runs on Cloudflare Workers, close to users and cheap to scale toward millions of meters."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("UniCharge was the widest system I've designed: ten backend modules, two very different users and an external ML service in the middle. It taught me to draw clean boundaries first, so each piece could grow on its own without dragging the rest along."),
        ],
      },
    ],
    impact: [],
    links: { demo: "https://unicharge.pages.dev", repo: "https://github.com/prateekxai/instinct-sherlock-detects" },
  },

  {
    slug: "ats-ai",
    kind: "project",
    group: "AI Products",
    name: "atsai",
    subtitle: "A résumé optimiser that refuses to make things up",
    hook: "Plenty of AI résumé tools will happily invent a project to beat a keyword filter. atsai scores your résumé honestly and only rewrites what's actually true.",
    category: "AI Product · Careers",
    status: "Built",
    statusTone: "info",
    headline: { value: "5", label: "signals in one honest score" },
    facts: [
      { label: "Built for", value: "Job seekers whose résumés get filtered out before a person reads them" },
      { label: "Includes", value: "ATS scoring, rewrites, cover letters and interview prep" },
      { label: "Status", value: "Built" },
    ],
    stack: ["React + Vite", "TypeScript", "Hono on Cloudflare Workers", "Supabase", "Gemini on Vertex AI", "Cloudinary", "OpenAPI"],
    skills: ["LLM guardrails", "Deterministic scoring", "Prompt-injection defence", "SaaS auth & usage limits", "Edge APIs"],
    steps: [
      { title: "Résumé meets the job", caption: "Upload your résumé and paste the job description you're aiming for." },
      { title: "An honest score", caption: "UniScore is plain maths, not AI: keywords 30%, market fit 25%, then sections, readability and depth at 15% each." },
      { title: "Rewrite on request", caption: "Ask for \"make this more technical\" or \"shorten this bullet\" and only that part changes, shown as a diff." },
      { title: "Fact-checked first", caption: "A hallucination checker blocks any new company, degree, certificate, skill or project that wasn't in your original." },
      { title: "Tailored and ready", caption: "Export an ATS-ready résumé, a cover letter in the tone you choose, and interview prep for the role." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Most résumés are rejected by software before a person ever sees them. The tools that promise to fix this usually have the same flaw: ask an LLM to \"optimise\" a résumé and it quietly adds skills, titles or projects that never existed."),
          p("That's worse than a low score. It puts a candidate in an interview defending things they never did. I wanted a tool that is strict about the truth, and honest about how the score is calculated."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["UniScore.", "A fully deterministic score with no LLM involved: keyword match, market alignment, section completeness, readability and experience depth."],
            ["Targeted rewrites.", "Instructions apply to one section or bullet, and every change is shown as a diff against the previous version."],
            ["A hallucination checker.", "Every rewrite is compared with the original for fabricated companies, degrees, certifications, skills and projects."],
            ["Prompt-injection guards.", "Text pasted from a job post can't smuggle instructions into the model."],
            ["The rest of the job hunt.", "A job-description parser, cover letters in formal, conversational or assertive tones, interview prep and version history."],
            ["A real SaaS shell.", "Google sign-in, usage tracking, rate limits and a paywall, on Cloudflare Workers with Supabase."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Keep the score out of the model's hands.", "If an LLM decides the score, nobody can explain it. Plain weights can be explained in one sentence."],
            ["Truth beats keywords.", "A slightly lower score is better than a résumé that falls apart in the interview."],
            ["Small, reviewable changes.", "Diffs let people accept the parts they agree with instead of trusting a whole rewrite."],
            ["Treat pasted text as untrusted.", "Job descriptions come from anywhere, so they're checked before they reach a prompt."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("atsai was where I learned that the most valuable code around an LLM is often the code that says no: validators, fact-checkers and guards. Building them made the AI parts feel safe enough to actually use."),
        ],
      },
    ],
    impact: [],
    links: { repo: "https://github.com/prateekhbtu/ats-ai" },
  },

  {
    slug: "sahayak",
    kind: "project",
    group: "AI Products",
    name: "Sahayak",
    subtitle: "A voice-first teaching assistant for government school classrooms",
    hook: "A teacher in a government school has forty students, one smartboard and no time to draw diagrams between periods. Sahayak lets her ask out loud and puts the lesson on the board.",
    category: "Voice AI · Education",
    status: "Live demo",
    statusTone: "success",
    headline: { value: "4", label: "classroom tools, all by voice" },
    facts: [
      { label: "Built for", value: "Teachers in government school smart classrooms" },
      { label: "Speaks", value: "Hindi, English and Hinglish" },
      { label: "Status", value: "Live demo" },
    ],
    stack: ["Next.js 15", "React 19", "Flask", "Gemini 2.0 Flash", "Gemini TTS", "Web Speech API", "Mermaid", "NeonDB", "Swagger"],
    skills: ["Voice interfaces", "Intent routing", "Structured LLM output", "Text to speech", "Diagram generation", "API design"],
    steps: [
      { title: "She just says it", caption: "The teacher taps Speak and says \"Explain photosynthesis in Hinglish\". The browser turns her voice into text, for free." },
      { title: "The command is routed", caption: "Gemini works out what she wants (explain, quiz, translate or an activity) and sends it to the right tool." },
      { title: "On the board in seconds", caption: "A simple Hinglish explanation, key points and an auto-drawn Mermaid diagram appear on the smartboard." },
      { title: "Quiz or translate", caption: "\"Make a 5 question quiz on fractions\" gives instant MCQs. Any text can sit in Hindi and English side by side." },
      { title: "Hands-free, read aloud", caption: "Activities move when she says next, dobara or pichla, and any answer can be narrated in Gemini's voice." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Many government schools now have smart classrooms: the screen is there, but the content isn't. A teacher with forty children doesn't have time to search for a diagram or write a quiz between periods, and typing on a smartboard mid-lesson breaks the class's attention."),
          p("I wanted the board to respond to the teacher's voice, in the way she actually talks in class: a mix of Hindi and English."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A voice command router.", "One endpoint takes the transcript, detects the intent and calls the right feature."],
            ["Live concept simplification.", "A student-friendly Hinglish explanation, key points and a Mermaid concept map for any topic."],
            ["Voice-triggered quizzes.", "MCQs or short-answer questions, projected instantly, plus a Quiz Studio where the class can play and get scored."],
            ["Bilingual dictation.", "Hindi and English side by side, each readable aloud."],
            ["A hands-free activity guide.", "Step-by-step experiments navigated by voice, including Hindi cues like dobara and pichla."],
            ["A test generator.", "Short-answer papers with answer keys, exported to PDF."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["One AI provider, few moving parts.", "Gemini handles text, intent and speech. No vector database, no RAG, nothing extra to break on school Wi-Fi."],
            ["Free where it can be.", "Speech to text runs in the browser through the Web Speech API."],
            ["Structured output, not chat.", "Every feature asks for JSON, so the board can render diagrams, quizzes and steps instead of a wall of text."],
            ["Talk the way classrooms do.", "Hinglish is a first-class language here, not an afterthought."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Designing for a teacher in the middle of a lesson taught me that speed and simplicity beat feature count. If the board takes ten seconds to answer, the class has already moved on."),
        ],
      },
    ],
    impact: [],
    links: { demo: "https://ai-tutor-6kx.pages.dev/", repo: "https://github.com/prateekxai/ai-tutor" },
  },

  {
    slug: "carbonseed",
    kind: "project",
    group: "IoT & Hardware",
    name: "Carbonseed",
    subtitle: "Industrial IoT and compliance reporting for small factories",
    hook: "A small steel forge can't afford an enterprise monitoring system, but it still has to file pollution reports. Carbonseed puts a cheap ESP32 on the machine and does the rest.",
    category: "Industrial IoT · SaaS",
    status: "Built",
    statusTone: "info",
    headline: { value: "ESP32", label: "edge sensors to dashboard" },
    facts: [
      { label: "Built for", value: "Indian MSME factories" },
      { label: "Users", value: "Operators, compliance officers and management" },
      { label: "Reports", value: "SPCB, PAT and CBAM compliance" },
      { label: "Status", value: "Built" },
    ],
    stack: ["ESP32", "HTTP / MQTT", "FastAPI", "PostgreSQL (TimescaleDB-ready)", "JWT auth", "Next.js 14", "Recharts", "Tailwind"],
    skills: ["Embedded IoT", "Time-series data", "Explainable analytics", "Compliance reporting", "Role-based dashboards"],
    steps: [
      { title: "Sensors on the machine", caption: "An ESP32 reads temperature, gas, vibration, humidity, pressure and power, and sends it over Wi-Fi." },
      { title: "Ingested and stored", caption: "FastAPI takes every reading on /ingest and keeps it as a time series in PostgreSQL." },
      { title: "Explainable analytics", caption: "Rolling averages, a baseline from history, thresholds and a health score. No black box." },
      { title: "Alerts before breakdowns", caption: "When vibration or temperature drifts past its baseline, the operator hears about it straight away." },
      { title: "Compliance, done", caption: "Weekly, monthly and SPCB, PAT or CBAM reports come straight from the data, with an audit trail." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("India's small manufacturers run on thin margins. Enterprise monitoring systems cost more than the machines they watch, yet regulators and export markets increasingly want emissions and energy data. Most of these factories still track it on paper, if at all."),
          p("As an electronics student I knew an ESP32 could do the sensing for a few hundred rupees. The hard part was turning raw readings into something an operator, a compliance officer and an owner would each actually use."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Low-cost edge devices.", "ESP32 boards with temperature, gas and vibration sensors, low power use and Wi-Fi."],
            ["An ingest API.", "Device registration and a single /ingest endpoint for readings over HTTP or MQTT."],
            ["An explainable analytics engine.", "Rolling averages, baseline comparison, threshold detection and simple health scores."],
            ["Alerts and device health.", "Instant anomaly alerts, plus uptime tracking for every device."],
            ["Compliance reports.", "SPCB, PAT and CBAM reports with historical data and audit trails."],
            ["Three dashboards.", "Live monitoring for operators, reports for compliance, and cost and downtime insights for owners."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Cheap hardware, honest analytics.", "Simple statistics that anyone can check beat a model nobody can explain to an inspector."],
            ["Leave room for ML.", "Hooks are in place for hosted models for predictive maintenance later, without rewriting the pipeline."],
            ["Three audiences, three views.", "The person on the floor and the person filing reports need very different screens."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("Carbonseed joined both halves of my degree: electronics on the edge and software in the cloud. It taught me that in industry, an alert people trust is worth more than a clever one."),
        ],
      },
    ],
    impact: [],
    links: { repo: "https://github.com/prateekxai/carbonseed" },
  },

  {
    slug: "cad-visualizer",
    kind: "project",
    group: "AI Products",
    name: "CAD Visualizer",
    subtitle: "Floor plans in, photoreal room renders out",
    hook: "Clients find it hard to picture a room from a line drawing. Upload the CAD, pick a style, and get photoreal renders of every room in the plan.",
    category: "Generative AI · Architecture",
    status: "Internal tool",
    statusTone: "info",
    headline: { value: "3 to 6", label: "rooms found in every plan" },
    facts: [
      { label: "Built for", value: "Architects and interior designers" },
      { label: "Model", value: "Gemini 2.5 Flash Image (Nano Banana) on Vertex AI" },
      { label: "Status", value: "Internal tool" },
    ],
    stack: ["React + Vite", "TypeScript", "Tailwind", "Hono", "Vertex AI", "Gemini 2.5 Flash", "Gemini 2.5 Flash Image"],
    skills: ["Generative image AI", "Prompt design", "Parallel orchestration", "Vertex AI", "Full-stack TypeScript"],
    steps: [
      { title: "Upload the CAD", caption: "A floor plan, elevation or room sketch as PNG, JPG or PDF." },
      { title: "Pick a feel", caption: "Design style, vibe and colour palette. No room list needed." },
      { title: "Rooms found for you", caption: "Gemini reads the drawing and finds 3 to 6 distinct sections, each with a description and a viewpoint." },
      { title: "Rendered in parallel", caption: "Every room is rendered twice at the same time, with the plan's geometry locked in the prompt." },
      { title: "Room by room", caption: "Each section comes back as a card with its name, viewpoint and two variations to choose from." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Architects think in plans. Clients think in rooms. Turning a line drawing into a believable render usually means hours in a 3D tool for every option, so early conversations happen over drawings that most clients can't really read."),
          p("Image models had just become good enough to keep a layout's geometry while changing its look. I wanted to see if one upload could replace a day of rendering for those first conversations."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["Automatic section detection.", "Gemini 2.5 Flash finds the rooms, describes them and picks a viewpoint for each."],
            ["Locked-geometry prompts.", "Style changes, walls don't. The prompt pins the layout before adding the look."],
            ["Parallel generation.", "Every section times two variations, all requested at once."],
            ["Graceful partial failure.", "If one room fails, it comes back as an error card and every other room still shows."],
            ["A portable backend.", "A Hono server that runs on Node, Cloudflare Workers or Vercel Edge."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Ask for less.", "Style, vibe and palette are enough. Making people list their rooms was a step the model could do itself."],
            ["Lock the geometry, vary the style.", "Renders are only useful if they're faithful to the plan."],
            ["Parallel, not one by one.", "A plan with six rooms shouldn't take six times as long."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("CAD Visualizer taught me how much of generative AI work is really prompt and pipeline design: what to fix, what to vary, and how to keep one bad output from ruining the whole result."),
        ],
      },
    ],
    impact: [],
    links: { repo: "https://github.com/prateekhbtu/cad-visualiser" },
  },

  {
    slug: "chronic-ai",
    kind: "project",
    group: "Health AI",
    name: "Chronic AI Health Monitor",
    subtitle: "An agentic workflow that watches chronic patients and decides who needs a doctor",
    hook: "Chronic patients log vitals every day, and most of it is never read. This agent reads it, decides what's worrying, and alerts the doctor only when it should.",
    category: "Agentic AI · Health",
    status: "Built",
    statusTone: "info",
    headline: { value: "10 days", label: "of vitals, read every run" },
    facts: [
      { label: "Built for", value: "Doctors managing patients with chronic conditions" },
      { label: "Team", value: "I led it, with Lakshya Baranwal and Prakhar Singh" },
      { label: "Status", value: "Built, with a full video walkthrough" },
    ],
    stack: ["LangGraph", "LangChain + Gemini", "FastAPI", "React", "Supabase"],
    skills: ["Agentic workflows", "LangGraph routing", "Medical reasoning prompts", "Alert automation", "Full-stack"],
    steps: [
      { title: "Patient data comes in", caption: "Profiles, history, health targets and ten days of heart rate, BP, oxygen and activity." },
      { title: "The agent analyses", caption: "Gemini reads the trends against the patient's own targets." },
      { title: "A routing decision", caption: "The graph decides: escalate to the doctor, or just notify the patient." },
      { title: "The doctor is alerted", caption: "Serious cases produce a doctor alert with the reasoning attached, and a report is saved." },
      { title: "The patient hears back", caption: "Every patient gets a plain summary, so they know where they stand." },
    ],
    sections: [
      {
        heading: H.why,
        body: [
          p("Diabetes and hypertension are managed between visits, not during them. Patients log readings every day, but doctors don't have time to read them all, so a worrying trend can sit unnoticed until the next appointment."),
          p("I wanted an agent that reads every log, makes a clear routing decision, and only takes up a doctor's time when it's warranted. This project later grew into Pulse AI."),
        ],
      },
      { heading: H.how, body: [storyboard] },
      {
        heading: H.built,
        body: [
          list(
            ["A LangGraph workflow.", "Analyse, route, alert the doctor or notify the patient, save the report, dispatch."],
            ["Gemini reasoning.", "Real-time medical reasoning and summaries through LangChain."],
            ["A full-stack app.", "FastAPI and React with Supabase for patients, vitals and reports."],
            ["Automated alerts.", "Doctor alerts and weekly patient summaries, generated and sent without anyone pressing a button."],
          ),
        ],
      },
      {
        heading: H.thinking,
        body: [
          list(
            ["Route, don't just summarise.", "The most useful output is a decision: does a doctor need to see this or not?"],
            ["Explain every escalation.", "A doctor alert carries the reasoning behind it, so it can be checked quickly."],
            ["Talk to patients too.", "People manage chronic conditions better when they understand their own numbers."],
          ),
        ],
      },
      {
        heading: H.learned,
        body: [
          p("This was my first real agentic system, and it taught me to think in graphs: clear nodes, clear decisions and clear handoffs. The same thinking shaped Pulse AI's CareScore and escalation levels."),
        ],
      },
    ],
    impact: [],
    links: { demo: "https://youtu.be/xVE_88UbKOI", repo: "https://github.com/prateekxai/chronic-ai-agent" },
  },

];

export interface ArchiveItem {
  name: string;
  blurb: string;
  tech: string[];
  year: string;
  repo: string;
  live?: string;
}

/** Smaller builds and college websites. */
export const ARCHIVE: ArchiveItem[] = [
  {
    name: "NSS HBTU website",
    blurb: "The website for NSS at HBTU Kanpur: drives, events, blogs and the team.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2026",
    repo: "https://github.com/prateekxai/nss-hbtu",
    live: "https://nss-hbtu.vercel.app",
  },
  {
    name: "ET Department website",
    blurb: "A site for HBTU's Electronics & Telecommunication department: courses, faculty, research and publications.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2025",
    repo: "https://github.com/prateekxai/ethbtu",
    live: "https://prateekxai.github.io/ethbtu/",
  },
  {
    name: "AETE website",
    blurb: "The website for the Association of Electronics Engineers at HBTU Kanpur.",
    tech: ["HTML", "CSS", "JavaScript"],
    year: "2024",
    repo: "https://github.com/prateekxai/AETEhbtu",
  },
  {
    name: "Rakshak AI",
    blurb: "A remote patient monitoring prototype: smartwatch data, AI trend analysis and personalised advice, in English, Hindi and French.",
    tech: ["Next.js", "Genkit", "Firebase"],
    year: "2025",
    repo: "https://github.com/prateekxai/rakshak-ai",
  },
  {
    name: "Vocalis",
    blurb: "A health screening prototype with a Gemini chatbot, voice recordings and Hindi and Marathi support.",
    tech: ["React", "Supabase", "Gemini"],
    year: "2025",
    repo: "https://github.com/prateekxai/vocalis",
  },
];
