"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Game } from "@/types/games.types";

const ratingInfo: Record<string, string> = {
  E: "Everyone",
  "E10+": "Everyone 10+",
  T: "Teen (13+)",
  M: "Mature (17+)",
  AO: "Adults Only (18+)",
};

export function GameMetaRating({ game }: { game: Game }) {
  const rating = game.esbr_rating;
  if (!rating) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center px-3 py-2 text-xs font-bold text-muted-foreground cursor-default">
            {rating}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <div className="text-xs">
            <div className="font-medium">ESRB Rating</div>
            <div>{ratingInfo[rating] ?? "Rating information"}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
