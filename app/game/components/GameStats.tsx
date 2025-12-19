"use client";

export function GameStats({ game }: { game: any }) {
  const history = game?.history ?? [];

  if (history.length < 2) {
    return null;
  }

  const latest = history.at(-1);
  const prev = history.at(-2);

  const totalVotes = latest.totalvotes ?? 0;
  const upvotes = latest.upvotes ?? 0;
  const prevTotal = prev.totalvotes ?? 0;
  const prevUpvotes = prev.upvotes ?? 0;

  const downvotes = totalVotes - upvotes;

  const rating =
    totalVotes > 0 ? Number(((upvotes / totalVotes) * 100).toFixed(1)) : 0;

  const prevRating = prevTotal > 0 ? (prevUpvotes / prevTotal) * 100 : 0;

  const ratingDelta = Number((rating - prevRating).toFixed(1));

  const hue = Math.max(0, Math.min(120, (rating / 100) * 120));
  const ratingColor = `hsl(${hue}, 70%, 45%)`;

  return (
    <div className="border-l border-r px-10 flex items-center">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Stat label="Total votes" value={totalVotes} />
        <Stat label="Rating" value={`${rating}%`} color={ratingColor} />
        <Stat label="Upvotes" value={upvotes} className="text-green-600" />
        <Stat label="Downvotes" value={downvotes} className="text-red-600" />

        <div className="col-span-2 border-t pt-4 grid grid-cols-4 gap-4 text-sm">
          <Delta label="Total" value={latest.totalvotes - prev.totalvotes} />
          <Delta label="Rating" value={`${ratingDelta}%`} />
          <Delta
            label="Upvotes"
            value={`+${upvotes - prevUpvotes}`}
            className="text-green-600"
          />
          <Delta
            label="Downvotes"
            value={`+${downvotes - (prevTotal - prevUpvotes)}`}
            className="text-red-600"
          />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color, className }: any) {
  return (
    <div>
      <div className="text-muted-foreground text-sm">{label}</div>
      <div className={`text-3xl font-semibold ${className}`} style={{ color }}>
        {typeof value === "number" ? Intl.NumberFormat().format(value) : value}
      </div>
    </div>
  );
}

function Delta({ label, value, className }: any) {
  return (
    <div className={className}>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
