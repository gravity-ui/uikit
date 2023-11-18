# Playwright Test Component

## How to write a test

1. Select the component you want to write tests for
2. Inside the component folder, create the `__tests__` folder and create a file inside it with the following name `<ComponentName>.visual.test.tsx`
3. Writing a test:

   ```ts
   import React from 'react';

   import {expect, test} from '@playwright/experimental-ct-react';

   import {MyTestedComponent} from '../MyTestedComponent';

   test('Name test', async ({mount}) => {
     //mounting a component
     const component = await mount(<MyTestedComponent props={props} />);

     //screenshot
     await expect(component).toHaveScreenshot();
   });
   ```

Group of tests.

```ts
test.describe('Name group tests', () => {
  test('1', ...);
  test('2', ...);
  ...
  test('10', ...)
});
```

4. Run tests

   ```shell
   npm run playwright:install
   npm run playwright
   ```

   If you are using system other than Linux, then you need to run tests via docker command:

   ```shell
   npm run playwright:docker
   ```

   > `npm run playwright:install` command must be run only once on initial setup

5. Update screenshots if needed

```shell
npm run playwright:update
```

Or

```shell
npm run playwright:docker:update
```

6.In the folder `__snapshots__`, which is on the same level as the `__tests__` folder, the folder `<Component name>.visual.test.tsx-snapshots`, will contain screenshots

## Description of possible commands:

1. [playwright-test-components](https://playwright.dev/docs/test-components)
2. [playwright-docs](https://playwright.dev/docs/api/class-test)

## Pay attention

Screenshots are taken within the component boundaries and if it has overflowing content, do the following:

```ts
import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {WrapperTest} from '../../../../playwright/helpers';

import {Component} from '../Component';

test('Test Component  ', async ({mount}) => {
  const component = await mount(
    <WrapperTest>
      <Component />
    </WrapperTest>,
  );

  await expect(component).toHaveScreenshot();
});
```

## Test examples

- [Button](../src/components/Button/__tests__/Button.visual.test)

## Npm scripts

- `npm run playwright:install` - install playwright browsers and dependencies
- `npm run playwright` - run tests
- `npm run playwright:update` - update screenshots
- `npm run playwright:docker` - run tests using docker
- `npm run playwright:docker:update` - update screenshots using docker
