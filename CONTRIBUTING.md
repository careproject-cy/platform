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
| `npm run generate-dogs` | Regenerate dogs.json from Markdown files |
| `npm run generate-blogposts` | Regenerate blogposts.json from Markdown files |

### Tech Stack

- **Next.js 16** with App Router
- **VaneUI** for UI components (boolean props API)
- **Markdoc** for Markdown rendering
- **Tailwind CSS v4** for styling

### Content

Dog profiles and blog posts are Markdown files in the `data/` directory. After editing content, run the generation scripts to update the JSON data files.

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
