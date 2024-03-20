<script setup>
import {SparklinesBarExample, SparklinesBarCustomization, SparklinesBarGradients, SparklinesBarTooltip} from "../../examples/sparklines-bar.js";
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
  color="#b91c1c"
  data={data}
  style={{ strokeWidth: 1, stroke: "#d97706" }}
/>

<SparklinesBar
  data={data}
  style={{ strokeWidth: 2, stroke: "#059669", fill: "transparent" }}
  radius={{ topLeft: 5, topRight: 5 }}
  maxBarWidth={10}
/>

<SparklinesBar
  data={data}
  maxBarWidth={4}
  radius={4}
/>
```

## Gradients

It also has gradients! Simply make use of the `style.fill` property to link your gradient.

:::warning
When using gradients make sure to also pass the `color` property to provide a usable color for components like `<Tooltip/>`.
:::

<SparklinesBarGradients />

```jsx
<SparklinesBar
  data={data}
  color={"#7c3aed"}
  style={{ fill: "url(#my-gradient)" }}
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