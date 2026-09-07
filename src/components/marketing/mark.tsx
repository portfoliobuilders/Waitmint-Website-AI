export function WaitMintMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center rounded-lg bg-[var(--wm-mint)] text-[#04110c] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" fill="none" aria-hidden>
        <path
          d="M7 4.5h10L12 12 7 4.5Zm0 15h10L12 12 7 19.5Z"
          fill="currentColor"
          fillOpacity="0.92"
        />
        <path d="M8.2 8.2h7.6M8.2 15.8h7.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}
