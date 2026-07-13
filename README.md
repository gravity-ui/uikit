# UIKit &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit?logo=npm)](https://www.npmjs.com/package/@gravity-ui/uikit) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/ci.yml?branch=main&label=CI&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook tests](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/test-storybook.yml?label=Storybook%20Tests&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/test-storybook.yml) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685?logo=storybook)](https://preview.gravity-ui.com/uikit/)

A set of flexible, highly practical, and efficient React components for creating rich web applications.

<!--GITHUB_BLOCK-->

![Cover image](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/uikit_cover.png)

## Resources

### ![Globe Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_light.svg#gh-light-mode-only) ![Globe Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_dark.svg#gh-dark-mode-only) [Website](https://gravity-ui.com)

### ![Documentation Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_light.svg#gh-light-mode-only) ![Documentation Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_dark.svg#gh-dark-mode-only) [Documentation](https://gravity-ui.com/components/uikit/alert)

### ![Figma Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_light.svg#gh-light-mode-only) ![Figma Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_dark.svg#gh-dark-mode-only) [Figma](<https://www.figma.com/community/file/1271150067798118027/Gravity-UI-Design-System-(Beta)>)

### ![Themer Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_light.svg#gh-light-mode-only) ![Themer Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_dark.svg#gh-dark-mode-only) [Themer](https://gravity-ui.com/themer)

### ![Storybook Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_light.svg#gh-light-mode-only) ![Storybook Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_dark.svg#gh-dark-mode-only) [Storybook](https://preview.gravity-ui.com/uikit/)

### ![Community Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_light.svg#gh-light-mode-only) ![Community Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_dark.svg#gh-dark-mode-only) [Community](https://t.me/gravity_ui)

<!--/GITHUB_BLOCK-->

## Install

```shell
npm install --save-dev @gravity-ui/uikit
```

## Usage

```jsx
import {Button} from '@gravity-ui/uikit';

const SubmitButton = <Button view="action" size="l" />;
```

### Styles

UIKit comes with base styling and theme. In order to everything look nice include this at the top of your entry file:

```js
// index.js

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';

// ...
```

UIKit supports different themes: light, dark and their contrast variants. Your app must be rendered inside `ThemeProvider`:

```js
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@gravity-ui/uikit';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>,
);
```

It is possible to generate initial root CSS-classes during SSR to avoid theme flashing:

```js
import {getRootClassName} from '@gravity-ui/uikit/server';

const theme = 'dark';
const rootClassName = getRootClassName({theme});

const html = `
<html>
  <body>
    <div id="root" class="${rootClassName}"></div>
  </body>
</html>
`;
```

Also, there is a SCSS [mixins](styles/mixins.scss) file with useful helpers to use in your app.

### I18N

Some components contain text tokens (words and phrases). They come in two languages: `en` (default) and `ru`.
To set the language use `configure` function:

```js
// index.js

import {configure} from '@gravity-ui/uikit';

configure({
  lang: 'ru',
});
```

## Development

To start the development server with storybook run the following:

```shell
git clone git@github.com:gravity-ui/uikit.git
cd uikit
npm ci
npm run start
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## For AI agents

The base React component and design-token library for Gravity UI apps — controls, inputs, overlays, layout, and theming that every other @gravity-ui package builds on.

### When to use

- Standard application UI: buttons, form controls, modals and popups, menus, tabs, labels, typography, and layout primitives.
- The theming foundation of a Gravity UI app: `ThemeProvider`, design tokens, and CSS variables the rest of the `@gravity-ui/*` ecosystem expects to be present.
- Simple tabular data via the built-in `Table` component (selection, sorting, row actions).

### When not to use

- Feature-rich data grids (virtualization, column resizing, grouping, reordering) — use [`@gravity-ui/table`](https://github.com/gravity-ui/table), a separate headless package. It is **not** the same as uikit's `Table` component.
- Charts and data visualization — use [`@gravity-ui/charts`](https://github.com/gravity-ui/charts) (`@gravity-ui/chartkit` is the legacy wrapper).
- Application navigation shells (aside header, footer, logo) — use [`@gravity-ui/navigation`](https://github.com/gravity-ui/navigation).
- Date pickers, calendars, and range controls — use [`@gravity-ui/date-components`](https://github.com/gravity-ui/date-components).
- The SVG icon set itself — use [`@gravity-ui/icons`](https://github.com/gravity-ui/icons); uikit only ships the `Icon` renderer.

### Common pitfalls

- `Button` styling prop is `view`, not `variant` or `color`
- **Components render unstyled without setup.** Wrap the app in `ThemeProvider` **and** import `@gravity-ui/uikit/styles/styles.css` (plus `fonts.css`) once at the entry point — both are required.
- **`Icon` has no `name` prop.** Pass an imported icon component through `data`: `import {Gear} from '@gravity-ui/icons'; <Icon data={Gear} size={16} />`.
- **`theme` values are `light | dark | light-hc | dark-hc`.** There is no `theme="default"`.

### Useful docs

- [Layout components and spacings](./docs/layout.md)
- [Theming, Colors & Branding](./docs/theming.md)
- [Typography](./docs/typography.md)
