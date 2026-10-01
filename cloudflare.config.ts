import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "personal-page",
    compatibilityDate: "2026-04-13",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: ".open-next/worker.js",
    observability: {
      enabled: true,
      traces: {
        enabled: true,
        headSamplingRate: 0.05,
      },
    },
    env: {
      ...(process.env.GITHUB_APP_ID
        ? {
            GITHUB_PRIVATE_KEY: bindings.secret(),
            GITHUB_CLIENT_SECRET: bindings.secret(),
            GITHUB_APP_ID: bindings.text(process.env.GITHUB_APP_ID),
            GITHUB_CLIENT_ID: bindings.text(process.env.GITHUB_CLIENT_ID ?? ""),
            GITHUB_INSTALLATION_ID: bindings.text(
              process.env.GITHUB_INSTALLATION_ID ?? "",
            ),
          }
        : {}),
      NEXT_INC_CACHE_R2_BUCKET: bindings.r2({
        name: "personal-page-opennext-cache",
      }),
      WORKER_SELF_REFERENCE: bindings.worker({
        worker: "personal-page",
      }),
      IMAGES: bindings.images({}),
      ASSETS: bindings.assets(),
    },
  },
});
