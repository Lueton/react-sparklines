<script setup>
import {SparklinesLineExample, SparklinesLineCustomization, SparklinesLineGradients, SparklinesLineDotsSimple, SparklinesLineDotsCustom, SparklinesLineTooltip} from "../../examples/sparklines-line.js";
</script>

# SparklinesLine

## Basic Example

The `<SparklinesLine/>` component is the most basic component which allows to visualize a simple graph.

<SparklinesLineExample/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesLine data={data} />
```

## Customization

SparklinesLine comes with flexible customization options. Build sparklines which fit your needs! 

<SparklinesLineCustomization />

```jsx
<SparklinesLine
  color="#b91c1c" 
  data={data} 
  curved 
/>

<SparklinesLine
  color="#047857"
  data={data}
  style={{ strokeWidth: 4 }}
  margin={4}
/>

<SparklinesLine
  color="#1d4ed8"
  data={data}
  curved={0.6}
  style={{ fill: "transparent" }}
/>

<SparklinesLine 
  data={data}
  style={{ stroke: "#d97706" }} 
/>
```

## Gradients

It also has gradients! Simply make use of the `style.fill` property to link your gradient.

:::warning
When using gradients make sure to also pass the `color` property to provide a usable color for components like `<Tooltip/>`.
:::

<SparklinesLineGradients />

```jsx
<SparklinesLine
  data={data}
  color={"#7c3aed"}
  style={{ fill: "url(#my-gradient)", fillOpacity: 0.6 }}
>
  <defs>
    <linearGradient id="my-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%" stopColor="#7c3aed" />
      <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
  </defs>
</SparklinesLine>
```

## Dots

Dots are a handy feature to hightlight your data points.

To display them simply make use of the `dots` property.

<SparklinesLineDotsSimple/>

```jsx
<SparklinesLine data={data} dots />
```

You can also customize the styling, visibilty and even the shape of the dots!

<SparklinesLineDotsCustom />

```jsx
<SparklinesLine
  data={data}
  dots={{ style: { fill: "#f59e0b" } }}
/>

<SparklinesLine
  data={data}
  dots={(props) => <circle {...props} fill="#047857" r={6} />}
  margin={6}
/>

<SparklinesLine
  data={data}
  dots={<circle fill="#06b6d4" />}
/>

<SparklinesLine
  data={data}
  dots={{ fill: "#e11d48", dot: <circle r={5} /> }}
/>

<SparklinesLine
  data={data}
  dots={{
    dot: (props) => (
      <rect fill="white" x={props.cx - 2} y={props.cy - 2} height={4} width={4} />
    ),
  }}
/>

<SparklinesLine
  data={data}
  dots={{
    show: "START_END",
    dot: (props) => (
      <rect fill="#b45309" x={props.cx - 2} y={props.cy - 2} height={4} width={4} />
    ),
  }}
/>
```

## Tooltip

Don't worry, it also has tooltips!

When using the `<Tooltip/>` component an active dot is displayed by default to indicate the highlighted position. The active dot can be customized by using the `activeDot` property, which is similiar to the `dots` property.

<SparklinesLineTooltip/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesLine data={data}>
  <Tooltip/>
</SparklinesLine>
```

For further configuration please have a look at the [`<Tooltip/>`](/general-components/tooltip) component.