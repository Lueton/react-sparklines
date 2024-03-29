import { isNumber } from "lodash";

import { filterProps } from "../../utils/react-utils.ts";
import { Axis, ReferenceLineProps } from "../../utils/types.ts";

export const ReferenceLine = <TData,>(props: ReferenceLineProps<TData>) => {
  const { x, y, axis = 0, sparklineData, disableBarAdjustment } = props;

  if (!sparklineData || !sparklineData.axes[axis]) return null;
  const { xFactor, yFactor, margin, limit, max, min }: Axis = sparklineData.axes[axis];

  const getPoints = () => {
    if (isNumber(y)) {
      return {
        x1: margin.left + (disableBarAdjustment ? 0 : xFactor / 2),
        y1: (max === min ? 1 : max - y) * yFactor + margin.top,
        x2:
          (limit || sparklineData.originalData.length - 1 || 0) * xFactor +
          margin.left +
          (disableBarAdjustment ? 0 : xFactor / 2),
        y2: (max === min ? 1 : max - y) * yFactor + margin.top,
      };
    } else if (isNumber(x)) {
      return {
        x1: x * xFactor + margin.left + (disableBarAdjustment ? 0 : xFactor / 2),
        y1: (max === min ? 1 : max) * yFactor + margin.top,
        x2: x * xFactor + margin.left + (disableBarAdjustment ? 0 : xFactor / 2),
        y2: (max === min ? 1 : min) * yFactor + margin.top,
      };
    } else {
      return {
        x1: margin.left + (disableBarAdjustment ? 0 : xFactor / 2),
        y1: (max === min ? 1 : max) * yFactor + margin.top,
        x2:
          (limit || sparklineData.originalData.length - 1 || 0) * xFactor +
          margin.left +
          (disableBarAdjustment ? 0 : xFactor / 2),
        y2: (max === min ? 1 : max) * yFactor + margin.top,
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
    ...filterProps(props, false),
    x1,
    y1,
    x2,
    y2,
  };

  return <line {...lineProps} />;
};
