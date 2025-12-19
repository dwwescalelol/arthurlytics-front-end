"use client";

import * as React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

export function GameHeader({ game }: { game: any }) {
  const [showChevron, setShowChevron] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const viewport = root.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement;

    const update = () => {
      const atBottom =
        viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1;

      setShowChevron(
        viewport.scrollHeight > viewport.clientHeight && !atBottom
      );
    };

    update();
    viewport.addEventListener("scroll", update);
    return () => viewport.removeEventListener("scroll", update);
  }, [game]);

  return (
    <div className="flex gap-4">
      {/* IMAGE */}
      <div className="relative h-56 w-48 shrink-0 overflow-hidden rounded-md border">
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

        {/* SCROLL */}
        <div className="mt-3 flex-1 grid grid-rows-[1fr_auto]">
          <ScrollArea ref={rootRef} className="max-h-40 overflow-y-auto pr-2">
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
          </ScrollArea>

          <ChevronDown
            className={`mx-auto mt-1 h-4 w-4 text-muted-foreground
    transition-opacity duration-300 ease-out
    ${showChevron ? "opacity-100" : "opacity-0"}
  `}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
