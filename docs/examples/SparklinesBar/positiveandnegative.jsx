import { SparklinesBar } from "../../../dist/react-sparklines.es";

export default function Example() {
  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          data={[5, 2, -1, -3, -4, 2, 0, -2, 3, 4]}
          fill={"yellow"}
          positive={{
            fill: "green",
          }}
          negative={{
            fill: "red",
          }}
        />
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesBar
          data={[5, 2, -1, -3, -4, 2, 0, -2, 3, 4]}
          zeroBaseline={true}
          radius={10}
          positive={{
            fill: "green",
            radius: { topLeft: 5, topRight: 5 },
          }}
          negative={{
            fill: "red",
            radius: { bottomLeft: 5, bottomRight: 5 },
          }}
        />
      </div>
    </>
  );
}
