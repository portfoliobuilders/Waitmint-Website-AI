import Link from "next/link";
import { listBlogPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Editorial notes on AI wait-time monetization, Verified Wait™, and the privacy boundary WaitMint will not cross.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function BlogIndexPage() {
  const posts = listBlogPosts();

  return (
    <main className="overflow-x-hidden">
      <section className="wm-hero wm-grid overflow-hidden border-b border-[var(--wm-line)]">
        <div className="wm-hero-veil" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="wm-kicker">Journal</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">Blog</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Three notes on the product as it actually works. No ratings, no invented case studies,
            no weekly earnings recaps.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <ul className="grid gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <article className="rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">
                  {formatDate(post.date)} · {post.readingMinutes} min read
                </p>
                <h2 className="font-display mt-3 text-3xl">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[var(--wm-mint)]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--wm-muted)]">{post.description}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex min-h-11 items-center text-sm text-[var(--wm-aqua)]"
                >
                  Read the note
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
