/**
 * Google Forms responder links (Phase 1).
 * Paste the PUBLISHED responder link (â€¦/viewform or https://forms.gle/â€¦).
 * Never paste an admin/edit link. Leave empty if not ready.
 */
export const FORM_LINKS = {
  beforeVisit: "https://forms.gle/yNApV9DLzuU9nmEx5",
  afterVisit: "",
  attendance: "",
  todayTaskComplete: "",
};

export type FormKey = keyof typeof FORM_LINKS;

export const FORM_LABELS: Record<FormKey, string> = {
  beforeVisit: "Before Visiting",
  afterVisit: "After Visiting",
  attendance: "Attendance",
  todayTaskComplete: "Today's Task Complete",
};

