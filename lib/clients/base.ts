import { AllGamesQuery, AllGamesResponse, Game } from "@/types/games.types";

export interface GamesClient {
  getAllGames(args: AllGamesQuery): Promise<AllGamesResponse>;
  getGame(site: string, id: string): Promise<Game>;
}
