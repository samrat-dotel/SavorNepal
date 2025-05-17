import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['localhost'], // 👈 This allows next/image to use images from your local backend
  },
  /* config options here */
};

export default nextConfig;
