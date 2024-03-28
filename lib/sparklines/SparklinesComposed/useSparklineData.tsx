import { get, isNumber } from "lodash";

import { Bar, Line } from "../../cartesian";
import { getDataPoints, getMainColorByElement } from "../../utils/data-utils.ts";
import { DEFAULT_COLOR } from "../../utils/defaults.ts";
import { findAllByType } from "../../utils/react-utils.ts";
import {
  SparklineChildData,
  UseSparklineData,
  UseSparklineDataProps,
} from "./../../utils/types.ts";

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
  startAtZero
}: UseSparklineDataProps): UseSparklineData<TData> => {
  const sparklineChildren = findAllByType(children, [Line, Bar]);

  if (!data.length)
    return {
      originalData: data,
      sparklineData: sparklineChildren.map(() => ({
        childData: [],
        dataKey: "value",
        points: [],
        color: DEFAULT_COLOR,
      })),
      dataKeys: sparklineChildren.map(() => "value"),
      labels: [],
    };

  const isSingleNumericData = isNumber(data[0]);
  const objectifiedData = isSingleNumericData ? data.map((value) => ({ value: value })) : data;
  const dataKeys = sparklineChildren.map((child) => child.props.dataKey || "value");
  const sparklineData: SparklineChildData<TData>[] = sparklineChildren.map((child, childIndex) => {
    const color = child.props.labelColor || getMainColorByElement(child);
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
      startAtZero
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

  const labels = objectifiedData.map((entry) => get(entry, "name"));

  return {
    originalData: data,
    sparklineData,
    dataKeys,
    labels,
  };
};
