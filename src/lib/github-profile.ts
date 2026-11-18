import { Context, Data, Effect } from "effect";

import snapshot from "./github-profile.json" with { type: "json" };
import type { Repository, UserData } from "./github-types";

export class GithubConfigError extends Data.TaggedError("GithubConfigError")<{
  readonly cause: unknown;
}> {
  override get message() {
    return "Could not create the GitHub client";
  }
}

export class GithubRequestError extends Data.TaggedError("GithubRequestError")<{
  readonly route: string;
  readonly cause: unknown;
}> {
  override get message() {
    return `GitHub request failed: ${this.route}`;
  }
}

export class GithubResponseError extends Data.TaggedError(
  "GithubResponseError",
)<{
  readonly route: string;
  readonly cause: unknown;
}> {
  override get message() {
    return `Unexpected GitHub response: ${this.route}`;
  }
}

export type GithubError =
  | GithubConfigError
  | GithubRequestError
  | GithubResponseError;

export class GithubClient extends Context.Service<
  GithubClient,
  {
    readonly getUser: (
      username: string,
    ) => Effect.Effect<UserData, GithubError>;
    readonly getRepository: (
      owner: string,
      repo: string,
    ) => Effect.Effect<Repository, GithubError>;
  }
>()("personal-page/GithubClient") {}

// Each lookup falls back to the verified snapshot on its own,
// so one failed request never hides the other refreshed data.
export const loadGithubProfile = Effect.fn("GithubProfile.load")(function* () {
  const github = yield* GithubClient;
  const [userData, repositories] = yield* Effect.all(
    [
      github
        .getUser("AlexProgrammerDE")
        .pipe(Effect.orElseSucceed(() => snapshot.userData)),
      Effect.forEach(
        snapshot.repositories,
        (repository) => {
          const [owner, repo] = new URL(repository.url).pathname
            .slice(1)
            .split("/");
          if (owner === undefined || repo === undefined) {
            return Effect.succeed(repository);
          }
          return github
            .getRepository(owner, repo)
            .pipe(Effect.orElseSucceed(() => repository));
        },
        { concurrency: "unbounded" },
      ),
    ],
    { concurrency: "unbounded" },
  );
  return { userData, repositories };
});
