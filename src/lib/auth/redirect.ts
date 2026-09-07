import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/config";

export async function redirectIfSignedIn(nextPath: string) {
  if (!supabaseConfigured()) return;
  const { user } = await getSessionUser();
  if (user) redirect(nextPath);
}
