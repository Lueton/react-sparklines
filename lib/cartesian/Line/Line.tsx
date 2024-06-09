import { isBoolean, isNil } from "lodash";
import isFunction from "lodash/isFunction";
import { isValidElement } from "react";

import { Area } from "../../shapes/Area/Area.tsx";
import { Curve } from "../../shapes/Curve/Curve.tsx";
import { DEFAULT_COLOR } from "../../utils/defaults.ts";
import { filterProps } from "../../utils/react-utils.ts";
import { LineDot, LineDotsVisibility, LineProps } from "../../utils/types.ts";
import { getMargin } from "../../utils/utils.ts";
import { renderDot } from "./line-utils.tsx";

export const Line = <TData,>(props: LineProps<TData>) => {
  const {
    margin,
    height = 0,
    dots = false,
    data,
    activeIndex,
    curved,
    activeDot,
    clipPathId,
    tooltip,
    zeroBaseline,
    connectNulls,
  } = props;

  if (!data || !data.points.length) return null;

  const { points } = data;

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
      const point = data.coords[index];

      if (!point || data.points[index][1] === null) return null;

      const dotProps = {
        key: `dot-${index}`,
        r: 2,
        stroke: DEFAULT_COLOR,
        fill: "#ffffff",
        strokeWidth: 1,
        ...filterProps(dots, false),
        cx: point[0],
        cy: point[1],
        index: index,
        value: point[1],
      };
      return renderDot(dots, dotProps);
    });
  };

  const { stroke } = props;

  const renderActiveDot = () => {
    if (isNil(activeIndex)) return null;

    const activePoint = data.coords[activeIndex];

    if (!activePoint || data.points[activeIndex][1] === null) return null;

    const dotProps = {
      key: `active-dot-${activeIndex}`,
      r: 2,
      cx: activePoint[0],
      cy: activePoint[1],
      index: activeIndex,
      value: activePoint[1],
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
    className: "react-sparklines-line-fill",
  };

  const lineProps = {
    stroke: DEFAULT_COLOR,
    strokeWidth: "1",
    ...filterProps(props, false),
    fill: "none",
    className: "react-sparklines-line-line",
  };

  const showActiveDot: boolean = !!tooltip && activeDot != false && activeIndex != null;
  const enrichedMargin = getMargin(margin);

  return (
    <>
      <g className="react-sparklines-layer react-sparklines-line" clipPath={clipPathId}>
        <Area
          {...fillProps}
          data={data}
          zeroBaseline={zeroBaseline}
          height={height}
          margin={enrichedMargin}
          curve={curved}
          connectNulls={connectNulls}
        />
        <Curve
          {...lineProps}
          data={data}
          curve={curved}
          connectNulls={connectNulls}
        />
        {dots && <g className="react-sparklines-layer react-sparklines-dots">{renderDots()}</g>}
        {showActiveDot && (
          <g className="react-sparklines-layer react-sparklines-active-dot">{renderActiveDot()}</g>
        )}
      </g>
    </>
  );
};

Line.displayName = "Line";
