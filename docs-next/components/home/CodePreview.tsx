export function CodePreview() {
  return (
    <div className="w-full rounded-2xl border border-fd-border bg-fd-secondary overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-fd-border bg-fd-card">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
        </div>
        <span className="text-xs text-fd-muted-foreground ml-2 font-mono">
          App.tsx
        </span>
      </div>
      <pre className="p-5 text-sm leading-relaxed overflow-x-auto">
        <code>
          <CodeLine text='import { SparklinesLine, Tooltip }' color="text-purple-400" />
          <CodeLine text='  from "@lueton/react-sparklines";' color="text-purple-400" />
          <br />
          <CodeLine text="function App() {" color="text-fd-foreground" />
          <CodeLine text="  return (" color="text-fd-foreground" />
          <CodeLine text="    <SparklinesLine" color="text-cyan-400" />
          <CodeLine text='      data={[1, 5, 3, 8, 4, 7, 2, 9]}' color="text-blue-400" />
          <CodeLine text='      stroke="#7c3aed"' color="text-blue-400" />
          <CodeLine text='      fill="#7c3aed"' color="text-blue-400" />
          <CodeLine text="      curved" color="text-blue-400" />
          <CodeLine text="      dots" color="text-blue-400" />
          <CodeLine text="    >" color="text-cyan-400" />
          <CodeLine text="      <Tooltip />" color="text-amber-400" />
          <CodeLine text="    </SparklinesLine>" color="text-cyan-400" />
          <CodeLine text="  );" color="text-fd-foreground" />
          <CodeLine text="}" color="text-fd-foreground" />
        </code>
      </pre>
    </div>
  );
}

function CodeLine({ text, color }: { text: string; color: string }) {
  return (
    <span className={color}>
      {text}
      {"\n"}
    </span>
  );
}
