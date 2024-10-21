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

    createSmokeScenarios<RadioProps>(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            const root = await mount(<Radio {...props} />);

            await expectScreenshot({});

            root.getByTestId(qa).focus();

            await expectScreenshot({nameSuffix: 'after focus'});

            await root.getByTestId(qa).click();

            await expectScreenshot({nameSuffix: 'after click'});
        });
    });

    createSmokeScenarios<RadioProps>(
        {
            ...defaultProps,
            disabled: true,
        },
        {
            size: sizeCases,
        },
        {
            scenarioName: 'disabled',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Radio {...props} />);

            await expectScreenshot();
        });
    });

    createSmokeScenarios<RadioProps>(
        {
            ...defaultProps,
            defaultChecked: true,
        },
        {
            size: sizeCases,
        },
        {
            scenarioName: 'default checked',
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Radio {...props} />);

            await expectScreenshot();
        });
    });
});
