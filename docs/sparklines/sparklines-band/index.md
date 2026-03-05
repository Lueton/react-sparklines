<script setup>
import {SparklinesBandExample, SparklinesBandCustomization} from "../../examples/sparklines-band.js";
</script>

# SparklinesBand

## Basic Example

The `<SparklinesBand/>` component is the most basic component which allows to visualize a band data.

<SparklinesBandExample/>

```jsx
<SparklinesBand data={[
    [-1, 3],
    [3, 7],
    [-5, -1],
    [6, 10],
    [null, null],
    [5, 9],
    [-2, 2],
    [6, 10],
    [1, 5],
    [2, 6],
  ]}
/>
```

## Customization

SparklinesBand comes with flexible customization options. Build sparklines which fit your needs! 

<SparklinesBandCustomization />