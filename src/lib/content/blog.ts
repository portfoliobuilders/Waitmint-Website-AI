export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  blocks: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-ai-wait-time-monetization",
    title: "What is AI wait-time monetization?",
    description:
      "Eligible AI generation waits can become verified advertising attention. Earnings exist only when an impression qualifies and settles.",
    date: "2026-08-18",
    readingMinutes: 6,
    blocks: [
      {
        type: "p",
        text: "Every time an AI assistant is thinking — generating code, running a tool, or streaming a response — there can be a short wait. That wait is real attention. The person is still in the product. The tab is often visible. The work is not finished yet.",
      },
      {
        type: "p",
        text: "AI wait-time monetization turns eligible moments in that wait into value through small, clearly labelled sponsored placements. WaitMint does this without asking the user to click a claim button, complete a survey, or leave the AI product they came to use.",
      },
      { type: "h2", text: "A wait is not an earning" },
      {
        type: "p",
        text: "WaitMint does not pay simply because time passed. A generation can be too short. A tab can be hidden. A user can dismiss the card. Qualification can fail. Settlement can fail. House inventory settles at ₹0. In every one of those cases, there is no advertiser charge and no user earning.",
      },
      {
        type: "p",
        text: "The product line is exact: no qualification, no charge, no earning. That is the difference between a wait-time ad exchange and a points game.",
      },
      { type: "h2", text: "What users receive" },
      {
        type: "p",
        text: "When an impression meets WaitMint’s verification requirements and settles, the user receives 60% of the advertiser-funded revenue. WaitMint receives 40%. The split is applied to settled qualifying impressions, not to estimated time and not to a browser-side timer.",
      },
      {
        type: "ul",
        items: [
          "Use supported AI products normally.",
          "During an eligible wait, one clearly labelled sponsored placement may appear.",
          "If the impression qualifies, advertiser funds settle: 60% user, 40% WaitMint.",
        ],
      },
      { type: "h2", text: "What this is not" },
      {
        type: "p",
        text: "It is not a guaranteed daily reward. It is not a streak, a referral loop, or a crypto token. It is not permission to read prompts. Targeting is inventory context — for example, a ChatGPT wait — not the meaning of the conversation.",
      },
      {
        type: "p",
        text: "The public website can explain and display this loop. It does not manufacture balances. Financial truth stays on the WaitMint Exchange as integer micropaise.",
      },
    ],
  },
  {
    slug: "verified-wait-is-financial-infrastructure",
    title: "Verified Wait™ is financial infrastructure",
    description:
      "Verified AI attention is a settlement path, not a points balance. Qualification, viewability, and the Exchange ledger decide what money exists.",
    date: "2026-08-25",
    readingMinutes: 7,
    blocks: [
      {
        type: "p",
        text: "Verified Wait™ is WaitMint’s name for a wait that became advertiser-funded attention and then settled. Verified AI Attention is the same idea from the buyer’s side: you are buying an impression that passed the qualification path, not a page view and not a timer.",
      },
      {
        type: "p",
        text: "That path is intentionally strict. Generation starts. A wait is detected. An ad may be returned. The card renders. The tab must be visible. Viewability has to clear its threshold. Only then can the impression qualify and settle. Sixty percent goes to the user. Forty percent stays with WaitMint.",
      },
      { type: "h2", text: "Why the ledger is not in the browser" },
      {
        type: "p",
        text: "A browser can observe a wait. It cannot be trusted as a bank. WaitMint.ai is the public website and account platform. The WaitMint Exchange is the settlement engine. Wallets, ledger entries, campaign spend, and impression settlement live there as integer BIGINT micropaise — 1 INR equals 100,000 micropaise.",
      },
      {
        type: "p",
        text: "This website formats those integers for humans. It does not create a second wallet table. It does not recompute balances from impressions or elapsed seconds. If the Exchange is offline, the honest message is that the Exchange is offline — not a cached fantasy balance.",
      },
      { type: "h2", text: "What advertisers pay for" },
      {
        type: "p",
        text: "Advertisers set a CPM and a budget. They pay only when an impression qualifies. House inventory exists so the product can still show a labelled card when no paid campaign should fill; those impressions settle at ₹0. Duplicate qualification must not debit twice. Settlement is database-atomic on the Exchange.",
      },
      {
        type: "ul",
        items: [
          "One AI generation → at most one ad → at most one paid impression.",
          "Hidden tab, dismissed card, failed viewability, or failed settlement: ₹0.",
          "Private Pilot Funding is manual admin credit. There is no claimed payment gateway in this phase.",
        ],
      },
      { type: "h2", text: "Honesty over theatre" },
      {
        type: "p",
        text: "ChatGPT is the only documented live-verified surface unless the live inventory API says otherwise. Adapters that exist in code are not automatically verified inventory. Campaigns can target a surface. They should not be marketed as live on that surface until verification says they are.",
      },
      {
        type: "p",
        text: "Verified attention is slower to sell than a banner network. It is also something a ledger can stand behind.",
      },
    ],
  },
  {
    slug: "your-conversations-stay-yours",
    title: "Your conversations stay yours",
    description:
      "WaitMint does not read prompts, answers, conversation meaning, or uploaded files. It needs generation state, wait sessions, viewability, and settlement metadata.",
    date: "2026-09-02",
    readingMinutes: 5,
    blocks: [
      {
        type: "p",
        text: "The trust problem in AI advertising is obvious: the most valuable context is also the most private. A prompt can contain source code, a medical question, a business plan, or a child’s homework. WaitMint is not allowed to treat that text as targeting fuel.",
      },
      {
        type: "p",
        text: "The product rule is the same in the extension, the Exchange, and this website: do not read ChatGPT or Claude prompts, answers, conversation text, or general browsing history. Targeting is inventory and surface context — “this is a ChatGPT wait” — not conversation meaning.",
      },
      { type: "h2", text: "What WaitMint does not read" },
      {
        type: "ul",
        items: [
          "Prompts you type into a supported AI product.",
          "AI responses, streamed tokens, or conversation meaning.",
          "Uploaded file contents.",
          "General browsing history outside the wait-detection path.",
        ],
      },
      { type: "h2", text: "What WaitMint needs" },
      {
        type: "ul",
        items: [
          "Generation state: that a supported product is actually producing a response.",
          "Wait sessions: a bounded session so one generation cannot mint unlimited impressions.",
          "Viewability: the tab is visible and the placement met the threshold.",
          "Settlement metadata: enough to debit an advertiser once and credit a user once.",
        ],
      },
      { type: "h2", text: "Why the boundary is part of the money model" },
      {
        type: "p",
        text: "If WaitMint read prompts, it could pretend to be a smarter ad network. It would also become a place that stores the most sensitive text a person writes. That is a different company. WaitMint sells verified wait-time attention. The Exchange can audit whether an impression qualified. It does not need the essay that caused the wait.",
      },
      {
        type: "p",
        text: "Account data on WaitMint.ai is ordinary: email for sign-in, linked extension installs, and the balances the Exchange already keeps. Redemption details exist only when a user asks for a Pilot Payout. None of that is a license to open the conversation.",
      },
    ],
  },
];

export function listBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
