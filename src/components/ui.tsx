import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { isHex } from "../lib/hooks";

export function Group({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="border-t border-hair px-5 py-5 first:border-t-0">
      <div className="mb-3.5 flex items-baseline gap-2">
        <h3 className="font-body text-[10px] font-extrabold uppercase tracking-[0.2em] text-ink/55">{title}</h3>
        {hint ? <span className="text-[10px] text-muted/70">{hint}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold text-ink/70">{label}</span>
      <input
        className="field"
        style={mono ? { fontFamily: "ui-monospace, monospace", fontSize: "0.75rem" } : undefined}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const safe = isHex(value);
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold text-ink/70">{label}</span>
      <div className="flex items-center gap-2">
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-hair">
          <span className="absolute inset-0" style={{ background: safe ? value : "transparent" }} />
          <input
            type="color"
            value={safe ? value : "#000000"}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute inset-0 cursor-pointer opacity-0"
            aria-label={`${label} colour picker`}
          />
        </span>
        <input
          className="field uppercase"
          value={value}
          spellCheck={false}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}

export function OptionCard({
  selected,
  title,
  desc,
  badge,
  onSelect,
}: {
  selected: boolean;
  title: string;
  desc: string;
  badge?: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group relative w-full rounded-2xl border p-3.5 text-left transition-all duration-200 ${
        selected
          ? "border-forest/35 bg-forest/[0.055] shadow-[0_10px_28px_-18px_rgba(17,33,28,0.55)]"
          : "border-hair bg-white hover:border-forest/25 hover:bg-parchment/40"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-body text-[13px] font-bold text-ink">{title}</span>
        {badge ? (
          <span className="shrink-0 rounded-full border border-gold/40 bg-gold/12 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#8a6f34]">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-[11.5px] leading-snug text-muted">{desc}</p>
      {selected ? (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-forest text-ivory">
          <Check size={12} strokeWidth={3} />
        </span>
      ) : null}
    </button>
  );
}

export function CheckCard({
  checked,
  title,
  desc,
  onToggle,
}: {
  checked: boolean;
  title: string;
  desc: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors duration-150 ${
        checked ? "border-sagedeep/30 bg-sagedeep/[0.07]" : "border-hair bg-white hover:border-forest/20"
      }`}
    >
      <span
        className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-[6px] border transition-colors ${
          checked ? "border-sagedeep bg-sagedeep text-white" : "border-ink/25 bg-white"
        }`}
      >
        {checked ? <Check size={11} strokeWidth={3.5} /> : null}
      </span>
      <span className="min-w-0">
        <span className="block font-body text-[12.5px] font-bold text-ink">{title}</span>
        <span className="block truncate text-[10.5px] text-muted">{desc}</span>
      </span>
    </button>
  );
}
