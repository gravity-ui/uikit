import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ControlLabel} from '../ControlLabel';

import {defaultProps, disabledCases, sizeCases, titleCases} from './cases';

test.describe('ControlLabel', {tag: '@ControlLabel'}, () => {
    createSmokeScenarios(
        {
            ...defaultProps,
        } as const,
        {
            size: sizeCases,
            title: titleCases,
            disabled: disabledCases,
        },
    ).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<ControlLabel {...props} />);

            await expectScreenshot();
        });
    });
});
