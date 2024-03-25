import { DEFAULT_COLOR, DEFAULT_SECONDARY_COLOR } from "../../utils/defaults.ts";
import { filterProps } from "../../utils/react-utils.ts";
import { BarProps } from "../../utils/types.ts";
import { getMargin, getRectanglePath } from "../../utils/utils.ts";

export const Bar = <TData,>(props: BarProps<TData>) => {
  const {
    margin = 0,
    height = 0,
    points,
    radius = 0,
    barWidth,
    maxBarWidth,
    activeIndex,
    clipPathId,
    activeBar ,
    tooltip,
  } = props;

  if (!points?.length) return null;

  const enrichedMargin = getMargin(margin);

  const marginWidth = enrichedMargin.left + enrichedMargin.right;

  const getBarWidth = () => {
    if (barWidth && maxBarWidth) {
      return Math.min(barWidth, maxBarWidth);
    } else if (barWidth) {
      return barWidth;
    } else if (maxBarWidth) {
      return maxBarWidth;
    } else {
      return points && points.length >= 2
        ? Math.max(0, points[1].x - points[0].x - marginWidth)
        : 0;
    }
  };

  const bw = getBarWidth();
  const rectanglePoints = points.map((p) =>
    getRectanglePath(
      p.x - bw / 2,
      p.y,
      bw,
      Math.max(0, height - p.y - enrichedMargin.bottom),
      radius,
    ),
  );

  const showActiveBar: boolean = !!tooltip && activeBar !== false;
  const barProps = {
    stroke: "none",
    fill: DEFAULT_COLOR,
    ...filterProps(props, false),
  };

  const activeBarProps = {
    ...barProps,
    fill: DEFAULT_SECONDARY_COLOR,
    ...filterProps(activeBar, false),
  };

  return (
    <g className="react-sparklines-layer react-sparklines-bar" clipPath={clipPathId}>
      {rectanglePoints.map((p, i) => {
        if (activeIndex === i && showActiveBar) return <path {...activeBarProps} key={i} d={p} />;
        return <path {...barProps} key={i} d={p} />;
      })}
    </g>
  );
};

Bar.displayName = "Bar";
