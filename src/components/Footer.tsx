import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Check, MessageCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { footer, site } from "../data/site";
import { subscribeToasts, type ToastItem } from "../lib/toast";

export function Footer() {
  return (
    <footer id="contact" className="grain relative scroll-mt-24 overflow-hidden bg-night py-20 text-ivory lg:py-24">
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-ivory/10 font-display text-lg">
                {site.monogram}
              </span>
              <span>
                <span className="block font-display text-[17px]">{site.name}</span>
                <span className="block text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ivory/45">
                  {site.role}
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-ivory/60">{footer.blurb}</p>
            <ul className="mt-6 grid gap-2 text-[13.5px]">
              <li>
                <a href={`mailto:${site.email}`} className="text-ivory/75 underline-offset-4 transition-colors hover:text-gold hover:underline">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="text-ivory/75 underline-offset-4 transition-colors hover:text-gold hover:underline">
                  {site.phone}
                </a>
              </li>
              <li className="text-ivory/60">{site.location}</li>
              <li className="text-ivory/60">{site.hours}</li>
            </ul>
          </div>

          <nav aria-label="Explore">
            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ivory/40">Explore</p>
            <ul className="mt-5 grid gap-3">
              {footer.explore.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] text-ivory/70 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support">
            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ivory/40">Support</p>
            <ul className="mt-5 grid gap-3">
              {footer.support.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14px] text-ivory/70 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-ivory/40">Prefer to talk?</p>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center gap-3 rounded-[22px] border border-gold/30 bg-ivory/[0.05] p-5 transition-colors hover:border-gold/60 hover:bg-ivory/[0.09]"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/20 text-gold">
                <MessageCircle size={17} />
              </span>
              <span>
                <span className="block text-[14px] font-bold">WhatsApp {site.shortName}</span>
                <span className="block text-[12px] text-ivory/55">Replies within a few hours</span>
              </span>
            </a>

            <div className="mt-4 rounded-[22px] border border-clay/30 bg-clay/[0.09] p-5">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#f0b48c]">In crisis?</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ivory/65">
                Kenya Red Cross <span className="font-bold text-ivory">1199</span> · Befrienders Kenya{" "}
                <span className="font-bold text-ivory">0722 178 177</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ivory/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-ivory/45">
            © {new Date().getFullYear()} {site.name} • {footer.legal}
          </p>
          <p className="text-[12px] text-ivory/45">Designed and built with care. {site.tagline3}</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop ? (
          <motion.button
            type="button"
            key="top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 bg-ivory/90 text-forest shadow-soft backdrop-blur transition-colors hover:border-forest/35"
          >
            <ArrowUp size={16} />
          </motion.button>
        ) : null}
      </AnimatePresence>
      <a
        href={site.whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-forest text-ivory shadow-lift transition-transform duration-300 hover:-translate-y-0.5"
      >
        <MessageCircle size={22} />
      </a>
    </div>
  );
}

export function Toaster() {
  const [items, setItems] = useState<ToastItem[]>([]);
  const timers = useRef<number[]>([]);
  const reduce = useReducedMotion();

  useEffect(
    () =>
      subscribeToasts((item) => {
        setItems((list) => [...list.slice(-2), item]);
        const timer = window.setTimeout(() => {
          setItems((list) => list.filter((i) => i.id !== item.id));
        }, 4200);
        timers.current.push(timer);
      }),
    [],
  );

  useEffect(() => {
    const list = timers.current;
    return () => {
      for (const t of list) window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed bottom-5 left-1/2 z-50 flex w-[min(92vw,26rem)] -translate-x-1/2 flex-col gap-2.5 sm:left-auto sm:right-5 sm:translate-x-0"
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-start gap-3 rounded-[20px] border border-forest/12 bg-ivory/95 px-5 py-4 shadow-lift backdrop-blur"
          >
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage/20 text-sage-deep">
              <Check size={13} strokeWidth={3} />
            </span>
            <p className="flex-1 text-[13.5px] leading-snug text-ink">{item.message}</p>
            <button
              type="button"
              onClick={() => setItems((list) => list.filter((i) => i.id !== item.id))}
              aria-label="Dismiss notification"
              className="text-muted transition-colors hover:text-ink"
            >
              <X size={15} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
