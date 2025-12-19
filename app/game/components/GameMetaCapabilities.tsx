"use client";

import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Game } from "@/types/game";
import {
  Smartphone,
  Monitor,
  Smartphone as PortraitIcon,
  Monitor as LandscapeIcon,
  Code,
  Server,
  Globe,
  Layers,
  Box,
  Zap,
} from "lucide-react";
import { SiApple, SiAndroid } from "react-icons/si";

import React from "react";

const techMap: Record<string, { icon: React.ElementType; label: string }> = {
  iframe: { icon: Code, label: "Iframe embed" },
  html5: { icon: Globe, label: "HTML5" },
  webgl: { icon: Layers, label: "WebGL" },
  unity: { icon: Box, label: "Unity" },
  flash: { icon: Zap, label: "Flash (legacy)" },
};

export function GameMetaCapabilities({ game }: { game: Game }) {
  const hasPlatform =
    game.mobile_friendly === true || game.desktop_friendly === true;

  const hasOrientation =
    game.orientation === "portrait" ||
    game.orientation === "landscape" ||
    game.orientation === "both";

  const hasFullscreen = game.fullscreen === true;
  const hasSelfHosted = game.is_self_hosted === true;

  const hasTech = !!game.technology && !!techMap[game.technology.toLowerCase()];

  const hasMeta =
    hasPlatform || hasOrientation || hasFullscreen || hasTech || hasSelfHosted;

  if (!hasMeta) return null;

  const showPlatform =
    game.mobile_friendly !== null || game.desktop_friendly !== null;

  return (
    <TooltipProvider>
      <Card className="inline-flex w-fit p-2">
        <div className="flex items-center gap-3 text-muted-foreground">
          {showPlatform ? (
            <>
              {game.mobile_friendly && (
                <Icon tip="Mobile supported">
                  <Smartphone className="h-4 w-4" />
                </Icon>
              )}
              {game.desktop_friendly && (
                <Icon tip="Desktop supported">
                  <Monitor className="h-4 w-4" />
                </Icon>
              )}
            </>
          ) : (
            <>
              {(game.orientation === "portrait" ||
                game.orientation === "both") && (
                <Icon tip="Portrait">
                  <PortraitIcon className="h-4 w-4" />
                </Icon>
              )}
              {(game.orientation === "landscape" ||
                game.orientation === "both") && (
                <Icon tip="Landscape">
                  <LandscapeIcon className="h-4 w-4" />
                </Icon>
              )}
            </>
          )}

          {/* OS-specific */}

          {game.ios_friendly && (
            <Icon tip="iOS supported">
              <SiApple className="h-4 w-4" />
            </Icon>
          )}

          {game.android_friendly && (
            <Icon tip="Android supported">
              <SiAndroid className="h-4 w-4" />
            </Icon>
          )}

          {/* Self-hosted */}
          {game.is_self_hosted && (
            <Icon tip="Self-hosted">
              <Server className="h-4 w-4" />
            </Icon>
          )}

          {game.technology && techMap[game.technology.toLowerCase()] && (
            <Icon tip={techMap[game.technology.toLowerCase()].label}>
              {React.createElement(
                techMap[game.technology.toLowerCase()].icon,
                { className: "h-4 w-4" }
              )}
            </Icon>
          )}
        </div>
      </Card>
    </TooltipProvider>
  );
}

function Icon({ children, tip }: { children: React.ReactNode; tip: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="cursor-default">{children}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span className="text-xs">{tip}</span>
      </TooltipContent>
    </Tooltip>
  );
}
