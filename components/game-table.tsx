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
import { ArrowUp, ArrowDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
      const nextOrder = currentOrder === "asc" ? "desc" : "asc";
      params.set("order", nextOrder);
    } else {
      params.delete("order");
    }

    params.set("sort", columnId);
    params.set("page", "1");

    router.push(`/games?${params.toString()}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => {
                const isActive = currentSort === h.column.id;
                const isAsc = isActive && currentOrder === "asc";
                const isDesc = isActive && currentOrder === "desc";

                return (
                  <TableHead
                    key={h.id}
                    onClick={() => h.column.getCanSort() && onSort(h.column.id)}
                    className={h.column.getCanSort() ? "cursor-pointer" : ""}
                  >
                    <span className="inline-flex items-center gap-1">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {isAsc && <ArrowUp className="h-3 w-3" />}
                      {isDesc && <ArrowDown className="h-3 w-3" />}
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
                className="h-24 text-center"
              >
                Loading…
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="h-24 text-center"
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
