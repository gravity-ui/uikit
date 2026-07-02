# UIKit &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit?logo=npm)](https://www.npmjs.com/package/@gravity-ui/uikit) [![npm downloads](https://img.shields.io/npm/dm/@gravity-ui/uikit?logo=npm)](https://www.npmjs.com/package/@gravity-ui/uikit) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/ci.yml?branch=main&label=CI&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook tests](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/test-storybook.yml?label=Storybook%20Tests&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/test-storybook.yml) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685?logo=storybook)](https://preview.gravity-ui.com/uikit/)

[English](README.md) | [Русский](README-ru.md)

A set of flexible, highly practical, and efficient React components for creating rich web applications. Part of the [Gravity UI](https://gravity-ui.com) design system.

<!--GITHUB_BLOCK-->

![Cover image](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/uikit_cover.png)

### ![Globe Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_light.svg#gh-light-mode-only) ![Globe Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/globe_dark.svg#gh-dark-mode-only) [Website](https://gravity-ui.com) &nbsp;&nbsp; ![Documentation Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_light.svg#gh-light-mode-only) ![Documentation Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/book-open_dark.svg#gh-dark-mode-only) [Documentation](https://gravity-ui.com/components/uikit/alert) &nbsp;&nbsp; ![Figma Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_light.svg#gh-light-mode-only) ![Figma Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/figma_dark.svg#gh-dark-mode-only) [Figma](<https://www.figma.com/community/file/1271150067798118027/Gravity-UI-Design-System-(Beta)>) &nbsp;&nbsp; ![Themer Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_light.svg#gh-light-mode-only) ![Themer Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/bucket-paint_dark.svg#gh-dark-mode-only) [Themer](https://gravity-ui.com/themer) &nbsp;&nbsp; ![Storybook Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_light.svg#gh-light-mode-only) ![Storybook Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/storybook_dark.svg#gh-dark-mode-only) [Storybook](https://preview.gravity-ui.com/uikit/) &nbsp;&nbsp; ![Community Logo Light](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_light.svg#gh-light-mode-only) ![Community Logo Dark](https://raw.githubusercontent.com/gravity-ui/uikit/main/docs/assets/telegram_dark.svg#gh-dark-mode-only) [Community](https://t.me/gravity_ui)

<!--/GITHUB_BLOCK-->

## About

UIKit is the foundational package of the [Gravity UI](https://gravity-ui.com) design system — a battle-tested set of 70+ React components built for production web applications. It handles the hard parts: theming, accessibility, RTL layout, server-side rendering, and internationalization, so you can focus on building your product.

Key features:

- **70+ components** — inputs, overlays, data display, layout primitives, feedback, and more
- **Built-in theming** — light, dark, and high-contrast variants with a live [Themer](https://gravity-ui.com/themer) tool to customize tokens
- **RTL support** — full right-to-left layout direction
- **SSR-ready** — avoids theme flash on first render
- **React 16–19** — broad version compatibility

Browse the full component catalog in [Storybook](https://preview.gravity-ui.com/uikit/) or the [documentation](https://gravity-ui.com/components/uikit/alert).

## Getting Started

### Prerequisites

React 16.14, 17, 18, or 19 must be installed in your project.

### Installation

```shell
npm install @gravity-ui/uikit
```

## Usage

Import components directly from the package:

```jsx
import {Button} from '@gravity-ui/uikit';

const SubmitButton = (
  <Button view="action" size="l">
    Submit
  </Button>
);
```

### Styles

Include the base styles and fonts once at the top of your app entry point:

```js
// index.js
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
```

A SCSS [mixins](styles/mixins.scss) file with useful helpers is also available for use in your own stylesheets.

### Theming

Wrap your app in `ThemeProvider` to enable theming. Supported themes: `light`, `dark`, `light-contrast`, `dark-contrast`.

```jsx
import {createRoot} from 'react-dom/client';
import {ThemeProvider} from '@gravity-ui/uikit';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme="light">
    <App />
  </ThemeProvider>,
);
```

### Server-Side Rendering

To prevent a theme flash on the initial page load, generate the root CSS class during SSR:

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

### I18N

Some components contain built-in text tokens. The default language is English (`en`); Russian (`ru`) is also supported. Set the language once at startup:

```js
// index.js
import {configure} from '@gravity-ui/uikit';

configure({lang: 'ru'});
```

## Development

```shell
git clone git@github.com:gravity-ui/uikit.git
cd uikit
npm ci
npm run start   # launches Storybook at http://localhost:7007
```

Other useful commands:

```shell
npm test              # run unit tests
npm run lint          # lint JS, SCSS, and Markdown
npm run typecheck     # TypeScript type-check
npm run playwright    # run visual regression tests
```

## Maintainers

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/amje">
        <img src="https://github.com/amje.png?size=100" width="100" alt="amje" /><br />
        <sub><b>@amje</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ValeraS">
        <img src="https://github.com/ValeraS.png?size=100" width="100" alt="ValeraS" /><br />
        <sub><b>@ValeraS</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/korvin89">
        <img src="https://github.com/korvin89.png?size=100" width="100" alt="korvin89" /><br />
        <sub><b>@korvin89</b></sub>
      </a>
    </td>
  </tr>
</table>

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting a pull request. For detailed PR guidelines see [contribute/pull-request.md](contribute/pull-request.md).

We have [![contributors](https://img.shields.io/github/contributors/gravity-ui/uikit?label=contributors)](https://github.com/gravity-ui/uikit/graphs/contributors) contributors and counting — join us!

Join the community on [Telegram](https://t.me/gravity_ui) for questions and discussion.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## Star History

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline" />
    <img alt="Star History Chart" width="600" src="https://api.star-history.com/svg?repos=gravity-ui/uikit&type=Timeline" />
  </picture>
</div>

---

If you find UIKit useful, please consider giving it a ⭐ on [GitHub](https://github.com/gravity-ui/uikit) — it helps others discover the project.
