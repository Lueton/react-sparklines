import { isNumber, isObject } from "lodash";

import { DotProps, LineDot, Point, SparklinesMargin } from "../../utils/types.ts";
import { getMargin } from "../../utils/utils.ts";
import { cloneElement, isValidElement } from "react";
import isFunction from "lodash/isFunction";
import { Dot } from "../../shapes/Dot/Dot.tsx";

let prev: null | { x: number; y: number };
const getCurvePoint = (point: { x: number; y: number }, divisor: number) => {
  let res;
  if (!prev) {
    res = [point.x, point.y];
  } else {
    const len = (point.x - prev.x) * divisor;
    res = ["C", prev.x + len, prev.y, point.x - len, point.y, point.x, point.y];
  }
  prev = point;
  return res;
};

const getCurvePoints = <TData,>(points: Point<TData>[], divisor: number) => {
  prev = null;
  return points.map((p) => getCurvePoint(p, divisor)).reduce((a, b) => a.concat(b));
};

export const getLinePoints = <TData,>(
  points: Point<TData>[],
  height: number,
  margin: SparklinesMargin,
  disableBarAdjustment: boolean | undefined,
  curved?: boolean | number,
) => {
  let linePoints;

  if (curved) {
    const divisor = isNumber(curved) ? curved : 0.4;
    linePoints = getCurvePoints(points, divisor);
  } else {
    linePoints = points.map((p) => [p.x, p.y]).reduce((a, b) => a.concat(b));
  }

  const enrichedMargin = getMargin(margin);
  const closePolyPoints = [
    (curved ? "L" : "") + points[points.length - 1].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    points[0].y,
  ];

  return {
    linePoints,
    fillPoints: linePoints.concat(closePolyPoints),
  };
};

export const renderDot = (option: LineDot, props: any) => {
  let dotItem;
  if (isValidElement(option)) {
    dotItem = cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else if (isObject(option) && isValidElement(option.dot)) {
    dotItem = cloneElement(option.dot, props);
  } else if (isObject(option) && isFunction(option.dot)) {
    dotItem = option.dot(props);
  } else {
    const className = option ? (option as DotProps).className : "";
    dotItem = <Dot {...props} className={className} color={props.color} />;
  }
  return dotItem;
};
