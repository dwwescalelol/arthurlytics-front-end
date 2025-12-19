"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function GameHeader({ game }: { game: any }) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="flex gap-4">
      <div className="relative h-56 w-48 shrink-0 overflow-hidden rounded-md border">
        <Skeleton
          className={`absolute inset-0 transition-opacity duration-600 ${
            imageLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          src={game.thumbnail_url}
          alt={game.name}
          fill
          priority
          className={`object-cover transition-opacity duration-600 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="space-y-3">
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

        <Badge>{game.developer_name}</Badge>

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
    </div>
  );
}
