import { domain } from "@/app/data/consts"

const baseUrl = `https://${domain}`

const organization = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "CARE Project",
  alternateName: "Cyprus Animals Rescue Effort",
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description:
    "CARE (Cyprus Animals Rescue Effort) Project is a UANA Foundation initiative that rescues, fosters, and rehomes stray dogs in Cyprus.",
  areaServed: { "@type": "Country", name: "Cyprus" },
  parentOrganization: {
    "@type": "NGO",
    name: "UANA Foundation",
    url: "https://uanafoundation.com",
  },
  sameAs: [
    "https://www.instagram.com/uana.cy/",
    "https://www.facebook.com/careproject.cy",
    "https://www.linkedin.com/company/uana-foundation/",
    "https://t.me/care_project",
    "https://github.com/careproject-cy/",
  ],
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CARE Project",
  url: baseUrl,
}

export default function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
