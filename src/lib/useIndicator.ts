import { useLayoutEffect, useRef, useState } from "react";

export interface IndicatorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Measures the child marked `data-indicator={activeKey}` inside a positioned
 * container, so a single sliding highlight can animate to it.
 *
 * (framer-motion's `layoutId` would be simpler, but an element with a
 * layoutId inside a page that is exiting stalls AnimatePresence and the next
 * route never mounts.)
 */
export function useIndicator<T extends HTMLElement>(activeKey: string | undefined) {
  const containerRef = useRef<T>(null);
  const [rect, setRect] = useState<IndicatorRect | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || activeKey === undefined) return;

    const measure = () => {
      const el = container.querySelector<HTMLElement>(
        `[data-indicator="${CSS.escape(activeKey)}"]`
      );
      setRect(
        el
          ? { x: el.offsetLeft, y: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight }
          : null
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => observer.disconnect();
  }, [activeKey]);

  return [containerRef, rect] as const;
}
