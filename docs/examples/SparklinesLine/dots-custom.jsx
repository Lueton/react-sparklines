import { SparklinesLine } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={data} dots={{ style: { fill: "#f59e0b" } }} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine
          data={data}
          dots={(props) => <circle {...props} fill="#047857" r={6} />}
          margin={6}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={data} dots={<circle fill="#06b6d4" />} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={data} dots={{ fill: "#e11d48", dot: <circle r={5} /> }} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine
          data={data}
          dots={{
            dot: (props) => (
              <rect fill="white" x={props.cx - 2} y={props.cy - 2} height={4} width={4} />
            ),
          }}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine
          data={data}
          dots={{
            show: "START_END",
            dot: (props) => (
              <rect fill="#b45309" x={props.cx - 2} y={props.cy - 2} height={4} width={4} />
            ),
          }}
        />
      </div>
    </>
  );
}
