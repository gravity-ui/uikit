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

    createSmokeScenarios<HelpMarkProps>(
        {},
        {
            placement: placementCases,
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div style={{padding: 100}}>
                    <HelpMark
                        qa="popover"
                        buttonProps={{
                            // @ts-expect-error Object literal may only specify known properties, and ''data-qa'' does not exist in type 'ButtonHTMLAttributes<HTMLButtonElement>'
                            'data-qa': 'trigger',
                        }}
                        {...props}
                    >
                        Test content
                    </HelpMark>
                </div>,
            );

            await root.getByTestId('trigger').hover();
            await expect(page.getByTestId('popover-tooltip')).toBeVisible();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
