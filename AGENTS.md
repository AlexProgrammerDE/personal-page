# Repository instructions

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

- For visual design work, use `frontend-design` and `uncodixfy`.

## Cloudflare tooling

- Use `cf` for direct Cloudflare CLI commands. Prefer existing package scripts for project workflows.
- For new Cloudflare configuration, prefer `cloudflare.config.ts`. Preserve existing configuration formats during unrelated work.
