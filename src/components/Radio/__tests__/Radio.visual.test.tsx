import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {RadioProps} from '../Radio';
import {Radio} from '../Radio';

import {sizeCases} from './cases';

const qa = 'value-1';

test.describe('Radio', {tag: '@Radio'}, () => {
    const defaultProps: RadioProps = {
        children: 'Test',
        value: '1',
        qa,
    };

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Radio {...props} />);

            await expectScreenshot({screenshotPostfix: 'init'});

            root.getByTestId(qa).focus();

            await expectScreenshot({screenshotPostfix: 'after focus'});

            root.getByTestId(qa).click();

            await expectScreenshot({screenshotPostfix: 'after click'});
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            disabled: true,
        },
        {
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`disabled ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<Radio {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios(
        {
            ...defaultProps,
            defaultChecked: true,
        },
        {
            size: sizeCases,
        },
    ).forEach(([title, details, props]) => {
        test(`default checked ${title}`, details, async ({mount, expectScreenshot}) => {
            await mount(<Radio {...props} />);

            await expectScreenshot();
        });
    });
});
