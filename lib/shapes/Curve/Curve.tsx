import * as d3 from "d3";
import { isNil, isNumber } from "lodash";

import { filterProps } from "../../utils/react-utils.ts";
import { CurveProps } from "../../utils/types.ts";

export const Curve = <TData,>({ curve, connectNulls, data, ...rest }: CurveProps<TData>) => {
  if (!data) return null;
  const { axis, points, pointsDefined } = data;
  const { getX, getY } = axis;
  const defined = ([x, y]: [number | null, number | null]) => isNumber(x) && isNumber(y);
  const curveBaseFun = d3
    .line<[number, number | null]>()
    .defined(defined)
    .x((d) => getX(d[0]))
    .y((d) => getY(d[1]));
  const svgProps = {
    ...filterProps(rest, false),
  };

  let curveFun;
  if (isNil(curve)) {
    curveFun = curveBaseFun.curve(d3.curveLinear);
  } else if (isNumber(curve)) {
    curveFun = curveBaseFun.curve(d3.curveCatmullRom.alpha(curve));
  } else {
    curveFun = curveBaseFun.curve(d3.curveMonotoneX);
  }

  const curvePath = curveFun(connectNulls ? pointsDefined : points) || "";
  return <path d={curvePath} {...svgProps} />;
};
