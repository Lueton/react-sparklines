import { isValidElement } from "react";

import { Area } from "../../shapes/Area/Area.tsx";
import { Curve } from "../../shapes/Curve/Curve.tsx";
import { DEFAULT_COLOR } from "../../utils/defaults.ts";
import { filterProps } from "../../utils/react-utils.ts";
import { BandProps, LineDot, LineDotsVisibility } from "../../utils/types.ts";
import { getMargin } from "../../utils/utils.ts";
import { renderDot } from "../Line/line-utils.tsx";

export const Band = <TData,>(props: BandProps<TData>) => {
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
  } = props;

  if (!data || !data.points.length) return null;

  const { points } = data;

  const getVisibility = (dots: LineDot): LineDotsVisibility => {
    if (isValidElement(dots) || typeof dots === "function") return true;
    if (typeof dots === "boolean") return dots;
    if (dots?.show != null) return dots.show;
    if (dots?.dot != null) return true;
    return Boolean(dots);
  };

  const renderDots = (y: number) => {
    const visibility = getVisibility(dots);

    if (!visibility) return null;

    let dotIndices = [];

    if (visibility === "START" || visibility === "START_END") dotIndices.push(0);
    if (visibility === "END" || visibility === "START_END") dotIndices.push(points.length - 1);
    if (visibility === true) dotIndices = points.map((_p, i) => i);

    return dotIndices.map((index) => {
      const point = data.coords[index];
      if (!point || data.points[index][1] === null) return null;
      if(Array.isArray(data.points[index][1]) && data.points[index][1][y] === null) return null;

      const dotProps = {
        key: `dot-${index}`,
        r: 2,
        stroke: DEFAULT_COLOR,
        fill: "#ffffff",
        strokeWidth: 1,
        ...filterProps(dots, false),
        cx: point[0],
        cy: Array.isArray(point[1]) ? point[1][y] : point[1],
        index: index,
        value: Array.isArray(point[1]) ? point[1][y] : point[1],
      };
      return renderDot(dots, dotProps);
    });
  };

  const { stroke } = props;

  const renderActiveDot = (y: number) => {
    if (activeIndex == null) return null;

    const activePoint = data.coords[activeIndex];

    if (!activePoint || data.points[activeIndex][1] === null) return null;
    if(Array.isArray(data.points[activeIndex][1]) && data.points[activeIndex][1][y] === null) return null;

    const dotProps = {
      key: `active-dot-${activeIndex}`,
      r: 2,
      cx: activePoint[0],
      cy: Array.isArray(activePoint[1]) ? activePoint[1][y] : activePoint[1],
      index: activeIndex,
      value: Array.isArray(activePoint[1]) ? activePoint[1][y] : activePoint[1],
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
    className: "react-sparklines-band-fill",
  };

  const showActiveDot: boolean = !!tooltip && activeDot != false && activeIndex != null;
  const enrichedMargin = getMargin(margin);

  const lineProps = {
    stroke: DEFAULT_COLOR,
    strokeWidth: "1",
    ...filterProps(props, false),
    fill: "none",
    className: "react-sparklines-band-line",
  };

  return (
    <>
      <g className="react-sparklines-layer react-sparklines-band" clipPath={clipPathId}>
        <Area
          {...fillProps}
          data={data}
          zeroBaseline={zeroBaseline}
          height={height}
          margin={enrichedMargin}
          curve={curved}
          connectNulls={true}
        />
        <Curve
          {...lineProps}
          data={data}
          curve={curved}
          connectNulls={true}
        />
        <Curve
          {...{...lineProps}}
          data={data}
          curve={curved}
          connectNulls={true}
          reverse={true}
        />
        {dots && <g className="react-sparklines-layer react-sparklines-dots">{renderDots(0)}</g>}
        {dots && <g className="react-sparklines-layer react-sparklines-dots">{renderDots(1)}</g>}
        {showActiveDot && (
          <g className="react-sparklines-layer react-sparklines-active-dot">{renderActiveDot(0)}</g>
        )}
        {showActiveDot && (
          <g className="react-sparklines-layer react-sparklines-active-dot">{renderActiveDot(1)}</g>
        )}
      </g>
    </>
  );
};

Band.displayName = "Band";
