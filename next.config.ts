import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   // Allow local images
  //   unoptimized: false,
  // },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.hardrockdrills.com" },
      { protocol: "https", hostname: "advanceglobalsupplies.net" },
      { protocol: "https", hostname: "iticollege.edu" },
      { protocol: "https", hostname: "media.istockphoto.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};
// www.hardrockdrills.com;
export default nextConfig;
