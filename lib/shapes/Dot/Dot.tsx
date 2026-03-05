import clsx from "clsx";

import { filterProps } from "../../utils/react-utils.ts";
import { DotProps } from "../../utils/types.ts";

export const Dot = (props: DotProps) => {
  const { cx, cy, r, className, style } = props;
  const classes = clsx("react-sparklines-dot", className);

  if (typeof cx === "number" && typeof cy === "number" && typeof r === "number") {
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
