import { CSSProperties, ReactElement, SVGProps } from "react"

export type Margin = { top: number; right: number; bottom: number; left: number }
export type SparklinesMargin =
  | number
  | Partial<{ top: number; right: number; bottom: number; left: number }>
export type SparklinesRadius =
  | number
  | Partial<{
      topLeft: number
      topRight: number
      bottomLeft: number
      bottomRight: number
    }>
export type LineDotsVisibility = "START" | "END" | "START_END" | boolean
export type FilteredSvgElementType = "svg" | "polyline" | "polygon"

export interface Point {
  x: number
  y: number
  value: number
  entry: any
}

export interface LinePoint {
  value?: number
  x: number
  y: number
}

export interface DotsProps {
  dots: LineDot
  points: LinePoint[]
}

export interface DotProps extends SVGProps<SVGCircleElement> {
  className?: string
  cx?: number
  cy?: number
  r?: number
  dot?: ReactElement<SVGElement> | ((props: DotProps) => ReactElement<SVGElement>)
  show?: LineDotsVisibility
}

export type LineDot =
  | ReactElement<SVGElement>
  | ((props: DotProps) => ReactElement<SVGElement>)
  | DotProps
  | boolean

export type ActiveBar = CSSProperties | boolean

export type Tooltip =
  | ReactElement<SVGPathElement>
  | ((props: BarProps) => ReactElement<SVGPathElement>)
  | BarProps
  | boolean

export type Points = Point[]
export type DataKey = string | number

export interface EventData {
  activeIndex: number | null
  activeEntry: any
}

export interface SparklinesComposedProps {
  margin?: SparklinesMargin
  min?: number
  max?: number
  data?: any[]
  limit?: number
  width?: number
  height?: number
  preserveAspectRatio?: string
  style?: CSSProperties
  color?: string
  disableBarAdjustment?: boolean
  label?: string | number
  children?: any
  clip?: boolean
  onMouseMove?: (event: MouseEvent, data: EventData) => void
  onMouseLeave?: (event: MouseEvent, data: EventData) => void
  onMouseEnter?: (event: MouseEvent, data: EventData) => void
  onClick?: (event: MouseEvent, data: EventData) => void
}

export type SparklinesLineProps = SparklinesComposedProps & LineShapeProps

export type SparklinesBarProps = SparklinesComposedProps & BarShapeProps

export interface InternalShapeProps {
  points?: Points
  width?: number
  height?: number
  margin?: SparklinesMargin
  disableBarAdjustment?: boolean
  activeIndex?: number | null
  clipPathId?: string,
  tooltip?: boolean
}

export interface ShapeProps {
  dataKey?: DataKey
  style?: CSSProperties
  color?: string
  name?: string
}

export interface LineShapeProps extends ShapeProps {
  dots?: LineDot
  activeDot?: LineDot
  connectNulls?: boolean
  curved?: boolean | number
}

export interface BarShapeProps extends ShapeProps {
  /**
   * radius: Radius of the bar corners
   */
  radius?: SparklinesRadius
  activeBar?: ActiveBar
  barWidth?: number
  maxBarWidth?: number
}

export type LineProps = LineShapeProps & InternalShapeProps

export type BarProps = BarShapeProps & InternalShapeProps
