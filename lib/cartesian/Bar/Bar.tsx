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
    barWidth,
    maxBarWidth,
    clipPathId,
    activeBar,
    tooltip,
    zeroBaseline,
    barGap,
    activeIndex,
    positive,
    negative
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
    return data.points.map((p, i) => {
      let rectProps;

      if(activeIndex === i && showActiveBar){
        rectProps = activeBarProps
      }else{
        rectProps = barProps
      }

      if(positive && p[1] != null && p[1] > 0){
        rectProps = {...rectProps, ...positive}
      }else if(negative && p[1] != null && p[1] < 0){
        rectProps = {...rectProps, ...negative}
      }

      return (
        <Rect
          key={i}
          {...rectProps}
          height={height}
          margin={margins}
          barWidth={barWidth}
          maxBarWidth={maxBarWidth}
          barGap={barGap}
          zeroBaseline={zeroBaseline}
          data={data}
          point={p}
        />
      );
    });
  };

  return (
    <g className="react-sparklines-layer react-sparklines-bar" clipPath={clipPathId}>
      {renderBars()}
    </g>
  );
};

Bar.displayName = "Bar";
