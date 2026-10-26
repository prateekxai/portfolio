import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightbox from "./Lightbox";
import { PROFILE, FOCUS_AREAS } from "../data/resume";

gsap.registerPlugin(ScrollTrigger);

const ROTATIONS = [-4, 3, 2, -3, 4, -2];

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colLeftRef = useRef<HTMLDivElement>(null);
  const colRightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }

      const makeParallax = (el: HTMLElement | null, distance: number) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: distance },
          {
            y: -distance,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );
      };
      makeParallax(colLeftRef.current, 120);
      makeParallax(colRightRef.current, -160);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const left = FOCUS_AREAS.filter((_, i) => i % 2 === 0);
  const right = FOCUS_AREAS.filter((_, i) => i % 2 === 1);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Layer 1: Pinned center */}
      <div
        ref={contentRef}
        className="z-10 flex h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            Focus Areas
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>
        <h2 className="mb-4 text-4xl leading-tight tracking-tight text-text-primary md:text-6xl lg:text-7xl">
          Where I <span className="text-accent-gradient font-display italic">go deep</span>
        </h2>
        <p className="mb-8 max-w-md text-sm text-muted md:text-base">
          The areas I keep coming back to: agentic AI, computer vision, and the
          real-time backends that keep everything else running.
        </p>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="group relative inline-flex rounded-full"
        >
          <span
            className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ inset: "-1.5px" }}
          />
          <span className="relative inline-flex items-center gap-2 rounded-full border border-stroke bg-surface px-6 py-3 text-sm text-text-primary">
            Explore my GitHub
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </span>
        </a>
      </div>

      {/* Layer 2: Parallax columns */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center px-6 pt-[40vh]">
        <div className="grid w-full max-w-[1400px] grid-cols-2 gap-12 md:gap-40">
          <div ref={colLeftRef} className="flex flex-col gap-16 md:gap-28">
            {left.map((item, i) => (
              <FocusCard
                key={item.label}
                label={item.label}
                src={item.image}
                rotation={ROTATIONS[i * 2]}
                onClick={() => setLightbox(item.image)}
              />
            ))}
          </div>
          <div ref={colRightRef} className="flex flex-col gap-16 pt-24 md:gap-28 md:pt-40">
            {right.map((item, i) => (
              <FocusCard
                key={item.label}
                label={item.label}
                src={item.image}
                rotation={ROTATIONS[i * 2 + 1]}
                onClick={() => setLightbox(item.image)}
              />
            ))}
          </div>
        </div>
      </div>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </section>
  );
}

function FocusCard({
  label,
  src,
  rotation,
  onClick,
}: {
  label: string;
  src: string;
  rotation: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{ transform: `rotate(${rotation}deg)` }}
      className="pointer-events-auto group relative ml-auto aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border border-stroke bg-surface shadow-2xl shadow-black/30 transition-transform duration-500 hover:!rotate-0 hover:scale-[1.03]"
    >
      <img
        src={src}
        alt={label}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 font-display text-xl italic text-white md:text-2xl">
        {label}
      </span>
    </button>
  );
}
