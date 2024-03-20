import { SparklinesBar, Tooltip } from "../../../dist/react-sparklines.es";

export default function Example() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return (
    <SparklinesBar data={data}>
      <Tooltip/>
    </SparklinesBar>
  );
}
