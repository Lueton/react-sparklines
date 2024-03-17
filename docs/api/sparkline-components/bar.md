---
outline: deep
---

# Bar

## Parent Components

`<SparklinesComposed />`

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

The maximum width of the bars. This is the recommended way of sizing bars.

### color

- **Optional**
- **Type:** `string`
- **Default:** `defaultColor`

Color of the corresponding bar.\
The final color of the bar is determined by `style.fill || color || defaultColor`

[//]: # (TODO add example)

::: info
This behavior differs from the `<Line/>` component to enable using gradients while still using a custom color for the tooltip without overriding the `fill` property.
:::

### dataKey

- **Optional**
- **Type:** `text | number | (entry: TData) => string | number`
- **Default:** `"value"`

The key or getter of an object of data.

### name

- **Optional**
- **Type:** `string`

The name of data. This option will be used in tooltip to represent a line. If no value was set to this option, the value
of dataKey will be used alternatively.

### radius

- **Optional**
- **Type:** `number | { topLeft?: number; topRight?: number; bottomLeft?: number; bottomRight?: number }`
- **Default:** `0`

If set a value, the option is the radius of all or the rounded corners of the bar. If set an object, the option is the
radius of the provided corners of the bar.

### style

- **Optional**
- **Type:** `CSSProperties`

Style of the corresponding `<path/>` element.

## Internal Properties

::: warning
The following properties are calculated internally and should not be used. Using one of these properties might cause
critical issues to the component.
:::

### activeIndex

- **Optional**
- **Type:** `number | null`

Index of the active (hovering) data entry, **usually calculated internally**.

### clipPathId

- **Optional**
- **Type:** `string`

Id of the `<clipPath/>` of the `<svg/>`, **usually calculated internally**.

### disableBarAdjustment

- **Optional**
- **Type:** `boolean`

Enables or disables the first and last point position adjustment for bars, **usually calculated internally**.

### width

- **Optional**
- **Type:** `number`

Width of the line, **usually calculated internally**.

### height

- **Optional**
- **Type:** `number`

Height of the line, **usually calculated internally**.

### margin

- **Optional**
- **Type:** `number | { top?: number; right?: number; bottom?: number; left?: number }`

The sizes of whitespace around the container, **usually calculated internally**.

### points

- **Optional**
- **Type:** `Point[]`

The coordinates of all the points in the line, **usually calculated internally**.

