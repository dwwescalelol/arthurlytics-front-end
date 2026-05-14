import { client } from "@/lib/clients";
import { PageFadeIn } from "@/components/page-fade-in";
import { SetDocumentTitle } from "@/components/set-document-title";
import { GameVotesChart } from "@/components/game-votes-chart";
import { GameRankChart } from "@/components/game-rank-chart";
import { GameHero } from "../../game/components/GameHero";
import { GameStatTiles } from "../../game/components/GameStatTiles";
import { GameInfoSection } from "../../game/components/GameInfoSection";

export default async function Page({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  if (!key.includes("-")) {
    throw new Error("Invalid game key");
  }

  const dashIndex = key.indexOf("-");
  const site = key.slice(0, dashIndex);
  const id = key.slice(dashIndex + 1);

  const game = await client.getGame(site, id);

  return (
    <PageFadeIn>
      <SetDocumentTitle title={`${game.name} · ${site.toUpperCase()}`} />
      <div className="space-y-6">
        <GameHero game={game} />
        <GameStatTiles
          history={game.history}
          globalRank={game.global_rank ?? null}
          siteRank={game.site_rank ?? null}
        />
        <GameVotesChart history={game.history} pill />
        <GameRankChart history={game.history} />
        <GameInfoSection game={game} />
      </div>
    </PageFadeIn>
  );
}
