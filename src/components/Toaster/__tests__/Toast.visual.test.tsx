import React from 'react';

import type {Page} from '@playwright/test';

import {test} from '~playwright/core';

import {ToastStories} from './helpersPlaywright';

function getComponent(page: Page) {
    return page.locator('.g-toaster').filter({has: page.locator('.g-toast')});
}

test.describe('Toast', {tag: '@Toaster'}, () => {
    test('render story: <ToastSimpleNormal>', async ({page, mount, expectScreenshot}) => {
        await mount(<ToastStories.ToastSimpleNormal />);

        await expectScreenshot({
            component: getComponent(page),
        });
    });
});
