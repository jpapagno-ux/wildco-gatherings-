import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }, { protocol: "https", hostname: "symphony.cdn.tambourine.com" }],
  },
};

export default nextConfig;
