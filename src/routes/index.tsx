import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Effect } from "effect";

import { githubClientLayer } from "~/lib/github";
import { loadGithubProfile } from "~/lib/github-profile";
import Profile from "~/pages/profile";

const loadProfile = createServerFn({ method: "GET" }).handler(() =>
  Effect.runPromise(
    loadGithubProfile().pipe(Effect.provide(githubClientLayer)),
  ),
);

export const Route = createFileRoute("/")({
  loader: () => loadProfile(),
  component: Profile,
});
