# personal-page

The personal website uses TanStack Start, TanStack Router, Vite, and Cloudflare Workers.
The homepage loads public GitHub profile and repository data through a server function.
GitHub App credentials stay on the server.

Run `bun install`, then `bun run dev` to start the local Worker runtime.
Run `bun run typecheck`, `bun run check`, and `bun run build` before pushing.
Run `bun run preview` to serve the production build locally.

`cloudflare.config.ts` defines the Worker and optional GitHub App bindings.
The Cloudflare Vite plugin writes the Worker and assets to `.cloudflare/output/v0/`.
Run `bun run deploy:dry-run` to build and check the artifact without uploading.
Run `bun run deploy` to build and deploy. Run `bun run upload` to upload a version without activating it.

Routes live in `src/routes/`. Page components live in `src/pages/`.
The site retains `/discord`, `/github`, `/robots.txt`, and `/sitemap.xml`.
The markdown editor loads only in the browser.

## Git hooks

`bun install` installs Lefthook for this checkout and preserves the existing preparation steps.
Run `bun run pre-commit` to run the commit checks manually.
The hooks use the existing project tools. Before pushing, they run the relevant project checks for changed files.
