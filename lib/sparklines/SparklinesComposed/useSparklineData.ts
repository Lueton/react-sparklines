import * as d3 from "d3";
import { get, isNil, isNumber } from "lodash";
import { ReactElement } from "react";

import { getMainColorByElement } from "../../utils/data-utils.ts";
import { findAllByType } from "../../utils/react-utils.ts";
import {
  Axes,
  Axis,
  DataKey,
  Margin,
  ShapeProps,
  SparklineData,
  SparklineDataEntry,
  UseSparklineData,
  UseSparklineDataProps,
} from "../../utils/types.ts";
import { getValueByDataKey } from "../../utils/utils.ts";
import { ALLOWED_SPARKLINE_CHILDREN } from "./SparklinesComposed.tsx";

const getObjectifiedData = <TData>(data: TData[]) => {
  const isNumericData = data.some((v) => isNumber(v));
  return isNumericData ? data.map((value) => ({ value: value })) : data;
};

const getDataKeys = (children: any[]) => {
  return children.map((child) => child.props.dataKey || "value") as DataKey[];
};

const getCombinedChildrenData = (axisId: string | number, children: any[], data: any[]) => {
  const combinedChildrenData: number[] = [];
  children.forEach((child) => {
    const { axis = 0, dataKey = "value" } = child.props;
    if (axis === axisId)
      combinedChildrenData.push(...data.map((d) => getValueByDataKey(d, dataKey, 0)));
  });
  return combinedChildrenData;
};

const filterEmptyY = (point: [number, number | null]): point is [number, number] => {
  return isNumber(point[1]);
};

const getAxis = (
  id: string | number,
  children: any[],
  data: any[],
  max: number | undefined | null,
  min: number | undefined | null,
  startAtZero: boolean | undefined | null,
  withBarAdjustment: boolean | undefined | null,
  height: number,
  width: number,
  margin: Margin,
): Axis => {
  const combinedChildrenData: number[] = getCombinedChildrenData(id, children, data);
  const axisMin =
    min ?? (startAtZero ? Math.min(0, ...combinedChildrenData) : Math.min(...combinedChildrenData));
  const axisMax = max ?? Math.max(...combinedChildrenData);

  const xDomain = withBarAdjustment ? data.map((_p, i) => i) : [0, data.length - 1];
  const xRange = [margin.left, width - margin.right];

  const yDomain = [axisMin, axisMax];
  const yRange = [height - margin.bottom, margin.top];

  const xScale = d3.scaleLinear(xDomain, xRange);
  const xScaleWithBarAdjustment = d3.scaleBand(xDomain, xRange);
  const yScale = d3.scaleLinear(yDomain, yRange);

  const getX = withBarAdjustment
    ? (x: number) => (xScaleWithBarAdjustment(x) || 0) + xScaleWithBarAdjustment.bandwidth() / 2
    : (x: number) => xScale(x);
  const getY = (y: number | null) => yScale(y || 0);
  const getPoint = (point: [number, number | null]): [number, number] => [
    getX(point[0]),
    getY(point[1]),
  ];

  return {
    id,
    min: axisMin,
    max: axisMax,
    xAxis: {
      domain: xDomain,
      range: xRange,
    },
    yAxis: {
      domain: yDomain,
      range: yRange,
    },
    getX,
    getY,
    getPoint,
  };
};

const getSparklineChildData = <TData>(
  child: ReactElement<ShapeProps>,
  originalData: TData[],
  data: any[],
  axes: Axes,
): SparklineData<TData> => {
  const { labelColor, axis: _axis = 0, dataKey = "value" } = child.props;
  const color = labelColor || getMainColorByElement(child);
  const axis = axes[_axis];
  const entries: SparklineDataEntry<TData>[] = originalData.map((entry, index) => ({
    original: entry,
    index,
    color,
    dataKey,
    label: get(data[index], "name"),
    x: index,
    y: get(data[index], dataKey),
  }));
  const values: (number | null)[] = entries.map((entry) => entry.y);
  const points: [number, number | null][] = entries.map((entry) => [entry.x, entry.y]);
  const pointsDefined: [number, number][] = points.filter(filterEmptyY);
  const coords: [number, number][] = points.map((point) => axis.getPoint(point));

  return {
    color,
    axis,
    dataKey,
    entries,
    values,
    points,
    pointsDefined,
    coords,
  };
};

export const useSparklineData = <TData>({
  originalData,
  children,
  min,
  max,
  startAtZero,
  withBarAdjustment,
  height,
  width,
  margin,
  zeroBaseline,
  limit,
}: UseSparklineDataProps): UseSparklineData<TData> => {
  const limitedData = isNil(limit) ? originalData : originalData.slice(originalData.length - limit);

  /*  const validSparklineChildren: DetailedReactHTMLElement<
    ComponentProps<
      | (<TData>(props: LineProps<TData>) => null | JSX.Element)
      | (<TData>(props: BarProps<TData>) => null | JSX.Element)
      | (<TData>({ x, y, data, ...rest }: ReferenceLineProps<TData>) => null | JSX.Element)
    >,
    HTMLElement
  >[] = findAllByType(children, ALLOWED_SPARKLINE_CHILDREN);*/

  const validSparklineChildren = findAllByType(children, ALLOWED_SPARKLINE_CHILDREN);

  const dataKeys = getDataKeys(validSparklineChildren);

  const data = getObjectifiedData<TData>(limitedData);

  const labels = limitedData.map((entry) => get(entry, "name"));

  const axesIds = validSparklineChildren.map((child) => child.props.axis || 0);
  const axes: Axes = axesIds
    .map((axisId) =>
      getAxis(
        axisId,
        validSparklineChildren,
        data,
        max,
        min,
        startAtZero,
        withBarAdjustment,
        height,
        width,
        margin,
      ),
    )
    .reduce((previousValue, currentValue) => {
      previousValue[currentValue.id] = currentValue;
      return previousValue;
    }, {} as Axes);

  const sparklines = validSparklineChildren.map((child) =>
    getSparklineChildData<TData>(child, limitedData, data, axes),
  );

  return {
    originalData,
    dataKeys,
    labels,
    axes: axes,
    options: {
      height,
      width,
      min,
      max,
      startAtZero,
      withBarAdjustment,
      margin,
      zeroBaseline,
      limit,
    },
    sparklines,
  };
};
