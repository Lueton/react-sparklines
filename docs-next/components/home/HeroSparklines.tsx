"use client";

import { SparklinesLine, Tooltip } from "@lueton/react-sparklines";

export function InteractiveDemo() {
  return (
    <div className="w-full rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm">
      <SparklinesLine
        data={[3, 7, 2, 9, 5, 11, 4, 8, 6, 10, 3, 7, 5, 9, 4]}
        height={140}
        stroke="#7c3aed"
        fill="#7c3aed"
        fillOpacity={0.08}
        curved
        dots
        activeDot={{ r: 5, fill: "#7c3aed", stroke: "#fff", strokeWidth: 2 }}
      >
        <Tooltip />
      </SparklinesLine>
    </div>
  );
}
