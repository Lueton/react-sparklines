"use client";
import { SparklinesComposed, Bar } from "@lueton/react-sparklines";

export default function BarSizing() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar maxBarWidth={10} />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar maxBarWidth={4} radius={4} />
        </SparklinesComposed>
      </div>
    </>
  );
}
