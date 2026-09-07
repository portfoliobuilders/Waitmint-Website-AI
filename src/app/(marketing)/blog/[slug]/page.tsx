import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, listBlogPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return listBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return pageMetadata({
      title: "Note not found",
      description: "This WaitMint blog note does not exist.",
      path: `/blog/${slug}`,
      index: false,
    });
  }
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="overflow-x-hidden">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">WaitMint journal</p>
        <h1 className="font-display mt-5 text-5xl leading-[1.05]">{post.title}</h1>
        <p className="mt-4 text-sm text-[var(--wm-muted)]">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
        <p className="mt-6 text-lg leading-8 text-[var(--wm-muted)]">{post.description}</p>
        <div className="mt-12 space-y-6">
          {post.blocks.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2 key={`${block.text}-${index}`} className="font-display pt-4 text-3xl">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={index} className="list-disc space-y-2 pl-5 text-base leading-7 text-[var(--wm-muted)]">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-base leading-8 text-[var(--wm-text)]">
                {block.text}
              </p>
            );
          })}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[var(--wm-line)] pt-8 sm:flex-row">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--wm-line-strong)] px-5 text-sm"
          >
            All notes
          </Link>
          <Link
            href="/how-it-works"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--wm-mint)] px-5 text-sm font-medium text-[#04110c]"
          >
            How WaitMint works
          </Link>
        </div>
      </article>
    </main>
  );
}
