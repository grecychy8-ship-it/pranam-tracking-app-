import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, CalendarDays, User, X } from "lucide-react";
import { PageHeader, Card, StatusBadge, Chip, ProgressBar, StatCard, EmptyState } from "@/components/app/kit";
import { DEMO_PROJECTS, PROJECT_STATUSES } from "@/data/demoData";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => seo("Projects", "Track client projects, progress, owners and due dates."),
  component: Projects,
});

function Projects() {
  const [status, setStatus] = useState<string>("All");
  const [sel, setSel] = useState<(typeof DEMO_PROJECTS)[number] | null>(null);
  const n = (s: string) => String(DEMO_PROJECTS.filter((p) => p.status === s).length);
  const list = DEMO_PROJECTS.filter((p) => status === "All" || p.status === status);
  return (
    <>
      <PageHeader title="Projects" subtitle="Sample client projects and progress." icon={FolderKanban} tone="bg-pastel-cyan" ink="text-primary-deep" />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Active" value={n("Active")} icon={FolderKanban} />
        <StatCard label="Pending" value={n("Pending")} icon={FolderKanban} tone="bg-pastel-orange" ink="text-warning" />
        <StatCard label="Completed" value={n("Completed")} icon={FolderKanban} tone="bg-pastel-green" ink="text-success" />
      </div>
      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {["All", ...PROJECT_STATUSES].map((s) => <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{s}</Chip>)}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {list.length === 0 && <EmptyState title="No projects" text="Nothing in this status." />}
        {list.map((p) => (
          <button key={p.id} onClick={() => setSel(p)} className="text-left">
            <Card className="p-4 transition-shadow hover:shadow-lift">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><p className="truncate font-semibold">{p.title}</p><p className="truncate text-xs text-muted-foreground">{p.client}</p></div>
                <StatusBadge status={p.status} />
              </div>
              <div className="mt-3 flex items-center gap-2"><ProgressBar value={p.progress} /><span className="w-9 text-right text-xs font-bold">{p.progress}%</span></div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{p.owner}</span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />{p.due}</span>
                <StatusBadge status={p.priority} />
              </div>
            </Card>
          </button>
        ))}
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3 sm:items-center" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={sel.title}>
          <div className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-lift" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div><p className="text-lg font-bold">{sel.title}</p><p className="text-sm text-muted-foreground">{sel.client}</p></div>
              <button onClick={() => setSel(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-4"><ProgressBar value={sel.progress} /><p className="mt-1 text-xs text-muted-foreground">{sel.progress}% complete (sample)</p></div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {[["Assigned", sel.owner], ["Due", sel.due], ["Priority", sel.priority], ["Status", sel.status]].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted p-3"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
