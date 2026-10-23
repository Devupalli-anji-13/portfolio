import type { Project } from "@/data/portfolio";

function Chrome({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-border bg-background">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-destructive/70" />
        <span className="h-2 w-2 rounded-full bg-primary/50" />
        <span className="h-2 w-2 rounded-full bg-success/70" />
        <span className="ml-2 font-mono text-[9px] text-muted-foreground">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Exam() {
  const rows = [
    ["REQ-1042", "Fee verified", "bg-success"],
    ["REQ-1043", "Pending", "bg-violet"],
    ["REQ-1044", "Approved", "bg-primary"],
  ];
  return (
    <Chrome title="exam-portal / admin">
      <div className="flex h-full">
        <div className="w-1/4 space-y-2 border-r border-border p-3">
          {["Dashboard", "Requests", "Fees", "Tickets"].map((x, i) => (
            <div key={x} className={`rounded px-2 py-1 text-[9px] ${i === 1 ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{x}</div>
          ))}
        </div>
        <div className="flex-1 space-y-2 p-3">
          <div className="text-[10px] font-semibold">Hall-ticket requests</div>
          {rows.map(([id, s, c]) => (
            <div key={id} className="flex items-center justify-between rounded border border-border px-2 py-1.5 text-[9px]">
              <span className="font-mono text-muted-foreground">{id}</span>
              <span className="flex items-center gap-1"><span className={`h-1.5 w-1.5 rounded-full ${c}`} />{s}</span>
            </div>
          ))}
          <div className="mt-2 rounded border border-dashed border-primary/40 p-2 text-center text-[9px] text-primary">Generate hall ticket ↓</div>
        </div>
      </div>
    </Chrome>
  );
}

function Jarvis() {
  return (
    <Chrome title="jarvis.py">
      <div className="flex h-full flex-col items-center justify-center gap-3 p-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 shadow-glow">
          <div className="h-8 w-8 rounded-full bg-primary/30 blur-[2px]" />
        </div>
        <div className="flex h-8 items-center gap-[3px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="animate-wave h-full w-[3px] rounded-full bg-primary" style={{ animationDelay: `${(i % 8) * 0.09}s`, opacity: 0.4 + ((i * 7) % 10) / 16 }} />
          ))}
        </div>
        <p className="font-mono text-[9px] text-muted-foreground">"Open the browser and set a reminder…"</p>
      </div>
    </Chrome>
  );
}

function College() {
  const bars = [70, 85, 60, 92, 78];
  return (
    <Chrome title="college-admin / attendance">
      <div className="grid h-full grid-cols-3 gap-2 p-3">
        {["Students", "Departments", "Attendance"].map((x) => (
          <div key={x} className="rounded border border-border p-2">
            <div className="text-[8px] text-muted-foreground">{x}</div>
            <div className="mt-1 h-1.5 w-2/3 rounded bg-secondary" />
          </div>
        ))}
        <div className="col-span-3 flex items-end gap-2 rounded border border-border p-3">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet/60 to-primary/80" style={{ height: `${b * 0.5}px` }} />
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export function ProjectPreview({ kind }: { kind: Project["preview"] }) {
  return kind === "exam" ? <Exam /> : kind === "jarvis" ? <Jarvis /> : <College />;
}
