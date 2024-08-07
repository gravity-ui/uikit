import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import {ArrowToggle} from '../ArrowToggle';

import {defaultProps, directionCases, sizeCases} from './cases';

test.describe('ArrowToggle', {tag: '@ArrowToggle'}, () => {
    const smokeScenarios = createSmokeScenarios(defaultProps, {
        size: sizeCases,
        direction: directionCases,
    });

    smokeScenarios.forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<ArrowToggle {...props} />);

            await expectScreenshot();
        });
    });
});
