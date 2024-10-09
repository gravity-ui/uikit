import React from 'react';

import {test} from '~playwright/core';

import {ToastStories} from './helpersPlaywright';

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastSimpleNormal>', async ({page, mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleNormal />);

        await expectScreenshot({component: page.locator('.g-toaster')});
    });
});
