import {
  CSSProperties,
  DOMAttributes,
  FC,
  ReactElement,
  ReactNode,
  RefObject,
  SVGProps,
} from "react";

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
  value: number | null;
  entry: TData;
}

export interface UseInteractivityProps<TData> {
  ref: RefObject<SVGRectElement | null>;
  data: UseSparklineData<TData>;
  children: any;
  onMouseMove?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onMouseLeave?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onMouseEnter?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onClick?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
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

export interface SparklinesEventData<TData> {
  activeIndex: number | null;
  activeEntry: SparklineDataEntry<TData>[];
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
  withBarAdjustment?: boolean;
  label?: ReactNode;
  children?: any;
  clip?: boolean;
  startAtZero?: boolean;
  zeroBaseline?: boolean;
  onMouseMove?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onMouseLeave?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onMouseEnter?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
  onClick?: (event: MouseEvent, data: SparklinesEventData<TData>) => void;
}

export type SparklinesLineProps<TData> = SparklinesComposedProps<TData> & LineShapeProps;

export type SparklinesBarProps<TData> = SparklinesComposedProps<TData> & BarShapeProps;

export interface InternalShapeProps<TData> {
  sparklineData?: UseSparklineData<TData>;
  data?: SparklineData<TData>;
  width?: number;
  height?: number;
  margin?: SparklinesMargin;
  withBarAdjustment?: boolean;
  activeIndex?: number | null;
  clipPathId?: string;
  tooltip?: boolean;
  startAtZero?: boolean;
  zeroBaseline?: boolean;
}

export interface ShapeProps {
  dataKey?: DataKey;
  style?: CSSProperties;
  labelColor?: string;
  name?: string;
  axis?: string | number;
}

export interface LineShapeExtraProps extends ShapeProps {
  dots?: LineDot;
  activeDot?: LineDot;
  curved?: boolean | number;
  connectNulls?: boolean;
}

export interface BarShapeExtraProps extends ShapeProps {
  radius?: SparklinesRadius;
  activeBar?: ActiveBar;
  barWidth?: number;
  maxBarWidth?: number;
  barGap?: number | string;
  positive? : Omit<
    PresentationAttributesWithProps<SVGPathElement>,
    "points" | "name" | "radius" | "width" | "height"
  > & {radius? : SparklinesRadius},
  negative? : Omit<
    PresentationAttributesWithProps<SVGPathElement>,
    "points" | "name" | "radius" | "width" | "height"
  > & {radius? : SparklinesRadius}
}

export interface ReferenceLineExtraProps extends ShapeProps {
  x?: number | string;
  y?: number;
}

export type LineShapeProps = Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "width" | "height"
> &
  LineShapeExtraProps;

export type BarShapeProps = Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "radius" | "width" | "height"
> &
  BarShapeExtraProps;

export type Line<TData> = FC<LineProps<TData>>;
export type Bar<TData> = FC<BarProps<TData>>;
export type ReferenceLine<TData> = FC<ReferenceLineProps<TData>>;

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

export interface SparklinesDataEntry<TData> {
  dataKey: DataKey;
  x: number;
  y: number;
  value: number | null;
  index: number;
  entry: TData;
  color: string;
}

export interface SparklineChildData<TData> {
  dataKey: DataKey;
  childData: SparklinesDataEntry<TData>[];
  points: Points<TData>;
  color: string;
  axis: Axis;
}

export interface UseSparklineDataProps {
  originalData: any[];
  children: any[];
  max?: number;
  min?: number;
  startAtZero?: boolean;
  zeroBaseline?: boolean;
  withBarAdjustment?: boolean;
  limit?: number;
  height: number;
  width: number;
  margin: Margin;
}

export interface Axis {
  id: number | string;
  min: number;
  max: number;
  xAxis: {
    domain: number[];
    range: number[];
  };
  yAxis: {
    domain: number[];
    range: number[];
  };
  getX: (x: number) => number;
  getY: (y: number | null) => number;
  getPoint: (point: [number, number | null]) => [number, number];
}

export type Axes = { [key: string | number]: Axis };

export interface SparklineDataEntry<TData> {
  label: any;
  dataKey: DataKey;
  x: number;
  y: number | null;
  index: number;
  original: TData;
  color: string;
}

export interface SparklineData<TData> {
  dataKey: DataKey;
  color: string;
  axis: Axis;
  entries: SparklineDataEntry<TData>[];
  values: (number | null)[];
  points: [number, number | null][];
  pointsDefined: [number, number][];
  coords: [number, number][];
}

export interface UseSparklineData<TData> {
  originalData: TData[];
  dataKeys: DataKey[];
  labels: (ReactNode | ((data: any) => ReactNode))[];
  axes: Axes;
  options: SparklineOptions;
  sparklines: SparklineData<TData>[];
}

export interface SparklineOptions {
  max?: number;
  min?: number;
  startAtZero?: boolean;
  zeroBaseline?: boolean;
  withBarAdjustment?: boolean;
  limit?: number;
  height: number;
  width: number;
  margin: Margin;
}

export type PresentationAttributesWithProps<T> = Omit<SVGProps<T>, keyof DOMAttributes<T>>;

export type TooltipContent = ReactElement | ((props: TooltipProps) => ReactNode) | undefined;

export interface TooltipPayload {
  name?: DataKey;
  value?: number | null;
  dataKey?: DataKey;
  color?: string;
}

export interface TooltipProps {
  content?: TooltipContent;
  contentStyle?: CSSProperties;
  coords?: { x: number; y: number };
  itemStyle?: CSSProperties;
  label?: ReactNode;
  labelStyle?: CSSProperties;
  payload?: Array<TooltipPayload>;
  separator?: string;
  wrapperStyle?: CSSProperties;
  formatter?: (payload: TooltipPayload) => ReactNode;
}

export interface CurveProps<TData> {
  curve?: boolean | number;
  connectNulls?: boolean;
  data?: SparklineData<TData>;
}

export interface AreaProps<TData> {
  height: number;
  curve?: boolean | number;
  connectNulls?: boolean;
  data?: SparklineData<TData>;
  zeroBaseline?: boolean;
  margin: Margin;
}

export interface RectProps<TData> {
  height: number;
  margin: Margin;
  zeroBaseline?: boolean;
  barWidth?: number;
  maxBarWidth?: number;
  barGap?: number | string;
  radius?: SparklinesRadius;
  data?: SparklineData<TData>;
  point?: [number, number | null];
}
