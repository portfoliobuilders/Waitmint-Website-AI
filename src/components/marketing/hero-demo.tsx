export function HeroDemo() {
  return (
    <aside
      className="wm-glow relative overflow-hidden rounded-3xl border border-[var(--wm-line)] bg-[#0a0c11] p-5 sm:p-6"
      aria-label="Demonstration of a sponsored wait. Demo data only."
    >
      <p className="absolute right-4 top-4 rounded-full border border-[var(--wm-line)] px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--wm-muted)]">
        Demo
      </p>
      <p className="text-xs text-[var(--wm-muted)]">Claude is thinking...</p>
      <div className="mt-5 rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-4">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[var(--wm-mint)]">
          <span>Sponsored</span>
          <span className="text-[var(--wm-muted)]">WaitMint</span>
        </div>
        <p className="mt-3 text-lg font-medium">Linear</p>
        <p className="mt-1 text-sm text-[var(--wm-muted)]">Build products faster.</p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/3 p-3">
            <p className="text-[var(--wm-muted)]">Verified attention</p>
            <p className="mt-1 font-mono text-[var(--wm-aqua)]">5.8 seconds</p>
          </div>
          <div className="rounded-xl bg-white/3 p-3">
            <p className="text-[var(--wm-muted)]">Status</p>
            <p className="mt-1 text-[var(--wm-mint)]">✓ Qualified</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--wm-mint)]/20 bg-[var(--wm-mint-dim)] px-3 py-3">
          <span className="text-xs text-[var(--wm-muted)]">User share</span>
          <span className="font-mono text-sm text-[var(--wm-mint)]">+₹0.0006</span>
        </div>
      </div>
      <p className="mt-4 text-xs text-[var(--wm-muted)]">
        Illustrative settlement card. Live wallets never use this figure.
      </p>
    </aside>
  );
}
