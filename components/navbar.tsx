import Link from "next/link";
import { BarChart2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-400 px-6">
        <div className="flex h-12 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <BarChart2 className="h-4 w-4 text-primary" strokeWidth={2.5} />
            <span className="text-sm font-semibold tracking-tight">Arthurlytics</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
