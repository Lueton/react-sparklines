import { Bar } from "../../cartesian"
import { BarShapeProps, SparklinesBarProps, SparklinesComposedProps } from "../../utils/types.ts"
import { SparklinesComposed } from "../SparklinesComposed"

export const SparklinesBar = <TData,> ({
  height,
  activeBar,
  barWidth,
  maxBarWidth,
  max,
  width,
  disableBarAdjustment,
  children,
  radius,
  color,
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
  onClick,
  ...rest
}: SparklinesBarProps<TData>) => {
  const composedProps: SparklinesComposedProps<TData> = {
    clip,
    label,
    color,
    max,
    width,
    disableBarAdjustment,
    data,
    style,
    height,
    margin,
    limit,
    preserveAspectRatio,
    min,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }

  const barProps: BarShapeProps = {
    dataKey,
    color,
    style,
    name,
    activeBar,
    barWidth,
    maxBarWidth,
    radius,
  }

  return (
    <SparklinesComposed {...composedProps} {...rest}>
      <Bar {...barProps} />
      {children}
    </SparklinesComposed>
  )
}
