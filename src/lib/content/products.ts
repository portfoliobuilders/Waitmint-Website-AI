import { chromeExtensionUrl } from "@/lib/config";

export type ProductStatus = "available" | "waitlist";

export type ProductId = "extension" | "sdk" | "app";

export type WaitMintProduct = {
  id: ProductId;
  name: string;
  shortName: string;
  status: ProductStatus;
  statusLabel: string;
  eyebrow: string;
  summary: string;
  body: string;
  points: string[];
  href: string;
  ctaLabel: string;
  ctaHref: string;
  dashboardHref: string;
};

export const WAITMINT_PRODUCTS: WaitMintProduct[] = [
  {
    id: "extension",
    name: "WaitMint Extension",
    shortName: "Extension",
    status: "available",
    statusLabel: "Available now",
    eyebrow: "Chrome",
    summary: "The live client. Detects eligible AI waits, shows one labelled placement, and maps the install to your account.",
    body: "Add WaitMint to Chrome and keep using supported AI products the way you already do. The extension is a WaitMint client, not a second wallet. Linking maps its install ID (omniUserId) to this account. Old UUIDs are preserved.",
    points: [
      "Free. No subscription to earn.",
      "Does not read prompts, answers, or files.",
      "One labelled placement per eligible wait.",
      "Link code is one-time and expires quickly.",
    ],
    href: "/products#extension",
    ctaLabel: "Add to Chrome",
    ctaHref: chromeExtensionUrl(),
    dashboardHref: "/dashboard/connections#extension",
  },
  {
    id: "sdk",
    name: "WaitMint SDK",
    shortName: "SDK",
    status: "waitlist",
    statusLabel: "Opening with Exchange",
    eyebrow: "Partners & products",
    summary: "Same WaitMint identity inside an AI product or agent. Settlement still happens on the Exchange — never in the SDK.",
    body: "The SDK is how product teams embed verified wait inventory without building a private ledger. It will use the same account, the same qualification rules, and the same 60/40 split. It is not a second wallet and it is not live for settlement until the hosted Exchange enables it.",
    points: [
      "One identity with the website and extension.",
      "No client-side balances or invented earnings.",
      "Qualification stays on the Exchange.",
      "Partner access opens with hosted API, not a public npm drop today.",
    ],
    href: "/products#sdk",
    ctaLabel: "Read SDK plan",
    ctaHref: "/products#sdk",
    dashboardHref: "/dashboard/connections#sdk",
  },
  {
    id: "app",
    name: "WaitMint App",
    shortName: "App",
    status: "waitlist",
    statusLabel: "Companion next",
    eyebrow: "Mobile",
    summary: "Check wallet, connections, and payouts on the same ledger. The app will not keep a second balance.",
    body: "The WaitMint app is a companion to the extension and SDK, not a new money system. When it ships, it will sign in with the same WaitMint Auth and display Exchange integers only. It will not invent earnings offline.",
    points: [
      "Same Auth as waitmintai.vercel.app.",
      "Wallet figures remain Exchange integers.",
      "Payout requests stay Pilot Payout reviews.",
      "Not a live store listing yet.",
    ],
    href: "/products#app",
    ctaLabel: "See the app plan",
    ctaHref: "/products#app",
    dashboardHref: "/dashboard/connections#app",
  },
];

export function productById(id: ProductId): WaitMintProduct {
  const found = WAITMINT_PRODUCTS.find((product) => product.id === id);
  if (!found) throw new Error(`Unknown WaitMint product: ${id}`);
  return found;
}
