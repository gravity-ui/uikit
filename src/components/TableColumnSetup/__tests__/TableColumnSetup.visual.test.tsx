import {expect} from '@playwright/experimental-ct-react';
import {noop} from 'lodash';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {TableColumnSetup} from '../TableColumnSetup';
import type {TableColumnSetupProps} from '../TableColumnSetup';

import {disabledCases, popupPlacementCases, showStatusCases} from './cases';

const defaultProps: TableColumnSetupProps = {
    items: [
        {id: 'name', title: 'Name', selected: true, required: true},
        {id: 'email', title: 'Email', selected: true},
        {id: 'phone', title: 'Phone', selected: false},
    ],
    onUpdate: noop,
};

test.describe('TableColumnSetup', {tag: '@TableColumnSetup'}, () => {
    smokeTest('', async ({mount, expectScreenshot}) => {
        const smokeScenarios = createSmokeScenarios(defaultProps, {
            disabled: disabledCases,
            showStatus: showStatusCases,
        });

        await mount(
            <div>
                {smokeScenarios.map(([title, props]) => (
                    <div key={title}>
                        <h4>{title}</h4>
                        <TableColumnSetup {...props} />
                    </div>
                ))}
            </div>,
        );

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with opened popup', async ({mount, page, expectScreenshot}) => {
        const root = await mount(
            <div
                style={{
                    width: 200,
                    height: 200,
                }}
            >
                <TableColumnSetup {...defaultProps} />
            </div>,
        );

        await root.locator("button[type='button']").click();
        await expect(page.locator('[role="listbox"]')).toBeVisible();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    smokeTest('with hide apply button', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <div
                style={{
                    width: 200,
                    height: 200,
                }}
            >
                <TableColumnSetup {...defaultProps} hideApplyButton />
            </div>,
        );

        await root.locator("button[type='button']").click();

        await expectScreenshot({
            themes: ['light'],
        });
    });

    createSmokeScenarios(
        defaultProps,
        {
            popupPlacement: popupPlacementCases,
        },
        {
            scenarioName: 'placement',
        },
    ).forEach(([title, props]) => {
        smokeTest(title, async ({mount, expectScreenshot}) => {
            const root = await mount(
                <div
                    style={{
                        width: 250,
                        height: 250,
                        paddingInline: 60,
                    }}
                >
                    <h4>{title}</h4>
                    <TableColumnSetup {...props} />
                </div>,
            );

            await root.locator("button[type='button']").click();

            await expectScreenshot({
                themes: ['light'],
            });
        });
    });

    smokeTest('with custom width', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <div
                style={{
                    width: 400,
                    height: 200,
                }}
            >
                <TableColumnSetup {...defaultProps} popupWidth={300} />
            </div>,
        );

        await root.locator("button[type='button']").click();

        await expectScreenshot({
            themes: ['light'],
        });
    });
});
