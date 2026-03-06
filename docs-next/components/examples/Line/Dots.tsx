"use client";
import { SparklinesComposed, Line } from "@lueton/react-sparklines";

export default function Dots() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Line dots />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Line dots={{ style: { fill: "#f59e0b" } }} />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Line dots={(props) => <circle {...(props as any)} fill="#047857" r={6} />} margin={6} />
        </SparklinesComposed>
      </div>
    </>
  );
}
