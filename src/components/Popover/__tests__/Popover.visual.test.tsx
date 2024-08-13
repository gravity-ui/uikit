import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {PopoverProps} from '../Popover';

import {
    hasArrowCases,
    hasCloseCases,
    offsetCases,
    placementCases,
    sizeCases,
    strategyCases,
    themeCases,
    titleCases,
} from './cases';
import {PopoverQA} from './constants';
import {TestPopover, TestPopoverWithButtons, TestPopoverWithLinks} from './helpers';

test.describe('Popover', {tag: '@Popover'}, () => {
    const defaultProps: PopoverProps = {
        content: 'Content',
    };

    const propsCases = {
        title: titleCases,
        hasArrow: hasArrowCases,
        hasClose: hasCloseCases,
        placement: placementCases,
        offset: offsetCases,
        strategy: strategyCases,
        theme: themeCases,
        size: sizeCases,
    } as const;

    createSmokeScenarios(defaultProps, propsCases).forEach(([title, details, props]) => {
        test(title, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestPopover {...props} />);

            await root.locator(`button[data-qa="${PopoverQA.trigger}"]`).click();

            await expect(page.locator(`[data-qa="${PopoverQA.popoverContent}"]`)).toBeVisible();

            await expectScreenshot({
                screenshotPostfix: 'opened state',
            });
        });
    });

    createSmokeScenarios(defaultProps, propsCases).forEach(([title, details, props]) => {
        test(`with links ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestPopoverWithLinks {...props} />);

            await root.locator(`button[data-qa="${PopoverQA.trigger}"]`).click();

            await expect(page.locator(`[data-qa="${PopoverQA.popoverContent}"]`)).toBeVisible();

            await expectScreenshot({
                screenshotPostfix: 'opened state',
            });
        });
    });

    createSmokeScenarios(defaultProps, propsCases).forEach(([title, details, props]) => {
        test(`with buttons ${title}`, details, async ({mount, page, expectScreenshot}) => {
            const root = await mount(<TestPopoverWithButtons {...props} />);

            await root.locator(`button[data-qa="${PopoverQA.trigger}"]`).click();

            await expect(page.locator(`[data-qa="${PopoverQA.popoverContent}"]`)).toBeVisible();

            await expectScreenshot({
                screenshotPostfix: 'opened state',
            });
        });
    });
});
