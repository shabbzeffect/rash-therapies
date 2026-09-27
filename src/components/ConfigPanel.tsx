import {
  ALL_FEATURES,
  DEPTHS,
  TECHS,
  TONES,
  defaultConfig,
  defaultVars,
  type PromptConfig,
  type PromptDepth,
  type PromptVars,
  type TechStack,
} from "../lib/promptBuilder";
import { PRESETS, type Preset } from "../lib/presets";
import { digitsOnly, type Issue } from "../lib/validate";
import { CheckCard, ColorField, Group, OptionCard, TextField } from "./ui";
import { BrandPreview } from "./BrandPreview";
import { AlertTriangle, CircleAlert, Sparkle, Wand2 } from "lucide-react";

type Vars = PromptVars;
type Cfg = PromptConfig;

export function ConfigPanel({
  vars,
  config,
  issues,
  activePreset,
  setVars,
  setConfig,
  onPreset,
  onReset,
}: {
  vars: Vars;
  config: Cfg;
  issues: Issue[];
  activePreset: string | null;
  setVars: (updater: (v: Vars) => Vars) => void;
  setConfig: (updater: (c: Cfg) => Cfg) => void;
  onPreset: (p: Preset) => void;
  onReset: () => void;
}) {
  const set = (key: keyof Vars) => (value: string) => setVars((v) => ({ ...v, [key]: value }));
  const toggleFeature = (id: string) =>
    setConfig((c) => ({
      ...c,
      features: c.features.includes(id) ? c.features.filter((f) => f !== id) : [...c.features, id],
    }));

  const isDefault =
    JSON.stringify(vars) === JSON.stringify(defaultVars) && JSON.stringify(config) === JSON.stringify(defaultConfig);
  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");

  return (
    <div className="pb-24">
      <Group title="Start from">
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPreset(p)}
              className={`rounded-2xl border px-3 py-2.5 text-left transition-colors ${
                activePreset === p.id
                  ? "border-gold/50 bg-gold/[0.09]"
                  : "border-hair bg-white hover:border-forest/25 hover:bg-parchment/40"
              }`}
            >
              <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-ink">
                {activePreset === p.id ? <Sparkle size={12} className="text-gold" /> : null}
                {p.label}
              </span>
              <span className="mt-0.5 block text-[10.5px] leading-tight text-muted">{p.sub}</span>
            </button>
          ))}
        </div>
        <p className="mt-2.5 text-[10.5px] leading-snug text-muted">
          Presets swap the whole brief — palette, copy anchors, depth, tone, stack and systems. Anything you tweak
          after loading stays yours.
        </p>
      </Group>

      <Group title="Identity">

        <div className="grid gap-3">
          <TextField label="Full name" value={vars.name} onChange={set("name")} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Short name" value={vars.shortName} onChange={set("shortName")} />
            <TextField label="Years" value={vars.years} onChange={set("years")} />
          </div>
          <TextField label="Role" value={vars.role} onChange={set("role")} />
          <TextField label="Credentials" value={vars.credentials} onChange={set("credentials")} />
        </div>
      </Group>

      <Group title="Copy anchors" hint="signature lines">
        <div className="grid gap-3">
          <TextField label="Tagline (H1)" value={vars.tagline} onChange={set("tagline")} />
          <TextField label="Sub-line" value={vars.tagline2} onChange={set("tagline2")} />
          <TextField label="Sign-off" value={vars.tagline3} onChange={set("tagline3")} />
        </div>
      </Group>

      <Group title="Location & contact">
        <div className="grid gap-3">
          <TextField label="Base location" value={vars.location} onChange={set("location")} />
          <TextField label="Service area" value={vars.serviceArea} onChange={set("serviceArea")} />
          <TextField label="Opening hours" value={vars.hours} onChange={set("hours")} />
          <div className="grid grid-cols-2 gap-3">
            <TextField label="Email" value={vars.email} onChange={set("email")} mono />
            <TextField label="Phone" value={vars.phone} onChange={set("phone")} mono />
          </div>
          <TextField
            label="WhatsApp number"
            value={vars.whatsapp}
            onChange={set("whatsapp")}
            mono
            placeholder="254722000000"
          />
          <div className="flex items-center gap-2">
            <p className="flex-1 text-[10.5px] text-muted">wa.me link → https://wa.me/{vars.whatsapp || "…"}</p>
            {digitsOnly(vars.whatsapp) !== vars.whatsapp ? (
              <button
                type="button"
                onClick={() => set("whatsapp")(digitsOnly(vars.whatsapp))}
                className="flex items-center gap-1 rounded-full border border-clay/30 bg-clay/[0.08] px-2 py-0.5 text-[10px] font-bold text-clay"
              >
                <Wand2 size={10} />
                Clean
              </button>
            ) : null}
          </div>
        </div>
      </Group>

      <Group title="Proof points" hint="stats band + hero trust row">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Clients" value={vars.clients} onChange={set("clients")} />
          <TextField label="Talks / workshops" value={vars.workshops} onChange={set("workshops")} />
          <TextField label="Rating" value={vars.rating} onChange={set("rating")} />
          <TextField label="Reviews" value={vars.reviews} onChange={set("reviews")} />
        </div>
      </Group>

      <Group title="Palette" hint="live in this app too">
        <div className="grid grid-cols-2 gap-3">
          <ColorField label="Primary" value={vars.primary} onChange={set("primary")} />
          <ColorField label="Primary deep" value={vars.primaryDeep} onChange={set("primaryDeep")} />
          <ColorField label="Background" value={vars.background} onChange={set("background")} />
          <ColorField label="Parchment" value={vars.parchment} onChange={set("parchment")} />
          <ColorField label="Accent (clay)" value={vars.accent} onChange={set("accent")} />
          <ColorField label="Gold" value={vars.gold} onChange={set("gold")} />
        </div>
      </Group>

      <Group title="Typography">
        <div className="grid grid-cols-2 gap-3">
          <TextField label="Display serif" value={vars.fontDisplay} onChange={set("fontDisplay")} />
          <TextField label="Body sans" value={vars.fontBody} onChange={set("fontBody")} />
        </div>
      </Group>

      <Group title="Depth" hint="controls prompt length">
        <div role="radiogroup" aria-label="Prompt depth" className="grid gap-2.5">
          {DEPTHS.map((d) => (
            <OptionCard
              key={d.id}
              selected={config.depth === d.id}
              title={d.label}
              desc={d.desc}
              badge={d.badge}
              onSelect={() => setConfig((c) => ({ ...c, depth: d.id as PromptDepth }))}
            />
          ))}
        </div>
      </Group>

      <Group title="Tone">
        <div role="radiogroup" aria-label="Tone" className="grid gap-2.5">
          {TONES.map((t) => (
            <OptionCard
              key={t.id}
              selected={config.tone === t.id}
              title={t.label}
              desc={t.desc}
              onSelect={() => setConfig((c) => ({ ...c, tone: t.id }))}
            />
          ))}
        </div>
      </Group>

      <Group title="Target stack">
        <div role="radiogroup" aria-label="Tech stack" className="grid gap-2.5">
          {TECHS.map((t) => (
            <OptionCard
              key={t.id}
              selected={config.tech === t.id}
              title={t.label}
              desc={t.desc}
              onSelect={() => setConfig((c) => ({ ...c, tech: t.id as TechStack }))}
            />
          ))}
        </div>
      </Group>

      <Group title="Systems" hint={`${config.features.length} of ${ALL_FEATURES.length} on`}>
        <div className="grid gap-2">
          {ALL_FEATURES.map((f) => (
            <CheckCard
              key={f.id}
              checked={config.features.includes(f.id)}
              title={f.label}
              desc={f.desc}
              onToggle={() => toggleFeature(f.id)}
            />
          ))}
        </div>
        {!config.features.includes("booking") ? (
          <p className="mt-3 rounded-xl border border-clay/25 bg-clay/[0.07] px-3 py-2 text-[11px] leading-snug text-ink/80">
            Booking is off — the builder swaps section 12 for a plain contact CTA and adds that note to the
            system list.
          </p>
        ) : null}
      </Group>

      <Group title="Live preview">
        <BrandPreview vars={vars} />
      </Group>

      <Group title="Checks" hint={issues.length ? `${errors.length} error · ${warns.length} warn` : "all clear"}>
        {issues.length === 0 ? (
          <p className="rounded-xl border border-sagedeep/25 bg-sagedeep/[0.07] px-3 py-2.5 text-[11.5px] leading-snug text-sagedeep">
            Nothing broken. Every field the prompt interpolates is present and well formed.
          </p>
        ) : (
          <ul className="grid gap-2">
            {issues.map((i) => (
              <li
                key={i.id}
                className={`flex gap-2 rounded-xl border px-3 py-2.5 text-[11.5px] leading-snug ${
                  i.level === "error"
                    ? "border-clay/30 bg-clay/[0.07] text-ink"
                    : "border-gold/30 bg-gold/[0.08] text-ink/85"
                }`}
              >
                {i.level === "error" ? (
                  <CircleAlert size={13} className="mt-0.5 shrink-0 text-clay" />
                ) : (
                  <AlertTriangle size={13} className="mt-0.5 shrink-0 text-[#8a6f34]" />
                )}
                <span>
                  {i.message}
                  {i.fix ? <span className="mt-0.5 block font-mono text-[10.5px] text-muted">→ {i.fix}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        )}
      </Group>

      <div className="sticky bottom-0 z-10 flex items-center gap-2 border-t border-hair bg-ivory/85 px-5 py-3 backdrop-blur">
        <span className="flex-1 text-[11px] text-muted">
          {issues.length === 0 ? "Ready to copy" : `${errors.length} error${errors.length === 1 ? "" : "s"} to fix`}
        </span>
        <button
          type="button"
          onClick={onReset}
          disabled={isDefault}
          className="rounded-full border border-hair bg-white px-4 py-2 text-[12px] font-bold text-ink transition-colors hover:border-forest/30 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isDefault ? "Defaults loaded" : `Reset to ${defaultVars.shortName}`}
        </button>
      </div>
    </div>
  );
}
