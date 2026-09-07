const ITEMS = [
  ["Hourly lotteries and giveaway counters", "A settlement ledger. No raffle. No invented jackpot."],
  ["Prompt, topic, or conversation targeting", "Surface context only. Conversations stay closed."],
  ["Homepage earnings that look like live wallets", "Illustrative math, labelled. Live money is Exchange-only."],
  ["Charge because time passed", "No qualification. No charge. No earning."],
  ["Points, streaks, claim buttons", "One labelled placement. Qualify or ₹0."],
  ["Pay publishers for training-data citations", "Pay the person whose wait became verified attention."],
] as const;

export function MarketDifference() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-[1.7rem] border border-[var(--wm-line)] bg-[rgba(12,14,21,0.8)] md:block">
        <div className="grid grid-cols-2 gap-px bg-[var(--wm-line)]">
          <div className="bg-[#090b11] p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">
              What the wait-ad market often ships
            </p>
          </div>
          <div className="bg-[#0d1512] p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">What WaitMint actually is</p>
          </div>
          {ITEMS.map(([left, right]) => (
            <div key={left} className="contents">
              <p className="bg-[#090b11] px-6 py-4 text-sm leading-6 text-[var(--wm-muted)]">{left}</p>
              <p className="bg-[#0d1512] px-6 py-4 text-sm leading-6 text-[var(--wm-text)]">{right}</p>
            </div>
          ))}
        </div>
      </div>
      <ul className="grid gap-3 md:hidden">
        {ITEMS.map(([left, right]) => (
          <li key={left} className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--wm-muted)]">{left}</p>
            <p className="mt-2 text-sm leading-6">{right}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
