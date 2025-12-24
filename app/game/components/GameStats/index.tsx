"use client";

import { Card } from "@/components/ui/card";
import { DailyVotesHero } from "./DailyVotesHero";
import { StatTile } from "./StatTile";
import { RankInline } from "./RankInLine";
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
    weeklyVotes,
    monthlyVotes,
    deltaDailyVotesPercent,
    siteRank,
    globalRank,
  } = computeStats(history);

  const currRatingStr = String(currRating.toFixed(1)) + "%";
  return (
    <Card className="px-8 py-6 min-h-70 max-h-80 h-full overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex flex-1">
          <DailyVotesHero
            dailyVotes={dailyVotes}
            deltaDailyVotes={deltaDailyVotesPercent}
          />

          {/*  */}
          <div className="w-1/2 grid grid-cols-2 gap-x-6 gap-y-6 place-content-center">
            <StatTile label="Monthly votes" value={monthlyVotes ?? "–"} />
            <StatTile
              label="Global rank"
              value={globalRank == null ? null : `#${globalRank}`}
            />
            <StatTile label="Weekly votes" value={weeklyVotes ?? "–"} />
            <StatTile
              label="Site rank"
              value={siteRank == null ? null : `#${siteRank}`}
            />
          </div>
        </div>

        <div className="mt-auto pt-3 flex justify-between text-xs text-muted-foreground">
          <RankInline
            label="Votes"
            value={currTotal}
            valueClassName="text-primary"
          />

          <RankInline
            label="Up Votes"
            value={currUp}
            valueClassName="text-green-600"
          />

          <RankInline
            label="Down Votes"
            value={currDown}
            valueClassName="text-red-600"
          />

          <RankInline
            label="Rating"
            value={currRatingStr}
            valueClassName="text-primary"
          />
        </div>
      </div>
    </Card>
  );
}
