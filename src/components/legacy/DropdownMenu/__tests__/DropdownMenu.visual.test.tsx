import {createSmokeScenarios} from '@gravity-ui/playwright-tools/component-tests';

import {test} from '~playwright/core';

import {DropdownMenu} from '../DropdownMenu';
import type {DropdownMenuProps} from '../DropdownMenu';

import {sizeCases} from './cases';

test.describe('DropdownMenu', {tag: '@DropdownMenu'}, () => {
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
