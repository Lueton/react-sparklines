"use client";
import { SparklinesComposed, Line } from "@lueton/react-sparklines";

export default function Fill() {
  return (
    <SparklinesComposed data={[1, 5, 3, 8, 4, 7, 2, 8, 3, 4]}>
      <Line fill="#3b82f6" stroke="#3b82f6" />
    </SparklinesComposed>
  );
}
