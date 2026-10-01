# personal-page

This is my new personal page written in nextjs and hosted via vercel.

Deployed to: https://pistonmaster.net/


## Cloudflare CLI

`cloudflare.config.ts` owns the Worker configuration. `cf` uploads and deploys
Build Output from `.cloudflare/output/v0/`. The framework adapter builds the app,
and Wrangler packages that output for `cf` during the CLI beta.

OpenNext still reads the legacy configuration format. The `cloudflare:config`
script generates its ignored adapter configuration from `cloudflare.config.ts`.
The deployment scripts populate the OpenNext cache before uploading the Worker.

Before the first production build, copy the existing public Worker variables
into the build environment. The `prod` mode rejects missing values so a deploy
cannot silently remove dashboard variables. Keep secret values in Cloudflare.

Run `pnpm run deploy:dry-run` to build and validate without uploading.
