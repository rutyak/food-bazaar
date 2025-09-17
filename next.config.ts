import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['media-assets.swiggy.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
