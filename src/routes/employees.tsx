import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users, X } from "lucide-react";
import { PageHeader, Card, StatusBadge, Chip, SearchInput, EmptyState, StatCard } from "@/components/app/kit";
import { DEMO_EMPLOYEES } from "@/data/demoData";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/employees")({
  head: () => seo("Employees", "Team directory with roles, departments and attendance status."),
  component: Employees,
});

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");

function Employees() {
  const [q, setQ] = useState("");
  const [role, setRole] = useState("All");
  const [sel, setSel] = useState<(typeof DEMO_EMPLOYEES)[number] | null>(null);
  const roles = ["All", ...new Set(DEMO_EMPLOYEES.map((e) => e.role))];
  const list = useMemo(() => DEMO_EMPLOYEES.filter((e) =>
    (role === "All" || e.role === role) && `${e.name} ${e.department}`.toLowerCase().includes(q.toLowerCase())), [q, role]);

  return (
    <>
      <PageHeader title="Employees" subtitle="Fictional sample team directory." icon={Users} tone="bg-pastel-green" ink="text-success" />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total" value={String(DEMO_EMPLOYEES.length)} icon={Users} tone="bg-pastel-green" ink="text-success" />
        <StatCard label="Present" value={String(DEMO_EMPLOYEES.filter((e) => e.status === "Present").length)} icon={Users} />
        <StatCard label="Departments" value="4" icon={Users} tone="bg-pastel-purple" ink="text-chart-5" />
      </div>
      <div className="mt-5"><SearchInput value={q} onChange={setQ} placeholder="Search by name or department" /></div>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {roles.map((r) => <Chip key={r} active={role === r} onClick={() => setRole(r)}>{r}</Chip>)}
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {list.length === 0 && <EmptyState title="No employees found" text="Try a different search or role." />}
        {list.map((e) => (
          <button key={e.id} onClick={() => setSel(e)} className="text-left">
            <Card className="flex items-center gap-3 p-3.5 transition-shadow hover:shadow-lift">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-hero text-sm font-bold text-primary-foreground">{initials(e.name)}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{e.name}</p>
                <p className="truncate text-xs text-muted-foreground">{e.role} · {e.department}</p>
              </div>
              <StatusBadge status={e.status} />
            </Card>
          </button>
        ))}
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3 sm:items-center" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={sel.name}>
          <Card className="w-full max-w-sm p-5" >
            <div onClick={(ev) => ev.stopPropagation()}>
              <div className="flex justify-end"><button onClick={() => setSel(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted"><X className="h-5 w-5" /></button></div>
              <div className="text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-hero text-xl font-bold text-primary-foreground">{initials(sel.name)}</span>
                <p className="mt-3 text-lg font-bold">{sel.name}</p>
                <p className="text-sm text-muted-foreground">{sel.role}</p>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-muted p-3"><dt className="text-xs text-muted-foreground">Department</dt><dd className="font-semibold">{sel.department}</dd></div>
                <div className="rounded-xl bg-muted p-3"><dt className="text-xs text-muted-foreground">Joined</dt><dd className="font-semibold">{sel.joined}</dd></div>
                <div className="col-span-2 flex items-center justify-between rounded-xl bg-muted p-3"><dt className="text-xs text-muted-foreground">Today (sample)</dt><dd><StatusBadge status={sel.status} /></dd></div>
              </dl>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
