import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, ListChecks, UserRound, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/app/kit";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tasks")({
  head: () => seo("Tasks", "View all team tasks and your assigned tasks."),
  component: Tasks,
});

type TaskView = "all" | "mine";

type MemberTasks = {
  member: string;
  role: string;
  tasks: string[];
};

const CURRENT_USER = "Aarav Sharma";

const MEMBER_TASKS: MemberTasks[] = [
  { member: "Aarav Sharma", role: "Sales Executive", tasks: ["Visit Himalayan Café", "Follow up with Sunrise Academy", "Update leads sheet"] },
  { member: "Sita Karki", role: "Designer", tasks: ["Complete product catalogue design", "Prepare social media creatives"] },
  { member: "Bikash Thapa", role: "Developer", tasks: ["Build academy dashboard", "Fix attendance camera validation"] },
  { member: "Priya Shrestha", role: "Sales Executive", tasks: ["Call Valley Clinic", "Prepare client quotation"] },
  { member: "Rohan Gurung", role: "Video Editor", tasks: ["Edit Lakeside Hotel promo", "Export final social media reel"] },
  { member: "Anisha Rai", role: "Manager", tasks: ["Review daily team work", "Approve pending quotations"] },
];

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function Tasks() {
  const [view, setView] = useState<TaskView>("all");
  const visibleMembers = view === "all" ? MEMBER_TASKS : MEMBER_TASKS.filter((item) => item.member === CURRENT_USER);
  const taskCount = visibleMembers.reduce((total, item) => total + item.tasks.length, 0);

  return (
    <>
      <PageHeader title="Tasks" subtitle="Team task assignments" icon={ClipboardCheck} tone="bg-pastel-purple" ink="text-chart-5" />

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1.5">
        <button
          type="button"
          onClick={() => setView("all")}
          className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition", view === "all" ? "bg-card text-primary shadow-soft" : "text-muted-foreground")}
        >
          <UsersRound className="h-5 w-5" /> All Member Tasks
        </button>
        <button
          type="button"
          onClick={() => setView("mine")}
          className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-bold transition", view === "mine" ? "bg-card text-primary shadow-soft" : "text-muted-foreground")}
        >
          <UserRound className="h-5 w-5" /> My Tasks
        </button>
      </div>

      <div className="mb-3 mt-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold">{view === "all" ? "All Member Tasks" : "My Tasks"}</h2>
          {view === "mine" && <p className="text-xs text-muted-foreground">Assigned to {CURRENT_USER}</p>}
        </div>
        <span className="rounded-full bg-pastel-purple px-3 py-1 text-xs font-bold text-chart-5">{taskCount} tasks</span>
      </div>

      <div className="space-y-3">
        {visibleMembers.map((item) => (
          <section key={item.member} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="flex items-center gap-3 border-b border-border bg-muted/40 p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground">{initials(item.member)}</span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold">{item.member}</h3>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
              <span className="ml-auto rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">{item.tasks.length}</span>
            </div>
            <ul className="divide-y divide-border">
              {item.tasks.map((task) => (
                <li key={task} className="flex min-h-12 items-center gap-3 px-4 py-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-pastel-green text-success"><ListChecks className="h-4 w-4" /></span>
                  <span className="text-sm font-semibold">{task}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
