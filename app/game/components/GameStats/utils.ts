type VoteSnapshot = {
  totalvotes: number;
  upvotes: number;
  timestamp: number;
};

export function computeStats(history: VoteSnapshot[]) {
  const curr = history[0];
  const prev = history[1];
  const prev2 = history[2];
  const week = history[7];
  const month = history[30];
  const siteRank = null;
  const globalRank = null;
  const currTotal = curr?.totalvotes ?? 0;

  const hasDaily = !!curr && !!prev;
  const hasDailyDelta = !!curr && !!prev && !!prev2;

  const dailyVotes = hasDaily ? curr.totalvotes - prev.totalvotes : undefined;

  const prevDailyVotes = hasDailyDelta
    ? prev.totalvotes - prev2.totalvotes
    : undefined;

  const deltaDailyVotes = hasDailyDelta
    ? dailyVotes! - prevDailyVotes!
    : undefined;

  const deltaDailyVotesPercent =
    hasDailyDelta && prevDailyVotes !== 0
      ? ((dailyVotes! - prevDailyVotes!) / Math.abs(prevDailyVotes!)) * 100
      : undefined;

  const weeklyVotes =
    curr && week ? curr.totalvotes - week.totalvotes : undefined;

  const monthlyVotes =
    curr && month ? curr.totalvotes - month.totalvotes : undefined;

  const currUp = curr?.upvotes ?? 0;
  const currDown = currTotal - currUp;

  const currRating = currTotal > 0 ? (currUp / currTotal) * 100 : 0;

  return {
    currTotal,
    currUp,
    currDown,
    currRating,
    dailyVotes,
    weeklyVotes,
    monthlyVotes,
    deltaDailyVotes,
    deltaDailyVotesPercent,
  };
}
