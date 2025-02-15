---
outline: deep
---

# SparklinesBar

## Properties

### activeBar

- **Optional**
- **Type:** `ReactElement<SVGElement>
  | ((props: BarProps) => ReactElement<SVGElement>)
  | BarProps
  | boolean`

The active bar is shown when a user enters a bar chart. If set to false, no active bar will
be drawn. If set to true, active bar will be drawn with the props calculated internally. If passed an object, active bar
will be drawn, and the internally calculated props will be merged with the key value pairs of the passed object. If
passed a ReactElement, the option can be the custom active bar element. If passed a function, the function will be
called to render a customized active bar.

### barWidth

- **Optional**
- **Type:** `number`

The width of the bars. It is recommended to use `maxBarWidth` to prevent overflowing bars.

### maxBarWidth

- **Optional**
- **Type:** `number`

The maximum width of the bars. This is the preferred way of sizing bars instead of `barWidth`.

### barGap
- **Optional**
- **Type:** `number | string`
- **Default:** `10%`

Gap between bars which can be a percent value or a fixed value. Depending on the actual space this property might be overwritten by `barWidth` and `maxBarWidth`.


### children

- **Optional**
- **Type:** `any`

Children of the component. Usually used for `<defs/>` or `<Tooltip/>`.

:::warning
Even though `<SparklinesBar/>` is using `<SparklinesComposed/>` under the hood it is not recommended to pass children
like `<Line/>` or `<Bar/>`.
:::

### clip

- **Optional**
- **Type:** `boolean`
- **Default:** `false`

If true set, the underlying components will be clipped to the `<svg/>` element. This is usually used when also using
the `min`, `max` in combination with the `margin` property to prevent overflowing.

### data

- **Optional**
- **Type:** `number[] | TData[]`

Data of the sparkline. Can be an array of numbers or an array of objects. If the array consists of objects and there is
no `"value"` key available you need the pass a specific `dataKey` to the component to make the value accessible.

### dataKey

- **Optional**
- **Type:** `text | number | (entry: TData) => string | number`
- **Default:** `"value"`

The key or getter of an object of data.

### withBarAdjustment

- **Optional**
- **Type:** `boolean`

Enables or disables the first and last point position adjustment for bars, **usually calculated internally**.

### fill

- **Optional**
- **Type:** `string`

The color of the area.

### fillOpacity

- **Optional**
- **Type:** `string | number`

The opacity of the area.

### label

- **Optional**
- **Type:** `string | number`

Name of the data. Will be used as headline in `<Tooltip/>`.

### labelColor

- **Optional**
- **Type:** `string`

The color of the Tooltip label. Usually calculated internally but needed when using gradients without a stroke.

### limit

- **Optional**
- **Type:** `number`

Limits the displayed data to last `limit`'s entries of the provided `data`. This is usually used to display a maximum
number of entries while constantly adding new entries to the `data` array.

### margin

- **Optional**
- **Type:** `number | { top?: number; right?: number; bottom?: number; left?: number }`
- **Default:** `3`

The sizes of whitespace around the `<svg/>` element.

### min

- **Optional**
- **Type:** `number`
- **Default:** `0`

Minimum displayed value of the provided data.

### max

- **Optional**
- **Type:** `number`

Maximum displayed value of the provided data.

### name

- **Optional**
- **Type:** `string`

The name of data. This option will be used in tooltip to represent a line. If no value was set to this option, the value
of dataKey will be used alternatively.

### positive

- **Optional**
- **Type:** `Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "radius" | "width" | "height"> & {radius? : SparklinesRadius}`

With this you can basically overwrite your styling (e.g. stroke, fill, etc.) of the Bar element if the given y value is
positive.

### negative

- **Optional**
- **Type:** `Omit<
  PresentationAttributesWithProps<SVGPathElement>,
  "points" | "name" | "radius" | "width" | "height"> & {radius? : SparklinesRadius}`

With this you can basically overwrite your styling (e.g. stroke, fill, etc.) of the Bar element if the given y value is
negative.

### preserveAspectRatio

- **Optional**
- **Type:** `string`

Sets the `preserveAspectRatio` property of the `<svg/>` element.

### radius

- **Optional**
- **Type:** `number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number }`
- **Default:** `0`

If set a value, the option is the radius of all or the rounded corners of the bar. If set an object, the option is the
radius of the provided corners of the bar.

### startAtZero

- **Optional**
- **Type:** `boolean`
- **Default:** `true`

Decides if zero is included to calculate the minimum value. This is useful if you want the lowest positive value not displayed as it would be zero.

### zeroBaseline

- **Optional**
- **Type:** `boolean`

Decides if the sparkline has a zero baseline. If set to true the sparkline will display values as positive and negative values.

### stroke

- **Optional**
- **Type:** `string`

The color of the stroke.

### strokeWidth

- **Optional**
- **Type:** `string | number`

The width of the stroke.

### style

- **Optional**
- **Type:** `CSSProperties`

Style of the corresponding `<path/>` element.

### width

- **Optional**
- **Type:** `number`
- **Default:** `240`

Width of the component.

### height

- **Optional**
- **Type:** `number`
- **Default:** `60`

Height of the component.

### onMouseMove

- **Optional**
- **Type:** `(event: MouseEvent, data: EventData<TData>) => void`

Event listener for `mousemove` events.

### onMouseLeave

- **Optional**
- **Type:** `(event: MouseEvent, data: EventData<TData>) => void`

Event listener for `mouseleave` events.

### onMouseEnter

- **Optional**
- **Type:** `(event: MouseEvent, data: EventData<TData>) => void`

Event listener for `mouseenter` events.

### onClick

- **Optional**
- **Type:** `(event: MouseEvent, data: EventData<TData>) => void`

Event listener for `click` events.