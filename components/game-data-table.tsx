"use client";

import {
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { GameStats } from "@/types/game-stats";
import { columns } from "./game-columns";
import { GameTableToolbar } from "./game-table-toolbar";
import { GameTable } from "./game-table";
import { GameTablePagination } from "./game-table-pagination";

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
  initialSort,
}: Props) {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>(
    initialSort ? [{ id: initialSort, desc: false }] : []
  );
  const [sites, setSites] = useState<string[]>(["msn", "poki", "crazy"]);

  const data = initialData;
  const totalPages = initialTotalPages;

  const cols = useMemo(() => columns(timeframe), [timeframe]);

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

  return (
    <div className="space-y-4">
      <GameTableToolbar
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        sites={sites}
        setSites={setSites}
      />

      <GameTable table={table} loading={false} />

      <GameTablePagination page={initialPage} totalPages={totalPages} />
    </div>
  );
}
