"use client";
import { SparklinesLine } from "@lueton/react-sparklines";

export default function DotsSimple() {
  const data = [1, 5, 3, 8, 4, 7, 2, 8, 3, 4];
  return <SparklinesLine data={data} dots />;
}
