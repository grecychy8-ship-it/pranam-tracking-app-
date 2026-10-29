// All data in this file is fictional SAMPLE data for the Phase 1 preview.

export const HOME_STATS = [
  { label: "Today's Visits", value: "24" },
  { label: "Active Leads", value: "12" },
  { label: "Active Projects", value: "8" },
  { label: "Monthly Revenue", value: "NPR 85,000" },
];

export type Priority = "High" | "Medium" | "Low";

export const DEMO_TASKS: { id: number; title: string; description: string; due: string; priority: Priority; done: boolean }[] = [
  { id: 1, title: "Visit Himalayan Café", description: "Present the QR Menu package and collect requirements.", due: "10:30 AM", priority: "High", done: false },
  { id: 2, title: "Follow up with Sunrise Academy", description: "Share demo of RBS Academy App.", due: "12:00 PM", priority: "Medium", done: false },
  { id: 3, title: "Prepare quotation", description: "Quotation for Everest Traders catalogue.", due: "2:00 PM", priority: "High", done: true },
  { id: 4, title: "Edit promo video draft", description: "Second cut for Lakeside Hotel.", due: "4:00 PM", priority: "Low", done: false },
  { id: 5, title: "Update leads sheet", description: "Record today's visit outcomes.", due: "5:30 PM", priority: "Medium", done: false },
];

export const DEMO_EMPLOYEES = [
  { id: 1, name: "Aarav Sharma", role: "Sales Executive", department: "Sales", status: "Present", joined: "2024" },
  { id: 2, name: "Sita Karki", role: "Designer", department: "Creative", status: "Present", joined: "2023" },
  { id: 3, name: "Bikash Thapa", role: "Developer", department: "Technology", status: "On Leave", joined: "2022" },
  { id: 4, name: "Priya Shrestha", role: "Sales Executive", department: "Sales", status: "Late", joined: "2025" },
  { id: 5, name: "Rohan Gurung", role: "Video Editor", department: "Creative", status: "Present", joined: "2024" },
  { id: 6, name: "Anisha Rai", role: "Manager", department: "Operations", status: "Present", joined: "2021" },
];

export const LEAD_STATUSES = ["New", "Contacted", "Interested", "Follow-up", "Converted", "Not Interested"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const DEMO_LEADS: { id: number; name: string; business: string; source: string; status: LeadStatus; followUp: string; interest: string }[] = [
  { id: 1, name: "Ramesh Adhikari", business: "Himalayan Café", source: "Field Visit", status: "Interested", followUp: "Oct 24", interest: "QR Menu" },
  { id: 2, name: "Kopila Magar", business: "Sunrise Academy", source: "Referral", status: "Follow-up", followUp: "Oct 23", interest: "RBS Academy App" },
  { id: 3, name: "Dipesh Joshi", business: "Everest Traders", source: "Facebook", status: "Converted", followUp: "—", interest: "Product Catalogue" },
  { id: 4, name: "Manisha Tamang", business: "Lakeside Hotel", source: "Field Visit", status: "Contacted", followUp: "Oct 25", interest: "Promotional Video" },
  { id: 5, name: "Suraj KC", business: "KC Hardware", source: "Walk-in", status: "New", followUp: "Oct 26", interest: "Sheets Automation" },
  { id: 6, name: "Gita Poudel", business: "Poudel Boutique", source: "Instagram", status: "Not Interested", followUp: "—", interest: "Catalogue" },
  { id: 7, name: "Hari Bhandari", business: "Valley Clinic", source: "Referral", status: "Interested", followUp: "Oct 27", interest: "Custom Software" },
];

export const PROJECT_STATUSES = ["Active", "Pending", "Completed"] as const;
export const DEMO_PROJECTS = [
  { id: 1, title: "QR Menu Setup", client: "Himalayan Café", owner: "Aarav Sharma", progress: 70, priority: "High" as Priority, due: "Oct 30", status: "Active" as const },
  { id: 2, title: "Academy App Build", client: "Sunrise Academy", owner: "Bikash Thapa", progress: 45, priority: "High" as Priority, due: "Nov 20", status: "Active" as const },
  { id: 3, title: "Hotel Promo Video", client: "Lakeside Hotel", owner: "Rohan Gurung", progress: 85, priority: "Medium" as Priority, due: "Oct 25", status: "Active" as const },
  { id: 4, title: "Product Catalogue", client: "Everest Traders", owner: "Sita Karki", progress: 100, priority: "Low" as Priority, due: "Oct 10", status: "Completed" as const },
  { id: 5, title: "Clinic Booking System", client: "Valley Clinic", owner: "Bikash Thapa", progress: 0, priority: "Medium" as Priority, due: "Dec 15", status: "Pending" as const },
];

export const FINANCE_SUMMARY = [
  { label: "Total Revenue", value: 85000 },
  { label: "Collected", value: 62000 },
  { label: "Pending", value: 23000 },
  { label: "Expenses", value: 28500 },
];

export const MONTHLY_REVENUE = [
  { month: "May", value: 42000 }, { month: "Jun", value: 51000 }, { month: "Jul", value: 47000 },
  { month: "Aug", value: 63000 }, { month: "Sep", value: 72000 }, { month: "Oct", value: 85000 },
];

export const DEMO_TRANSACTIONS = [
  { id: 1, party: "Everest Traders", note: "Catalogue — final", amount: 5000, type: "in", status: "Paid", date: "Oct 20" },
  { id: 2, party: "Office rent", note: "October", amount: 15000, type: "out", status: "Paid", date: "Oct 18" },
  { id: 3, party: "Himalayan Café", note: "QR Menu — advance", amount: 1500, type: "in", status: "Partial", date: "Oct 17" },
  { id: 4, party: "Sunrise Academy", note: "App — milestone 1", amount: 10000, type: "in", status: "Pending", date: "Oct 15" },
  { id: 5, party: "Internet", note: "Monthly plan", amount: 2000, type: "out", status: "Paid", date: "Oct 12" },
];

export const VISITS_BY_RANGE = {
  "7d": [12, 18, 15, 22, 19, 24, 21],
  "30d": [80, 95, 102, 118],
} as const;

export const SALES_PERFORMANCE = [
  { name: "Aarav Sharma", visits: 46, converted: 9 },
  { name: "Priya Shrestha", visits: 38, converted: 6 },
  { name: "Anisha Rai", visits: 21, converted: 5 },
];

export const DOC_CATEGORIES = ["Company Documents", "Client Agreements", "Quotations", "Employee Documents", "Project Files", "Reports"] as const;
export const DEMO_DOCS = [
  { id: 1, name: "Company Profile 2026.pdf", category: "Company Documents", size: "1.2 MB", date: "Oct 02" },
  { id: 2, name: "Service Agreement — Everest Traders.pdf", category: "Client Agreements", size: "340 KB", date: "Sep 28" },
  { id: 3, name: "Quotation — Valley Clinic.pdf", category: "Quotations", size: "210 KB", date: "Oct 19" },
  { id: 4, name: "Leave Policy.docx", category: "Employee Documents", size: "88 KB", date: "Aug 14" },
  { id: 5, name: "Academy App Wireframes.fig", category: "Project Files", size: "4.6 MB", date: "Oct 11" },
  { id: 6, name: "September Sales Report.xlsx", category: "Reports", size: "156 KB", date: "Oct 01" },
];

export const DEMO_ANNOUNCEMENTS = [
  { id: 1, title: "Welcome to the new Company Hub", date: "Oct 21", category: "General", priority: "High" as Priority, pinned: true, body: "This app will become our single place to manage sales, team and operations. Phase 1 is a preview with sample data." },
  { id: 2, title: "Dashain holiday schedule", date: "Oct 18", category: "HR", priority: "Medium" as Priority, pinned: false, body: "Office will remain closed during the main Dashain days. Plan client visits accordingly." },
  { id: 3, title: "New QR Menu pricing", date: "Oct 12", category: "Sales", priority: "Low" as Priority, pinned: false, body: "QR Menu starts from NPR 1,000. Check Services & Pricing for details." },
];
