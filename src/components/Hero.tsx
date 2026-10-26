import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useHlsVideo } from "../hooks/useHlsVideo";
import { scrollToSection } from "../lib/scroll";
import { PROFILE } from "../data/resume";
import { GithubIcon, LinkedinIcon } from "./icons";

const HLS_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const ROLES = PROFILE.roles;

export default function Hero() {
  const videoRef = useHlsVideo(HLS_SRC);
  const rootRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles every 2s.
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2000
    );
    return () => clearInterval(id);
  }, []);

  // GSAP entrance.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      ).fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.3,
        },
        0
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="theme-video absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
      />
      <div className="absolute inset-0 bg-bg/30 dark:bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 mt-[30vh] flex flex-col items-center px-4 text-center sm:mt-[16vh]">
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-tight text-text-primary md:text-8xl lg:text-9xl">
          {PROFILE.name}
        </h1>

        <p className="blur-in mb-4 text-lg text-text-primary/90 md:text-xl">
          {" "}
          <span
            key={roleIndex}
            className="text-accent-gradient inline-block animate-role-fade-in font-display italic"
          >
            {ROLES[roleIndex]}
          </span>{" "}
        </p>

        <p className="blur-in mb-12 max-w-xl text-sm text-muted md:text-base">
          {PROFILE.tagline}
        </p>

        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollToSection("work")}
            className="group relative rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition-all duration-300 hover:scale-105 hover:bg-bg hover:text-text-primary"
          >
            <span
              className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px", zIndex: -1 }}
            />
            <span className="relative">See Works</span>
          </button>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="group relative grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-stroke bg-bg text-text-primary transition-all duration-300 hover:scale-105 hover:border-transparent"
          >
            <span
              className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px", zIndex: -1 }}
            />
            <GithubIcon />
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group relative grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-stroke bg-bg text-text-primary transition-all duration-300 hover:scale-105 hover:border-transparent"
          >
            <span
              className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ inset: "-2px", zIndex: -1 }}
            />
            <LinkedinIcon />
          </a>

          <a
            href={PROFILE.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-5 py-3.5 text-sm text-muted underline-offset-4 transition-colors hover:text-text-primary hover:underline"
          >
            Download CV ↓
          </a>
        </div>
      </div>
    </section>
  );
}
