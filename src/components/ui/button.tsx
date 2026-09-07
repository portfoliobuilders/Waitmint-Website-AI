import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-[var(--wm-mint)] text-[#04110c] hover:brightness-110 disabled:opacity-50",
    secondary:
      "border border-[var(--wm-line-strong)] bg-white/3 text-[var(--wm-text)] hover:bg-white/6",
    ghost: "text-[var(--wm-text)] hover:bg-white/5",
    danger: "bg-[var(--wm-danger)] text-[#1a0508] hover:brightness-110",
  };
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition disabled:cursor-not-allowed",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
