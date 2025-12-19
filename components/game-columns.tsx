import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { GameStats } from "@/types/game-stats";
import { ExternalLink, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const siteFilterFn: FilterFn<GameStats> = (row, columnId, filterValue) => {
  if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
  return filterValue.includes(row.getValue(columnId));
};

const Delta = ({ value }: { value?: number | null }) => {
  if (value === null || value === undefined || value === 0) {
    return <span className="ml-1 text-muted-foreground">-</span>;
  }

  return value > 0 ? (
    <span className="ml-1 inline-flex items-center text-green-600">
      <ArrowUp className="h-3 w-3" />
      <span className="text-xs">{Math.abs(value)}</span>
    </span>
  ) : (
    <span className="ml-1 inline-flex items-center text-red-600">
      <ArrowDown className="h-3 w-3" />
      <span className="text-xs">{Math.abs(value)}</span>
    </span>
  );
};

export const columns = (
  timeframe: "daily" | "weekly" | "monthly"
): ColumnDef<GameStats>[] => [
  {
    accessorKey: "site_rank",
    header: "Site Rank",
    cell: ({ row }) => {
      const rank = row.original.site_rank;
      const delta =
        timeframe === "daily"
          ? row.original.daily_delta_site_rank
          : timeframe === "weekly"
          ? row.original.weekly_delta_site_rank
          : row.original.monthly_delta_site_rank;

      return (
        <div className="flex items-center">
          <span>{rank}</span>
          <Delta value={delta} />
        </div>
      );
    },
  },
  {
    accessorKey: "global_rank",
    header: "Global Rank",
    cell: ({ row }) => {
      const rank = row.original.global_rank;
      const delta =
        timeframe === "daily"
          ? row.original.daily_delta_global_rank
          : timeframe === "weekly"
          ? row.original.weekly_delta_global_rank
          : row.original.monthly_delta_global_rank;

      return (
        <div className="flex items-center">
          <span>{rank}</span>
          <Delta value={delta} />
        </div>
      );
    },
  },
  {
    accessorKey: "site_id",
    header: "Site",
    filterFn: siteFilterFn,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Game",
    cell: ({ row }) => {
      const game = row.original;
      return (
        <Link
          href={`/games/${game.site_id}-${game.game_id}`}
          className="text-primary underline-offset-4 hover:underline"
        >
          {game.name}
        </Link>
      );
    },
    enableSorting: false,
  },
  { accessorKey: "upvotes", header: "Upvotes" },
  { accessorKey: "totalvotes", header: "Total Votes" },
  { accessorKey: "daily_new_upvotes", header: "Daily Upvotes" },
  {
    accessorKey: "daily_new_totalvotes",
    header: "Daily Total Votes",
    cell: ({ row }) => {
      const value = row.original.daily_new_totalvotes;
      const delta =
        timeframe === "daily"
          ? row.original.daily_delta_vote
          : timeframe === "weekly"
          ? row.original.weekly_delta_vote
          : row.original.monthly_delta_vote;

      return (
        <div className="flex items-center">
          <span>{value}</span>
          <Delta value={delta} />
        </div>
      );
    },
  },
  {
    id: "open_link",
    header: "",
    enableSorting: false,
    cell: ({ row }) => {
      const url = row.original.url;

      return (
        <Button variant="ghost" size="icon" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      );
    },
  },
];
