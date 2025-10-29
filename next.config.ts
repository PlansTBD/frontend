import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lkjtlxtlxwqnqhvwlaed.supabase.co", "i.pinimg.com"],
  },
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;