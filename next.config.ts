import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { cloudfront_domain } from "./app/data/consts";

// A fork points S3_PUBLIC_BASE_URL at its own CDN; allow that host so next/image does not 500.
// Both are listed so CARE's CloudFront and a fork's host work without editing this file.
const mediaHostnames = Array.from(
  new Set(
    [
      process.env.S3_PUBLIC_BASE_URL ? new URL(process.env.S3_PUBLIC_BASE_URL).hostname : null,
      cloudfront_domain,
    ].filter((h): h is string => Boolean(h)),
  ),
);

const nextConfig: NextConfig = {
  images: {
    minimumCacheTTL: 2678400, // 31 days
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      ...mediaHostnames.map((hostname) => ({ protocol: 'https' as const, hostname })),
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Stops /admin being framed, so a volunteer cannot be clickjacked into destructive actions.
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default withPayload(nextConfig);
