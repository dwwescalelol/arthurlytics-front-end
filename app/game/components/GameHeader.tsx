"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollWithChevron } from "@/components/ScrollWithChevron";
import { ExternalLink } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function GameHeader({ game }: { game: any }) {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
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
        <div className="flex flex-col max-h-56 w-[320px]">
          {/* TITLE ROW */}
          <div>
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-xl font-semibold">
                {game.name} – {game.site_game_id.split("#")[0]}
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
              {new Date(
                game.created_at.replace(/:0+Z$/, "Z")
              ).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

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
                        <Badge variant="outline" className="cursor-default">
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
    </TooltipProvider>
  );
}
