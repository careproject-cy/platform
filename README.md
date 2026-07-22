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

Running your own instance needs a Postgres database (Neon's free tier is enough) and, for uploaded
images, an S3 bucket. Set `S3_PUBLIC_BASE_URL` to the public URL your images are served from (e.g. a
CloudFront or bucket URL) and `next/image` will allow that host automatically. `DATABASE_URL` is
required at **build** time, not just at runtime, because pages are prerendered.

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

### Deploying

Builds do **not** run database migrations. Schema changes are applied deliberately, so that a preview
build of an unmerged branch can never alter the production database and a rolled-back deploy never
leaves an un-rolled-back schema behind.

When a change adds or alters a collection field:

```bash
npm run migrate:create <name>   # generate the migration, commit it
npm run migrate                 # apply it locally
```

Then, before merging to `main`, apply it to production with `DATABASE_URL` pointing at the production
database, and confirm with `npm run migrate:status` that every migration reads `Ran: Yes`. Deploy after
that, never before - the new code expects the new schema.

Migrations read `.env` (not `.env.local`), because that is what the Payload CLI loads.

### Backups

`.github/workflows/db-backup.yml` runs `pg_dump` daily (03:00 UTC) and uploads a gzipped dump to S3,
keeping 30 days. A dump contains password hashes and all content, so it must **not** go in the media
bucket - that bucket is served publicly through CloudFront. Use a separate **private** bucket:

1. Create an S3 bucket with **Block Public Access** on and no CloudFront distribution.
2. Create an IAM user scoped to `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, `s3:ListBucket` on
   that bucket only.
3. Add these GitHub repository secrets (Settings -> Secrets and variables -> Actions):
   `BACKUP_DATABASE_URL` (Neon's **unpooled** connection string), `BACKUP_S3_BUCKET`, `BACKUP_S3_REGION`,
   `BACKUP_S3_ACCESS_KEY_ID`, `BACKUP_S3_SECRET_ACCESS_KEY`.

Run it on demand from the Actions tab ("Run workflow"). Restore with
`gunzip -c dump.sql.gz | psql "$DATABASE_URL"` against a fresh database.

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
