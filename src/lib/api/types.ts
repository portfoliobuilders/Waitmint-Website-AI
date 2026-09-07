export type PlatformRole = "user" | "advertiser" | "publisher" | "admin";
export type MemberRole = "owner" | "admin" | "analyst";

export type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
  reason?: string;
};

export type MeActor = {
  profileId: string;
  email: string;
  platformRole: PlatformRole;
  isAdmin: boolean;
  displayName?: string | null;
};

export type OrgContext = {
  organizationId: string;
  advertiserId: string;
  memberRole: MemberRole;
  canWrite: boolean;
} | null;

export type MePayload = {
  actor: MeActor;
  org: OrgContext;
  onboarded: boolean;
  linkedInstallations?: number;
};

export type WalletPayload = {
  availableMicropaise: number;
  pendingMicropaise: number;
  lifetimeEarnedMicropaise: number;
  lifetimePaidMicropaise: number;
  availableRupeesDisplay?: number;
};

export type LedgerEntry = {
  id: string;
  walletId?: string;
  profileId?: string;
  entryType: string;
  amountMicropaise: number;
  createdAt: string;
  platform?: string | null;
  referenceType?: string | null;
  status?: string | null;
};

export type Redemption = {
  id: string;
  amountMicropaise: number;
  method: string;
  detail?: string | null;
  status: string;
  createdAt: string;
  resolvedAt?: string | null;
};

export type ExtensionLink = {
  id: string;
  installationId?: string;
  extensionInstallId: string;
  linkedAt: string;
  lastSeenAt?: string | null;
  revokedAt?: string | null;
  extensionVersion?: string | null;
};

export type LinkTokenPayload = {
  token: string;
  expiresAt: string;
};

export type InventorySurface = {
  surfaceKey: string;
  name: string;
  category?: string;
  servingEnabled: boolean;
  verificationStatus: "live_verified" | "code_ready" | "coming" | string;
  sortOrder?: number;
};

export type CampaignStatus =
  | "draft"
  | "pending_review"
  | "active"
  | "paused"
  | "exhausted"
  | "rejected"
  | "ended";

export type ReviewStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "changes_requested"
  | null;

export type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  reviewStatus?: ReviewStatus;
  cpmMicropaise: number;
  totalBudgetMicropaise: number;
  spentMicropaise: number;
  destinationUrl?: string | null;
  surfaces?: string[];
  headline?: string;
  createdAt?: string;
};

export function linkedExtensionsFromPayload(data: {
  extensions?: ExtensionLink[];
  installations?: ExtensionLink[];
  links?: ExtensionLink[];
} | null | undefined): ExtensionLink[] {
  return data?.extensions ?? data?.installations ?? data?.links ?? [];
}

export type LoadState<T> =
  | { status: "loading" }
  | { status: "unconfigured" }
  | { status: "offline"; message: string }
  | { status: "unauthorized" }
  | { status: "empty" }
  | { status: "ready"; data: T };

export function campaignStatusLabel(status: string): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "pending_review":
      return "Submitted";
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "exhausted":
      return "Exhausted";
    case "rejected":
      return "Rejected";
    case "ended":
      return "Ended";
    default:
      return status;
  }
}

export function reviewStatusLabel(status: ReviewStatus | string | undefined): string | null {
  switch (status) {
    case "pending":
      return "Pending review";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    case "changes_requested":
      return "Changes requested";
    default:
      return null;
  }
}

export function entryTypeLabel(type: string): string {
  switch (type) {
    case "direct_ad_earning":
    case "seed_sponsor_earning":
      return "Sponsored wait earning";
    case "redemption_request":
      return "Redemption";
    case "adjustment":
      return "Adjustment";
    case "reversal":
      return "Reversal";
    default:
      return type.replace(/_/g, " ");
  }
}
