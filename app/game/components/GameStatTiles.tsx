"use client";

import { useMemo } from "react";

type HistoryItem = { totalvotes: number; upvotes: number; timestamp: number };

function computeTileStats(history: HistoryItem[]) {
  const sorted = [...history].sort((a, b) => a.timestamp - b.timestamp);

  const deltas = sorted.map((h, i) =>
    i === 0 ? 0 : h.totalvotes - sorted[i - 1].totalvotes
  );

  const todayVotes = deltas.at(-1) ?? 0;

  const last7 = deltas.slice(-7);
  const peak7dIdx = last7.indexOf(Math.max(...last7));
  const peak7d = last7[peak7dIdx];
  const peak7dDate = sorted.at(-(7 - peak7dIdx))?.timestamp ?? null;

  const peakAllTimeIdx = deltas.indexOf(Math.max(...deltas));
  const peakAllTime = deltas[peakAllTimeIdx];
  const peakAllTimeDate = sorted[peakAllTimeIdx]?.timestamp ?? null;

  const latest = sorted.at(-1);
  const totalVotes = latest?.totalvotes ?? 0;
  const approval =
    latest && latest.totalvotes > 0
      ? (latest.upvotes / latest.totalvotes) * 100
      : 0;

  return { todayVotes, peak7d, peak7dDate, peakAllTime, peakAllTimeDate, totalVotes, approval };
}

const fmt = (n: number) =>
  Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

function fmtDate(ts: number | null) {
  if (!ts) return null;
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function GameStatTiles({
  history,
  globalRank,
  siteRank,
}: {
  history: HistoryItem[];
  globalRank?: number | null;
  siteRank?: number | null;
}) {
  const { todayVotes, peak7d, peak7dDate, peakAllTime, peakAllTimeDate, totalVotes, approval } =
    useMemo(() => computeTileStats(history), [history]);

  const approvalColor =
    approval >= 75 ? "text-green-500" : approval >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
      <Tile label="Global rank" value={globalRank != null ? `#${globalRank}` : "–"} />
      <Tile label="Site rank" value={siteRank != null ? `#${siteRank}` : "–"} />
      <Tile label="Today's votes" value={fmt(todayVotes)} />
      <Tile label="7-day peak" value={fmt(peak7d)} date={fmtDate(peak7dDate)} />
      <Tile label="All-time peak" value={fmt(peakAllTime)} date={fmtDate(peakAllTimeDate)} />
      <Tile label="Total votes" value={fmt(totalVotes)} />
      <Tile label="Approval" value={`${approval.toFixed(1)}%`} valueClassName={approvalColor} />
    </div>
  );
}

function Tile({
  label,
  value,
  date,
  highlight,
  valueClassName,
}: {
  label: string;
  value: string;
  date?: string | null;
  highlight?: boolean;
  valueClassName?: string;
}) {
  return (
    <div
      className={`rounded-xl border px-5 py-5 ${
        highlight ? "bg-primary/5 border-primary/30" : "bg-card"
      }`}
    >
      <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <div
          className={`text-4xl font-bold leading-none tabular-nums ${
            highlight ? "text-primary" : ""
          } ${valueClassName ?? ""}`}
        >
          {value}
        </div>
        {date && (
          <span className="mb-1 text-sm font-semibold text-foreground/70 leading-none">
            {date}
          </span>
        )}
      </div>
    </div>
  );
}
