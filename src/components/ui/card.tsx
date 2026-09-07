import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6",
        className,
      )}
      {...props}
    />
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">{label}</p>
      <p className="mt-3 font-display text-3xl tracking-tight">{value}</p>
      {hint ? <p className="mt-2 text-sm text-[var(--wm-muted)]">{hint}</p> : null}
    </Card>
  );
}
