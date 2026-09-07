import { AmbientField } from "@/components/marketing/ambient-field";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { getSessionUser } from "@/lib/supabase/server";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getSessionUser();
  return (
    <div className="relative flex min-h-full flex-col">
      <AmbientField />
      <SiteHeader signedIn={Boolean(user)} />
      <div className="relative flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
