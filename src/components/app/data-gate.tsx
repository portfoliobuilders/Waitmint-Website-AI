import type { ReactNode } from "react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

export function DataGate({
  kind,
  message,
  emptyTitle,
  emptyBody,
  children,
}: {
  kind: "unconfigured" | "offline" | "unauthorized" | "empty" | "forbidden";
  message?: string;
  emptyTitle?: string;
  emptyBody?: string;
  children?: ReactNode;
}) {
  if (kind === "unconfigured") {
    return (
      <EmptyState
        title="Connect the Exchange to see live numbers"
        body="This dashboard reads wallets, campaigns, and settlements from the WaitMint API. Add WAITMINT_API_URL and Supabase Auth keys locally. Sample earnings are never shown."
        tone="warning"
      />
    );
  }
  if (kind === "offline") {
    return (
      <EmptyState
        title="Exchange unreachable"
        body={message || "The WaitMint API did not respond. Balances are not estimated offline."}
        tone="offline"
      />
    );
  }
  if (kind === "unauthorized") {
    return (
      <EmptyState title="Session expired" body="Sign in again to load your ledger.">
        <Link href="/login" className="inline-flex min-h-11 items-center rounded-full bg-[var(--wm-mint)] px-5 text-sm text-[#04110c]">
          Sign in
        </Link>
      </EmptyState>
    );
  }
  if (kind === "forbidden") {
    return (
      <EmptyState
        title="Admin access required"
        body="This area is authorized on the server using your WaitMint profile role. Frontend hiding is not enough."
      />
    );
  }
  return (
    <EmptyState
      title={emptyTitle || "Nothing here yet"}
      body={emptyBody || "When the Exchange records a qualifying settlement, it will appear here."}
    >
      {children}
    </EmptyState>
  );
}
