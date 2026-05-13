import { SiteFilterBadges } from "@/components/site-filter-badges";
import { TableSearch } from "@/components/table-search";
import { cn } from "@/lib/utils";

const TIMEFRAME_OPTIONS = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
] as const;

export type TimeframeOption = (typeof TIMEFRAME_OPTIONS)[number]["value"];

export const TIMEFRAME_BASE: Record<TimeframeOption, "daily" | "weekly" | "monthly"> = {
  today: "daily",
  "7d": "weekly",
  "30d": "monthly",
};

type Props = {
  timeframe: TimeframeOption;
  setTimeframe: (v: TimeframeOption) => void;
  sites: string[];
  setSites: React.Dispatch<React.SetStateAction<string[]>>;
};

export function GameTableToolbar({
  timeframe,
  setTimeframe,
  sites,
  setSites,
}: Props) {
  return (
    <div className="flex items-center gap-3">

      {/* Mixpanel-style timeframe selector */}
      <div className="flex items-center rounded-md border border-border/60 bg-muted/40 p-0.5 gap-0.5">
        {TIMEFRAME_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTimeframe(value)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-all",
              timeframe === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="h-4 w-px bg-border" />

      <SiteFilterBadges
        value={sites}
        onChange={setSites}
        options={["poki", "msn", "crazy"]}
      />

      <div className="ml-auto">
        <TableSearch />
      </div>
    </div>
  );
}
