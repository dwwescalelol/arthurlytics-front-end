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
    <div className="flex w-1/2 items-center justify-center border-r pr-6">
      <div className="text-left">
        <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Daily votes
        </div>

        <div className="mt-2 flex items-end gap-2">
          <div className="text-5xl font-bold leading-none tabular-nums">
            {dailyVotes === undefined
              ? "–"
              : Intl.NumberFormat().format(dailyVotes)}
          </div>

          {hasDelta && (
            <span
              className={`mb-0.5 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
                improving
                  ? "bg-green-500/10 text-green-600"
                  : "bg-red-500/10 text-red-600"
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
