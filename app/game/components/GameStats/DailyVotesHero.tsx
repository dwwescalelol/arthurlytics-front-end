import { ChevronUp, ChevronDown } from "lucide-react";

export function DailyVotesHero({
  dailyVotes,
  deltaDailyVotes,
}: {
  dailyVotes?: number;
  deltaDailyVotes?: number;
}) {
  const hasDelta = typeof deltaDailyVotes === "number";
  const improving = hasDelta && deltaDailyVotes > 0;

  return (
    <div className="flex w-1/2 items-center justify-center">
      <div className="text-left">
        <div className="text-xs text-muted-foreground">Daily votes</div>

        <div className="mt-1 flex items-end gap-2">
          <div className="text-5xl font-semibold leading-none">
            {dailyVotes === undefined
              ? "Not enough data"
              : Intl.NumberFormat().format(dailyVotes)}
          </div>

          {hasDelta && (
            <span
              className={`flex items-center text-xs ${
                improving ? "text-green-600" : "text-red-600"
              }`}
            >
              {improving ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
              {Math.abs(deltaDailyVotes).toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
