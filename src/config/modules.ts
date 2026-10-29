import {
  MapPin, CalendarCheck, ClipboardCheck, Contact, FolderKanban, Wallet,
  Package, BarChart3, Files, Megaphone, Settings, type LucideIcon,
} from "lucide-react";

export type ModuleDef = {
  title: string;
  subtitle: string;
  to:
    | "/sales" | "/attendance" | "/tasks" | "/employees" | "/leads" | "/projects"
    | "/finance" | "/services" | "/reports" | "/documents" | "/announcements" | "/settings";
  icon: LucideIcon;
  tone: string;
  ink: string;
};

export const MODULES: ModuleDef[] = [
  { title: "Track Sales", subtitle: "Field Visits", to: "/sales", icon: MapPin, tone: "bg-pastel-blue", ink: "text-primary" },
  { title: "Attendance", subtitle: "Daily Check-in", to: "/attendance", icon: CalendarCheck, tone: "bg-pastel-pink", ink: "text-accent" },
  { title: "Today's Tasks", subtitle: "Daily Progress", to: "/tasks", icon: ClipboardCheck, tone: "bg-pastel-purple", ink: "text-chart-5" },
  { title: "Customers & Leads", subtitle: "Customer CRM", to: "/leads", icon: Contact, tone: "bg-pastel-orange", ink: "text-warning" },
  { title: "Projects", subtitle: "Project Tracking", to: "/projects", icon: FolderKanban, tone: "bg-pastel-cyan", ink: "text-primary-deep" },
  { title: "Payments & Finance", subtitle: "Revenue & Expenses", to: "/finance", icon: Wallet, tone: "bg-pastel-mint", ink: "text-success" },
  { title: "Services & Pricing", subtitle: "Company Offers", to: "/services", icon: Package, tone: "bg-pastel-lavender", ink: "text-chart-5" },
  { title: "Reports & Analytics", subtitle: "Business Insights", to: "/reports", icon: BarChart3, tone: "bg-pastel-yellow", ink: "text-warning" },
  { title: "Company Documents", subtitle: "Important Files", to: "/documents", icon: Files, tone: "bg-pastel-blue", ink: "text-primary" },
  { title: "Announcements", subtitle: "Company Updates", to: "/announcements", icon: Megaphone, tone: "bg-pastel-peach", ink: "text-accent" },
  { title: "Settings", subtitle: "App Preferences", to: "/settings", icon: Settings, tone: "bg-pastel-grey", ink: "text-muted-foreground" },
];

