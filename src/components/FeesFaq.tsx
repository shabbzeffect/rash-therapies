import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShieldCheck } from "lucide-react";
import { ethics, faqs, fees, site } from "../data/site";
import { Reveal, SectionHead } from "./primitives";

export function FeesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-ivory py-24 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div>
          <SectionHead
            eyebrow="Fees & practicalities"
            title={
              <>
                Clear pricing,
                <span className="italic text-sage-deep"> no surprises</span>
              </>
            }
            intro="You will never be asked to pay for something you did not understand. Here is everything, in writing, before you ever book."
          />

          <div className="mt-12 grid gap-4">
            {fees.map((fee, i) => (
              <Reveal
                key={fee.name}
                delay={i * 0.07}
                className={`rounded-[24px] border p-6 transition-all duration-300 ${
                  fee.featured
                    ? "border-transparent bg-forest text-ivory shadow-soft"
                    : "border-forest/10 bg-white hover:border-forest/20"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className={`font-display text-title ${fee.featured ? "text-ivory" : "text-ink"}`}>{fee.name}</h3>
                  <div className="text-right">
                    <p className={`font-display text-2xl ${fee.featured ? "text-gold" : "text-forest"}`}>
                      {fee.price}
                    </p>
                    <p className={`text-meta ${fee.featured ? "text-ivory/55" : "text-muted"}`}>{fee.usd}</p>
                  </div>
                </div>
                <p className={`mt-3 text-body-sm ${fee.featured ? "text-ivory/70" : "text-muted"}`}>
                  {fee.body}
                </p>
                {fee.featured ? (
                  <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1 text-micro uppercase text-gold">
                    Most chosen
                  </p>
                ) : null}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-5 rounded-[24px] border border-sage/30 bg-sage/[0.08] p-6">
            <p className="flex items-center gap-2 text-label font-extrabold uppercase tracking-[0.14em] text-sage-deep">
              <ShieldCheck size={15} />
              {ethics.title}
            </p>
            <ul className="mt-4 grid gap-3">
              {ethics.lines.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-body-sm text-ink/75">
                  <Check size={14} className="mt-1 shrink-0 text-sage-deep" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div>
          <p className="eyebrow text-sage-deep">Questions people actually ask</p>
          <h2 className="mt-5 font-display text-display-lg text-ink lg:text-display-lg-wide">
            Before you decide anything
          </h2>

          <div className="mt-10 grid gap-2.5">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <Reveal
                  key={faq.q}
                  delay={Math.min(i, 6) * 0.05}
                  className="overflow-hidden rounded-[22px] border border-forest/10 bg-white transition-colors duration-300"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-5 p-6 text-left"
                    >
                      <span
                        className={`font-display text-title transition-colors ${
                          isOpen ? "text-sage-deep" : "text-ink"
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors ${
                          isOpen ? "bg-sage-deep text-ivory" : "bg-forest/8 text-forest"
                        }`}
                      >
                        {isOpen ? <Minus size={13} strokeWidth={2.5} /> : <Plus size={13} strokeWidth={2.5} />}
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="measure px-6 pb-6 text-body text-muted">{faq.a}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </div>

          <Reveal id="crisis" className="mt-8 rounded-[24px] border border-clay/30 bg-clay/[0.07] p-7">
            <p className="text-label font-bold text-clay-ink">{site.crisis.title}</p>
            <p className="measure mt-3 text-body-sm text-ink/80">{site.crisis.body}</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {site.crisis.lines.map((line) => (
                <li
                  key={line.label}
                  className="rounded-full border border-clay/30 bg-white/70 px-4 py-2 text-meta font-bold text-ink"
                >
                  {line.label}: <span className="text-clay-ink">{line.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
