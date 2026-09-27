import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Link2, Maximize2, Minimize2, SlidersHorizontal, Sparkles } from "lucide-react";
import { buildMasterPrompt, defaultConfig, defaultVars, type PromptConfig, type PromptVars } from "./lib/promptBuilder";
import { useStoredState } from "./lib/hooks";
import { applyPreset, type Preset } from "./lib/presets";
import { encodeState, readHash } from "./lib/share";import { validate } from "./lib/validate";
import { ConfigPanel } from "./components/ConfigPanel";
import { PromptPane } from "./components/PromptPane";

const PALETTE_KEYS = ["primary", "primaryDeep", "background", "parchment", "accent", "gold"] as const;
const FONT_KEYS = ["fontDisplay", "fontBody"] as const;
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const cssVarName = (k: string) => `--c-${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;

export default function App() {
  const [shared] = useState(() => readHash());
  const [vars, setVars] = useStoredState<PromptVars>("pt.vars", shared?.vars ?? defaultVars, Boolean(shared));
  const [config, setConfig] = useStoredState<PromptConfig>("pt.config", shared?.config ?? defaultConfig, Boolean(shared));
  const [mobilePane, setMobilePane] = useState<"config" | "prompt">("prompt");
  const [focus, setFocus] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(shared ? null : "rashidah");
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const root = document.documentElement.style;
    for (const k of PALETTE_KEYS) if (HEX.test(vars[k])) root.setProperty(cssVarName(k), vars[k]);
    for (const k of FONT_KEYS) {
      if (vars[k].trim()) root.setProperty(`--f-${k === "fontDisplay" ? "display" : "body"}`, `"${vars[k].trim()}"`);
    }
  }, [vars]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      history.replaceState(null, "", `#p=${encodeState(vars, config)}`);
    }, 600);
    return () => window.clearTimeout(timer);
  }, [vars, config]);

  const prompt = useMemo(() => buildMasterPrompt(vars, config), [vars, config]);
  const issues = useMemo(() => validate(vars, config), [vars, config]);
  const errorCount = issues.filter((i) => i.level === "error").length;

  const loadPreset = useCallback(
    (p: Preset) => {
      const next = applyPreset(p);
      setVars(next.vars);
      setConfig(next.config);
      setActivePreset(p.id);
    },
    [setConfig, setVars],
  );

  const resetAll = useCallback(() => {
    setVars(defaultVars);
    setConfig(defaultConfig);
    setActivePreset("rashidah");
  }, [setConfig, setVars]);

  const copyLink = useCallback(async () => {
    const url = `${location.origin}${location.pathname}#p=${encodeState(vars, config)}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      history.replaceState(null, "", url);
    }
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1800);
  }, [config, vars]);

  return (
    <div className="flex h-dvh flex-col bg-ivory text-ink">
      <header className="grain relative shrink-0 overflow-hidden bg-ink px-4 py-3.5 text-ivory sm:px-6">
        <div className="relative flex items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-ivory/10 font-display text-base">
            {vars.shortName.charAt(0).toUpperCase() || "P"}
          </span>
          <div className="min-w-0">
            <h1 className="flex items-center gap-1.5 font-display text-[17px] leading-tight">
              Prompt Studio
              <Sparkles size={13} className="text-gold" />
            </h1>
            <p className="truncate text-[11px] text-ivory/60">
              {vars.name} — {vars.role}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {errorCount > 0 ? (
              <span className="hidden rounded-full bg-clay/25 px-2.5 py-1 text-[10.5px] font-bold text-[#f0b48c] sm:block">
                {errorCount} field{errorCount === 1 ? "" : "s"} to fix
              </span>
            ) : null}
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-1.5 rounded-full border border-ivory/20 px-3 py-1.5 text-[11.5px] font-semibold text-ivory/85 transition-colors hover:border-gold/50"
              title="Copy a link that restores this exact build"
            >
              {linkCopied ? <Check size={13} strokeWidth={3} /> : <Link2 size={13} />}
              <span className="hidden sm:inline">{linkCopied ? "Link copied" : "Share build"}</span>
            </button>
            <button
              type="button"
              onClick={() => setFocus((f) => !f)}
              className="flex items-center gap-1.5 rounded-full border border-ivory/20 px-3 py-1.5 text-[11.5px] font-semibold text-ivory/85 transition-colors hover:border-gold/50"
              title="Focus mode — hide the settings panel"
              aria-pressed={focus}
            >
              {focus ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
              <span className="hidden sm:inline">{focus ? "Exit focus" : "Focus"}</span>
            </button>
            <a
              href={`mailto:${vars.email}`}
              className="hidden rounded-full border border-ivory/20 px-3.5 py-1.5 text-[11.5px] font-semibold text-ivory/85 transition-colors hover:border-gold/50 xl:block"
            >
              {vars.email}
            </a>
          </div>
        </div>
      </header>

      <div className="flex shrink-0 items-center gap-1 border-b border-hair bg-ivory px-3 py-2 lg:hidden">
        {(
          [
            ["prompt", "Prompt"],
            ["config", `Configure${errorCount ? ` · ${errorCount}` : ""}`],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setMobilePane(id)}
            className={`flex-1 rounded-full px-3 py-2 text-[12px] font-bold transition-colors ${
              mobilePane === id ? "bg-forest text-ivory" : "text-muted"
            }`}
          >
            {id === "config" ? <SlidersHorizontal size={12} className="mr-1.5 inline" /> : null}
            {label}
          </button>
        ))}
      </div>

      <main className="grid min-h-0 flex-1 lg:grid-cols-[minmax(340px,30rem)_1fr]">
        {focus ? null : (
          <aside
            className={`min-h-0 overflow-y-auto border-hair bg-ivory lg:block lg:border-r ${
              mobilePane === "config" ? "block" : "hidden"
            }`}
          >
            <ConfigPanel
              vars={vars}
              config={config}
              issues={issues}
              activePreset={activePreset}
              setVars={setVars}
              setConfig={setConfig}
              onPreset={loadPreset}
              onReset={resetAll}
            />
          </aside>
        )}

        <section className={`min-h-0 lg:block lg:h-full ${mobilePane === "prompt" ? "block" : "hidden"}`}>
          <PromptPane vars={vars} config={config} prompt={prompt} />
        </section>
      </main>
    </div>
  );
}
