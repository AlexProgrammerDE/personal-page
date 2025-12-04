import * as fs from "node:fs";
import * as path from "node:path";
import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";
import next_remove_imports from "next-remove-imports";

function getFoldersWithPageFiles(dir: string): string[] {
  const foldersWithPageFiles: string[] = [];

  // Read the contents of the current directory.
  const items = fs.readdirSync(dir);

  // Check if the current directory contains either 'page.mdx' or 'page.tsx'
  const containsPageFile = items.some(
    (item) => item === "page.mdx" || item === "page.tsx",
  );

  if (containsPageFile) {
    foldersWithPageFiles.push(dir);
  }

  // Loop through each item in the directory.
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    // If the item is a directory, recursively search it.
    if (stat.isDirectory()) {
      foldersWithPageFiles.push(...getFoldersWithPageFiles(fullPath));
    }
  }

  return foldersWithPageFiles;
}

const removeImports = next_remove_imports();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "0",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://*.posthog.com; style-src 'self' 'unsafe-inline' https://*.posthog.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://challenges.cloudflare.com https://*.posthog.com; font-src 'self' https://*.posthog.com; frame-src 'self' https://challenges.cloudflare.com; img-src 'self' data: https://*.posthog.com; manifest-src 'self'; media-src 'self' data: https://*.posthog.com; worker-src 'self' blob: data:; form-action 'self'; upgrade-insecure-requests;",
  },
  {
    key: "X-Accel-Buffering",
    value: "no",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SITEMAP_PAGES: getFoldersWithPageFiles("app")
      .map((folder) => folder.substring("app".length))
      .join("|"),
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "discord.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
      {
        protocol: "https",
        hostname: "spotify-recently-played-readme.vercel.app",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/X4uV74BTKb",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/AlexProgrammerDE",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: securityHeaders,
      },
    ];
  },
};

export default withPlausibleProxy({
  customDomain: process.env.PLAUSIBLE_URL,
})(removeImports(nextConfig));
