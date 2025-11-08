import {expect} from '@playwright/experimental-ct-react';
import {noop} from 'lodash';

import {smokeTest, test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {TableColumnSetup} from '../TableColumnSetup';
import type {TableColumnSetupProps} from '../TableColumnSetup';

import {disabledCases, showStatusCases} from './cases';

const defaultProps: TableColumnSetupProps = {
    items: [
        {id: 'name', title: 'Имя', selected: true, required: true},
        {id: 'email', title: 'Email', selected: true},
        {id: 'phone', title: 'Телефон', selected: false},
    ],
    onUpdate: noop,
};

test.describe('TableColumnSetup', {tag: '@TableColumnSetup'}, () => {
    smokeTest('with custom width popup', async ({mount, expectScreenshot}) => {
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
            nameSuffix: 'with opened popup',
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
            nameSuffix: 'with hide apply popup',
        });
    });

    smokeTest('with custom popupPlacement', async ({mount, expectScreenshot}) => {
        const root = await mount(
            <div
                style={{
                    width: 400,
                    height: 200,
                }}
            >
                <TableColumnSetup {...defaultProps} popupPlacement="left-end" />
            </div>,
        );

        await root.locator("button[type='button']").click();

        await expectScreenshot({
            themes: ['light'],
            nameSuffix: 'with custom popupPlacement',
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
            nameSuffix: 'with custom width',
        });
    });
});
