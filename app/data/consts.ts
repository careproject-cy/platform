export const platform_name = "CARE Project";
export const slogan = "Every dog deserves a loving home. Help us give them a chance.";
export const subtitle = "CARE Project is a volunteer-led project rescuing stray dogs with medical care and rehab, socializing them, and promoting adoption. We help different shelters across Cyprus.";
export const longDescription = "At CARE Project, we believe volunteering in animal welfare is crucial for making a real difference. By giving our time and effort, we provide animals with a better chance at a loving home and a safer environment.";

export const cloudfront_domain = "d1ki5tb2ey2mtg.cloudfront.net";

export const domain = "careproject.cy";

export const social_img_url = `https://careproject.cy/social-preview.png`;

// Number of adopted dogs shown per page on /adopted/[page] (also used by the sitemap).
export const ADOPTED_PAGE_SIZE = 12;

// CARE Project is run by UANA Foundation, the registered non-profit behind it.
export const contact_email = "info@uanafoundation.com";
export const parent_org_name = "UANA Foundation";
export const parent_org_url = "https://uanafoundation.com";
export const parent_org_reg_number = "ΗΕ 442538";

// Pages that set their own openGraph replace the layout's object entirely, so each spreads this.
export const baseOpenGraph = {
  siteName: platform_name,
  locale: "en_GB",
  type: "website" as const,
};

// Static pages under /more, served from data/pages/<name>.md (also listed in the sitemap).
export const morePages = ["about", "adopt", "donate", "foster", "get-involved"];

/** Shelter area for each dog location value, for copy and descriptions. */
export const locationLabels: Record<string, string> = {
  germasogeia: "the Germasogeia shelter in Limassol",
  mesageitonia: "the Mesageitonia shelter in Limassol",
};
