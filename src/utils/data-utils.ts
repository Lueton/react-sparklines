import { DataKey, Points, SparklinesMargin } from "react-sparklines"

import { getMargin, getValueByDataKey } from "./utils.ts"

//TODO We add 0 to max min to make smallest value not 0
export const getDataPoints = ({
  data,
  limit,
  width,
  height,
  margin,
  max,
  min,
  disableBarAdjustment = false,
  dataKey,
}: {
  data: readonly any[]
  limit?: number
  width: number
  height: number
  min?: number
  max?: number
  margin?: SparklinesMargin
  disableBarAdjustment?: boolean
  dataKey?: DataKey
}): Points => {
  const dataForSeries = data.map((d) => getValueByDataKey(d, dataKey))

  return getDataPointsForSeries({
    data: dataForSeries,
    limit,
    width,
    height,
    margin,
    max,
    min,
    disableBarAdjustment,
  }).map((d, i) => ({
    ...d,
    entry: data[i],
  }))
}

const getDataPointsForSeries = ({
  data,
  limit,
  width = 0,
  height = 0,
  margin = 0,
  max = Math.max(...data),
  min = Math.min(0, ...data),
  disableBarAdjustment = false,
}: {
  data: readonly any[]
  limit?: number
  width: number
  height: number
  min?: number
  max?: number
  margin?: SparklinesMargin
  disableBarAdjustment?: boolean
}) => {
  const len = data.length

  if (limit && limit < len) {
    data = data.slice(len - limit)
  }
  const margins = getMargin(margin)
  const yFactor = (height - (margins.top + margins.bottom)) / (max - min || 2)
  const xFactor =
    (width - (margins.left + margins.right)) /
    ((limit || len) - (len > 1 && disableBarAdjustment ? 1 : 0))
  return data.map((d, i) => ({
    x: i * xFactor + margins.left + (disableBarAdjustment ? 0 : xFactor / 2),
    y: (max === min ? 1 : max - d) * yFactor + margins.top,
    value: d,
  }))
}
