import { SparklinesLine } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <SparklinesLine
      data={data}
      stroke={"#7c3aed"}
      fill={"url(#my-gradient)"} fillOpacity={0.6}
    >
      <defs>
        <linearGradient id="my-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </SparklinesLine>
  );
}
