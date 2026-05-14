import Image from "next/image";
import { ExternalLink, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SITE_DOT_COLORS: Record<string, string> = {
  poki: "bg-blue-500",
  msn: "bg-orange-400",
  crazy: "bg-emerald-500",
};

export function GameHero({ game }: { game: any }) {
  const site = game.site_game_id?.split("#")[0] ?? "";
  const dotColor = SITE_DOT_COLORS[site] ?? "bg-muted-foreground";

  return (
    <div className="flex items-center gap-4">
      {game.thumbnail_url && (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={game.thumbnail_url}
            alt={game.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 items-center gap-3 min-w-0">
        <h1 className="text-2xl font-bold truncate">{game.name}</h1>

        <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize shrink-0">
          <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
          {site}
        </span>

        {game.developer_name && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium shrink-0">
            <User className="h-3 w-3 text-muted-foreground" />
            {game.developer_name}
          </span>
        )}

        <div className="ml-auto flex items-center gap-2">
          {game.categories?.map((cat: string) => (
            <span
              key={cat}
              className="shrink-0 inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {game.url && (
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Visit game
        </a>
      )}
    </div>
  );
}
