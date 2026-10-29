import { createFileRoute } from "@tanstack/react-router";
import { MapPin, ClipboardCheck, Users, PhoneCall, Star } from "lucide-react";
import { PageHeader, FormButton, StatCard, SectionTitle, Card } from "@/components/app/kit";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sales")({
  head: () => seo("Track Sales", "Record before-visit and after-visit customer activity for Pranam Software field sales."),
  component: Sales,
});

const STEPS = ["Complete Before Visiting form.", "Meet the customer.", "Complete After Visiting form."];

function Sales() {
  return (
    <>
      <PageHeader title="Track Sales" subtitle="Field visits before and after every customer meeting." icon={MapPin} />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-pastel-blue p-5">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft"><MapPin className="h-6 w-6 text-primary" /></div>
          <h2 className="text-lg font-bold">Before Visiting</h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">Register your customer visit before meeting.</p>
          <FormButton formKey="beforeVisit">Open Before Visit Form</FormButton>
        </div>
        <div className="rounded-2xl bg-pastel-green p-5">
          <div className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-card shadow-soft"><ClipboardCheck className="h-6 w-6 text-success" /></div>
          <h2 className="text-lg font-bold">After Visiting</h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">Submit the result of your customer meeting.</p>
          <FormButton formKey="afterVisit" variant="success">Open After Visit Form</FormButton>
        </div>
      </div>

      <SectionTitle title="How it works" />
      <Card>
        <ol className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-hero text-sm font-bold text-primary-foreground">{i + 1}</span>
              <span className="text-sm font-medium">{s}</span>
            </li>
          ))}
        </ol>
      </Card>

      <SectionTitle title="Sales overview" />
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Visits Today" value="24" icon={Users} />
        <StatCard label="Interested Leads" value="7" icon={Star} tone="bg-pastel-purple" ink="text-chart-5" />
        <StatCard label="Follow-ups Pending" value="5" icon={PhoneCall} tone="bg-pastel-orange" ink="text-warning" />
      </div>
    </>
  );
}
