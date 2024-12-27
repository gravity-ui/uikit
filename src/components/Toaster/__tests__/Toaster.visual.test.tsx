import {smokeTest, test} from '~playwright/core';

import type {ToastProps} from '../types';

import {ToasterQA} from './constants';
import {TestToaster} from './helpers';

test.describe('Toaster', {tag: '@Toaster'}, () => {
    smokeTest('', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 500, height: 500});

        const toastProps: ToastProps = {
            name: 'toast',
            content: <div>toast content</div>,
        };

        const root = await mount(<TestToaster toastProps={toastProps} />);

        await root.locator(`button[data-qa="${ToasterQA.trigger}"]`).click();

        // wait show toast & end animations
        await page.waitForTimeout(2000);

        await expectScreenshot({
            themes: ['light'],
            component: page.locator('body'),
        });
    });
});
