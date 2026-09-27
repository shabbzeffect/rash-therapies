import { Mic, Quote } from "lucide-react";
import { modalities, site, speaking, steps } from "../data/site";
import { ArtPlate } from "./ArtPlate";
import { PillButton, Reveal, SectionHead } from "./primitives";

export function Approach() {
  return (
    <section id="approach" className="bg-parchment py-24 lg:py-32">
      <div className="shell grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                A process that feels
                <span className="italic text-sage-deep"> safe from day one</span>
              </>
            }
            intro="No surprises, no sudden deep dives. You always know what is happening, what it costs and what comes next."
          />

          <ol className="mt-14 grid gap-0">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="relative flex gap-6 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-forest/15 bg-ivory font-display text-[15px] text-forest">
                    0{i + 1}
                  </span>
                  {i < steps.length - 1 ? (
                    <span aria-hidden="true" className="mt-2 w-px flex-1 bg-gradient-to-b from-forest/20 to-transparent" />
                  ) : null}
                </div>
                <div className="pb-2 pt-2">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="font-display text-xl text-ink">{step.title}</h3>
                    <span className="rounded-full bg-forest/8 px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-sage-deep">
                      {step.time}
                    </span>
                  </div>
                  <p className="mt-2.5 max-w-lg text-[14.5px] leading-[1.7] text-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-12">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink/45">How I work</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {modalities.map((m) => (
                <li
                  key={m}
                  className="rounded-full border border-forest/12 bg-ivory px-3.5 py-1.5 text-[12px] font-semibold text-ink/75"
                >
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="relative">
          <ArtPlate
            variant="circle"
            className="aspect-[4/5] w-full rounded-[28px] border border-forest/10"
            label="A circle of women journaling together in warm daylight"
          />
          <div className="grain relative -mt-16 ml-4 mr-4 rounded-[26px] bg-forest p-8 text-ivory shadow-lift sm:-mt-20 sm:ml-10 sm:mr-0 sm:p-10">
            <Quote size={22} className="text-gold" />
            <p className="mt-4 font-display text-[1.5rem] leading-[1.35] sm:text-[1.75rem]">
              Whatever happened to you, you were never broken. Something happened to you — and we can work with that.
            </p>
            <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.16em] text-ivory/50">
              A line I return to often
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Speaking() {
  return (
    <section id="speaking" className="grain relative overflow-hidden bg-night py-24 text-ivory lg:py-32">
      <div className="shell grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative">
          <ArtPlate
            variant="stage"
            className="aspect-[4/5] w-full rounded-[28px] border border-ivory/10"
            label="Rashidah speaking on a warmly lit stage before a blurred audience"
          />
          <div className="absolute -right-3 top-6 rounded-2xl border border-gold/35 bg-ink/90 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold shadow-lift sm:-right-6">
            {speaking.badge}
          </div>
        </Reveal>

        <div>
          <SectionHead
            tone="light"
            eyebrow="Talks, workshops & advocacy"
            title={speaking.title}
            intro={speaking.intro}
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {speaking.topics.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i * 0.07}
                className="group rounded-[22px] border border-ivory/12 bg-ivory/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:bg-ivory/[0.07]"
              >
                <Mic size={18} className="text-gold" strokeWidth={1.8} />
                <h3 className="mt-4 font-display text-[1.1875rem] leading-snug text-ivory">{t.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.65] text-ivory/60">{t.body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-9 flex flex-wrap items-center gap-3">
            <PillButton href="#contact" variant="light">
              Invite {site.shortName} to speak
            </PillButton>
            <PillButton href="#contact" variant="ghost">
              {speaking.deckLabel}
            </PillButton>
          </Reveal>

          <Reveal className="mt-12 border-t border-ivory/12 pt-8">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ivory/40">
              Trusted by teams at
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              {speaking.clients.map((c) => (
                <li key={c} className="text-[13.5px] font-semibold text-ivory/65">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
