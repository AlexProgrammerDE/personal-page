import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { getProfile } from "~/lib/github";
import Profile from "~/pages/profile";

const loadProfile = createServerFn({ method: "GET" }).handler(() =>
  getProfile(),
);

export const Route = createFileRoute("/")({
  loader: () => loadProfile(),
  component: Profile,
});
