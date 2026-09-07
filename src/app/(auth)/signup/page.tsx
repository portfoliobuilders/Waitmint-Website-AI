import { AuthForm } from "@/components/auth/auth-form";
import { SiteHeader } from "@/components/marketing/site-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign up",
  description: "Create your WaitMint account.",
  path: "/signup",
  index: false,
});

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/onboarding";
  return (
    <div className="min-h-full">
      <SiteHeader signedIn={false} />
      <main className="px-4 py-16">
        <AuthForm mode="signup" nextPath={nextPath} />
      </main>
    </div>
  );
}
