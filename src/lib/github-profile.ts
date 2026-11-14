import snapshot from "./github-profile.json" with { type: "json" };
import type { Repository, UserData } from "./github-types";

export async function loadGithubProfile(
  loadUser: () => Promise<UserData>,
  loadRepository: (repository: Repository) => Promise<Repository>,
) {
  const [user, ...repositories] = await Promise.allSettled([
    loadUser(),
    ...snapshot.repositories.map(loadRepository),
  ] as const);

  return {
    userData: user.status === "fulfilled" ? user.value : snapshot.userData,
    repositories: repositories.map((result, index) =>
      result.status === "fulfilled"
        ? result.value
        : snapshot.repositories[index],
    ),
  };
}
