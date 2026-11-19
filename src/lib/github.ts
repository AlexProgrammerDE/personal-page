import "@tanstack/react-start/server-only";
import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { Config, Effect, Layer, Option, Redacted, Schema } from "effect";

import {
  GithubClient,
  GithubConfigError,
  GithubRequestError,
  GithubResponseError,
} from "./github-profile";

const optional = (name: string) => Config.option(Config.String(name));
const optionalSecret = (name: string) => Config.option(Config.Redacted(name));

const githubAppConfig = Config.all({
  appId: optional("GITHUB_APP_ID"),
  privateKey: optionalSecret("GITHUB_PRIVATE_KEY"),
  clientId: optional("GITHUB_CLIENT_ID"),
  clientSecret: optionalSecret("GITHUB_CLIENT_SECRET"),
  installationId: optional("GITHUB_INSTALLATION_ID"),
});

const GithubUser = Schema.Struct({
  login: Schema.String,
  avatar_url: Schema.String,
  name: Schema.NullOr(Schema.String),
  bio: Schema.NullOr(Schema.String),
  public_repos: Schema.Int,
  followers: Schema.Int,
});

const GithubRepository = Schema.Struct({
  name: Schema.String,
  html_url: Schema.String,
  description: Schema.NullOr(Schema.String),
  language: Schema.NullOr(Schema.String),
  stargazers_count: Schema.Int,
  forks_count: Schema.Int,
});

const makeOctokit = Effect.fn("GithubClient.makeOctokit")(function* () {
  const config = yield* githubAppConfig;
  return yield* Effect.try({
    try: () =>
      new Octokit(
        Option.match(config.appId, {
          onNone: () => ({}),
          onSome: (appId) => ({
            authStrategy: createAppAuth,
            auth: {
              appId,
              privateKey: Option.getOrUndefined(
                Option.map(config.privateKey, (key) =>
                  Redacted.value(key).replaceAll(String.raw`\n`, "\n"),
                ),
              ),
              clientId: Option.getOrUndefined(config.clientId),
              clientSecret: Option.getOrUndefined(
                Option.map(config.clientSecret, Redacted.value),
              ),
              installationId: Option.getOrUndefined(config.installationId),
            },
          }),
        }),
      ),
    catch: (cause) => new GithubConfigError({ cause }),
  });
});

// Build the client on first use. A config failure fails each lookup,
// so each lookup falls back to the snapshot.
export const githubClientLayer = Layer.effect(
  GithubClient,
  Effect.gen(function* () {
    const octokit = yield* Effect.cached(
      makeOctokit().pipe(
        Effect.catchTag("ConfigError", (cause) =>
          Effect.fail(new GithubConfigError({ cause })),
        ),
      ),
    );

    const get = <A>(
      route: string,
      params: Record<string, string>,
      schema: Schema.Decoder<A>,
    ) =>
      octokit.pipe(
        Effect.flatMap((client) =>
          Effect.tryPromise({
            try: (signal) =>
              client.request(route, { ...params, request: { signal } }),
            catch: (cause) => new GithubRequestError({ route, cause }),
          }).pipe(
            // Abort the request, including any token request, after 4 seconds.
            Effect.timeout("4 seconds"),
            Effect.catchTag("TimeoutError", (cause) =>
              Effect.fail(new GithubRequestError({ route, cause })),
            ),
          ),
        ),
        Effect.flatMap(({ data }) =>
          Schema.decodeUnknownEffect(schema)(data).pipe(
            Effect.mapError(
              (cause) => new GithubResponseError({ route, cause }),
            ),
          ),
        ),
      );

    return {
      getUser: (username) =>
        get("GET /users/{username}", { username }, GithubUser).pipe(
          Effect.map((user) => ({
            avatar: user.avatar_url,
            name: user.name ?? user.login,
            bio: user.bio ?? "",
            repoCount: user.public_repos,
            followers: user.followers,
          })),
        ),
      getRepository: (owner, repo) =>
        get(
          "GET /repos/{owner}/{repo}",
          { owner, repo },
          GithubRepository,
        ).pipe(
          Effect.map((data) => ({
            name: data.name,
            url: data.html_url,
            description: data.description ?? "",
            language: data.language ?? "Unknown",
            stars: data.stargazers_count,
            forks: data.forks_count,
          })),
        ),
    };
  }),
);
