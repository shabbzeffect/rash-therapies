# Prompt Studio

Single-page app that turns a practitioner profile + build settings into a "super-elite practice
website" master prompt for a coding model.

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # tsc -b && vite build
npm run lint    # oxlint
```

## Layout

- `src/lib/promptBuilder.ts` — the prompt engine: `PromptVars`, `PromptConfig`, `buildMasterPrompt`,
  `countWords`, `promptToSections`, plus the `DEPTHS` / `TONES` / `TECHS` / `ALL_FEATURES` option lists.
- `src/lib/hooks.ts` — localStorage-backed state, clipboard copy, markdown download.
- `src/components/ConfigPanel.tsx` — every input, grouped and wired to the two state objects.
- `src/components/PromptPane.tsx` — live word count vs. depth target, section tabs, copy / download.
- `src/components/BrandPreview.tsx` — mini hero rendered with the entered palette, fonts and copy.

Palette and font edits are written to CSS custom properties on `:root`, so the studio chrome itself
retints as you type.
