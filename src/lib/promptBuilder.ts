export interface PromptVars {
  name: string;
  shortName: string;
  role: string;
  credentials: string;
  location: string;
  serviceArea: string;
  tagline: string;
  tagline2: string;
  tagline3: string;
  years: string;
  clients: string;
  workshops: string;
  rating: string;
  reviews: string;
  email: string;
  phone: string;
  whatsapp: string;
  hours: string;
  primary: string;
  primaryDeep: string;
  background: string;
  parchment: string;
  accent: string;
  gold: string;
  fontDisplay: string;
  fontBody: string;
}

export type PromptDepth = "essential" | "signature" | "ultra";
export type PromptTone = "warm-luxury" | "editorial-bold" | "soft-minimal" | "clinical-trust";
export type TechStack = "react-vite-tailwind" | "nextjs-tailwind" | "html-tailwind";

export interface PromptConfig {
  depth: PromptDepth;
  tone: PromptTone;
  tech: TechStack;
  features: string[];
}

export const defaultVars: PromptVars = {
  name: "Rashidah K. Wangara",
  shortName: "Rashidah",
  role: "Counselling Psychologist & Mental Wellness Advocate",
  credentials: "M.A. Counselling Psychology, Licensed Counselling Psychologist",
  location: "Lavington, Nairobi",
  serviceArea: "in-person in Lavington, Nairobi & online worldwide",
  tagline: "Come home to yourself.",
  tagline2: "Healing is not linear. You don't have to walk it alone.",
  tagline3: "Where science meets soul.",
  years: "12+",
  clients: "2,400+",
  workshops: "180+",
  rating: "4.9/5",
  reviews: "480+",
  email: "hello@rashidahwangara.co.ke",
  phone: "+254 722 000 000",
  whatsapp: "254722000000",
  hours: "Tue–Sat • 8:00am – 6:00pm EAT",
  primary: "#18312A",
  primaryDeep: "#11211C",
  background: "#FAF7F1",
  parchment: "#F2ECDF",
  accent: "#C27A4A",
  gold: "#C6A664",
  fontDisplay: "Fraunces",
  fontBody: "Manrope",
};

export const defaultConfig: PromptConfig = {
  depth: "signature",
  tone: "warm-luxury",
  tech: "react-vite-tailwind",
  features: ["booking", "speaking", "testimonials", "journal", "faq", "newsletter", "whatsapp", "animations"],
};

export const ALL_FEATURES = [
  { id: "booking", label: "Booking engine", desc: "3-step date/time/details + ref code" },
  { id: "speaking", label: "Speaking kit", desc: "Topics, clients, invite CTA" },
  { id: "testimonials", label: "Testimonials", desc: "Slider with ethics note" },
  { id: "journal", label: "Journal / blog", desc: "3 insights cards" },
  { id: "faq", label: "Fees + FAQ", desc: "Pricing + 8 accordions" },
  { id: "newsletter", label: "Wellness Circle", desc: "Newsletter + free toolkit" },
  { id: "whatsapp", label: "WhatsApp + crisis", desc: "Float + Red Cross 1199" },
  { id: "animations", label: "Elite motion", desc: "Reveals, counters, marquee" },
];

export const DEPTHS: { id: PromptDepth; label: string; desc: string; badge: string }[] = [
  { id: "essential", label: "Essential", desc: "Lean blueprint, terse copy deck. Fastest build, landing-page focus.", badge: "~1.6k" },
  { id: "signature", label: "Signature", desc: "Full practice site with complete copy deck. Recommended.", badge: "~2.0k" },
  { id: "ultra", label: "Ultra-Elite", desc: "Adds spacing rules, file map, state model + 9-point QA. Awwwards-level.", badge: "~2.3k" },
];

export const TONES: { id: PromptTone; label: string; desc: string }[] = [
  { id: "warm-luxury", label: "Warm Luxury", desc: "Sage + caregiver, quiet luxury, sisterly" },
  { id: "editorial-bold", label: "Editorial Bold", desc: "Magazine confidence, bigger type, bolder claims" },
  { id: "soft-minimal", label: "Soft Minimal", desc: "Extra calm, airy, fewer words, more white space" },
  { id: "clinical-trust", label: "Clinical Trust", desc: "More credentials, evidence-forward, hospital-grade" },
];

export const TECHS: { id: TechStack; label: string; desc: string }[] = [
  { id: "react-vite-tailwind", label: "React + Vite + Tailwind", desc: "Components, Framer Motion, Lucide" },
  { id: "nextjs-tailwind", label: "Next.js + Tailwind", desc: "App router, SEO-first, same design" },
  { id: "html-tailwind", label: "HTML + Tailwind CDN", desc: "Single file, vanilla JS, no build" },
];

const toneLine: Record<PromptTone, string> = {
  "warm-luxury": "Warm Luxury: sage + caregiver archetype. Sisterly warmth, poetic restraint, quiet luxury. Never clinical, never hype.",
  "editorial-bold": "Editorial Bold: confident magazine voice. Bigger claims, sharper headlines, still kind. Think cover-story energy.",
  "soft-minimal": "Soft Minimal: extra calm and airy. Shorter sentences, more whitespace, whisper not shout. Fewer sections, deeper breaths.",
  "clinical-trust": "Clinical Trust: evidence-forward and reassuring. Lead with credentials, modalities, ethics, outcomes. Still human, never cold.",
};

const techLine: Record<TechStack, string> = {
  "react-vite-tailwind": "STACK: React 19 + Vite + Tailwind CSS v4 + Framer Motion for reveals + Lucide icons only (zero emojis). Mobile-first, components in src/components/, tokens in index.css, data in src/data/site.ts.",
  "nextjs-tailwind": "STACK: Next.js 14 App Router + Tailwind CSS + Framer Motion + Lucide icons only. Server components where static, client components for booking/slider/accordion. Same design tokens and sections.",
  "html-tailwind": "STACK: Single HTML file + Tailwind CDN + vanilla JS + Lucide via CDN. No build step. All sections in one page with <section> anchors, JS for menu/slider/accordion/booking/toast.",
};

export function buildMasterPrompt(v: PromptVars, c: PromptConfig): string {
  const has = (f: string) => c.features.includes(f);
  const isUltra = c.depth === "ultra";
  const isEssential = c.depth === "essential";

  const featuresLine = c.features.length
    ? `INCLUDE THESE SYSTEMS: ${c.features.join(", ")}. ${!has("booking") ? "Omit booking widget; replace with simple contact CTA." : ""}`
    : "Build a streamlined marketing site with contact CTA only.";

  const archSections: string[] = [];
  const push = (full: string, lean: string) => archSections.push(isEssential ? lean : full);
  push(
    `0) TOP BAR (dark ${v.primaryDeep}): "Now welcoming new clients — ${v.serviceArea}" + anchor "Reserve your space → #book".`,
    `0) TOP BAR (dark ${v.primaryDeep}): "Now welcoming new clients — ${v.serviceArea}" + "Reserve your space → #book".`,
  );
  push(
    `1) NAVBAR sticky + blur: monogram ${v.shortName[0]} in forest circle, "${v.name} — Psychologist • Wellness Advocate". Links: About, Services, Approach${has("speaking") ? ", Speaking" : ""}${has("testimonials") ? ", Stories" : ""}${has("journal") ? ", Journal" : ""}${has("faq") ? ", FAQ" : ""}. Right: ${v.phone} + pill "Book Session → #book". Mobile hamburger with slide-down.`,
    `1) NAVBAR sticky + blur: monogram ${v.shortName[0]} in forest circle, "${v.name} — Psychologist • Wellness Advocate". Links: About, Services, Approach${has("speaking") ? ", Speaking" : ""}${has("faq") ? ", FAQ" : ""}. Right: ${v.phone} + pill "Book Session → #book". Hamburger menu on mobile.`,
  );
  push(
    `2) HERO (bg ${v.background}): LEFT — eyebrow pill "Licensed • ${v.location} + Online" with pulsing dot; H1 "${v.tagline}" (second line italic serif); intro naming ${v.shortName}, listing anxiety / burnout / trauma / grief, ending "with science, soul, zero judgment"; dual CTA [Book free discovery call → #book] [Explore therapy → #services]; trust row: overlapping initial avatars + 5 gold stars + "${v.rating} from ${v.reviews} reviews" + "${v.years} yrs" + "${v.clients} lives". RIGHT — portrait in tall arch (rounded-t-[999px], gold ring offset border), floating glass cards "Confidential & safe" and "Next opening Thu 10:30 AM EAT — Claim this slot". Soft sage/sand blobs behind. BELOW — dark marquee: Anxiety & Overwhelm • Burnout Recovery • Trauma Healing • Couples Therapy • Grief & Loss • Self-Esteem • Teens 16+ • Corporate Wellness.`,
    `2) HERO (bg ${v.background}): eyebrow pill "Licensed • ${v.location} + Online"; H1 "${v.tagline}"; short intro naming ${v.shortName} + anxiety / burnout / trauma / grief; dual CTA [Book free discovery call → #book] [Explore therapy → #services]; trust row "${v.rating} from ${v.reviews} reviews" + "${v.years} yrs" + "${v.clients} lives". Arch portrait right, floating "Confidential & safe" card. Dark marquee below: Anxiety • Burnout • Trauma • Couples • Grief • Self-Esteem • Teens 16+.`,
  );
  push(
    `3) FEATURED STRIP: "As featured in" + TEDx Nairobi, NTV Kenya, Capital FM, Mindful Africa, Parents Magazine in muted serif italic.`,
    `3) FEATURED STRIP: "As featured in" + TEDx Nairobi, NTV Kenya, Capital FM, Mindful Africa, Parents Magazine.`,
  );
  push(
    `4) ABOUT: left therapy-room image + overlapping journal/tea image + "${v.years} Years of practice" badge; right eyebrow "Meet your psychologist", H2 "Warm like a sister. Sharp like a scientist.", two paragraphs (${v.years} with executives, mums, students, couples, diaspora London–Doha; CBT/ACT/trauma-informed/Gottman; faith + culture honoured), 4 credential cards (${v.credentials}; Trauma CBT•ACT•EFT / Gottman-Informed; KCPA & PAPU / MHFA Instructor; TEDx & Nation / ${v.workshops} workshops), pull-quote "You don't have to earn rest..." + signature. Below: 3 pillars — Science not guesswork / Culture & faith honoured / Softness as strategy.`,
    `4) ABOUT: image left with "${v.years} Years of practice" badge; right H2 "Warm like a sister. Sharp like a scientist." + 2 paragraphs (${v.years} with executives, mums, students, couples, diaspora; CBT/ACT/trauma-informed/Gottman; faith + culture honoured) + credential strip (${v.credentials} • ${v.workshops} workshops) + pull-quote "You don't have to earn rest..."`,
  );
  push(
    `5) STATS BAND (dark ${v.primaryDeep} + grain): heading "Quiet work. Loud transformations." + 4 animated counters: ${v.years} Years, ${v.clients} Clients held, ${v.workshops} Talks & workshops, ${v.rating} Average rating. Counters ease-out 1.6s, animate once on view.`,
    `5) STATS BAND (dark ${v.primaryDeep}): "Quiet work. Loud transformations." + counters ${v.years} Years / ${v.clients} Clients held / ${v.workshops} Talks / ${v.rating} Rating.`,
  );
  push(
    `6) SERVICES (6 cards, hover lift): Individual Therapy KES 6,500/50min "Most booked"; Trauma & Healing KES 7,000/50–60min; Couples & Relationships KES 9,500/75min; Teens & Young Adults 16+ KES 5,500/45min; Grief & Life Transitions KES 6,500; Workplace & Wellness Talks Custom. Each: Lucide icon, 2-line desc, 3 bullets, duration + price row, "Book → #book". Below: dark reassurance banner "Not sure where you fit? Start with free call".`,
    `6) SERVICES (6 cards): Individual Therapy KES 6,500/50min "Most booked"; Trauma & Healing KES 7,000; Couples KES 9,500/75min; Teens 16+ KES 5,500/45min; Grief & Life Transitions KES 6,500; Workplace Talks Custom. Icon + 2-line desc + 3 bullets + price row + "Book → #book". Dark banner: "Not sure where you fit? Start with free call".`,
  );
  push(
    `7) APPROACH (bg ${v.parchment}): left "A process that feels safe from day one" + 4 numbered steps with connecting line (01 Warm welcome Free 15-min / 02 Deep listening & mapping / 03 Healing work 50-min weekly / 04 Growth & graduation) + modality pills CBT, ACT, Trauma-Informed, Mindfulness, Narrative, Gottman-Informed, Faith-Integrated opt-in. Right community image + dark quote card "…never broken."`,
    `7) APPROACH (bg ${v.parchment}): "A process that feels safe from day one" + 4 steps (01 Warm welcome / 02 Deep listening & mapping / 03 Healing work weekly / 04 Growth & graduation) + modality pills CBT, ACT, Trauma-Informed, Mindfulness, Gottman-Informed, Faith-Integrated. Dark quote card "…never broken."`,
  );
  if (has("speaking")) push(
    `8) SPEAKING & ADVOCACY (dark editorial): left stage image + floating "TEDx • Nation • Capital FM" badge; right "Bringing mental wellness to the stage", 4 topic cards (Burnout to Balance / African Woman & Mental Load / Raising Emotionally Well Teens / Faith & Therapy), CTAs [Invite ${v.shortName} to speak → #contact] [Corporate wellness PDF], client line Safaricom • KCB • UN • Strathmore • Daystar.`,
    `8) SPEAKING (dark): stage image + "TEDx • Nation • Capital FM" badge; "Bringing mental wellness to the stage" + 4 topic cards (Burnout to Balance / African Woman & Mental Load / Raising Emotionally Well Teens / Faith & Therapy) + CTAs [Invite ${v.shortName} to speak → #contact] [Corporate wellness PDF].`,
  );
  if (has("testimonials")) push(
    `9) TESTIMONIALS slider (auto 7s + arrows + dots): 5 Kenyan stories — Wanjiku M. Marketing Director ("…sleep through the night"); Daniel O. Founder ("…wise elder sister"); Amina & Brian Couples ("…laughing again"); Faith N. Teacher ("…tenderness"); HR Lead Fintech ("…wellness scores up"). 5 gold stars each. Ethics note: "Shared with permission, names changed."`,
    `9) TESTIMONIALS slider (auto 7s + arrows + dots): 5 Kenyan stories — Wanjiku M. ("…sleep through the night"); Daniel O. ("…wise elder sister"); Amina & Brian ("…laughing again"); Faith N. ("…tenderness"); HR Lead Fintech ("…wellness scores up"). Ethics note: "Shared with permission, names changed."`,
  );
  if (has("newsletter") || has("journal")) {
    const n = isEssential
      ? `LEFT dark card "A soft landing in your inbox, every Sunday evening", email input + Join free, success toast. `
      : `LEFT dark card "A soft landing in your inbox, every Sunday evening", 12,000+ readers, email input + Join free, success toast "Karibu to the Circle! Check your inbox for the Grounding Toolkit.", themes Oct Rest without guilt / Nov Boundaries with love / Dec Grief & gratitude. `;
    const j = isEssential
      ? `RIGHT 3 article cards (image, category, read time): High-functioning anxiety / Strong African daughter & burnout / How to fight fair.`
      : `RIGHT 3 article cards with image/category/read-time: High-functioning anxiety 6min / Strong African daughter & burnout 8min / How to fight fair 5min.`;
    archSections.push(`10) WELLNESS CIRCLE + JOURNAL (bg ${v.parchment}, 2-col): ${has("newsletter") ? n : ""}${has("journal") ? j : ""}`.trimEnd());
  }
  if (has("faq")) push(
    `11) FEES + FAQ (2-col): LEFT "Clear pricing, no surprises" + 3 fee cards (Discovery Free; Individual KES 6,500 dark-highlighted ≈$50, students KES 5,000; Couples KES 9,500 ≈$73) + ethics box (KCPA ethics, M-Pesa/bank/cards, receipts). RIGHT accordion 8 Qs: Do I need therapy? / First session? / Is online effective? / Confidential? / Faith? / How long? / What if I cry? / Cancellation 24h 50%? — warm 2–3 sentence answers each.`,
    `11) FEES + FAQ (2-col): LEFT "Clear pricing, no surprises" + fee cards (Discovery Free; Individual KES 6,500 ≈$50, students KES 5,000; Couples KES 9,500 ≈$73) + ethics box (KCPA ethics, M-Pesa/bank/cards). RIGHT accordion: Do I need therapy? / First session? / Is online effective? / Confidential? / Faith? / How long? / Cancellation 24h 50%? — warm 2–3 sentence answers.`,
  );
  if (has("booking")) push(
    `12) BOOKING (${v.primary} dark, 2-col): LEFT "Booking that feels like a deep breath" + reassurance + info rows (Online worldwide / ${v.location} ${v.hours} / Tue–Sat 8am–6pm EAT) + crisis box Red Cross 1199 / Befrienders 0722 178 177. RIGHT ivory 3-step widget with progress bar: Step1 service (6 options) + mode Online/In-person → Step2 date (next 10 weekdays, skip Sundays) + time 09:00/10:30/12:00/14:00/15:30/17:00 → Step3 name/email/notes + live summary → Success "Asante, {name}. Your space is held." + ref RKW-XXXXX + Copy ref + Book another. Validate all; email regex; no payment today; microcopy "Judgment-free. Confidential. At your pace."`,
    `12) BOOKING (${v.primary} dark, 2-col): LEFT "Booking that feels like a deep breath" + info rows (Online worldwide / ${v.location} ${v.hours}) + crisis box Red Cross 1199 / Befrienders 0722 178 177. RIGHT ivory 3-step widget: Step1 service + mode → Step2 date (10 weekdays) + time → Step3 name/email/notes → Success "Asante, {name}. Your space is held." + ref RKW-XXXXX + Copy ref. Validate all; email regex; no payment today.`,
  );
  else archSections.push(`12) CONTACT CTA: calm booking invitation with ${v.email}, ${v.phone}, WhatsApp https://wa.me/${v.whatsapp}, ${v.location}, ${v.hours}.`);
  push(
    `13) FOOTER/CONTACT (near-black #0E1B17, 4 cols): brand + ${v.email} + ${v.phone} + ${v.location} + ${v.hours}; Explore links; Support links; WhatsApp card https://wa.me/${v.whatsapp} + crisis box. Bottom: © 2026 ${v.name} • Licensed • Confidential • KCPA ethics.`,
    `13) FOOTER (near-black #0E1B17, 4 cols): brand + ${v.email} + ${v.phone} + ${v.location} + ${v.hours}; Explore; Support; WhatsApp https://wa.me/${v.whatsapp} + crisis box. Bottom: © 2026 ${v.name} • Licensed • Confidential • KCPA ethics.`,
  );
  if (has("whatsapp")) push(
    `14) FLOATING + TOASTS: WhatsApp circular button + back-to-top bottom-right; toast system for newsletter/booking/copy feedback.`,
    `14) FLOATING: WhatsApp circular button + back-to-top; toast system for newsletter/booking/copy feedback.`,
  );
  if (has("animations")) push(
    `MOTION LAYER: scroll reveals (y 28px, 0.7s, ease [0.22,1,0.36,1]), floating badges 5–6s, marquee 32s linear, accordion height animation, counters rAF. Respect prefers-reduced-motion.`,
    `MOTION LAYER: scroll reveals (y 28px, 0.7s), marquee 32s linear, counters rAF. Respect prefers-reduced-motion.`,
  );

  const archBlock = archSections.join("\n");

  const designExtra = isUltra
    ? `\nSPACING & SHAPE: page rhythm py-24 lg:py-32; container max-w-7xl px-4 sm:px-6; cards rounded-[22–28px]; buttons rounded-full px-7 py-4; arch portrait rounded-t-[999px] rounded-b-[28px]; 1px borders rgba(24,49,42,.1); shadows 0_24px_60px rgba(17,33,28,.12) on hover with -translate-y-1.5.\nSHADOWS: card rest none/border only; hover large soft; dark bands use grain overlay (SVG turbulence 0.06 opacity).\nICONOGRAPHY: Lucide outline 1.8px, 20–24px, in sage-tinted circle; never emojis, never clip-art.\nIMAGERY DIRECTION: warm daylight, beige/sage palette, authentic Kenyan dignity. 1) Portrait: confident African woman late-30s, cream blazer, low bun, gold studs, warm smile, beige studio, shallow depth. 2) Therapy room: boucle cream chairs, travertine table, eucalyptus, arched window sheer, sage wall. 3) Stage: Black woman cream suit, mic, blurred audience, warm spotlight. 4) Circle: diverse women journaling on cushions, plants, daylight. 5) Detail: journal + tea on linen, morning shadows. Alt text for all; hero eager, rest lazy.`
    : `\nSHAPE: pill buttons, arch portrait (rounded-t-full), cards rounded-[22–28px], 1px borders, hover lift. Icons: Lucide only. Images: warm, authentic, dignified — portrait, therapy room, stage, circle, journal detail.`;

  const copyDeck = isEssential
    ? `COPY DECK (use verbatim, adapt minimally): H1 "${v.tagline}" / Sub "${v.tagline2}" / Signature "${v.tagline3}". CTAs: "Book a free discovery call", "Explore therapy", "Invite ${v.shortName} to speak", "Join free". Reassurance: "Judgment-free. Confidential. At your pace." Crisis: "Therapy is not crisis care. In crisis call Red Cross 1199 or Befrienders 0722 178 177."`
    : `COPY DECK (use/adapt — Kenyan English, "you" language, invitation not prescription):\n- H1: "${v.tagline}"\n- Hero intro: "I'm ${v.shortName} — ${v.role.toLowerCase()}. I help high-achieving adults, couples and teens untangle anxiety, burnout, trauma and grief — with science, soul, and zero judgment."\n- About H2: "Warm like a sister. Sharp like a scientist."\n- Stats H2: "Quiet work. Loud transformations."\n- Services H2: "Support for every season you're in"\n- Approach H2: "A process that feels safe from day one"\n- Speaking H2: "Bringing mental wellness to the stage"\n- Stories H2: "Lives that found their light again"\n- Circle H2: "A soft landing in your inbox, every Sunday evening"\n- Fees H2: "Clear pricing, no surprises"\n- Booking H2: "Booking that feels like a deep breath"\n- CTAs: "Book a free discovery call" / "Explore therapy" / "Start with free call" / "Invite ${v.shortName} to speak" / "Join free" / "Claim this slot"\n- Microcopy: "Judgment-free. Confidential. At your pace." / "No payment today." / "Shared with permission, names changed." / "You don't have to earn rest."\n- PRICES: Discovery Free • Individual KES 6,500 (~$50) • Trauma KES 7,000 • Couples KES 9,500 (~$73) • Teen KES 5,500 • Student KES 5,000.\n- CRISIS (always near booking/footer): "Therapy is not crisis care. If in crisis in Kenya, call Red Cross 1199 or Befrienders Kenya 0722 178 177."`;

  const techExtra = isUltra
    ? `\nSTATE: useState for menu, sliderIndex (setInterval 7s + manual + pause on hover), faqOpen (single), booking {step, service, mode, date, time, name, email, note, ref}, newsletterEmail, toast. Booking dates: generate next 14 days, skip Sundays, take 10; times ["09:00","10:30","12:00","14:00","15:30","17:00"]; ref = "RKW-" + 5 random A-Z0-9; validate service+date+time then name+email regex; success scrolls to widget; Copy ref via clipboard.\nFILES: App.tsx composition; components/Navbar,Hero,About,Stats,Services,Approach,Speaking,Stories,Circle,FeesFaq,Booking,Footer; data/site.ts; index.css tokens + .grain + .arch + marquee keyframes + float.`
    : `\nSTATE: menu, slider (auto 7s), faq index, booking {step/service/mode/date/time/name/email/ref}, newsletter, toast. Booking: next 10 weekdays + 6 times; validate; ref RKW-XXXXX.`;

  const qaExtra = isUltra
    ? `[ ] All sections in order, anchors smooth, mobile menu works, no horizontal scroll\n[ ] Booking end-to-end: validation errors, success screen, ref copy, no payment\n[ ] Slider autoplay + arrows + dots; FAQ single-open accordion; counters animate once\n[ ] Newsletter validates + toast; WhatsApp wa.me/${v.whatsapp}; tel: mailto: correct\n[ ] One H1 only; alts on images; aria-labels; focus-visible; contrast ≥4.5:1; reduced-motion respected\n[ ] Title "${v.name} — ${v.role}"; meta description with Nairobi + online + anxiety + trauma + corporate; OG tags\n[ ] No console errors; lazy images except hero; build passes\n[ ] Copy includes ${v.location}, online worldwide, KES+USD, crisis lines, confidentiality, faith-sensitive line\n[ ] Feels $15k+: spacing py-24/32, type scale, alignment, rhythm — proud to share on national TV`
    : `[ ] All sections present, anchors work, booking validates + success + ref, slider + FAQ + counters work, newsletter toast, WhatsApp correct, no errors, builds cleanly.`;

  return `# MASTER CODING-GPT PROMPT — SUPER-ELITE PRACTICE WEBSITE
For: ${v.name} — ${v.role}
${v.credentials} | ${v.location} | ${v.serviceArea}
Contact: ${v.email} • ${v.phone} • https://wa.me/${v.whatsapp} • ${v.hours}

---

## 1) ROLE & MISSION
You are a world-class senior product designer + front-end engineer (${c.tech}) + brand strategist + conversion copywriter. You ship Awwwards-calibre, production-ready, single-page marketing + booking websites. No templates. No lorem ipsum. No placeholders.

Build the complete website for **${v.name} — ${v.role}** (${v.credentials}), based in ${v.location}, working ${v.serviceArea}.

PERSONA: Licensed counselling psychologist, trauma-informed, culturally attuned, faith-sensitive. ${toneLine[c.tone]} Signature lines: "${v.tagline}" / "${v.tagline2}" / "${v.tagline3}"

MISSION: Make a high-achieving, anxious, burned-out or grieving visitor exhale within 5 seconds and think "she is the one."
PRIMARY CONVERSIONS: 1) Book a Free Discovery Call / Therapy Session 2) Enquire for Speaking, Workshops & Corporate Wellness 3) Join The Wellness Circle (newsletter).
QUALITY BAR: Must feel like a $15,000+ studio site. Editorial luxury wellness meets evidence-based psychology. Obsess over spacing, type scale, rhythm, alignment. End with calm CTA, never pressure.

${featuresLine}

---

## 2) BRAND VOICE & COPY RULES
VOICE: warm, grounded, wise, non-judgmental, hopeful, culturally attuned to Kenyan/African realities (pressure to be strong, superwoman script, faith, family, diaspora identity). "You" language. Short poetic lines. Invitation, not prescription. Never pathologize. Never diagnose in marketing copy. Never make medical claims.
${copyDeck}

---

## 3) AUDIENCES — DESIGN FOR ALL FIVE
1. Adults 24–45 with anxiety, burnout, grief, trauma, relationship strain. 2. High-achieving African women & diaspora (identity, motherhood, career). 3. Couples & families needing repair. 4. HR leaders, schools, NGOs, churches seeking speakers. 5. Skeptical first-timers — the FAQ "Do I really need therapy?" must reassure and normalize.

---

## 4) DESIGN SYSTEM — MANDATORY
AESTHETIC: Modern editorial luxury. Warm minimalism. Organic arches + soft curves. Generious whitespace. Fine lines. Subtle grain. Champagne hairlines. Calm, slow motion. No purple/blue gradients. No neon. No glassmorphism overload.
PALETTE:
- Deep Forest Primary ${v.primary} + Deep Ink ${v.primaryDeep} (nav, dark bands, footer, primary buttons)
- Warm Ivory BG ${v.background} (page), Parchment ${v.parchment} + Sand #E7DDC9 (alternates)
- Sage #8AA99A / Deep #5F7F71 (badges, icons, success), Clay ${v.accent} (secondary CTA, sparingly), Champagne Gold ${v.gold} / Light #E9DCC3 (stars, dividers, premium details)
- Ink text #11211C, Stone muted #6C746F
TYPOGRAPHY: Display ${v.fontDisplay} serif light 300 + italic accents, tight tracking; Hero 3.5–5.2rem, H2 2.5–3.4rem, one H1 only. Body ${v.fontBody} sans 400/600/700/800, 15–17px, lh 1.6–1.7. Eyebrows 11px uppercase tracking 0.18em with pulsing dot.
${designExtra}

---

## 5) SITE BLUEPRINT — BUILD IN THIS ORDER
${archBlock}

---

## 6) TECH & BUILD SPEC
${techLine[c.tech]}${techExtra}
RESPONSIVE: mobile-first; 1 col → md:2 → lg:3; sticky nav blur; smooth scroll; pt offset for fixed header; no horizontal overflow.
ACCESSIBILITY: semantic landmarks, one H1, hierarchical H2s, alt text, aria-labels on icon buttons, focus-visible rings, 4.5:1 contrast, keyboard-operable slider/accordion/booking, prefers-reduced-motion.
SEO: title "${v.name} — ${v.role}", meta description "Counselling psychologist in ${v.location} & online worldwide. Trauma-informed therapy for anxiety, burnout, couples & teens + workplace wellness.", OG title/description/image.
PERFORMANCE: minimal deps, CSS marquee keyframes, rAF counters, lazy images (hero eager), no heavy carousel libs.

---

## 7) DO / NEVER
DO: generous py-24/py-32 rhythm; real Kenyan names/places (Wanjiku, Amina, Lavington, Westlands, Kisumu, Nakuru); KES + USD; faith-sensitive line ("Healing and faith can walk hand in hand"); reassurance near every form; gold hairlines; arch imagery; slow calm motion; M-Pesa/bank/cards note; KCPA ethics.
NEVER: purple/blue gradients, clinical cold copy, lorem ipsum, emojis, clip-art brains, stock handshakes, diagnosis claims, dark patterns, pressure countdowns, more than one H1, jarring/fast animations, walls of text.

---

## 8) QA CHECKLIST — MUST PASS
${qaExtra}

---

## 9) OUTPUT FORMAT
Return complete runnable code with real copy for ${v.name}. If multi-file: App composition + components + data + CSS as above. If single-file: one HTML file with all sections. Start with Hero, build down the page. No placeholders. No TODOs. Final line of the page is a calm footer CTA, not pressure.

Begin now — build something she would proudly share on national TV.
`;
}

export function countWords(s: string): number {
  return s.trim().split(/\s+/).length;
}

export function promptToSections(full: string): { title: string; body: string }[] {
  const regex = /##\s*(\d+\)[^\n]+)\n([\s\S]*?)(?=\n##\s*\d+\)|$)/g;
  const out: { title: string; body: string }[] = [];
  let m: RegExpExecArray | null;
  while ((m = regex.exec(full)) !== null) out.push({ title: m[1].trim(), body: m[2].trim() });
  return out.length ? out : [{ title: "Full prompt", body: full }];
}
