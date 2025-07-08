import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Text} from '../../Text';
import type {AccordionProps} from '../Accordion';
import {Accordion} from '../Accordion';

import {arrowPositionCases, sizeCases, viewCases} from './cases';
import {AccordionInteractiveStates, AccordionShowcase, AccordionStories} from './helpersPlaywright';

test.describe('Accordion', {tag: '@Accordion'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<AccordionStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<AccordionStories.Size />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<AccordionStories.View />);

        await expectScreenshot();
    });

    test('render story: <Multiple>', async ({mount, expectScreenshot}) => {
        await mount(<AccordionStories.Multiple />);

        await expectScreenshot();
    });

    test('render story: <WithCustomSummary>', async ({mount, expectScreenshot}) => {
        await mount(<AccordionStories.WithCustomSummary />);

        await expectScreenshot();
    });

    test('render showcase', async ({mount, expectScreenshot}) => {
        await mount(<AccordionShowcase />);

        await expectScreenshot();
    });

    test('render interactive states', async ({mount, expectScreenshot}) => {
        await mount(<AccordionInteractiveStates />);

        await expectScreenshot();
    });

    const qa = 'test-accordion';

    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios<AccordionProps>(
            {
                qa,
                children: [
                    <Accordion.Item key="item1" summary="First Item" value="item1">
                        <Text>Content of the first item</Text>
                    </Accordion.Item>,
                    <Accordion.Item key="item2" summary="Second Item" value="item2">
                        <Text>Content of the second item</Text>
                    </Accordion.Item>,
                    <Accordion.Item key="item3" summary="Third Item" value="item3" disabled>
                        <Text>Content of the third item</Text>
                    </Accordion.Item>,
                ],
            },
            {
                size: sizeCases,
                view: viewCases,
                arrowPosition: arrowPositionCases,
            },
        );

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Accordion {...props} />
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({});
    });

    // Test interaction states
    test('accordion item hover state', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <Accordion qa={qa} size="m" view="solid">
                <Accordion.Item summary="Hover me" value="hover-item">
                    <Text>Content that appears when expanded</Text>
                </Accordion.Item>
                <Accordion.Item summary="Another item" value="another-item">
                    <Text>Another content</Text>
                </Accordion.Item>
            </Accordion>,
        );

        // Hover over the first accordion item summary
        await root.locator('[data-qa="test-accordion"] button').first().hover();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'hovered',
        });
    });

    test('accordion expanded state', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <Accordion qa={qa} size="m" view="solid">
                <Accordion.Item summary="Click to expand" value="expand-item">
                    <Text>This content is now visible after expansion</Text>
                </Accordion.Item>
                <Accordion.Item summary="Another item" value="another-item">
                    <Text>Another content</Text>
                </Accordion.Item>
            </Accordion>,
        );

        // Click to expand the first item
        await root.locator('[data-qa="test-accordion"] button').first().click();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'expanded',
        });
    });
});
