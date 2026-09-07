"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const STEPS = [
  "GENERATION STARTED",
  "WAIT DETECTED",
  "AD RETURNED",
  "RENDERED",
  "TAB VISIBLE",
  "VIEWABILITY THRESHOLD",
  "QUALIFIED",
  "SETTLED",
];

export function VerifiedFlow() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const lit = reduced ? STEPS.length : active;

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let step = 0;
        const advance = () => {
          step += 1;
          setActive(step);
          if (step < STEPS.length) timer = window.setTimeout(advance, 420);
        };
        advance();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <ol ref={ref} className="grid gap-2 md:grid-cols-2">
      {STEPS.map((step, index) => {
        const on = index < lit;
        const current = index === lit - 1;
        return (
          <li
            key={step}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 font-mono text-xs tracking-[0.12em] transition-all duration-500 ${
              on
                ? "border-[var(--wm-mint)]/35 bg-[var(--wm-mint-dim)] text-[var(--wm-text)]"
                : "border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] text-[var(--wm-muted)]"
            }`}
          >
            <span className={current ? "text-[var(--wm-mint)]" : on ? "text-[var(--wm-aqua)]" : "text-[var(--wm-muted)]"}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {step}
          </li>
        );
      })}
      <li
        className={`rounded-xl border px-4 py-3 font-mono text-xs tracking-[0.12em] md:col-span-2 ${
          lit >= STEPS.length
            ? "border-[var(--wm-mint)]/40 bg-[var(--wm-mint-dim)] text-[var(--wm-mint)]"
            : "border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] text-[var(--wm-muted)]"
        }`}
      >
        60% USER · 40% WAITMINT
      </li>
    </ol>
  );
}
