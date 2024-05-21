import { Line } from "../../cartesian";
import {
  LineShapeExtraProps,
  SparklinesComposedProps,
  SparklinesLineProps,
} from "../../utils/types.ts";
import { SparklinesComposed } from "../SparklinesComposed";

export const SparklinesLine = <TData,>({
  height,
  max,
  width,
  disableBarAdjustment = true,
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
  ref,
  ...rest
}: SparklinesLineProps<TData>) => {
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

  const lineProps: LineShapeExtraProps = {
    name,
    style,
    activeDot,
    dots,
    curved,
    dataKey,
    labelColor,
    ...rest,
  };

  return (
    <SparklinesComposed {...composedProps} ref={ref}>
      <Line {...lineProps} />
      {children}
    </SparklinesComposed>
  );
};
