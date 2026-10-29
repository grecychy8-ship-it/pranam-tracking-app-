import { createFileRoute } from "@tanstack/react-router";
import { Wallet, TrendingUp, CheckCircle2, Clock, Receipt, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { PageHeader, Card, StatusBadge, StatCard, SectionTitle, BarChart, DemoBadge } from "@/components/app/kit";
import { FINANCE_SUMMARY, MONTHLY_REVENUE, DEMO_TRANSACTIONS } from "@/data/demoData";
import { formatNPR } from "@/config/services";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance")({
  head: () => seo("Payments & Finance", "Revenue, collected and pending payments, and expenses in NPR."),
  component: Finance,
});

const STYLE = [
  { icon: TrendingUp, tone: "bg-pastel-blue", ink: "text-primary" },
  { icon: CheckCircle2, tone: "bg-pastel-green", ink: "text-success" },
  { icon: Clock, tone: "bg-pastel-orange", ink: "text-warning" },
  { icon: Receipt, tone: "bg-pastel-pink", ink: "text-accent" },
];

function Finance() {
  const net = FINANCE_SUMMARY[0].value - FINANCE_SUMMARY[3].value;
  return (
    <>
      <PageHeader title="Payments & Finance" subtitle="Sample figures in NPR. No real transactions." icon={Wallet} tone="bg-pastel-mint" ink="text-success" />
      <div className="rounded-2xl bg-hero p-5 text-primary-foreground shadow-lift">
        <div className="flex items-center justify-between"><p className="text-xs font-semibold opacity-85">Net estimate · October</p><span className="rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold uppercase">Sample</span></div>
        <p className="mt-1 text-3xl font-extrabold tracking-tight">{formatNPR(net)}</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FINANCE_SUMMARY.map((f, i) => <StatCard key={f.label} label={f.label} value={formatNPR(f.value)} {...STYLE[i]} />)}
      </div>
      <SectionTitle title="Monthly revenue" aside={<DemoBadge />} />
      <Card><BarChart data={MONTHLY_REVENUE.map((m) => ({ label: m.month, value: m.value }))} format={(n) => `${Math.round(n / 1000)}k`} /></Card>
      <SectionTitle title="Recent transactions" aside={<DemoBadge />} />
      <Card className="divide-y divide-border p-0">
        {DEMO_TRANSACTIONS.map((t) => (
          <div key={t.id} className="flex items-center gap-3 p-3.5">
            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-xl", t.type === "in" ? "bg-pastel-green text-success" : "bg-pastel-pink text-accent")}>
              {t.type === "in" ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
            </span>
            <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{t.party}</p><p className="truncate text-xs text-muted-foreground">{t.note} · {t.date}</p></div>
            <div className="text-right">
              <p className={cn("text-sm font-bold", t.type === "in" ? "text-success" : "text-foreground")}>{t.type === "in" ? "+" : "−"}{formatNPR(t.amount)}</p>
              <StatusBadge status={t.status} />
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
