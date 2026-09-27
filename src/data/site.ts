export const site = {
  name: "Rashidah K. Wangara",
  shortName: "Rashidah",
  monogram: "R",
  role: "Counselling Psychologist & Mental Wellness Advocate",
  credentials: "M.A. Counselling Psychology, Licensed Counselling Psychologist",
  location: "Lavington, Nairobi",
  serviceArea: "in-person in Lavington, Nairobi & online worldwide",
  tagline: "Come home",
  tagline2: "to yourself.",
  tagline3: "Where science meets soul.",
  intro:
    "I'm Rashidah — a counselling psychologist in Lavington, Nairobi. I help high-achieving adults, couples and teens untangle anxiety, burnout, trauma and grief — with science, soul, and zero judgment.",
  years: 12,
  yearsLabel: "12+",
  clients: "2,400+",
  workshops: "180+",
  rating: "4.9/5",
  ratingNumber: 4.9,
  reviews: "480+",
  email: "hello@rashidahwangara.co.ke",
  phone: "+254 722 000 000",
  phoneHref: "tel:+254722000000",
  whatsapp: "254722000000",
  whatsappUrl: "https://wa.me/254722000000",
  hours: "Tue–Sat • 8:00am – 6:00pm EAT",
  reassurance: "Judgment-free. Confidential. At your pace.",
  crisis: {
    title: "Therapy is not crisis care.",
    body: "If you or someone you love is in immediate danger in Kenya, please call the Kenya Red Cross on 1199 or Befrienders Kenya on 0722 178 177. Both are free, confidential and available around the clock.",
    lines: [
      { label: "Kenya Red Cross", value: "1199" },
      { label: "Befrienders Kenya", value: "0722 178 177" },
    ],
  },
} as const;

/**
 * Photography slots. Leave a value empty to keep the art-directed SVG artwork.
 * To use real photos, drop the files in `public/images/` and set the path here —
 * nothing else needs to change.
 *
 * Recommended crops (all warm daylight, beige/sage, authentic Kenyan dignity):
 *   portrait — confident African woman, late 30s, cream blazer, low bun, gold studs
 *   room     — boucle chairs, travertine table, eucalyptus, arched window, sage wall
 *   stage    — cream suit, microphone, blurred audience, warm spotlight
 *   circle   — diverse women journaling on cushions, plants, daylight
 *   detail   — journal and tea on linen, morning shadows
 */
export const art: Record<"portrait" | "room" | "stage" | "circle" | "detail" | "journal", string> = {
  portrait: "",
  room: "",
  stage: "",
  circle: "",
  detail: "",
  journal: "",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Speaking", href: "#speaking" },
  { label: "Stories", href: "#stories" },
  { label: "Journal", href: "#journal" },
  { label: "FAQ", href: "#faq" },
] as const;

export const marquee = [
  "Anxiety & Overwhelm",
  "Burnout Recovery",
  "Trauma Healing",
  "Couples Therapy",
  "Grief & Loss",
  "Self-Esteem",
  "Teens 16+",
  "Corporate Wellness",
];

export const featured = ["TEDx Nairobi", "NTV Kenya", "Capital FM", "Mindful Africa", "Parents Magazine"];

export const credentials = [
  { title: "Clinical training", lines: [site.credentials, "Trauma-focused CBT, ACT & EFT"] },
  { title: "Relationship work", lines: ["Gottman-informed couples practice", "Family & adolescent sessions"] },
  { title: "Professional bodies", lines: ["KCPA & PAPU registered", "Certified MHFA instructor"] },
  { title: "In the community", lines: [`TEDx Nairobi & Nation Media`, `${site.workshops} talks & workshops`] },
];

export const pillars = [
  {
    title: "Science, not guesswork",
    body: "Every plan is grounded in evidence-based therapy — measured, reviewed and adjusted as you change.",
  },
  {
    title: "Culture & faith honoured",
    body: "Healing and faith can walk hand in hand. Your beliefs are welcome here, never corrected.",
  },
  {
    title: "Softness as strategy",
    body: "Kindness is not naivety. A calm, unhurried room is where the honest work actually happens.",
  },
];

export const stats = [
  { value: site.yearsLabel, label: "Years of practice", detail: "Since 2013" },
  { value: site.clients, label: "Clients held", detail: "Across 14 countries" },
  { value: site.workshops, label: "Talks & workshops", detail: "Schools, corporates, NGOs" },
  { value: site.rating, label: "Average rating", detail: `From ${site.reviews} reviews` },
];

export const services = [
  {
    icon: "Heart",
    title: "Individual Therapy",
    price: "KES 6,500",
    duration: "50 minutes",
    badge: "Most booked",
    body: "One-to-one work for anxiety, burnout, low mood and the quiet exhaustion that follows a life well-lived.",
    points: ["CBT & ACT tailored to you", "Between-session reflection", "A written plan you can see"],
  },
  {
    icon: "Sprout",
    title: "Trauma & Healing",
    price: "KES 7,000",
    duration: "50–60 minutes",
    body: "Trauma-informed sessions that move at the speed of safety. No forcing, no timelines, no pressure.",
    points: ["Phase-based stabilisation first", "Somatic grounding work", "Trauma-informed throughout"],
  },
  {
    icon: "HeartHandshake",
    title: "Couples & Relationships",
    price: "KES 9,500",
    duration: "75 minutes",
    body: "For couples who want to stop surviving each other and start actually listening again.",
    points: ["Gottman-informed structure", "Rupture & repair practice", "Shared, not blame-based"],
  },
  {
    icon: "Sprout",
    title: "Teens & Young Adults",
    price: "KES 5,500",
    duration: "45 minutes",
    body: "Ages 16+. Identity, pressure, phones, family expectations — a space that is theirs, not a lecture.",
    points: ["Confidential by default", "Parent-friendly with consent", "School & exam stress"],
  },
  {
    icon: "Leaf",
    title: "Grief & Life Transitions",
    price: "KES 6,500",
    duration: "50 minutes",
    body: "Loss of a person, a role, a country, a version of yourself. Grief needs company, not advice.",
    points: ["Loss in any form", "Identity reconstruction", "Gentle, unhurried pacing"],
  },
  {
    icon: "Presentation",
    title: "Workplace & Wellness Talks",
    price: "Custom",
    duration: "45–90 minutes",
    body: "Talks, workshops and team sessions for organisations that care about their people.",
    points: ["Burnout & resilience", "Mental health literacy", "On-site or virtual"],
  },
];

export const steps = [
  {
    title: "Warm welcome",
    time: "Free · 15 minutes",
    body: "A free discovery call. We talk about what brought you, what you need, and whether we're a fit. No pressure either way.",
  },
  {
    title: "Deep listening & mapping",
    time: "Session 1 · 50 minutes",
    body: "A full assessment and a clear, written map of where you are and the work ahead. You leave knowing what we're doing.",
  },
  {
    title: "Healing work",
    time: "Weekly · 50 minutes",
    body: "Consistent weekly sessions using the approaches that fit you — with reflection, tracking and honest check-ins.",
  },
  {
    title: "Growth & graduation",
    time: "Your pace",
    body: "We consolidate what you've built, prepare you to hold it alone, and close the loop with care. You don't have to stay forever.",
  },
];

export const modalities = [
  "CBT",
  "ACT",
  "Trauma-Informed",
  "Mindfulness",
  "Narrative",
  "Gottman-Informed",
  "Faith-Integrated (opt-in)",
];

export const speaking = {
  badge: "TEDx • Nation • Capital FM",
  title: "Bringing mental wellness to the stage",
  intro:
    "I speak on the things people in rooms rarely say out loud — burnout, the superwoman script, raising well teens, and making therapy feel safe to talk about.",
  topics: [
    { title: "Burnout to Balance", body: "Why high performers burn out, and the practices that actually restore them." },
    { title: "The African Woman & Mental Load", body: "Carrying everyone, and who is holding you? A candid conversation." },
    { title: "Raising Emotionally Well Teens", body: "Practical tools for parents of the generation glued to a screen." },
    { title: "Faith & Therapy", body: "Why the two don't have to compete — and how they often work together." },
  ],
  clients: ["Safaricom", "KCB", "UN Women", "Strathmore University", "Daystar University"],
  deckLabel: "Corporate wellness deck",
};

export const testimonials = [
  {
    quote: "I hadn't slept through the night in two years. Six weeks with Rashidah and I was sleeping again — and laughing again.",
    name: "Wanjiku M.",
    role: "Marketing Director, Nairobi",
  },
  {
    quote: "She listens like a wise elder sister. I came in defensive and left with a plan I actually believed in.",
    name: "Daniel O.",
    role: "Founder, Nairobi",
  },
  {
    quote: "We came in ready to divorce. We left able to talk again. I will never forget that room.",
    name: "Amina & Brian",
    role: "Married 11 years, Mombasa",
  },
  {
    quote: "She held my grief without trying to fix it. That kind of tenderness is rare and I am grateful for it.",
    name: "Faith N.",
    role: "Teacher, Nakuru",
  },
  {
    quote: "Our team wellbeing scores moved within one quarter. Rashidah is the first speaker people actually followed up with.",
    name: "HR Lead",
    role: "Fintech, Nairobi",
  },
];

export const circle = {
  kicker: "The Wellness Circle",
  title: "A soft landing in your inbox, every Sunday evening",
  body: "One thoughtful note on rest, boundaries, grief and the work of staying human — plus a free grounding toolkit to download each month. No noise, no selling, unsubscribe any time.",
  readers: "12,000+ readers",
  cta: "Join free",
  success: "Karibu to the Circle! Check your inbox for the Grounding Toolkit.",
  themes: [
    { month: "Oct", title: "Rest without guilt" },
    { month: "Nov", title: "Boundaries with love" },
    { month: "Dec", title: "Grief & gratitude" },
  ],
};

export const journal = [
  {
    category: "Anxiety",
    title: "High-functioning anxiety: the calm that costs too much",
    excerpt: "You hit your deadlines and still feel like you are falling behind. Here is what that quiet panic is costing you.",
    time: "6 min read",
  },
  {
    category: "Burnout",
    title: "The strong daughter and the weight she never sets down",
    excerpt: "Being the reliable one is beautiful until it becomes the only way you are allowed to matter.",
    time: "8 min read",
  },
  {
    category: "Relationships",
    title: "How to fight fair when you are not okay",
    excerpt: "Conflict does not have to be a fight. A short, practical script for the arguments you keep having.",
    time: "5 min read",
  },
];

export const fees = [
  {
    name: "Discovery call",
    price: "Free",
    usd: "15 minutes",
    featured: false,
    body: "A first conversation to see whether we're a fit. No obligation.",
  },
  {
    name: "Individual therapy",
    price: "KES 6,500",
    usd: "≈ $50 per session",
    featured: true,
    body: "50 minutes, weekly. Students and clients in genuine need: KES 5,000.",
  },
  {
    name: "Couples therapy",
    price: "KES 9,500",
    usd: "≈ $73 per session",
    featured: false,
    body: "75 minutes. Both partners welcome, or one if that is where you are.",
  },
];

export const ethics = {
  title: "Fees, ethics & receipts",
  lines: [
    "Bound by the Kenya Clinical Psychologists Association code of ethics and your right to confidentiality.",
    "M-Pesa, bank transfer or card. Receipts issued for every session, always.",
    "Sessions are 48 hours in advance. Late cancellations within 24 hours are charged at 50%.",
  ],
};

export const faqs = [
  {
    q: "Do I really need therapy?",
    a: "Honestly? You do not need to be falling apart to deserve support. If your thoughts circle at 2am, if you are tired in a way sleep does not fix, or if you are holding everyone else together and nothing is holding you — that is reason enough. Most people who book a discovery call tell me they wish they had come sooner.",
  },
  {
    q: "What happens in the first session?",
    a: "It is a conversation, not an interrogation. I will ask about what brought you, how things have been, and what you want to be different. You will leave with a clear sense of whether we are a fit, and a rough map of the work. Nothing is decided for you.",
  },
  {
    q: "Is online therapy as effective as in-person?",
    a: "For most concerns, yes — research on online therapy is consistently strong, and many of my clients are across Africa and the diaspora. Online sessions are private, secure and camera-on. If you have never tried it, the first session is a good low-stakes test.",
  },
  {
    q: "Is what I say confidential?",
    a: "Yes, within the clear limits of the law and safety. What you share stays in the room. The exceptions are a serious risk to your life or someone else's, or a legal reporting requirement — and I will always tell you clearly if that is ever the case.",
  },
  {
    q: "Can therapy work alongside my faith?",
    a: "Absolutely. Healing and faith can walk hand in hand, and plenty of my clients bring theirs fully into the room — prayer, community, scripture, or simply a sense of God. Faith-integrated work is available if you want it, and never imposed if you do not.",
  },
  {
    q: "How long will I need therapy?",
    a: "It depends on what you are carrying, and we will keep reviewing it openly. Some people need eight sessions to get steady again. Others are doing deeper identity and relationship work over a year or more. I will always tell you honestly when I think you have what you came for.",
  },
  {
    q: "What if I cry?",
    a: "Then you are doing therapy correctly. Crying in this room is not a failure and it is not something I will treat as dramatic — it is often the moment something honest finally gets said. Tissues are always within reach, and no judgement is ever attached.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Sessions are confirmed 48 hours ahead. If you need to cancel inside 24 hours, 50% of the fee applies, because that slot cannot realistically be refilled. Two late cancellations in a row and we will move to a lighter fortnightly rhythm — no drama, just a plan that respects both of us.",
  },
];

export const booking = {
  title: "Booking that feels like a deep breath",
  intro:
    "Three small steps, no payment today, no pressure. If anything does not feel right, we can adjust before you commit.",
  modes: ["Online", "In-person"] as const,
  times: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
  info: [
    { label: "Where", value: "Online worldwide, or in-person in Lavington, Nairobi" },
    { label: "When", value: site.hours },
    { label: "Fees", value: "Discovery call is free · sessions from KES 5,500" },
    { label: "Languages", value: "English · Kiswahili" },
  ],
  microcopy: ["Judgment-free", "Confidential", "At your pace"],
};

export const footer = {
  blurb:
    "Licensed counselling psychologist in Lavington, Nairobi. In-person and online worldwide, for individuals, couples, teens and organisations.",
  explore: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Speaking", href: "#speaking" },
    { label: "Stories", href: "#stories" },
    { label: "Journal", href: "#journal" },
  ],
  support: [
    { label: "Fees & FAQ", href: "#faq" },
    { label: "Book a session", href: "#book" },
    { label: "Wellness Circle", href: "#circle" },
    { label: "Invite Rashidah to speak", href: "#contact" },
    { label: "Crisis support", href: "#crisis" },
  ],
  legal: "Licensed · Confidential · KCPA ethics",
};
