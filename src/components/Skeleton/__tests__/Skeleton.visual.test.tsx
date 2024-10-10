import React from 'react';

import {test} from '~playwright/core';

import {createSmokeScenarios} from '../../../stories/tests-factory/create-smoke-scenarios';
import type {SkeletonProps} from '../Skeleton';
import {Skeleton} from '../Skeleton';

test.describe('Skeleton', {tag: '@Skeleton'}, () => {
    const defaultProps: SkeletonProps = {
        className: '',
        style: {
            width: '30px',
            height: '30px',
        },
    };

    createSmokeScenarios(defaultProps, {}).forEach(([title, details, props]) => {
        test(title, details, async ({mount, expectScreenshot}) => {
            await mount(<Skeleton {...props} />);

            await expectScreenshot();
        });
    });
});
