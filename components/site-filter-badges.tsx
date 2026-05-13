import { cn } from "@/lib/utils";

const SITE_COLORS: Record<string, string> = {
  poki: "bg-blue-500",
  msn: "bg-orange-400",
  crazy: "bg-emerald-500",
};

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  options: string[];
};

export function SiteFilterBadges({ value, onChange, options }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {options.map((site) => {
        const active = value.includes(site);
        const dot = SITE_COLORS[site] ?? "bg-muted-foreground";

        return (
          <button
            key={site}
            onClick={() => {
              if (active && value.length === 1) return;
              onChange(active ? value.filter((s) => s !== site) : [...value, site]);
            }}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium capitalize transition-colors select-none",
              active
                ? "border-border bg-muted text-foreground"
                : "border-border/50 bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", active ? dot : "bg-muted-foreground/40")} />
            {site}
          </button>
        );
      })}
    </div>
  );
}
