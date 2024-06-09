import { isObject } from "lodash";
import isFunction from "lodash/isFunction";
import { cloneElement, isValidElement } from "react";

import { Dot } from "../../shapes/Dot/Dot.tsx";
import { DotProps, LineDot} from "../../utils/types.ts";

export const renderDot = (option: LineDot, props: any) => {
  let dotItem;
  if (isValidElement(option)) {
    dotItem = cloneElement(option, props);
  } else if (isFunction(option)) {
    dotItem = option(props);
  } else if (isObject(option) && isValidElement(option.dot)) {
    dotItem = cloneElement(option.dot, props);
  } else if (isObject(option) && isFunction(option.dot)) {
    dotItem = option.dot(props);
  } else {
    const className = option ? (option as DotProps).className : "";
    dotItem = <Dot {...props} key={props.key} className={className} color={props.color} />;
  }
  return dotItem;
};
