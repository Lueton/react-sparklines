import { SparklinesComposed, Tooltip, Line, Bar } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  const complexData = data.map((v, i) => ({ a: v, b: data[data.length - i - 1] }));

  return (
    <>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data} label="Fruits">
          <Bar fill="#ca8a04" />
          <Line stroke="#27ae60" fill="#27ae60" />
          <Tooltip />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={data} label="Fruits">
          <Line stroke="#27ae60" fill="#27ae60" name="Kiwis" />
          <Bar fill="#ca8a04" name="Oranges" />
          <Tooltip />
        </SparklinesComposed>
      </div>
      <div style={{ display: "inline-block", padding: "10px" }}>
        <SparklinesComposed data={complexData} label="Fruits">
          <Bar fill="#ca8a04" name="Oranges" dataKey="a" />
          <Line stroke="#27ae60" fill="#27ae60" name="Kiwis" dataKey="b" />
          <Tooltip
            contentStyle={{ background: "black", borderColor: "black" }}
            labelStyle={{ color: "white" }}
          />
        </SparklinesComposed>
      </div>
    </>
  );
}
