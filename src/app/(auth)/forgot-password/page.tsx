import { AuthForm } from "@/components/auth/auth-form";
import { AuthScreen } from "@/components/auth/auth-screen";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Forgot password",
  description: "Reset your WaitMint password.",
  path: "/forgot-password",
  index: false,
});

export default function ForgotPasswordPage() {
  return (
    <AuthScreen>
      <AuthForm mode="forgot" />
    </AuthScreen>
  );
}
