import { isBoolean, isNil } from "lodash";
import isFunction from "lodash/isFunction";
import { isValidElement } from "react";

import { DEFAULT_COLOR } from "../../utils/defaults.ts";
import { filterProps } from "../../utils/react-utils.ts";
import { LineDot, LineDotsVisibility, LineProps } from "../../utils/types.ts";
import { getLinePoints, renderDot } from "./line-utils.tsx";

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

  const { linePoints, fillPoints } = getLinePoints<TData>(
    points,
    height,
    margin,
    disableBarAdjustment,
    curved,
  );

  const getVisibility = (dots: LineDot): LineDotsVisibility => {
    if (isValidElement(dots) || isFunction(dots)) return true;
    if (isBoolean(dots)) return dots;
    if (!isNil(dots?.show)) return dots.show;
    if (!isNil(dots?.dot)) return true;
    return Boolean(dots);
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
        stroke: DEFAULT_COLOR,
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
      fill: stroke || DEFAULT_COLOR,
      ...filterProps(activeDot, false),
    };
    return renderDot(activeDot, dotProps);
  };

  const fillProps = {
    fill: DEFAULT_COLOR,
    fillOpacity: ".4",
    strokeWidth: "0",
    ...filterProps(props, false),
    stroke: "none",
    d: "M" + fillPoints.join(" "),
    className: "react-sparklines-line-fill",
  };

  const lineProps = {
    stroke: DEFAULT_COLOR,
    strokeWidth: "1",
    ...filterProps(props, false),
    fill: "none",
    d: "M" + linePoints.join(" "),
    className: "react-sparklines-line-line",
  };

  const showActiveDot: boolean = !!tooltip && activeDot != false && activeIndex != null;

  return (
    <g className="react-sparklines-layer react-sparklines-line" clipPath={clipPathId}>
      <path {...fillProps} />
      <path {...lineProps} />
      {dots && <g className="react-sparklines-layer react-sparklines-dots">{renderDots()}</g>}
      {showActiveDot && (
        <g className="react-sparklines-layer react-sparklines-active-dot">{renderActiveDot()}</g>
      )}
    </g>
  );
};

Line.displayName = "Line";
