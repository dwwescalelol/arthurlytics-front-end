import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  timeframe: "daily" | "weekly" | "monthly";
  setTimeframe: (v: any) => void;
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
    <div className="flex items-center gap-4">
      <Select value={timeframe} onValueChange={setTimeframe}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectContent>
      </Select>

      <div className="h-6 w-px bg-border" />

      <div className="flex items-center gap-3 rounded-md border px-3 py-2">
        <span className="text-xs font-medium uppercase text-muted-foreground">
          Sites
        </span>

        {["poki", "msn", "crazy"].map((site) => (
          <label key={site} className="flex items-center gap-2 text-sm">
            <Checkbox
              checked={sites.includes(site)}
              onCheckedChange={(checked) => {
                setSites((prev) => {
                  const next = checked
                    ? [...prev, site]
                    : prev.filter((s) => s !== site);
                  return next.length === 0 ? prev : next;
                });
              }}
            />
            {site}
          </label>
        ))}
      </div>
    </div>
  );
}
