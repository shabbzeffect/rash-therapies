import { site } from "../data/site";

export interface BookingRequest {
  reference: string;
  service: string;
  mode: string;
  date: string;
  time: string;
  name: string;
  email: string;
  note: string;
  submittedAt: string;
  /** Bot trap. Must stay empty; real people never see this field. */
  company?: string;
}

export type SubmitResult =
  | { ok: true; delivery: "endpoint" | "email" }
  | { ok: false; reason: string };

const ENDPOINT = import.meta.env.VITE_BOOKING_ENDPOINT?.trim();

export const hasBookingEndpoint = Boolean(ENDPOINT);

const mailtoFor = (payload: BookingRequest) => {
  const body = [
    `Reference: ${payload.reference}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Service: ${payload.service}`,
    `Meeting: ${payload.mode}`,
    `When: ${payload.date} at ${payload.time}`,
    payload.note ? `Notes: ${payload.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(
    `New session request — ${payload.reference}`,
  )}&body=${encodeURIComponent(body)}`;
};

export async function submitBooking(payload: BookingRequest): Promise<SubmitResult> {
  if (payload.company) return { ok: true, delivery: "email" };

  if (!ENDPOINT) {
    window.location.href = mailtoFor(payload);
    return { ok: true, delivery: "email" };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { ok: false, reason: `The booking service replied with ${response.status}.` };
    }
    return { ok: true, delivery: "endpoint" };
  } catch {
    return {
      ok: false,
      reason: "I could not reach the booking service. Please email or WhatsApp me and I will confirm manually.",
    };
  }
}
