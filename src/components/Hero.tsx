import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarHeart, ShieldCheck } from "lucide-react";
import { art, featured, marquee, site } from "../data/site";
import { ArtPlate } from "./ArtPlate";
import { PillButton, Reveal, Stars } from "./primitives";
const AVATARS = ["W", "D", "A", "F", "S"];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative bg-ivory">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="slow-spin absolute -right-40 -top-56 h-[38rem] w-[38rem] rounded-full bg-sage/25 blur-3xl" />
        <div className="absolute -left-52 top-40 h-[32rem] w-[32rem] rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-24 right-1/3 h-72 w-72 rounded-full bg-clay/12 blur-3xl" />
      </div>

      <div className="shell relative grid items-center gap-16 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-24">
        <div>
          <motion.a
            href="#book"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-forest/15 bg-ivory py-1.5 pl-3 pr-4 text-micro uppercase text-ink shadow-soft"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-sage-deep" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage-deep" />
            </span>
            Licensed • {site.location} + Online
          </motion.a>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="mt-7 font-display text-display-xl text-ink lg:text-display-xl-wide"
          >
            {site.tagline}
            <span className="block italic text-sage-deep">{site.tagline2}</span>
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-7 max-w-xl text-lead text-muted"
          >
            {site.intro}
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <PillButton href="#book">
              <CalendarHeart size={16} />
              Book a free discovery call
            </PillButton>
            <PillButton href="#services" variant="outline">
              Explore therapy
              <ArrowRight size={15} />
            </PillButton>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-forest/10 pt-7"
          >
            <div className="flex -space-x-2.5">
              {AVATARS.map((a, i) => (
                <span
                  key={a}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-ivory bg-forest text-micro text-ivory"
                  style={{ opacity: 1 - i * 0.12 }}
                >
                  {a}
                </span>
              ))}
            </div>
            <div className="leading-tight">
              <Stars />
              <p className="mt-1 text-meta text-muted">
                <span className="font-bold text-ink">{site.rating}</span> from {site.reviews} reviews
              </p>
            </div>
            <div className="h-9 w-px bg-forest/12" />
            <p className="text-meta leading-tight text-muted">
              <span className="font-display text-title text-ink">{site.yearsLabel}</span> years
              <br />
              <span className="font-display text-title text-ink">{site.clients}</span> lives
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-t-full rounded-b-[28px] border border-gold/45 p-2.5 shadow-lift">
            <ArtPlate
              variant="portrait"
              src={art.portrait}
              eager
              className="arch-top aspect-[4/5] w-full"
              label={`${site.name}, ${site.role}, in her studio in ${site.location}`}
            />
            {/* The one authored moment on the page: a single slow pass of
                daylight across the arch, once, on load. Soft-light blend keeps
                it felt rather than seen. */}
            {!reduce ? (
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[28px] mix-blend-soft-light"
                style={{
                  background:
                    "linear-gradient(104deg, transparent 34%, rgba(255,253,246,0.92) 50%, transparent 66%)",
                }}
                initial={{ x: "-115%", opacity: 0 }}
                animate={{ x: "115%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />
            ) : null}
          </div>

          <motion.div
            className="drift absolute -left-3 top-10 hidden rounded-2xl border border-forest/10 bg-ivory px-4 py-3 shadow-soft sm:block lg:-left-10"
            animate={reduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ShieldCheck size={16} className="text-sage-deep" />
            <p className="mt-1.5 text-label font-bold text-ink">Confidential & safe</p>
            <p className="text-micro text-muted">KCPA ethics, always</p>
          </motion.div>

          <motion.div
            className="drift absolute -bottom-6 right-0 w-56 rounded-2xl border border-forest/10 bg-forest p-4 text-ivory shadow-lift sm:-right-4 lg:-right-8"
            animate={reduce ? {} : { y: [0, 9, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <p className="text-micro uppercase tracking-[0.18em] text-gold">Next opening</p>
            <p className="mt-1.5 font-display text-title leading-tight">Thursday, 10:30 AM</p>
            <p className="text-micro text-ivory/60">East Africa Time</p>
            <a
              href="#book"
              className="mt-3 inline-flex items-center gap-1.5 text-label font-bold text-gold-light underline-offset-4 hover:underline"
            >
              Claim this slot
              <ArrowRight size={13} />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <Marquee />
    </section>
  );
}

function Marquee() {
  const reduce = useReducedMotion();
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee-host grain relative overflow-hidden bg-forest py-4 text-ivory">
      <div className={reduce ? "flex flex-wrap justify-center gap-x-6 gap-y-1 px-6" : "marquee-track"}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-6 px-6 text-meta font-semibold tracking-[0.02em]">
            {item}
            <span aria-hidden="true" className="text-gold">
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturedStrip() {
  return (
    <section className="border-b border-forest/8 bg-ivory py-12">
      <div className="shell">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <p className="text-micro uppercase tracking-[0.2em] text-muted">As featured in</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {featured.map((f) => (
              <li key={f} className="font-display text-title italic text-ink/45">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
