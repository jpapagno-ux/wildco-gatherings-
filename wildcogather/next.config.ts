import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // James, 30 Oct 2026: the MORE villas became Gatherings VIP; /vip/more is the canonical page.
  async redirects() {
    return [{ source: "/collections/more", destination: "/vip/more", permanent: true }];
  },
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudinary-loader.ts",
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }, { protocol: "https", hostname: "symphony.cdn.tambourine.com" }],
  },
};

export default nextConfig;
