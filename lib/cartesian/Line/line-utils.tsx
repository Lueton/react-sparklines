import { cloneElement, isValidElement } from "react";

import { Dot } from "../../shapes/Dot/Dot.tsx";
import { DotProps, LineDot} from "../../utils/types.ts";

export const renderDot = (option: LineDot, props: any) => {
  let dotItem;
  if (isValidElement(option)) {
    dotItem = cloneElement(option, props);
  } else if (typeof option === "function") {
    dotItem = option(props);
  } else if (typeof option === "object" && option !== null && isValidElement(option.dot)) {
    dotItem = cloneElement(option.dot, props);
  } else if (typeof option === "object" && option !== null && typeof option.dot === "function") {
    dotItem = option.dot(props);
  } else {
    const className = option ? (option as DotProps).className : "";
    dotItem = <Dot {...props} key={props.key} className={className} color={props.color} />;
  }
  return dotItem;
};
