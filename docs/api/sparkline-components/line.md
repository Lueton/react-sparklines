---
outline: deep
---

# Line

## Parent Components

`<SparklinesComposed />`

## Properties

### color

- **Optional**
- **Type:** `string`
- **Default:** `defaultColor`

Color of the corresponding stroke.\
The final color of the stroke is determined by `color || style.stroke || defaultColor`

### curved

- **Optional**
- **Type:** `boolean | number`

If false set, the line will be drawn linear. If true set the line will be drawn curved. If number set, the line will be
drawn curved with the provided divisor.

### dataKey

- **Optional**
- **Type:** `text | number | (entry: TData) => string | number`
- **Default:** `"value"`

The key or getter of an object of data.

### dots

- **Optional**
- **Type:** `ReactElement<SVGElement>
  | ((props: DotProps) => ReactElement<SVGElement>)
  | DotProps
  | boolean`

If false set, dots will not be drawn. If true set, dots will be drawn which have the props calculated internally. If
object set, dots will be drawn which have the props merged by the internal calculated props and the option. If
ReactElement set, the option can be the custom dot element. If set a function, the function will be called to render
customized dot.

### activeDot

- **Optional**
- **Type:** `ReactElement<SVGElement>
  | ((props: DotProps) => ReactElement<SVGElement>)
  | DotProps
  | boolean`

If false set, the active dot will not be drawn. If true set, the active dot will be drawn which have the props
calculated internally. If object set, the active dot will be drawn which have the props merged by the internal
calculated props and the option. If ReactElement set, the option can be the custom active dot element. If set a function,
the function will be called to render customized active dot.

### name

- **Optional**
- **Type:** `string`

The name of data. This option will be used in tooltip to represent a line. If no value was set to this option, the value
of dataKey will be used alternatively.

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

