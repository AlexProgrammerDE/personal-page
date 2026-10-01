import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
  keepNames: false,
  types: {
    generate: false,
  },
  assetsDirectory: ".open-next/assets",
});
