---
outline: deep
---

# ReferenceLine

## Parent Components

`<SparklinesComposed />`, `<SparklinesLine />`, `<SparklinesBar />`

## Properties

### axis

- **Optional**
- **Type:** `number | string`
- **Type:** `0`

Unique id of the axis. Usually used to display multiple data series with independent scaling.

### fill

- **Optional**
- **Type:** `string`

The color of the area.

### fillOpacity

- **Optional**
- **Type:** `string | number`

The opacity of the area.

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

### x

- **Optional**
- **Type:** `number`

X coordinate of the vertical line, usually the index of a specific data entry.

### y

- **Optional**
- **Type:** `number`

Y coordinate of the horizontal line.

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

### withBarAdjustment

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

