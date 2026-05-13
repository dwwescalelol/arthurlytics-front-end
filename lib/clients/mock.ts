import { GamesClient } from "./base";
import allGames from "@/data/allgames.json";
import gameDetail from "@/data/pokigamedata.json";

export const mockClient: GamesClient = {
  async getAllGames({ page, sort, order, search }) {
    let data = [...allGames.data] as any[];

    if (search) {
      data = data.filter((g) =>
        g.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort) {
      data.sort((a, b) => {
        const aVal = a[sort] ?? 0;
        const bVal = b[sort] ?? 0;
        return order === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    const pageNum = parseInt(page ?? "1", 10);
    const pageSize = 50;
    const start = (pageNum - 1) * pageSize;
    const paged = data.slice(start, start + pageSize);

    return {
      data: paged,
      meta: {
        page: pageNum,
        count: paged.length,
        totalPages: Math.ceil(data.length / pageSize),
      },
    };
  },

  async getGame(_site, _id) {
    return gameDetail as any;
  },
};
