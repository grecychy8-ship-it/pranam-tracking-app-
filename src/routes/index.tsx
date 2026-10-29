import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroSlider } from "@/components/app/HeroSlider";
import { MODULES } from "@/config/modules";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pranam Software â€” Company Management Hub" },
      { name: "description", content: "Manage sales visits, attendance, tasks, team, customers, projects and finance for Pranam Software in one place." },
      { property: "og:title", content: "Pranam Software â€” Company Management Hub" },
      { property: "og:description", content: "One Platform. Complete Business Control." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSlider scrollTargetId="modules" />

      <div id="modules" className="mb-3 mt-8 flex scroll-mt-20 items-center justify-between">
        <h2 className="text-base font-bold tracking-tight">Company Management</h2>
        <span className="rounded-full bg-pastel-peach px-2.5 py-0.5 text-xs font-bold text-accent">{MODULES.length} Modules</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {MODULES.map((m) => (
          <Link
            key={m.to}
            to={m.to}
            className={cn("group flex flex-col items-center rounded-2xl p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-soft active:scale-[0.97]", m.tone)}
          >
            <span className="relative mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-card shadow-soft">
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent/70" />
              <m.icon className={cn("h-7 w-7 transition-transform group-hover:scale-110", m.ink)} strokeWidth={2} />
            </span>
            <span className="text-sm font-bold leading-tight">{m.title}</span>
            <span className="mt-0.5 text-[11px] text-muted-foreground">{m.subtitle}</span>
          </Link>
        ))}
      </div>
    </>
  );
}




