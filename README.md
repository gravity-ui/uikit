# @gravity-ui/base &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/base)](https://www.npmjs.com/package/@gravity-ui/base) [![CI](https://img.shields.io/github/workflow/status/gravity-ui/base/CI/main?label=CI&logo=github)](https://github.com/gravity-ui/base/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.yandexcloud.dev/gravity-ui-base/)

A set of React components for building rich web applications.

## Install

```shell
npm install --save-dev @gravity-ui/base
```

## Usage

```jsx
import React from 'react';
import {Button} from '@gravity-ui/base';

const SubmitButton = <Button view="action" size="l" />;
```

## I18N

Some components contain prepared text. For changing language use `configure` function. Default language is `en`.

**index.js**

```js
import {configure} from '@gravity-ui/base';

configure({
  lang: 'ru',
});
```

## Development

To start the dev storybook

```shell
npm run start
```
