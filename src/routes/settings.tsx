import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, Building2, Palette, Sun, Link2, Info, Plug } from "lucide-react";
import { PageHeader, Card, Notice } from "@/components/app/kit";
import { FORM_LABELS, type FormKey } from "@/config/forms";
import { getFormUrl } from "@/utils/openGoogleForm";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => seo("Settings", "Company profile, branding, form links and app information."),
  component: Settings,
});

function Section({ icon: Icon, title, children }: { icon: typeof Info; title: string; children: ReactNode }) {
  return (
    <Card className="mb-3">
      <h2 className="mb-3 flex items-center gap-2 font-bold"><Icon className="h-4 w-4 text-primary" />{title}</h2>
      {children}
    </Card>
  );
}

function Row({ k, v }: { k: string; v: ReactNode }) {
  return <div className="flex items-center justify-between gap-3 border-b border-border py-2.5 text-sm last:border-0"><span className="text-muted-foreground">{k}</span><span className="text-right font-semibold">{v}</span></div>;
}

function Settings() {
  return (
    <>
      <PageHeader title="Settings" subtitle="App preferences and configuration." icon={SettingsIcon} tone="bg-pastel-grey" ink="text-muted-foreground" demo={false} />
      <Section icon={Building2} title="Company Profile">
        <Row k="Company Name" v="Pranam Software" /><Row k="Currency" v="NPR" /><Row k="Region" v="Nepal" /><Row k="Timezone" v="Asia/Kathmandu" />
      </Section>
      <Section icon={Palette} title="Branding">
        <div className="flex gap-2">
          {["bg-primary", "bg-primary-deep", "bg-foreground", "bg-accent", "bg-pastel-blue"].map((c) => <span key={c} className={cn("h-9 w-9 rounded-xl border border-border", c)} />)}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Tagline: One Platform. Complete Business Control.</p>
      </Section>
      <Section icon={Sun} title="Appearance"><Row k="Theme" v="Light" /><Row k="Font" v="Inter" /></Section>
      <Section icon={Link2} title="Google Form Links">
        {(Object.keys(FORM_LABELS) as FormKey[]).map((k) => {
          const ok = !!getFormUrl(k);
          return <Row key={k} k={FORM_LABELS[k]} v={<span className={cn("rounded-full px-2.5 py-0.5 text-[11px]", ok ? "bg-pastel-green text-success" : "bg-pastel-pink text-destructive")}>{ok ? "Configured" : "Not configured"}</span>} />;
        })}
        <div className="mt-3"><Notice>In Phase 1, form links are set in the app's code by your developer. They can't be changed from this screen.</Notice></div>
      </Section>
      <Section icon={Info} title="App Information"><Row k="App" v="Company Management Hub" /><Row k="Version" v="Phase 1 · Preview" /><Row k="Data" v="Sample only" /></Section>
      <Section icon={Plug} title="Future Integrations">
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {["Employee login", "Live Google Sheets data", "Real attendance records", "Payments & invoices", "Document uploads", "Push notifications"].map((x) => (
            <li key={x} className="rounded-xl bg-muted px-3 py-2.5">{x} <span className="text-xs text-muted-foreground">— Phase 2</span></li>
          ))}
        </ul>
      </Section>
    </>
  );
}
