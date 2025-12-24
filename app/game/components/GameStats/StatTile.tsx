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
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-medium leading-none">{display}</div>
    </div>
  );
}
