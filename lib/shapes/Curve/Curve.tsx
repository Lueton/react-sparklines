import * as d3 from "d3";

import { filterProps } from "../../utils/react-utils.ts";
import { CurveProps } from "../../utils/types.ts";

export const Curve = <TData,>({
  curve,
  connectNulls,
  data,
  reverse,
  ...rest
}: CurveProps<TData>) => {
  if (!data) return null;
  const { axis, points, pointsDefined } = data;
  const { getX, getY } = axis;
  const defined = ([x, y]: [number | null, number | number[] | null]) => typeof x === "number" && (typeof y === "number" || Array.isArray(y));
  const curveBaseFun = d3
    .line<[number, number | number[] | null]>()
    .defined(defined)
    .x((d) => getX(d[0]))
    .y((d) => {
      const y = getY(d[1]);
      return Array.isArray(y) ? y[reverse ? 0 : 1] : y;
    });
  const svgProps = {
    ...filterProps(rest, false),
  };

  let curveFun;
  if (curve == null) {
    curveFun = curveBaseFun.curve(d3.curveLinear);
  } else if (typeof curve === "number") {
    curveFun = curveBaseFun.curve(d3.curveCatmullRom.alpha(curve));
  } else {
    curveFun = curveBaseFun.curve(d3.curveMonotoneX);
  }

  const curvePath = curveFun(connectNulls ? pointsDefined : points) || "";
  return <path d={curvePath} {...svgProps} />;
};
