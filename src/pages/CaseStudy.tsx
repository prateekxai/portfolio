import { Fragment, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import StatusPill from "../components/StatusPill";
import Storyboard from "../components/story/Storyboard";
import { SCENES } from "../components/story/scenes";
import { Blocks, ImpactTable } from "../components/CaseStudyBlocks";
import { FigureText, RichText, SourceLegend, SourceMark } from "../components/RichText";
import { GithubIcon } from "../components/icons";
import { slugify } from "../lib/scroll";
import { useIndicator } from "../lib/useIndicator";
import { PROFILE } from "../data/resume";
import { H, WORK, findWork, type ImpactRow, type WorkItem } from "../data/work";
import NotFound from "./NotFound";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: EASE, delay },
});

/** Picks the most telling before → after row for the key-figures strip. */
function pickBeforeAfter(rows: ImpactRow[]) {
  const candidates = rows.filter(
    (r) =>
      r.before &&
      !r.highlight &&
      r.before.value.toLowerCase() !== "baseline" &&
      !r.after.value.startsWith(r.before.value)
  );
  return (
    candidates.find((r) =>
      /time|effort|close|turnaround|reconciliation|search/i.test(r.metric)
    ) ?? candidates[0]
  );
}

function ActionLinks({ item }: { item: WorkItem }) {
  const { demo, repo, original } = item.links;
  if (!demo && !repo && !original) return null;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer" className="group relative inline-flex rounded-full">
          <span
            className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-2px" }}
          />
          <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm text-bg transition-colors duration-300 group-hover:bg-surface group-hover:text-text-primary">
            See demo
            <span aria-hidden>↗</span>
          </span>
        </a>
      )}
      {repo && (
        <a
          href={repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg px-5 py-3 text-sm text-text-primary transition-colors duration-300 hover:bg-surface"
        >
          <GithubIcon size={18} />
          View code
        </a>
      )}
      {original && (
        <a href={original} target="_blank" rel="noreferrer" className="group relative inline-flex rounded-full">
          <span
            className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-1.5px" }}
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-3 text-sm text-text-primary">
            Also on GrowitUP
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
              ↗
            </span>
          </span>
        </a>
      )}
    </div>
  );
}

function KeyFigures({ item }: { item: WorkItem }) {
  if (!item.timeSaved || !item.annualValue) return null;
  const pair = pickBeforeAfter(item.impact);
  const cell = "flex flex-col p-6 md:p-8";
  const label = "mt-auto pt-3 text-xs uppercase tracking-[0.2em] text-muted";

  return (
    <motion.div
      {...reveal(0.35)}
      className="grid overflow-hidden rounded-3xl border border-stroke bg-surface sm:grid-cols-3"
    >
      <div className={cell}>
        <p className="font-display text-5xl italic leading-none text-text-primary md:text-6xl">
          <FigureText figure={item.timeSaved} />
        </p>
        <p className={label}>saved every month</p>
      </div>

      {pair?.before && (
        <div className={`${cell} border-t border-stroke sm:border-l sm:border-t-0`}>
          <p className="font-display text-2xl italic leading-tight text-text-primary md:text-3xl">
            <span className="text-muted">{pair.before.value}</span>
            <SourceMark source={pair.before.source} />
            <span aria-hidden className="mx-2 not-italic text-muted">
              →
            </span>
            <span className="sr-only"> to </span>
            <FigureText figure={pair.after} />
          </p>
          <p className={label}>{pair.metric}</p>
        </div>
      )}

      <div className={`${cell} border-t border-stroke sm:border-l sm:border-t-0`}>
        <p className="font-display text-5xl italic leading-none text-text-primary md:text-6xl">
          {item.annualValue.value}
          <SourceMark source={item.annualValue.source} />
        </p>
        <p className={label}>in value a year</p>
      </div>
    </motion.div>
  );
}

function Header({ item }: { item: WorkItem }) {
  return (
    <header className="relative overflow-hidden bg-bg pb-12 pt-32 md:pb-16 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgb(var(--brand) / 0.28), rgb(var(--brand) / 0.05) 55%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.nav {...reveal(0)} aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted">
          <Link to="/work" className="group inline-flex items-center gap-2 transition-colors hover:text-text-primary">
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">
              ←
            </span>
            All work
          </Link>
          <span aria-hidden>/</span>
          <span aria-current="page" className="text-text-primary">
            {item.name}
          </span>
        </motion.nav>

        <motion.div {...reveal(0.05)} className="mb-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">
            {item.kind === "case-study" ? "Case study" : "Project"}
          </span>
          <span className="rounded-full border border-stroke px-3 py-1 text-xs text-muted">{item.category}</span>
          <StatusPill status={item.status} tone={item.statusTone} />
        </motion.div>

        <motion.h1
          {...reveal(0.12)}
          className="max-w-5xl font-display text-5xl italic leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-[5.5rem]"
        >
          {item.name}
        </motion.h1>

        <motion.p {...reveal(0.18)} className="mt-5 max-w-3xl text-xl leading-snug tracking-tight text-text-primary/90 md:text-2xl">
          {item.subtitle}
        </motion.p>

        <motion.p {...reveal(0.24)} className="mb-10 mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          {item.hook}
        </motion.p>

        <motion.div {...reveal(0.3)} className="mb-12">
          <ActionLinks item={item} />
        </motion.div>

        <KeyFigures item={item} />
      </div>
    </header>
  );
}

function Chips({ items, tone = "plain" }: { items: string[]; tone?: "plain" | "brand" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className={`rounded-full border px-3.5 py-1.5 text-sm ${
            tone === "brand" ? "border-brand/30 bg-brand/10 text-brand-ink" : "border-stroke bg-bg text-text-primary/80"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Facts({ item }: { item: WorkItem }) {
  return (
    <section className="bg-bg pb-16 md:pb-24">
      <div className="mx-auto grid max-w-[1200px] gap-5 px-6 md:px-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:px-16">
        <motion.dl
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          viewport={{ once: true, margin: "-80px" }}
          className="overflow-hidden rounded-3xl border border-stroke bg-surface"
        >
          {item.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`flex flex-col gap-1 p-5 transition-colors duration-300 hover:bg-bg/40 md:grid md:grid-cols-[9rem_1fr] md:gap-6 md:p-6 ${
                i !== item.facts.length - 1 ? "border-b border-stroke" : ""
              }`}
            >
              <dt className="text-xs uppercase tracking-[0.2em] text-muted md:pt-0.5">{fact.label}</dt>
              <dd className="text-sm text-text-primary/85 md:text-base">
                <RichText text={fact.value} />
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          viewport={{ once: true, margin: "-80px" }}
          className="group relative overflow-hidden rounded-3xl border border-stroke bg-surface p-6 md:p-8"
        >
          <span className="accent-gradient pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]" />
          <div className="relative flex flex-col gap-7">
            <div>
              <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">Built with</h2>
              <Chips items={item.stack} />
            </div>
            <div>
              <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">What it shows I can do</h2>
              <Chips items={item.skills} tone="brand" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Sticky "on this page" list that tracks the section in view. */
function Contents({ entries }: { entries: { id: string; label: string }[] }) {
  const [active, setActive] = useState(entries[0]?.id);
  const [listRef, bar] = useIndicator<HTMLUListElement>(active);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    entries.forEach((e) => {
      const el = document.getElementById(e.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">On this page</p>
      <ul ref={listRef} className="relative flex flex-col border-l border-stroke">
        {bar && (
          <motion.span
            aria-hidden
            className="accent-gradient absolute -left-px top-0 w-px"
            initial={false}
            animate={{ y: bar.y, height: bar.height }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        {entries.map((entry) => (
          <li key={entry.id} data-indicator={entry.id}>
            <button
              onClick={() => document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className={`block w-full py-1.5 pl-4 text-left text-sm transition-colors duration-200 ${
                active === entry.id ? "text-text-primary" : "text-muted hover:text-text-primary"
              }`}
            >
              {entry.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionTitle({ index, title }: { index: number; title: string }) {
  return (
    <div className="mb-7 flex items-baseline gap-4">
      <span className="font-display text-3xl italic text-text-primary/30 md:text-4xl">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="text-3xl tracking-tight text-text-primary md:text-4xl">{title}</h2>
    </div>
  );
}

const sectionMotion = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE },
  viewport: { once: true, margin: "-80px" },
};

function Body({ item }: { item: WorkItem }) {
  const Scene = SCENES[item.slug];
  const hasImpact = item.impact.length > 0;
  const guardrails = item.sections.findIndex((s) => s.heading === H.guardrails);
  const thinking = item.sections.findIndex((s) => s.heading === H.thinking);
  const impactAfter = hasImpact ? (guardrails >= 0 ? guardrails : thinking) : -1;

  const entries = useMemo(() => {
    const list = item.sections.map((s) => ({ id: slugify(s.heading), label: s.heading }));
    if (impactAfter >= 0) list.splice(impactAfter + 1, 0, { id: "impact", label: "Impact" });
    return list;
  }, [item, impactAfter]);

  let n = 0;

  return (
    <section className="bg-bg pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:px-16">
        <aside className="hidden lg:block">
          <Contents entries={entries} />
        </aside>

        <div className="flex min-w-0 flex-col gap-16 md:gap-20">
          {item.sections.map((section, i) => (
            <Fragment key={section.heading}>
              <motion.section
                {...sectionMotion}
                id={slugify(section.heading)}
                className="scroll-mt-28 border-t border-stroke pt-10 md:pt-12"
              >
                <SectionTitle index={++n} title={section.heading} />
                <Blocks
                  body={section.body}
                  checklist={section.heading === H.guardrails}
                  storyboard={Scene ? <Storyboard steps={item.steps} Scene={Scene} /> : null}
                />
              </motion.section>

              {i === impactAfter && (
                <motion.section {...sectionMotion} id="impact" className="scroll-mt-28 border-t border-stroke pt-10 md:pt-12">
                  <SectionTitle index={++n} title="Impact" />
                  <p className="mb-6 max-w-[72ch] text-sm text-muted md:text-base">
                    Before and after. Every figure is marked as measured, reported by the client or estimated.
                  </p>
                  <ImpactTable rows={item.impact} />
                  <div className="mt-5">
                    <SourceLegend />
                  </div>
                </motion.section>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreWork({ item }: { item: WorkItem }) {
  const i = WORK.indexOf(item);
  const prev = WORK[(i - 1 + WORK.length) % WORK.length];
  const next = WORK[(i + 1) % WORK.length];

  const card = (target: WorkItem, label: string, align: "left" | "right") => (
    <Link to={`/work/${target.slug}`} className="group relative block rounded-3xl">
      <span
        className="accent-gradient absolute rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ inset: "-1.5px" }}
      />
      <span
        className={`relative flex h-full flex-col gap-2 rounded-3xl border border-stroke bg-surface p-6 md:p-8 ${
          align === "right" ? "md:items-end md:text-right" : ""
        }`}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted">
          {align === "left" ? "← " : ""}
          {label}
          {align === "right" ? " →" : ""}
        </span>
        <span className="font-display text-2xl italic text-text-primary md:text-3xl">{target.name}</span>
        <span className="text-sm text-muted">{target.subtitle}</span>
      </span>
    </Link>
  );

  return (
    <section className="bg-bg pb-16 md:pb-24">
      <nav aria-label="More work" className="mx-auto grid max-w-[1200px] gap-5 px-6 md:grid-cols-2 md:gap-6 md:px-10 lg:px-16">
        {card(prev, "Previous", "left")}
        {card(next, "Next", "right")}
        <div className="flex justify-center pt-4 md:col-span-2">
          <Link to="/work" className="group relative inline-flex rounded-full">
            <span
              className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-1.5px" }}
            />
            <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm text-text-primary">
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">←</span>
              See all work
            </span>
          </Link>
        </div>
      </nav>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const item = findWork(slug);

  useEffect(() => {
    if (!item) return;
    document.title = `${item.name} · ${PROFILE.name}`;
    return () => {
      document.title = `${PROFILE.name} · Portfolio`;
    };
  }, [item]);

  if (!item) return <NotFound />;

  return (
    <main className="relative">
      <Header item={item} />
      <Facts item={item} />
      <Body item={item} />
      <MoreWork item={item} />
      <Footer />
    </main>
  );
}
