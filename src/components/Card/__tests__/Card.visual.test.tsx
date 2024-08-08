import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {Card} from '../Card';

import {
    containerViewCases,
    defaultProps,
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
    ).forEach(([title, details, props]) => {
        test(`selection ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <Card {...props}>
                    <div data-qa="content" style={{padding: '10px'}}>
                        Some text
                    </div>
                </Card>,
            );

            await expectScreenshot({screenshotPostfix: 'before hover'});

            await root.locator("[data-qa='content']").hover();

            await expectScreenshot({screenshotPostfix: 'after hover'});
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
    ).forEach(([title, details, props]) => {
        test(`action ${title}`, details, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <Card {...props}>
                    <div data-qa="content" style={{padding: '10px'}}>
                        Some text
                    </div>
                </Card>,
            );

            await expectScreenshot({screenshotPostfix: 'before hover'});

            await root.locator("[data-qa='content']").hover();

            await expectScreenshot({screenshotPostfix: 'after hover'});
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
    ).forEach(([title, details, props]) => {
        test(`container ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(
                <Card {...props}>
                    <div style={{padding: '10px'}}>Some text</div>
                </Card>,
            );

            await expectScreenshot();
        });
    });
});
