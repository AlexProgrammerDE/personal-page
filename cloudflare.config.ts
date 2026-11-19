import { bindings, defineConfig } from "cf/config";

import * as entrypoint from "./src/server.ts" with { type: "cf-worker" };

const githubAppId = process.env["GITHUB_APP_ID"];

export default defineConfig({
  worker: {
    name: "personal-page",
    compatibilityDate: "2026-04-13",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint,
    assets: { htmlHandling: "drop-trailing-slash" },
    observability: {
      issues: {
        enabled: true,
      },
      enabled: true,
      traces: {
        enabled: true,
        headSamplingRate: 0.05,
      },
    },
    env:
      githubAppId !== undefined && githubAppId !== ""
        ? {
            GITHUB_PRIVATE_KEY: bindings.secret(),
            GITHUB_CLIENT_SECRET: bindings.secret(),
            GITHUB_APP_ID: bindings.text(githubAppId),
            GITHUB_CLIENT_ID: bindings.text(
              process.env["GITHUB_CLIENT_ID"] ?? "",
            ),
            GITHUB_INSTALLATION_ID: bindings.text(
              process.env["GITHUB_INSTALLATION_ID"] ?? "",
            ),
          }
        : {},
  },
});
