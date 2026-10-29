import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Files, FileText } from "lucide-react";
import { PageHeader, Card, Chip, Notice, EmptyState } from "@/components/app/kit";
import { DEMO_DOCS, DOC_CATEGORIES } from "@/data/demoData";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/documents")({
  head: () => seo("Company Documents", "Company files, client agreements, quotations and reports."),
  component: Documents,
});

const TONES = ["bg-pastel-blue", "bg-pastel-pink", "bg-pastel-orange", "bg-pastel-green", "bg-pastel-purple", "bg-pastel-cyan"];

function Documents() {
  const [cat, setCat] = useState<string>("All");
  const list = DEMO_DOCS.filter((d) => cat === "All" || d.category === cat);
  return (
    <>
      <PageHeader title="Company Documents" subtitle="Important files, organised by category." icon={Files} />
      <Notice>Preview only — these are sample file names. Upload and download are not available yet.</Notice>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {DOC_CATEGORIES.map((c, i) => (
          <button key={c} onClick={() => setCat(cat === c ? "All" : c)} aria-pressed={cat === c}
            className={`min-h-16 rounded-2xl p-3 text-left text-sm font-semibold transition-all ${TONES[i]} ${cat === c ? "ring-2 ring-primary" : ""}`}>
            {c}
            <span className="block text-[11px] font-normal text-muted-foreground">{DEMO_DOCS.filter((d) => d.category === c).length} file(s)</span>
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2"><Chip active={cat === "All"} onClick={() => setCat("All")}>All files</Chip></div>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {list.length === 0 && <EmptyState title="No files" text="No sample files in this category." />}
        {list.map((d) => (
          <Card key={d.id} className="flex items-center gap-3 p-3.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-pastel-blue"><FileText className="h-5 w-5 text-primary" /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{d.name}</p><p className="truncate text-xs text-muted-foreground">{d.category} · {d.size} · {d.date}</p></div>
          </Card>
        ))}
      </div>
    </>
  );
}
