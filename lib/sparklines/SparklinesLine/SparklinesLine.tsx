import { ForwardedRef, forwardRef } from "react";

import { Line } from "../../cartesian";
import {
  LineShapeExtraProps,
  SparklinesComposedProps,
  SparklinesLineProps,
} from "../../utils/types.ts";
import { SparklinesComposed } from "../SparklinesComposed";

const SparklinesLineInner = <TData,>(
  {
    height,
    max,
    width,
    withBarAdjustment,
    children,
    preserveAspectRatio,
    min,
    margin,
    limit,
    style,
    data,
    dataKey,
    dots,
    curved,
    activeDot,
    name,
    label,
    clip,
    labelColor,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
    startAtZero,
    zeroBaseline,
    connectNulls,
    ...rest
  }: SparklinesLineProps<TData>,
  ref: ForwardedRef<SVGRectElement>,
) => {
  const composedProps: SparklinesComposedProps<TData> = {
    clip,
    label,
    max,
    width,
    withBarAdjustment,
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
    zeroBaseline,
  };

  const lineProps: LineShapeExtraProps = {
    name,
    style,
    activeDot,
    dots,
    curved,
    dataKey,
    labelColor,
    connectNulls,
    ...rest,
  };

  return (
    <SparklinesComposed {...composedProps} ref={ref}>
      <Line {...lineProps} />
      {children}
    </SparklinesComposed>
  );
};

export const SparklinesLine = forwardRef(SparklinesLineInner) as <TData>(
  props: SparklinesLineProps<TData> & { ref?: ForwardedRef<SVGRectElement> },
) => ReturnType<typeof SparklinesLineInner>;
