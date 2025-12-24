"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollWithChevron } from "@/components/ScrollWithChevron";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SITE_STYLES = {
  poki: {
    bg: "bg-[#8eead8]",
    text: "text-[#065f46]",
  },
  crazy: {
    bg: "bg-[#6a45fe]",
    text: "text-white",
  },
  msn: {
    bg: "bg-[#62b36f]",
    text: "text-white",
  },
} as const;

export function GameHeader({ game }: { game: any }) {
  const site = game.site_game_id.split("#")[0] as keyof typeof SITE_STYLES;
  const siteStyle = SITE_STYLES[site];

  return (
    <TooltipProvider>
      <Card className="p-6 min-h-70">
        <div className="h-full flex items-center justify-center">
          <div className="flex w-full gap-4">
            {/* IMAGE */}
            <div className="relative h-56 w-48 shrink-0 overflow-hidden rounded-md">
              <Image
                src={game.thumbnail_url}
                alt={game.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-1 flex-col max-h-56">
              {/* TITLE ROW */}
              <div className="flex w-full items-start justify-between gap-2">
                <h1 className="flex items-center gap-2 text-xl font-semibold">
                  {game.name}
                  {siteStyle && (
                    <Badge
                      className={`${siteStyle.bg} ${siteStyle.text} border-none px-2 py-1 text-xs inline-flex items-center`}
                    >
                      {site}
                    </Badge>
                  )}
                </h1>

                {game.url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <span className="text-xs">Site link</span>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                Released{" "}
                {new Date(game.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>

              {/* SCROLL */}
              <div className="mt-3 flex-1">
                <ScrollWithChevron maxHeightClass="max-h-40">
                  <div className="space-y-3">
                    {/* DEVELOPER */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="w-fit cursor-default">
                          {game.developer_name || "Unknown Dev"}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <span className="text-xs">Developer</span>
                      </TooltipContent>
                    </Tooltip>

                    {/* CATEGORIES */}
                    <div className="flex flex-wrap gap-2">
                      {game.categories.map((cat: string) => (
                        <Tooltip key={cat}>
                          <TooltipTrigger asChild>
                            <Badge
                              key={cat}
                              variant="outline"
                              className="cursor-default"
                            >
                              {cat}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <span className="text-xs">Category</span>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {game.short_description}
                    </p>
                  </div>
                </ScrollWithChevron>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
