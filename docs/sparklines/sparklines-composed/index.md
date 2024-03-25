<script setup>
import {SparklinesComposedSimple, SparklinesComposedTooltip} from "../../examples/sparklines-composed.js";
</script>

# SparklinesComposed

## Basic Example

The SparklinesComposed component allows you to display multiple sparklines with different data.

<SparklinesComposedSimple/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesComposed data={data}>
  <Bar />
  <Line />
</SparklinesComposed>

const complexData = [
  {a: 1, b: 4},
  {a: 5, b: 3},
  {a: 3, b: 8},
  {a: 8, b: 2},
  {a: 4, b: 7},
  {a: 7, b: 4},
  {a: 2, b: 8},
  {a: 8, b: 3},
  {a: 3, b: 5},
  {a: 4, b: 1}
]
<SparklinesComposed data={complexData}>
  <Bar dataKey="a" />
  <Line dataKey="b" />
</SparklinesComposed>
```

## Tooltip

<SparklinesComposedTooltip/>

```jsx
<SparklinesComposed data={data} label="Fruits">
  <Bar fill="#ca8a04" name="Oranges" />
  <Line stroke="#27ae60" fill="#27ae60" name="Kiwis" />
  <Tooltip />
</SparklinesComposed>

<SparklinesComposed data={data} label="Fruits">
  <Bar fill="#ca8a04" name="Oranges" />
  <Line stroke="#27ae60" fill="#27ae60" name="Kiwis" />
  <Tooltip />
</SparklinesComposed>

<SparklinesComposed data={complexData} label="Fruits">
  <Line stroke="#27ae60" fill="#27ae60" name="Kiwis" dataKey="b" />
  <Bar fill="#ca8a04" name="Oranges" dataKey="a" />
  <Tooltip 
    contentStyle={{ background: "black", borderColor: "black" }}
    labelStyle={{ color: "white" }}
  />
</SparklinesComposed>
```