import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DefinitionListProps} from '../types';

import {DefinitionListStories} from './stories';

// Test is flaky. Screenshot height randomly changes by 6px.
test.describe.skip('DefinitionList', {tag: '@DefinitionList'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        await mount(<DefinitionListStories.Default />);

        await expectScreenshot();
    });

    createSmokeScenarios<Omit<DefinitionListProps, 'children'>>(
        {},
        {
            direction: ['vertical', 'horizontal'],
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <DefinitionListStories.Default {...props} />
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios<Omit<DefinitionListProps, 'children'>>(
        {
            responsive: true,
        },
        {
            nameMaxWidth: [100],
            contentMaxWidth: [100],
        },
        {
            scenarioName: 'responsive',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const size = page.viewportSize();
            if (size) {
                await page.setViewportSize({
                    width: 1000,
                    height: size.height,
                });
            }

            await mount(
                <div>
                    <h4>{title}</h4>
                    <DefinitionListStories.Default {...props} />
                </div>,
                {width: 'auto'},
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
