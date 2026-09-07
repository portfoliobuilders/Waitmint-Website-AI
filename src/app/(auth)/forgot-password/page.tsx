import { AuthForm } from "@/components/auth/auth-form";
import { SiteHeader } from "@/components/marketing/site-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Forgot password",
  description: "Reset your WaitMint password.",
  path: "/forgot-password",
  index: false,
});

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-full">
      <SiteHeader signedIn={false} />
      <main className="px-4 py-16">
        <AuthForm mode="forgot" />
      </main>
    </div>
  );
}
