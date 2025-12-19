import { Card } from "@/components/ui/card";
import { GameVotesChart } from "@/components/game-votes-chart";
import { GameHeader } from "../../game/components/GameHeader";
import { GameStats } from "../../game/components/GameStats";
import { GameMeta } from "../../game/components/GameMeta";
import { GameDescription } from "../../game/components/GameDescription";

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

  const res = await fetch(
    `https://by9omosqo0.execute-api.eu-west-2.amazonaws.com/prod/gamehistory?site=${site}&id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("API fetch failed");
  }

  const game = await res.json();

  console.log("GAME OBJECT:", game);

  return (
    <div className="space-y-6">
      {/* META CARD */}
      <GameMeta game={game} />

      {/* MAIN INFO CARD */}
      <Card>
        <div className="grid grid-cols-[auto_1fr_auto] gap-8 p-6">
          <GameHeader game={game} />
          <GameStats game={game} />
        </div>
      </Card>

      <GameDescription game={game} />
      <GameVotesChart history={game.history} />
    </div>
  );
}
