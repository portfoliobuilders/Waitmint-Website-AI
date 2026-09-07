import { FAQS } from "@/lib/content/faqs";

export function FaqList({ items = FAQS }: { items?: readonly { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-5 transition-colors open:border-[var(--wm-mint)]/25"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium">
            <span>{item.q}</span>
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-full border border-[var(--wm-line)] text-[var(--wm-mint)] transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm leading-7 text-[var(--wm-muted)]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
