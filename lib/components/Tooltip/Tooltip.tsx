import isFunction from "lodash/isFunction";
import {
  cloneElement,
  createElement,
  isValidElement,
} from "react";

import { TooltipContent, TooltipProps } from "../../utils/types.ts";
import { DefaultTooltipContent } from "./DefaultTooltipContent.tsx";
import { TooltipWrapper } from "./TooltipWrapper.tsx";

const renderContent = (content: TooltipContent, props: TooltipProps) => {
  if (isValidElement(content)) return cloneElement(content, props);
  if (isFunction(content)) return createElement(content, props);
  return <DefaultTooltipContent {...props} />;
};

export const Tooltip = (props: TooltipProps) => {
  const { content, coords = { x: 0, y: 0 }, wrapperStyle = {} } = props;

  return (
    <TooltipWrapper coords={coords} style={wrapperStyle}>
      {renderContent(content, props)}
    </TooltipWrapper>
  );
};

Tooltip.displayName = "Tooltip";
