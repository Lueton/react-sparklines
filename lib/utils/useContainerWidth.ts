import { RefObject, useEffect, useRef, useState } from "react";

interface UseContainerWidthOptions {
  enabled: boolean;
  defaultWidth: number;
}

interface UseContainerWidthResult {
  containerRef: RefObject<HTMLDivElement | null>;
  width: number;
  isReady: boolean;
}

export function useContainerWidth({
  enabled,
  defaultWidth,
}: UseContainerWidthOptions): UseContainerWidthResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(defaultWidth);
  const [isReady, setIsReady] = useState(!enabled);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      setWidth(defaultWidth);
      setIsReady(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    // Immediate measurement before observer fires
    const rect = element.getBoundingClientRect();
    if (rect.width > 0) {
      setWidth(rect.width);
      setIsReady(true);
    }

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver((entries) => {
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
      }
      rafId.current = requestAnimationFrame(() => {
        for (const entry of entries) {
          const newWidth = entry.contentRect.width;
          if (newWidth > 0) {
            setWidth(newWidth);
            setIsReady(true);
          }
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [enabled, defaultWidth]);

  return { containerRef, width, isReady };
}
