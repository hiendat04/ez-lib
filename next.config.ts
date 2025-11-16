import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jcfcitg4mdqgayha.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**", // This allows any path under the hostname
      },
    ],
  },
};

export default nextConfig;
