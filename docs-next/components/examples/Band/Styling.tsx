"use client";
import { SparklinesComposed, Band } from "@lueton/react-sparklines";

export default function Styling() {
  const data = [
    [-1, 3],
    [3, 7],
    [-5, -1],
    [6, 10],
    [null, null],
    [5, 9],
    [-2, 2],
    [6, 10],
    [1, 5],
    [2, 6],
  ];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Band stroke="#b91c1c" fill="#b91c1c" />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data}>
          <Band stroke="#047857" fill="#047857" strokeWidth={3} curved />
        </SparklinesComposed>
      </div>
    </>
  );
}
