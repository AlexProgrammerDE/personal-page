import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getProfile } from "~/lib/github";
import Home from "~/pages/home";

const loadProfile = createServerFn({ method: "GET" }).handler(() =>
  getProfile(),
);

export const Route = createFileRoute("/")({
  loader: () => loadProfile(),
  component: Profile,
});

function Profile() {
  return <Home {...Route.useLoaderData()} />;
}
