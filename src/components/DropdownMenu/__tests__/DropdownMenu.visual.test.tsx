import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
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
            smokeTest(title, async ({page, mount, expectScreenshot}) => {
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
                    component,
                    themes: ['light'],
                });
            });
        });
    });

    smokeTest('menu with empty groups', async ({page, mount, expectScreenshot}) => {
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
            component,
            themes: ['light'],
        });
    });
});
