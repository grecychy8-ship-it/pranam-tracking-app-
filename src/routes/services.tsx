import { createFileRoute } from "@tanstack/react-router";
import { Package, QrCode, Video, BookOpen, Smartphone, Sheet, FileText, Gift, Code2, Check } from "lucide-react";
import { PageHeader, Notice } from "@/components/app/kit";
import { SERVICES, formatNPR, type Service } from "@/config/services";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => seo("Services & Pricing", "Pranam Software services with starting prices in NPR."),
  component: Services,
});

const ICONS: Record<Service["icon"], typeof QrCode> = { qr: QrCode, video: Video, catalog: BookOpen, app: Smartphone, sheet: Sheet, quote: FileText, referral: Gift, code: Code2 };

function Services() {
  return (
    <>
      <PageHeader title="Services & Pricing" subtitle="What Pranam Software offers." icon={Package} tone="bg-pastel-lavender" ink="text-chart-5" demo={false} />
      <Notice>Prices are starting estimates. Final pricing depends on requirements.</Notice>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon];
          return (
            <article key={s.id} className={cn("rounded-2xl p-4", s.tone)}>
              <div className="flex items-start gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card shadow-soft"><Icon className="h-6 w-6 text-primary" /></span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bold leading-tight">{s.name}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {s.details.map((d) => <li key={d} className="flex items-center gap-1.5 text-xs"><Check className="h-3.5 w-3.5 text-success" />{d}</li>)}
              </ul>
              <div className="mt-3 rounded-xl bg-card px-3 py-2">
                <span className="text-[11px] text-muted-foreground">{s.price === null ? "Pricing" : "Starting from"}</span>
                <p className="text-base font-extrabold text-primary-deep">{s.price === null ? "Custom Quote" : formatNPR(s.price)}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
