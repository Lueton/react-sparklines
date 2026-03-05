"use client";
import { SparklinesComposed, Bar } from "@lueton/react-sparklines";

export default function PositiveNegative() {
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={[5, 2, -1, -3, -4, 2, 0, -2, 3, 4]}>
          <Bar
            positive={{ fill: "green", radius: { topLeft: 5, topRight: 5 } }}
            negative={{ fill: "red", radius: { bottomLeft: 5, bottomRight: 5 } }}
          />
        </SparklinesComposed>
      </div>
    </>
  );
}
