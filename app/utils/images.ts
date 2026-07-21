import { cloudfront_domain } from "../data/consts";

/** Shown when a dog or post has lost its image, so a missing file never crashes a render. */
export const PLACEHOLDER_IMAGE = "/dog-card.png";

export function getImageSrc(src: string | null | undefined): string {
  if (!src) return PLACEHOLDER_IMAGE;
  // Absolute URLs and app-relative paths (local upload fallback) pass through untouched.
  if (src.startsWith("http") || src.startsWith("/")) return src;
  return `https://${cloudfront_domain}/${src}`;
}
