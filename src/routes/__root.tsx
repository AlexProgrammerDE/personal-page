import "@fontsource-variable/inter";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import RootDocument from "~/components/RootDocument";
import NotFound from "~/pages/not-found";

import appCss from "~/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AlexProgrammerDE" },
      {
        name: "description",
        content: "Coding as a hobby and creating cool stuff!",
      },
      { name: "theme-color", content: "#C970D9" },
      { name: "msapplication-TileColor", content: "#C970D9" },
      { property: "og:title", content: "AlexProgrammerDE" },
      {
        property: "og:description",
        content: "Coding as a hobby and creating cool stuff!",
      },
      { property: "og:image", content: "https://pistonmaster.net/pfp.png" },
      { property: "og:url", content: "https://pistonmaster.net/" },
      { property: "og:locale", content: "en_US" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "https://pistonmaster.net" },
      { name: "twitter:image", content: "https://pistonmaster.net/pfp.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://pistonmaster.net/" },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", href: "/icon.png" },
    ],
  }),
  component: Outlet,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});
