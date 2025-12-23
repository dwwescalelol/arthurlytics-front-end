import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteFilterBadges } from "@/components/site-filter-badges";
import { TableSearch } from "@/components/table-search";

type Props = {
  timeframe: "daily" | "weekly" | "monthly";
  setTimeframe: (v: "daily" | "weekly" | "monthly") => void;
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
