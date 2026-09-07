export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="font-display text-4xl">Users</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--wm-muted)]">
        Search and inspect users through the Exchange. This console does not offer a casual balance edit.
        Any future adjustment must write an immutable ledger row with admin identity and reason.
      </p>
    </div>
  );
}
