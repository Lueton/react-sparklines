import { ForwardedRef, forwardRef } from "react";

import { Bar } from "../../cartesian";
import { BarShapeProps, SparklinesBarProps, SparklinesComposedProps } from "../../utils/types.ts";
import { SparklinesComposed } from "../SparklinesComposed";

const SparklinesBarInner = <TData,>(
  {
    height,
    activeBar,
    barWidth,
    maxBarWidth,
    max,
    width,
    disableBarAdjustment,
    children,
    radius,
    preserveAspectRatio,
    min,
    margin,
    limit,
    style,
    data,
    dataKey,
    clip,
    name,
    label,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    labelColor,
    onClick,
    startAtZero,
    ...rest
  }: SparklinesBarProps<TData>,
  ref: ForwardedRef<SVGRectElement>,
) => {
  const composedProps: SparklinesComposedProps<TData> = {
    clip,
    label,
    max,
    width,
    disableBarAdjustment,
    data,
    height,
    margin,
    limit,
    preserveAspectRatio,
    min,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
    startAtZero,
  };

  const barProps: BarShapeProps = {
    dataKey,
    style,
    name,
    activeBar,
    barWidth,
    maxBarWidth,
    radius,
    labelColor,
    ...rest,
  };

  return (
    <SparklinesComposed {...composedProps} ref={ref}>
      <Bar {...barProps} />
      {children}
    </SparklinesComposed>
  );
};

export const SparklinesBar = forwardRef(SparklinesBarInner) as <TData>(
  props: SparklinesBarProps<TData> & { ref?: ForwardedRef<SVGRectElement> },
) => ReturnType<typeof SparklinesBarInner>;
