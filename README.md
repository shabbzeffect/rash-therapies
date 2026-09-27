# Rashidah K. Wangara — Counselling Psychologist

A single-page marketing and booking site for a licensed counselling psychologist in
Lavington, Nairobi. React 19 + Vite + Tailwind CSS v4 + Framer Motion + Lucide icons.
No photography assets required — the imagery is art-directed SVG (`ArtPlate`).

## Run

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # tsc -b && vite build
npm run lint    # oxlint
```

## Sections

Top bar · sticky nav · hero + marquee · featured strip · about · stats band · services ·
approach · speaking · testimonial slider · wellness circle + journal · fees + FAQ ·
booking engine · footer.

## Layout

- `src/data/site.ts` — all copy and content in one typed module. Edit here first.
- `src/components/primitives.tsx` — `Reveal`, `SectionHead`, `PillButton`, `Counter`,
  `Stars`, `Eyebrow`. Shared motion and layout.
- `src/components/ArtPlate.tsx` — art-directed SVG artwork: `portrait`, `room`, `stage`,
  `circle`, `detail`, `journal`. Swap for real photography by replacing the component body
  with an `<img>`; `role="img"` + `aria-label` already cover accessibility.
- `src/lib/toast.ts` — tiny pub/sub toast bus used by the newsletter and booking forms.
- `src/index.css` — design tokens (`@theme inline`), `.grain`, `.arch-top`, `.rule`,
  marquee/float/pulse keyframes, reduced-motion guard.

## Design tokens

| Token | Value | Use |
| --- | --- | --- |
| `ink` | `#11211C` | Body text, deep bands |
| `forest` | `#18312A` | Nav, primary buttons, dark bands |
| `night` | `#0E1B17` | Top bar, footer, near-black |
| `ivory` | `#FAF7F1` | Page background |
| `parchment` | `#F2ECDF` | Alternating sections |
| `sand` | `#E7DDC9` | Rules, decorative numerals |
| `clay` | `#C27A4A` | Secondary CTA, accents |
| `gold` | `#C6A664` | Stars, dividers, premium details |
| `sage` / `sage-deep` | `#8AA99A` / `#5F7F71` | Badges, icons, success |

Type: **Fraunces** (display serif, 300 weight + italic accents) and **Manrope** (body sans).

## Booking

Three validated steps — service and mode, date and time, then details. Dates are generated
from today, skipping Sundays and Mondays to match practice hours. On success a reference
code `RKW-XXXXX` is generated and can be copied. Nothing is charged; no backend is wired,
so `submit` in `Booking.tsx` is the seam where an API call goes.

## Accessibility

Skip link, one `h1`, landmark elements, `aria-expanded` on the accordion and mobile menu,
`aria-live` on the slider and toaster, visible focus rings, 4.5:1 contrast, keyboard-
operable controls, and a `prefers-reduced-motion` guard on every animation.
