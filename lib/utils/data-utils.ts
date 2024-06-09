import { ReactElement } from "react";

import { DEFAULT_COLOR } from "./defaults.ts";

export const getMainColorByElement = (element: ReactElement) => {
  const { stroke, fill } = element.props;
  const {
    type: { displayName },
  } = element as any;

  switch (displayName) {
    case "Line":
      if (stroke && stroke !== "none" && stroke !== "transparent") return stroke;
      if (fill && fill[0] !== "u") return fill;
      return DEFAULT_COLOR;
    case "Bar":
      if (fill && fill !== "none" && fill !== "transparent" && fill[0] !== "u") return fill;
      return stroke || DEFAULT_COLOR;
    default:
      return DEFAULT_COLOR;
  }
};