import { CSSProperties } from "react"

import { Dots } from "../../shapes/Dots/Dots.tsx"
import { LineProps } from "../../utils/types.ts"
import { getMargin } from "../../utils/utils.ts"
import { getLinePoints } from "./line-utils.tsx"

export const Line = ({
  margin = 0,
  height = 0,
  dots = false,
  style,
  color,
  points,
  disableBarAdjustment,
  activeIndex,
  curved,
  activeDot = { style: { fill: "red" } },
  clipPathId,
  tooltip,
}: LineProps) => {
  if (!points?.length) return null

  const linePoints = getLinePoints(points, curved)
  const enrichedMargin = getMargin(margin)

  const closePolyPoints = [
    (curved ? "L" : "") + points[points.length - 1].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    height - enrichedMargin.bottom,
    disableBarAdjustment ? enrichedMargin.left : points[0].x,
    points[0].y,
  ]

  const fillPoints = linePoints.concat(closePolyPoints)

  const lineStyle: CSSProperties = {
    stroke: color || style?.stroke || "slategray",
    strokeWidth: style?.strokeWidth || "1",
    strokeLinejoin: style?.strokeLinejoin || "round",
    strokeLinecap: style?.strokeLinecap || "round",
    fill: "none",
  }

  const fillStyle: CSSProperties = {
    stroke: color || style?.stroke || "none",
    strokeWidth: "0",
    fillOpacity: style?.fillOpacity || ".1",
    fill: style?.fill || color || style?.stroke || "slategray",
    pointerEvents: "auto",
  }

  const showDots: boolean = !!dots
  const showActiveDot: boolean = !!tooltip && !!activeDot && activeIndex != null

  return (
    <g clipPath={clipPathId}>
      <path d={
        "M" + fillPoints.join(" ")} style={fillStyle} />
      <path d={"M" + linePoints.join(" ")} style={lineStyle} />
      {showDots && <Dots dots={dots} points={points} />}
      {showActiveDot && <Dots dots={activeDot} points={[points[activeIndex as number]]} />}
    </g>
  )
}

Line.displayName = "Line"
