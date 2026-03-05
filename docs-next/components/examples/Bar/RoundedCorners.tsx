"use client";
import { SparklinesComposed, Bar } from "@lueton/react-sparklines";

export default function RoundedCorners() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar radius={8} />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Bar radius={{ topLeft: 5, topRight: 5 }} />
        </SparklinesComposed>
      </div>
    </>
  );
}
