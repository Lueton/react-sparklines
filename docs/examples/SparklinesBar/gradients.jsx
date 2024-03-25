import { SparklinesBar } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <SparklinesBar
      data={data}
      fill="url(#my-gradient)"
    >
      <defs>
        <linearGradient id="my-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#ee9ca7" />
          <stop offset="100%" stopColor="#ffdde1" />
        </linearGradient>
      </defs>
    </SparklinesBar>
  );
}
