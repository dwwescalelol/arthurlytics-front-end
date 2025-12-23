"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SiApple,
  SiGoogleplay,
  SiFandom,
  SiWikipedia,
  SiSteam,
} from "react-icons/si";
import { Link } from "lucide-react";
import { Game } from "@/types/games.types";

const linkMap: Record<string, { icon: React.ElementType; label: string }> = {
  apple_store: { icon: SiApple, label: "App Store" },
  google_play: { icon: SiGoogleplay, label: "Google Play" },
  fandom: { icon: SiFandom, label: "Fandom Wiki" },
  wikipedia: { icon: SiWikipedia, label: "Wikipedia" },
  steam: { icon: SiSteam, label: "Steam" },
  source: { icon: Link, label: "Source Site" },
};

export function GameMetaLinks({ game }: { game: Game }) {
  if (!game.linked_urls) return null;

  const entries = Object.entries(game.linked_urls).filter(
    ([key, url]) => url && linkMap[key]
  );

  if (entries.length === 0) return null;

  return (
    <TooltipProvider>
      <Card className="inline-flex w-fit p-2">
        <div className="flex items-center gap-3 text-muted-foreground">
          {entries.map(([key, url]) => {
            const Icon = linkMap[key].icon;
            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <span className="text-xs">{linkMap[key].label}</span>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </Card>
    </TooltipProvider>
  );
}
