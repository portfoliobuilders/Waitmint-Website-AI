import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  body,
  tone = "default",
  className,
  children,
}: {
  title: string;
  body: string;
  tone?: "default" | "offline" | "warning";
  className?: string;
  children?: ReactNode;
}) {
  const border =
    tone === "offline"
      ? "border-[var(--wm-warn)]/30"
      : tone === "warning"
        ? "border-[var(--wm-aqua)]/30"
        : "border-[var(--wm-line)]";
  return (
    <div className={cn("rounded-2xl border bg-[var(--wm-bg-elevated)] p-8", border, className)}>
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
