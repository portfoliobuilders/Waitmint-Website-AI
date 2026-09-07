"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup" | "forgot";

export function AuthForm({
  mode,
  nextPath = "/dashboard",
}: {
  mode: Mode;
  nextPath?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function withClient() {
    const supabase = createBrowserSupabase();
    if (!supabase) {
      setError("Authentication is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      return null;
    }
    return supabase;
  }

  async function onPassword(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const supabase = await withClient();
    if (!supabase) return;
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setPending(true);
    try {
      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        router.replace(nextPath);
        router.refresh();
        return;
      }
      if (mode === "signup") {
        const { error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/onboarding` },
        });
        if (authError) throw authError;
        setMessage("Check your email to verify your account, then continue to onboarding.");
        return;
      }
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/security`,
      });
      if (authError) throw authError;
      setMessage("If an account exists, a reset link is on its way.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  async function onGoogle() {
    const supabase = await withClient();
    if (!supabase) return;
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${nextPath}` },
    });
    if (authError) setError(authError.message);
  }

  async function onMagicLink() {
    const supabase = await withClient();
    if (!supabase) return;
    setPending(true);
    setError(null);
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${nextPath}` },
    });
    setPending(false);
    if (authError) {
      setError(authError.message);
      return;
    }
    setMessage("Check your email for a magic link.");
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
      <h1 className="font-display text-3xl">
        {mode === "login" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
      </h1>
      <p className="mt-2 text-sm text-[var(--wm-muted)]">
        One WaitMint identity for earning, advertising, and admin access.
      </p>
      <form className="mt-8 space-y-4" onSubmit={onPassword}>
        <label className="block text-sm">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
          />
        </label>
        {mode !== "forgot" ? (
          <label className="block text-sm">
            Password
            <input
              type="password"
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
            />
          </label>
        ) : null}
        {mode === "signup" ? (
          <label className="block text-sm">
            Confirm password
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
            />
          </label>
        ) : null}
        {error ? <p className="text-sm text-[var(--wm-danger)]">{error}</p> : null}
        {message ? <p className="text-sm text-[var(--wm-mint)]">{message}</p> : null}
        <Button type="submit" disabled={pending} className="w-full">
          {mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
        </Button>
      </form>
      {mode !== "forgot" ? (
        <div className="mt-4 space-y-3">
          <Button type="button" variant="secondary" className="w-full" onClick={onGoogle}>
            Continue with Google
          </Button>
          <p className="text-center text-xs text-[var(--wm-muted)]">
            Google works after the WaitMint Auth Google provider is enabled. Email is already on.
          </p>
          <Button type="button" variant="ghost" className="w-full" onClick={onMagicLink} disabled={!email || pending}>
            Email me a magic link
          </Button>
        </div>
      ) : null}
      <p className="mt-6 text-sm text-[var(--wm-muted)]">
        {mode === "login" ? (
          <>
            New here? <Link href="/signup" className="text-[var(--wm-mint)]">Create an account</Link>
            {" · "}
            <Link href="/forgot-password" className="text-[var(--wm-mint)]">Forgot password</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/login" className="text-[var(--wm-mint)]">Sign in</Link>
          </>
        )}
      </p>
    </div>
  );
}
