import assert from "node:assert/strict";
import { test } from "node:test";

import { Effect } from "effect";

import {
  GithubClient,
  GithubRequestError,
  loadGithubProfile,
} from "./github-profile";
import snapshot from "./github-profile.json" with { type: "json" };
import type { Repository, UserData } from "./github-types";

const unavailable = (route: string) =>
  Effect.fail(
    GithubRequestError.make({
      route,
      cause: new Error("GitHub is unavailable"),
    }),
  );

const loadWith = (client: {
  getUser?: (username: string) => Effect.Effect<UserData, GithubRequestError>;
  getRepository?: (
    owner: string,
    repo: string,
  ) => Effect.Effect<Repository, GithubRequestError>;
}) =>
  Effect.runPromise(
    loadGithubProfile().pipe(
      Effect.provideService(GithubClient, {
        getUser: client.getUser ?? (() => unavailable("user")),
        getRepository: client.getRepository ?? (() => unavailable("repo")),
      }),
    ),
  );

const findRepository = (owner: string, repo: string) => {
  const repository = snapshot.repositories.find(
    (r) => r.url === `https://github.com/${owner}/${repo}`,
  );
  assert.ok(repository, `${owner}/${repo} is in the snapshot`);
  return repository;
};

test("keeps the verified profile and projects when GitHub is unavailable", async () => {
  assert.deepEqual(await loadWith({}), snapshot);
});

test("one unavailable project does not discard other updated projects", async () => {
  const userData = { ...snapshot.userData, followers: 1234 };
  const result = await loadWith({
    getUser: () => Effect.succeed(userData),
    getRepository: (owner, repo) => {
      const repository = findRepository(owner, repo);
      return repository.name === "SoulFire"
        ? unavailable("repo")
        : Effect.succeed({ ...repository, stars: 1234 });
    },
  });
  assert.deepEqual(result.userData, userData);
  assert.deepEqual(
    result.repositories.find((r) => r.name === "SoulFire"),
    snapshot.repositories.find((r) => r.name === "SoulFire"),
  );
  assert.equal(
    result.repositories.find((r) => r.name === "PistonPost")?.stars,
    1234,
  );
});

test("a failed profile lookup still shows refreshed projects", async () => {
  const result = await loadWith({
    getRepository: (owner, repo) =>
      Effect.succeed({ ...findRepository(owner, repo), stars: 5678 }),
  });
  assert.deepEqual(result.userData, snapshot.userData);
  assert.ok(result.repositories.every((r) => r.stars === 5678));
});

test("asks GitHub for the owner and name of each snapshot project", async () => {
  const requested: string[] = [];
  await loadWith({
    getRepository: (owner, repo) => {
      requested.push(`${owner}/${repo}`);
      return unavailable("repo");
    },
  });
  assert.deepEqual(
    requested.toSorted(),
    snapshot.repositories
      .map((r) => new URL(r.url).pathname.slice(1))
      .toSorted(),
  );
});
