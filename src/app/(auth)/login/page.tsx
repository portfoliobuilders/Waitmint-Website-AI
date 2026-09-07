import { AuthForm } from "@/components/auth/auth-form";
import { SiteHeader } from "@/components/marketing/site-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Login",
  description: "Sign in to your WaitMint account.",
  path: "/login",
  index: false,
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/dashboard";
  return (
    <div className="min-h-full">
      <SiteHeader signedIn={false} />
      <main className="px-4 py-16">
        <AuthForm mode="login" nextPath={nextPath} />
      </main>
    </div>
  );
}
