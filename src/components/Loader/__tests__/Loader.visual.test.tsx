import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {LoaderProps} from '../Loader';
import {Loader} from '../Loader';

import {sizeCases} from './cases';

test.describe('Loader', {tag: '@Loader'}, () => {
    const defaultProps: LoaderProps = {};

    createSmokeScenarios(defaultProps, {
        size: sizeCases,
    }).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Loader {...props} />);

            await expectScreenshot();
        });
    });
});
