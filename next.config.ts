import {type NextConfig} from "next";
import {withPlausibleProxy} from "next-plausible";
import next_remove_imports from "next-remove-imports";
import * as fs from 'fs';
import * as path from 'path';

function getFoldersWithPageFiles(dir: string): string[] {
  const foldersWithPageFiles: string[] = [];

  // Read the contents of the current directory.
  const items = fs.readdirSync(dir);

  // Check if the current directory contains either 'page.mdx' or 'page.tsx'
  const containsPageFile = items.some(item =>
      item === 'page.mdx' || item === 'page.tsx'
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

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    SITEMAP_PAGES: getFoldersWithPageFiles("app")
        .map(folder => folder.substring("app".length))
        .join("|")
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [{
      protocol: 'https',
      hostname: 'discord.com',
    }, {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
    }, {
      protocol: 'https',
      hostname: 'github-readme-stats.vercel.app',
    }, {
      protocol: 'https',
      hostname: 'spotify-recently-played-readme.vercel.app',
    }, {
      protocol: 'https',
      hostname: 'img.shields.io',
    }],
  },
  redirects: async () => {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/X4uV74BTKb',
        permanent: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/AlexProgrammerDE',
        permanent: false,
      },
    ]
  },
  webpack: (config) => {
    return Object.assign({}, config, {
      module: Object.assign({}, config.module, {
        rules: config.module.rules.concat([
          {
            test: /\.md$/,
            loader: 'raw-loader'
          }
        ])
      })
    });
  }
}

export default withPlausibleProxy({
  customDomain: process.env.PLAUSIBLE_URL
})(removeImports(nextConfig))
