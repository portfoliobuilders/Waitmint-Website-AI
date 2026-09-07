"use client";

import { useMemo, useState } from "react";
import { PLATFORM_SHARE_PERCENT, USER_SHARE_PERCENT } from "@/lib/config";
import { WAITMINT_PRODUCTS, type ProductId } from "@/lib/content/products";
import {
  formatInrFromMicropaise,
  illustrativeSettlementSplit,
} from "@/lib/money/micropaise";

const REQUESTS_MIN = 1;
const REQUESTS_MAX = 200;
const ELIGIBLE_MIN = 0;
const ELIGIBLE_MAX = 100;
const CPM_MIN = 10;
const CPM_MAX = 200;
const DAYS_IN_MONTH = 30;

const PRESETS = [
  { id: "light", label: "Light", requestsPerDay: 8, eligiblePercent: 20, cpmInr: 10 },
  { id: "typical", label: "Typical", requestsPerDay: 20, eligiblePercent: 30, cpmInr: 10 },
  { id: "heavy", label: "Heavy", requestsPerDay: 60, eligiblePercent: 40, cpmInr: 25 },
] as const;

const CLIENT_NOTES: Record<ProductId, string> = {
  extension:
    "Live client. This illustration is only possible after the Chrome extension maps an install to your account and a qualifying wait settles.",
  sdk: "Same 60/40 split when partner products open. The SDK is not live for settlement today and will not keep a second wallet.",
  app: "Companion display of the same Exchange wallet. The app will not invent an offline balance.",
};

function clampInt(value: number, min: number, max: number): number {
  if (!Number.isSafeInteger(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function parseBoundedInt(raw: string, fallback: number, min: number, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(parsed)) return fallback;
  return clampInt(parsed, min, max);
}

function SliderField({
  label,
  value,
  display,
  min,
  max,
  suffix = "",
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  suffix?: string;
  onChange: (next: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <label className="block text-sm">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className="rounded-full bg-white/6 px-3 py-1 font-mono text-[var(--wm-aqua)]">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(parseBoundedInt(event.target.value, value, min, max))}
        className="wm-range mt-4 w-full"
        style={{ ["--wm-range-fill" as string]: `${fill}%` }}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(parseBoundedInt(event.target.value, value, min, max))}
        className="mt-3 h-11 w-full rounded-xl border border-[var(--wm-line)] bg-black/30 px-3"
        aria-label={`${label}${suffix}`}
      />
    </label>
  );
}

export function EarningsCalculator() {
  const [requestsPerDay, setRequestsPerDay] = useState(20);
  const [eligiblePercent, setEligiblePercent] = useState(30);
  const [cpmInr, setCpmInr] = useState(10);
  const [client, setClient] = useState<ProductId>("extension");

  const activePreset = PRESETS.find(
    (preset) =>
      preset.requestsPerDay === requestsPerDay &&
      preset.eligiblePercent === eligiblePercent &&
      preset.cpmInr === cpmInr,
  );

  const estimate = useMemo(() => {
    const dailyQualifying = Math.floor((requestsPerDay * eligiblePercent) / 100);
    const monthlyQualifying = dailyQualifying * DAYS_IN_MONTH;
    const daily = illustrativeSettlementSplit(dailyQualifying, cpmInr);
    const monthly = illustrativeSettlementSplit(monthlyQualifying, cpmInr);
    return { dailyQualifying, monthlyQualifying, daily, monthly };
  }, [requestsPerDay, eligiblePercent, cpmInr]);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--wm-line)] bg-[var(--wm-bg-elevated)] wm-glow">
      <div className="relative overflow-hidden border-b border-[var(--wm-line)] bg-[#0a0c11] px-6 py-6 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-24 h-56 w-56 rounded-full bg-[var(--wm-mint)]/12 blur-3xl"
        />
        <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">Illustrative calculator</p>
        <h2 className="font-display mt-3 text-3xl sm:text-4xl">See a qualifying month — not a promise</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">
          Integer floor math only. This is not a wallet, forecast, or offer. Live earnings exist only
          after an advertiser-funded impression qualifies and settles on the Exchange.
        </p>
        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Example intensity">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => {
                setRequestsPerDay(preset.requestsPerDay);
                setEligiblePercent(preset.eligiblePercent);
                setCpmInr(preset.cpmInr);
              }}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ${
                activePreset?.id === preset.id
                  ? "bg-[var(--wm-mint)] text-[#04110c]"
                  : "border border-[var(--wm-line-strong)] text-[var(--wm-text)] hover:bg-white/5"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="WaitMint client">
          {WAITMINT_PRODUCTS.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => setClient(product.id)}
              className={`inline-flex min-h-11 items-center rounded-full px-4 text-sm ${
                client === product.id
                  ? "border border-[var(--wm-mint)]/50 bg-[var(--wm-mint-dim)] text-[var(--wm-mint)]"
                  : "border border-[var(--wm-line)] text-[var(--wm-muted)] hover:text-[var(--wm-text)]"
              }`}
            >
              {product.shortName}
              {product.status === "available" ? "" : " · next"}
            </button>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--wm-muted)]">{CLIENT_NOTES[client]}</p>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)]">
        <fieldset className="space-y-6">
          <legend className="sr-only">Illustrative estimate inputs</legend>
          <SliderField
            label="AI requests per day"
            value={requestsPerDay}
            display={String(requestsPerDay)}
            min={REQUESTS_MIN}
            max={REQUESTS_MAX}
            onChange={setRequestsPerDay}
          />
          <SliderField
            label="Eligible wait %"
            value={eligiblePercent}
            display={`${eligiblePercent}%`}
            min={ELIGIBLE_MIN}
            max={ELIGIBLE_MAX}
            suffix=" percent"
            onChange={setEligiblePercent}
          />
          <SliderField
            label="Illustrative CPM"
            value={cpmInr}
            display={`₹${cpmInr}`}
            min={CPM_MIN}
            max={CPM_MAX}
            suffix=" rupees"
            onChange={setCpmInr}
          />
          <p className="text-xs leading-5 text-[var(--wm-muted)]">
            Example uses a ChatGPT-class wait. Live surfaces are listed on Platforms. CPM here is an
            integer illustration, not live demand. Extension, SDK, and App share one split.
          </p>
        </fieldset>

        <div className="flex flex-col justify-between gap-5 rounded-3xl border border-[var(--wm-mint)]/25 bg-[#07090d] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--wm-mint)]">
              Illustrative user share ({USER_SHARE_PERCENT}%)
            </p>
            <p className="font-display mt-3 text-5xl leading-none sm:text-6xl">
              {formatInrFromMicropaise(estimate.monthly.user)}
            </p>
            <p className="mt-2 text-sm text-[var(--wm-muted)]">over {DAYS_IN_MONTH} days · not a wallet</p>
          </div>

          <div
            className="flex h-3 overflow-hidden rounded-full"
            role="img"
            aria-label={`${USER_SHARE_PERCENT} percent user, ${PLATFORM_SHARE_PERCENT} percent WaitMint`}
          >
            <div className="h-full bg-[var(--wm-mint)]" style={{ width: `${USER_SHARE_PERCENT}%` }} />
            <div className="h-full bg-[var(--wm-aqua)]/70" style={{ width: `${PLATFORM_SHARE_PERCENT}%` }} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--wm-mint)]/25 bg-[var(--wm-mint-dim)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--wm-mint)]">You {USER_SHARE_PERCENT}%</p>
              <p className="mt-1 font-mono text-lg">{formatInrFromMicropaise(estimate.monthly.user)}</p>
            </div>
            <div className="rounded-2xl border border-[var(--wm-line)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--wm-aqua)]">WaitMint {PLATFORM_SHARE_PERCENT}%</p>
              <p className="mt-1 font-mono text-lg">{formatInrFromMicropaise(estimate.monthly.platform)}</p>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--wm-line)] p-4">
              <dt className="text-xs uppercase tracking-[0.14em] text-[var(--wm-muted)]">Qualifying / day</dt>
              <dd className="font-display mt-1 text-2xl">{estimate.dailyQualifying}</dd>
            </div>
            <div className="rounded-2xl border border-[var(--wm-line)] p-4">
              <dt className="text-xs uppercase tracking-[0.14em] text-[var(--wm-muted)]">Qualifying / 30 days</dt>
              <dd className="font-display mt-1 text-2xl">{estimate.monthlyQualifying}</dd>
            </div>
            <div className="rounded-2xl border border-[var(--wm-line)] p-4">
              <dt className="text-xs uppercase tracking-[0.14em] text-[var(--wm-muted)]">Advertiser funded / 30 days</dt>
              <dd className="mt-1 font-mono text-lg">{formatInrFromMicropaise(estimate.monthly.gross)}</dd>
            </div>
            <div className="rounded-2xl border border-[var(--wm-line)] p-4">
              <dt className="text-xs uppercase tracking-[0.14em] text-[var(--wm-muted)]">Per day at this mix</dt>
              <dd className="mt-1 font-mono text-lg text-[var(--wm-aqua)]">
                {formatInrFromMicropaise(estimate.daily.user)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
