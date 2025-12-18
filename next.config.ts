import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.poki-cdn.com",
      },
    ],
  },
};

export default nextConfig;
