"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollWithChevron } from "@/components/ScrollWithChevron";
import { ExternalLink, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const SITE_DOT_COLORS: Record<string, string> = {
  poki: "bg-blue-500",
  msn: "bg-orange-400",
  crazy: "bg-emerald-500",
};

export function GameHeader({ game }: { game: any }) {
  const site = game.site_game_id.split("#")[0];
  const dotColor = SITE_DOT_COLORS[site] ?? "bg-muted-foreground";

  return (
    <TooltipProvider>
      <Card className="p-6 h-full">
        <div className="flex w-full gap-4">
          {/* IMAGE */}
          <div className="relative h-56 w-64 shrink-0 overflow-hidden rounded-xl">
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
              <h1 className="flex items-center gap-2 text-xl font-bold">
                {game.name}
                <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium capitalize">
                  <span className={cn("h-1.5 w-1.5 rounded-full", dotColor)} />
                  {site}
                </span>
              </h1>

              {game.url && (
                <a
                  href={game.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition"
                >
                  <ExternalLink className="h-3 w-3" />
                  Visit
                </a>
              )}
            </div>

            {(() => {
              const d = game.created_at ? new Date(game.created_at) : null;
              if (!d || isNaN(d.getTime())) return null;
              return (
                <p className="mt-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted-foreground">
                  Released{" "}
                  {d.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              );
            })()}

            {/* SCROLL */}
            <div className="mt-3 flex-1">
              <ScrollWithChevron maxHeightClass="max-h-40">
                <div className="space-y-3">
                  {/* DEVELOPER + CATEGORIES */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-0.5 text-xs font-medium cursor-pointer hover:bg-muted/70 transition-colors">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {game.developer_name || "Unknown"}
                    </span>

                    {game.categories?.map((cat: string) => (
                      <span
                        key={cat}
                        className="text-xs font-medium text-primary cursor-pointer hover:underline"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {game.short_description && (
                    <p className="text-sm text-muted-foreground">
                      {game.short_description}
                    </p>
                  )}
                </div>
              </ScrollWithChevron>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
