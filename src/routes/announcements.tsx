import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Pin } from "lucide-react";
import { PageHeader, Card, StatusBadge, Notice } from "@/components/app/kit";
import { DEMO_ANNOUNCEMENTS } from "@/data/demoData";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/announcements")({
  head: () => seo("Announcements", "Company updates and news for the Pranam Software team."),
  component: Announcements,
});

function Announcements() {
  const pinned = DEMO_ANNOUNCEMENTS.filter((a) => a.pinned);
  const rest = DEMO_ANNOUNCEMENTS.filter((a) => !a.pinned);
  return (
    <>
      <PageHeader title="Announcements" subtitle="Company updates (sample posts)." icon={Megaphone} tone="bg-pastel-peach" ink="text-accent" />
      {pinned.map((a) => (
        <article key={a.id} className="mb-4 rounded-2xl bg-hero p-5 text-primary-foreground shadow-lift">
          <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide opacity-90"><Pin className="h-3.5 w-3.5" />Pinned · {a.date}</p>
          <h2 className="mt-1.5 text-lg font-bold">{a.title}</h2>
          <p className="mt-1 text-sm opacity-90">{a.body}</p>
        </article>
      ))}
      <div className="space-y-3">
        {rest.map((a) => (
          <Card key={a.id}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-muted-foreground">{a.category} · {a.date}</span>
              <StatusBadge status={a.priority} />
            </div>
            <h2 className="mt-1.5 font-bold">{a.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-5"><Notice>Notifications are not sent yet — this feed is a preview.</Notice></div>
    </>
  );
}
