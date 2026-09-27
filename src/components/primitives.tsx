import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  id,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  id?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

export function Eyebrow({ children, tone = "ink" }: { children: ReactNode; tone?: "ink" | "light" }) {
  return (
    <p className={`eyebrow ${tone === "light" ? "text-gold-light/80" : "text-sage-deep"}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-current" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </p>
  );
}

export function PillButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "light" | "ghost";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.9375rem] font-bold transition-all duration-300 hover:-translate-y-0.5";
  const styles = {
    primary: "bg-forest text-ivory shadow-soft hover:bg-forest-soft",
    light: "bg-ivory text-forest hover:bg-white",
    outline: "border border-forest/20 text-forest hover:border-forest/45 hover:bg-forest/[0.04]",
    ghost: "border border-ivory/25 text-ivory hover:border-gold/60 hover:bg-ivory/[0.06]",
  }[variant];
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
    </a>
  );
}

export function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
          <path d="M10 1.6l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  tone = "ink",
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  tone?: "ink" | "light";
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 font-display text-[2.25rem] leading-[1.06] tracking-[-0.02em] sm:text-[2.75rem] lg:text-[3.25rem] ${
          tone === "light" ? "text-ivory" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-5 text-[1.0625rem] leading-[1.7] ${tone === "light" ? "text-ivory/70" : "text-muted"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

export function Counter({ to, suffix = "", decimals = 0, duration = 1600 }: { to: number; suffix?: string; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setValue(to * (1 - Math.pow(1 - t, 4)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {(reduce ? to : value).toFixed(decimals)}
      {suffix}
    </span>
  );
}
