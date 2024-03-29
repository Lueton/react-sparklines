import { SparklinesLine, ReferenceLine } from "../../../dist/react-sparklines.es";

export default function Example() {
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={[1, 5, 3, 8, 4, 7, 2, 8, 3, 4]}>
          <ReferenceLine x={5} stroke={"green"} />
        </SparklinesLine>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesLine data={[1, 5, 3, 8, 4, 7, 2, 8, 3, 4]}>
          <ReferenceLine y={4} stroke={"red"} />
        </SparklinesLine>
      </div>
    </>
  );
}
