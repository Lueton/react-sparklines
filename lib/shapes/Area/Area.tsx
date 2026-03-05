import * as d3 from "d3";

import { filterProps } from "../../utils/react-utils.ts";
import { AreaProps } from "../../utils/types.ts";

export const Area = <TData,>({
  height,
  margin,
  curve,
  connectNulls,
  zeroBaseline,
  data,
  ...rest
}: AreaProps<TData>) => {
  if (!data) return null;

  const { axis, points, pointsDefined } = data;
  const { getX, getY, yAxis } = axis;
  const { domain, range } = yAxis;
  const defined = ([x, y]: [number | null, number | null | number[]]) =>
    typeof x === "number" && (typeof y === "number" || Array.isArray(y));
  const yScale = d3.scaleLinear(domain, range);
  const coords: [number, number | null | number[]][] = points;
  const coordsDefined = pointsDefined;
  const svgProps = {
    ...filterProps(rest, false),
  };
  const areaBaseFun = d3
    .area<[number, number | null | number[]]>()
    .defined(defined)
    .x((d) => getX(d[0]))
    .y1((d) => Array.isArray(getY(d[1])) ? (getY(d[1]) as number[])[1] : getY(d[1]) as number)
    .y0((d) =>
      Array.isArray(getY(d[1])) ? (getY(d[1]) as number[])[0] : zeroBaseline ? yScale(0) : height - margin.bottom,
    );

  let areaFun;
  if (curve == null) {
    areaFun = areaBaseFun.curve(d3.curveLinear);
  } else if (typeof curve === "number") {
    areaFun = areaBaseFun.curve(d3.curveCatmullRom.alpha(curve));
  } else {
    areaFun = areaBaseFun.curve(d3.curveMonotoneX);
  }

  const areaPath = areaFun(connectNulls ? coordsDefined : coords) || "";
  return <path d={areaPath} {...svgProps} />;
};
