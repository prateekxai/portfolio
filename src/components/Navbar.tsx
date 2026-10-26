import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../lib/scroll";
import { PROFILE } from "../data/resume";
import ThemeToggle from "./ThemeToggle";

interface NavLink {
  label: string;
  /** Section id on the home page. */
  id: string;
  /** Set for links that open their own page instead of scrolling. */
  to?: string;
  mobile: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", id: "home", mobile: true },
  { label: "Experience", id: "experience", mobile: false },
  { label: "Work", id: "work", to: "/work", mobile: true },
  { label: "Skills", id: "skills", mobile: false },
];

export default function Navbar() {
  const { pathname, key: locationKey } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const onCaseStudy = pathname.startsWith("/work/");

  // Back to wherever the reader came from; a direct visit falls back to /work.
  const goBack = () => (locationKey !== "default" ? navigate(-1) : navigate("/work"));
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      if (!onHome) return;

      // Active-section detection.
      const offset = window.scrollY + window.innerHeight * 0.4;
      let current = "home";
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= offset) current = link.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  const current = onHome ? active : pathname.startsWith("/work") ? "work" : "";

  const go = (link: NavLink) => {
    if (link.to) {
      if (pathname === link.to) window.scrollTo({ top: 0, behavior: "smooth" });
      else navigate(link.to);
    } else if (onHome) {
      scrollToSection(link.id);
    } else {
      navigate("/", { state: { scrollTo: link.id } });
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-stroke bg-surface/90 px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        {/* Back (case studies only) */}
        {onCaseStudy && (
          <>
            <button
              onClick={goBack}
              aria-label="Go back"
              title="Back"
              className="group inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs text-text-primary transition-colors duration-200 hover:bg-stroke/50 sm:h-9 sm:px-3.5 sm:text-sm"
            >
              <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-0.5">
                ←
              </span>
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="mx-1 h-5 w-px bg-stroke" />
          </>
        )}

        {/* Logo */}
        <button
          onClick={() => (onHome ? scrollToSection("home") : navigate("/"))}
          aria-label="Home"
          className="group relative grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 hover:scale-110"
        >
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 group-hover:[transform:rotate(180deg)]" />
          <span className="absolute inset-[2px] grid place-items-center rounded-full bg-bg">
            <span className="font-display text-[13px] italic text-text-primary">
              {PROFILE.initials}
            </span>
          </span>
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {/* Nav links */}
        <div className="flex items-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link)}
              className={`rounded-full px-2.5 py-1.5 text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                link.mobile ? "" : "hidden sm:block"
              } ${
                current === link.id
                  ? "bg-stroke/50 text-text-primary"
                  : "text-muted hover:bg-stroke/50 hover:text-text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-stroke" />

        {/* Say hi button */}
        <a
          href={`mailto:${PROFILE.email}`}
          className="group relative inline-flex items-center rounded-full"
        >
          <span className="accent-gradient absolute rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ inset: "-2px" }} />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1.5 text-xs text-text-primary backdrop-blur-md sm:px-4 sm:py-2 sm:text-sm">
            Say hi
            <span aria-hidden className="text-[0.85em]">↗</span>
          </span>
        </a>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-stroke" />

        <ThemeToggle />
      </div>
    </nav>
  );
}
