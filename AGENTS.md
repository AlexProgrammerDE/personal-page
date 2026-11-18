# Repository instructions

## Required Lefthook setup

- Use Lefthook as the default Git hook manager for this repository.
- Before other project work, install the dependencies needed by the hooks.
- From the repository root, run `bunx --no-install lefthook install`.
- Run `bunx --no-install lefthook validate` and `bunx --no-install lefthook check-install` successfully.
- Make sure that Git's effective hook directory contains executable Lefthook hooks, including every configured commit hook.
- If hooks are missing, outdated, disabled, or fail installation checks, refuse all other project work.
- While blocked, only perform the setup and diagnostics needed to install and verify the hooks.
- Never bypass hooks with `--no-verify`, `-n`, environment variables, or configuration changes.
- Let the hooks finish and fix failures before committing or pushing.

## React conventions

- Use PascalCase for React component names. Match the existing component filename convention.
- Use kebab-case for new hook and utility filenames, unless this repository documents another convention.
- Use stable domain identities as React keys. Do not use array indexes as keys.
- Use an existing `generateN` helper or stable placeholder IDs for fixed skeleton slots.
- Keep page structure, headings, navigation, labels, and independent content mounted while data loads.
- Show skeletons only for unresolved values, rows, and permission-dependent actions. Do not block a page on its slowest query.

## Tailwind spacing

- Use `gap-*` utilities for spacing between elements. Do not use `space-*` utilities.

## Design skills

- For visual design work, use `frontend-design`.

## Cloudflare tooling

- Use `cf` for direct Cloudflare CLI commands. Prefer existing package scripts for project workflows.
- For new Cloudflare configuration, prefer `cloudflare.config.ts`. Preserve existing configuration formats during unrelated work.

## Effect

- Server-side side effects use Effect v4 (`effect`). Keep React components plain.
- `src/lib/github-profile.ts` defines the `GithubClient` service, the tagged errors (`Data.TaggedError`), and the `loadGithubProfile` program. Each lookup falls back to the snapshot in `github-profile.json`.
- `src/lib/github.ts` is server-only. Its `githubClientLayer` reads the GitHub App settings with `Config`, calls Octokit with a 4 second timeout, and checks responses with `Schema`.
- Run programs only at the edge. The `/` route's server function provides the layer and calls `Effect.runPromise`. Tests provide a fake `GithubClient` with `Effect.provideService`.
- Oxlint runs the `effecttsgo` rules. `bun install` patches Oxlint through the `prepare` script.
