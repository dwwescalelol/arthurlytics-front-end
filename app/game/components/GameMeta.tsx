import { GameMetaCapabilities } from "./GameMetaCapabilities";
import { GameMetaLinks } from "./GameMetaLinks";
import { GameMetaTags } from "./GameMetaTags";
import { GameMetaRating } from "./GameMetaRating";
import { Game } from "@/types/games.types";
export function GameMeta({ game }: { game: Game }) {
  return (
    <div className="inline-flex w-fit items-center divide-x overflow-hidden rounded-xl border bg-card shadow-sm">
      <GameMetaCapabilities game={game} />
      <GameMetaLinks game={game} />
      <GameMetaTags game={game} />
      <GameMetaRating game={game} />
    </div>
  );
}
