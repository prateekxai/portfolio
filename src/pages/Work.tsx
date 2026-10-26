import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import WorkCard from "../components/WorkCard";
import Footer from "../components/Footer";
import { FigureText, SourceLegend } from "../components/RichText";
import { useIndicator } from "../lib/useIndicator";
import { PROFILE } from "../data/resume";
import {
  ARCHIVE,
  AT_A_GLANCE,
  AT_A_GLANCE_TOTAL,
  WORK,
  WORK_GROUPS,
  WORK_STATS,
  WORK_STATS_NOTE,
} from "../data/work";

const FILTERS = ["All", ...WORK_GROUPS] as const;
const CASE_STUDY_COUNT = WORK.filter((w) => w.kind === "case-study").length;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const, delay },
});

function WorkHeader() {
  return (
    <header className="relative overflow-hidden bg-bg pb-14 pt-36 md:pb-20 md:pt-44">
      {/* Soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/3 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(78,133,191,0.28), rgba(137,170,204,0.06) 55%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div {...reveal(0.05)} className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Work · {WORK.length} projects
          </span>
        </motion.div>

        <motion.h1
          {...reveal(0.12)}
          className="mb-6 max-w-4xl text-5xl leading-[0.95] tracking-tight text-text-primary md:text-7xl lg:text-8xl"
        >
          Things I've{" "}
          <span className="text-accent-gradient font-display italic">built</span>{" "}
          &amp; shipped
        </motion.h1>

        <motion.p
          {...reveal(0.2)}
          className="max-w-xl text-sm text-muted md:text-base"
        >
          Every project here started with a real problem: slow, repetitive work
          or a question nobody could answer. {CASE_STUDY_COUNT} of them are
          automations built for real businesses. The rest are AI products,
          agents and hardware projects of my own. Open any of them to see why
          it existed, how it works and what it taught me.
        </motion.p>
      </div>
    </header>
  );
}

function WorkStats() {
  return (
    <section className="bg-bg pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-10 border-y border-stroke py-10 md:grid-cols-4 md:gap-6 md:py-12">
          {WORK_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.1,
              }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              <span className="font-display text-4xl italic text-text-primary md:text-5xl lg:text-6xl">
                {stat.value}
              </span>
              <span className="mt-2 max-w-[18ch] text-xs uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted md:text-sm">
          {WORK_STATS_NOTE}
        </p>
      </div>
    </section>
  );
}

function WorkGrid() {
  const [params, setParams] = useSearchParams();
  const active = FILTERS.find((f) => f === params.get("filter")) ?? "All";
  const items = active === "All" ? WORK : WORK.filter((w) => w.group === active);

  const select = (filter: (typeof FILTERS)[number]) =>
    setParams(filter === "All" ? {} : { filter }, { replace: true });
  const [filtersRef, pill] = useIndicator<HTMLDivElement>(active);

  return (
    <section id="all-work" className="bg-bg pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Filters */}
        <div
          ref={filtersRef}
          role="tablist"
          aria-label="Filter work"
          className="relative mb-10 flex flex-wrap gap-2 md:mb-12"
        >
          {pill && (
            <motion.span
              aria-hidden
              className="absolute left-0 top-0 rounded-full bg-text-primary"
              initial={false}
              animate={{ x: pill.x, y: pill.y, width: pill.width, height: pill.height }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {FILTERS.map((filter) => {
            const count =
              filter === "All"
                ? WORK.length
                : WORK.filter((w) => w.group === filter).length;
            const isActive = filter === active;
            return (
              <button
                key={filter}
                data-indicator={filter}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(filter)}
                className={`relative rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                  isActive
                    ? "border-transparent text-bg"
                    : "border-stroke text-muted hover:bg-stroke/50 hover:text-text-primary"
                }`}
              >
                <span className="relative">
                  {filter}
                  <span className="ml-1.5 text-[0.8em] opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <WorkCard key={item.slug} item={item} index={WORK.indexOf(item)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

const TH =
  "whitespace-nowrap px-5 py-4 text-[10px] font-normal uppercase tracking-[0.2em] text-muted";

function AtAGlance() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Overview"
          heading="Portfolio at a *glance*"
          subtext="The automations side by side: the boring task each one replaced, and what it gives back."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="overflow-x-auto rounded-3xl border border-stroke bg-surface"
        >
          <table className="w-full min-w-[60rem] text-left text-sm">
            <caption className="sr-only">
              Portfolio at a glance: every automation, what it replaced, and what it saves
            </caption>
            <thead>
              <tr className="border-b border-stroke">
                {[
                  "#",
                  "Project",
                  "Category",
                  "The boring task it replaced",
                  "Status",
                  "Time saved / month",
                  "Est. annual value",
                ].map((col) => (
                  <th key={col} scope="col" className={TH}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AT_A_GLANCE.map((row, i) => (
                <tr
                  key={row.slug}
                  className="border-b border-stroke transition-colors duration-300 hover:bg-bg/40"
                >
                  <td className="px-5 py-4 align-top font-display text-lg italic text-text-primary/30">
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <th scope="row" className="px-5 py-4 align-top font-normal">
                    <Link
                      to={`/work/${row.slug}`}
                      className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-text-primary"
                    >
                      {row.project}
                    </Link>
                  </th>
                  <td className="px-5 py-4 align-top text-muted">{row.category}</td>
                  <td className="min-w-[16rem] px-5 py-4 align-top text-muted">
                    {row.replaced}
                  </td>
                  <td className="px-5 py-4 align-top text-muted">{row.status}</td>
                  <td className="whitespace-nowrap px-5 py-4 align-top text-text-primary">
                    <FigureText figure={row.timeSaved} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 align-top text-text-primary">
                    <FigureText figure={row.annualValue} />
                  </td>
                </tr>
              ))}
              <tr className="bg-[linear-gradient(90deg,rgba(137,170,204,0.10),rgba(78,133,191,0.04))]">
                <td className="px-5 py-5" />
                <th
                  scope="row"
                  colSpan={4}
                  className="px-5 py-5 text-left font-normal text-text-primary"
                >
                  {AT_A_GLANCE_TOTAL.label}
                </th>
                <td className="whitespace-nowrap px-5 py-5 font-display text-xl italic text-text-primary">
                  {AT_A_GLANCE_TOTAL.timeSaved}
                </td>
                <td className="whitespace-nowrap px-5 py-5 font-display text-xl italic text-text-primary">
                  {AT_A_GLANCE_TOTAL.annualValue}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted md:text-sm">{AT_A_GLANCE_TOTAL.caption}</p>
          <SourceLegend />
        </div>
      </div>
    </section>
  );
}

function MoreOnGithub() {
  return (
    <section className="bg-bg pb-16 md:pb-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Archive"
          heading="More on *GitHub*"
          subtext="College websites and early prototypes. Smaller builds, but each one taught me something."
          ctaLabel="All repositories"
          onCta={() => window.open(PROFILE.github, "_blank")}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {ARCHIVE.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: (i % 2) * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
              className="group relative flex flex-col gap-3 rounded-2xl border border-stroke bg-surface p-5 transition-colors duration-300 hover:bg-surface/60 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-2xl italic text-text-primary">{item.name}</h3>
                <span className="pt-1 text-xs tabular-nums text-muted">{item.year}</span>
              </div>
              <p className="text-sm leading-relaxed text-text-primary/75">{item.blurb}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span key={t} className="rounded-full border border-stroke bg-bg px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {item.live && (
                    <a href={item.live} target="_blank" rel="noreferrer" className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-text-primary">
                      Live ↗
                    </a>
                  )}
                  <a href={item.repo} target="_blank" rel="noreferrer" className="text-muted underline decoration-stroke underline-offset-4 transition-colors hover:text-text-primary">
                    Code ↗
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  useEffect(() => {
    document.title = `Work · ${PROFILE.name}`;
    return () => {
      document.title = `${PROFILE.name} · Portfolio`;
    };
  }, []);

  return (
    <main className="relative">
      <WorkHeader />
      <WorkStats />
      <WorkGrid />
      <MoreOnGithub />
      <AtAGlance />
      <Footer />
    </main>
  );
}
