"use client";
import { SparklinesBand } from "@lueton/react-sparklines";

export default function Simple() {
  return (
    <SparklinesBand
      data={[
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
      ]}
    />
  );
}
