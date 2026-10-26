/**
 * Shared shapes and writing helpers for the /work section.
 * Figures marked [M], [C] or [E] are measured, client-reported or
 * estimated, and render as small superscripts.
 */

export type Source = "M" | "C" | "E";
export type StatusTone = "success" | "info" | "neutral";

export interface Figure {
  value: string;
  source?: Source;
  note?: string;
}

export interface ListItem {
  title?: string;
  body: string;
}

export type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: ListItem[] }
  | { kind: "table"; table: { caption?: string; columns: string[]; rows: string[][] } }
  /** The project's animated walkthrough (see components/story). */
  | { kind: "storyboard" };

export interface Section {
  heading: string;
  body: Block[];
}

export interface ImpactRow {
  metric: string;
  before?: Figure;
  after: Figure;
  highlight?: boolean;
}

export interface StoryStep {
  title: string;
  caption: string;
}

export const SOURCE_LABELS: Record<Source, string> = {
  M: "Measured from real system data",
  C: "Reported by the client",
  E: "Estimate based on typical volumes",
};

export const WORK_GROUPS = [
  "Automation",
  "Computer Vision",
  "Health AI",
  "AI Products",
  "AI Agents",
  "Full-Stack",
  "IoT & Hardware",
] as const;

export type WorkGroup = (typeof WORK_GROUPS)[number];

export interface WorkItem {
  slug: string;
  kind: "case-study" | "project";
  group: WorkGroup;
  name: string;
  subtitle: string;
  /** One or two sentences that open the story. */
  hook: string;
  category: string;
  status: string;
  statusTone: StatusTone;
  /** The big figure on the card. */
  headline: { value: string; label: string; source?: Source };
  timeSaved?: Figure;
  annualValue?: Figure;
  facts: { label: string; value: string }[];
  stack: string[];
  /** What the project shows I can do. */
  skills: string[];
  steps: StoryStep[];
  sections: Section[];
  impact: ImpactRow[];
  links: { demo?: string; repo?: string; original?: string };
}

export const GROWITUP = "https://growitup.online/work/";

// Section headings, shared so the page can find them.
export const H = {
  why: "Why I built it",
  how: "How it works",
  built: "What I built",
  thinking: "How I thought about it",
  guardrails: "Guardrails",
  learned: "What it taught me",
} as const;

export const p = (text: string): Block => ({ kind: "paragraph", text });
export const list = (...items: [string, string][]): Block => ({
  kind: "list",
  items: items.map(([title, body]) => ({ title, body })),
});
export const plain = (...items: string[]): Block => ({
  kind: "list",
  items: items.map((body) => ({ body })),
});
export const storyboard: Block = { kind: "storyboard" };
