"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError("Authentication is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return;
    }
    setPending(true);
    const { error: authError } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    router.replace("/dashboard/security");
    router.refresh();
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
      <h1 className="font-display text-3xl">Set a new password</h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        This updates WaitMint Auth. It does not change Exchange balances or linked installs.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm">
          New password
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
          />
        </label>
        <label className="block text-sm">
          Confirm password
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
          />
        </label>
        {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full">
          Save password
        </Button>
      </form>
    </div>
  );
}
