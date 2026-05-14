"use client";

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { columns } from "./game-columns";
import { GameTableToolbar, TimeframeOption, TIMEFRAME_BASE } from "./game-table-toolbar";
import { GameTable } from "./game-table";
import { GameTablePagination } from "./game-table-pagination";
import { bffClient } from "@/lib/clients/bff";
import { GameStats } from "@/types/games.types";

type Props = {
  initialData: GameStats[];
  initialPage: number;
  initialTotalPages: number;
  initialSort: string;
};

export function GameDataTable({
  initialData,
  initialPage,
  initialTotalPages,
}: Props) {
  const params = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const [timeframe, setTimeframe] = useState<TimeframeOption>("7d");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const sitesParam = params.get("sites");
  const sites = sitesParam ? sitesParam.split(",") : ["msn", "poki", "crazy"];
  const tagsParam = params.get("tags") ?? "";
  const showNewOnly = tagsParam.includes("new");
  const showTop250Only = tagsParam.includes("top250");

  const setSites = (next: string[]) => {
    const p = new URLSearchParams(params.toString());
    if (next.length < 3) p.set("sites", next.join(","));
    else p.delete("sites");
    p.set("page", "1");
    router.push(`/games?${p.toString()}`);
  };

  const setShowNewOnly = (val: boolean) => {
    const p = new URLSearchParams(params.toString());
    const tags = new Set(tagsParam.split(",").filter(Boolean));
    val ? tags.add("new") : tags.delete("new");
    if (tags.size > 0) p.set("tags", [...tags].join(","));
    else p.delete("tags");
    p.set("page", "1");
    router.push(`/games?${p.toString()}`);
  };

  const setShowTop250Only = (val: boolean) => {
    const p = new URLSearchParams(params.toString());
    const tags = new Set(tagsParam.split(",").filter(Boolean));
    val ? tags.add("top250") : tags.delete("top250");
    if (tags.size > 0) p.set("tags", [...tags].join(","));
    else p.delete("tags");
    p.set("page", "1");
    router.push(`/games?${p.toString()}`);
  };

  const queryString = params.toString();

  useEffect(() => {
    bffClient
      .getAllGames({
        page: params.get("page") ?? "1",
        sort: params.get("sort") ?? "",
        order: params.get("order") ?? "",
        search: params.get("search") ?? "",
        sites: sitesParam ?? undefined,
        tags: tagsParam || undefined,
      })
      .then((res) => {
        setData(res.data);
        setPage(res.meta.page);
        setTotalPages(res.meta.totalPages);
      });
  }, [queryString]);

  const cols = useMemo(() => columns(TIMEFRAME_BASE[timeframe]), [timeframe]);

  const table = useReactTable({
    data,
    columns: cols,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <GameTableToolbar
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        sites={sites}
        setSites={setSites}
        showNewOnly={showNewOnly}
        setShowNewOnly={setShowNewOnly}
        showTop250Only={showTop250Only}
        setShowTop250Only={setShowTop250Only}
      />

      <GameTable table={table} loading={false} />

      <GameTablePagination page={page} totalPages={totalPages} />
    </div>
  );
}
