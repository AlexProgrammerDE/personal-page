import "@tanstack/react-start/server-only";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";

import { loadGithubProfile } from "./github-profile";
import type { Organization, UserData } from "./github-types";

function getOctokit() {
  return new Octokit({
    request: { signal: AbortSignal.timeout(4_000) },
    ...(process.env.GITHUB_APP_ID
      ? {
          authStrategy: createAppAuth,
          auth: {
            appId: process.env.GITHUB_APP_ID,
            privateKey: process.env.GITHUB_PRIVATE_KEY?.replaceAll("\\n", "\n"),
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            installationId: process.env.GITHUB_INSTALLATION_ID,
          },
        }
      : {}),
  });
}

export async function getProfile() {
  return loadGithubProfile(
    () => getUserData("AlexProgrammerDE"),
    async (repository) => {
      const [owner, repo] = new URL(repository.url).pathname
        .slice(1)
        .split("/");
      const { data } = await getOctokit().request("GET /repos/{owner}/{repo}", {
        owner,
        repo,
      });
      return {
        name: data.name,
        url: data.html_url,
        description: data.description ?? "",
        language: data.language ?? "Unknown",
        stars: data.stargazers_count,
        forks: data.forks_count,
      };
    },
  );
}

export async function getUserData(username: string): Promise<UserData> {
  const userReply = await getOctokit().request("GET /users/{username}", {
    username: username,
  });

  return {
    avatar: userReply.data.avatar_url,
    name: String(userReply.data.name),
    bio: String(userReply.data.bio),
    repoCount: userReply.data.public_repos,
    followers: userReply.data.followers,
  };
}

export async function getOrganizations(
  username: string,
): Promise<Organization[]> {
  const organizations = await getOctokit().request(
    "GET /users/{username}/orgs",
    {
      username: username,
    },
  );

  return organizations.data.map((org) => {
    return {
      login: org.login ?? "",
      avatar: org.avatar_url ?? "",
      description: org.description ?? "",
    };
  });
}
