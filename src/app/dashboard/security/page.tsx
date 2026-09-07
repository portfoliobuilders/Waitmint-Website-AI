import { requireUser } from "@/lib/auth/guards";

export default async function SecurityPage() {
  await requireUser();
  return (
    <div>
      <h1 className="font-display text-4xl">Security</h1>
      <ul className="mt-8 list-disc space-y-3 pl-5 text-sm text-[var(--wm-muted)]">
        <li>Passwords are stored by WaitMint Auth (Supabase), not this website.</li>
        <li>Email sign-in is on. Google works only after the Google provider is enabled.</li>
        <li>Use the forgot-password flow to rotate credentials.</li>
        <li>Extension link codes are one-time, hashed, and short-lived. They map omniUserId; they do not delete it.</li>
        <li>SDK and App will use this same Auth. They will not keep a second credential store.</li>
        <li>Service-role keys never ship to the browser or extension.</li>
      </ul>
    </div>
  );
}
