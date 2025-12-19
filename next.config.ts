import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.poki-cdn.com",
      },
      {
        protocol: "https",
        hostname: "imgs.crazygames.com",
      },
      {
        protocol: "https",
        hostname: "thaka.bing.com",
      },
    ],
  },
};

export default nextConfig;
