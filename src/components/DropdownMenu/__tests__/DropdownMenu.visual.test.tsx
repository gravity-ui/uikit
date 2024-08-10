import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DropdownMenuItemMixed, DropdownMenuProps} from '../DropdownMenu';
import {DropdownMenu} from '../DropdownMenu';

import type {ItemData} from './cases';
import {disabledCases, iconCases, sizeCases} from './cases';

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

    const defaultProps: DropdownMenuProps<ItemData> = {
        items,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        icon: iconCases,
        disabled: disabledCases,
        // renderSwitcher: customSwitcherCases
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            await page.setViewportSize({width: 500, height: 500});

            const root = await mount(
                <div style={{width: '500px', height: '500px'}}>
                    <DropdownMenu {...props} />
                </div>,
            );

            await expectScreenshot({
                screenshotPostfix: 'init',
            });

            if (props.disabled) {
                return;
            }

            await root.locator(`button`).hover();

            await expectScreenshot({
                screenshotPostfix: 'after hover trigger',
            });

            await root.locator(`button`).click();

            await expect(page.locator(`ul`)).toBeVisible();

            await expectScreenshot({
                screenshotPostfix: 'after click trigger',
            });

            await page.locator(`ul li:nth-child(6)`).hover();

            await expectScreenshot({
                screenshotPostfix: 'after click item',
            });
        });
    });
});
