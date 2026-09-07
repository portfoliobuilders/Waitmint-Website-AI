const PRINCIPLES = [
  "No prompt reading",
  "60% user share on settlement",
  "One sponsored placement per eligible wait",
  "Verified Wait™ — not a points game",
  "No qualification. No charge. No earning.",
  "Your conversations stay yours",
  "Exchange integers only",
  "House inventory settles at ₹0",
];

export function PrincipleMarquee() {
  const loop = [...PRINCIPLES, ...PRINCIPLES];
  return (
    <div className="overflow-hidden border-y border-[var(--wm-line)] bg-[rgba(12,14,21,0.72)]">
      <div className="wm-marquee gap-10 py-3.5 pr-10">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-[var(--wm-gold)]"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--wm-mint)]" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
