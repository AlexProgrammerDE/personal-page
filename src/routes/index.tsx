import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRepositories, getUserData } from "~/lib/github";
import Home from "~/pages/home";

const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  const [userData, repositories] = await Promise.all([
    getUserData("AlexProgrammerDE"),
    getRepositories("AlexProgrammerDE"),
  ]);
  return { userData, repositories };
});

export const Route = createFileRoute("/")({
  loader: () => getProfile(),
  component: Profile,
});

function Profile() {
  return <Home {...Route.useLoaderData()} />;
}
