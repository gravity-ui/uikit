import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ActionTooltip} from '../ActionTooltip';
import type {ActionTooltipProps} from '../ActionTooltip';

import {descriptionCases, hotkeyCases, placementCases} from './cases';

test.describe('ActionTooltip', {tag: '@ActionTooltip'}, () => {
    const defaultProps: ActionTooltipProps = {
        title: 'Title',
        children: <div>trigger</div>,
    };

    const smokeScenarios = createSmokeScenarios(defaultProps, {
        placement: placementCases,
        hotkey: hotkeyCases,
        description: descriptionCases,
    });

    smokeScenarios.forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
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
                        <ActionTooltip {...props}>
                            <div
                                data-qa="trigger"
                                style={{padding: '10px', border: '1px tomato dotted'}}
                            >
                                trigger block
                            </div>
                        </ActionTooltip>
                    </div>
                </div>,
            );

            await expect(root.getByTestId('trigger')).toBeVisible();
            await root.getByTestId('trigger').hover();
            await expect(page.locator("[role='tooltip']")).toBeVisible({timeout: 1000});

            await expectScreenshot({});
        });
    });

    const disabledStateSmokeScenarios = createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        {},
        {
            scenarioName: 'disabled',
        },
    );

    disabledStateSmokeScenarios.forEach(([title, details, props]) => {
        test(`disabled-${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(
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
                        <ActionTooltip {...props}>
                            <div
                                data-qa="trigger"
                                style={{padding: '10px', border: '1px tomato dotted'}}
                            >
                                trigger block
                            </div>
                        </ActionTooltip>
                    </div>
                </div>,
            );

            await expect(root.getByTestId('trigger')).toBeVisible();
            await root.getByTestId('trigger').hover();

            // wait for check the tooltip will definitely not show up
            await page.waitForTimeout(3000);

            await expect(page.locator("[role='tooltip']")).not.toBeVisible({timeout: 1000});

            await expectScreenshot({});
        });
    });
});
