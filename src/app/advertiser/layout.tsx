import { AppShell } from "@/components/app/app-shell";
import { requireAdvertiser } from "@/lib/auth/guards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Advertise",
  description: "Buy verified AI attention.",
  path: "/advertiser",
  index: false,
});

export default async function AdvertiserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, me } = await requireAdvertiser();
  return (
    <AppShell
      area="advertise"
      email={user?.email}
      canAdvertise
      isAdmin={me?.actor.isAdmin}
    >
      {children}
    </AppShell>
  );
}
