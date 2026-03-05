"use client";
import { SparklinesBar, Tooltip } from "@lueton/react-sparklines";

export default function TooltipExample() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <SparklinesBar data={data}>
      <Tooltip />
    </SparklinesBar>
  );
}
