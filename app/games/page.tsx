import { GameDataTable } from "@/components/game-data-table";
import { cloudClient } from "@/lib/clients/cloud";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page?: string;
    sort?: string;
    order?: string;
    search?: string;
  };
}) {
  const page = searchParams.page ?? "1";
  const sort = searchParams.sort ?? "";
  const order = searchParams.order ?? "";
  const search = searchParams.search ?? "";

  const result = await cloudClient.getAllGames({
    page,
    sort,
    order,
    search,
  });

  return (
    <GameDataTable
      initialData={result.data}
      initialPage={result.meta.page}
      initialTotalPages={result.meta.totalPages}
      initialSort={sort}
    />
  );
}
