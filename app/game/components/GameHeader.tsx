"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollWithChevron } from "@/components/ScrollWithChevron";

export function GameHeader({ game }: { game: any }) {
  return (
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

      {/* RIGHT COLUMN — WIDTH CONSTRAINED */}
      <div className="flex flex-col max-h-56 w-[320px]">
        {/* TITLE */}
        <div>
          <h1 className="text-xl font-semibold">
            {game.name} – {game.site_game_id.split("#")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Released{" "}
            {new Date(game.created_at.replace(/:0+Z$/, "Z")).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </p>
        </div>

        {/* SCROLL (REUSED COMPONENT) */}
        <div className="mt-3 flex-1">
          <ScrollWithChevron maxHeightClass="max-h-40">
            <div className="space-y-3">
              <Badge className="w-fit">{game.developer_name}</Badge>

              <div className="flex flex-wrap gap-2">
                {game.categories.map((cat: string) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
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
  );
}
