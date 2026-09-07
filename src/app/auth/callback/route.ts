import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") || "/dashboard";
  const origin = url.origin;

  if (code) {
    const supabase = await createServerSupabase();
    if (supabase) {
      await supabase.auth.exchangeCodeForSession(code);
    }
  }

  const requested = next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const safeNext = type === "recovery" ? "/update-password" : requested;
  return NextResponse.redirect(`${origin}${safeNext}`);
}
