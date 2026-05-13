"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ---------------- chart config ---------------- */

const chartConfig = {
  daily_new_upvotes: {
    label: "Up Votes",
    color: "var(--chart-2)",
  },
  daily_new_downvotes: {
    label: "Down Votes",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type HistoryItem = {
  timestamp: number;
  totalvotes: number;
  upvotes: number;
};

export function GameVotesChart({ history }: { history: HistoryItem[] }) {
  // 🔒 hydration guard — hooks MUST come first
  const [mounted, setMounted] = React.useState(false);

  const [timeRange, setTimeRange] = React.useState<
    "7d" | "30d" | "90d" | "all"
  >("30d");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sorted = React.useMemo(
    () => [...history].sort((a, b) => a.timestamp - b.timestamp),
    [history]
  );

  const chartData = React.useMemo(
    () =>
      sorted.map((h, i) => {
        const totalvotes = i === 0 ? 0 : h.totalvotes - sorted[i - 1].totalvotes;
        const upvotes = i === 0 ? 0 : h.upvotes - sorted[i - 1].upvotes;
        return {
          date: new Date(h.timestamp * 1000).toISOString(),
          daily_new_upvotes: upvotes,
          daily_new_downvotes: totalvotes - upvotes,
        };
      }),
    [sorted]
  );

  const filteredData = React.useMemo(() => {
    if (timeRange === "all") return chartData;

    const referenceDate = new Date(chartData.at(-1)!.date);

    let days = 30;
    if (timeRange === "7d") days = 7;
    if (timeRange === "90d") days = 90;

    const start = new Date(referenceDate);
    start.setDate(start.getDate() - days);

    return chartData.filter((item) => new Date(item.date) >= start);
  }, [chartData, timeRange]);

  // 🔒 guard AFTER hooks
  if (!mounted) return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-8 w-36" />
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <Skeleton className="h-62.5 w-full" />
      </CardContent>
    </Card>
  );

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Daily Vote Change
          </CardTitle>
          <CardDescription>
            Total votes and upvotes per day
          </CardDescription>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
            {Object.entries(chartConfig).map(([key, cfg]) => (
              <span key={key} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: cfg.color }}
                />
                {cfg.label}
              </span>
            ))}
          </div>

          <Select
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as "all" | "7d" | "30d" | "90d")}
          >
            <SelectTrigger className="hidden w-36 sm:flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-62.5 w-full"
        >
          <BarChart data={filteredData} barGap={2}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={40}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) =>
                Intl.NumberFormat("en", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(v)
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
              }
            />

            <Bar
              dataKey="daily_new_upvotes"
              fill="var(--color-daily_new_upvotes)"
              stackId="votes"
              radius={[0, 0, 0, 0]}
            />

            <Bar
              dataKey="daily_new_downvotes"
              fill="var(--color-daily_new_downvotes)"
              stackId="votes"
              radius={[3, 3, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
