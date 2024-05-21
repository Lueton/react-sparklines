# Floating UI

The example given below is a minimal example of how to use [Floating UI](https://floating-ui.com/) to create tooltips within React Sparklines.

<iframe src="https://codesandbox.io/embed/hfrntk?view=preview&module=%2Fsrc%2FApp.tsx"
style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
title="@lueton/react-sparklines-floating-ui"
allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

[![Edit @lueton/react-sparklines-floating-ui](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/lueton-react-sparklines-floating-ui-hfrntk?file=%2Fsrc%2FApp.tsx%3A41%2C40)

## Code Example

```jsx
import {
  SparklinesLine,
} from "@lueton/react-sparklines";
import {
  autoPlacement,
  offset,
  shift,
  useClientPoint,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";

import { useState } from "react";

export default function App() {
  const demoData = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), shift(), autoPlacement()],
  });
  const hover = useHover(context);
  const clientPoint = useClientPoint(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    clientPoint,
  ]);
  const [activeEntry, setActiveEntry] = useState<
  | {
    dataKey: string | number,
    x: number,
    y: number,
    value: number,
    index: number,
    entry: number,
    color: string,
  }[]
  | null
  >(null);

  return (
    <div>
      <SparklinesLine
        data={demoData}
        ref={refs.setReference}
        {...getReferenceProps()}
        onMouseMove={(_event, eventData) => {
          setActiveEntry(eventData.activeEntry);
        }}
      />
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{ background: "gray", padding: 5, ...floatingStyles }}
          {...getFloatingProps()}
        >
          MyValue: {activeEntry?.[0].value}
        </div>
      )}
    </div>
  );
}

```