"use client";
import { SparklinesComposed, Line } from "@lueton/react-sparklines";

export default function Styling() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <SparklinesComposed data={data}>
      <Line stroke="#047857" fill="#047857" strokeWidth={3} />
    </SparklinesComposed>
  );
}
