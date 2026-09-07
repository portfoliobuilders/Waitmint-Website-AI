import { AppShell } from "@/components/app/app-shell";
import { DataGate } from "@/components/app/data-gate";
import { requireAdmin } from "@/lib/auth/guards";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Admin",
  description: "WaitMint operations.",
  path: "/admin",
  index: false,
});

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, me, isAdmin, configured } = await requireAdmin();
  if (configured && user && !isAdmin) {
    return <DataGate kind="forbidden" />;
  }
  return (
    <AppShell area="admin" email={user?.email} canAdvertise isAdmin>
      {me || !configured ? children : <DataGate kind="offline" message="Admin role could not be confirmed by the Exchange." />}
    </AppShell>
  );
}
