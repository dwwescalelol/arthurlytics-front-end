import { Card } from "@/components/ui/card";
import { GameVotesChart } from "@/components/game-votes-chart";
import { GameHeader } from "../../game/components/GameHeader";
import { GameStats } from "../../game/components/GameStats";
import { GameMeta } from "../../game/components/GameMeta";
import { GameDescription } from "../../game/components/GameDescription";
import { PageFadeIn } from "@/components/page-fade-in";
import { getGame } from "@/lib/games";

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

  const game = await getGame(site, id);
  return (
    <PageFadeIn>
      <div className="space-y-6">
        <GameMeta game={game} />

        <Card>
          <div className="grid grid-cols-[auto_1fr_auto] gap-8 p-6">
            <GameHeader game={game} />
            <GameStats game={game} />
          </div>
        </Card>

        <GameDescription game={game} />
        <GameVotesChart history={game.history} />
      </div>
    </PageFadeIn>
  );
}
