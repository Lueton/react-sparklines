import { useCallback, useEffect, useState } from "react";

import { isChildOfType } from "../../utils/react-utils.ts";
import { SparklineDataEntry, UseInteractivityProps } from "./../../utils/types.ts";
import { ALLOWED_TOOLTIP_CHILDREN } from "./SparklinesComposed.tsx";

export const useInteractivity = <TData,>({
  ref,
  data,
  children,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
}: UseInteractivityProps<TData>) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeEntry, setActiveEntry] = useState<null | SparklineDataEntry<TData>[]>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const calculateCoords = useCallback(
    (event: MouseEvent) => {
      if (!data.originalData.length) return;

      const sparklineCoords = data.sparklines[0].coords;

      const mouseX = event.offsetX;
      const lastItemIndex = sparklineCoords.length - 1;

      let nextDataPoint = sparklineCoords.find((entry) => {
        return entry[0] >= mouseX;
      });

      if (!nextDataPoint) {
        nextDataPoint = sparklineCoords[lastItemIndex];
      }

      const previousDataPoint = sparklineCoords[sparklineCoords.indexOf(nextDataPoint) - 1];
      let currentDataPoint;
      let halfway;

      if (previousDataPoint) {
        halfway = previousDataPoint[0] + (nextDataPoint[0] - previousDataPoint[0]) / 2;
        currentDataPoint = mouseX >= halfway ? nextDataPoint : previousDataPoint;
      } else {
        currentDataPoint = nextDataPoint;
      }

      const index = sparklineCoords.indexOf(currentDataPoint);
      setActiveIndex(index);
      const newActiveEntries: SparklineDataEntry<TData>[] = [];
      data.sparklines.forEach((d, i) => {
        if (isChildOfType(children[i], ALLOWED_TOOLTIP_CHILDREN)) {
          newActiveEntries.push(d.entries[index]);
        }
      });
      setActiveEntry(newActiveEntries);
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
    [onMouseMove, activeEntry, activeIndex],
  );

  const mouseEnter = useCallback(
    (event: MouseEvent) => {
      if (onMouseEnter && activeEntry) onMouseEnter(event, { activeIndex, activeEntry });
    },
    [onMouseEnter, activeEntry, activeIndex],
  );

  const mouseLeave = useCallback(
    (event: MouseEvent) => {
      if (onMouseLeave && activeEntry) onMouseLeave(event, { activeIndex, activeEntry });
    },
    [onMouseLeave, activeEntry, activeIndex],
  );

  const click = useCallback(
    (event: MouseEvent) => {
      if (onClick && activeEntry) onClick(event, { activeIndex, activeEntry });
    },
    [onClick, activeEntry, activeIndex],
  );

  useEffect(() => {
    ref.current?.addEventListener("mousemove", calculateCoords);
    return () => ref.current?.removeEventListener("mousemove", calculateCoords);
  }, [ref, calculateCoords]);

  useEffect(() => {
    ref.current?.addEventListener("mouseleave", resetCoords);
    return () => ref.current?.removeEventListener("mouseleave", resetCoords);
  }, [ref]);

  useEffect(() => {
    if (onMouseMove) {
      ref.current?.addEventListener("mousemove", mouseMove);
      return () => ref.current?.removeEventListener("mousemove", mouseMove);
    }
  }, [ref, mouseMove]);

  useEffect(() => {
    if (onMouseEnter) {
      ref.current?.addEventListener("mouseenter", mouseEnter);
      return () => ref.current?.removeEventListener("mouseenter", mouseEnter);
    }
  }, [ref, mouseEnter]);

  useEffect(() => {
    if (onMouseLeave) {
      ref.current?.addEventListener("mouseleave", mouseLeave);
      return () => ref.current?.removeEventListener("mouseleave", mouseLeave);
    }
  }, [ref, mouseLeave]);

  useEffect(() => {
    if (onClick) {
      ref.current?.addEventListener("click", click);
      return () => ref.current?.removeEventListener("click", click);
    }
  }, [ref, click]);

  return {
    coords,
    activeIndex,
    activeEntry,
  };
};
