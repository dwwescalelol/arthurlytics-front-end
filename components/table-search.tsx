"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function TableSearch() {
  const router = useRouter();
  const params = useSearchParams();

  const initial = params.get("search") ?? "";
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(params.toString());

      if (value) next.set("search", value);
      else next.delete("search");

      router.push(`?${next.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(id);
  }, [value, router]);

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search games…"
        className="h-8 w-56 rounded-md border border-border/60 bg-muted/40 pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  );
}
