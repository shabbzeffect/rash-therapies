import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowLeft, CalendarCheck, Check, Clock, Copy, HeartHandshake, Loader2, MapPin, Monitor } from "lucide-react";
import { booking, services, site } from "../data/site";
import { PillButton, Reveal, SectionHead } from "./primitives";
import { hasBookingEndpoint, submitBooking } from "../lib/booking";
import { toast } from "../lib/toast";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Mode = (typeof booking.modes)[number];

interface FormState {
  service: string;
  mode: Mode | "";
  date: string;
  time: string;
  name: string;
  email: string;
  note: string;
}

const EMPTY: FormState = { service: "", mode: "", date: "", time: "", name: "", email: "", note: "" };

type Errors = Partial<Record<keyof FormState, string>>;

function buildDates() {
  const out: { iso: string; day: string; date: string; month: string }[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1);
  while (out.length < 10) {
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 1) {
      out.push({
        iso: cursor.toISOString().slice(0, 10),
        day: cursor.toLocaleDateString("en-GB", { weekday: "short" }),
        date: String(cursor.getDate()).padStart(2, "0"),
        month: cursor.toLocaleDateString("en-GB", { month: "short" }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

function makeRef() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 5; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `RKW-${out}`;
}

export function Booking() {
  const reduce = useReducedMotion();
  const dates = useMemo(() => buildDates(), []);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [ref, setRef] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<"endpoint" | "email">("endpoint");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (target: number) => {
    const next: Errors = {};
    if (target > 1) {
      if (!form.service) next.service = "Choose the kind of support you need.";
      if (!form.mode) next.mode = "Tell me how you would like to meet.";
    }
    if (target > 2) {
      if (!form.date) next.date = "Pick a day that suits you.";
      if (!form.time) next.time = "Choose a time.";
      if (!form.name.trim()) next.name = "I need a name for your booking.";
      if (!EMAIL.test(form.email.trim())) next.email = "Please enter a valid email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const advance = () => {
    if (!validateStep(step + 1)) return;
    setStep((s) => Math.min(3, s + 1));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validateStep(3) || sending) return;

    const reference = makeRef();
    setSending(true);
    setSendError(null);

    const result = await submitBooking({
      reference,
      service: form.service,
      mode: form.mode,
      date: form.date,
      time: form.time,
      name: form.name.trim(),
      email: form.email.trim(),
      note: form.note.trim(),
      submittedAt: new Date().toISOString(),
      company: String(new FormData(event.currentTarget as HTMLFormElement).get("company") ?? ""),
    });

    setSending(false);
    if (!result.ok) {
      setSendError(result.reason);
      return;
    }
    setDelivery(result.delivery);
    setRef(reference);
    setStep(4);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setRef("");
    setSendError(null);
    setStep(1);
  };

  const selectedService = services.find((s) => s.title === form.service);
  const selectedDate = dates.find((d) => d.iso === form.date);

  return (
    <section id="book" className="grain relative scroll-mt-20 overflow-hidden bg-forest py-24 text-ivory lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-sage/14 blur-3xl" />
      <div className="shell relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHead
            tone="light"
            eyebrow="Book a session"
            title={booking.title}
            intro={booking.intro}
          />

          <ul className="mt-12 grid gap-5">
            {booking.info.map((row) => {
              const Icon = row.label === "Where" ? MapPin : row.label === "When" ? Clock : Monitor;
              return (
                <li key={row.label} className="flex items-start gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/30 text-gold">
                    <Icon size={15} strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-ivory/40">
                      {row.label}
                    </span>
                    <span className="mt-1 block text-[14.5px] leading-relaxed text-ivory/80">{row.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-12 rounded-[24px] border border-clay/35 bg-clay/10 p-6">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#f0b48c]">
              {site.crisis.title}
            </p>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ivory/70">
              In crisis in Kenya? Call the Kenya Red Cross on 1199 or Befrienders Kenya on 0722 178 177. Free,
              confidential and always open.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[30px] bg-ivory p-7 text-ink shadow-lift sm:p-9">
            <AnimatePresence mode="wait">
              {step < 4 ? (
                <motion.form
                  key="form"
                  onSubmit={step === 3 ? submit : (e) => {
                    e.preventDefault();
                    advance();
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  noValidate
                >
                  <div className="flex items-center justify-between gap-4">
                    <ol className="flex items-center gap-2" aria-label="Booking progress">
                      {[1, 2, 3].map((n) => (
                        <li key={n} className="flex items-center gap-2">
                          <span
                            className={`grid h-7 w-7 place-items-center rounded-full text-[11.5px] font-bold transition-colors ${
                              step >= n ? "bg-forest text-ivory" : "bg-forest/10 text-muted"
                            }`}
                          >
                            {step > n ? <Check size={12} strokeWidth={3} /> : n}
                          </span>
                          {n < 3 ? (
                            <span
                              aria-hidden="true"
                              className={`h-px w-6 transition-colors ${step > n ? "bg-forest" : "bg-forest/15"}`}
                            />
                          ) : null}
                        </li>
                      ))}
                    </ol>
                    <span className="text-[11.5px] font-semibold text-muted">Step {step} of 3</span>
                  </div>
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-forest/10">
                    <motion.div
                      className="h-full rounded-full bg-gold"
                      animate={{ width: `${((step - 1) / 2) * 100}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>

                  {step === 1 ? (
                    <fieldset className="mt-8">
                      <legend className="font-display text-[1.375rem] text-ink">
                        What would you like support with?
                      </legend>
                      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {services.map((s) => (
                          <button
                            key={s.title}
                            type="button"
                            onClick={() => set("service", s.title)}
                            aria-pressed={form.service === s.title}
                            className={`rounded-[18px] border p-4 text-left transition-all duration-200 ${
                              form.service === s.title
                                ? "border-forest bg-forest/[0.05] shadow-[0_10px_26px_-18px_rgba(17,33,28,0.5)]"
                                : "border-forest/12 bg-white hover:border-forest/30"
                            }`}
                          >
                            <span className="block text-[13.5px] font-bold text-ink">{s.title}</span>
                            <span className="mt-1 block text-[11.5px] text-muted">
                              {s.price} · {s.duration}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.service ? <FieldError>{errors.service}</FieldError> : null}

                      <legend className="mt-8 font-display text-[1.375rem] text-ink">How shall we meet?</legend>
                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {booking.modes.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => set("mode", m)}
                            aria-pressed={form.mode === m}
                            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13px] font-bold transition-all duration-200 ${
                              form.mode === m
                                ? "border-forest bg-forest text-ivory"
                                : "border-forest/15 bg-white text-ink/75 hover:border-forest/35"
                            }`}
                          >
                            {m === "Online" ? <Monitor size={14} /> : <MapPin size={14} />}
                            {m}
                          </button>
                        ))}
                      </div>
                      {errors.mode ? <FieldError>{errors.mode}</FieldError> : null}
                    </fieldset>
                  ) : null}

                  {step === 2 ? (
                    <fieldset className="mt-8">
                      <legend className="font-display text-[1.375rem] text-ink">Choose a day</legend>
                      <p className="mt-1.5 text-[12.5px] text-muted">
                        Tuesday to Saturday only — Sundays and Mondays are days off.
                      </p>
                      <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-5">
                        {dates.map((d) => (
                          <button
                            key={d.iso}
                            type="button"
                            onClick={() => set("date", d.iso)}
                            aria-pressed={form.date === d.iso}
                            className={`rounded-[16px] border py-3 text-center transition-all duration-200 ${
                              form.date === d.iso
                                ? "border-forest bg-forest text-ivory"
                                : "border-forest/12 bg-white hover:border-forest/30"
                            }`}
                          >
                            <span className="block text-[10.5px] font-bold uppercase tracking-[0.1em] opacity-70">
                              {d.day}
                            </span>
                            <span className="mt-0.5 block font-display text-lg leading-none">{d.date}</span>
                            <span className="block text-[10px] opacity-60">{d.month}</span>
                          </button>
                        ))}
                      </div>
                      {errors.date ? <FieldError>{errors.date}</FieldError> : null}

                      <legend className="mt-8 font-display text-[1.375rem] text-ink">And a time</legend>
                      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {booking.times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => set("time", t)}
                            aria-pressed={form.time === t}
                            className={`rounded-full border py-2.5 text-[13px] font-bold transition-all duration-200 ${
                              form.time === t
                                ? "border-forest bg-forest text-ivory"
                                : "border-forest/15 bg-white text-ink/75 hover:border-forest/35"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.time ? <FieldError>{errors.time}</FieldError> : null}
                    </fieldset>
                  ) : null}

                  {step === 3 ? (
                    <fieldset className="mt-8 grid gap-4">
                      <legend className="sr-only">Your details</legend>

                      {/* Honeypot: hidden from people, tempting to bots. */}
                      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
                        <label htmlFor="bk-company">Company</label>
                        <input id="bk-company" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="bk-name" className="mb-1.5 block text-[12px] font-bold text-ink/70">
                            Your name
                          </label>
                          <input
                            id="bk-name"
                            className="field"
                            value={form.name}
                            onChange={(e) => set("name", e.target.value)}
                            placeholder="e.g. Wanjiku"
                            aria-invalid={Boolean(errors.name)}
                          />
                          {errors.name ? <FieldError>{errors.name}</FieldError> : null}
                        </div>
                        <div>
                          <label htmlFor="bk-email" className="mb-1.5 block text-[12px] font-bold text-ink/70">
                            Email
                          </label>
                          <input
                            id="bk-email"
                            type="email"
                            className="field"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            placeholder="you@example.com"
                            aria-invalid={Boolean(errors.email)}
                          />
                          {errors.email ? <FieldError>{errors.email}</FieldError> : null}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="bk-note" className="mb-1.5 block text-[12px] font-bold text-ink/70">
                          Anything you would like me to know? <span className="font-normal text-muted">(optional)</span>
                        </label>
                        <textarea
                          id="bk-note"
                          rows={3}
                          className="field resize-none"
                          value={form.note}
                          onChange={(e) => set("note", e.target.value)}
                          placeholder="Only if you want to. You can also tell me everything on the first call."
                        />
                      </div>

                      <div className="mt-2 rounded-[20px] border border-forest/10 bg-parchment p-5">
                        <p className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-sage-deep">
                          Your request
                        </p>
                        <dl className="mt-3 grid gap-2 text-[13.5px]">
                          <Row label="Support" value={form.service} />
                          <Row label="Meeting" value={form.mode} />
                          <Row
                            label="When"
                            value={
                              selectedDate
                                ? `${selectedDate.day} ${selectedDate.date} ${selectedDate.month}${
                                    form.time ? ` at ${form.time}` : ""
                                  }`
                                : form.date || "—"
                            }
                          />
                          {selectedService ? <Row label="Session" value={`${selectedService.price} · ${selectedService.duration}`} /> : null}
                        </dl>
                      </div>

                      <p className="text-[12px] text-muted">
                        {hasBookingEndpoint
                          ? "No payment today. I will confirm by email within one working day."
                          : "No payment today. This opens a pre-filled email in your mail app — send it and I will confirm within one working day."}
                      </p>

                      {sendError ? (
                        <p
                          role="alert"
                          className="flex items-start gap-2.5 rounded-[18px] border border-clay/30 bg-clay/[0.07] px-4 py-3 text-[13px] leading-snug text-ink"
                        >
                          <AlertCircle size={15} className="mt-0.5 shrink-0 text-clay" />
                          <span>
                            {sendError}
                            <a
                              href={site.whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-1 font-bold underline underline-offset-2"
                            >
                              WhatsApp me
                            </a>
                          </span>
                        </p>
                      ) : null}
                    </fieldset>
                  ) : null}

                  <div className="mt-8 flex items-center justify-between gap-3 border-t border-forest/10 pt-6">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep((s) => s - 1)}
                        disabled={sending}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-muted transition-colors hover:text-ink disabled:opacity-40"
                      >
                        <ArrowLeft size={14} />
                        Back
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-[14px] font-bold text-ivory transition-transform duration-300 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                    >
                      {sending ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Holding your space…
                        </>
                      ) : step === 3 ? (
                        <>
                          <CalendarCheck size={16} />
                          Hold my space
                        </>
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>

                  <p className="mt-5 text-center text-[11.5px] text-muted">{site.reassurance}</p>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="py-6 text-center"
                >
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage/18 text-sage-deep">
                    <HeartHandshake size={28} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-7 font-display text-[1.875rem] leading-tight text-ink">
                    Asante, {form.name.split(" ")[0]}. Your space is held.
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm text-[14.5px] leading-relaxed text-muted">
                    {delivery === "endpoint"
                      ? "I have your request and will confirm by email within one working day. Nothing is charged today."
                      : "Your email app should have opened with the details filled in — send it and I will confirm within one working day. Nothing is charged today."}
                  </p>

                  <div className="mx-auto mt-8 max-w-sm rounded-[22px] border border-forest/12 bg-parchment p-6">
                    <p className="text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-sage-deep">
                      Your reference
                    </p>
                    <p className="mt-2 font-display text-3xl tracking-[0.06em] text-forest">{ref}</p>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(ref);
                          toast("Reference copied to your clipboard.");
                        } catch {
                          toast(`Your reference is ${ref}`);
                        }
                      }}
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-forest/20 bg-white px-4 py-2 text-[12.5px] font-bold text-ink transition-colors hover:border-forest/40"
                    >
                      <Copy size={13} />
                      Copy reference
                    </button>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <PillButton href={`mailto:${site.email}?subject=Booking ${ref}`}>Email me instead</PillButton>
                    <button
                      type="button"
                      onClick={reset}
                      className="rounded-full border border-forest/20 px-7 py-3.5 text-[14px] font-bold text-forest transition-colors hover:border-forest/45"
                    >
                      Book another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold text-ink">{value || "—"}</dd>
    </div>
  );
}

function FieldError({ children }: { children: string }) {
  return (
    <p role="alert" className="mt-2 text-[12px] font-semibold text-clay">
      {children}
    </p>
  );
}
