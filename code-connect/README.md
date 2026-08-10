# Figma Code Connect contract

Parserless `.figma.ts` templates are the only source of design-to-code semantics. The public runtime exports of `@gravity-ui/uikit` are not changed.

## Artifacts

- `figma.schema.snapshot.json` is a deterministic snapshot of the allowlisted Figma file. It has no timestamp.
- `ignores.json` contains only Figma properties that cannot yet be represented honestly in code. Every entry needs a non-empty reason.
- Templates live beside their components as `src/components/<Name>/<Name>.figma.ts`.

Every Figma component property must be mapped with the type-specific parserless getter or listed in `ignores.json`. Dynamic property names and `getPropertyValue` are rejected.

## Commands

Set `FIGMA_ACCESS_TOKEN` to a Plan Access Token with `file_content:read` for refresh/check/scaffold. Do not commit it or pass it on the command line.

```sh
npm run code-connect:scaffold -- \
  --url 'https://www.figma.com/design/LlrQIz4F2Y06FJRdB4iE9U/Gravity-UI?node-id=1-2' \
  --component ComponentName \
  --out-file src/components/ComponentName/ComponentName.figma.ts
npm run code-connect:refresh
npm run code-connect:check
```

`scaffold` uses the official Code Connect generator, refreshes the component schema, and prints mappings that still require human review. `refresh` is the only command that rewrites the snapshot. `check` writes nothing and runs the dedicated TypeScript project, `figma connect parse`, AST coverage, and a live freshness comparison.

Preview is restricted to a trusted post-merge environment:

```sh
CODE_CONNECT_PREVIEW_TRUSTED=1 npm run code-connect:preview -- --unique
CODE_CONNECT_PREVIEW_TRUSTED=1 npm run code-connect:preview -- --all
```

The wrapper's `--unique` mode uses the CLI's bounded default preview. `--all` uses the CLI's 500-combination safety limit and can fail for components whose full property product exceeds that limit.

## CI

Normal pull-request CI runs tests, TypeScript, and parserless parsing without secrets. The `Code Connect Contract` workflow uses `pull_request_target`, but checks out and executes only the trusted base branch. It reads the exact PR head's JSON and `.figma.ts` files through the GitHub API as bounded untrusted data, then compares them with the allowlisted Figma REST response.

The sticky comment status is one of `PASS`, `FAIL`, `AUTH_BLOCKED`, or `DATA_MISSING`. The job succeeds only for `PASS`.

Preview and publish are manual post-merge operations protected by the `figma-code-connect` environment and the separate `FIGMA_CODE_CONNECT_CLI_TOKEN` secret. Neither operation runs in pull-request workflows.

## Scope

The contract covers `componentPropertyDefinitions` and selected public React props. It does not cover variables, styles, visual tokens, or the deferred `@gravity-ui/icons` instance-swap mapping.
