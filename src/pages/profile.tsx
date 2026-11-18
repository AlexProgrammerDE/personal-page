import { getRouteApi } from "@tanstack/react-router";

import Home from "~/pages/home";

const routeApi = getRouteApi("/");

export default function Profile() {
  return <Home {...routeApi.useLoaderData()} />;
}
