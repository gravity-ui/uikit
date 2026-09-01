# Repository architecture

[English](architecture.md) | [Русский](architecture-ru.md)

UIKit is a single publishable package, `@gravity-ui/uikit`. The repository contains the package
source, styles, documentation, Storybook, and test infrastructure; it is not an application
monorepo. Consumers use the package's public entrypoints and never import from this repository's
`src/` tree.

## Public package surface

`package.json` is the source of truth for published subpaths. Each JavaScript entrypoint provides
ESM and CommonJS builds with matching TypeScript declarations.

| Consumer import                       | Source entrypoint          | Maturity and purpose                                                         |
| ------------------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| `@gravity-ui/uikit`                   | `src/index.ts`             | Stable components, hooks, utilities, configuration, and types                |
| `@gravity-ui/uikit/toaster-singleton` | `src/toaster-singleton.ts` | Toaster singleton integration                                                |
| `@gravity-ui/uikit/i18n`              | `src/i18n/index.ts`        | I18n helpers and resources                                                   |
| `@gravity-ui/uikit/server`            | `src/server.ts`            | Server-safe helpers, currently the root theme class generator                |
| `@gravity-ui/uikit/legacy`            | `src/legacy.ts`            | Compatibility surface for legacy components; avoid for new work              |
| `@gravity-ui/uikit/unstable`          | `src/unstable.ts`          | Experimental surface without the stability guarantees of the root entrypoint |
| `@gravity-ui/uikit/styles/*`          | `styles/*`                 | Global CSS/SCSS, fonts, mixins, and themes                                   |

The stable root barrel re-exports `src/components/index.ts`, `src/hooks/index.ts`, and selected
utilities and types. Component and hook folders have their own `index.ts` barrels. A new public
symbol must be exported through that chain deliberately; a file under `src/` is not public merely
because it exists.

The maturity boundary is part of the API contract:

- prefer the stable root entrypoint for application code;
- keep compatibility-only APIs under `legacy` and do not expand their use;
- expose work-in-progress APIs through `unstable`, commonly with an `unstable_` name;
- keep browser-dependent APIs out of the `server` entrypoint.

## Source organization

### Components

Production components live under `src/components/<Component>/`. A typical component keeps its
implementation (`<Component>.tsx`), styles (`<Component>.scss`), public barrel (`index.ts`), README,
unit tests, visual tests, stories, and i18n resources together. Larger components may add internal
`components/`, `hooks/`, or `utils/` folders without making those internals public.

Shared component families and maturity layers also live under `src/components/`:

- `controls/`, `layout/`, `mobile/`, `tabs/`, and `theme/` provide grouped stable APIs;
- `legacy/` backs the legacy entrypoint;
- `lab/`, `TreeList`, `TreeSelect`, and `useList` contain APIs surfaced selectively through the
  unstable entrypoint;
- `utils/` contains implementation shared by components.

### Hooks and utilities

Public reusable hooks live in `src/hooks/` and flow through `src/hooks/index.ts`. Private or lab
hooks remain in their corresponding subdirectories until deliberately promoted. General utilities
live in `src/utils/`; component-oriented utilities stay in `src/components/utils/`.

### Styles and themes

`styles/styles.scss` is the global style entrypoint and `styles/fonts.scss` defines packaged font
setup. Theme definitions live in `styles/themes/`, with shared structural tokens under
`styles/themes/common/` and color sets for `light`, `dark`, `light-hc`, and `dark-hc`.

Components consume CSS custom properties and co-located SCSS. Application-facing styles must use
semantic color tokens such as `--g-color-base-*`, `--g-color-text-*`, and `--g-color-line-*`;
`--g-color-private-*` is the palette implementation layer. Layout-sensitive styles use logical
properties so the same component works in LTR and RTL.

### Internationalization

Global language configuration starts in `src/utils/configure.ts`; the public i18n entrypoint is
`src/i18n/index.ts`. Components with built-in text keep locale JSON and wiring in co-located `i18n/`
directories. Add user-visible built-in text through that mechanism instead of hard-coding one
language in component code.

## Build and published artifacts

`gulpfile.js` orchestrates the package build:

1. clean generated output;
2. compile TypeScript and declarations into `build/esm` and `build/cjs`;
3. copy locale JSON into both module trees;
4. compile global styles and co-located component SCSS;
5. generate the packaged component documentation.

The ESM output declares `type: module`; the CommonJS output declares `type: commonjs`. Published
files are limited to `build/` and `styles/`. `package.json` maps imports and `require` calls to the
corresponding module tree, so any entrypoint change must stay symmetric across code and types.

## Documentation and examples

Human guides live in `docs/`. Component API and behavior notes live next to code in component
READMEs. Per-component Storybook stories live in `src/components/<Component>/__stories__/`; broader
branding, color, typography, and showcase stories live in `src/stories/`. Storybook configuration
is in `.storybook/` and supplies interactive documentation plus accessibility checks.

## Tests and quality gates

- Jest discovers `*.test.ts` and `*.test.tsx` files, normally co-located under `__tests__/`, using
  `jest.config.js` and the shared `test-utils/` setup.
- Playwright component tests discover `__tests__/*.visual.test.tsx` under `src/` using
  `playwright/playwright.config.ts`; snapshots are stored beside the component in `__snapshots__/`.
- Storybook has a static build and a separate browser test runner configured in `.storybook/`.
- ESLint, Stylelint, Prettier, and TypeScript cover code, SCSS, Markdown, and types respectively.

Choose the smallest relevant loop from [navigation](navigation.md), but use the full package checks
when changing public barrels, build configuration, shared infrastructure, or published artifacts.
