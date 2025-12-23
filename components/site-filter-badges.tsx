import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
  options: string[];
};

export function SiteFilterBadges({ value, onChange, options }: Props) {
  return (
    <div className="flex items-center gap-2">
      {options.map((site) => {
        const active = value.includes(site);

        return (
          <Badge
            key={site}
            variant={active ? "default" : "outline"}
            className={cn(
              "cursor-pointer select-none transition-colors",
              !active && "text-muted-foreground"
            )}
            onClick={() => {
              // prevent unselecting the last active item
              if (active && value.length === 1) return;

              onChange(
                active ? value.filter((s) => s !== site) : [...value, site]
              );
            }}
          >
            {site}
          </Badge>
        );
      })}
    </div>
  );
}
