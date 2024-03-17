import { Bar, Line, SparklinesComposed } from "./../../../dist/react-sparklines.es.js"

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  const complexData = data.map((v,i) => ({a: v, b: data[data.length - i - 1]}))

  return (
    <div style={{display: "flex"}}>
      <div>
      <SparklinesComposed data={[1, 5, 3, 8, 4, 7, 2, 8, 3, 4]}>
        <Bar />
        <Line />
      </SparklinesComposed>
      </div>
      <div>
      <SparklinesComposed data={complexData}>
        <Bar dataKey="a" />
        <Line dataKey="b" />
      </SparklinesComposed>
      </div>
    </div>
  )
}
