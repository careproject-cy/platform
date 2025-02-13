import { cloudfront_domain } from "../data/consts";

export function getImageSrc(src: string): string {
  return (src.startsWith("http") ? src : `https://${cloudfront_domain}/${src}`);
}
