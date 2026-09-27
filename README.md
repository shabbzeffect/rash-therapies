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
npm run deploy  # build + publish to Vercel production
```

## Deploy

Live at **https://rash-therapies.vercel.app** (project `justshabirs-projects/rash-therapies`).

```bash
$env:VERCEL_TOKEN = "<your token>"   # or run `npx vercel login` once
npm run deploy
```

`npm run deploy` runs `scripts/deploy.mjs`, which builds with Vite, assembles
`.vercel/output` per the [Build Output API](https://vercel.com/docs/build-output-api-v3), then
uploads it with `vercel deploy --prebuilt --prod`. No build runs on either side.

**Why prebuilt?** Plain `vercel build` / `vercel --prod` fails in this environment with
`spawn cmd.exe ENOENT`. The cause is that Node here cannot spawn `.cmd` shims with
`shell: false` — the Vercel CLI's build step hits it even though its `npm ci` install step
succeeds. Reproducible in both the project directory and a space-free copy of it, and
independent of authentication. Going prebuilt sidesteps it entirely.

If you deploy from a machine where the CLI can spawn normally, `npx vercel --prod` will work
as usual and you can ignore this script. `vercel.json` pins the framework, build command,
output directory and install command for that case.

Prefer no CLI at all? Import the GitHub repo at
`vercel.com/new` and Vercel will build `main` on its own infrastructure.

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

## Configuration

All optional. Create a `.env.local` (gitignored) to enable them.

| Variable | Effect |
| --- | --- |
| `VITE_BOOKING_ENDPOINT` | Where the booking form POSTs JSON. Any endpoint that accepts a body works — Formspree (`https://formspree.io/f/<id>`), Resend, a Cloudflare Worker, your own API. **Unset by default**, and the form then opens a pre-filled email instead, so it degrades rather than breaking. |
| `VITE_ANALYTICS_SRC` | Cookieless analytics script URL, e.g. `https://plausible.io/js/script.js`. Unset by default, so a stock build ships **zero** third-party code. |
| `VITE_ANALYTICS_DOMAIN` | Passed to the script as `data-domain`. |

### Booking flow

`src/lib/booking.ts` owns delivery. The form always validates first, then either POSTs
`BookingRequest` to `VITE_BOOKING_ENDPOINT` or falls back to a `mailto:` link carrying the
same details. Either way the visitor gets the `RKW-XXXXX` reference. A hidden `company`
honeypot field silences bots without a captcha. Non-2xx responses and network failures
surface an inline error with a WhatsApp fallback rather than a false success.

### Photography

There are no photo assets. The imagery is art-directed SVG (`ArtPlate`) in six variants. To
use real photographs, drop files into `public/images/` and set the paths in `art` in
`src/data/site.ts`:

```ts
export const art = {
  portrait: "/images/portrait.jpg",  // 4:5, ~1600px wide
  room:     "/images/room.jpg",      // 5:6
  stage:    "/images/stage.jpg",     // 4:5
  circle:   "/images/circle.jpg",    // 4:5
  detail:   "/images/detail.jpg",    // 4:3
  journal:  "/images/journal.jpg",   // 4:3
};
```

`ArtPlate` switches to a lazy-loaded `<img>` automatically; the hero portrait is `eager` and
everything else lazy, as a real photo set should be. Nothing else needs editing.

## Accessibility

Skip link, one `h1`, landmark elements, `aria-expanded` on the accordion and mobile menu,
`aria-live` on the slider and toaster, visible focus rings, 4.5:1 contrast, keyboard-
operable controls, and a `prefers-reduced-motion` guard on every animation.
