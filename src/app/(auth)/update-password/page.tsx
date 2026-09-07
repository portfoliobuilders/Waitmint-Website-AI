import { AuthScreen } from "@/components/auth/auth-screen";
import { UpdatePasswordForm } from "@/components/auth/update-password-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Update password",
  description: "Set a new WaitMint password after a recovery email.",
  path: "/update-password",
  index: false,
});

export default function UpdatePasswordPage() {
  return (
    <AuthScreen>
      <UpdatePasswordForm />
    </AuthScreen>
  );
}
