import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {Modal} from '../Modal';

import {ModalQa} from './constants';

test.describe('Modal', {tag: '@Modal'}, () => {
    smokeTest('', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 500, height: 500});

        await mount(
            <div>
                <div>page content</div>
                <Modal open qa={ModalQa.content}>
                    <div style={{padding: 10}}>Modal content</div>
                </Modal>
            </div>,
        );

        await expect(page.getByTestId(ModalQa.content)).toBeVisible();

        await expectScreenshot({
            component: page,
        });
    });
});
