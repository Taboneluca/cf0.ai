import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint during production builds (handled by CI/editor locally)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
