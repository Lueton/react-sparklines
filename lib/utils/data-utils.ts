import { ReactElement } from "react";

import { DEFAULT_COLOR } from "./defaults.ts";
import { Axis, DataKey, Points } from "./types.ts";
import { getValueByDataKey } from "./utils.ts";

export const getMainColorByElement = (element: ReactElement) => {
  const { stroke, fill } = element.props;
  const {
    type: { displayName },
  } = element as any;

  switch (displayName) {
    case "Line":
      if (stroke && stroke !== "none" && stroke !== "transparent") return stroke;
      if (fill && fill[0] !== "u") return fill;
      return DEFAULT_COLOR;
    case "Bar":
      if (fill && fill !== "none" && fill !== "transparent" && fill[0] !== "u") return fill;
      return stroke || DEFAULT_COLOR;
    default:
      return DEFAULT_COLOR;
  }
};

export const getPoints =<TData> (data: readonly any[], dataKey : DataKey, axis: Axis) : Points<TData> => {
  const {xFactor, margin, min, max, disableBarAdjustment, yFactor, limit} = axis;
  const len = data.length;

  if (limit && limit < len) {
    data = data.slice(len - limit);
  }

  const seriesData = data.map((d) => getValueByDataKey(d, dataKey, 0))
  return seriesData.map((d, i) => ({
    x: i * xFactor + margin.left + (disableBarAdjustment ? 0 : xFactor / 2),
    y: (max === min ? 1 : max - d) * yFactor + margin.top,
    value: d,
  })).map((d, i) => ({
    ...d,
    entry: data[i],
  }));
}
