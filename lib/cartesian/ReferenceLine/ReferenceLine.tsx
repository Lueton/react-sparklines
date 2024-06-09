import { isNumber } from "lodash";

import { filterProps } from "../../utils/react-utils.ts";
import { ReferenceLineProps } from "../../utils/types.ts";

export const ReferenceLine = <TData,>({ x, y, data, ...rest }: ReferenceLineProps<TData>) => {
  if (!data) return null;
  const { axis, entries } = data;
  const { min, max, getX, getY } = axis;

  const getPoints = () => {
    if (isNumber(y)) {
      return {
        x1: getX(0),
        y1: getY(y),
        x2: getX(entries.length - 1),
        y2: getY(y),
      };
    } else if (isNumber(x)) {
      return {
        x1: getX(x),
        y1: getY(min),
        x2: getX(x),
        y2: getY(max),
      };
    } else {
      return {
        x1: getX(0),
        y1: getY(0),
        x2: getX(0),
        y2: getY(0),
      };
    }
  };

  const { x1, y1, x2, y2 } = getPoints();
  const lineProps = {
    fill: "none",
    stroke: "#000",
    fillOpacity: 1,
    strokeWidth: 1,
    position: "middle",
    ...filterProps(rest, false),
    x1,
    y1,
    x2,
    y2,
  };

  return <line {...lineProps} />;
};
