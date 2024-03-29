import { get, isNumber } from "lodash";

import { getMainColorByElement, getPoints } from "../../utils/data-utils.ts";
import { DEFAULT_COLOR } from "../../utils/defaults.ts";
import { findAllByType } from "../../utils/react-utils.ts";
import { getMargin, getValueByDataKey } from "../../utils/utils.ts";
import {
  Axes,
  Axis,
  SparklineChildData,
  UseSparklineData,
  UseSparklineDataProps,
} from "./../../utils/types.ts";
import { ALLOWED_SPARKLINE_CHILDREN } from "./SparklinesComposed.tsx";

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
  startAtZero,
}: UseSparklineDataProps): UseSparklineData<TData> => {
  const isSingleNumericData = isNumber(data[0]);
  const objectifiedData = isSingleNumericData ? data.map((value) => ({ value: value })) : data;
  const sparklineChildren = findAllByType(children, ALLOWED_SPARKLINE_CHILDREN);

  const getAxisData = (axisId: string | number): Axis => {
    const len = data.length;
    const margins = getMargin(margin || 0);

    const combinedChildrenData: number[] = [];

    sparklineChildren.forEach((child) => {
      const { axis = 0, dataKey = "value" } = child.props;
      if (axis === axisId)
        combinedChildrenData.push(...objectifiedData.map((d) => getValueByDataKey(d, dataKey, 0)));
    });

    const axisMax = max ?? Math.max(...combinedChildrenData);
    const axisMin =
      min ??
      (startAtZero ? Math.min(0, ...combinedChildrenData) : Math.min(...combinedChildrenData));

    return {
      id: axisId,
      yFactor: (height - (margins.top + margins.bottom)) / (axisMax - axisMin || 2),
      xFactor:
        (width - (margins.left + margins.right)) /
        ((limit || len) - (len > 1 && disableBarAdjustment ? 1 : 0)),
      limit,
      width,
      height,
      margin: margins,
      min: axisMin,
      max: axisMax,
      startAtZero,
      disableBarAdjustment,
    };
  };

  if (!data.length)
    return {
      originalData: data,
      sparklineData: sparklineChildren.map(() => ({
        childData: [],
        dataKey: "value",
        points: [],
        color: DEFAULT_COLOR,
        axis: getAxisData(0),
      })),
      dataKeys: sparklineChildren.map(() => "value"),
      labels: [],
      axes: {},
    };

  const dataKeys = sparklineChildren.map((child) => child.props.dataKey || "value");

  const axesIds = sparklineChildren.map((child) => child.props.axis || 0);
  const axes: Axes = axesIds
    .map((axis) => getAxisData(axis))
    .reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue;
    }, {} as Axes);

  const sparklineData: SparklineChildData<TData>[] = sparklineChildren.map((child, childIndex) => {
    const { labelColor, axis = 0, dataKey = "value" } = child.props;
    const color = labelColor || getMainColorByElement(child);
    const axisOfChild = axes[axis];
    const childPoints = getPoints<TData>(objectifiedData, dataKey, axisOfChild);
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
      axis: axisOfChild,
    };
  });

  const labels = objectifiedData.map((entry) => get(entry, "name"));

  return {
    originalData: data,
    sparklineData,
    dataKeys,
    labels,
    axes,
  };
};
