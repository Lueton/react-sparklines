import { get, isNumber } from "lodash";
import { ReactElement } from "react";

import { getDataPoints } from "../../utils/data-utils.ts";
import { findAllByType } from "../../utils/react-utils.ts";
import { Bar, Line } from "./../../cartesian";
import {
  SparklineChildData,
  UseSparklineData,
  UseSparklineDataProps,
} from "./../../utils/types.ts";

const getMainColor = (element: ReactElement) => {
  const { style, color } = element.props;
  const {
    type: { displayName },
  } = element as any;

  switch (displayName) {
    case "Line":
      return color || style?.stroke || "slategray";
    case "Bar":
      return (
        color ||
        (style?.fill && style?.fill !== "transparent") ||
        (style?.stroke && style?.stroke !== "transparent") ||
        "slategray"
      );
    default:
      return "slategray";
  }
};

export const useSparklineData = <TData,>({
  data,
  children,
  max,
  min,
  margin,
  disableBarAdjustment,
  width,
  height,
  limit,
}: UseSparklineDataProps): UseSparklineData<TData> => {
  const sparklineChildren = findAllByType(children, [Line, Bar]);

  if (!data.length)
    return {
      originalData: data,
      sparklineData: sparklineChildren.map(() => ({
        childData: [],
        dataKey: "value",
        points: [],
        color: "slategray",
      })),
      dataKeys: sparklineChildren.map(() => "value"),
      labels: []
    };

  const isSingleNumericData = isNumber(data[0]);
  const objectifiedData = isSingleNumericData ? data.map((value) => ({ value: value })) : data;
  const dataKeys = sparklineChildren.map((child) => child.props.dataKey || "value");
  const sparklineData: SparklineChildData<TData>[] = sparklineChildren.map((child, childIndex) => {
    const color = getMainColor(child);
    const childPoints = getDataPoints<TData>({
      data: objectifiedData,
      dataKey: dataKeys[childIndex],
      height,
      margin,
      max,
      min,
      width,
      disableBarAdjustment,
      limit,
    });

    const childData = objectifiedData.map((_entry, dataIndex) => {
      const { value, x, y } = childPoints[dataIndex];

      return {
        index: dataIndex,
        dataKey: dataKeys[childIndex],
        value,
        x,
        y,
        entry: data[childIndex],
        color,
      };
    });

    return {
      points: childPoints,
      childData,
      dataKey: dataKeys[childIndex],
      color,
    };
  });

  const labels = objectifiedData.map((entry) => get(entry, "name"))

  return {
    originalData: data,
    sparklineData,
    dataKeys,
    labels
  };
};
