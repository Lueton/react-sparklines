import { isNumber } from "lodash"

import { Point } from "../../utils/types.ts";

let prev: null | { x: number; y: number }
const getCurvePoint = (point: { x: number; y: number }, divisor: number) => {
  let res
  if (!prev) {
    res = [point.x, point.y]
  } else {
    const len = (point.x - prev.x) * divisor
    res = ["C", prev.x + len, prev.y, point.x - len, point.y, point.x, point.y]
  }
  prev = point
  return res
}

const getCurvePoints =<TData,> (points: Point<TData>[], divisor: number) => {
  prev = null
  return points.map((p) => getCurvePoint(p, divisor)).reduce((a, b) => a.concat(b))
}

export const getLinePoints = <TData,> (points: Point<TData>[], curved?: boolean | number) => {
  if (curved) {
    const divisor = isNumber(curved) ? curved : 0.4
    return getCurvePoints(points, divisor)
  }
  return points.map((p) => [p.x, p.y]).reduce((a, b) => a.concat(b))
}
