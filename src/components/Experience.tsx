import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { EXPERIENCE } from "../data/resume";

export default function Experience() {
  return (
    <section id="experience" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Career"
          heading="Where I've *worked*"
          subtext="Three roles across backend, AI research and product engineering, each one shipping real systems with real teams."
        />

        <div className="relative">
          {/* Vertical line */}
          <span className="absolute left-0 top-2 h-full w-px bg-stroke md:left-[180px]" />

          <div className="flex flex-col gap-12 md:gap-16">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: i * 0.08,
                }}
                viewport={{ once: true, margin: "-80px" }}
                className="relative pl-8 md:grid md:grid-cols-[180px_1fr] md:gap-10 md:pl-0"
              >
                {/* Dot */}
                <span className="accent-gradient absolute left-[-4px] top-1.5 h-2.5 w-2.5 rounded-full md:left-[174px]" />

                {/* Period */}
                <div className="mb-3 md:mb-0 md:pr-8 md:text-right">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div className="md:pl-8">
                  <h3 className="font-display text-2xl italic text-text-primary md:text-3xl">
                    {exp.company}
                  </h3>
                  <p className="mb-4 mt-1 text-sm text-muted">
                    {exp.role}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {exp.points.map((point, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm text-text-primary/80 md:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
