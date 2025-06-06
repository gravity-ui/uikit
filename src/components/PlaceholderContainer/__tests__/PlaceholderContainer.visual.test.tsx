import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';

import {
    actionsCases,
    alignCases,
    contentCases,
    descriptionCases,
    directionCases,
    maxWidthCases,
    sizeCases,
    titleCases,
} from './cases';
import {PlaceholderContainerStories, TestPlaceholderContainerWithImage} from './helpersPlaywright';
import type {TestPlaceholderContainerProps} from './helpersPlaywright';

test.describe('PlaceholderContainer', {tag: '@PlaceholderContainer'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Direction>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.Direction />);

        await expectScreenshot();
    });

    test('render story: <Align>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.Align />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Actions>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.Actions />);

        await expectScreenshot();
    });

    test('render story: <CustomMaxWidth>', async ({mount, expectScreenshot}) => {
        await mount(<PlaceholderContainerStories.CustomMaxWidth />);

        await expectScreenshot();
    });

    const commonPropsCases = {
        size: sizeCases,
        direction: directionCases,
        align: alignCases,
        title: titleCases,
        description: descriptionCases,
        content: contentCases,
        actions: actionsCases,
        maxWidth: maxWidthCases,
    } as const;

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<TestPlaceholderContainerProps>(
            {
                title: 'Title',
                description: 'Description',
            },
            commonPropsCases,
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => {
                    return (
                        <div key={title}>
                            <h4>{title}</h4>
                            <div>
                                <TestPlaceholderContainerWithImage {...props} />
                            </div>
                        </div>
                    );
                })}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
