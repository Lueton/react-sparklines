import { CSSProperties, DOMAttributes, ReactElement, RefObject, SVGProps } from "react";

export type Margin = { top: number; right: number; bottom: number; left: number };
export type SparklinesMargin =
  | number
  | Partial<{ top: number; right: number; bottom: number; left: number }>;
export type SparklinesRadius =
  | number
  | Partial<{
      topLeft: number;
      topRight: number;
      bottomLeft: number;
      bottomRight: number;
    }>;
export type LineDotsVisibility = "START" | "END" | "START_END" | boolean;
export type FilteredSvgElementType = "svg" | "polyline" | "polygon";

export interface Point<TData> {
  x: number;
  y: number;
  value: number;
  entry: TData;
}

export interface UseInteractivityProps<TData> {
  ref: RefObject<SVGRectElement>;
  data: UseSparklineData<TData>;
  onMouseMove?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseLeave?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseEnter?: (event: MouseEvent, data: EventData<TData>) => void;
  onClick?: (event: MouseEvent, data: EventData<TData>) => void;
}

export interface DotProps extends SVGProps<SVGCircleElement> {
  className?: string;
  cx?: number;
  cy?: number;
  r?: number;
  dot?: ReactElement<SVGElement> | ((props: DotProps) => ReactElement<SVGElement>);
  show?: LineDotsVisibility;
  color?: string;
}

export type LineDot =
  | ReactElement<SVGElement>
  | ((props: DotProps) => ReactElement<SVGElement>)
  | DotProps
  | boolean
  | undefined
  | null;

export type ActiveBar = CSSProperties | boolean;

export type Tooltip<TData> =
  | ReactElement<SVGPathElement>
  | ((props: BarProps<TData>) => ReactElement<SVGPathElement>)
  | BarProps<TData>
  | boolean;

export type Points<TData> = Point<TData>[];
export type DataKey = string | number;

export interface EventData<TData> {
  activeIndex: number | null;
  activeEntry: SparklineChildDataEntry<TData>[];
}

export interface SparklinesComposedProps<TData> {
  margin?: SparklinesMargin;
  min?: number;
  max?: number;
  data?: TData[];
  limit?: number;
  width?: number;
  height?: number;
  preserveAspectRatio?: string;
  style?: CSSProperties;
  disableBarAdjustment?: boolean;
  label?: string | number;
  children?: any;
  clip?: boolean;
  startAtZero?: boolean;
  onMouseMove?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseLeave?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseEnter?: (event: MouseEvent, data: EventData<TData>) => void;
  onClick?: (event: MouseEvent, data: EventData<TData>) => void;
}

export type SparklinesLineProps<TData> = SparklinesComposedProps<TData> & LineShapeProps;

export type SparklinesBarProps<TData> = SparklinesComposedProps<TData> & BarShapeProps;

export interface InternalShapeProps<TData> {
  sparklineData?: UseSparklineData<TData>
  points?: Points<TData>;
  width?: number;
  height?: number;
  margin?: SparklinesMargin;
  disableBarAdjustment?: boolean;
  activeIndex?: number | null;
  clipPathId?: string;
  tooltip?: boolean;
}

export interface ShapeProps {
  dataKey?: DataKey;
  style?: CSSProperties;
  labelColor?: string;
  name?: string;
  axis?: string | number
}

export interface LineShapeExtraProps extends ShapeProps {
  dots?: LineDot;
  activeDot?: LineDot;
  curved?: boolean | number;
}

export interface BarShapeExtraProps extends ShapeProps {
  radius?: SparklinesRadius;
  activeBar?: ActiveBar;
  barWidth?: number;
  maxBarWidth?: number;
}

export interface ReferenceLineExtraProps extends ShapeProps{
  x?: number | string,
  y?: number
}

export type LineShapeProps = Omit<PresentationAttributesWithProps<SVGPathElement>, "points" | "name" | "width" | "height"> &
  LineShapeExtraProps;

export type BarShapeProps = Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "radius" | "width" | "height"
> &
  BarShapeExtraProps;

export type LineProps<TData> = Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name"
> &
  LineShapeProps &
  InternalShapeProps<TData>;

export type BarProps<TData> = Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "radius"
> &
  BarShapeProps &
  InternalShapeProps<TData>;

export type ReferenceLineProps<TData> = Omit<
  PresentationAttributesWithProps<SVGLineElement>,
  "points"
> &
  ReferenceLineExtraProps &
  InternalShapeProps<TData>;

export interface SparklineChildDataEntry<TData> {
  dataKey: DataKey;
  x: number;
  y: number;
  value: number;
  index: number;
  entry: TData;
  color: string;
}

export interface SparklineChildData<TData> {
  dataKey: DataKey;
  childData: SparklineChildDataEntry<TData>[];
  points: Points<TData>;
  color: string;
  axis: Axis
}

export interface Axis {
  id: number | string,
  xFactor: number,
  yFactor: number,
  width: number,
  height: number,
  margin: Margin,
  min: number,
  max: number,
  disableBarAdjustment?: boolean;
  startAtZero?: boolean
  limit?: number
}

export type Axes = {[key: string | number] : Axis};

export interface UseSparklineData<TData> {
  originalData: any[];
  sparklineData: SparklineChildData<TData>[];
  dataKeys: DataKey[];
  labels: any[];
  axes: Axes
}

export interface UseSparklineDataProps {
  data: any[];
  children: any;
  limit?: number;
  width: number;
  height: number;
  min?: number;
  max?: number;
  margin?: SparklinesMargin;
  disableBarAdjustment?: boolean;
  startAtZero?: boolean
}

export type PresentationAttributesWithProps<T> = Omit<SVGProps<T>, keyof DOMAttributes<T>>;
