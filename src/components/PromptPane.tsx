import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Download, FileText, Search } from "lucide-react";
import {
  ALL_FEATURES,
  DEPTHS,
  countWords,
  promptToSections,
  type PromptConfig,
  type PromptVars,
} from "../lib/promptBuilder";
import { downloadText, useCopy } from "../lib/hooks";

const TARGETS: Record<PromptConfig["depth"], number> = {
  essential: 1600,
  signature: 2000,
  ultra: 2300,
};

const ALL = "__all__";
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const slug = (s: string) =>
  (s || "practice")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function PromptPane({ vars, config, prompt }: { vars: PromptVars; config: PromptConfig; prompt: string }) {
  const [tabState, setTabState] = useState({ for: "", value: ALL });
  const tab = tabState.for === prompt ? tabState.value : ALL;
  const setTab = useCallback((value: string) => setTabState({ for: prompt, value }), [prompt]);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { copied, copy } = useCopy();

  const sections = useMemo(() => promptToSections(prompt), [prompt]);
  const words = useMemo(() => countWords(prompt), [prompt]);
  const target = TARGETS[config.depth];
  const pct = Math.min(100, Math.round((words / target) * 100));
  const depth = DEPTHS.find((d) => d.id === config.depth)!;

  const active = tab === ALL ? { title: "Full master prompt", body: prompt } : sections.find((s) => s.title === tab);
  const body = active?.body ?? "";
  const needle = query.trim();
  const hitCount = needle ? body.split(new RegExp(`(${esc(needle)})`, "gi")).length - 1 : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        void copy(prompt, "full");
        return;
      }
      if (e.key === "Escape" && needle) {
        setQuery("");
        return;
      }
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (/^[1-9]$/.test(e.key)) {
        const s = sections[Number(e.key) - 1];
        if (s) {
          setTab(s.title);
          scrollRef.current?.scrollTo({ top: 0 });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy, needle, prompt, sections, setTab]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-parchment/50">
      <div className="border-b border-hair bg-ivory px-4 py-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl leading-none text-ink">{words.toLocaleString()}</span>
            <span className="text-[11px] font-semibold text-muted">words</span>
          </div>
          <span className="rounded-full border border-hair bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
            {depth.label} · target {target.toLocaleString()}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
              pct >= 90 ? "bg-sagedeep/15 text-sagedeep" : "bg-clay/12 text-clay"
            }`}
          >
            {pct >= 90 ? "on target" : `${pct}% of target`}
          </span>
          <span className="text-[11px] text-muted">{sections.length} blueprint sections</span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => copy(prompt, "full")}
              className="flex items-center gap-1.5 rounded-full bg-forest px-3.5 py-2 text-[11.5px] font-bold text-ivory transition-opacity hover:opacity-90"
            >
              {copied === "full" ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
              {copied === "full" ? "Copied" : "Copy all"}
            </button>
            <button
              type="button"
              onClick={() => downloadText(`master-prompt-${slug(vars.name)}.md`, prompt)}
              className="flex items-center gap-1.5 rounded-full border border-hair bg-white px-3.5 py-2 text-[11.5px] font-bold text-ink transition-colors hover:border-forest/30"
              title="Download as Markdown"
            >
              <Download size={13} />
              .md
            </button>
          </div>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-forest/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--c-gold)" }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 24 }}
          />
        </div>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-ink/40">In this build</span>
          {ALL_FEATURES.filter((f) => config.features.includes(f.id)).map((f) => (
            <span
              key={f.id}
              title={f.desc}
              className="rounded-full border border-sagedeep/25 bg-sagedeep/[0.08] px-2 py-0.5 text-[10px] font-bold text-sagedeep"
            >
              {f.label}
            </span>
          ))}
          {config.features.length === 0 ? (
            <span className="rounded-full border border-clay/30 bg-clay/[0.08] px-2 py-0.5 text-[10px] font-bold text-clay">
              Contact CTA only
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-b border-hair bg-ivory px-4 py-2.5 sm:px-6">
        <div className="flex gap-1.5 overflow-x-auto">
          <Tab active={tab === ALL} onClick={() => setTab(ALL)}>
            Full
          </Tab>
          {sections.map((s, i) => (
            <Tab key={s.title} active={tab === s.title} onClick={() => setTab(s.title)}>
              <span className="mr-1 text-[9px] opacity-50">{i + 1}</span>
              {s.title.replace(/^\d+\)\s*/, "")}
            </Tab>
          ))}
        </div>
        <div className="relative ml-auto w-full min-w-40 sm:w-56">
          <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search  /"
            aria-label="Search prompt"
            className="field !py-1.5 !pl-8 !pr-14"
          />
          {needle ? (
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted">
              {hitCount} hit{hitCount === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab !== ALL ? (
              <div className="mb-4 flex items-center gap-2">
                <FileText size={14} className="text-muted" />
                <h2 className="font-display text-lg text-ink">{active?.title}</h2>
                <span className="text-[11px] text-muted">{countWords(body).toLocaleString()} words</span>
                <button
                  type="button"
                  onClick={() => copy(body, "section")}
                  className="ml-auto flex items-center gap-1.5 rounded-full border border-hair bg-white px-3 py-1.5 text-[11px] font-bold text-ink transition-colors hover:border-forest/30"
                >
                  {copied === "section" ? <Check size={12} strokeWidth={3} /> : <Copy size={12} />}
                  {copied === "section" ? "Copied" : "Copy section"}
                </button>
              </div>
            ) : null}
            <div className="prompt-body font-body text-[12.5px] leading-[1.75] text-ink/90">
              {needle ? <Highlighted text={body} needle={needle} /> : body}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Highlighted({ text, needle }: { text: string; needle: string }) {
  const parts = text.split(new RegExp(`(${esc(needle)})`, "gi"));
  return (
    <>
      {parts.map((p, i) =>
        p.toLowerCase() === needle.toLowerCase() ? (
          <mark key={i}>{p}</mark>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-[11.5px] font-bold transition-colors ${
        active ? "bg-forest text-ivory" : "border border-hair bg-white text-muted hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}
