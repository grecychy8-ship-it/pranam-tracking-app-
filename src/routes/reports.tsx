import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, MapPin, Percent, FolderCheck, Wallet } from "lucide-react";
import { PageHeader, Card, StatCard, SectionTitle, BarChart, LineChart, Chip, ProgressBar, DemoBadge } from "@/components/app/kit";
import { VISITS_BY_RANGE, SALES_PERFORMANCE, MONTHLY_REVENUE } from "@/data/demoData";
import { formatNPR } from "@/config/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reports")({
  head: () => seo("Reports & Analytics", "Visits, lead conversion, sales performance and revenue insights."),
  component: Reports,
});

const LABELS = { "7d": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "30d": ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] };

function Reports() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const data = VISITS_BY_RANGE[range];
  const total = data.reduce((a, b) => a + b, 0);
  return (
    <>
      <PageHeader title="Reports & Analytics" subtitle="Business insights from sample data." icon={BarChart3} tone="bg-pastel-yellow" ink="text-warning" />
      <div className="flex gap-2">
        <Chip active={range === "7d"} onClick={() => setRange("7d")}>Last 7 days</Chip>
        <Chip active={range === "30d"} onClick={() => setRange("30d")}>Last 30 days</Chip>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label={range === "7d" ? "Weekly visits" : "Monthly visits"} value={String(total)} icon={MapPin} />
        <StatCard label="Daily average" value={String(Math.round(total / (range === "7d" ? 7 : 30)))} icon={MapPin} tone="bg-pastel-cyan" ink="text-primary-deep" />
        <StatCard label="Lead conversion" value="19%" icon={Percent} tone="bg-pastel-purple" ink="text-chart-5" />
        <StatCard label="Projects done" value="1 / 5" icon={FolderCheck} tone="bg-pastel-green" ink="text-success" />
      </div>
      <SectionTitle title="Visits" aside={<DemoBadge />} />
      <Card><BarChart data={data.map((v, i) => ({ label: LABELS[range][i], value: v }))} /></Card>
      <SectionTitle title="Revenue overview" aside={<DemoBadge />} />
      <Card>
        <div className="mb-2 flex items-center gap-2"><Wallet className="h-4 w-4 text-primary" /><span className="text-sm font-semibold">{formatNPR(MONTHLY_REVENUE.at(-1)!.value)} in October</span></div>
        <LineChart data={MONTHLY_REVENUE.map((m) => m.value)} />
        <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">{MONTHLY_REVENUE.map((m) => <span key={m.month}>{m.month}</span>)}</div>
      </Card>
      <SectionTitle title="Salesperson performance" aside={<DemoBadge />} />
      <Card className="space-y-4">
        {SALES_PERFORMANCE.map((s) => (
          <div key={s.name}>
            <div className="mb-1.5 flex justify-between text-sm"><span className="font-semibold">{s.name}</span><span className="text-muted-foreground">{s.visits} visits · {s.converted} won</span></div>
            <ProgressBar value={Math.round((s.visits / 50) * 100)} />
          </div>
        ))}
      </Card>
    </>
  );
}
