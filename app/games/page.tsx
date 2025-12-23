import { getAllGames } from "@/lib/games";
import { GameDataTable } from "@/components/game-data-table";

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: string; sort?: string };
}) {
  const page = searchParams.page ?? "1";
  const sort = searchParams.sort ?? "";

  const response = await getAllGames(sort, page);

  return (
    <GameDataTable
      initialData={response.data}
      initialPage={response.meta.page}
      initialTotalPages={response.meta.totalPages}
      initialSort={sort}
    />
  );
}
