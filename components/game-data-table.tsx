"use client";

import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

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

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const [timeframe, setTimeframe] = useState<TimeframeOption>("7d");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sites, setSites] = useState<string[]>(["msn", "poki", "crazy"]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showTop250Only, setShowTop250Only] = useState(false);

  const queryString = params.toString();

  useEffect(() => {
    bffClient
      .getAllGames({
        page: params.get("page") ?? "1",
        sort: params.get("sort") ?? "",
        order: params.get("order") ?? "",
        search: params.get("search") ?? "",
      })
      .then((res) => {
        setData(res.data);
        setPage(res.meta.page);
        setTotalPages(res.meta.totalPages);
      });
  }, [queryString]);

  const cols = useMemo(() => columns(TIMEFRAME_BASE[timeframe]), [timeframe]);

  const filteredData = useMemo(() => {
    let d = data;
    if (showNewOnly) d = d.filter((g) => g.is_new);
    if (showTop250Only) d = d.filter((g) => g.new_in_top250);
    return d;
  }, [data, showNewOnly, showTop250Only]);

  const table = useReactTable({
    data: filteredData,
    columns: cols,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
