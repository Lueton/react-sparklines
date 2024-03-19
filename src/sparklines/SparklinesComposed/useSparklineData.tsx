import { isNumber } from "lodash";

import { getDataPoints } from "../../utils/data-utils.ts";
import { findAllByType } from "../../utils/react-utils.ts";
import { DataKey, Points, SparklinesMargin } from "./../../utils/types.ts";
import { Line, Bar } from "./../../cartesian";

export interface SparklineChildDataEntry {
  dataKey: DataKey;
  x: number;
  y: number;
  value: number;
  index: number;
  entry: any;
}

interface SparklineChildData {
  dataKey: DataKey;
  childData: SparklineChildDataEntry[];
  points: Points;
}

export interface UseSparklineData {
  originalData: any[];
  sparklineData: SparklineChildData[];
  dataKeys: DataKey[];
}

export interface UseSparklineDataProps {
  data: any[];
  children: any;
  limit?: number;
  width: number;
  height: number;
  min?: number;
  max?: number;
  margin?: SparklinesMargin;
  disableBarAdjustment?: boolean;
}

export const useSparklineData = ({
  data,
  children,
  max,
  min,
  margin,
  disableBarAdjustment,
  width,
  height,
  limit,
}: UseSparklineDataProps): UseSparklineData => {
  const sparklineChildren = findAllByType(children, [Line, Bar]);

  if (!data.length)
    return {
      originalData: data,
      sparklineData: sparklineChildren.map(() => ({ childData: [], dataKey: "value", points: [] })),
      dataKeys: sparklineChildren.map(() => "value"),
    };

  const isSingleNumericData = isNumber(data[0]);
  const objectifiedData = isSingleNumericData ? data.map((value) => ({ value: value })) : data;
  const dataKeys = sparklineChildren.map((child) => child.props.dataKey || "value");

  const sparklineData: SparklineChildData[] = sparklineChildren.map((_child, childIndex) => {
    const childPoints = getDataPoints({
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
      };
    });

    return {
      points: childPoints,
      childData,
      dataKey: dataKeys[childIndex],
    };
  });

  return {
    originalData: data,
    sparklineData,
    dataKeys,
  };
};
