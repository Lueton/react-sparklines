import { SparklinesLine } from "../../../dist/react-sparklines.es.js";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine stroke="#b91c1c" fill="#b91c1c" data={data} curved />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine stroke="#047857" fill="#047857" strokeWidth={4} data={data} margin={4} />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine
          stroke="#1d4ed8"
          fill="none"
          data={data}
          curved={0.6}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={data} stroke="#d97706" fill="#d97706" />
      </div>
    </>
  );
}
