import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Contact, Star, PhoneCall, BadgeCheck, CalendarDays, X } from "lucide-react";
import { PageHeader, Card, StatusBadge, Chip, SearchInput, EmptyState, StatCard } from "@/components/app/kit";
import { DEMO_LEADS, LEAD_STATUSES } from "@/data/demoData";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/leads")({
  head: () => seo("Customers & Leads", "Customer CRM with lead status, sources and follow-up dates."),
  component: Leads,
});

function Leads() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [sel, setSel] = useState<(typeof DEMO_LEADS)[number] | null>(null);
  const count = (s: string) => DEMO_LEADS.filter((l) => l.status === s).length;
  const list = useMemo(() => DEMO_LEADS.filter((l) =>
    (status === "All" || l.status === status) && `${l.name} ${l.business} ${l.interest}`.toLowerCase().includes(q.toLowerCase())), [q, status]);

  return (
    <>
      <PageHeader title="Customers & Leads" subtitle="Sample CRM — search and filters work on demo data." icon={Contact} tone="bg-pastel-orange" ink="text-warning" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total Leads" value={String(DEMO_LEADS.length)} icon={Contact} tone="bg-pastel-orange" ink="text-warning" />
        <StatCard label="Interested" value={String(count("Interested"))} icon={Star} tone="bg-pastel-purple" ink="text-chart-5" />
        <StatCard label="Follow-ups" value={String(count("Follow-up"))} icon={PhoneCall} />
        <StatCard label="Converted" value={String(count("Converted"))} icon={BadgeCheck} tone="bg-pastel-green" ink="text-success" />
      </div>
      <div className="mt-5"><SearchInput value={q} onChange={setQ} placeholder="Search leads" /></div>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {["All", ...LEAD_STATUSES].map((s) => <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{s}</Chip>)}
      </div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {list.length === 0 && <EmptyState title="No leads found" text="Try another search or status." />}
        {list.map((l) => (
          <button key={l.id} onClick={() => setSel(l)} className="text-left">
            <Card className="p-3.5 transition-shadow hover:shadow-lift">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0"><p className="truncate text-sm font-semibold">{l.business}</p><p className="truncate text-xs text-muted-foreground">{l.name}</p></div>
                <StatusBadge status={l.status} />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                <span>Source: <b className="font-semibold text-foreground">{l.source}</b></span>
                <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" />{l.followUp}</span>
              </div>
            </Card>
          </button>
        ))}
      </div>
      {sel && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3 sm:items-center" onClick={() => setSel(null)} role="dialog" aria-modal="true" aria-label={sel.business}>
          <div className="w-full max-w-sm rounded-2xl bg-card p-5 shadow-lift" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div><p className="text-lg font-bold">{sel.business}</p><p className="text-sm text-muted-foreground">{sel.name}</p></div>
              <button onClick={() => setSel(null)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-xl hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              {[["Status", <StatusBadge key="s" status={sel.status} />], ["Interested in", sel.interest], ["Source", sel.source], ["Follow-up", sel.followUp], ["Contact", "Hidden in preview"]].map(([k, v]) => (
                <div key={String(k)} className="flex items-center justify-between rounded-xl bg-muted px-3 py-2.5"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </>
  );
}
