import { uniqueId } from "lodash";
import isFunction from "lodash/isFunction";
import {
  cloneElement,
  CSSProperties,
  ForwardedRef,
  forwardRef,
  isValidElement,
  ReactElement,
  useMemo,
} from "react";

import { Bar, Line, ReferenceLine } from "../../cartesian";
import { Tooltip } from "../../components";
import {
  filterSvgElements,
  findAllByType,
  findChildByType,
  useForwardedRef,
} from "../../utils/react-utils.ts";
import { InternalShapeProps, SparklinesComposedProps } from "../../utils/types.ts";
import { getMargin, getTooltipPayload } from "../../utils/utils.ts";
import { useInteractivity } from "./useInteractivity.tsx";
import { useSparklineData } from "./useSparklineData.ts";

export const ALLOWED_SPARKLINE_CHILDREN = [Line, Bar, ReferenceLine];
export const ALLOWED_TOOLTIP_CHILDREN = [Line, Bar];

const SparklinesComposedInner = <TData,>(
  {
    data = [],
    width = 240,
    height = 60,
    margin = 4,
    children,
    max,
    min,
    limit,
    preserveAspectRatio,
    style,
    label,
    withBarAdjustment,
    clip,
    startAtZero = true,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    onClick,
    zeroBaseline,
    ...rest
  }: SparklinesComposedProps<TData>,
  ref: ForwardedRef<SVGRectElement>,
) => {
  const tooltip = findChildByType(children, Tooltip);
  const sparklineChildren = findAllByType(children, ALLOWED_SPARKLINE_CHILDREN);
  const tooltipChildren = findAllByType(children, ALLOWED_TOOLTIP_CHILDREN);
  const margins = getMargin(margin);
  const sparklineData = useSparklineData<TData>({
    originalData: data,
    limit,
    max,
    min,
    margin: margins,
    width,
    height,
    withBarAdjustment: withBarAdjustment ?? findAllByType(children, Bar).length > 0,
    zeroBaseline,
    startAtZero,
    children,
  });
  const clipId = useMemo(() => uniqueId("react-sparklines") + "-clip", []);
  const innerRef = useForwardedRef(ref);
  const svgProps = {
    viewBox: `0 0 ${width} ${height}`,
    style,
    preserveAspectRatio,
    width,
    height,
    ...rest,
  };
  const { coords, activeIndex, activeEntry } = useInteractivity<TData>({
    ref: innerRef,
    data: sparklineData,
    children: sparklineChildren,
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
  } = margins
  const wrapperProps = {
    style: { position: "relative", height: height, width: width } as CSSProperties,
  };

  const renderTooltip = () => {
    if (!tooltip || !tooltipChildren.length || activeIndex == null) return null;
    const payload = tooltipChildren.map((child, i) =>
      getTooltipPayload<TData>(child.props, activeEntry?.[i] || null, tooltipChildren.length),
    );

    if(payload.every(entry => entry.value === null)){
      return null;
    }

    let lbl = sparklineData.labels[activeIndex] || label;
    if (isFunction(lbl)) {
      lbl = lbl(payload);
    }
    return cloneElement(tooltip, { ...tooltip.props, payload, coords, label: lbl });
  };

  const renderChildren = () => {
    const svgElements: ReactElement[] = filterSvgElements(children);

    return [
      ...svgElements,
      sparklineChildren.map((child, i) => {
        if (isValidElement(child)) {
          const childProps = child.props;
          const internalShapeProps: InternalShapeProps<TData> = {
            height,
            width,
            margin,
            data: sparklineData.sparklines[i],
            sparklineData,
            withBarAdjustment,
            activeIndex,
            startAtZero,
            zeroBaseline,
            tooltip: !!tooltip,
          };

          return cloneElement(child, {
            ...childProps,
            ...internalShapeProps,
            key: i,
            clipPathId: `url(#${clipId})`,
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
        ref={innerRef}
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

export const SparklinesComposed = forwardRef(SparklinesComposedInner) as <TData>(
  props: SparklinesComposedProps<TData> & { ref?: ForwardedRef<SVGRectElement> },
) => ReturnType<typeof SparklinesComposedInner>;
