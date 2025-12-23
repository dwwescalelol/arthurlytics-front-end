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
import { GameTableToolbar } from "./game-table-toolbar";
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

  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sites, setSites] = useState<string[]>(["msn", "poki", "crazy"]);

  useEffect(() => {
    const page = params.get("page") ?? "1";
    const sort = params.get("sort") ?? "";
    const order = params.get("order") ?? "";
    const search = params.get("search") ?? "";

    bffClient.getAllGames({ page, sort, order, search }).then((res) => {
      setData(res.data);
      setPage(res.meta.page);
      setTotalPages(res.meta.totalPages);
    });
  }, [params]);

  const cols = useMemo(() => columns(timeframe), [timeframe]);

  const table = useReactTable({
    data,
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
      />

      <GameTable table={table} loading={false} />

      <GameTablePagination page={page} totalPages={totalPages} />
    </div>
  );
}
