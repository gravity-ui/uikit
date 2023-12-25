# @gravity-ui/uikit &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit)](https://www.npmjs.com/package/@gravity-ui/uikit) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit/.github/workflows/ci.yml?branch=main&label=CI&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.gravity-ui.com/uikit/)

A set of React components for building rich web applications.

## Install

```shell
npm install --save-dev @gravity-ui/uikit
```

## Usage

```jsx
import React from 'react';
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

UIKit supports different themes: light, dark and their contrast variants. The theme must be applied. To do that either
wrap your app in `ThemeProvider`:

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

or add specific CSS-classes to the root node:

```html
<!-- index.html -->
<html>
  <body>
    <div id="root" class="g-root g-root_theme_light"></div>
  </body>
</html>
```

it is possible to generate initial CSS-classes during SSR:

```js
import {getInitialRootClassName} from '@gravity-ui/uikit';

const theme = 'light';
const rootClassName = getInitialRootClassName({theme});
```

```js
// index.js
import {createRoot} from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
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
npm start
```
