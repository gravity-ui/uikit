import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SpinProps} from '../Spin';
import {Spin} from '../Spin';

import {sizeCases} from './cases';

test.describe('Spin', {tag: '@Spin'}, () => {
    const defaultProps: SpinProps = {};

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Spin {...props} />);

            await expectScreenshot();
        });
    });
});
