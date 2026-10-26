import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHlsVideo } from "../hooks/useHlsVideo";
import { PROFILE } from "../data/resume";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const SOCIALS = [
  { label: "GitHub", href: PROFILE.github },
  { label: "LinkedIn", href: PROFILE.linkedin },
  { label: "Portfolio", href: PROFILE.portfolio },
];

export default function Footer() {
  const videoRef = useHlsVideo(HLS_SRC);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const marqueeText = Array.from({ length: 10 }).map((_, i) => (
    <span key={i} className="font-display text-5xl italic text-text-primary md:text-7xl lg:text-8xl">
      ENGINEERING THE FUTURE&nbsp;•&nbsp;
    </span>
  ));

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      {/* Background video (flipped vertically) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="theme-video absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-bg/70 dark:bg-black/60" />

      <div className="relative z-10">
        {/* Marquee */}
        <div className="mb-16 overflow-hidden whitespace-nowrap md:mb-24">
          <div ref={marqueeRef} className="inline-flex w-max">
            {marqueeText}
            {marqueeText}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mb-20 flex max-w-[1200px] flex-col items-center px-6 text-center md:mb-28">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-muted">
            Let's work together
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group relative inline-flex rounded-full"
          >
            <span
              className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px" }}
            />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-4 font-display text-xl italic text-bg transition-colors duration-300 group-hover:bg-bg group-hover:text-text-primary md:px-8 md:text-3xl">
              {PROFILE.email}
              <span aria-hidden className="text-[0.7em]">↗</span>
            </span>
          </a>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="mt-6 text-sm text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            Or download my résumé ↓
          </a>
        </div>

        {/* Footer bar */}
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 border-t border-stroke px-6 pt-8 md:flex-row md:justify-between">
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-text-primary"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-muted">Available for projects</span>
          </div>

          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
