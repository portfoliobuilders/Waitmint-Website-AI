"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Phase = "thinking" | "detected" | "rendered" | "viewable" | "qualified" | "settled";

const PHASES: Phase[] = ["thinking", "detected", "rendered", "viewable", "qualified", "settled"];

const STATUS: Record<Phase, string> = {
  thinking: "The model is thinking",
  detected: "Wait detected",
  rendered: "Placement rendered",
  viewable: "Viewability running",
  qualified: "Qualified",
  settled: "Settled",
};

const DWELL_MS: Record<Phase, number> = {
  thinking: 1400,
  detected: 850,
  rendered: 850,
  viewable: 2200,
  qualified: 1000,
  settled: 2400,
};

export function HeroDemo() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("thinking");
  const [viewability, setViewability] = useState(0);
  const [replay, setReplay] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const pausedRef = useRef(false);
  const shownPhase = reduced ? "settled" : phase;
  const shownView = reduced ? 100 : viewability;

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let timeout = 0;
    let raf = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        let elapsed = 0;
        let last = performance.now();
        const poll = () => {
          if (cancelled) return resolve();
          const now = performance.now();
          if (!pausedRef.current) elapsed += now - last;
          last = now;
          if (elapsed >= ms) resolve();
          else timeout = window.setTimeout(poll, 40);
        };
        poll();
      });

    const runViewability = () =>
      new Promise<void>((resolve) => {
        let elapsed = 0;
        let last = performance.now();
        const step = (now: number) => {
          if (cancelled) return resolve();
          if (!pausedRef.current) elapsed += now - last;
          last = now;
          const progress = Math.min(100, Math.round((elapsed / DWELL_MS.viewable) * 100));
          setViewability(progress);
          if (progress < 100) raf = requestAnimationFrame(step);
          else resolve();
        };
        raf = requestAnimationFrame(step);
      });

    const loop = async () => {
      while (!cancelled) {
        for (const next of PHASES) {
          if (cancelled) return;
          setPhase(next);
          if (next === "thinking") setViewability(0);
          if (next === "viewable") {
            setViewability(0);
            await runViewability();
          } else {
            await wait(DWELL_MS[next]);
          }
        }
      }
    };

    void loop();
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [reduced, replay]);

  const showCard = shownPhase !== "thinking";
  const settled = shownPhase === "settled";

  return (
    <aside
      className="wm-glow relative overflow-hidden rounded-[1.7rem] border border-[var(--wm-line)] bg-[#080a10] p-4 sm:p-5"
      aria-label="Demonstration of a sponsored wait. Demo data only."
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        pausedRef.current = false;
        setTilt({ x: 0, y: 0 });
      }}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: py * -6, y: px * 8 });
      }}
      style={{
        transform: reduced ? undefined : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--wm-mint)]/10 blur-3xl" />
      <p className="absolute right-4 top-4 rounded-full border border-[var(--wm-gold)]/30 bg-black/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--wm-gold)]">
        Demo
      </p>

      <div className="flex items-center gap-2 text-xs text-[var(--wm-muted)]">
        <span className="h-2 w-2 rounded-full bg-[var(--wm-mint)] shadow-[0_0_12px_var(--wm-mint)]" />
        chatgpt.com · Live Verified
      </div>

      <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--wm-text)]">
        Draft a launch plan for a new product.
      </p>
      <p className="mt-3 text-xs text-[var(--wm-aqua)]">
        {shownPhase === "thinking" ? "The model is thinking..." : STATUS[shownPhase]}
      </p>

      <div
        className={`mt-5 overflow-hidden rounded-2xl border bg-[var(--wm-bg-elevated)] p-4 transition-all duration-500 ${
          showCard
            ? "translate-y-0 border-[var(--wm-line)] opacity-100"
            : "translate-y-3 border-transparent opacity-40"
        }`}
      >
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--wm-mint)]">
          <span>Sponsored</span>
          <span className="text-[var(--wm-muted)]">WaitMint</span>
        </div>
        <p className="mt-3 text-lg font-medium">Linear</p>
        <p className="mt-1 text-sm text-[var(--wm-muted)]">Build products faster.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/3 p-3">
            <p className="text-[var(--wm-muted)]">Verified attention</p>
            <p className="mt-1 font-mono text-[var(--wm-aqua)]">{shownView}% dwell</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/8">
              <div className="wm-progress h-full" style={{ width: `${shownView}%` }} />
            </div>
          </div>
          <div className="rounded-xl bg-white/3 p-3">
            <p className="text-[var(--wm-muted)]">Status</p>
            <p className={`mt-1 ${settled || shownPhase === "qualified" ? "text-[var(--wm-mint)]" : "text-[var(--wm-gold)]"}`}>
              {settled || shownPhase === "qualified" ? "✓ Qualified" : STATUS[shownPhase]}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--wm-mint)]/20 bg-[var(--wm-mint-dim)] px-3 py-3">
          <span className="text-xs text-[var(--wm-muted)]">User share</span>
          <span className="font-mono text-sm text-[var(--wm-mint)]">{settled ? "+₹0.0006" : "Pending"}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs leading-5 text-[var(--wm-muted)]">
          Illustrative settlement card. Live wallets never use this figure.
        </p>
        <button
          type="button"
          className="shrink-0 text-xs text-[var(--wm-aqua)] underline-offset-4 hover:underline"
          onClick={() => {
            pausedRef.current = false;
            setViewability(0);
            setPhase("thinking");
            setReplay((value) => value + 1);
          }}
        >
          Replay
        </button>
      </div>
    </aside>
  );
}
