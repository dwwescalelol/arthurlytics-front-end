"use client";

import * as React from "react";
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
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () =>
      setShowChevron(
        el.scrollHeight > el.clientHeight &&
          el.scrollTop + el.clientHeight < el.scrollHeight - 1
      );

    update();
    el.addEventListener("scroll", update);
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <div>
      <div ref={ref} className={`${maxHeightClass} overflow-y-auto pr-2`}>
        {children}
      </div>
      <ChevronDown
        className={`mx-auto mt-1 h-4 w-4 text-muted-foreground transition-opacity duration-300 ease-out ${
          showChevron ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />
    </div>
  );
}
