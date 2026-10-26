import { Suspense, lazy, useEffect, useLayoutEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import TextureOverlay from "./components/TextureOverlay";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { scrollToSection } from "./lib/scroll";

// The work pages carry all the case-study content, so they load on demand.
const loadWork = () => import("./pages/Work");
const loadCaseStudy = () => import("./pages/CaseStudy");
const Work = lazy(loadWork);
const CaseStudy = lazy(loadCaseStudy);

/** Last scroll position of each history entry, restored on back/forward. */
const scrollPositions = new Map<string, number>();

/**
 * Wraps a route element with a fade page transition. On mount it scrolls to
 * a requested section (navigate(..., { state: { scrollTo } })), restores the
 * previous position on back/forward, or starts at the top.
 */
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const key = location.key;
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    const saved = scrollPositions.get(key);

    if (target) {
      requestAnimationFrame(() => scrollToSection(target, "instant"));
    } else if (navigationType === "POP" && saved !== undefined) {
      requestAnimationFrame(() => window.scrollTo({ top: saved, behavior: "instant" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    const onScroll = () => scrollPositions.set(key, window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // Runs once per page: the location is captured when the page mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

const ROUTES = [
  { path: "/", element: <Index /> },
  { path: "/work", element: <Work /> },
  { path: "/work/:slug", element: <CaseStudy /> },
  { path: "*", element: <NotFound /> },
];

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              // Suspense sits outside so a page mounts only once its chunk is ready.
              <Suspense fallback={null}>
                <PageTransition>{route.element}</PageTransition>
              </Suspense>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  // The intro loader plays once per visit, not on every route change.
  const [isLoading, setIsLoading] = useState(true);

  // Warm the work chunks once the intro is done so navigation is instant.
  useEffect(() => {
    if (isLoading) return;
    loadWork();
    loadCaseStudy();
  }, [isLoading]);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="relative"
      >
        <TextureOverlay />
        <Navbar />
        <AnimatedRoutes />
      </motion.div>
    </BrowserRouter>
  );
}
