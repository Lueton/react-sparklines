<script setup>
import {SparklinesLineExample, SparklinesComposedExample, SparklinesBarExample} from "../examples/quick-start.js";
</script>

# Quick Start

Learn the basics of working with React Sparklines components.

After the [installation](./installation), you can import any React Sparklines component and start playing around. Ready
to build your first Sparkline? :rocket:

## Simple Sparkline

Display a simple Sparkline by using the [`<SparklinesLine/>`](/sparklines/sparklines-line/) Component.

<SparklinesLineExample/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesLine data={data} />
```

That was easy right?

You prefer Bars? Don't worry, React Sparklines got you! :fist_right::fist_left:

## Sparkline with Bars

Display a simple Sparkline with Bars by using the [`<SparklinesBar/>`](/sparklines/sparklines-bar/) Component.

<SparklinesBarExample/>

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesBar data={data} />
```

What did you say? You want to display even more data? :fire:

## Sparkline with Line and Bar

Display a simple Sparkline with Line and Bars by using the [`<SparklineComposed/>`](/sparklines/sparklines-composed/)
Component.

<SparklinesComposedExample />

```jsx
const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
<SparklinesComposed data={data}>
  <Line />
  <Bar />
</SparklinesComposed>

const complexData = data.map((v, i) => ({ a: v, b: data[data.length - i - 1] }));
<SparklinesComposed data={complexData}>
  <Bar dataKey="a" />
  <Line dataKey="b" />
</SparklinesComposed>
```

At this point you just need to be creative! :rainbow:
