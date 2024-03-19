import clsx from "clsx"
import { isBoolean, isNil, isNumber, isObject } from "lodash"
import isFunction from "lodash/isFunction"
import { cloneElement, isValidElement } from "react"
import { DotProps, DotsProps, LineDot, LineDotsVisibility } from "react-sparklines"

import { filterProps } from "../../utils/react-utils.ts"

const renderDot = (option: LineDot, props: any) => {
  let dotItem
  if (isValidElement(option)) {
    dotItem = cloneElement(option, props)
  } else if (isFunction(option)) {
    dotItem = option(props)
  } else if (isObject(option) && isValidElement(option.dot)) {
    dotItem = cloneElement(option.dot, props)
  } else if (isObject(option) && isFunction(option.dot)) {
    dotItem = option.dot(props)
  } else {
    const className = option ? (option as DotProps).className : ""
    dotItem = <Dot {...props} className={className} />
  }
  return dotItem
}

const getVisibility = (dots: LineDot): LineDotsVisibility => {
  if (isValidElement(dots) || isFunction(dots)) return true
  if (isBoolean(dots)) return dots
  if (!isNil(dots.show)) return dots.show
  if (!isNil(dots.dot)) return true
  return Boolean(dots)
}

export const Dots = ({ dots, points }: DotsProps) => {
  const visibility = getVisibility(dots)

  if (!visibility) return null

  let dotIndices = []

  if (visibility === "START" || visibility === "START_END") dotIndices.push(0)
  if (visibility === "END" || visibility === "START_END") dotIndices.push(points.length - 1)
  if (visibility === true) dotIndices = points.map((_p, i) => i)

  return dotIndices.map((index) => {
    const point = points[index]

    const dotProps = {
      key: `dot-${index}`,
      r: 2,
      ...filterProps(dots, false),
      cx: point.x,
      cy: point.y,
      index: index,
      value: point.value,
    }

    return renderDot(dots, dotProps)
  })
}

const Dot = (props: DotProps) => {
  const { cx, cy, r, className, style, ...rest } = props
  const classes = clsx("react-sparklines-dot", className)
  if (isNumber(cx) && isNumber(cy) && isNumber(r)) {
    return (
      <circle
        className={classes}
        cx={cx}
        cy={cy}
        r={r}
        style={{ fill: "lightgray", ...style }}
        {...rest}
      />
    )
  }
  return null
}