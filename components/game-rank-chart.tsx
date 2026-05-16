"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

const chartConfig = {
  global_rank: {
    label: "Global Rank",
    color: "var(--chart-4)",
  },
  site_rank: {
    label: "Site Rank",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

type HistoryItem = {
  timestamp: number;
  global_rank?: number;
  site_rank?: number;
};

const PILL_OPTIONS = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "all", label: "All" },
] as const;

export function GameRankChart({
  history,
  pill,
}: {
  history: HistoryItem[];
  pill?: boolean;
}) {
  const [mounted, setMounted] = React.useState(false);
  const [timeRange, setTimeRange] = React.useState<"7d" | "30d" | "90d" | "all">("30d");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = React.useMemo(() => {
    const sorted = [...history]
      .filter((h) => h.global_rank != null || h.site_rank != null)
      .sort((a, b) => a.timestamp - b.timestamp);

    return sorted.map((h) => ({
      date: new Date(h.timestamp * 1000).toISOString(),
      global_rank: h.global_rank ?? null,
      site_rank: h.site_rank ?? null,
    }));
  }, [history]);

  const filteredData = React.useMemo(() => {
    if (timeRange === "all" || chartData.length === 0) return chartData;
    const last = new Date(chartData.at(-1)!.date);
    const days = timeRange === "7d" ? 7 : timeRange === "90d" ? 90 : 30;
    const start = new Date(last);
    start.setDate(start.getDate() - days);
    return chartData.filter((item) => new Date(item.date) >= start);
  }, [chartData, timeRange]);

  if (!mounted)
    return (
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
            Rank History
          </CardTitle>
          <CardDescription>Global and site rank over time (lower is better)</CardDescription>
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

          <div className="flex items-center rounded-md border border-border/60 bg-muted/40 p-0.5 gap-0.5">
            {PILL_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTimeRange(value)}
                className={`rounded px-2.5 py-1 text-xs font-medium transition-all ${
                  timeRange === value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-62.5 w-full">
          <LineChart data={filteredData}>
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
              reversed
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(v) => `#${v}`}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                  formatter={(value, name, item) => (
                    <>
                      <div
                        className="shrink-0 rounded-[2px] h-2.5 w-2.5"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex flex-1 justify-between items-center leading-none">
                        <span className="text-muted-foreground">
                          {name === "global_rank" ? "Global Rank" : "Site Rank"}
                        </span>
                        <span className="text-foreground font-mono font-medium tabular-nums ml-4">
                          #{value}
                        </span>
                      </div>
                    </>
                  )}
                />
              }
            />

            <Line
              dataKey="global_rank"
              stroke="var(--color-global_rank)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />

            <Line
              dataKey="site_rank"
              stroke="var(--color-site_rank)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              connectNulls
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
