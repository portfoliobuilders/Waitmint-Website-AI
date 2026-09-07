import type { ReactNode } from "react";
import { DataGate } from "@/components/app/data-gate";

export function ConsoleGate({
  title,
  body,
  kind,
  message,
  children,
}: {
  title: string;
  body: string;
  kind: "unconfigured" | "offline" | "unauthorized" | "empty" | "forbidden";
  message?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">{body}</p>
      <div className="mt-8">
        <DataGate kind={kind} message={message}>
          {children}
        </DataGate>
      </div>
    </div>
  );
}
