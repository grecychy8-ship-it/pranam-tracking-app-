import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { X, Home, MapPin, ClipboardCheck, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODULES } from "@/config/modules";

function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}

function useEscape(active: boolean, fn: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && fn();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, fn]);
}

function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("grid h-8 w-8 place-items-center rounded-xl bg-hero text-sm font-extrabold text-primary-foreground", className)}>P</span>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [{ title: "Home", to: "/" as const, icon: Home, tone: "bg-pastel-blue", ink: "text-primary" }, ...MODULES];
  return (
    <ul className="space-y-0.5">
      {items.map((m) => {
        const active = path === m.to;
        return (
          <li key={m.to}>
            <Link
              to={m.to}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn("flex min-h-11 items-center gap-3 rounded-xl px-2.5 text-sm font-medium transition-colors",
                active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-muted")}
            >
              <span className={cn("grid h-8 w-8 place-items-center rounded-lg", m.tone)}><m.icon className={cn("h-4 w-4", m.ink)} /></span>
              {m.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Drawer({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => closeRef.current?.focus(), []);
  useLockScroll(true);
  useEscape(true, onClose);
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-[85%] max-w-xs flex-col bg-sidebar shadow-lift animate-in slide-in-from-right duration-200">
        <div className="flex items-center justify-between border-b border-sidebar-border p-3">
          <div className="flex items-center gap-2"><Logo /><span className="font-bold">Pranam Software</span></div>
          <button ref={closeRef} onClick={onClose} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-xl hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3"><NavList onNavigate={onClose} /></nav>
      </aside>
    </div>
  );
}

function BottomNav({ onMore }: { onMore: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const tabs = [
    { label: "Home", to: "/" as const, icon: Home },
    { label: "Sales", to: "/sales" as const, icon: MapPin },
    { label: "Tasks", to: "/tasks" as const, icon: ClipboardCheck },
  ];
  const cls = (a: boolean) => cn("flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold transition-colors", a ? "text-primary" : "text-muted-foreground");
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-2 pt-1 backdrop-blur lg:hidden" aria-label="Primary">
      <div className="mx-auto flex max-w-md">
        {tabs.map((t) => (
          <Link key={t.to} to={t.to} className={cls(path === t.to)} aria-current={path === t.to ? "page" : undefined}>
            <t.icon className="h-5 w-5" />{t.label}
          </Link>
        ))}
        <button onClick={onMore} className={cls(false)}><LayoutGrid className="h-5 w-5" />More</button>
      </div>
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-white shadow-soft">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-4">
          <Link to="/" aria-label="Pranam Software home" className="flex h-full items-center">
            <img src="/pranam-logo-transparent.png" alt="Pranam Software" className="h-14 w-auto max-w-[300px] object-contain" />
          </Link>
        </div>
      </header>
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-sidebar-border bg-sidebar p-3 lg:block">
          <p className="px-2.5 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Modules</p>
          <NavList />
        </aside>
        <div className="min-w-0 flex-1">
          <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-4 lg:px-8 lg:pb-12 lg:pt-6">{children}</main>
        </div>
      </div>
      <BottomNav onMore={() => setMenu(true)} />
      {menu && <Drawer onClose={() => setMenu(false)} />}
    </div>
  );
}





