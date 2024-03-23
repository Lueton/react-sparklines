import clsx from "clsx";
import { isNumber } from "lodash";

import { filterProps } from "../../utils/react-utils.ts";
import { DotProps } from "../../utils/types.ts";

export const Dot = (props: DotProps) => {
  const { cx, cy, r, className, style } = props;
  const classes = clsx("react-sparklines-dot", className);

  if (isNumber(cx) && isNumber(cy) && isNumber(r)) {
    return (
      <circle
        {...filterProps(props, false)}
        className={classes}
        cx={cx}
        cy={cy}
        r={r}
        style={style}
      />
    );
  }
  return null;
};
