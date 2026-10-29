import { useState, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FormKey } from "@/config/forms";
import { FORM_MISSING_MESSAGE, openGoogleForm } from "@/utils/openGoogleForm";

export function DemoBadge({ className, label = "Demo data" }: { className?: string; label?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-pastel-orange px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent", className)}>
      {label}
    </span>
  );
}

export function PageHeader({ title, subtitle, icon: Icon, tone = "bg-pastel-blue", ink = "text-primary", demo = true }: {
  title: string; subtitle: string; icon?: LucideIcon; tone?: string; ink?: string; demo?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="mb-5">
      <button
        onClick={() => (window.history.length > 1 ? router.history.back() : router.navigate({ to: "/" }))}
        className="mb-3 inline-flex min-h-11 items-center gap-1.5 rounded-full pr-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl", tone)}>
            <Icon className={cn("h-6 w-6", ink)} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
            {demo && <DemoBadge label="Preview" />}
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function StatCard({ label, value, icon: Icon, tone = "bg-pastel-blue", ink = "text-primary", demo = true }: {
  label: string; value: string; icon: LucideIcon; tone?: string; ink?: string; demo?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3.5 shadow-soft">
      <div className="flex items-center justify-between">
        <div className={cn("grid h-9 w-9 place-items-center rounded-xl", tone)}>
          <Icon className={cn("h-[18px] w-[18px]", ink)} />
        </div>
        {demo && <DemoBadge label="Sample" />}
      </div>
      <p className="mt-3 truncate text-lg font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

const BADGE: Record<string, string> = {
  High: "bg-pastel-pink text-destructive",
  Medium: "bg-pastel-orange text-warning",
  Low: "bg-pastel-green text-success",
  Present: "bg-pastel-green text-success",
  Late: "bg-pastel-orange text-warning",
  "On Leave": "bg-pastel-grey text-muted-foreground",
  New: "bg-pastel-blue text-primary",
  Contacted: "bg-pastel-cyan text-primary-deep",
  Interested: "bg-pastel-purple text-chart-5",
  "Follow-up": "bg-pastel-orange text-warning",
  Converted: "bg-pastel-green text-success",
  "Not Interested": "bg-pastel-grey text-muted-foreground",
  Active: "bg-pastel-blue text-primary",
  Pending: "bg-pastel-orange text-warning",
  Completed: "bg-pastel-green text-success",
  Paid: "bg-pastel-green text-success",
  Partial: "bg-pastel-cyan text-primary-deep",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold", BADGE[status] ?? "bg-muted text-muted-foreground")}>
      {status}
    </span>
  );
}

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2.5 rounded-2xl bg-pastel-blue p-3.5 text-sm text-secondary-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function SectionTitle({ title, aside }: { title: string; aside?: ReactNode }) {
  return (
    <div className="mb-3 mt-7 flex items-center justify-between gap-2">
      <h2 className="text-base font-bold tracking-tight">{title}</h2>
      {aside}
    </div>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-2xl border border-border bg-card p-4 shadow-soft", className)}>{children}</div>;
}

/** Opens a configured Google Form, or shows an inline "not configured" message. */
export function FormButton({ formKey, children, variant = "primary", className }: {
  formKey: FormKey; children: ReactNode; variant?: "primary" | "success"; className?: string;
}) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={className}>
      <button
        onClick={() => setMissing(!openGoogleForm(formKey))}
        className={cn(
          "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]",
          variant === "primary" ? "bg-hero" : "bg-success",
        )}
      >
        {children} <ExternalLink className="h-4 w-4" />
      </button>
      {missing && (
        <p role="alert" className="mt-2 rounded-lg bg-pastel-pink px-3 py-2 text-xs font-medium text-destructive">
          {FORM_MISSING_MESSAGE}
        </p>
      )}
    </div>
  );
}

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-9 shrink-0 rounded-full border px-3.5 text-xs font-semibold transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
    />
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-hero transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function BarChart({ data, format }: { data: { label: string; value: number }[]; format?: (n: number) => string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
          <span className="text-[10px] font-semibold text-muted-foreground">{format ? format(d.value) : d.value}</span>
          <div className="w-full max-w-10 rounded-t-lg bg-hero" style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
          <span className="truncate text-[11px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 300},${100 - ((v - min) / (max - min || 1)) * 80 - 10}`);
  return (
    <svg viewBox="0 0 300 100" className="h-32 w-full" preserveAspectRatio="none" aria-hidden>
      <polygon points={`0,100 ${pts.join(" ")} 300,100`} className="fill-pastel-blue" />
      <polyline points={pts.join(" ")} fill="none" className="stroke-primary" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
