# Playwright Test Component

## How to write a test

1. You need to select the component for which you want to write tests
2. In the component folder, create a folder `__tests__`
3. Create a file in it `NameComponent.visual.test.tsx`
4. In the file to make imports:

   ```ts
   import React from 'react';

   import {expect, test} from '@playwright/experimental-ct-react';

   import {MyTestedComponent} from '../MyTestedComponent';
   ```

5. Writing a test:

   ```ts
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

6. Running the test: (you don't need to run storybook to test components)

   ```shell
   npm run playwright install
   npm run test:component
   ```

   If you are developing on a system other than Linux, then you need to use a command that takes screenshot tests based on a Docker image.

   ```shell
   npm run test:component:docker
   ```

   ! the npm run playwright install command must be run for the first time

7. To update screenshots use the command

```shell
 npm run test:component:update
```

Or

```shell
 npm run test:component:docker:update
```

8. In the folder `__tests__`, in which the folder `NameComponent.visual.test.tsx-snapshots` will appear, it will contain screenshots

## Description of possible commands:

1. [playwright-test-components](https://playwright.dev/docs/test-components)
2. [playwright-docs](https://playwright.dev/docs/api/class-test)

## Pay attention

It takes screenshots along the border of the component and if you see that any part of the component did not get into the screenshots, it is recommended to do the following:

```ts
import React from 'react';

import {expect, test} from '@playwright/experimental-ct-react';

import {Component} from '../Component';

test('test Component  ', async ({mount}) => {
  const component = await mount(
    <div style={{padding: 20}}>
      <Component />
    </div>,
  );

  await expect(component).toHaveScreenshot();
});
```

## Test examples

- [Button](../src/components/Button/__tests__/Button.visual.test)

## Npm scripts

- `npm run test:component` - run tests
- `npm run test:component:update` - update screenshots
- `npm run test:component:docker` - run tests using docker
- `npm run test:component:docker` - update screenshots using docker
