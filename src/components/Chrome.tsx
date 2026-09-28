import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "../data/site";

export function TopBar() {
  return (
    <div className="grain relative z-50 overflow-hidden bg-night text-ivory/85">
      <div className="shell relative flex items-center justify-center gap-3 py-2 text-center text-meta sm:text-xs">
        <span className="hidden sm:inline">
          Now welcoming new clients — <span className="text-ivory/60">{site.serviceArea}</span>
        </span>
        <span className="sm:hidden">Now welcoming new clients</span>
        <a
          href="#book"
          className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-0.5 text-micro uppercase text-gold-light transition-colors hover:bg-gold/15"
        >
          Reserve your space
        </a>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-forest/10 bg-ivory/85 backdrop-blur-xl"
          : "border-b border-transparent bg-ivory/40 backdrop-blur-sm"
      }`}
    >
      <div className="shell flex items-center gap-4 py-3.5">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 bg-forest font-display text-title text-ivory">
            {site.monogram}
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display text-body-sm text-ink">{site.name}</span>
            <span className="block text-micro uppercase text-muted">
              Psychologist • Wellness Advocate
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-body-sm font-semibold text-ink/75 transition-colors hover:text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-clay after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-meta font-semibold text-ink/75 transition-colors hover:text-ink xl:flex"
          >
            <Phone size={14} className="text-sage-deep" />
            {site.phone}
          </a>
          <a
            href="#book"
            className="rounded-full bg-forest px-5 py-2.5 text-meta font-bold text-ivory transition-all hover:bg-forest-soft"
          >
            Book session
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-ink transition-colors hover:border-forest/35 lg:hidden"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-forest/10 bg-ivory/95 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col py-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-forest/8 py-3.5 text-body-sm font-semibold text-ink/80 last:border-0"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={site.phoneHref}
                className="mt-4 flex items-center gap-2 pb-2 text-body-sm font-semibold text-sage-deep"
              >
                <Phone size={14} />
                {site.phone}
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
