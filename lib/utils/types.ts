import { CSSProperties, ReactElement, RefObject, SVGProps } from "react";

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

export interface LinePoint {
  value?: number;
  x: number;
  y: number;
}

export interface DotProps extends SVGProps<SVGCircleElement> {
  className?: string;
  cx?: number;
  cy?: number;
  r?: number;
  dot?: ReactElement<SVGElement> | ((props: DotProps) => ReactElement<SVGElement>);
  show?: LineDotsVisibility;
  color?: string
}

export type LineDot =
  | ReactElement<SVGElement>
  | ((props: DotProps) => ReactElement<SVGElement>)
  | DotProps
  | boolean
  | undefined
  | null

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
  color?: string;
  disableBarAdjustment?: boolean;
  label?: string | number;
  children?: any;
  clip?: boolean;
  onMouseMove?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseLeave?: (event: MouseEvent, data: EventData<TData>) => void;
  onMouseEnter?: (event: MouseEvent, data: EventData<TData>) => void;
  onClick?: (event: MouseEvent, data: EventData<TData>) => void;
}

export type SparklinesLineProps<TData> = SparklinesComposedProps<TData> & LineShapeProps;

export type SparklinesBarProps<TData> = SparklinesComposedProps<TData> & BarShapeProps;

export interface InternalShapeProps<TData> {
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
  color?: string;
  name?: string;
}

export interface LineShapeProps extends ShapeProps {
  dots?: LineDot;
  activeDot?: LineDot;
  curved?: boolean | number;
}

export interface BarShapeProps extends ShapeProps {
  radius?: SparklinesRadius;
  activeBar?: ActiveBar;
  barWidth?: number;
  maxBarWidth?: number;
}

export type LineProps<TData> = LineShapeProps & InternalShapeProps<TData>;

export type BarProps<TData> = BarShapeProps & InternalShapeProps<TData>;

export interface SparklineChildDataEntry<TData> {
  dataKey: DataKey;
  x: number;
  y: number;
  value: number;
  index: number;
  entry: TData;
  color: string
}

export interface SparklineChildData<TData> {
  dataKey: DataKey;
  childData: SparklineChildDataEntry<TData>[];
  points: Points<TData>;
  color: string
}

export interface UseSparklineData<TData> {
  originalData: any[];
  sparklineData: SparklineChildData<TData>[];
  dataKeys: DataKey[];
  labels: any[]
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
}