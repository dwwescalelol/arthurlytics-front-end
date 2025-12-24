import { ChevronUp, ChevronDown } from "lucide-react";

function formatValue(value: any) {
  if (typeof value !== "number") return value;

  // float → percent
  if (!Number.isInteger(value)) {
    return `${value.toFixed(1)}%`;
  }

  // integer → compact (1k, 1M, etc)
  return Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function RankInline({
  label,
  value,
  delta,
  valueClassName,
}: {
  label: string;
  value: any;
  delta?: number | null;
  valueClassName?: string;
}) {
  const hasDelta = typeof delta === "number";
  const improving = hasDelta && delta < 0;

  return (
    <div className="flex items-center gap-1">
      <span>{label}</span>

      <span className={`font-medium ${valueClassName ?? ""}`}>
        {formatValue(value)}
      </span>

      {hasDelta && (
        <span
          className={`flex items-center gap-0.5 ${
            improving ? "text-green-600" : "text-red-600"
          }`}
        >
          {improving ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
          {Math.abs(delta)}
        </span>
      )}
    </div>
  );
}
