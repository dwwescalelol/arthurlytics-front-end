"use client";

import { flexRender, Table as TableType } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  table: TableType<any>;
  loading: boolean;
};

export function GameTable({ table, loading }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order") ?? "desc";

  const onSort = (columnId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSort === columnId) {
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      params.delete("order");
    }

    params.set("sort", columnId);
    params.set("page", "1");

    router.push(`/games?${params.toString()}`);
  };

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id} className="hover:bg-transparent border-border/60">
              {hg.headers.map((h) => {
                const sortable = h.column.getCanSort();
                const isActive = currentSort === h.column.id;
                const isAsc = isActive && currentOrder === "asc";
                const isDesc = isActive && currentOrder === "desc";

                const alignRight = (h.column.columnDef.meta as any)?.align === "right";

                return (
                  <TableHead
                    key={h.id}
                    onClick={() => sortable && onSort(h.column.id)}
                    className={cn(
                      "h-9 px-4 text-[11px] font-medium uppercase tracking-wide select-none",
                      sortable && "cursor-pointer",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span className={cn(
                      "inline-flex items-center gap-1",
                      alignRight && "flex-row-reverse w-full"
                    )}>
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {sortable && (
                        isAsc ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : isDesc ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronsUpDown className="h-3 w-3 opacity-30" />
                        )
                      )}
                    </span>
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                Loading…
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-border/40 text-sm"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-4 py-2.5">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center text-sm text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
