import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import type {DropdownMenuItemMixed} from '../DropdownMenu';
import {DropdownMenu} from '../DropdownMenu';

type ItemData = {};

test.describe('DropdownMenu', {tag: '@DropdownMenu'}, () => {
    const items: DropdownMenuItemMixed<ItemData>[] = [
        [
            {
                action: () => {},
                text: 'I am an item',
            },
            {
                action: () => {},
                text: 'I am disabled item',
                disabled: true,
            },
        ],
        {
            action: () => {},
            text: 'I am a link item',
            title: '(I open in new folder)',
            href: 'https://cloud.yandex.com',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            action: () => {},
            text: 'Option with theme',
            theme: 'danger',
        },
        {
            text: 'Other',
            items: [
                {
                    action: () => {},
                    text: 'Select',
                    items: [
                        {
                            action: () => {},
                            text: 'One',
                        },
                        {
                            action: () => {},
                            text: 'All',
                        },
                    ],
                },
                {
                    action: () => {},
                    text: 'Copy',
                },
            ],
        },
    ];

    smokeTest('', async ({mount, page, expectScreenshot}) => {
        await page.setViewportSize({width: 500, height: 500});

        const root = await mount(
            <div style={{width: '500px', height: '500px'}}>
                <DropdownMenu items={items} />
            </div>,
        );

        await root.locator(`button`).click();

        await expect(page.locator(`ul`)).toBeVisible();

        await page.locator(`ul li:nth-child(6)`).hover();

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
