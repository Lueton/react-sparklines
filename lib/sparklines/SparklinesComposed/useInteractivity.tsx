import { useCallback, useEffect, useState } from "react";

import {
  Point,
  SparklineChildDataEntry,
  UseInteractivityProps,
} from "./../../utils/types.ts";


export const useInteractivity = <TData,>({
  ref,
  data,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
}: UseInteractivityProps<TData>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeEntry, setActiveEntry] = useState<null | SparklineChildDataEntry<TData>[]>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const calculateCoords = useCallback(
    (event: MouseEvent) => {
      if (!data.originalData.length) return;

      const sparklineDataPoints = data.sparklineData[0].points;

      const mouseX = event.offsetX;
      const lastItemIndex = sparklineDataPoints.length - 1;

      let nextDataPoint = sparklineDataPoints.find((entry) => {
        return entry.x >= mouseX;
      });

      if (!nextDataPoint) {
        nextDataPoint = sparklineDataPoints[lastItemIndex];
      }

      const previousDataPoint = sparklineDataPoints[sparklineDataPoints.indexOf(nextDataPoint) - 1];
      let currentDataPoint: Point<TData>;
      let halfway;

      if (previousDataPoint) {
        halfway = previousDataPoint.x + (nextDataPoint.x - previousDataPoint.x) / 2;
        currentDataPoint = mouseX >= halfway ? nextDataPoint : previousDataPoint;
      } else {
        currentDataPoint = nextDataPoint;
      }

      const index = sparklineDataPoints.indexOf(currentDataPoint);
      setActiveIndex(index);
      setActiveEntry(data.sparklineData.map((d) => d.childData[index]));
      setCoords({ x: event.offsetX, y: event.offsetY });
    },
    [data],
  );

  const resetCoords = useCallback(() => {
    setActiveIndex(null);
    setCoords({ x: 0, y: 0 });
  }, []);

  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (onMouseMove && activeEntry) onMouseMove(event, { activeIndex, activeEntry });
    },
    [onMouseMove],
  );

  const mouseEnter = useCallback(
    (event: MouseEvent) => {
      if (onMouseEnter && activeEntry) onMouseEnter(event, { activeIndex, activeEntry });
    },
    [onMouseEnter],
  );

  const mouseLeave = useCallback(
    (event: MouseEvent) => {
      if (onMouseLeave && activeEntry) onMouseLeave(event, { activeIndex, activeEntry });
    },
    [onMouseLeave],
  );

  const click = useCallback(
    (event: MouseEvent) => {
      if (onClick && activeEntry) onClick(event, { activeIndex, activeEntry });
    },
    [onClick],
  );

  useEffect(() => {
    ref.current?.addEventListener("mousemove", calculateCoords);
    return () => {
      ref.current?.removeEventListener("mousemove", calculateCoords);
    };
  }, [ref, calculateCoords]);

  useEffect(() => {
    ref.current?.addEventListener("mouseleave", resetCoords);
    return () => ref.current?.removeEventListener("mouseleave", resetCoords);
  }, [ref]);

  useEffect(() => {
    if (onMouseMove) {
      ref.current?.addEventListener("mousemove", mouseMove);
      return ref.current?.removeEventListener("mousemove", mouseMove);
    }
  }, [ref, mouseMove]);

  useEffect(() => {
    if (onMouseEnter) {
      ref.current?.addEventListener("mouseenter", mouseEnter);
      return ref.current?.removeEventListener("mouseenter", mouseEnter);
    }
  }, [ref, mouseEnter]);

  useEffect(() => {
    if (onMouseLeave) {
      ref.current?.addEventListener("mouseleave", mouseLeave);
      return ref.current?.removeEventListener("mouseleave", mouseLeave);
    }
  }, [ref, mouseLeave]);

  useEffect(() => {
    if (onClick) {
      ref.current?.addEventListener("click", click);
      return ref.current?.removeEventListener("click", click);
    }
  }, [ref, click]);

  return {
    coords,
    activeIndex,
    activeEntry,
  };
};
