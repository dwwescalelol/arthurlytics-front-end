"use client";

import { useEffect, useState } from "react";

export function PageFadeIn({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
