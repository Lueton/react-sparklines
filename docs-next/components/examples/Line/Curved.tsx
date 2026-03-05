"use client";
import { SparklinesComposed, Line } from "@lueton/react-sparklines";

export default function Curved() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Line curved />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Line curved={0.6} />
        </SparklinesComposed>
      </div>
    </>
  );
}
