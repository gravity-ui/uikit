import {expect} from '@playwright/experimental-ct-react';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {ActionTooltipProps} from '../ActionTooltip';
import {ActionTooltip} from '../ActionTooltip';

import {placementCases} from './cases';

test.describe('ActionTooltip', {tag: '@ActionTooltip'}, () => {
    const defaultProps: ActionTooltipProps = {
        title: 'Title',
        hotkey: 'mod+a',
        description: 'Description',
        children: <div>trigger</div>,
    };

    const smokeScenarios = createSmokeScenarios<ActionTooltipProps>(defaultProps, {
        placement: placementCases,
    });

    smokeScenarios.forEach(([title, props]) => {
        smokeTest(title, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
                <div>
                    <h4>{title}</h4>
                    <div
                        style={{
                            width: '400px',
                            height: '400px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <ActionTooltip {...props} qa="tooltip">
                                <div
                                    data-qa="trigger"
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px tomato dotted',
                                    }}
                                >
                                    trigger block
                                </div>
                            </ActionTooltip>
                        </div>
                    </div>
                </div>,
            );

            await root.getByTestId('trigger').hover();
            await expect(page.getByTestId('tooltip')).toBeVisible({timeout: 1000});

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });
});
