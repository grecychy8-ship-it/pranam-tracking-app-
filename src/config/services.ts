/** Services & starting prices (NPR). Edit here to update the catalogue. `price: null` = custom quote. */
export type Service = {
  id: string;
  name: string;
  description: string;
  price: number | null;
  icon: "qr" | "video" | "catalog" | "app" | "sheet" | "quote" | "referral" | "code";
  tone: string;
  details: string[];
};

export const SERVICES: Service[] = [
  { id: "qr-menu", name: "Digital Menu / QR Menu", description: "Scan-to-view menus for restaurants and cafés.", price: 1000, icon: "qr", tone: "bg-pastel-blue", details: ["Printable QR code", "Mobile-friendly menu", "Easy item updates"] },
  { id: "promo-video", name: "Promotional Video", description: "Short, social-ready videos for your brand.", price: 1000, icon: "video", tone: "bg-pastel-pink", details: ["Script & editing", "Vertical + square formats", "Background music"] },
  { id: "catalogue", name: "Digital Product Catalogue", description: "Shareable product catalogue for WhatsApp & web.", price: 500, icon: "catalog", tone: "bg-pastel-orange", details: ["Product photos & prices", "Shareable link", "Category sections"] },
  { id: "rbs-app", name: "RBS Academy App", description: "Learning app for academies and coaching centres.", price: 5000, icon: "app", tone: "bg-pastel-purple", details: ["Courses & notes", "Student access", "Branded app"] },
  { id: "sheets", name: "Excel / Google Sheets Automation", description: "Automate repetitive spreadsheet work.", price: null, icon: "sheet", tone: "bg-pastel-green", details: ["Formulas & dashboards", "Auto reports", "Data cleanup"] },
  { id: "quotation", name: "Quotation Generator", description: "Generate professional quotations in seconds.", price: null, icon: "quote", tone: "bg-pastel-cyan", details: ["Branded templates", "Auto totals & tax", "PDF export"] },
  { id: "referral", name: "Customer Referral System", description: "Reward customers who bring new customers.", price: null, icon: "referral", tone: "bg-pastel-peach", details: ["Referral codes", "Reward tracking", "Simple reports"] },
  { id: "custom", name: "Custom Software Development", description: "Tailor-made software for your business.", price: null, icon: "code", tone: "bg-pastel-lavender", details: ["Requirement analysis", "Design & build", "Support"] },
];

export const formatNPR = (n: number) => `NPR ${n.toLocaleString("en-IN")}`;
