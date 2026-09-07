import { OnboardingForm } from "@/components/advertiser/onboarding-form";

export default function AdvertiserOnboardingPage() {
  return (
    <div>
      <h1 className="font-display text-4xl">Advertiser onboarding</h1>
      <p className="mt-2 max-w-xl text-sm text-[var(--wm-muted)]">
        Creates an organization on the existing Exchange. No second advertiser ledger is created.
      </p>
      <OnboardingForm />
    </div>
  );
}
