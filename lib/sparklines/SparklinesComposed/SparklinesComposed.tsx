import { uniqueId } from "lodash";
import {
  cloneElement,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  Ref,
  RefAttributes,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { Bar, Line } from "../../cartesian";
import { Tooltip } from "../../components";
import { filterSvgElements, findAllByType, findChildByType } from "../../utils/react-utils.ts";
import { InternalShapeProps, Points, SparklinesComposedProps } from "../../utils/types.ts";
import { getMargin, getTooltipPayload } from "../../utils/utils.ts";
import { useInteractivity } from "./useInteractivity.tsx";
import { useSparklineData } from "./useSparklineData.tsx";

function fixedForwardRef<T, P = unknown>(
  render: (props: P, ref: Ref<T>) => ReactNode,
): (props: P & RefAttributes<T>) => ReactNode {
  return forwardRef(render) as any;
}

export const SparklinesComposed = <TData,>(
  {
    data = [],
    width = 240,
    height = 60,
    margin = 4,
    children,
    color,
    max,
    min,
    limit,
    preserveAspectRatio,
    style,
    label,
    disableBarAdjustment,
    clip,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...rest
  }: SparklinesComposedProps<TData>,
  forwardedRef: ForwardedRef<SVGRectElement>,
) => {
  const tooltip = findChildByType(children, Tooltip);
  const sparklineChildren = findAllByType(children, [Line, Bar]);

  const sparklineData = useSparklineData<TData>({
    data,
    limit,
    width,
    disableBarAdjustment,
    max,
    min,
    margin,
    height,
    children,
  });

  const clipId = useMemo(() => uniqueId("react-sparklines") + "-clip", []);
  const ref = useRef<SVGRectElement>(null);
  const svgProps = {
    viewBox: `0 0 ${width} ${height}`,
    style,
    preserveAspectRatio,
    width,
    height,
    ...rest,
  };
  useImperativeHandle(forwardedRef, () => ref.current as SVGRectElement);
  const { coords, activeIndex, activeEntry } = useInteractivity({
    ref,
    data: sparklineData,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
  });

  const {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  } = getMargin(margin);
  const wrapperProps = {
    style: { position: "relative", height: height, width: width } as CSSProperties,
  };

  const renderTooltip = () => {
    if (!tooltip || !sparklineChildren.length || activeIndex == null) return null;
    const payload = sparklineChildren.map((child, i) =>
      getTooltipPayload<TData>(child.props, activeEntry?.[i] || null, sparklineChildren.length),
    );
    const finalLabel = sparklineData.labels[activeIndex] || label;
    return cloneElement(tooltip, { ...tooltip.props, payload, coords, label: finalLabel });
  };

  const renderChildren = () => {
    const svgElements: ReactElement[] = filterSvgElements(children);

    return [
      ...svgElements,
      sparklineChildren.map((child, i) => {
        if (isValidElement(child)) {
          const childProps = child.props;
          const points: Points<TData> = sparklineData.sparklineData[i].points;
          const internalShapeProps: InternalShapeProps<TData> = {
            height,
            width,
            margin,
            points,
            disableBarAdjustment,
            activeIndex,
            tooltip: !!tooltip,
          };

          return cloneElement(child, {
            ...childProps,
            ...internalShapeProps,
            key: i,
            clipPathId: `url(${clipId})`,
          });
        }
        return null;
      }),
    ];
  };

  const renderClip = () => {
    const clipWidth: number = width - (clip ? marginLeft - marginRight : 0);
    const clipHeight: number = height - (clip ? marginTop - marginBottom : 0);
    const x: number = clip ? marginLeft : 0;
    const y: number = clip ? marginTop : 0;

    return (
      <defs>
        <clipPath id={clipId}>
          <rect height={clipHeight} width={clipWidth} x={x} y={y} />
        </clipPath>
      </defs>
    );
  };

  const renderInteractiveLayer = () => {
    const interactiveWidth: number = width - marginLeft - marginRight;
    const interactiveHeight: number = height - marginTop - marginBottom;
    const interactiveStyle: CSSProperties = { fill: "transparent", strokeWidth: 0 };

    return (
      <rect
        className="react-sparklines-interactive-layer"
        ref={ref}
        height={interactiveHeight}
        width={interactiveWidth}
        style={interactiveStyle}
        x={marginLeft}
        y={marginTop}
      />
    );
  };

  return (
    <div className="react-sparklines-wrapper" {...wrapperProps}>
      <svg className="react-sparklines-surface" {...svgProps}>
        {renderClip()}
        {renderChildren()}
        {renderInteractiveLayer()}
      </svg>
      {renderTooltip()}
    </div>
  );
};

export const ForwardedSparklinesComposed = fixedForwardRef(SparklinesComposed);
