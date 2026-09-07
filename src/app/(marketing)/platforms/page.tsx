import { EmptyState } from "@/components/ui/empty-state";
import { getPublicInventory } from "@/lib/api/waitmint";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Platforms",
  description:
    "Live WaitMint inventory surfaces, grouped by verification status. ChatGPT is the documented live-verified surface unless the Exchange says otherwise.",
  path: "/platforms",
});

export const dynamic = "force-dynamic";

type StatusKey = "live_verified" | "code_ready" | "coming";

type SurfaceCard = {
  surfaceKey: string;
  name: string;
  category?: string;
  servingEnabled: boolean;
  verificationStatus: StatusKey;
};

const STATUS_META: Record<StatusKey, { label: string; hint: string }> = {
  live_verified: {
    label: "Live Verified",
    hint: "Human-verified inventory. Eligible for paid settlement when serving is enabled.",
  },
  code_ready: {
    label: "Testing",
    hint: "Adapter exists in code. Not marketed as live until verification says so.",
  },
  coming: {
    label: "Coming Soon",
    hint: "Documented future surface. Not live and not a paid claim.",
  },
};

const STATUS_ORDER: StatusKey[] = ["live_verified", "code_ready", "coming"];

function asString(row: Record<string, unknown>, ...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return undefined;
}

function parseSurface(row: Record<string, unknown>): SurfaceCard | null {
  const surfaceKey = asString(row, "surfaceKey", "surface_key");
  const name = asString(row, "name");
  const statusRaw = asString(row, "verificationStatus", "verification_status");
  if (!surfaceKey || !name || !statusRaw) return null;
  if (statusRaw !== "live_verified" && statusRaw !== "code_ready" && statusRaw !== "coming") {
    return null;
  }
  return {
    surfaceKey,
    name,
    category: asString(row, "category"),
    servingEnabled: row.servingEnabled === true || row.serving_enabled === true,
    verificationStatus: statusRaw,
  };
}

function categoryLabel(category?: string): string | null {
  switch (category) {
    case "browser_ai":
      return "Browser AI";
    case "developer_ide":
      return "Developer / IDE";
    case "agent_cli":
      return "Agent / CLI";
    case "partner_apps":
      return "Partner apps";
    default:
      return category ?? null;
  }
}

function fallbackChatgpt(): SurfaceCard {
  return {
    surfaceKey: "chatgpt.com",
    name: "ChatGPT",
    category: "browser_ai",
    servingEnabled: true,
    verificationStatus: "live_verified",
  };
}

export default async function PlatformsPage() {
  const result = await getPublicInventory();
  const offline = !result.ok;
  const rawInventory = result.ok
    ? Array.isArray(result.data.inventory)
      ? result.data.inventory
      : []
    : [];
  const surfaces = offline ? [fallbackChatgpt()] : rawInventory.map(parseSurface).filter((row): row is SurfaceCard => row !== null);

  const grouped: Record<StatusKey, SurfaceCard[]> = {
    live_verified: [],
    code_ready: [],
    coming: [],
  };
  for (const surface of surfaces) {
    grouped[surface.verificationStatus].push(surface);
  }

  return (
    <main className="overflow-x-hidden">
      <section className="wm-grid border-b border-[var(--wm-line)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--wm-mint)]">Inventory</p>
          <h1 className="font-display mt-5 max-w-4xl text-5xl leading-[1.05] sm:text-6xl">
            Platforms
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--wm-muted)]">
            Surfaces are grouped by verification status from the WaitMint Exchange. Adapters that
            exist in code are not automatically live. We do not claim a product is verified unless
            inventory says so.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-14 px-4 py-20 sm:px-6">
        {offline ? (
          <EmptyState
            tone="offline"
            title="Inventory API is offline"
            body="The Exchange inventory endpoint is unreachable or not configured. Architecture documents ChatGPT as the only live-verified surface. Other products are not shown as live, testing, or coming soon from this fallback."
          />
        ) : null}

        {STATUS_ORDER.map((status) => {
          const items = grouped[status];
          if (offline && status !== "live_verified") return null;
          return (
            <div key={status}>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--wm-mint)]">
                {STATUS_META[status].label}
              </p>
              <h2 className="font-display mt-2 text-3xl">{STATUS_META[status].label}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
                {STATUS_META[status].hint}
              </p>
              {items.length === 0 ? (
                <p className="mt-6 text-sm text-[var(--wm-muted)]">No surfaces in this status.</p>
              ) : (
                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((surface) => (
                    <li
                      key={surface.surfaceKey}
                      className="rounded-2xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6"
                    >
                      <p className="text-lg font-medium">{surface.name}</p>
                      <p className="mt-1 font-mono text-xs text-[var(--wm-muted)]">{surface.surfaceKey}</p>
                      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-[var(--wm-aqua)]">
                        {STATUS_META[surface.verificationStatus].label}
                      </p>
                      {categoryLabel(surface.category) ? (
                        <p className="mt-2 text-sm text-[var(--wm-muted)]">
                          {categoryLabel(surface.category)}
                        </p>
                      ) : null}
                      {offline ? (
                        <p className="mt-3 text-sm leading-6 text-[var(--wm-muted)]">
                          Documented live-verified surface from WaitMint architecture. Live serving
                          flags are not confirmed while the API is offline.
                        </p>
                      ) : (
                        <p className="mt-3 text-sm text-[var(--wm-muted)]">
                          {surface.servingEnabled ? "Serving enabled" : "Serving disabled"}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
