import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/config";
import { callWaitmint } from "@/lib/api/waitmint";
import type { MePayload } from "@/lib/api/types";

export async function requireUser() {
  if (!supabaseConfigured()) {
    return { user: null, session: null, configured: false as const };
  }
  const { user, session } = await getSessionUser();
  if (!user) redirect("/login");
  return { user, session, configured: true as const };
}

export async function requireMe() {
  const auth = await requireUser();
  if (!auth.configured || !auth.session?.access_token) {
    return { ...auth, me: null as MePayload | null, meError: "unconfigured" as const };
  }
  const result = await callWaitmint<MePayload>("/api/v1/me", {
    accessToken: auth.session.access_token,
  });
  if (result.ok) {
    return { ...auth, me: result.data, meError: null };
  }
  return { ...auth, me: null as MePayload | null, meError: result.kind };
}

export async function requireAdmin() {
  const payload = await requireMe();
  const isAdmin = payload.me?.actor.isAdmin === true;
  if (payload.configured && payload.user && payload.me && !isAdmin) {
    redirect("/dashboard");
  }
  return { ...payload, isAdmin };
}

export async function requireAdvertiser() {
  const payload = await requireMe();
  return payload;
}
