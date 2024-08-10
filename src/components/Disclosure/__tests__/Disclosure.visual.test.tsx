import React from 'react';

import {expect} from '@playwright/experimental-ct-react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DisclosureProps} from '../Disclosure';
import {Disclosure} from '../Disclosure';
import {DisclosureQa} from '../constants';

import {arrowPositionCases, defaultExpandedCases, sizeCases} from './cases';

test.describe('Disclosure', {tag: '@Disclosure'}, () => {
    const defaultProps: DisclosureProps = {
        summary: <div>Summary</div>,
        children: <div>Content</div>,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
        arrowPosition: arrowPositionCases,
        defaultExpanded: defaultExpandedCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Disclosure {...props} />);

            await expectScreenshot({
                screenshotPostfix: 'before click',
            });

            await root.locator(`button[data-qa='${DisclosureQa.SUMMARY}']`).click();

            if (!props.disabled && !props.defaultExpanded) {
                await expect(root.locator(`[data-qa='${DisclosureQa.DETAILS}']`)).toBeVisible();
            }

            await expectScreenshot({
                screenshotPostfix: 'after click',
            });
        });
    });
});
