import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {TabsProps} from '../Tabs';

import {directionCases, sizeCases} from './cases';
import {TestTabs, TestTabsWithCustomTabs} from './helpers';

test.describe('Tabs', {tag: '@Tabs'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabsProps>(
            {
                activeTab: '2',
            },
            {
                size: sizeCases,
                direction: directionCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabs {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('allow not selected', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabsProps>(
            {},
            {
                size: sizeCases,
                direction: directionCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabs {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with custom tab', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TabsProps>(
            {
                activeTab: '2',
            },
            {
                size: sizeCases,
                direction: directionCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <TestTabsWithCustomTabs {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
