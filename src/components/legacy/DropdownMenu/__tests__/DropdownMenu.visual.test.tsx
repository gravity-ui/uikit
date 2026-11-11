import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';
import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {DropdownMenu} from '../DropdownMenu';
import type {DropdownMenuProps} from '../DropdownMenu';

import {sizeCases} from './cases';

test.describe('DropdownMenu', {tag: '@DropdownMenu'}, () => {
    test('keeps keyboard focus visible in a scrollable menu', async ({page, mount}) => {
        await mount(
            <DropdownMenu
                menuProps={{style: {maxHeight: 120}}}
                items={Array.from({length: 20}, (_, index) => ({
                    text: `Action ${index + 1}`,
                    action: () => {},
                }))}
            />,
        );

        await page.getByRole('button').press('Enter');
        await page.keyboard.press('End');
        await expect(page.getByRole('menuitem', {name: 'Action 20', exact: true})).toBeFocused();
        await expect(page.getByRole('menuitem', {name: 'Action 20', exact: true})).toBeInViewport({
            ratio: 1,
        });
        await page.keyboard.press('Home');
        await expect(page.getByRole('menuitem', {name: 'Action 1', exact: true})).toBeFocused();
        await expect(page.getByRole('menuitem', {name: 'Action 1', exact: true})).toBeInViewport({
            ratio: 1,
        });
    });

    test('keeps submenus visible outside a scrollable popup', async ({page, mount}) => {
        await mount(
            <DropdownMenu
                popupProps={{modal: true, style: {maxHeight: 120, overflow: 'auto'}}}
                items={[{text: 'More', items: [{text: 'Nested action', action: () => {}}]}]}
            />,
        );

        await page.getByRole('button').press('Enter');
        await page.keyboard.press('ArrowRight');
        await expect(page.getByRole('menuitem', {name: 'Nested action'})).toBeFocused();
        await expect(page.getByRole('menuitem', {name: 'Nested action'})).toBeInViewport({
            ratio: 1,
        });
        await page.keyboard.press('ArrowLeft');
        await expect(page.getByRole('menuitem', {name: 'More'})).toBeFocused();
    });

    test.describe("subitems inherit parents' size", () => {
        const smokeScenarios = createSmokeScenarios<DropdownMenuProps<unknown>>(
            {
                open: true,
                items: [
                    {
                        text: 'level 0',
                        action: () => {},
                        items: [
                            {
                                text: 'level 1',
                                action: () => {},
                                items: [
                                    {
                                        text: 'level 2',
                                        action: () => {},
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                size: sizeCases,
            },
        );

        smokeScenarios.forEach(([title, props]) => {
            test(`smoke ${title}`, {tag: ['@smoke']}, async ({page, mount, expectScreenshot}) => {
                const component = await mount(
                    <div
                        style={{
                            width: '300px',
                            height: '150px',
                        }}
                    >
                        <DropdownMenu {...props} />
                    </div>,
                );

                await page.getByText('level 0').hover();
                await page.getByText('level 1').hover();

                await expectScreenshot({
                    locator: component,
                    themes: ['light'],
                });
            });
        });
    });

    test(
        'smoke menu with empty groups',
        {tag: ['@smoke']},
        async ({page, mount, expectScreenshot}) => {
            const props = {
                open: true,
                items: [
                    [
                        {
                            text: 'level 0',
                            action: () => {},
                        },
                    ],
                    [],
                ],
            };
            const component = await mount(
                <div
                    style={{
                        width: '300px',
                        height: '150px',
                    }}
                >
                    <DropdownMenu {...props} />
                </div>,
            );

            await page.getByText('level 0').hover();

            await expectScreenshot({
                locator: component,
                themes: ['light'],
            });
        },
    );
});
