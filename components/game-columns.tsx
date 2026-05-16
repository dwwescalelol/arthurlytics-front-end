import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { ExternalLink, User } from "lucide-react";
import Link from "next/link";
import { GameStats } from "@/types/games.types";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/sparkline";

const fmt = (n: number | null | undefined) => {
  if (n == null) return "—";
  if (Math.abs(n) >= 1_000)
    return new Intl.NumberFormat("en", { notation: "compact", minimumSignificantDigits: 3, maximumSignificantDigits: 3 }).format(n);
  return String(n);
};

const SITE_COLORS: Record<string, string> = {
  poki: "bg-blue-500",
  msn: "bg-orange-400",
  crazy: "bg-emerald-500",
};

const siteFilterFn: FilterFn<GameStats> = (row, columnId, filterValue) => {
  if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
  return filterValue.includes(row.getValue(columnId));
};

const Delta = ({ value }: { value?: number | null }) => {
  if (value === null || value === undefined || value === 0) {
    return (
      <span className="ml-1.5 inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium tabular-nums bg-muted text-muted-foreground/50">
        —
      </span>
    );
  }

  const isPositive = value > 0;
  return (
    <span
      className={cn(
        "ml-1.5 inline-flex items-center rounded px-1 py-0.5 text-[10px] font-medium tabular-nums",
        isPositive
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400"
      )}
    >
      {isPositive ? "+" : "-"}
      {fmt(Math.abs(value))}
    </span>
  );
};

export const columns = (
  timeframe: "daily" | "weekly" | "monthly"
): ColumnDef<GameStats>[] => [
  {
    accessorKey: "global_rank",
    header: "Global Rank",
    size: 80,
    cell: ({ row }) => {
      const rank = row.original.global_rank;
      const d =
        timeframe === "daily"
          ? row.original.daily_delta_global_rank
          : timeframe === "weekly"
          ? row.original.weekly_delta_global_rank
          : row.original.monthly_delta_global_rank;

      return (
        <div className="flex items-center tabular-nums">
          <span className="font-medium">{rank}</span>
          <Delta value={d ? d * -1 : d} />
        </div>
      );
    },
  },
  {
    accessorKey: "site_rank",
    header: "Site Rank",
    size: 80,
    cell: ({ row }) => {
      const rank = row.original.site_rank;
      const d =
        timeframe === "daily"
          ? row.original.daily_delta_site_rank
          : timeframe === "weekly"
          ? row.original.weekly_delta_site_rank
          : row.original.monthly_delta_site_rank;

      return (
        <div className="flex items-center tabular-nums">
          <span className="font-medium">{rank}</span>
          <Delta value={d ? d * -1 : d} />
        </div>
      );
    },
  },
  {
    accessorKey: "site_id",
    header: "Site",
    filterFn: siteFilterFn,
    enableSorting: false,
    cell: ({ row }) => {
      const site = row.original.site_id;
      const dot = SITE_COLORS[site] ?? "bg-muted-foreground";
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize">
          <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
          {site}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Game",
    cell: ({ row }) => {
      const game = row.original;
      const href = `/games/${game.site_id}-${game.game_id}`;
      const router = useRouter();

      return (
        <div className="flex items-center gap-2">
          <Link
            href={href}
            prefetch={false}
            onMouseEnter={() => router.prefetch(href)}
            className="font-medium text-foreground underline-offset-4 hover:text-primary hover:underline transition-colors"
          >
            {game.name}
          </Link>
          {game.is_new && (
            <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              New
            </span>
          )}
          {game.is_new_top250 && (
            <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-orange-500/10 text-orange-500">
              🔥 New 250
            </span>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "developer_name",
    header: "Author",
    enableSorting: false,
    cell: ({ row }) => {
      const name = row.original.developer_name;
      if (!name) return null;
      return (
        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium shrink-0">
          <User className="h-3 w-3 text-muted-foreground" />
          {name}
        </span>
      );
    },
  },
  {
    id: "sparkline",
    header: "7D",
    enableSorting: false,
    cell: ({ row }) => {
      const history = row.original.vote_sparkline;
      if (!history) return <div className="text-muted-foreground/40">—</div>;
      return <Sparkline data={history} />;
    },
  },
  {
    id: "period_votes",
    header: timeframe === "daily" ? "Daily Votes" : timeframe === "weekly" ? "7D Votes" : "30D Votes",
    meta: { align: "right" },
    cell: ({ row }) => {
      const value =
        timeframe === "daily"
          ? row.original.daily_new_totalvotes
          : timeframe === "weekly"
          ? row.original.weekly_new_totalvotes
          : row.original.monthly_new_totalvotes;
      const delta =
        timeframe === "daily"
          ? row.original.daily_delta_vote
          : timeframe === "weekly"
          ? row.original.weekly_delta_vote
          : row.original.monthly_delta_vote;

      return (
        <div className="flex items-center justify-end tabular-nums">
          <span>{fmt(value)}</span>
          <Delta value={delta} />
        </div>
      );
    },
  },
  {
    id: "vote_ratio",
    header: "Approval",
    meta: { align: "right" },
    enableSorting: false,
    cell: ({ row }) => {
      const { upvotes, totalvotes } = row.original;
      if (!totalvotes) return <div className="text-right text-muted-foreground">—</div>;
      const ratio = (upvotes / totalvotes) * 100;
      const color =
        ratio >= 90 ? "text-green-600 dark:text-green-400" :
        ratio >= 80 ? "text-lime-600 dark:text-lime-400" :
        ratio >= 75 ? "text-amber-500 dark:text-amber-400" :
        ratio >= 60 ? "text-orange-500 dark:text-orange-400" :
        "text-red-600 dark:text-red-400";
      return (
        <div className={cn("text-right tabular-nums font-medium", color)}>
          {ratio.toFixed(1)}%
        </div>
      );
    },
  },
  {
    accessorKey: "totalvotes",
    header: "Total Votes",
    meta: { align: "right" },
    cell: ({ row }) => (
      <div className="text-right tabular-nums text-muted-foreground">
        {fmt(row.original.totalvotes)}
      </div>
    ),
  },
  {
    id: "open_link",
    header: "Link",
    size: 40,
    enableSorting: false,
    cell: ({ row }) => (
      <a
        href={row.original.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Open game"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    ),
  },
];
