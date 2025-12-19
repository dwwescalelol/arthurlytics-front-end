"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

type ScrollWithChevronProps = {
  maxHeightClass: string;
  children: React.ReactNode;
};

export function ScrollWithChevron({
  maxHeightClass,
  children,
}: ScrollWithChevronProps) {
  const [showChevron, setShowChevron] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const viewport = root.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement | null;

    if (!viewport) return;

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
  }, []);

  return (
    <div className="grid grid-rows-[1fr_auto]">
      <ScrollArea
        ref={rootRef}
        className={`${maxHeightClass} overflow-y-auto pr-2`}
      >
        {children}
      </ScrollArea>

      <ChevronDown
        className={`mx-auto mt-1 h-4 w-4 text-muted-foreground
          transition-opacity duration-300 ease-out
          ${showChevron ? "opacity-100" : "opacity-0"}
        `}
        aria-hidden
      />
    </div>
  );
}
