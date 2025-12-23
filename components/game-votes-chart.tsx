"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
  daily_new_totalvotes: {
    label: "Daily Total Votes",
    color: "var(--chart-1)",
  },
  daily_new_upvotes: {
    label: "Daily Up Votes",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type HistoryItem = {
  timestamp: number;
  totalvotes: number;
  upvotes: number;
};

export function GameVotesChart({ history }: { history: HistoryItem[] }) {
  const [timeRange, setTimeRange] = React.useState<
    "7d" | "30d" | "90d" | "all"
  >("30d");

  const sorted = React.useMemo(
    () => [...history].sort((a, b) => a.timestamp - b.timestamp),
    [history]
  );

  const chartData = React.useMemo(
    () =>
      sorted.map((h, i) => ({
        date: new Date(h.timestamp * 1000).toISOString(),
        daily_new_totalvotes:
          i === 0 ? 0 : h.totalvotes - sorted[i - 1].totalvotes,
        daily_new_upvotes: i === 0 ? 0 : h.upvotes - sorted[i - 1].upvotes,
      })),
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

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Votes – Daily Change</CardTitle>
          <CardDescription>
            Daily deltas for total votes and upvotes
          </CardDescription>
        </div>

        <Select
          value={timeRange}
          onValueChange={(v) => setTimeRange(v as "all" | "7d" | "30d" | "90d")}
        >
          <SelectTrigger className="hidden w-40 sm:flex">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-daily_new_totalvotes)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-daily_new_totalvotes)"
                  stopOpacity={0.05}
                />
              </linearGradient>

              <linearGradient id="fillUpvotes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-daily_new_upvotes)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-daily_new_upvotes)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
              tickFormatter={(v) => Intl.NumberFormat().format(v)}
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

            <Area
              dataKey="daily_new_totalvotes"
              type="natural"
              fill="url(#fillTotal)"
              stroke="var(--color-daily_new_totalvotes)"
            />

            <Area
              dataKey="daily_new_upvotes"
              type="natural"
              fill="url(#fillUpvotes)"
              stroke="var(--color-daily_new_upvotes)"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
