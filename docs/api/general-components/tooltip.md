---
outline: deep
---

# Tooltip

## Parent Components

`<SparklinesLine />, <SparklinesBar />, <SparklinesComposed />`

## Properties

### content

- **Optional**
- **Type:** `ReactElement | ((props: TooltipProps) => ReactNode)`

Custom Tooltip renderer.

### contentStyle

- **Optional**
- **Type:** `CSSProperties`

Styles applied to the tooltip content.

### formatter

- **Optional**
- **Type:** `(payload: TooltipPayload) => ReactNode`

Customer value formatter.

### itemStyle

- **Optional**
- **Type:** `CSSProperties`

Styles applied to the tooltip items.

### label

- **Optional**
- **Type:** `string | number`

Used as headline for the tooltip.

### labelStyle

- **Optional**
- **Type:** `CSSProperties`

Styles applied to the tooltip label.

### separator

- **Optional**
- **Type:** `string`
- **Default:** `" : "`

Separator between name and value.

### wrapperStyle

- **Optional**
- **Type:** `CSSProperties`

Styles applied to the tooltip wrapper.

## Internal Properties

::: warning
The following properties are calculated internally and should not be used. Using one of these properties might cause
critical issues to the component.
:::

### coords

- **Optional**
- **Type:** `{ x: number; y: number }`

Coordinates of the tooltip, usually calculated internally.

### payload

- **Optional**
- **Type:** `Array<TooltipPayload>`

Payload of the tooltip, usually calculated internally.