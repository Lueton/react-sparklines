import * as d3 from "d3";

import { filterProps } from "../../utils/react-utils.ts";
import { RectProps } from "../../utils/types.ts";
import { getRectanglePath } from "../../utils/utils.ts";

const isPercent = (value: string | number): value is `${number}%` =>
  typeof value === "string" && value.indexOf("%") === value.length - 1;

const getPercentValue = (percent: number | string, bandSize: number, defaultValue = 0) => {
  if (typeof percent !== "number" && typeof percent !== "string") {
    return defaultValue;
  }

  let value: number;

  if (isPercent(percent)) {
    const index = percent.indexOf("%");
    value = (bandSize * parseFloat((percent as string).slice(0, index))) / 100;
  } else {
    value = +percent;
  }

  if (isNaN(value)) {
    value = defaultValue;
  }

  if (value > bandSize) {
    value = bandSize;
  }

  return value;
};

export const Rect = <TData,>({
  height,
  margin,
  barWidth,
  maxBarWidth,
  radius = 0,
  zeroBaseline,
  data,
  barGap = "10%",
  point,
  ...rest
}: RectProps<TData>) => {
  if (!data || !point) return null;
  const { axis } = data;
  const { yAxis, xAxis } = axis;
  const { domain: yDomain, range: yRange } = yAxis;
  const { domain: xDomain, range: xRange } = xAxis;
  const xScale = d3.scaleBand(xDomain, xRange);
  const yScale = d3.scaleLinear(yDomain, yRange);
  const realBarGap = getPercentValue(barGap, xScale.bandwidth(), 0);
  const suggestedWidth = xScale.bandwidth() - realBarGap;

  let realBarWidth: number;
  if (barWidth != null) {
    realBarWidth = Math.min(barWidth, xScale.bandwidth());
  } else {
    realBarWidth = typeof maxBarWidth === "number" ? Math.min(suggestedWidth, maxBarWidth) : suggestedWidth;
  }

  const [x, y] = point;
  if (y == null) return null;
  const rectPath = getRectanglePath(
    (xScale(x) || 0) + (xScale.bandwidth() / 2 - realBarWidth / 2),
    zeroBaseline ? yScale(Math.max(0, y)) : yScale(y),
    realBarWidth,
    zeroBaseline ? Math.abs(yScale(y) - yScale(0)) : height - yScale(y) - margin.bottom,
    radius,
  );

  const svgProps = {
    ...filterProps(rest, false),
  };

  return <path d={rectPath} {...svgProps} />;
};
