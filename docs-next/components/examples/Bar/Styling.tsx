"use client";
import { SparklinesComposed, Bar } from "@lueton/react-sparklines";

export default function Styling() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar fill="#be185d" stroke="#d97706" strokeWidth={1} />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar
            radius={{ topLeft: 5, topRight: 5 }}
            maxBarWidth={10}
            strokeWidth={2}
            stroke="#059669"
            fill="transparent"
          />
        </SparklinesComposed>
      </div>
    </>
  );
}
