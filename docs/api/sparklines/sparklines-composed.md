---
outline: deep
---

# SparklinesComposed

## Properties

### children

- **Optional**
- **Type:** `any`

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

### data

- **Optional**
- **Type:** `number[] | TData[]`

Data of the sparkline. Can be an array of numbers or an array of objects. If the array consists of objects and there is
no `"value"` key available you need the pass a specific `dataKey` to the component to make the value accessible.

### withBarAdjustment

- **Optional**
- **Type:** `boolean`

Enables or disables the first and last point position adjustment for bars, **usually calculated internally**.

### label

- **Optional**
- **Type:** `string | number`

Name of the data. Will be used as headline in `<Tooltip/>`.

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

### preserveAspectRatio

- **Optional**
- **Type:** `string`

Sets the `preserveAspectRatio` property of the `<svg/>` element.

### startAtZero

- **Optional**
- **Type:** `boolean`
- **Default:** `true`

Decides if zero is included to calculate the minimum value. This is useful if you want the lowest positive value not displayed as it would be zero.

### zeroBaseline

- **Optional**
- **Type:** `boolean`

Decides if the sparkline has a zero baseline. If set to true the sparkline will display values as positive and negative values.

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