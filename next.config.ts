import type { NextConfig } from "next";
import { cloudfront_domain } from "./app/data/consts";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: cloudfront_domain,
      },
    ],
  },
};

export default nextConfig;
