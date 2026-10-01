import { bindings, defineConfig } from "cf/config";

function publicVariable(name: string, mode: string | undefined) {
  const value = process.env[name];
  if (mode === "prod" && !value)
    throw new Error(
      `${name} is required for a production build. Copy the existing Worker variable into the build environment before migrating.`,
    );
  return value ?? "";
}

export default defineConfig(({ mode }) => ({
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
      GITHUB_PRIVATE_KEY: bindings.secret(),
      GITHUB_CLIENT_SECRET: bindings.secret(),
      SITEMAP_PAGES: bindings.text(publicVariable("SITEMAP_PAGES", mode)),
      GITHUB_APP_ID: bindings.text(publicVariable("GITHUB_APP_ID", mode)),
      GITHUB_CLIENT_ID: bindings.text(publicVariable("GITHUB_CLIENT_ID", mode)),
      GITHUB_INSTALLATION_ID: bindings.text(
        publicVariable("GITHUB_INSTALLATION_ID", mode),
      ),

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
}));
