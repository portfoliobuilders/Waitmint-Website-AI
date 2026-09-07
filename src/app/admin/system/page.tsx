export default function AdminSystemPage() {
  return (
    <div>
      <h1 className="font-display text-4xl">System</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-sm text-[var(--wm-muted)]">
        <li>Supabase/Postgres is the financial source of truth.</li>
        <li>SQLite in backend-core is legacy only.</li>
        <li>Do not reset the production campaign named ChatGPT live paid inventory.</li>
        <li>House inventory settles at ₹0.</li>
      </ul>
    </div>
  );
}
