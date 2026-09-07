"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function RevokeButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function revoke() {
    if (!confirm("Revoke this browser connection?")) return;
    setPending(true);
    await fetch(`/api/waitmint/v1/me/extensions/${id}/revoke`, { method: "POST" });
    setPending(false);
    router.refresh();
  }

  return (
    <Button type="button" variant="secondary" className="mt-3" onClick={revoke} disabled={pending}>
      Revoke connection
    </Button>
  );
}
