import { GameDataTable } from "@/components/game-data-table";
import { client } from "@/lib/clients";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    order?: string;
    search?: string;
  }>;
}) {
  const {
    page: pageParam,
    sort: sortParam,
    order: orderParam,
    search: searchParam,
  } = await searchParams;

  const page = pageParam ?? "1";
  const sort = sortParam ?? "";
  const order = orderParam ?? "";
  const search = searchParam ?? "";
  const result = await client.getAllGames({ page, sort, order, search }).catch(() => null);

  return (
    <GameDataTable
      initialData={result?.data ?? []}
      initialPage={result?.meta.page ?? 1}
      initialTotalPages={result?.meta.totalPages ?? 1}
      initialSort={sort}
    />
  );
}
