# Test Component

## How to write a test

1. You need to select the component for which you want to write tests
2. In the component folder, create a folder `__component__`
3. Create a file in it `component name.spec.tsx`
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
   npm run playwright:install
   npm run test:component
   ```

   ! the npm run playwright:install command must be run for the first time

7. In the folder `__component__`, in which the folder `component name.spec.tsx-snapshots` will appear, it will contain screenshots

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

- [TextInput](../src/components/controls/TextInput/__component__/TextInput.spec.tsx)
- [Button](../src/components/Button/__component__/Button.spec.tsx)
- [Card](../src/components/Card/__component__/Card.spec.tsx)
- [Table](../src/components/Table/__component__/Table.spec.tsx)

## Npm scripts

- `npm run test:component` - run tests
- `npm run test:component:update` - update screenshots
