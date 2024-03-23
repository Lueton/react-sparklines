import { Line } from "../../cartesian"
import { LineShapeProps, SparklinesComposedProps, SparklinesLineProps } from "../../utils/types.ts"
import { SparklinesComposed } from "../SparklinesComposed"

export const SparklinesLine = <TData,> ({
  height,
  max,
  width,
  disableBarAdjustment = true,
  children,
  color,
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
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...rest
}: SparklinesLineProps<TData>) => {
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

  const lineProps: LineShapeProps = {
    name,
    style,
    color,
    activeDot,
    dots,
    curved,
    dataKey,
  }

  return (
    <SparklinesComposed {...composedProps} {...rest}>
      <Line {...lineProps} />
      {children}
    </SparklinesComposed>
  )
}
