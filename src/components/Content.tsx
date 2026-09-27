import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { art, circle, journal, testimonials } from "../data/site";
import { ArtPlate } from "./ArtPlate";
import { Reveal, SectionHead, Stars } from "./primitives";
import { toast } from "../lib/toast";

export function Stories() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const touch = useRef<number | null>(null);

  const go = useCallback((next: number) => setIndex((next + testimonials.length) % testimonials.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  const active = testimonials[index];

  return (
    <section id="stories" className="bg-ivory py-24 lg:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            eyebrow="In their words"
            title={
              <>
                Lives that found
                <span className="italic text-sage-deep"> their light again</span>
              </>
            }
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous story"
              className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition-all hover:-translate-y-0.5 hover:border-forest/40"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next story"
              className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 text-forest transition-all hover:-translate-y-0.5 hover:border-forest/40"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div
          className="mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touch.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touch.current;
            if (start === null) return;
            const delta = (e.changedTouches[0]?.clientX ?? start) - start;
            if (Math.abs(delta) > 48) go(index + (delta < 0 ? 1 : -1));
            touch.current = null;
          }}
        >
          <div className="relative overflow-hidden rounded-[28px] border border-forest/10 bg-white p-8 sm:p-12 lg:p-16">
            <Quote size={30} className="absolute right-8 top-8 text-sand" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <Stars />
                <blockquote className="mt-7 max-w-3xl font-display text-[1.625rem] leading-[1.35] text-ink sm:text-[2rem] lg:text-[2.375rem]">
                  “{active.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-forest font-display text-lg text-ivory">
                    {active.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-[14.5px] font-bold text-ink">{active.name}</span>
                    <span className="block text-[12.5px] text-muted">{active.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
            <ul className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <li key={t.name}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show story from ${t.name}`}
                    aria-current={i === index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === index ? "w-8 bg-clay" : "w-3 bg-forest/20 hover:bg-forest/35"
                    }`}
                  />
                </li>
              ))}
            </ul>
            <p className="text-[11.5px] text-muted">Shared with permission, names changed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CircleAndJournal() {
  return (
    <section className="bg-parchment py-24 lg:py-32">
      <div className="shell grid gap-6 lg:grid-cols-2">
        <Reveal className="grain relative overflow-hidden rounded-[28px] bg-forest p-9 text-ivory sm:p-12">
          <div id="circle" className="scroll-mt-28">
            <p className="eyebrow text-gold">{circle.kicker}</p>
            <h2 className="mt-5 font-display text-[1.875rem] leading-[1.15] tracking-[-0.02em] sm:text-[2.25rem]">
              {circle.title}
            </h2>
            <p className="mt-5 text-[15px] leading-[1.7] text-ivory/70">{circle.body}</p>
            <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.14em] text-gold">{circle.readers}</p>
            <NewsletterForm />
            <ul className="mt-9 grid gap-3 border-t border-ivory/12 pt-7 sm:grid-cols-3">
              {circle.themes.map((t) => (
                <li key={t.month}>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold">{t.month}</p>
                  <p className="mt-1 text-[13px] text-ivory/70">{t.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal id="journal" delay={0.08} className="scroll-mt-28">
          <p className="eyebrow text-sage-deep">From the journal</p>
          <h2 className="mt-5 font-display text-[1.875rem] leading-[1.15] tracking-[-0.02em] text-ink sm:text-[2.25rem]">
            Thoughts worth sitting with
          </h2>
          <div className="mt-9 grid gap-4">
            {journal.map((post) => (
              <article
                key={post.title}
                className="group grid gap-5 rounded-[24px] border border-forest/10 bg-ivory p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft sm:grid-cols-[9rem_1fr]"
              >
                <ArtPlate
                  variant="journal"
                  src={art.journal}
                  className="aspect-[4/3] w-full rounded-[18px]"
                  label={`Illustration for the article “${post.title}”`}
                />
                <div className="flex flex-col justify-center p-1 sm:pr-3">
                  <p className="flex items-center gap-2 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-clay">
                    {post.category}
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-forest/25" />
                    <span className="text-muted">{post.time}</span>
                  </p>
                  <h3 className="mt-2.5 font-display text-[1.1875rem] leading-snug text-ink transition-colors group-hover:text-sage-deep">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.65] text-muted">{post.excerpt}</p>
                  <a
                    href="#contact"
                    className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-forest underline-offset-4 transition-colors hover:text-clay hover:underline"
                  >
                    Read insight
                    <ArrowRight size={13} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function NewsletterForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast("That email doesn't look right — mind checking it?");
      return;
    }
    form.reset();
    toast(circle.success);
  };

  return (
    <form onSubmit={onSubmit} className="mt-8" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="circle-email">
          Email address
        </label>
        <input
          id="circle-email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="field flex-1 !border-ivory/20 !bg-ivory/10 !text-ivory placeholder:!text-ivory/45"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-ivory px-7 py-3.5 text-[0.9375rem] font-bold text-forest transition-transform duration-300 hover:-translate-y-0.5"
        >
          {circle.cta}
        </button>
      </div>
      <p className="mt-3 text-[11.5px] text-ivory/50">
        Free forever. One note a week on Sundays. Unsubscribe in a click.
      </p>
    </form>
  );
}
