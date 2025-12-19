"use client";

export function GameStats({ game }: { game: any }) {
  const history = game?.history ?? [];
  if (history.length < 2) return null;

  const curr = history.at(0);
  const prev = history.at(1);

  const currTotal = curr.totalvotes ?? 0;
  const currUp = curr.upvotes ?? 0;
  const prevTotal = prev.totalvotes ?? 0;
  const prevUp = prev.upvotes ?? 0;

  const currDown = currTotal - currUp;
  const prevDown = prevTotal - prevUp;

  const currRating = currTotal > 0 ? (currUp / currTotal) * 100 : 0;
  const prevRating = prevTotal > 0 ? (prevUp / prevTotal) * 100 : 0;

  const ratingDelta = currRating - prevRating;

  const hue = Math.max(0, Math.min(120, (currRating / 100) * 120));
  const ratingColor = `hsl(${hue}, 70%, 45%)`;

  return (
    <div className="border-l px-10">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Stat label="Total votes" value={currTotal} />
        <Stat
          label="Rating"
          value={`${currRating.toFixed(1)}%`}
          color={ratingColor}
        />
        <Stat label="Upvotes" value={currUp} className="text-green-600" />
        <Stat label="Downvotes" value={currDown} className="text-red-600" />

        <div className="col-span-2 border-t pt-4 grid grid-cols-4 gap-4 text-sm">
          <Delta label="Total" value={currTotal - prevTotal} />
          <Delta label="Rating" value={ratingDelta} suffix="%" colorize />
          <Delta
            label="Upvotes"
            value={currUp - prevUp}
            className="text-green-600"
          />
          <Delta
            label="Downvotes"
            value={currDown - prevDown}
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
      <div
        className={`text-3xl font-semibold ${className ?? ""}`}
        style={{ color }}
      >
        {typeof value === "number" ? Intl.NumberFormat().format(value) : value}
      </div>
    </div>
  );
}

function Delta({
  label,
  value,
  suffix = "",
  className,
  colorize = false,
}: any) {
  const isRating = suffix === "%";

  let display = "-";
  let tone = className ?? "";

  if (isRating) {
    const rounded = Number(value.toFixed(1));

    if (rounded !== 0) {
      const sign = rounded > 0 ? "+" : "−";
      display = `${sign}${Math.abs(rounded).toFixed(1)}%`;

      if (colorize) {
        tone = rounded > 0 ? "text-green-600" : "text-red-600";
      }
    }
  } else {
    if (value !== 0) {
      const sign = value > 0 ? "+" : "−";
      display = `${sign}${Math.abs(value)}`;
    }
  }

  return (
    <div className={tone}>
      <div className="text-muted-foreground text-xs">{label}</div>
      <div className="font-medium">{display}</div>
    </div>
  );
}
