import assert from "node:assert/strict";
import { test } from "node:test";
import { loadGithubProfile } from "./github-profile";
import snapshot from "./github-profile.json" with { type: "json" };

test("keeps the verified profile and projects when GitHub is unavailable", async () => {
  const unavailable = async () => {
    throw new Error("GitHub is unavailable");
  };
  assert.deepEqual(await loadGithubProfile(unavailable, unavailable), snapshot);
});

test("one unavailable project does not discard other updated projects", async () => {
  const userData = { ...snapshot.userData, followers: 1234 };
  const result = await loadGithubProfile(
    async () => userData,
    async (repository) => {
      if (repository.name === "SoulFire") throw new Error("Not found");
      return { ...repository, stars: 1234 };
    },
  );
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
  const result = await loadGithubProfile(
    async () => {
      throw new Error("Rate limited");
    },
    async (repository) => ({ ...repository, stars: 5678 }),
  );
  assert.deepEqual(result.userData, snapshot.userData);
  assert.ok(result.repositories.every((r) => r.stars === 5678));
});
