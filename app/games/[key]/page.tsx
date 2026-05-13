import { Card } from "@/components/ui/card";
import { GameVotesChart } from "@/components/game-votes-chart";
import { GameHeader } from "../../game/components/GameHeader";
import { GameMeta } from "../../game/components/GameMeta";
import { GameDescription } from "../../game/components/GameDescription";
import { PageFadeIn } from "@/components/page-fade-in";
import { client } from "@/lib/clients";
import { SetDocumentTitle } from "@/components/set-document-title";
import { GameStats } from "../../game/components/GameStats/index";

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
        <GameMeta game={game} />

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-6 items-stretch">
          <GameHeader game={game} />

          <GameStats game={game} />
        </div>

        <GameVotesChart history={game.history} />
        <GameDescription game={game} />
      </div>
    </PageFadeIn>
  );
}
