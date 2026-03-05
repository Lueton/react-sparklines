import { SparklinesBand } from "../../../lib/index.ts";

export default function Example() {
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
    ></SparklinesBand>
  );
}
