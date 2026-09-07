import { AppShell } from "@/components/app/app-shell";
import { requireMe } from "@/lib/auth/guards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dashboard",
  description: "Your WaitMint wallet and activity.",
  path: "/dashboard",
  index: false,
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, me } = await requireMe();
  return (
    <AppShell
      area="earn"
      email={user?.email}
      canAdvertise={Boolean(me?.onboarded || me?.org)}
      isAdmin={me?.actor.isAdmin}
    >
      {children}
    </AppShell>
  );
}
