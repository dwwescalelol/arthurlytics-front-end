"use client";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import { ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import allgames from "@/data/allgames.json";
import { Game } from "@/types/game";
import { columns } from "./game-columns";

const getPages = (page: number, total: number) => {
  const pages: (number | "...")[] = [];

  if (page > 2) pages.push(1);
  if (page > 3) pages.push("...");

  for (let p = Math.max(1, page - 1); p <= Math.min(total, page + 1); p++) {
    pages.push(p);
  }

  if (page < total - 2) pages.push("...");
  if (page < total - 1) pages.push(total);

  return pages;
};

export function GameDataTable() {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(allgames.meta.page);

  const [sites, setSites] = useState<string[]>(["msn", "poki", "crazy"]);

  const cols = useMemo(() => columns(timeframe), [timeframe]);

  const table = useReactTable({
    data: allgames.data as Game[],
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

  useEffect(() => {
    table.getColumn("site_id")?.setFilterValue(sites);
  }, [sites, table]);

  const { totalPages } = allgames.meta;
  const pages = getPages(page, totalPages);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-3 rounded-md border px-3 py-2">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            Sites
          </span>

          {["poki", "msn", "crazy"].map((site) => (
            <label
              key={site}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <Checkbox
                className="translate-y-px"
                checked={sites.includes(site)}
                onCheckedChange={(checked) => {
                  setSites((prev) => {
                    const next = checked
                      ? [...prev, site]
                      : prev.filter((s) => s !== site);

                    return next.length === 0 ? prev : next;
                  });
                }}
              />
              {site}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="inline-flex w-3">
                        {header.column.getIsSorted() === "asc" && (
                          <ArrowUp className="h-3 w-3" />
                        )}
                        {header.column.getIsSorted() === "desc" && (
                          <ArrowDown className="h-3 w-3" />
                        )}
                      </span>
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={cols.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-disabled={page === 1}
            />
          </PaginationItem>

          {pages.map((p, i) => (
            <PaginationItem key={`${p}-${i}`}>
              {p === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-disabled={page === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
