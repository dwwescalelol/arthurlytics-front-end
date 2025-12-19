"use client";

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

import { Game } from "@/types/game";
import { columns } from "./game-columns";
import { GameTableToolbar } from "./game-table-toolbar";
import { GameTable } from "./game-table";
import { GameTablePagination } from "./game-table-pagination";

const API_URL =
  "https://by9omosqo0.execute-api.eu-west-2.amazonaws.com/prod/allgames";

type GamesResponse = {
  data: Game[];
  meta: {
    page: number;
    totalPages: number;
  };
};

export function GameDataTable() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [sites, setSites] = useState<string[]>(["msn", "poki", "crazy"]);

  const [page, setPage] = useState(1);
  const [data, setData] = useState<Game[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const cols = useMemo(() => columns(timeframe), [timeframe]);

  useEffect(() => {
    setLoading(true);

    const url = new URL(API_URL);
    url.searchParams.set("page", String(page));
    if (sorting[0]?.id) url.searchParams.set("sort", sorting[0].id);

    fetch(url.toString())
      .then((r) => r.json())
      .then((json: GamesResponse) => {
        setData(json.data);
        setTotalPages(json.meta.totalPages);
      })
      .finally(() => setLoading(false));
  }, [page, sorting]);

  const table = useReactTable({
    data,
    columns: cols,
    state: { columnFilters, sorting },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualSorting: true,
  });

  useEffect(() => {
    table.getColumn("site_id")?.setFilterValue(sites);
  }, [sites, table]);

  return (
    <div className="space-y-4">
      <GameTableToolbar
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        sites={sites}
        setSites={setSites}
      />

      <GameTable table={table} loading={loading} />

      <GameTablePagination
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
