import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Card} from '../Card';
import type {CardProps} from '../Card';

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

    const defaultProps: CardProps = {
        children: null,
    };

    createSmokeScenarios(
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
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <Card {...props}>
                    <div data-qa="content" style={{padding: '10px'}}>
                        Some text
                    </div>
                </Card>,
            );

            await expectScreenshot({});

            await root.getByTestId('content').hover();

            await expectScreenshot({nameSuffix: 'hovered'});
        });
    });

    createSmokeScenarios(
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
            scenarioName: 'action',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <Card {...props}>
                    <div data-qa="content" style={{padding: '10px'}}>
                        Some text
                    </div>
                </Card>,
            );

            await expectScreenshot({});

            await root.getByTestId('content').hover();

            await expectScreenshot({nameSuffix: 'after hover'});
        });
    });

    createSmokeScenarios(
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
            scenarioName: 'container',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(
                <Card {...props}>
                    <div style={{padding: '10px'}}>Some text</div>
                </Card>,
            );

            await expectScreenshot();
        });
    });
});
