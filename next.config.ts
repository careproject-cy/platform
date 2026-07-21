import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { cloudfront_domain } from "./app/data/consts";

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days
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

export default withPayload(nextConfig);
