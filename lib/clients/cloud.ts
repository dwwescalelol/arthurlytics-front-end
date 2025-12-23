import { GamesClient } from "./base";

const CLOUD_API_BASE =
  "https://by9omosqo0.execute-api.eu-west-2.amazonaws.com/prod/";

export const cloudClient: GamesClient = {
  async getAllGames({ page, sort, order, search }) {
    const url = new URL("allgames", CLOUD_API_BASE);
    url.searchParams.set("page", page);
    if (sort) url.searchParams.set("sort", sort);
    if (search) url.searchParams.set("search", search);
    if (order) url.searchParams.set("order", order);

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("API fetch failed");

    return res.json();
  },

  async getGame(site, id) {
    const url = new URL("gamehistory", CLOUD_API_BASE);
    url.searchParams.set("site", site);
    url.searchParams.set("id", id);

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("API fetch failed");

    return res.json();
  },
};
