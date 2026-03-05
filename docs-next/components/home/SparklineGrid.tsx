"use client";

import {
  Bar,
  Line,
  ReferenceLine,
  SparklinesBand,
  SparklinesBar,
  SparklinesComposed,
  SparklinesLine,
} from "@lueton/react-sparklines";
import type { ReactNode } from "react";

// --- Data sets ---
const uptrend = [2, 3, 2, 5, 4, 7, 6, 8, 7, 10, 9, 12];
const downtrend = [11, 10, 9, 10, 8, 7, 8, 5, 6, 3, 4, 2];
const volatile = [8, 2, 10, 1, 9, 3, 11, 2, 8, 4, 10, 1];
const wave = [4, 6, 8, 9, 8, 6, 4, 3, 4, 6, 8, 9, 8, 6, 4];
const spike = [3, 3, 4, 3, 3, 4, 12, 4, 3, 3, 4, 3];
const gentle = [5, 5.5, 6, 5.8, 6.2, 6.5, 6.3, 7, 6.8, 7.2, 7.5, 7.3];
const mixed = [3, -2, 5, -1, 4, -3, 6, -2, 3, -4, 5, -1];
const steps = [2, 2, 4, 4, 4, 6, 6, 8, 8, 8, 10, 10];
const dip = [8, 7, 6, 4, 2, 1, 2, 4, 6, 7, 8, 9];
const plateau = [2, 4, 6, 8, 8, 8, 8, 8, 6, 4, 3, 2];
const dense = [3, 7, 2, 9, 4, 8, 1, 6, 5, 10, 3, 7, 2, 8, 5, 9, 4, 6, 3, 8];
const heartbeat = [4, 4, 4, 5, 4, 4, 8, 2, 8, 4, 4, 5, 4, 4];
const allNeg = [-3, -5, -2, -7, -4, -6, -3, -8, -5, -4, -6, -3];
const growth = [1, 1.5, 2, 3, 4.5, 6, 8, 10, 12, 14, 16, 18];

const bandNarrow: [number, number][] = [
  [4, 6],
  [5, 7],
  [4, 7],
  [6, 8],
  [5, 7],
  [5, 8],
  [6, 8],
  [5, 7],
  [4, 6],
  [5, 7],
  [6, 8],
  [5, 7],
];
const bandWide: [number, number][] = [
  [1, 8],
  [2, 10],
  [1, 9],
  [3, 11],
  [2, 9],
  [1, 10],
  [3, 11],
  [2, 8],
  [1, 9],
  [3, 10],
];
const bandTrend: [number, number][] = [
  [1, 3],
  [2, 4],
  [2, 5],
  [3, 6],
  [4, 7],
  [5, 8],
  [5, 9],
  [6, 10],
  [7, 11],
  [8, 12],
];

function Cell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-fd-border bg-fd-card p-3 transition-all hover:shadow-md hover:border-fd-primary/30">
      {children}
    </div>
  );
}

export function SparklineGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full max-w-6xl mx-auto">
      {/* 1 - Purple curved line with fill */}
      <Cell>
        <SparklinesLine
          data={uptrend}
          height={50}
          stroke="#7c3aed"
          fill="#7c3aed"
          fillOpacity={0.15}
          curved
          responsive
        />
      </Cell>

      {/* 2 - Blue bars, rounded */}
      <Cell>
        <SparklinesBar
          data={wave}
          height={50}
          fill="#2563eb"
          fillOpacity={0.8}
          radius={3}
          responsive
        />
      </Cell>

      {/* 3 - Emerald straight line with dots */}
      <Cell>
        <SparklinesLine
          data={gentle}
          height={50}
          stroke="#059669"
          fill="#059669"
          fillOpacity={0.1}
          dots
          responsive
        />
      </Cell>

      {/* 4 - Amber band, curved */}
      <Cell>
        <SparklinesBand
          data={bandNarrow}
          height={50}
          fill="#f59e0b"
          fillOpacity={0.3}
          stroke="#f59e0b"
          curved
          responsive
        />
      </Cell>

      {/* 5 - Rose volatile line, thick */}
      <Cell>
        <SparklinesLine
          data={volatile}
          height={50}
          stroke="#e11d48"
          fill="none"
          strokeWidth={2}
          responsive
        />
      </Cell>

      {/* 6 - Positive/negative bars */}
      <Cell>
        <SparklinesBar
          data={mixed}
          height={50}
          fill="#059669"
          positive={{ fill: "#059669" }}
          negative={{ fill: "#ef4444" }}
          fillOpacity={0.75}
          radius={2}
          responsive
        />
      </Cell>

      {/* 7 - Composed: bars + line */}
      <Cell>
        <SparklinesComposed data={uptrend} height={50} responsive>
          <Bar fill="#06b6d4" fillOpacity={0.2} />
          <Line stroke="#06b6d4" curved />
        </SparklinesComposed>
      </Cell>

      {/* 8 - Indigo dense line */}
      <Cell>
        <SparklinesLine
          data={dense}
          height={50}
          stroke="#4f46e5"
          fill="#4f46e5"
          fillOpacity={0.08}
          curved
          responsive
        />
      </Cell>

      {/* 9 - Wide band purple */}
      <Cell>
        <SparklinesBand
          data={bandWide}
          height={50}
          fill="#7c3aed"
          fillOpacity={0.2}
          stroke="#7c3aed"
          curved
          responsive
        />
      </Cell>

      {/* 10 - Teal thin bars */}
      <Cell>
        <SparklinesBar
          data={downtrend}
          height={50}
          fill="#0d9488"
          fillOpacity={0.6}
          radius={{ topLeft: 4, topRight: 4 }}
          responsive
        />
      </Cell>

      {/* 11 - Pink curved area fill */}
      <Cell>
        <SparklinesLine
          data={dip}
          height={50}
          stroke="#ec4899"
          fill="#ec4899"
          fillOpacity={0.2}
          curved
          responsive
        />
      </Cell>

      {/* 12 - Composed: line + horizontal reference */}
      <Cell>
        <SparklinesComposed data={volatile} height={50} responsive>
          <Line stroke="#f97316" curved />
          <ReferenceLine y={5.5} stroke="#f97316" strokeDasharray="4 2" strokeOpacity={0.5} />
        </SparklinesComposed>
      </Cell>

      {/* 13 - Sky blue bars, all negative */}
      <Cell>
        <SparklinesBar
          data={allNeg}
          height={50}
          fill="#0ea5e9"
          fillOpacity={0.7}
          radius={2}
          responsive
        />
      </Cell>

      {/* 14 - Green band trending up */}
      <Cell>
        <SparklinesBand
          data={bandTrend}
          height={50}
          fill="#059669"
          fillOpacity={0.2}
          stroke="#059669"
          curved
          responsive
        />
      </Cell>

      {/* 15 - Coral heartbeat line */}
      <Cell>
        <SparklinesLine
          data={heartbeat}
          height={50}
          stroke="#f97316"
          fill="none"
          strokeWidth={1.5}
          responsive
        />
      </Cell>

      {/* 16 - Composed: line + bar overlay on wave */}
      <Cell>
        <SparklinesComposed data={wave} height={50} responsive>
          <Bar fill="#7c3aed" fillOpacity={0.12} />
          <Line stroke="#06b6d4" curved strokeWidth={1.5} />
        </SparklinesComposed>
      </Cell>

      {/* 17 - Slate steps bars */}
      <Cell>
        <SparklinesBar
          data={steps}
          height={50}
          fill="#64748b"
          fillOpacity={0.6}
          radius={1}
          responsive
        />
      </Cell>

      {/* 18 - Fuchsia line, start/end dots */}
      <Cell>
        <SparklinesLine
          data={growth}
          height={50}
          stroke="#c026d3"
          fill="#c026d3"
          fillOpacity={0.1}
          curved
          dots={{ show: "START_END" }}
          responsive
        />
      </Cell>

      {/* 19 - Composed: bar + line + ref */}
      <Cell>
        <SparklinesComposed data={dip} height={50} responsive>
          <Bar fill="#8b5cf6" fillOpacity={0.15} />
          <Line stroke="#8b5cf6" curved />
          <ReferenceLine y={1} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={0.4} />
        </SparklinesComposed>
      </Cell>

      {/* 20 - Cyan line, plateau data */}
      <Cell>
        <SparklinesLine
          data={plateau}
          height={50}
          stroke="#06b6d4"
          fill="#06b6d4"
          fillOpacity={0.12}
          curved
          responsive
        />
      </Cell>

      {/* 21 - Red volatile bars */}
      <Cell>
        <SparklinesBar
          data={volatile}
          height={50}
          fill="#dc2626"
          fillOpacity={0.7}
          radius={2}
          responsive
        />
      </Cell>

      {/* 22 - Band with dots */}
      <Cell>
        <SparklinesBand
          data={bandNarrow}
          height={50}
          fill="#2563eb"
          fillOpacity={0.2}
          stroke="#2563eb"
          curved
          dots
          responsive
        />
      </Cell>

      {/* 23 - Lime growth line */}
      <Cell>
        <SparklinesLine
          data={growth}
          height={50}
          stroke="#65a30d"
          fill="#65a30d"
          fillOpacity={0.15}
          curved
          strokeWidth={2}
          responsive
        />
      </Cell>

      {/* 24 - Orange line, straight with area */}
      <Cell>
        <SparklinesLine
          data={downtrend}
          height={50}
          stroke="#ea580c"
          fill="#ea580c"
          fillOpacity={0.18}
          dots={{ show: "END" }}
          responsive
        />
      </Cell>

      {/* 25 - Violet spike line */}
      <Cell>
        <SparklinesLine
          data={spike}
          height={50}
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.2}
          curved
          responsive
        />
      </Cell>
    </div>
  );
}
