"use client";

import * as React from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Monitor,
  Maximize,
  Smartphone as PortraitIcon,
  Monitor as LandscapeIcon,
} from "lucide-react";

import { GameVotesChart } from "@/components/game-votes-chart";
import game from "@/data/pokigamedata.json";

/* ---------- DATA ---------- */
const latest = game.history.at(-1)!;
const prev = game.history.at(-2)!;

const totalVotes = latest.totalvotes;
const upvotes = latest.upvotes;
const downvotes = totalVotes - upvotes;

const rating = Number(((upvotes / totalVotes) * 100).toFixed(1));

const hue = Math.max(0, Math.min(120, (rating / 100) * 120));
const ratingColor = `hsl(${hue}, 70%, 45%)`;

export default function Page() {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="grid grid-cols-[minmax(320px,420px)_1fr_auto] gap-8 p-6">
          {/* INFO */}

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
                className={`object-cover transition-opacity duration-600 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                priority
              />
            </div>

            <div className="space-y-3">
              <div>
                <h1 className="text-xl font-semibold">
                  {game.name} - <span>{game.site_game_id.split("#")[0]}</span>
                </h1>
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

          {/* STATS */}
          <div className="border-l border-r px-10 flex items-center">
            <div className="grid grid-cols-2 gap-6 w-full">
              <div>
                <div className="text-muted-foreground text-sm">Total votes</div>
                <div className="text-3xl font-semibold">
                  {Intl.NumberFormat().format(totalVotes)}
                </div>
              </div>

              <div>
                <div className="text-muted-foreground text-sm">Rating</div>
                <div
                  className="text-3xl font-semibold"
                  style={{ color: ratingColor }}
                >
                  {rating}%
                </div>
              </div>

              <div>
                <div className="text-muted-foreground text-sm">Upvotes</div>
                <div className="text-lg font-semibold text-green-600">
                  {Intl.NumberFormat().format(upvotes)}
                </div>
              </div>

              <div>
                <div className="text-muted-foreground text-sm">Downvotes</div>
                <div className="text-lg font-semibold text-red-600">
                  {Intl.NumberFormat().format(downvotes)}
                </div>
              </div>

              <div className="col-span-2 border-t pt-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground text-xs">Total</div>
                    <div className="font-medium">
                      {latest.totalvotes - prev.totalvotes >= 0 ? "+" : ""}
                      {latest.totalvotes - prev.totalvotes}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-xs">Rating</div>
                    <div className="font-medium">
                      {(
                        (latest.upvotes / latest.totalvotes) * 100 -
                        (prev.upvotes / prev.totalvotes) * 100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>

                  <div className="text-green-600">
                    <div className="text-muted-foreground text-xs">Upvotes</div>
                    <div className="font-medium">
                      +{latest.upvotes - prev.upvotes}
                    </div>
                  </div>

                  <div className="text-red-600">
                    <div className="text-muted-foreground text-xs">
                      Downvotes
                    </div>
                    <div className="font-medium">
                      +{downvotes - (prev.totalvotes - prev.upvotes)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* META */}
          <div className="flex items-center justify-end">
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center gap-2">
                {game.orientation === "both" ? (
                  <>
                    <PortraitIcon className="h-4 w-4" />
                    <LandscapeIcon className="h-4 w-4" />
                  </>
                ) : (
                  <span className="capitalize">{game.orientation}</span>
                )}
                <span>Orientation</span>
              </div>

              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>{game.mobile_friendly ? "Mobile" : "No mobile"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                <span>{game.desktop_friendly ? "Desktop" : "No desktop"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Maximize className="h-4 w-4" />
                <span>{game.fullscreen ? "Fullscreen" : "Windowed"}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Tech</span>
                <span>{game.technology}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: game.description }}
        />
      </Card>

      <GameVotesChart />
    </div>
  );
}
