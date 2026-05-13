export function StatTile({
  label,
  value,
}: {
  label: string;
  value: number | string | null;
}) {
  const display =
    value === null
      ? "–"
      : typeof value === "number"
      ? Intl.NumberFormat().format(value)
      : value;

  return (
    <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
      <div className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 text-2xl font-semibold leading-none tabular-nums">
        {display}
      </div>
    </div>
  );
}
