import { Star } from "lucide-react";
import type { PromptVars } from "../lib/promptBuilder";

export function BrandPreview({ vars }: { vars: PromptVars }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-hair bg-white">
      <div className="flex items-center justify-between border-b border-hair px-4 py-2.5">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/50">Mini hero</span>
        <span className="rounded-full border border-hair px-2 py-0.5 text-[10px] text-muted">{vars.fontDisplay}</span>
      </div>
      <div className="relative overflow-hidden px-4 py-6" style={{ background: vars.background }}>
        <div
          className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl"
          style={{ background: vars.gold }}
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-6 h-28 w-28 rounded-full opacity-20 blur-2xl"
          style={{ background: vars.accent }}
        />
        <p className="relative flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.18em] text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ background: vars.accent }}
            />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: vars.accent }} />
          </span>
          Licensed • {vars.location}
        </p>
        <h4
          className="relative mt-3 text-[26px] leading-[1.06] tracking-tight"
          style={{ fontFamily: `${vars.fontDisplay}, Georgia, serif`, color: vars.primaryDeep }}
        >
          {vars.tagline}
        </h4>
        <p className="relative mt-2 text-[11.5px] italic" style={{ color: vars.accent }}>
          {vars.tagline2}
        </p>
        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3.5 py-1.5 text-[11px] font-bold text-ivory"
            style={{ background: vars.primary }}
          >
            Book a free discovery call
          </span>
          <span
            className="rounded-full border px-3.5 py-1.5 text-[11px] font-bold"
            style={{ borderColor: `${vars.primary}33`, color: vars.primary }}
          >
            Explore therapy
          </span>
        </div>
        <div
          className="relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t pt-3 text-[10.5px] text-muted"
          style={{ borderColor: `${vars.primary}1a` }}
        >
          <span className="flex items-center gap-0.5" style={{ color: vars.gold }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
            ))}
            <span className="ml-1" style={{ color: vars.primaryDeep }}>
              {vars.rating}
            </span>
          </span>
          <span>{vars.years} yrs</span>
          <span>{vars.clients} lives</span>
          <span className="ml-auto" style={{ color: vars.accent }}>
            {vars.hours}
          </span>
        </div>
      </div>
      <div className="flex gap-1.5 px-4 py-3" style={{ background: vars.parchment }}>
        {["Anxiety", "Burnout", "Trauma", "Grief", "Couples"].map((t) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
            style={{ background: `${vars.primary}12`, color: vars.primary }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
