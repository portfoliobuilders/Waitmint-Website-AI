import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function PrimaryAnchor({ className, ...props }: ComponentProps<"a">) {
  return <a {...props} className={cn("wm-btn wm-btn-primary", className)} />;
}

export function GhostLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={cn("wm-btn wm-btn-ghost", className)} />;
}

export function PrimaryLink({ className, ...props }: ComponentProps<typeof Link>) {
  return <Link {...props} className={cn("wm-btn wm-btn-primary", className)} />;
}
