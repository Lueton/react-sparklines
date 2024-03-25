import { Bar } from "../../cartesian";
import { BarShapeProps, SparklinesBarProps, SparklinesComposedProps } from "../../utils/types.ts";
import { SparklinesComposed } from "../SparklinesComposed";

export const SparklinesBar = <TData,>({
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
  ...rest
}: SparklinesBarProps<TData>) => {
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
    <SparklinesComposed {...composedProps}>
      <Bar {...barProps} />
      {children}
    </SparklinesComposed>
  );
};
