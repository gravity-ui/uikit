import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {DefinitionList} from '../DefinitionList';
import type {DefinitionListProps} from '../types';

import {extendedSkeletonItems, skeletonItems} from './test-data';

test.describe('DefinitionList', {tag: '@DefinitionList'}, () => {
    test('render story <Default>', async ({mount, expectScreenshot}) => {
        await mount(
            <DefinitionList contentMaxWidth={480}>
                {extendedSkeletonItems.map((item, index) => (
                    <DefinitionList.Item key={index} {...item} />
                ))}
            </DefinitionList>,
        );

        await expectScreenshot();
    });

    // Smoke tests with skeleton data
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
                    <DefinitionList {...props}>
                        {skeletonItems.map((item, index) => (
                            <DefinitionList.Item key={index} {...item} />
                        ))}
                    </DefinitionList>
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
                    <DefinitionList {...props}>
                        {skeletonItems.slice(0, 5).map((item, index) => (
                            <DefinitionList.Item key={index} {...item} />
                        ))}
                    </DefinitionList>
                </div>,
                {width: 'auto'},
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    createSmokeScenarios<Omit<DefinitionListProps, 'children'>>(
        {},
        {
            nameWidth: ['max'],
            definitionWidth: ['max'],
        },
        {
            scenarioName: 'width-modifiers',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            await mount(
                <div>
                    <h4>{title}</h4>
                    <DefinitionList {...props}>
                        {skeletonItems.slice(0, 6).map((item, index) => (
                            <DefinitionList.Item key={index} {...item} />
                        ))}
                    </DefinitionList>
                </div>,
            );

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
