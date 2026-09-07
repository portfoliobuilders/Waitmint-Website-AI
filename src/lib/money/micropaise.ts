/**
 * Display-only money helpers. Financial truth stays on the Exchange
 * as integer BIGINT micropaise. Do not use results for persistence.
 *
 * 1 INR = 100 paise = 100,000 micropaise
 */

export const MICROPAISE_PER_INR = 100_000;
export const MICROPAISE_PER_PAISE = 1000;
export const PAISE_PER_INR = 100;
export const DEFAULT_USER_REVENUE_SHARE_BPS = 6000;
export const BPS_DENOMINATOR = 10000;

export function isSafeIntegerMicropaise(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value);
}

export function asMicropaiseInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isSafeInteger(value)) return value;
  if (typeof value === "bigint") {
    const n = Number(value);
    return Number.isSafeInteger(n) ? n : null;
  }
  if (typeof value === "string" && /^-?\d+$/.test(value.trim())) {
    const n = Number(value.trim());
    return Number.isSafeInteger(n) ? n : null;
  }
  return null;
}

export function formatInrFromMicropaise(
  micropaise: number | null | undefined,
  options: { empty?: string; digits?: number } = {},
): string {
  const empty = options.empty ?? "—";
  const parsed = asMicropaiseInteger(micropaise);
  if (parsed === null) return empty;
  const abs = Math.abs(parsed);
  const sign = parsed < 0 ? "−" : "";
  const rupees = abs / MICROPAISE_PER_INR;
  if (abs === 0) return "₹0";
  if (rupees >= 1) {
    const digits = options.digits ?? 2;
    return `${sign}₹${rupees.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: digits,
    })}`;
  }
  return `${sign}₹${rupees.toFixed(options.digits ?? 4)}`;
}

export function formatCpmFromMicropaise(cpmMicropaise: number | null | undefined): string {
  const parsed = asMicropaiseInteger(cpmMicropaise);
  if (parsed === null) return "—";
  return `₹${Math.floor(parsed / MICROPAISE_PER_INR)} CPM`;
}

/**
 * Illustrative estimate only — never persist. Uses integer floor math.
 */
export function illustrativeGrossMicropaise(
  qualifyingWaits: number,
  cpmInrInteger: number,
): number {
  if (
    !Number.isSafeInteger(qualifyingWaits) ||
    qualifyingWaits < 0 ||
    !Number.isSafeInteger(cpmInrInteger) ||
    cpmInrInteger < 0
  ) {
    return 0;
  }
  const cpmMicropaise = cpmInrInteger * MICROPAISE_PER_INR;
  return Math.floor((cpmMicropaise * qualifyingWaits) / 1000);
}

export function illustrativeSettlementSplit(
  qualifyingWaits: number,
  cpmInrInteger: number,
  userShareBps: number = DEFAULT_USER_REVENUE_SHARE_BPS,
): { gross: number; user: number; platform: number } {
  const gross = illustrativeGrossMicropaise(qualifyingWaits, cpmInrInteger);
  const user = Math.floor((gross * userShareBps) / BPS_DENOMINATOR);
  return { gross, user, platform: gross - user };
}

/**
 * Illustrative estimate only — never persist. Uses integer floor math.
 */
export function illustrativeUserShareMicropaise(
  qualifyingWaits: number,
  cpmInrInteger: number,
  userShareBps: number = DEFAULT_USER_REVENUE_SHARE_BPS,
): number {
  return illustrativeSettlementSplit(qualifyingWaits, cpmInrInteger, userShareBps).user;
}
