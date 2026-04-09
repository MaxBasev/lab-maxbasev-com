# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is a **Next.js 15 App Router** project — Max's personal lab/portfolio site deployed on Vercel.

### Dual-mode theming
The site has two visual modes toggled via a CSS class on `<body>`:
- **Lab mode** (default): Dark cyberpunk aesthetic, neon cyan (`#00ffe0`), monospace fonts
- **Portfolio mode**: Clean light UI, green accent (`#1fbd89`), sans-serif fonts

Portfolio mode is activated by adding the `portfolio` class to `<body>`. All components use Tailwind's `portfolio:` variant prefix to switch styles inline (e.g., `text-lab-cyan portfolio:text-portfolio-accent`). Custom colors and the `portfolio:` variant are defined in `tailwind.config.mjs`. Global CSS variables and base styles are in `src/app/globals.css`.

### Pages & routing
- `/` — Home: project grid/list with tag filtering and view toggle
- `/ideas` — Future ideas with like/dislike voting (backed by Redis)
- `/cases/[id]` — Individual project case study page

### Data layer
- **Projects**: All project data lives in `src/data/projects.ts` as a static array of `Project` objects (type defined in `src/types.ts`). To add a project, add an entry to that array. To add a new tag, update the `ProjectTag` union type **and** both `labModeColors` and `portfolioModeColors` maps in `getTagColor` — all three are in `src/types.ts`.
- **Project content/case studies**: Long-form markdown-style content for each project is stored inline in `src/components/ProjectContent.tsx` in a `PROJECT_CONTENTS` record keyed by project `id`.
- **Ideas voting**: Votes are stored in Redis via `REDIS_URL` env var. The API is at `src/app/api/votes/route.ts`. The ideas data itself is hardcoded in `src/app/ideas/page.tsx`.

### Key environment variables
```
REDIS_URL=...   # Required for voting functionality on /ideas
```
For local dev, create `.env.local` with this variable.

### Coding conventions (from Cursor rules)
- Use `const` arrow functions, not `function` declarations
- Event handlers prefixed with `handle` (e.g., `handleClick`)
- Early returns for readability
- `class:` directive over ternary in classnames where possible
- Accessibility attributes on interactive elements (`aria-label`, `tabindex`, keyboard handlers)
- TypeScript types defined explicitly
