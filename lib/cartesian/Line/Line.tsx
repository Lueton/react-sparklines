import { isBoolean, isNil, isObject } from "lodash";
import isFunction from "lodash/isFunction";
import { cloneElement, isValidElement } from "react";

import { Dot } from "../../shapes/Dot/Dot.tsx";
import { filterProps } from "../../utils/react-utils.ts";
import { DotProps, LineDot, LineDotsVisibility, LineProps } from "../../utils/types.ts";
import { getMargin } from "../../utils/utils.ts";
import { getLinePoints } from "./line-utils.tsx";

export const Line = <TData,>(props: LineProps<TData>) => {
  const {
    margin = 0,
    height = 0,
    dots = false,
    points,
    disableBarAdjustment,
    activeIndex,
    curved,
    activeDot,
    clipPathId,
    tooltip,
  } = props;

  if (!points?.length) return null;

  const linePoints = getLinePoints<TData>(points, curved);
  const enrichedMargin = getMargin(margin);

  const closePolyPoints = [
    (curved ? "L" : "") + points[points.length - 1].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    points[0].y,
  ];

  const fillPoints = linePoints.concat(closePolyPoints);

  const showDots: boolean = !!dots;
  const showActiveDot: boolean = !!tooltip && activeDot != false && activeIndex != null;

  const getVisibility = (dots: LineDot): LineDotsVisibility => {
    if (isValidElement(dots) || isFunction(dots)) return true;
    if (isBoolean(dots)) return dots;
    if (!isNil(dots?.show)) return dots.show;
    if (!isNil(dots?.dot)) return true;
    return Boolean(dots);
  };

  const renderDot = (option: LineDot, props: any) => {
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

  const renderDots = () => {
    const visibility = getVisibility(dots);

    if (!visibility) return null;

    let dotIndices = [];

    if (visibility === "START" || visibility === "START_END") dotIndices.push(0);
    if (visibility === "END" || visibility === "START_END") dotIndices.push(points.length - 1);
    if (visibility === true) dotIndices = points.map((_p, i) => i);

    return dotIndices.map((index) => {
      const point = points[index];
      const dotProps = {
        key: `dot-${index}`,
        r: 2,
        stroke: "slategray",
        fill: "#ffffff",
        strokeWidth: 1,
        ...filterProps(dots, false),
        cx: point.x,
        cy: point.y,
        index: index,
        value: point.value,
      };
      return renderDot(dots, dotProps);
    });
  };

  const { stroke } = props;

  const renderActiveDot = () => {
    if (isNil(activeIndex)) return null;

    const activePoint = points[activeIndex];
    const dotProps = {
      key: `active-dot-${activeIndex}`,
      r: 2,
      cx: activePoint.x,
      cy: activePoint.y,
      index: activeIndex,
      value: activePoint.value,
      stroke: "#ffffff",
      fill: stroke || "slategray",
      ...filterProps(activeDot, false),
    };
    return renderDot(activeDot, dotProps);
  };

  const fillProps = {
    fill: "slategray",
    fillOpacity: ".4",
    strokeWidth: "0",
    ...filterProps(props, false),
    stroke: "none",
    d: "M" + fillPoints.join(" "),
    className: "react-sparklines-line-fill",
  };

  const lineProps = {
    stroke: "slategray",
    strokeWidth: "1",
    ...filterProps(props, false),
    fill: "none",
    d: "M" + linePoints.join(" "),
    className: "react-sparklines-line-line",
  };

  return (
    <g className="react-sparklines-layer react-sparklines-line" clipPath={clipPathId}>
      <path {...fillProps} />
      <path {...lineProps} />
      {showDots && <g className="react-sparklines-layer react-sparklines-dots">{renderDots()}</g>}
      {showActiveDot && (
        <g className="react-sparklines-layer react-sparklines-active-dot">{renderActiveDot()}</g>
      )}
    </g>
  );
};

Line.displayName = "Line";
