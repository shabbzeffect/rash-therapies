import { motion, useReducedMotion } from "framer-motion";
import { Award, BookOpen, HeartHandshake, Landmark, Quote, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { art, credentials, pillars, services, site, stats } from "../data/site";
import { ArtPlate } from "./ArtPlate";
import { Counter, Eyebrow, PillButton, Reveal, SectionHead } from "./primitives";

const CREDENTIAL_ICONS: LucideIcon[] = [Award, HeartHandshake, Landmark, BookOpen];

const SERVICE_ICONS: Record<string, LucideIcon> = {
  Heart: HeartHandshake,
  Sprout: Sprout,
  HeartHandshake: HeartHandshake,
  Leaf: Sprout,
  Presentation: BookOpen,
};

export function About() {
  return (
    <section id="about" className="bg-ivory py-24 lg:py-32">
      <div className="shell grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative">
          <ArtPlate
            variant="room"
            src={art.room}
            className="aspect-[5/6] w-full rounded-[28px] border border-forest/8"
            label="A calm therapy room in Lavington with an arched window and soft chairs"
          />
          <div className="absolute -bottom-8 -right-4 w-44 overflow-hidden rounded-[22px] border-4 border-ivory shadow-lift sm:-right-8 sm:w-56">
            <ArtPlate
              variant="detail"
              src={art.detail}
              className="aspect-[4/3] w-full"
              label="A journal and a cup of tea on linen"
            />
          </div>
          <div className="absolute -left-4 top-8 rounded-2xl bg-forest px-4 py-3 text-ivory shadow-soft sm:-left-6">
            <p className="font-display text-2xl leading-none">{site.yearsLabel}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">Years of practice</p>
          </div>
        </Reveal>

        <div>
          <Eyebrow>Meet your psychologist</Eyebrow>
          <h2 className="mt-5 font-display text-[2.25rem] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.75rem] lg:text-[3.1rem]">
            Warm like a sister.
            <span className="block italic text-sage-deep">Sharp like a scientist.</span>
          </h2>
          <div className="mt-6 grid gap-5 text-[1.0625rem] leading-[1.75] text-muted">
            <p>
              Twelve years ago I sat across from a CFO in Westlands who could not name what was wrong — only that
              nothing felt like it counted any more. Today I work with executives, mums, students, couples and
              families across Nairobi, from the diaspora in London to Doha. What has not changed is my belief that
              therapy works best when you feel genuinely safe.
            </p>
            <p>
              My work draws on cognitive behavioural therapy, acceptance and commitment therapy, trauma-informed
              practice and Gottman-informed couples work. I hold the clinical standards of a hospital and the warmth
              of a living room. Where faith matters to you, healing and faith can walk hand in hand.
            </p>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {credentials.map((c, i) => {
              const Icon = CREDENTIAL_ICONS[i] ?? Award;
              return (
                <Reveal
                  key={c.title}
                  delay={i * 0.06}
                  className="group rounded-[22px] border border-forest/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-forest/20 hover:shadow-soft"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sage/18 text-sage-deep">
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                  <p className="mt-3.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-ink/50">{c.title}</p>
                  <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">{c.lines[0]}</p>
                  <p className="mt-1 text-[12.5px] leading-snug text-muted">{c.lines[1]}</p>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-9 rounded-[26px] border-l-2 border-clay bg-parchment p-7">
            <Quote size={22} className="text-clay" />
            <p className="mt-4 font-display text-[1.5rem] leading-[1.35] text-ink sm:text-[1.75rem]">
              You don't have to earn rest. You don't have to be falling apart to deserve care. You only have to walk
              in the door.
            </p>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-muted">
              {site.name} — {site.credentials}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell mt-24 grid gap-6 border-t border-forest/10 pt-14 md:grid-cols-3 lg:mt-28">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <span className="font-display text-[2.5rem] leading-none text-sand">0{i + 1}</span>
            <h3 className="mt-4 font-display text-xl text-ink">{p.title}</h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.7] text-muted">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="grain relative overflow-hidden bg-night py-24 text-ivory lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-sage/12 blur-3xl" />
      <div className="shell relative">
        <SectionHead
          tone="light"
          align="center"
          eyebrow="The work, over time"
          title={
            <>
              Quiet work.
              <span className="block italic text-gold">Loud transformations.</span>
            </>
          }
        />
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const isDecimal = s.value.includes(".");
            return (
              <Reveal key={s.label} delay={i * 0.08} className="text-center">
                <p className="font-display text-[3rem] leading-none text-ivory sm:text-[3.5rem]">
                  {isDecimal ? (
                    <>
                      <Counter to={parseFloat(s.value)} decimals={1} />
                      {s.value.slice(s.value.indexOf("/"))}
                    </>
                  ) : (
                    s.value
                  )}
                </p>
                <p className="mt-4 text-[12.5px] font-bold uppercase tracking-[0.14em] text-gold">{s.label}</p>
                <p className="mt-1.5 text-[12px] text-ivory/50">{s.detail}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="bg-ivory py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="What we work on"
          title={
            <>
              Support for every
              <span className="italic text-sage-deep"> season you're in</span>
            </>
          }
          intro="Each of these is a real, structured practice — not a list of things I say I do. Start anywhere; we will find the right room together."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon] ?? HeartHandshake;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.07} className="h-full">
                <motion.article
                  whileHover={reduce ? {} : { y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex h-full flex-col rounded-[26px] border border-forest/10 bg-white p-7 transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-sage/15 text-sage-deep transition-colors duration-300 group-hover:bg-sage/25">
                      <Icon size={19} strokeWidth={1.8} />
                    </span>
                    {service.badge ? (
                      <span className="rounded-full border border-gold/45 bg-gold/12 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#8a6f34]">
                        {service.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-6 font-display text-[1.375rem] leading-tight text-ink">{service.title}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-muted">{service.body}</p>
                  <ul className="mt-5 grid gap-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[13.5px] text-ink/75">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-end justify-between gap-4 border-t border-forest/8 pt-6">
                    <div>
                      <p className="font-display text-lg text-ink">{service.price}</p>
                      <p className="text-[11.5px] text-muted">{service.duration}</p>
                    </div>
                    <a
                      href="#book"
                      className="text-[12.5px] font-bold text-forest underline-offset-4 transition-colors hover:text-clay hover:underline"
                    >
                      Book →
                    </a>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="grain relative mt-10 overflow-hidden rounded-[28px] bg-forest px-8 py-12 text-center text-ivory sm:px-12">
          <h3 className="font-display text-[1.75rem] leading-tight sm:text-[2.25rem]">Not sure where you fit?</h3>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ivory/70">
            That is exactly what the free discovery call is for. We will work out together whether this is the right
            kind of help for you — even if the answer is another therapist.
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href="#book" variant="light">
              Start with a free call
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
