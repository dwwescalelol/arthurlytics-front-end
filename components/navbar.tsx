"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/games", label: "Games" },
  { href: "/categories", label: "Categories" },
  { href: "/vendors", label: "Vendors" },
  { href: "/developers", label: "Developers" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-400 px-6">
        <div className="flex h-12 items-center justify-between">

          {/* Left: Logo + divider + nav */}
          <div className="flex items-center gap-5">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <BarChart2 className="h-4 w-4 text-primary" strokeWidth={2.5} />
              <span className="text-sm font-semibold tracking-tight">Arthurlytics</span>
            </Link>

            <div className="h-4 w-px bg-border" />

            <nav className="flex items-center gap-0.5">
              {links.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Search + theme toggle */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 rounded-md border border-border/60 bg-muted/40 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground shadow-sm ring-1 ring-border sm:inline-block">
                ⌘K
              </kbd>
            </button>
            <ThemeToggle />
          </div>

        </div>
      </div>
    </header>
  );
}
