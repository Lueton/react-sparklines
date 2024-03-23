import isFunction from "lodash/isFunction"
import {
  cloneElement,
  createElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react"

import { DataKey } from "../../utils/types.ts"
import { DefaultTooltipContent } from "./DefaultTooltipContent.tsx"
import { TooltipWrapper } from "./TooltipWrapper.tsx"

export interface InternalTooltipProps {
  coords?: { x: number; y: number }
}

export type TooltipContent = ReactElement | ((props: TooltipProps) => ReactNode) | undefined

export interface TooltipPayload {
  name?: DataKey
  value?: number
  dataKey?: DataKey
  color?: string
}

export interface TooltipProps extends InternalTooltipProps {
  separator?: string
  itemStyle?: CSSProperties
  wrapperStyle?: CSSProperties
  contentStyle?: CSSProperties
  labelStyle?: CSSProperties
  content?: TooltipContent
  label?: string | number
  payload?: Array<TooltipPayload>
}

const renderContent = (content: TooltipContent, props: TooltipProps) => {
  if (isValidElement(content)) return cloneElement(content, props)
  if (isFunction(content)) return createElement(content, props)
  return <DefaultTooltipContent {...props} />
}

export const Tooltip = (props: TooltipProps) => {
  const { content, coords = { x: 0, y: 0 }, wrapperStyle = {} } = props

  return (
    <TooltipWrapper coords={coords} style={wrapperStyle}>
      {renderContent(content, props)}
    </TooltipWrapper>
  )
}