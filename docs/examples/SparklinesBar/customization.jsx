import { SparklinesBar } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar color="#be185d" data={data} radius={8} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          color="#b91c1c"
          data={data}
          style={{ strokeWidth: 1, stroke: "#d97706" }}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          data={data}
          style={{ strokeWidth: 2, stroke: "#059669", fill: "transparent" }}
          radius={{ topLeft: 5, topRight: 5 }}
          maxBarWidth={10}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar data={data} maxBarWidth={4} radius={4} />
      </div>
    </>
  );
}
