export const FAQS = [
  {
    q: "Does WaitMint read my prompts?",
    a: "No. WaitMint does not read prompts, AI responses, conversation meaning, or uploaded file contents. It needs generation state, wait sessions, viewability, and settlement metadata.",
  },
  {
    q: "How do I earn?",
    a: "Add the free Chrome extension, use a supported AI product normally, and keep the tab visible during an eligible wait. If a sponsored placement qualifies and settles, you receive 60% of the advertiser-funded revenue.",
  },
  {
    q: "Why didn’t I earn on a wait?",
    a: "A wait is not an earning. Short waits, hidden tabs, dismissed cards, house inventory, failed qualification, failed settlement, or a generation that ended first all settle at ₹0. No qualification. No charge. No earning.",
  },
  {
    q: "What is a qualifying impression?",
    a: "An impression that completed the Verified Wait™ path: generation started, wait detected, ad returned, rendered, tab visible, viewability threshold, qualified, and settled on the Exchange.",
  },
  {
    q: "How is money split?",
    a: "On each qualifying settled impression, 60% goes to the user and 40% stays with WaitMint. Amounts are integer micropaise. This website formats them; it does not invent them.",
  },
  {
    q: "Which AI products work today?",
    a: "ChatGPT is the documented live-verified surface unless the live inventory API lists others as live_verified. Adapters that exist in code are Testing or Coming Soon until verification says otherwise.",
  },
  {
    q: "Do advertisers pay for every wait?",
    a: "No. Advertisers set a CPM and a budget and pay only when an impression qualifies. House inventory and failed gates do not debit a campaign.",
  },
  {
    q: "Is funding automatic?",
    a: "Not in this phase. Advertiser money enters as Private Pilot Funding — manual admin credit. There is no claimed Stripe, Razorpay, or UPI automation for campaign funding.",
  },
  {
    q: "How do payouts work?",
    a: "Users can request a Pilot Payout with an Amazon voucher or UPI detail. Requests are reviewed manually. Combined balances may include pre-link install funds that have not moved to the signed-in wallet.",
  },
  {
    q: "Where is the ledger?",
    a: "On the WaitMint Exchange, not in this website’s database. WaitMint.ai displays wallets, ledger rows, and campaign spend that the Exchange already recorded.",
  },
  {
    q: "Can I dismiss a sponsored wait?",
    a: "Yes. The placement is labelled and dismissible. Dismissing it means that wait does not qualify. WaitMint will not invent a consolation earning.",
  },
  {
    q: "Is the extension free?",
    a: "Yes. There is no subscription to earn. You receive 60% of qualifying settled revenue. There are no advertised discounts because there is no paid user plan to discount.",
  },
  {
    q: "What about the SDK and the WaitMint app?",
    a: "They are the same WaitMint identity, not extra wallets. The Chrome extension is the live client for wait detection. The SDK is for product teams; the app is a companion. Both open with the hosted Exchange and display Exchange integers only. They are not live store or npm listings today.",
  },
  {
    q: "Where do I connect my browser?",
    a: "Sign in, open Dashboard → Connections, generate a one-time code, and enter it in the extension popup. That maps the install ID to your account. It does not delete omniUserId.",
  },
] as const;
