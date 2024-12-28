# Playwright Test Component

## How to write a test

1. Select the component you want to write tests for
2. Inside the component folder, create the `__tests__` folder and create a file inside it with the following name `<ComponentName>.visual.test.tsx`
3. Writing a test:

   Capture a screenshot, by default in light theme only:

   ```tsx
   import {expect} from '@playwright/experimental-ct-react';

   import {MyComponent} from '../MyComponent';

   import {test} from '~playwright/core';

   test('test description', async ({mount}) => {
     // mount the component
     const component = await mount(<MyComponent props={props} />);

     // capture the screenshot
     await expect(component).toHaveScreenshot();
   });
   ```

   You can also capture screenshots both in dark and light themes:

   ```tsx
   import {MyComponent} from '../MyComponent';

   import {test} from '~playwright/core';

   test('test description', async ({mount, expectScreenshot}) => {
     // mount the component
     await mount(<MyComponent props={props} />);

     // capture the screenshot
     await expectScreenshot();
   });
   ```

   If you need to do any actions with the component:

   ```tsx
   import {MyComponent} from '../MyComponent';

   import {test} from '~playwright/core';

   test('test description', async ({mount, expectScreenshot}) => {
     // mount the component
     const component = await mount(<MyComponent props={props} />);

     // capture the screenshot
     await expectScreenshot({component});
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

6. In the folder `__snapshots__`, which is on the same level as the `__tests__` folder, the folder `<Component name>.visual.test.tsx-snapshots`, will contain screenshots

## Description of possible commands:

1. [playwright-test-components](https://playwright.dev/docs/test-components)
2. [playwright-docs](https://playwright.dev/docs/api/class-test)
3. [playwright-writing-tests](https://playwright.dev/docs/writing-tests)

## Test examples

- [Button](../src/components/Button/__tests__/Button.visual.test.tsx)
- [Label](../src/components/Label/__tests__//Label.visual.test.tsx)

## Npm scripts

- `npm run playwright:install` - install playwright browsers and dependencies
- `npm run playwright` - run tests
- `npm run playwright:update` - update screenshots
- `npm run playwright:clear-cache` - clear cache vite
- `npm run playwright:docker` - run tests using docker
- `npm run playwright:docker:update` - update screenshots using docker
- `npm run playwright:docker:clear-cache` - clear node_modules cache for docker container and clear cache vite
