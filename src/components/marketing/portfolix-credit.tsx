import Image from "next/image";

export function PortfolixCredit() {
  return (
    <a
      href="https://portfolix.tech/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-3 text-sm text-[var(--wm-muted)] hover:text-[var(--wm-text)]"
    >
      <Image
        src="/brand/portfolix.png"
        alt="Portfolix"
        width={190}
        height={107}
        className="h-10 w-auto"
      />
      <span>Powered by Portfolix.Tech</span>
    </a>
  );
}
