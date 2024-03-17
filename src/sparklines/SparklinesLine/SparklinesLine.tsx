import { Line } from "../../cartesian"
import { LineShapeProps, SparklinesComposedProps, SparklinesLineProps } from "../../utils/types.ts"
import { SparklinesComposed } from "../SparklinesComposed"

export const SparklinesLine = ({
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
  connectNulls,
  name,
  label,
  clip,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...rest
}: SparklinesLineProps) => {
  const composedProps: SparklinesComposedProps = {
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
    connectNulls,
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
