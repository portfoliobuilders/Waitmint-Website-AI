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
    <div className="flex min-h-full flex-col">
      <SiteHeader signedIn={Boolean(user)} />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}
