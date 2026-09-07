import { AuthStage } from "@/components/auth/auth-stage";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import type { ReactNode } from "react";

export function AuthScreen({
  signedIn = false,
  children,
}: {
  signedIn?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader signedIn={signedIn} />
      <main className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <AuthStage />
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
