import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { redirectIfSignedIn } from "@/lib/auth/redirect";
import { safeNextPath } from "@/lib/auth/paths";
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
  const nextPath = safeNextPath(params.next, "/dashboard");
  await redirectIfSignedIn(nextPath);
  return (
    <AuthScreen>
      <AuthForm mode="login" nextPath={nextPath} />
    </AuthScreen>
  );
}
