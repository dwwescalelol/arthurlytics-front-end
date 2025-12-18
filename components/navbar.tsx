import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/games", label: "Games" },
  { href: "/categories", label: "Categories" },
  { href: "/vendors", label: "Vendors" },
  { href: "/developers", label: "Developers" },
];

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-400 px-6">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-lg font-semibold">Web Game Analytics</span>

            <nav className="flex gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
