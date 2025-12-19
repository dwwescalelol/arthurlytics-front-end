import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}) {
  const pages = getPages(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
        </PaginationItem>

        {pages.map((p, i) => (
          <PaginationItem key={i}>
            {p === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(totalPages, page + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
