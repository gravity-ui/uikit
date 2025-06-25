import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {HelpMarkProps} from '../HelpMark';
import {HelpMark} from '../HelpMark';

import {placementCases} from './cases';
import {HelpMarkStories} from './stories';

test.describe('HelpMark', {tag: '@HelpMark'}, () => {
    test('render story: <Default>', async ({mount, expectScreenshot}) => {
        await mount(<HelpMarkStories.Default />);

        await expectScreenshot();
    });

    test('render story: <InsideText>', async ({mount, expectScreenshot}) => {
        await mount(<HelpMarkStories.InsideText />);

        await expectScreenshot();
    });

    createSmokeScenarios<NonNullable<HelpMarkProps['popoverProps']>>(
        {
            qa: 'popover',
        },
        {
            placement: placementCases,
        },
    ).forEach(([title, popoverProps]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div>
                    <h4>{title}</h4>
                    <div style={{padding: 100}}>
                        <HelpMark qa="trigger" popoverProps={popoverProps}>
                            Test content
                        </HelpMark>
                    </div>
                </div>,
            );

            await root.getByTestId('trigger').hover();
            await expect(page.getByTestId('popover')).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
