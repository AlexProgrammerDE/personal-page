# personal-page

This is my new personal page built with Next.js and hosted on Cloudflare Workers.

Deployed to: https://pistonmaster.net/


## Cloudflare CLI

`cloudflare.config.ts` owns the Worker configuration. `cf` uploads and deploys
Build Output from `.cloudflare/output/v0/`. The framework adapter builds the app,
and Wrangler packages that output for `cf` during the CLI beta.

OpenNext still reads the legacy configuration format. The `cloudflare:config`
script generates its ignored adapter configuration from `cloudflare.config.ts`.
The deployment scripts populate the OpenNext cache before uploading the Worker.

Install dependencies with `bun install --frozen-lockfile`. `bunfig.toml` uses
hoisted dependency installation.

GitHub app authentication is optional. To enable it, supply `GITHUB_APP_ID`,
`GITHUB_CLIENT_ID`, and `GITHUB_INSTALLATION_ID` in the build environment.
Store `GITHUB_PRIVATE_KEY` and `GITHUB_CLIENT_SECRET` as Worker secrets.
Without an app ID, the site uses anonymous GitHub requests.
Next.js generates `SITEMAP_PAGES` from the routes.

In Workers Builds, leave the build command empty and use `bun run deploy` as
the production deploy command. Use `bun run upload` for preview uploads.

Run `bun run deploy:dry-run` to build and validate without uploading.
