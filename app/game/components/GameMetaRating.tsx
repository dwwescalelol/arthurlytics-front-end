"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Game } from "@/types/game";

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
      <Card className="inline-flex w-fit p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-6 min-w-6 items-center justify-center px-1 text-xs font-bold text-muted-foreground">
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
      </Card>
    </TooltipProvider>
  );
}
