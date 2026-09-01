# UIKit repository guide

## Repository purpose and documentation map

This repository builds the single publishable React package `@gravity-ui/uikit`, including its
public JavaScript/TypeScript entrypoints and styles. Start with the human documentation:

- [`docs/navigation.md`](docs/navigation.md) maps tasks to authoritative docs, source directories,
  and validation.
- [`docs/architecture.md`](docs/architecture.md) explains package boundaries, public entrypoints,
  source layout, and build/test systems.
- Domain guides cover [theming](docs/theming.md), [layout](docs/layout.md),
  [typography](docs/typography.md), [SSR](docs/server-side-rendering.md), and
  [i18n](docs/i18n.md).
- Component-specific behavior belongs in `src/components/<Component>/README.md`.

## Pre-response gate (READ FIRST)

For every non-trivial repository question or change:

1. Read `docs/navigation.md`.
2. Read `docs/architecture.md`.
3. Read the relevant domain guide and/or co-located component README.
4. For implementation work, also follow the contributor and testing route in
   `docs/navigation.md`.
5. Only then inspect source files. Keep exploration scoped to the paths identified by the docs.

In the final response, include a `Consulted docs` line naming the documents used. A trivial lookup
may skip this gate, but the response must explicitly say why no documentation was needed.

## Repository invariants

- Consumer code imports from `@gravity-ui/uikit` or a documented subpath in `package.json`; never
  from this repository's `src/` tree.
- Treat the root entrypoint as stable, `@gravity-ui/uikit/legacy` as compatibility-only, and
  `@gravity-ui/uikit/unstable` as non-stable. SSR-only utilities belong in
  `@gravity-ui/uikit/server`.
- Keep component implementation, SCSS, tests, stories, i18n resources, and README co-located in
  `src/components/<Component>/`. Public exports flow through the nearest `index.ts` barrel and
  ultimately the package entrypoint.
- Use semantic `--g-color-*` tokens in component and application styles; private palette tokens are
  implementation details. Prefer spacing, typography, and radius tokens over hard-coded values.
- Preserve RTL and i18n behavior: use logical CSS properties where direction matters and the
  existing configuration/i18n patterns for built-in text.
- Use npm only. The supported local baseline is Node.js 20.19+ and npm 9+; restore dependencies
  with `npm ci` when required checks cannot run because the installation is incomplete.
- Do not change public exports or TypeScript API shape unless the task explicitly requires it.

## Testing and validation

Use a change-aware fast loop and require every applicable check to pass:

- Use the applicable npm scripts declared in `package.json` as the validation entrypoints. They
  are the repository source of truth and keep local validation consistent with CI. Do not create
  or run ad hoc shell, Node.js, or other one-off validators in place of repository scripts. If no
  package script covers a desired check, report that validation gap instead of inventing a local
  check.
- Always run `git diff --check`.
- Markdown: `npm run lint:prettier`.
- TS/TSX: ESLint changed files, `npm run typecheck`, and exact co-located Jest test files. Use
  `--findRelatedTests` only for shared code.
- SCSS or visual behavior: `npm run lint:styles` and the targeted Playwright visual test.
- Public exports, shared infrastructure, or package/build configuration: full lint, typecheck,
  Jest, and `npm run build`.
- Storybook/configuration: `npm run build-storybook`; use `test-storybook` when a target is
  available.

Never update snapshots without separate user approval. If approval is given, update only the
relevant snapshots, rerun the targeted Playwright test, and report the changed snapshot files.

## Response contract

Every completed change report must include:

- `Consulted docs`: the docs read before source exploration;
- validation commands and their results;
- snapshot status, including that no snapshots changed when applicable.
