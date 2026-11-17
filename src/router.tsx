import { createRouter } from "@tanstack/react-router";
// oxlint-disable-next-line import/no-empty-named-blocks, unicorn/require-module-specifiers -- loads the TanStack Start type registration.
import type {} from "@tanstack/react-start";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

declare module "@tanstack/react-start" {
  interface Register {
    ssr: true;
    router: ReturnType<typeof getRouter>;
  }
}
