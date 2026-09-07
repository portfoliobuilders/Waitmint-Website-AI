import { FaqList } from "@/components/marketing/faq-list";
import { PageHero } from "@/components/marketing/page-hero";
import { GhostLink, PrimaryAnchor } from "@/components/marketing/cta";
import { chromeExtensionUrl, siteConfig, USER_SHARE_PERCENT } from "@/lib/config";
import { FAQS } from "@/lib/content/faqs";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about WaitMint earnings, qualification, privacy, platforms, advertiser billing, and the Exchange ledger.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([...FAQS])) }}
      />
      <PageHero kicker="Questions" title="FAQ">
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
          Direct answers from the same rules as the homepage: {siteConfig.qualificationLine} You
          receive {USER_SHARE_PERCENT}% of qualifying settled revenue.
        </p>
      </PageHero>

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <FaqList />
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <GhostLink href="/trust">Trust Center</GhostLink>
          <PrimaryAnchor href={chromeExtensionUrl()}>Add WaitMint to Chrome</PrimaryAnchor>
        </div>
      </section>
    </main>
  );
}
