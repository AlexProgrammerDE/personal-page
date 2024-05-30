import {withPlausibleProxy} from "next-plausible";
import next_remove_imports from "next-remove-imports";
const removeImports = next_remove_imports();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "pistonmaster.net",
        defaultLocale: "en-US"
      }
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
