import { isObject } from "lodash"

import { BarProps } from "../../utils/types.ts"
import { getMargin, getRectanglePath } from "../../utils/utils.ts"

export const Bar = ({
  margin = 0,
  height = 0,
  style,
  points,
  radius = 0,
  color,
  barWidth,
  maxBarWidth,
  activeIndex,
  clipPathId,
  activeBar,
}: BarProps) => {
  if (!points?.length) return null

  const enrichedMargin = getMargin(margin)

  // @ts-ignore
  const strokeWidth = 1 * ((style && style.strokeWidth) || 0)
  const marginWidth = enrichedMargin.left + enrichedMargin.right

  const getBarWidth = () => {
    if (barWidth && maxBarWidth) {
      return Math.min(barWidth, maxBarWidth)
    } else if (barWidth) {
      return barWidth
    } else if (maxBarWidth) {
      return maxBarWidth
    } else {
      return points && points.length >= 2
        ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
        : 0
    }
  }

  const bw = getBarWidth()
  const rectanglePoints = points.map((p) =>
    getRectanglePath(
      p.x - (bw + strokeWidth) / 2,
      p.y,
      bw,
      Math.max(0, height - p.y - enrichedMargin.bottom),
      radius,
    ),
  )

  const fillStyle = {
    fill: style?.fill || color || "slategray",
    fillOpacity: style?.fillOpacity || "1",
    strokeWidth: strokeWidth,
    stroke: style?.stroke || "slategray",
  }

  const activeFillStyle = {
    fill: "red",
    ...(isObject(activeBar) ? { ...activeBar } : {}),
  }

  return (
    <g clipPath={clipPathId}>
      {rectanglePoints.map((p, i) => {
        if (activeIndex === i && activeBar)
          return <path key={i} d={p} style={{ ...fillStyle, ...activeFillStyle }} />
        return <path key={i} d={p} style={fillStyle} />
      })}
    </g>
  )
}
