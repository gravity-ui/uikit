# UIKit repository guide

## Repository purpose and documentation map

This repository builds the single publishable React package `@gravity-ui/uikit`, including its
public JavaScript/TypeScript entrypoints and styles. Start with the human documentation:

- [`contribute/navigation.md`](contribute/navigation.md) maps tasks to authoritative docs, source
  directories, and validation.
- [`contribute/architecture.md`](contribute/architecture.md) explains package boundaries, public
  entrypoints, source layout, and build/test systems.
- Domain guides cover [theming](docs/theming.md), [layout](docs/layout.md),
  [typography](docs/typography.md), [SSR](docs/server-side-rendering.md), and
  [i18n](docs/i18n.md).
- Component-specific behavior belongs in `src/components/<Component>/README.md`.

## Pre-response gate (READ FIRST)

For every non-trivial repository question or change:

1. Read `contribute/navigation.md`.
2. Read `contribute/architecture.md`.
3. Read the relevant domain guide and/or co-located component README.
4. For implementation work, also follow the contributor and testing route in
   `contribute/navigation.md`.
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

Follow the [change-aware validation matrix](contribute/navigation.md#change-aware-validation), the
single source of truth for required checks, dependency recovery, and snapshot handling.

## Response contract

Every completed change report must include:

- `Consulted docs`: the docs read before source exploration;
- validation commands and their results;
- snapshot status, including that no snapshots changed when applicable.
