import { isNil } from "lodash";

import { Rect } from "../../shapes/Rect/Rect.tsx";
import { DEFAULT_COLOR, DEFAULT_SECONDARY_COLOR } from "../../utils/defaults.ts";
import { filterProps } from "../../utils/react-utils.ts";
import { BarProps } from "../../utils/types.ts";
import { getMargin } from "../../utils/utils.ts";

export const Bar = <TData,>(props: BarProps<TData>) => {
  const {
    height = 0,
    margin,
    data,
    radius,
    barWidth,
    maxBarWidth,
    clipPathId,
    activeBar,
    tooltip,
    zeroBaseline,
    barGap,
    activeIndex,
  } = props;

  if (isNil(data)) return null;

  const margins = getMargin(margin);
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

  const renderBars = () => {
    return data.points.map((p, i) => (
      <Rect
        key={i}
        {...(activeIndex === i && showActiveBar ? activeBarProps : barProps)}
        height={height}
        margin={margins}
        barWidth={barWidth}
        maxBarWidth={maxBarWidth}
        barGap={barGap}
        zeroBaseline={zeroBaseline}
        radius={radius}
        data={data}
        point={p}
      />
    ));
  };

  return (
    <g className="react-sparklines-layer react-sparklines-bar" clipPath={clipPathId}>
      {renderBars()}
    </g>
  );
};

Bar.displayName = "Bar";
