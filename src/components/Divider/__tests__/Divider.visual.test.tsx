import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {DividerProps} from '../Divider';

import {orientationCases} from './cases';
import {ListWithDivider} from './helpers';

test.describe('Divider', {tag: '@Divider'}, () => {
    const defaultProps: DividerProps = {};

    createSmokeScenarios(defaultProps, {
        orientation: orientationCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<ListWithDivider {...props} />);

            await expectScreenshot();
        });
    });
});
