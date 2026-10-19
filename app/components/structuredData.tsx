import {
  contact_email,
  domain,
  parent_org_name,
  parent_org_reg_number,
  parent_org_url,
  platform_name,
  social_img_url,
} from "@/app/data/consts"

const baseUrl = `https://${domain}`
const orgId = `${baseUrl}/#organization`

// One graph so the WebSite, the NGO and its parent reference each other by @id.
const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": orgId,
      name: platform_name,
      alternateName: ["Cyprus Animals Rescue Effort", "CARE Project Cyprus"],
      url: `${baseUrl}/`,
      logo: { "@type": "ImageObject", url: `${baseUrl}/logo.png`, width: 256, height: 256 },
      image: social_img_url,
      description:
        "CARE (Cyprus Animals Rescue Effort) Project is a UANA Foundation initiative that rescues, fosters, and rehomes stray dogs from Limassol shelters in Cyprus.",
      email: contact_email,
      contactPoint: { "@type": "ContactPoint", contactType: "adoption and fostering enquiries", email: contact_email },
      areaServed: { "@type": "Country", name: "Cyprus" },
      address: { "@type": "PostalAddress", addressRegion: "Limassol", addressCountry: "CY" },
      parentOrganization: { "@id": `${parent_org_url}/#organization` },
      potentialAction: { "@type": "DonateAction", target: `${baseUrl}/more/donate`, recipient: { "@id": orgId } },
      sameAs: [
        "https://www.facebook.com/careproject.cy",
        "https://t.me/care_project",
        "https://github.com/careproject-cy/",
      ],
    },
    {
      "@type": "NGO",
      "@id": `${parent_org_url}/#organization`,
      name: parent_org_name,
      url: parent_org_url,
      email: contact_email,
      identifier: { "@type": "PropertyValue", name: "Registration number", value: parent_org_reg_number },
      address: { "@type": "PostalAddress", addressCountry: "CY" },
      sameAs: [
        "https://www.instagram.com/uana.cy/",
        "https://www.linkedin.com/company/uana-foundation/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      name: platform_name,
      alternateName: ["CARE Project Cyprus", domain],
      url: `${baseUrl}/`,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
