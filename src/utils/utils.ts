import { get, isNil, isNumber, isString } from "lodash"

import { SparklineChildDataEntry } from "../sparklines/SparklinesComposed/useSparklineData.tsx";
import { DataKey, Margin, ShapeProps, SparklinesMargin, SparklinesRadius } from "./types.ts"

export const getMargin = (margin: number | SparklinesMargin): Margin => {
  return typeof margin === "number"
    ? {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin,
      }
    : {
        top: margin.top || 0,
        right: margin.right || 0,
        bottom: margin.bottom || 0,
        left: margin.left || 0,
      }
}

export const getRectanglePath = (
  x: number,
  y: number,
  width: number,
  height: number,
  radius: SparklinesRadius,
): string => {
  const maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2)
  const ySign = height >= 0 ? 1 : -1
  const xSign = width >= 0 ? 1 : -1
  const clockWise = (height >= 0 && width >= 0) || (height < 0 && width < 0) ? 1 : 0
  let path

  if (maxRadius > 0 && typeof radius === "object") {
    const newRadius: number[] = [
      radius.topLeft || 0,
      radius.topRight || 0,
      radius.bottomRight || 0,
      radius.bottomLeft || 0,
    ]
    for (let i = 0, len = 4; i < len; i++) {
      newRadius[i] = newRadius[i] > maxRadius ? maxRadius : newRadius[i]
    }

    path = `M${x},${y + ySign * newRadius[0]}`

    if (newRadius[0] > 0) {
      path += `A ${newRadius[0]},${newRadius[0]},0,0,${clockWise},${x + xSign * newRadius[0]},${y}`
    }

    path += `L ${x + width - xSign * newRadius[1]},${y}`

    if (newRadius[1] > 0) {
      path += `A ${newRadius[1]},${newRadius[1]},0,0,${clockWise},
        ${x + width},${y + ySign * newRadius[1]}`
    }
    path += `L ${x + width},${y + height - ySign * newRadius[2]}`

    if (newRadius[2] > 0) {
      path += `A ${newRadius[2]},${newRadius[2]},0,0,${clockWise},
        ${x + width - xSign * newRadius[2]},${y + height}`
    }
    path += `L ${x + xSign * newRadius[3]},${y + height}`

    if (newRadius[3] > 0) {
      path += `A ${newRadius[3]},${newRadius[3]},0,0,${clockWise},
        ${x},${y + height - ySign * newRadius[3]}`
    }
    path += "Z"
  } else if (maxRadius > 0 && typeof radius === "number" && radius > 0) {
    const newRadius = Math.min(maxRadius, radius)

    path = `M ${x},${y + ySign * newRadius}
            A ${newRadius},${newRadius},0,0,${clockWise},${x + xSign * newRadius},${y}
            L ${x + width - xSign * newRadius},${y}
            A ${newRadius},${newRadius},0,0,${clockWise},${x + width},${y + ySign * newRadius}
            L ${x + width},${y + height - ySign * newRadius}
            A ${newRadius},${newRadius},0,0,${clockWise},${x + width - xSign * newRadius},${y + height}
            L ${x + xSign * newRadius},${y + height}
            A ${newRadius},${newRadius},0,0,${clockWise},${x},${y + height - ySign * newRadius} Z`
  } else {
    path = `M ${x},${y} h ${width} v ${height} h ${-width} Z`
  }

  return path
}

export function getValueByDataKey(obj: any, dataKey: DataKey = "value", defaultValue?: any) {
  if (isNil(obj) || isNil(dataKey)) {
    return defaultValue
  }

  if (isNumber(dataKey) || isString(dataKey)) {
    return get(obj, dataKey, defaultValue)
  }

  return defaultValue
}

export const getTooltipPayload = (props: ShapeProps, activeEntry: SparklineChildDataEntry | null, childrenCount: number) => {
  const { dataKey = "value", name, color, style } = props
  const finalName = name || (childrenCount > 1 ? dataKey : undefined)
  return {
    value : activeEntry?.value || 0,
    name: finalName,
    color: color || style?.stroke || style?.fill,
  }
}
