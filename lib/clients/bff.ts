"use client";

import { AllGamesQuery } from "@/types/games.types";
import type { GamesClient } from "./base";

function buildQuery(params: Partial<AllGamesQuery>) {
  const entries = Object.entries(params).filter(
    ([_, value]) => value !== undefined && value !== null && value !== ""
  );

  return new URLSearchParams(entries as any).toString();
}

export const bffClient: GamesClient = {
  async getAllGames(params) {
    const query = buildQuery(params);

    // Relative URLs work in client components
    // But for server components, we guard
    const url =
      typeof window === "undefined"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/games?${query}`
        : `/api/games?${query}`;

    const res = await fetch(url);
    return res.json();
  },

  async getGame(site, id) {
    const query = new URLSearchParams({
      site: site ?? "",
      id: id ?? "",
    })
      .toString()
      .replace(/(^&+|&+$)/g, "");

    const url =
      typeof window === "undefined"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/game?${query}`
        : `/api/game?${query}`;

    const res = await fetch(url);
    return res.json();
  },
};
