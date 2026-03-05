"use client";
import { SparklinesComposed, Line, Tooltip } from "@lueton/react-sparklines";

export default function ActiveDot() {
  return (
    <SparklinesComposed data={[1, 5, 3, 8, 4, 7, 2, 8, 3, 4]}>
      <Line activeDot={{ fill: "red", r: 6 }} />
      <Tooltip />
    </SparklinesComposed>
  );
}
