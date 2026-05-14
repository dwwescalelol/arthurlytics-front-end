import { GamesClient } from "./base";
import allGames from "@/data/allgames.json";
import gameDetail from "@/data/pokigamedata.json";

export const mockClient: GamesClient = {
  async getAllGames({ page, sort, order, search, sites, tags }) {
    let data = [...allGames.data] as any[];

    if (sites) {
      const siteList = sites.split(",");
      data = data.filter((g) => siteList.includes(g.site_id));
    }

    if (tags) {
      const tagList = tags.split(",");
      if (tagList.includes("new")) data = data.filter((g) => g.is_new);
      if (tagList.includes("top250")) data = data.filter((g) => g.new_in_top250);
    }

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
