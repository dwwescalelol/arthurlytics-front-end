"use client";

import { Card } from "@/components/ui/card";
import { DailyVotesHero } from "./DailyVotesHero";
import { StatTile } from "./StatTile";
import { computeStats } from "./utils";

export function GameStats({ game }: { game: any }) {
  const history = game?.history ?? [];
  if (history.length < 2) return null;

  const {
    currTotal,
    currUp,
    currDown,
    currRating,
    dailyVotes,
    deltaDailyVotesPercent,
    siteRank,
    globalRank,
  } = computeStats(history);

  const currRatingStr = String(currRating.toFixed(1)) + "%";
  return (
    <Card className="px-8 py-6 h-full">
      <div className="flex h-full flex-col">
        <div className="flex flex-1 items-center">
          <DailyVotesHero
            dailyVotes={dailyVotes}
            deltaDailyVotes={deltaDailyVotesPercent}
          />

          <div className="w-1/2 grid grid-cols-2 gap-3 pl-6">
            <StatTile
              label="Global rank"
              value={globalRank == null ? null : `#${globalRank}`}
            />
            <StatTile
              label="Site rank"
              value={siteRank == null ? null : `#${siteRank}`}
            />
            <div className="col-span-2">
              <StatTile label="Total votes" value={currTotal ?? "–"} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            All time
          </span>
          <div className="flex-1 border-t" />
        </div>

        <div className="mt-3 flex items-center gap-6">
          {/* VOTE SPLIT BAR */}
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="flex justify-between text-[0.6rem] font-semibold uppercase tracking-wider">
              <span className="text-green-600">
                ↑ {Intl.NumberFormat("en", { notation: "compact" }).format(currUp)}
              </span>
              <span className="text-red-600">
                ↓ {Intl.NumberFormat("en", { notation: "compact" }).format(currDown)}
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden flex bg-red-500/20">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${currRating}%` }}
              />
            </div>
          </div>

          {/* RATING */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <span className="text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Rating
            </span>
            <span className="text-sm font-semibold tabular-nums text-primary">
              {currRatingStr}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
