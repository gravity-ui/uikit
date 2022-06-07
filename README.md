# @yandex-cloud/uikit &middot; [![npm package](https://img.shields.io/npm/v/@yandex-cloud/uikit)](https://www.npmjs.com/package/@yandex-cloud/uikit) [![CI](https://img.shields.io/github/workflow/status/yandex-cloud/uikit/CI/main?label=CI&logo=github)](https://github.com/yandex-cloud/uikit/actions/workflows/ci.yml?query=branch:main) [![storybook](https://img.shields.io/badge/Storybook-deployed-ff4685)](https://preview.yandexcloud.dev/uikit/)

A set of React components for building rich web applications.

## Install

```shell
npm install --save-dev @yandex-cloud/uikit @yandex-cloud/i18n
```

## Usage

```jsx
import React from 'react';
import {Button} from '@yandex-cloud/uikit';

const SubmitButton = <Button view="action" size="l" />;
```

## I18N

Some components contain prepared text. For changing language use `configure` function.

## Development

To start the dev storybook

```shell
npm run start
```
