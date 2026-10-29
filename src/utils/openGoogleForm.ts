import { FORM_LINKS, type FormKey } from "@/config/forms";

export const FORM_MISSING_MESSAGE = "Form not configured yet. Please contact your administrator.";

/** Accepts only published HTTPS Google Forms responder links. */
export function isValidFormUrl(raw: string): boolean {
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return false;
  }
  if (url.protocol !== "https:") return false;
  if (url.hostname === "forms.gle") return url.pathname.length > 1;
  if (url.hostname === "docs.google.com") {
    const p = url.pathname;
    if (!p.startsWith("/forms/")) return false;
    if (/\/edit\b/.test(p)) return false;
    return /\/(viewform|formResponse)\/?$/.test(p);
  }
  return false;
}

export function getFormUrl(key: FormKey): string | null {
  const url = FORM_LINKS[key];
  return isValidFormUrl(url) ? url.trim() : null;
}

/** Opens the form in a new tab. Returns false when not configured. */
export function openGoogleForm(key: FormKey): boolean {
  const url = getFormUrl(key);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
