"use client";

import { Input } from "@/components/ui/input";
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
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search…"
      className="w-64"
    />
  );
}
