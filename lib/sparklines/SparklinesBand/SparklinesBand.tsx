import { ForwardedRef, forwardRef } from "react";

import { Band } from "../../cartesian";
import {
  BandShapeExtraProps,
  SparklinesBandProps,
  SparklinesComposedProps,
  SparklinesLineProps,
} from "../../utils/types.ts";
import { SparklinesComposed } from "../SparklinesComposed";

const SparklinesBandInner = <TData,>(
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
  }: SparklinesBandProps<TData>,
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

  const bandProps: BandShapeExtraProps = {
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
      <Band {...bandProps} />
      {children}
    </SparklinesComposed>
  );
};

export const SparklinesBand = forwardRef(SparklinesBandInner) as <TData>(
  props: SparklinesLineProps<TData> & { ref?: ForwardedRef<SVGRectElement> },
) => ReturnType<typeof SparklinesBandInner>;
