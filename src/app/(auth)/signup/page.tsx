import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { redirectIfSignedIn } from "@/lib/auth/redirect";
import { safeNextPath } from "@/lib/auth/paths";
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
  const nextPath = safeNextPath(params.next, "/onboarding");
  await redirectIfSignedIn(nextPath);
  return (
    <AuthScreen>
      <AuthForm mode="signup" nextPath={nextPath} />
    </AuthScreen>
  );
}
