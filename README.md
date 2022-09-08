# @gravity-ui/uikit &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit)](https://www.npmjs.com/package/@gravity-ui/uikit) [![CI](https://img.shields.io/github/workflow/status/gravity-ui/uikit/CI/main?label=CI&logo=github)](https://github.com/gravity-ui/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.yandexcloud.dev/uikit/)

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

## I18N

Some components contain prepared text. For changing language use `configure` function. Default language is `en`.

**index.js**

```js
import {configure} from '@gravity-ui/uikit';

configure({
  lang: 'ru',
});
```

## Development

To start the dev storybook

```shell
npm run start
```
