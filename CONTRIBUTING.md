# Contributing to CARE Project

Thank you for your interest in contributing to CARE Project! This platform helps stray dogs in Cyprus find loving homes, and every contribution makes a difference.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/platform.git`
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Development

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build (includes lint + typecheck) |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run generate:types` | Regenerate `payload-types.ts` after changing a collection |
| `npm run migrate:create` | Create a database migration after changing a collection |
| `npm run migrate` | Apply pending database migrations (never runs during a build) |
| `npm run migrate:status` | List migrations and whether each has run |
| `npm run import-content` | One-off import of the legacy Markdown in `data/` into the CMS |

### Tech Stack

- **Next.js 16** with App Router
- **Payload CMS 3** for dog profiles and blog posts (admin at `/admin`)
- **Postgres** (Neon on Vercel) for content storage
- **VaneUI** for UI components (boolean props API)
- **Markdoc** for Markdown rendering
- **Tailwind CSS v4** for styling

### Content

Dog profiles and blog posts live in Payload and are edited at `/admin` - no deploy is needed to publish
them. Their body text is still Markdown, rendered through Markdoc. Static pages (`data/pages/`) remain
Markdown files in the repository.

Local development needs a Postgres connection string and a Payload secret. Copy `.env.example` to `.env`
and fill them in; without `S3_BUCKET` set, uploads fall back to local disk.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure `npm run lint` and `npm run typecheck` pass
4. Write a clear PR description explaining what changed and why
5. Submit the PR

## Code of Conduct

Be kind. We're all here to help animals. Treat contributors with respect and assume good intent.

## Questions?

Open an issue or email info@uanafoundation.com.
