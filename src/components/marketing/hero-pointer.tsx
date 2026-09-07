"use client";

import { useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function HeroPointer({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [spot, setSpot] = useState({ x: 72, y: 18 });

  return (
    <section
      className="wm-hero wm-grid relative overflow-hidden border-b border-[var(--wm-line)]"
      onPointerMove={(event) => {
        if (reduced) return;
        const rect = event.currentTarget.getBoundingClientRect();
        setSpot({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      <div className="wm-hero-veil" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background: `radial-gradient(520px 280px at ${spot.x}% ${spot.y}%, rgba(62,230,182,0.14), transparent 58%)`,
        }}
      />
      {children}
    </section>
  );
}
