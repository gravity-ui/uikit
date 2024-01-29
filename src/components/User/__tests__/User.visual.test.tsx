import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {Default} from './stories';

test.describe('User', () => {
    test('render story: <Default>', async ({mount}) => {
        const component = await mount(<Default />);

        await expect(component).toHaveScreenshot();
    });
});
