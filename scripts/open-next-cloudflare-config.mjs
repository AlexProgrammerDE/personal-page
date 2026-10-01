import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  convertToWranglerConfig,
  loadAndParseConfig,
} from "@cloudflare/config";

// OpenNext still reads the legacy format. Derive it from the canonical config.
const { result } = await loadAndParseConfig(resolve("cloudflare.config.ts"), {
  isPreview: false,
  mode: process.env.CLOUDFLARE_BUILD_MODE ?? "development",
});
if (!result.success)
  throw new Error("Invalid Cloudflare configuration", { cause: result.error });
const config = convertToWranglerConfig(result.data);
config.main = resolve(".open-next/worker.js");
config.assets = { ...config.assets, directory: resolve(".open-next/assets") };
const directory = resolve(".cloudflare/open-next");
await mkdir(directory, { recursive: true });
await writeFile(
  resolve(directory, "wrangler.json"),
  `${JSON.stringify(config, null, 2)}\n`,
);
