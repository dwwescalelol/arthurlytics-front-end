import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ClientOnly } from "@/components/client-only";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Web Game Analytics",
  description:
    "Explore web game voting data with interactive graphs and clear historical trends.",
  icons: {
    icon: "/icon-dark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientOnly>
            <Navbar />
          </ClientOnly>

          <main className="mx-auto max-w-400 px-6 py-6 min-h-screen">
            {children}
          </main>

          <ClientOnly>
            <Footer />
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}
