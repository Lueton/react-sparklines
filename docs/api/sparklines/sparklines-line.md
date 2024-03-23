---
outline: deep
---

# SparklinesLine

## Properties

### children

- **Optional**
- **Type:** `any`

Children of the component. Usually used for `<defs/>` or `<Tooltip/>`.

:::warning
Even though `<SparklinesLine/>` is using `<SparklinesComposed/>` under the hood it is not recommended to pass children
like `<Line/>` oder `<Bar/>`.
:::

### clip

- **Optional**
- **Type:** `boolean`
- **Default:** `false`

If true set, the underlying components will be clipped to the `<svg/>` element. This is usually used when also using
the `min`, `max` in combination with the `margin` property to prevent overflowing.

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

### data

- **Optional**
- **Type:** `number[] | any[]`

Data of the sparkline. Can be an array of numbers or an array of objects. If the array consists of objects and there is
no `"value"` key available you need the pass a specific `dataKey` to the component to make the value accessible.

### dataKey

- **Optional**
- **Type:** `text | number | (entry: TData) => string | number`
- **Default:** `"value"`

The key or getter of an object of data.

### disableBarAdjustment

- **Optional**
- **Type:** `boolean`
- **Default:** `false`

Enables or disables the first and last point position adjustment for bars.

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
calculated props and the option. If ReactElement set, the option can be the custom active dot element. If set a
function,
the function will be called to render customized active dot.

### label

- **Optional**
- **Type:** `string | number`

Name of the data. Will be used as headline in `<Tooltip/>`.

### limit

- **Optional**
- **Type:** `number`

Limits the displayed data to last `limit` entries of the provided `data`. This is usually used to display a maximum
number of entries while constantly adding new entries to the `data` array.

### margin

- **Optional**
- **Type:** `number | { top?: number; right?: number; bottom?: number; left?: number }`
- **Default:** `2`

The sizes of whitespace around the container.

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

### preserveAspectRatio

- **Optional**
- **Type:** `string`

Sets the `preserveAspectRatio` property of the `<svg/>` element.

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