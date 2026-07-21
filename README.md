# CARE Project - Cyprus Animals Rescue Effort

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://app.cloudback.it/badge/careproject-cy/platform)](https://cloudback.it)

**A 100% volunteer-run dog rescue platform helping stray and shelter-bound dogs across Cyprus find loving homes.**

[careproject.cy](https://careproject.cy) | [UANA Foundation](https://uanafoundation.com)

![CARE Project](public/care-project-social.png)

## About

CARE Project is the adoption platform for [UANA Foundation](https://uanafoundation.com), a registered nonprofit in Cyprus. We rescue stray dogs, cover their veterinary care, rehabilitate and socialize them, and coordinate adoptions locally and internationally to the UK, Germany, and the Netherlands.

100% volunteer. No paid staff. Every euro goes to the animals.

## Why Open Source

Every rescue organization deserves a modern adoption platform. Most operate through social media DMs and spreadsheets. We built this site for CARE Project and are open-sourcing it so any animal rescue can fork it, add their animals, and deploy for free.

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [Payload CMS](https://payloadcms.com) 3 (dog profiles and blog posts, admin at `/admin`)
- [Postgres](https://neon.com) (content storage; Neon on Vercel)
- [VaneUI](https://vaneui.com) (React component library)
- [Markdoc](https://markdoc.dev) (blog and pages)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Vercel](https://vercel.com)

## Features

- Dog profile pages with photos, breed, age, and adoption status
- Adoption listings filtered by availability
- Success stories gallery
- Markdown-powered blog with Cyprus-specific pet care content
- Static pages (About, Adopt, Foster, Donate, Get Involved)
- SEO-optimized with sitemap generation
- Social sharing (Open Graph, Twitter cards)
- Responsive design
- Ahrefs analytics integration

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/careproject-cy/platform.git
cd platform
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in a Postgres connection string and a Payload secret. Without
`S3_BUCKET` set, image uploads fall back to local disk, which is fine for development.

```bash
cp .env.example .env
npm run migrate
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The admin panel is at
[/admin](http://localhost:3000/admin) - the first visit prompts you to create an admin account.

### Content

Dog profiles and blog posts are managed in the CMS at `/admin` and publish without a deploy. Their body
text is Markdown, rendered through Markdoc. Static pages remain Markdown files in `data/pages/`.

The legacy Markdown in `data/dogs/` and `data/blog/` is kept as the migration source; import it once with:

```bash
npm run import-content
```

### Build

```bash
npm run build
```

## Project Structure

```
careproject/
  app/
    (frontend)/       # The public website
      blog/           # Blog pages
      dogs/           # Dog profile pages
      more/           # Static pages (adopt, foster, donate, etc.)
    (payload)/        # CMS admin panel and REST API
    components/       # React components (header, footer, dog cards, etc.)
    data/             # Constants and data fetching utilities
  collections/        # Payload collections (dogs, posts, media, users)
  payload.config.ts   # CMS configuration
  data/
    dogs/             # Legacy dog Markdown, kept as the migration source
    blog/             # Legacy blog Markdown, kept as the migration source
    pages/            # Static page content as Markdown
  public/             # Static assets (logos, images)
  lib/                # Content import and generation scripts
```

## UANA Foundation

CARE Project operates under [UANA Foundation](https://uanafoundation.com), a registered Cyprus nonprofit (HE 442538) that supports animal rescuers across the island. UANA also runs:

- **Shelter Support:** Financial aid to municipal pounds and private rescue centers
- **Emergency Foster Program:** Temporary pet care for owners facing illness, unemployment, or domestic violence
- **Volunteer Coordination:** Organizing shelter visits, dog walks, and care activities

Contact: info@uanafoundation.com

## Contributing

We welcome contributions! Whether you're a developer, designer, or animal welfare advocate:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Run linting and type checks (`npm run lint && npm run typecheck`)
5. Commit your changes
6. Push to the branch (`git push origin feature/your-feature`)
7. Open a Pull Request

## Social

- Instagram: [@uana.cy](https://instagram.com/uana.cy) / [@dog_adoption_cyprus](https://instagram.com/dog_adoption_cyprus)
- Facebook: [careproject.cy](https://facebook.com/careproject.cy)
- LinkedIn: [UANA Foundation](https://linkedin.com/company/uana-foundation)
- Telegram: [care_project](https://t.me/care_project)

## License

[MIT](LICENSE)
