import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://pistonmaster.net/</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.7</priority></url></urlset>`,
          { headers: { "Content-Type": "application/xml; charset=utf-8" } },
        ),
    },
  },
});
