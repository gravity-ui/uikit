# Repository navigation

[English](navigation.md) | [Русский](navigation-ru.md)

Use this page as the contributor index for repository work. Start with the authoritative documentation,
then open only the listed source area, and finish with the matching validation. The
[architecture guide](architecture.md) defines the package and maturity boundaries used by every
route.

## Task routes

| Task                                           | Read first                                                                                                                                                       | Then inspect                                                                                      | Minimum relevant validation                                                                                                 |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Understand the repository or public package    | This page, then [architecture](architecture.md) and [README](../README.md)                                                                                       | `package.json`, `src/index.ts`, relevant entrypoint barrels                                       | Read-only task; cite the docs and files used                                                                                |
| Prepare a contribution                         | [README development setup](../README.md#development), [contributor overview](README.md), [CLA](../CONTRIBUTING.md), and [PR guide](pull-request.md)              | Only the feature area after the issue/contract is clear                                           | The change-aware route below plus `git diff --check`                                                                        |
| Use a component                                | Its `src/components/<Component>/README.md`; use [layout](../docs/layout.md), [theming](../docs/theming.md), or [typography](../docs/typography.md) when relevant | The component's stories for examples; implementation only if the README is insufficient           | No code checks for a usage answer; verify examples against public imports                                                   |
| Change a component                             | Component README and relevant domain guide                                                                                                                       | `src/components/<Component>/`, including its barrel, SCSS, tests, stories, and i18n               | ESLint changed TS/TSX, typecheck, and exact co-located Jest tests; add Stylelint and targeted Playwright for visual changes |
| Change layout or spacing                       | [Layout](../docs/layout.md) and [theming](../docs/theming.md)                                                                                                    | `src/components/layout/`, `styles/themes/common/spacing.scss`, affected component SCSS            | Typecheck/Jest for logic; Stylelint and targeted Playwright for rendering                                                   |
| Change colors, branding, or themes             | [Theming](../docs/theming.md) and, when text metrics change, [typography](../docs/typography.md)                                                                 | `styles/themes/`, `styles/styles.scss`, `src/components/theme/`, affected SCSS                    | Stylelint, targeted Playwright, and build for published theme/style changes                                                 |
| Change typography                              | [Typography](../docs/typography.md) and [theming](../docs/theming.md)                                                                                            | `styles/themes/common/typography.scss`, `src/components/Text/`, relevant stories                  | Stylelint, exact Jest tests, and targeted Playwright                                                                        |
| Add or change SSR behavior                     | [SSR guide](../docs/server-side-rendering.md) and [architecture](architecture.md#public-package-surface)                                                         | `src/server.ts` and server-safe implementation such as `src/components/theme/getRootClassName.ts` | ESLint, typecheck, exact Jest tests, full build; keep browser-only code out                                                 |
| Add or change built-in text                    | [I18n guide](../docs/i18n.md)                                                                                                                                    | `src/utils/configure.ts`, `src/i18n/`, and the component's `i18n/` directory                      | ESLint, typecheck, exact component tests; verify all supported locales                                                      |
| Change a public export or build/package config | [Architecture](architecture.md#public-package-surface)                                                                                                           | `package.json`, `gulpfile.js`, and all affected entrypoint barrels                                | Full lint, typecheck, Jest, and `npm run build`                                                                             |
| Work on tests or snapshots                     | This page, the component README, and [Playwright testing guide](../playwright/README.md) for visual tests                                                        | Exact `*.test.tsx` or `*.visual.test.tsx`, `jest.config.js`, or `playwright/playwright.config.ts` | Run the exact test first; never update snapshots without separate approval                                                  |
| Change Storybook or its configuration          | Relevant component README and story; [architecture](architecture.md#documentation-and-examples)                                                                  | Co-located `__stories__/`, `src/stories/`, and `.storybook/`                                      | `npm run build-storybook`; `npm run test-storybook` when a target is available                                              |
| Edit documentation only                        | The English source document and its Russian pair                                                                                                                 | The linked Markdown files and README indexes                                                      | `npm run lint:prettier` and `git diff --check`                                                                              |

## Source landmarks

- `src/components/` — components, component families, and co-located docs/tests/stories/styles.
- `src/hooks/` — public, private, and experimental React hooks.
- `src/utils/` and `src/components/utils/` — general and component-scoped utilities.
- `styles/` — published global styles, fonts, mixins, tokens, and built-in themes.
- `src/stories/` and `.storybook/` — cross-cutting stories and Storybook configuration.
- `test-utils/`, `jest.config.js`, and `playwright/` — unit and visual-test infrastructure.
- `gulpfile.js` and `package.json` — build pipeline and public package contract.

## Change-aware validation

Every change starts with the smallest fast loop that covers it, and every applicable required check
must finish green. Always run `git diff --check`.

Prefer the npm scripts declared in `package.json` as validation entrypoints because they keep local
validation consistent with CI. For a faster targeted loop, pass file paths or supported options
through those scripts, for example `npm run lint:js -- <files>` or `npm test -- <test-files>`.
Repository-owned task-specific runners documented by their own execution guides may also be run
directly. Do not invent ad hoc validators; if no package script or documented runner covers a
desired check, report the validation gap.

- Markdown: `npm run lint:prettier`.
- TS/TSX: run `npm run lint:js -- <changed-files>`, `npm run typecheck`, and
  `npm test -- <exact-test-files>`. Reserve `--findRelatedTests` for genuinely shared code because a
  foundational component can pull in most of the suite.
- SCSS or visual behavior: `npm run lint:styles` and the targeted Playwright file.
- Public exports, shared infrastructure, or package/build configuration: full `npm run lint`,
  `npm run typecheck`, `npm test`, and `npm run build`.
- Storybook/configuration: `npm run build-storybook`; run `test-storybook` only when a local or
  remote Storybook target is available.

If dependencies are missing or inconsistent, restore them with `npm ci` before diagnosing a check
as a baseline failure. Do not declare work complete while a required check is red.

Snapshot updates are an explicit exception: ask for separate approval, update only the relevant
snapshots after approval, rerun the targeted Playwright test, and list every changed snapshot.
