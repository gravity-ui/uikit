import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {CardProps} from '../Card';
import {Card} from '../Card';

import {
    containerViewCases,
    disabledCases,
    selectedCases,
    selectionViewCases,
    sizeCases,
    themeCases,
} from './cases';
import {CardStories} from './helpersPlaywright';

test.describe('Card', {tag: '@Card'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Default />);

        await expectScreenshot();
    });

    test('render story: <Size>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Size />);

        await expectScreenshot();
    });

    test('render story: <Theme>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Theme />);

        await expectScreenshot();
    });

    test('render story: <View>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.View />);

        await expectScreenshot();
    });

    test('render story: <ActionType>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.ActionType />);

        await expectScreenshot();
    });

    test('render story: <SelectionType>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.SelectionType />);

        await expectScreenshot();
    });

    test('render story: <Custom>', async ({mount, expectScreenshot}) => {
        await mount(<CardStories.Custom />);

        await expectScreenshot();
    });

    smokeTest('smoke, selection type', async ({mount, expectScreenshot}) => {
        const defaultProps: CardProps = {
            children: null,
        };

        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                type: 'selection',
            } as const,
            {
                size: sizeCases,
                disabled: disabledCases,
                selected: selectedCases,
                view: selectionViewCases,
            },
            {
                scenarioName: 'selection',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Card {...props}>
                                <div data-qa="content" style={{padding: '10px'}}>
                                    Some text
                                </div>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('smoke, action type', async ({mount, expectScreenshot}) => {
        const defaultProps: CardProps = {
            children: null,
        };

        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                type: 'action',
                onClick: () => {},
            } as const,
            {
                size: sizeCases,
                disabled: disabledCases,
            },
            {
                scenarioName: 'selection',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Card {...props}>
                                <div data-qa="content" style={{padding: '10px'}}>
                                    Some text
                                </div>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('smoke, container type', async ({mount, expectScreenshot}) => {
        const defaultProps: CardProps = {
            children: null,
        };

        const smokeScenarios = createSmokeScenarios(
            {
                ...defaultProps,
                type: 'container',
            } as const,
            {
                size: sizeCases,
                disabled: disabledCases,
                view: containerViewCases,
                theme: themeCases,
            },
            {
                scenarioName: 'selection',
            },
        );

        await mount(
            <div style={{width: 400}}>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <div>
                            <Card {...props}>
                                <div style={{padding: '10px'}}>Some text</div>
                            </Card>
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
