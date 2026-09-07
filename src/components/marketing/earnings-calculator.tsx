"use client";

import { useMemo, useState } from "react";
import { USER_SHARE_PERCENT } from "@/lib/config";
import {
  formatInrFromMicropaise,
  illustrativeUserShareMicropaise,
} from "@/lib/money/micropaise";

const REQUESTS_MIN = 1;
const REQUESTS_MAX = 200;
const ELIGIBLE_MIN = 0;
const ELIGIBLE_MAX = 100;
const CPM_MIN = 10;
const CPM_MAX = 200;
const DAYS_IN_MONTH = 30;

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isSafeInteger(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function parseBoundedInt(raw: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(parsed)) return fallback;
  return clampInt(parsed, min, max);
}

export function EarningsCalculator() {
  const [requestsPerDay, setRequestsPerDay] = useState(20);
  const [eligiblePercent, setEligiblePercent] = useState(30);
  const [cpmInr, setCpmInr] = useState(10);

  const estimate = useMemo(() => {
    const dailyQualifying = Math.floor((requestsPerDay * eligiblePercent) / 100);
    const monthlyQualifying = dailyQualifying * DAYS_IN_MONTH;
    const dailyShare = illustrativeUserShareMicropaise(dailyQualifying, cpmInr);
    const monthlyShare = illustrativeUserShareMicropaise(monthlyQualifying, cpmInr);
    return { dailyQualifying, monthlyQualifying, dailyShare, monthlyShare };
  }, [requestsPerDay, eligiblePercent, cpmInr]);

  return (
    <div className="rounded-3xl border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Illustrative calculator</p>
      <h2 className="font-display mt-3 text-3xl">Estimate a qualifying month</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
        Integer math only. This is not a wallet, forecast, or promise. Live earnings exist only
        after an advertiser-funded impression qualifies and settles on the Exchange.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <fieldset className="space-y-5">
          <legend className="sr-only">Illustrative estimate inputs</legend>
          <label className="block text-sm">
            <span className="flex items-center justify-between gap-3">
              <span>AI requests per day</span>
              <span className="font-mono text-[var(--wm-aqua)]">{requestsPerDay}</span>
            </span>
            <input
              type="range"
              min={REQUESTS_MIN}
              max={REQUESTS_MAX}
              step={1}
              value={requestsPerDay}
              onChange={(event) =>
                setRequestsPerDay(parseBoundedInt(event.target.value, 20, REQUESTS_MIN, REQUESTS_MAX))
              }
              className="mt-3 h-11 w-full accent-[var(--wm-mint)]"
            />
            <input
              type="number"
              inputMode="numeric"
              min={REQUESTS_MIN}
              max={REQUESTS_MAX}
              step={1}
              value={requestsPerDay}
              onChange={(event) =>
                setRequestsPerDay(parseBoundedInt(event.target.value, requestsPerDay, REQUESTS_MIN, REQUESTS_MAX))
              }
              className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
            />
          </label>

          <label className="block text-sm">
            <span className="flex items-center justify-between gap-3">
              <span>Eligible wait %</span>
              <span className="font-mono text-[var(--wm-aqua)]">{eligiblePercent}%</span>
            </span>
            <input
              type="range"
              min={ELIGIBLE_MIN}
              max={ELIGIBLE_MAX}
              step={1}
              value={eligiblePercent}
              onChange={(event) =>
                setEligiblePercent(parseBoundedInt(event.target.value, 30, ELIGIBLE_MIN, ELIGIBLE_MAX))
              }
              className="mt-3 h-11 w-full accent-[var(--wm-mint)]"
            />
            <input
              type="number"
              inputMode="numeric"
              min={ELIGIBLE_MIN}
              max={ELIGIBLE_MAX}
              step={1}
              value={eligiblePercent}
              onChange={(event) =>
                setEligiblePercent(
                  parseBoundedInt(event.target.value, eligiblePercent, ELIGIBLE_MIN, ELIGIBLE_MAX),
                )
              }
              className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
            />
          </label>

          <label className="block text-sm">
            <span className="flex items-center justify-between gap-3">
              <span>Illustrative CPM (₹)</span>
              <span className="font-mono text-[var(--wm-aqua)]">₹{cpmInr}</span>
            </span>
            <input
              type="range"
              min={CPM_MIN}
              max={CPM_MAX}
              step={1}
              value={cpmInr}
              onChange={(event) => setCpmInr(parseBoundedInt(event.target.value, 10, CPM_MIN, CPM_MAX))}
              className="mt-3 h-11 w-full accent-[var(--wm-mint)]"
            />
            <input
              type="number"
              inputMode="numeric"
              min={CPM_MIN}
              max={CPM_MAX}
              step={1}
              value={cpmInr}
              onChange={(event) => setCpmInr(parseBoundedInt(event.target.value, cpmInr, CPM_MIN, CPM_MAX))}
              className="mt-2 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
            />
          </label>
        </fieldset>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-[var(--wm-line)] bg-[#0a0c11] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">
              Qualifying waits / day
            </p>
            <p className="font-display mt-2 text-3xl">{estimate.dailyQualifying}</p>
          </div>
          <div className="rounded-2xl border border-[var(--wm-line)] bg-[#0a0c11] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-muted)]">
              Qualifying waits / {DAYS_IN_MONTH} days
            </p>
            <p className="font-display mt-2 text-3xl">{estimate.monthlyQualifying}</p>
          </div>
          <div className="rounded-2xl border border-[var(--wm-mint)]/30 bg-[var(--wm-mint-dim)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">
              Illustrative user share ({USER_SHARE_PERCENT}%)
            </p>
            <p className="font-display mt-2 text-3xl">
              {formatInrFromMicropaise(estimate.monthlyShare)}
              <span className="ml-2 text-base text-[var(--wm-muted)]">/ 30 days</span>
            </p>
            <p className="mt-2 font-mono text-sm text-[var(--wm-muted)]">
              {formatInrFromMicropaise(estimate.dailyShare)} / day
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-6 text-[var(--wm-muted)]">
        Illustrative estimate only. Actual earnings depend on advertiser demand and qualifying
        impressions.
      </p>
    </div>
  );
}
