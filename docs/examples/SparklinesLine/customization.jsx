import { SparklinesLine } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine color="#b91c1c" data={data} curved />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine color="#047857" data={data} style={{ strokeWidth: 4 }} margin={4} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine
          color="#1d4ed8"
          data={data}
          curved={0.6}
          style={{ fill: "transparent" }}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={data} style={{ stroke: "#d97706" }} />
      </div>
    </>
  );
}
