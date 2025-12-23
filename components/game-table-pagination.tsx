"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

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

export function GameTablePagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pages = getPages(page, totalPages);

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/games?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => goToPage(Math.max(1, page - 1))} />
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={p === page} onClick={() => goToPage(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => goToPage(Math.min(totalPages, page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
