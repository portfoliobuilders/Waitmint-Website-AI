import { requireUser } from "@/lib/auth/guards";

export default async function SecurityPage() {
  await requireUser();
  return (
    <div>
      <h1 className="font-display text-4xl">Security</h1>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-sm text-[var(--wm-muted)]">
        <li>Passwords are stored by Supabase Auth, not this website.</li>
        <li>Use the forgot-password flow to rotate credentials.</li>
        <li>Extension link codes are one-time, hashed, and short-lived.</li>
        <li>Service-role keys never ship to the browser or extension.</li>
      </ul>
    </div>
  );
}
