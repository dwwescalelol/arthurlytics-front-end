"use client";

import {
  Smartphone,
  Monitor,
  Maximize,
  Smartphone as PortraitIcon,
  Monitor as LandscapeIcon,
} from "lucide-react";

export function GameMeta({ game }: { game: any }) {
  return (
    <div className="flex items-center justify-end">
      <div className="space-y-2 text-sm">
        <Row>
          {game.orientation === "both" ? (
            <>
              <PortraitIcon className="h-4 w-4" />
              <LandscapeIcon className="h-4 w-4" />
            </>
          ) : (
            <span className="capitalize">{game.orientation}</span>
          )}
          <span>Orientation</span>
        </Row>

        <Row>
          <Smartphone className="h-4 w-4" />
          <span>{game.mobile_friendly ? "Mobile" : "No mobile"}</span>
        </Row>

        <Row>
          <Monitor className="h-4 w-4" />
          <span>{game.desktop_friendly ? "Desktop" : "No desktop"}</span>
        </Row>

        <Row>
          <Maximize className="h-4 w-4" />
          <span>{game.fullscreen ? "Fullscreen" : "Windowed"}</span>
        </Row>

        <Row>
          <span className="font-medium">Tech</span>
          <span>{game.technology}</span>
        </Row>
      </div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
