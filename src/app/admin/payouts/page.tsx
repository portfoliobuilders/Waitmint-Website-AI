export default function AdminPayoutsPage() {
  return (
    <div>
      <h1 className="font-display text-4xl">Payouts</h1>
      <p className="mt-3 max-w-2xl text-sm text-[var(--wm-muted)]">
        User redemptions are Exchange rows. Resolution must go through the existing redemption workflow.
        This page does not mark payouts paid in the website database.
      </p>
    </div>
  );
}
