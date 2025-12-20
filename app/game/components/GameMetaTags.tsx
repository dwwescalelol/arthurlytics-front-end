"use client";

import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Game } from "@/types/game";

const WIDTH = 500;
const STEP = 350;

export function GameMetaTags({ game }: { game: Game }) {
  if (!game.tags?.length) return null;

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const canLeft = offset > 0;
  const canRight = offset < maxOffset;

  useLayoutEffect(() => {
    const v = viewportRef.current;
    const c = contentRef.current;
    if (!v || !c) return;

    const max = Math.max(0, c.scrollWidth - v.clientWidth);
    setMaxOffset(max);
    setOffset((o) => (o > max ? max : o));
  }, [game.tags, canLeft, canRight]);

  const move = (dir: "left" | "right") => {
    setOffset((o) => {
      if (dir === "right") return Math.min(o + STEP, maxOffset);
      return Math.max(o - STEP, 0);
    });
  };

  return (
    <Card className="p-1 w-fit min-w-0 max-w-[500px]">
      <div className="flex items-center gap-1 ">
        {canLeft && (
          <div className="opacity-">
            <button
              onClick={() => move("left")}
              className="h-6 w-6 flex items-center justify-center
                transition-opacity"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        )}

        <div ref={viewportRef} className="flex-1 overflow-hidden">
          <div
            ref={contentRef}
            className="flex gap-2 whitespace-nowrap transition-transform"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="shrink-0 rounded-md border px-2 py-0.5 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {canRight && (
          <button
            onClick={() => move("right")}
            className="h-6 w-6 flex items-center justify-center
                       [mask-image:linear-gradient(to_left,transparent,black_40%)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </Card>
  );
}
