import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { GithubIcon } from "./icons";
import { PROJECTS, type Project } from "../data/resume";

const HALFTONE = "radial-gradient(circle, #000 1px, transparent 1px)";

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      onClick={onOpen}
      role="link"
      tabIndex={0}
      aria-label={`${project.title}: read the full story`}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        delay: (index % 2) * 0.1,
      }}
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-stroke bg-surface text-left ${project.span} ${project.aspect}`}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Halftone overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
        style={{ backgroundImage: HALFTONE, backgroundSize: "4px 4px" }}
      />

      {/* Bottom gradient + always-visible title (hidden on hover) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 transition-opacity duration-300 group-hover:opacity-0 md:p-6">
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
          {project.category}
        </p>
        <h3 className="font-display text-2xl italic text-white md:text-3xl">
          {project.title}
        </h3>
      </div>

      {/* Hover detail layer: crisp summary + action pills */}
      <div className="absolute inset-0 flex flex-col justify-end gap-4 bg-bg/75 p-6 opacity-0 backdrop-blur-xl transition-opacity duration-500 group-hover:opacity-100 md:p-8">
        <div>
          <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted">
            {project.category}
          </p>
          <h3 className="mb-3 font-display text-3xl italic text-text-primary md:text-4xl">
            {project.title}
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-text-primary/80 md:text-base">
            {project.summary}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Case study pill (the whole card opens it) */}
          <span className="group/btn relative inline-flex rounded-full">
            <span className="accent-gradient-animated absolute inset-0 animate-gradient-shift rounded-full" />
            <span className="relative m-[1.5px] inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm text-black">
              Read the story
              <span aria-hidden className="transition-transform duration-300 group-hover/btn:translate-x-0.5">→</span>
            </span>
          </span>

          {/* Live demo pill */}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/demo relative inline-flex rounded-full"
            >
              <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/demo:opacity-100" />
              <span className="relative m-[1.5px] inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-4 py-2 text-sm text-text-primary">
                Demo
                <span aria-hidden>↗</span>
              </span>
            </a>
          )}

          {/* GitHub icon pill */}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="group/gh relative inline-grid h-[46px] w-[46px] place-items-center rounded-full"
            >
              <span className="accent-gradient absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/gh:opacity-100" />
              <span className="absolute inset-[1.5px] grid place-items-center rounded-full border border-stroke bg-surface text-text-primary">
                <GithubIcon size={20} />
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SelectedWorks() {
  const navigate = useNavigate();

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          heading="Featured *projects*"
          subtext="A few projects from my résumé, from Tally automation to voice AI. Tap any card for the whole story: why it existed, how it works and what I learned."
          ctaLabel="View all work"
          onCta={() => navigate("/work")}
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onOpen={() => navigate(`/work/${project.slug}`)}
            />
          ))}
        </div>

        {/* Mobile CTA (the header CTA is desktop-only) */}
        <button
          onClick={() => navigate("/work")}
          className="group relative mt-8 inline-flex rounded-full md:hidden"
        >
          <span className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: "-1.5px" }} />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 text-sm text-text-primary">
            View all work
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </span>
        </button>
      </div>
    </section>
  );
}
