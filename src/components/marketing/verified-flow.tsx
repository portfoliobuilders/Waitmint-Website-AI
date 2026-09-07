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
  return (
    <ol className="grid gap-2 md:grid-cols-2">
      {STEPS.map((step, index) => (
        <li
          key={step}
          className="flex items-center gap-3 rounded-xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] px-4 py-3 font-mono text-xs tracking-[0.12em]"
        >
          <span className="text-[var(--wm-mint)]">{String(index + 1).padStart(2, "0")}</span>
          {step}
        </li>
      ))}
      <li className="rounded-xl border border-[var(--wm-mint)]/30 bg-[var(--wm-mint-dim)] px-4 py-3 font-mono text-xs tracking-[0.12em] md:col-span-2">
        60% USER · 40% WAITMINT
      </li>
    </ol>
  );
}
