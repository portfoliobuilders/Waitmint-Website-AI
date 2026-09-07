import { GhostLink, PrimaryAnchor, PrimaryLink } from "@/components/marketing/cta";
import { chromeExtensionUrl } from "@/lib/config";

export function CtaBand({
  title,
  body,
  primary,
}: {
  title: string;
  body: string;
  primary?: "extension" | "signup" | "advertise";
}) {
  const store = chromeExtensionUrl();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[1.8rem] border border-[var(--wm-line)] bg-[#080a10] p-8 sm:p-12">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-[var(--wm-mint)]/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-[var(--wm-gold)]/10 blur-3xl" />
        <h2 className="font-display relative text-3xl sm:text-4xl">{title}</h2>
        <p className="relative mt-4 max-w-2xl text-[var(--wm-muted)]">{body}</p>
        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
          {primary === "advertise" ? (
            <PrimaryLink href="/signup?next=/advertiser">Create advertiser account</PrimaryLink>
          ) : primary === "signup" ? (
            <PrimaryLink href="/signup">Create your WaitMint account</PrimaryLink>
          ) : (
            <PrimaryAnchor href={store}>Add WaitMint to Chrome</PrimaryAnchor>
          )}
          <GhostLink href="/trust">Open the Trust Center</GhostLink>
        </div>
      </div>
    </section>
  );
}
