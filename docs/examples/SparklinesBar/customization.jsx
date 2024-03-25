import { SparklinesBar } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar fill="#be185d" data={data} radius={8} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          fill="#b91c1c"
          stroke="#d97706"
          strokeWidth={1}
          data={data}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          data={data}
          radius={{ topLeft: 5, topRight: 5 }}
          maxBarWidth={10}
          strokeWidth={2}
          stroke="#059669"
          fill="transparent"
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar data={data} maxBarWidth={4} radius={4} />
      </div>
    </>
  );
}
