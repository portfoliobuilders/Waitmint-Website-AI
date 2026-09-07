import { formatInrFromMicropaise } from "@/lib/money/micropaise";
import { Card, StatCard } from "@/components/ui/card";

export function WalletHero({
  available,
  lifetime,
  pending,
  withdrawn,
  live,
}: {
  available: number | null;
  lifetime: number | null;
  pending: number | null;
  withdrawn: number | null;
  live: boolean;
}) {
  return (
    <div>
      <Card className="wm-glow overflow-hidden">
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">
          {live ? "Exchange wallet" : "Wallet preview"}
        </p>
        <p className="font-display mt-3 text-5xl sm:text-6xl">{formatInrFromMicropaise(available)}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--wm-muted)]">
          {live
            ? "This is the Exchange wallet. The website does not keep a second balance."
            : "Live available balance appears only after the hosted Exchange answers. Sample earnings are never shown."}
        </p>
      </Card>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Lifetime earned" value={formatInrFromMicropaise(lifetime)} />
        <StatCard
          label="Pending"
          value={pending !== null && pending > 0 ? formatInrFromMicropaise(pending) : "—"}
          hint="Only shown when the Exchange has real pending state."
        />
        <StatCard label="Withdrawn" value={formatInrFromMicropaise(withdrawn)} />
      </div>
    </div>
  );
}
