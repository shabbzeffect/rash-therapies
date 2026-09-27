import type { PromptConfig, PromptVars } from "./promptBuilder";

export type IssueLevel = "error" | "warn";
export interface Issue {
  id: string;
  level: IssueLevel;
  message: string;
  fix?: string;
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const REQUIRED: (keyof PromptVars)[] = [
  "name",
  "shortName",
  "role",
  "credentials",
  "location",
  "serviceArea",
  "tagline",
  "hours",
  "email",
  "phone",
  "whatsapp",
];

const PALETTE: (keyof PromptVars)[] = ["primary", "primaryDeep", "background", "parchment", "accent", "gold"];

export const digitsOnly = (s: string) => s.replace(/\D/g, "");

export function validate(v: PromptVars, c: PromptConfig): Issue[] {
  const out: Issue[] = [];

  for (const k of REQUIRED) {
    if (!v[k].trim()) {
      out.push({
        id: `empty-${k}`,
        level: "error",
        message: `“${k}” is empty — it appears verbatim in the prompt.`,
      });
    }
  }

  if (v.name.trim() && !v.name.trim().includes(" ")) {
    out.push({
      id: "name-single",
      level: "warn",
      message: "Full name has no space, so “short name” and initials may look wrong.",
      fix: "e.g. Rashidah K. Wangara",
    });
  }

  if (v.email.trim() && !EMAIL.test(v.email.trim())) {
    out.push({ id: "email", level: "error", message: `“${v.email}” is not a valid email address.` });
  }

  const wa = digitsOnly(v.whatsapp);
  if (v.whatsapp.trim() && /[^\d]/.test(v.whatsapp)) {
    out.push({
      id: "whatsapp-chars",
      level: "error",
      message: "WhatsApp number contains non-digits — wa.me links will break.",
      fix: wa || "254722000000",
    });
  }
  if (wa && wa.length < 9) {
    out.push({ id: "whatsapp-short", level: "warn", message: `WhatsApp number looks short (${wa.length} digits).` });
  }

  for (const k of PALETTE) {
    if (!HEX.test(v[k].trim())) {
      out.push({ id: `hex-${k}`, level: "error", message: `“${k}” is not a valid hex colour (got “${v[k]}”).` });
    }
  }

  if (HEX.test(v.primary) && v.primary.toLowerCase() === v.primaryDeep.toLowerCase()) {
    out.push({ id: "same-primary", level: "warn", message: "Primary and primary deep are identical — dark bands will lose depth." });
  }

  if (!c.features.length) {
    out.push({
      id: "no-features",
      level: "warn",
      message: "No systems selected — the prompt collapses to a contact-CTA landing page.",
    });
  }

  if (!c.features.includes("booking")) {
    out.push({
      id: "no-booking",
      level: "warn",
      message: "Booking engine is off, but the navbar and hero still link to #book.",
      fix: "Turn it on, or expect dead anchors in the generated site.",
    });
  }

  if (!c.features.includes("faq") && !c.features.includes("newsletter")) {
    out.push({
      id: "no-objections",
      level: "warn",
      message: "No FAQ and no newsletter — nothing answers “do I really need therapy?” or captures the email.",
    });
  }

  if (c.tone === "clinical-trust" && !v.credentials.trim()) {
    out.push({ id: "tone-creds", level: "warn", message: "Clinical Trust tone leans on credentials, but that field is empty." });
  }

  return out;
}
