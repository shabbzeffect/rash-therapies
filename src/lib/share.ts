import { defaultConfig, defaultVars, type PromptConfig, type PromptVars } from "./promptBuilder";

export interface RestoredState {
  vars: PromptVars;
  config: PromptConfig;
}

type Wire = { v?: Partial<PromptVars>; c?: Partial<PromptConfig> };

const toBase64Url = (s: string) => {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromBase64Url = (s: string) => {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "=".repeat((4 - (s.length % 4)) % 4);
  const bin = atob(b64);
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

export function encodeState(vars: PromptVars, config: PromptConfig): string {
  return toBase64Url(JSON.stringify({ v: vars, c: config }));
}

export function decodeState(raw: string): RestoredState | null {
  try {
    const parsed = JSON.parse(fromBase64Url(raw)) as Wire;
    if (!parsed?.v || !parsed.c) return null;
    return {
      vars: { ...defaultVars, ...parsed.v },
      config: {
        ...defaultConfig,
        ...parsed.c,
        features: Array.isArray(parsed.c.features) ? parsed.c.features : defaultConfig.features,
      },
    };
  } catch {
    return null;
  }
}

export function shareUrl(vars: PromptVars, config: PromptConfig): string {
  return `${location.origin}${location.pathname}#p=${encodeState(vars, config)}`;
}

export function readHash(): RestoredState | null {
  const m = /[#&]p=([A-Za-z0-9_-]+)/.exec(location.hash);
  return m ? decodeState(m[1]) : null;
}
