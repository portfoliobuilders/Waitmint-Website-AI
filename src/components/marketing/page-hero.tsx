export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="wm-hero wm-grid overflow-hidden border-b border-[var(--wm-line)]">
      <div className="wm-hero-veil" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="wm-kicker">{kicker}</p>
        <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
