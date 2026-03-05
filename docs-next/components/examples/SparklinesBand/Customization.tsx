"use client";
import { SparklinesBand } from "@lueton/react-sparklines";

export default function Customization() {
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
        <SparklinesBand stroke="#b91c1c" fill="#b91c1c" data={data} curved />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBand stroke="#047857" fill="#047857" strokeWidth={4} data={data} margin={4} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBand stroke="#1d4ed8" fill="yellow" data={data} curved={0.6} dots />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBand data={data} stroke="red" fill="#d97706" />
      </div>
    </>
  );
}
