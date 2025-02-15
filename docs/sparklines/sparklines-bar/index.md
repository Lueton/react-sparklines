<script setup>
import {SparklinesBarExample, SparklinesBarPositiveAndNegative, SparklinesBarCustomization, SparklinesBarGradients, SparklinesBarTooltip} from "../../examples/sparklines-bar.js";
</script>

# SparklinesBar

## Basic Example

The `<SparklinesBar/>` component is the most basic component which allows to visualize bars.

<SparklinesBarExample/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesBar data={data} />
```

## Customization

SparklinesBar comes with flexible customization options. Build sparklines which fit your needs! 

<SparklinesBarCustomization />

```jsx
<SparklinesBar
  color="#be185d"
  data={data}
  radius={8}
/>

<SparklinesBar
  stroke="#d97706"
  fill="#b91c1c"
  strokeWidth={1}
  data={data}
/>

<SparklinesBar
  data={data}
  strokeWidth={2}
  stroke="#059669"
  fill="transparent"
  radius={{ topLeft: 5, topRight: 5 }}
  maxBarWidth={10}
/>

<SparklinesBar
  data={data}
  maxBarWidth={4}
  radius={4}
/>
```

## Positive and Negative

You can simply overwrite your default styling for positive and negative values.

<SparklinesBarPositiveAndNegative />


```jsx
<SparklinesBar
  data={data}
  fill={"yellow"}
  positive={{
    fill: "green",
  }}
  negative={{
    fill: "red",
  }}
/>

<SparklinesBar
  data={data}
  zeroBaseline={true}
  radius={10}
  positive={{
    fill: "green",
    radius: { topLeft: 5, topRight: 5 }
  }}
  negative={{
    fill: "red",
    radius: { bottomLeft: 5, bottomRight: 5 }
  }}
/>
```

## Gradients

It also has gradients! Simply make use of the `fill` property to link your gradient.

:::warning
When using gradients without `stroke` make sure to also pass the `labelColor` property to provide a usable color for `<Tooltip/>`.
:::

<SparklinesBarGradients />

```jsx
<SparklinesBar
  data={data}
  fill={"url(#my-gradient)"}
>
  <defs>
    <linearGradient id="my-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%" stopColor="#7c3aed" />
      <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
  </defs>
</SparklinesBar>
```

## Tooltip

Don't worry, it also has tooltips!

The active bar can be customized by using the `activeBar` property.

<SparklinesBarTooltip/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesBar data={data}>
  <Tooltip/>
</SparklinesLine>
```

For further configuration please have a look at the [`<Tooltip/>`](/general-components/tooltip) component.